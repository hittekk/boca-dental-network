#!/usr/bin/env node
/**
 * prerender.mjs
 *
 * After `vite build`, walk every SPA route in a headless Chrome and write
 * each route's fully-rendered DOM into its own dist/<path>/index.html.
 *
 * Result: every URL on the deployed site has its own unique view-source —
 * correct title, meta, canonical, schema. Google indexes each page properly,
 * and anyone who right-clicks → View Source on /clinics/russell-eastern/
 * sees that clinic's content (not the homepage shell).
 *
 * Build time: ~5 minutes for the full ~50-route crawl. Browser stays open
 * across all routes — much faster than relaunching per page.
 */

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import serveHandler from 'serve-handler'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import prettier from 'prettier'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PORT = 4173

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('✗ dist/index.html not found — run `vite build` first.')
  process.exit(1)
}

// ── Route inventory ───────────────────────────────────────────────────────
// All sitemap-Expansion URLs. Order doesn't matter functionally, but is
// grouped by section for readability.
const ROUTES = [
  // Homepage
  { path: '/',                                                  title: 'Homepage' },

  // Clinics
  { path: '/clinics/',                                          title: 'Clinics Hub' },
  { path: '/clinics/russell-eastern/',                          title: 'Russell & Eastern Clinic' },
  { path: '/clinics/bonanza-eastern/',                          title: 'Bonanza & Eastern Clinic' },
  { path: '/clinics/sahara-decatur/',                           title: 'Sahara & Decatur Clinic' },
  { path: '/clinics/jones-i95/',                                title: 'Jones & I-95 Clinic' },
  { path: '/clinics/charleston-lamb/',                          title: 'Charleston & Lamb Clinic' },
  { path: '/clinics/flamingo-torrey/',                          title: 'Flamingo & Torrey Pines Clinic' },
  { path: '/clinics/cheyenne-commons/',                         title: 'Cheyenne Commons Clinic' },
  { path: '/clinics/beltway-marketplace/',                      title: 'Beltway Marketplace Clinic' },
  { path: '/clinics/boca-kids-dentistry/',                      title: 'Boca Kids Dentistry' },

  // Services
  { path: '/services/',                                         title: 'Services Hub' },
  { path: '/general-dentistry/',                                title: 'General Dentistry' },
  { path: '/cosmetic-dentistry/',                               title: 'Cosmetic Dentistry' },
  { path: '/restorative-dentistry/',                            title: 'Restorative Dentistry' },
  { path: '/dental-implants/',                                  title: 'Dental Implants' },
  { path: '/orthodontics/',                                     title: 'Orthodontics' },
  { path: '/orthodontics/invisalign/',                          title: 'Invisalign — Las Vegas' },
  { path: '/pediatric-dentistry/',                              title: 'Pediatric Dentistry' },
  { path: '/sedation-dentistry/',                               title: 'Sedation Dentistry' },
  { path: '/oral-surgery/',                                     title: 'Oral Surgery' },
  { path: '/periodontal/',                                      title: 'Periodontal Care' },
  { path: '/endodontics/',                                      title: 'Endodontics' },
  { path: '/prosthodontics/',                                   title: 'Prosthodontics' },
  { path: '/preventive-dentistry/',                             title: 'Preventive Dentistry' },

  // Dentists
  { path: '/about-us/',                                         title: 'About Us' },
  { path: '/about-us/dentists/',                                title: 'Meet the Team' },
  { path: '/about-us/dentists/dr-sana-fahim/',                  title: 'Dr. Sana Khurram' },
  { path: '/about-us/dentists/dr-justin-wall/',                 title: 'Dr. Justin Wall' },
  { path: '/about-us/dentists/dr-kelcey-loveland/',             title: 'Dr. Kelcey Loveland' },
  { path: '/about-us/dentists/minh-nguyen/',                    title: 'Minh Nguyen' },
  { path: '/about-us/dentists/dr-johnson-fong/',                title: 'Dr. Johnson Fong' },
  { path: '/about-us/dentists/dr-harrison-luu/',                title: 'Dr. Harrison Luu' },
  { path: '/about-us/dentists/dr-michael-st-laurent/',          title: 'Dr. Michael St Laurent' },
  { path: '/about-us/dentists/dr-bredan-marlin/',               title: 'Dr. Brenden Marlin' },
  { path: '/about-us/dentists/dr-charles-calder/',              title: 'Dr. Chad Calder' },
  { path: '/about-us/dentists/dr-wyatt-dannels/',               title: 'Dr. Wyatt Dannels' },
  { path: '/about-us/dentists/dr-james-yun/',                   title: 'Dr. James Yun' },
  { path: '/about-us/dentists/dr-kathy-gonzalez/',              title: 'Dr. Kathy Gonzales' },
  { path: '/about-us/dentists/dr-cole-thompson/',               title: 'Dr. Cole Thompson' },
  { path: '/about-us/dentists/dr-farhan-hossain/',              title: 'Dr. Farhan Hossain' },

  // Patient resources
  { path: '/patient-resources/',                                title: 'Patient Resources' },
  { path: '/patient-resources/insurance/',                      title: 'Insurance' },
  { path: '/patient-resources/financing/',                      title: 'Financing' },
  { path: '/patient-resources/reviews/',                        title: 'Patient Reviews' },

  // Misc + legal
  { path: '/oficina-de-habla-hispana/',                         title: 'Se Habla Español' },
  { path: '/contact-us/',                                       title: 'Contact Us' },
  { path: '/request-consultation/',                             title: 'Request a Consultation' },
  { path: '/careers/',                                          title: 'Careers' },
  { path: '/privacy-policy/',                                   title: 'Privacy Policy' },
  { path: '/hipaa-compliance/',                                 title: 'HIPAA Compliance' },
]

// ── Append DB-managed service pages (from Supabase) ───────────────────────
// Every published row in `service_pages` gets its own prerendered HTML, so
// admin-created/edited pages are indexable. Non-fatal: if env/network is
// unavailable we simply prerender the static routes above.
try {
  const SB_URL = process.env.VITE_SUPABASE_URL
  const SB_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (SB_URL && SB_KEY) {
    const res = await fetch(
      `${SB_URL}/rest/v1/service_pages?select=slug,category_slug,label&is_published=eq.true&order=category_slug.asc,slug.asc`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } },
    )
    if (res.ok) {
      const rows = await res.json()
      const existing = new Set(ROUTES.map((r) => r.path))
      let added = 0
      for (const row of rows) {
        const p = `/${row.category_slug}/${row.slug}/`
        if (!existing.has(p)) {
          ROUTES.push({ path: p, title: `${row.label} — Las Vegas` })
          existing.add(p)
          added++
        }
      }
      console.log(`✓ Added ${added} DB service-page route(s) from Supabase`)
    } else {
      console.warn(`⚠ service_pages fetch returned ${res.status} — static routes only`)
    }
  } else {
    console.warn('⚠ Supabase env not set — prerendering static routes only')
  }
} catch (err) {
  console.warn(`⚠ service_pages prerender expansion skipped: ${err.message}`)
}

// ── Append DB-managed doctor profile routes (from Supabase) ───────────────
// The static list above matches today's 14 published providers, but an
// admin-added doctor would otherwise serve the SPA shell to crawlers (this
// exact gap bit the Reno site). Same non-fatal guard as service pages.
try {
  const SB_URL = process.env.VITE_SUPABASE_URL
  const SB_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (SB_URL && SB_KEY) {
    const res = await fetch(
      `${SB_URL}/rest/v1/doctors?select=slug,name&is_published=eq.true&order=sort_order.asc`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } },
    )
    if (res.ok) {
      const rows = await res.json()
      const existing = new Set(ROUTES.map((r) => r.path))
      let added = 0
      for (const row of rows) {
        const p = `/about-us/dentists/${row.slug}/`
        if (!existing.has(p)) {
          ROUTES.push({ path: p, title: row.name })
          existing.add(p)
          added++
        }
      }
      console.log(`✓ Added ${added} DB doctor route(s) from Supabase`)
    } else {
      console.warn(`⚠ doctors fetch returned ${res.status} — static doctor routes only`)
    }
  }
} catch (err) {
  console.warn(`⚠ doctors prerender expansion skipped: ${err.message}`)
}

// ── Start a static server serving dist/ ───────────────────────────────────
// SPA fallback rewrite — Vite produces a single index.html; React Router
// handles every route from there. The `**` wildcard means any unknown URL
// falls back to that shell (matching Netlify's production redirect rule).
const server = http.createServer((req, res) =>
  serveHandler(req, res, {
    public: DIST,
    rewrites: [{ source: '/**', destination: '/index.html' }],
  }),
)
await new Promise((r) => server.listen(PORT, r))
console.log(`✓ Local static server on http://localhost:${PORT}`)

// ── Launch headless Chrome (CI-safe via @sparticuz/chromium) ──────────────
const browser = await puppeteer.launch({
  args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
  executablePath: await chromium.executablePath(),
  headless: chromium.headless,
})

// ── Comment building blocks ───────────────────────────────────────────────
function masthead(routePath, routeTitle) {
  return `<!--
═══════════════════════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────────────────┐
  │                                                                      │
  │    BOCA  DENTAL  &  BRACES                                           │
  │    Family · Cosmetic · Orthodontic · Specialty Dental Care           │
  │    Las Vegas, Nevada                                                 │
  │                                                                      │
  │    Real Verified Google Reviews · every clinic                       │
  │    9 LV Locations · Same-day Emergencies · Bilingual                 │
  │                                                                      │
  │    ✆ (702) 456-0005                                                  │
  │    ⌬ bocadentalandbraces.com                                         │
  │                                                                      │
  └──────────────────────────────────────────────────────────────────────┘

  Page: ${routeTitle}
  URL:  ${routePath}

  Hand-crafted by DataStackLogic — datastacklogic.com

═══════════════════════════════════════════════════════════════════════════════
-->
`
}

const HOMEPAGE_SECTIONS = [
  ['how-can-we-help',      '§2',  'AUDIENCE ROUTING',     '"How can we help you today?" · 5 routing cards'],
  ['services',             '§3',  'OUR DENTAL SERVICES',  '"Comprehensive Dental Care for Every Stage of Life" · 9 categories · 3×3 grid'],
  ['why-boca',             '§4',  'WHY BOCA',             '"Why Las Vegas Chooses Boca Dental & Braces" · 6 differentiator cards'],
  ['testimonials',         '§5',  'PATIENT REVIEWS',      'Real Google reviews · live aggregate + patient cards'],
  ['boca-kids',            'EX',  'BOCA KIDS',            'Pediatric program highlight — supplemental section'],
  ['locations',            '§6',  'FIND A LOCATION',      '9 LV intersections · GEO paragraph · location card grid'],
  ['meet-the-team',        '§8',  'MEET THE TEAM',        '"Experienced Providers. Compassionate Care." · 3-4 provider highlights'],
  ['financing',            'EX',  'CARE YOU CAN AFFORD',  'CareCredit + in-house financing options'],
  ['faq',                  '§9',  'FAQS',                 'Practice-level Q&As · all schema-emitted in FAQPage block above'],
  ['request-consultation', 'CV',  'CONSULTATION FORM',    'Conversion form · pre-fills the central booking flow'],
  ['locations-map',        '§6b', 'COVERAGE MAP',         'Supplemental map view · 9 LV catchment areas'],
  ['cta',                  '§10', 'FINAL CTA',            '"Ready to Book? Your New Las Vegas Dentist Is Waiting."'],
]

const CREDIT = `<!--
    ───────────────────────────────────────────────────────────────────────
    End of document. Hand-formatted HTML, one schema graph per page type.
    No Webflow, no Wix, no template. Want a site like this?
    DataStackLogic · datastacklogic.com · robert@datastacklogic.com
    ───────────────────────────────────────────────────────────────────────
  -->
  `

// Third-party hosts that keep connections alive and stall networkidle0 but
// contribute nothing to the captured DOM (analytics beacons, webfonts).
// Blocking them shaves seconds off EVERY route — the 182-page crawl was
// timing out Netlify's 18-minute build limit — and stops CI runs from
// polluting GA/GTM with fake pageviews.
const BLOCKED_HOSTS = [
  'googletagmanager.com',
  'google-analytics.com',
  'analytics.google.com',
  'stats.g.doubleclick.net',
  'connect.facebook.net',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  'events.mapbox.com', // mapbox telemetry only — tiles/styles stay allowed
]

// ── Capture a single route ────────────────────────────────────────────────
async function capture(routePath, routeTitle, isHomepage, isEs = false) {
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })

  await page.setRequestInterception(true)
  page.on('request', (req) => {
    const u = req.url()
    if (BLOCKED_HOSTS.some((h) => u.includes(h))) return req.abort()
    req.continue()
  })

  await page.goto(`http://localhost:${PORT}${routePath}`, {
    waitUntil: 'networkidle0',
    timeout: 60_000,
  })

  // On /es routes, useLangSeo sets <html lang="es"> and AutoTranslate rewrites
  // visible English text to Spanish at runtime. Wait for the lang flip so the
  // snapshot captures the Spanish DOM (not the English first paint).
  if (isEs) {
    await page
      .waitForFunction(() => document.documentElement.lang === 'es', { timeout: 20_000 })
      .catch(() => console.warn(`⚠ html[lang=es] not seen for ${routePath} — snapshotting current DOM`))
  }

  // Scroll to fire every IntersectionObserver hook
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0
      const distance = 200
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= scrollHeight + 600) {
          clearInterval(timer)
          window.scrollTo(0, 0)
          resolve()
        }
      }, 40)
    })
  })

  // Settle (extra time on /es so AutoTranslate's DOM walk fully completes)
  await new Promise((r) => setTimeout(r, isEs ? 1500 : 800))

  let html = await page.content()
  await page.close()

  // Strip Vite HMR script tags (defensive — shouldn't exist in prod build)
  html = html.replace(
    /<script[^>]*type="module"[^>]*data-vite[^>]*>[\s\S]*?<\/script>/g,
    '',
  )

  // Prettier format
  try {
    html = await prettier.format(html, {
      parser: 'html',
      printWidth: 120,
      tabWidth: 2,
      htmlWhitespaceSensitivity: 'css',
    })
  } catch (err) {
    console.warn(`⚠ Prettier skipped for ${routePath}:`, err.message)
  }

  // Inject branded masthead inside <head>
  html = html.replace(
    /<head>/,
    '<head>\n' +
      masthead(routePath, routeTitle)
        .split('\n')
        .map((l) => (l ? '    ' + l : l))
        .join('\n'),
  )

  // Homepage gets the full section-divider treatment
  if (isHomepage) {
    for (const [id, sect, label, sub] of HOMEPAGE_SECTIONS) {
      const banner =
        `<!-- ───────────────────────────────────────────────────────────────── -->\n` +
        `    <!-- ${sect.padEnd(4)} ${label.padEnd(28)}                              -->\n` +
        `    <!-- ${' '.repeat(5)}${sub.padEnd(72).slice(0, 72)} -->\n` +
        `    <!-- ───────────────────────────────────────────────────────────────── -->`
      html = html.replace(
        new RegExp(`(\\n)( {2,})(<section[^>]*id="${id}")`),
        `$1$2${banner}\n$2$3`,
      )
    }
  }

  // Footer credit before </body>
  html = html.replace(/(\s*)<\/body>/, '\n  ' + CREDIT + '$1</body>')

  return html
}

// Blog posts — prerender only when the blog section is enabled. RLS hides
// future-scheduled posts from the anon key, so only live posts render. Guarded.
let blogRoutes = []
try {
  const SB_URL = process.env.VITE_SUPABASE_URL
  const SB_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (SB_URL && SB_KEY) {
    const h = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
    const setRes = await fetch(`${SB_URL}/rest/v1/site_settings?select=value&key=eq.blog`, { headers: h })
    const enabled = setRes.ok ? (((await setRes.json())[0]?.value)?.enabled === true) : false
    if (enabled) {
      const res = await fetch(`${SB_URL}/rest/v1/blog_posts?select=slug,title&status=eq.published`, { headers: h })
      if (res.ok) {
        const rows = await res.json()
        blogRoutes = [{ path: '/blog/', title: 'Blog' }, ...rows.map((r) => ({ path: `/blog/${r.slug}/`, title: r.title }))]
      }
    }
  }
} catch (err) {
  console.warn('⚠ prerender: could not load blog:', err.message)
}

// ── Walk every route (EN) + its /es twin + write each to its own dist file ──
const t0 = Date.now()
const allRoutes = [...ROUTES, ...blogRoutes]

// Optional batching so a long EN+ES crawl can run in time-limited chunks.
// PRERENDER_START = first route index (default 0); PRERENDER_LIMIT = count.
const START = parseInt(process.env.PRERENDER_START || '0', 10)
const LIMIT = parseInt(process.env.PRERENDER_LIMIT || String(allRoutes.length), 10)
const batch = allRoutes.slice(START, START + LIMIT)
console.log(`Crawling routes [${START}..${START + batch.length - 1}] of ${allRoutes.length} (EN+ES each)`)

// esPath: '/' → '/es/', else '/es' + path (paths carry trailing slash already)
const esPath = (p) => (p === '/' ? '/es/' : `/es${p}`)

for (const route of batch) {
  const isHome = route.path === '/'

  // ── English ──
  const html = await capture(route.path, route.title, isHome, false)
  const outDir = isHome ? DIST : path.join(DIST, route.path.replace(/^\/|\/$/g, ''))
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'index.html')
  fs.writeFileSync(outPath, html, 'utf-8')
  console.log(
    `  ✓ ${route.path.padEnd(48)} → ${path.relative(ROOT, outPath).padEnd(48)} (${(html.length / 1024).toFixed(0)} KB)`,
  )

  // ── Spanish twin (/es) — staging (noindex) until clinical sign-off ──
  const esRoute = esPath(route.path)
  try {
    const esHtml = await capture(esRoute, `${route.title} (ES)`, isHome, true)
    const esOutDir = path.join(DIST, esRoute.replace(/^\/|\/$/g, ''))
    fs.mkdirSync(esOutDir, { recursive: true })
    const esOutPath = path.join(esOutDir, 'index.html')
    fs.writeFileSync(esOutPath, esHtml, 'utf-8')
    console.log(
      `  ✓ ${esRoute.padEnd(48)} → ${path.relative(ROOT, esOutPath).padEnd(48)} (${(esHtml.length / 1024).toFixed(0)} KB)`,
    )
  } catch (err) {
    console.warn(`⚠ ES twin failed for ${esRoute}: ${err.message} — skipping`)
  }
}
const dt = ((Date.now() - t0) / 1000).toFixed(1)
console.log(`✓ Prerendered ${batch.length} routes ×2 (EN+ES) [${START}..${START + batch.length - 1}] in ${dt}s`)

// ── Cleanup ───────────────────────────────────────────────────────────────
await browser.close()
server.close()
console.log('✓ Prerender complete')
