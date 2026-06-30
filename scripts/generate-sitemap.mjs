// ─────────────────────────────────────────────────────────────────────────────
// scripts/generate-sitemap.mjs
// Builds dist/sitemap.xml from the real data (locations, dentists, service
// catalog) so the URL list never drifts from what actually ships. Runs last in
// the build chain (after vite + prerender). robots.txt points crawlers here.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { transform } from 'esbuild'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DOMAIN = 'https://bocadentalandbraces.com'

// Transpile a .ts data module to JS and import it (handles interfaces / typed fns).
async function loadTs(rel) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf-8')
  const { code } = await transform(src, { loader: 'ts', format: 'esm' })
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))
}

const { INITIAL_DATA } = await loadTs('src/data/initialData.ts')
const { SERVICE_CATEGORIES, SERVICE_PAGES } = await loadTs('src/data/serviceCatalog.ts')
// Same one switch the runtime reads (dependency-free module, safe to transpile-import).
const { ES_PUBLIC } = await loadTs('src/lib/es-flag.ts')

const staticPaths = [
  '/',
  '/clinics/',
  '/services/',
  '/about-us/',
  '/about-us/dentists/',
  '/patient-resources/',
  '/patient-resources/insurance/',
  '/patient-resources/financing/',
  '/patient-resources/reviews/',
  '/oficina-de-habla-hispana/',
  '/contact-us/',
  '/request-consultation/',
  '/careers/',
  '/privacy-policy/',
  '/hipaa-compliance/',
]

const clinicPaths = INITIAL_DATA.locations.map((l) => `/clinics/${l.slug}/`)
// Every doctor gets a profile page (Vegas slugs include non-"dr-" entries like minh-nguyen).
const dentistPaths = INITIAL_DATA.doctors.map((d) => `/about-us/dentists/${d.slug}/`)
const categoryPaths = SERVICE_CATEGORIES.map((c) => `/${c.slug}/`)
const servicePaths = SERVICE_PAGES.map((s) => `/${s.categorySlug}/${s.slug}/`)

// DB-managed service pages (admin-created). Non-fatal if unavailable.
let dbServicePaths = []
try {
  const SB_URL = process.env.VITE_SUPABASE_URL
  const SB_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (SB_URL && SB_KEY) {
    const res = await fetch(
      `${SB_URL}/rest/v1/service_pages?select=slug,category_slug&is_published=eq.true`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } },
    )
    if (res.ok) {
      const rows = await res.json()
      dbServicePaths = rows.map((r) => `/${r.category_slug}/${r.slug}/`)
    }
  }
} catch (err) {
  console.warn('⚠ sitemap: could not load DB service pages:', err.message)
}

// DB-managed custom pages (admin "Pages" CMS). Non-fatal if unavailable.
let dbCustomPagePaths = []
try {
  const SB_URL = process.env.VITE_SUPABASE_URL
  const SB_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (SB_URL && SB_KEY) {
    const res = await fetch(
      `${SB_URL}/rest/v1/pages?select=slug&status=eq.published`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` } },
    )
    if (res.ok) {
      const rows = await res.json()
      dbCustomPagePaths = rows.map((r) => `/${r.slug}/`)
    }
  }
} catch (err) {
  console.warn('⚠ sitemap: could not load DB custom pages:', err.message)
}

// Blog — only when the blog section is enabled. RLS hides future-scheduled
// posts from the anon key, so only live posts appear. Non-fatal if unavailable.
let blogPaths = []
try {
  const SB_URL = process.env.VITE_SUPABASE_URL
  const SB_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (SB_URL && SB_KEY) {
    const h = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
    const setRes = await fetch(`${SB_URL}/rest/v1/site_settings?select=value&key=eq.blog`, { headers: h })
    const enabled = setRes.ok ? (((await setRes.json())[0]?.value)?.enabled === true) : false
    if (enabled) {
      const res = await fetch(`${SB_URL}/rest/v1/blog_posts?select=slug&status=eq.published`, { headers: h })
      if (res.ok) {
        const rows = await res.json()
        blogPaths = ['/blog/', ...rows.map((r) => `/blog/${r.slug}/`)]
      }
    }
  }
} catch (err) {
  console.warn('⚠ sitemap: could not load blog:', err.message)
}

const urls = [...new Set([
  ...staticPaths,
  ...clinicPaths,
  ...dentistPaths,
  ...categoryPaths,
  ...servicePaths,
  ...dbServicePaths,
  ...dbCustomPagePaths,
  ...blogPaths,
])]

const today = new Date().toISOString().slice(0, 10)

function priority(p) {
  if (p === '/') return '1.0'
  if (clinicPaths.includes(p)) return '0.9'
  if (p === '/clinics/' || p === '/services/' || categoryPaths.includes(p)) return '0.8'
  if (servicePaths.includes(p)) return '0.7'
  if (dentistPaths.includes(p)) return '0.6'
  return '0.5'
}

// Each EN path may get a Spanish twin at /es<path>. When ES is public, both URLs
// are emitted with a full set of hreflang alternates (en, es, x-default→en) so
// Google serves the right language and never sees duplicate content. Until then,
// only English is listed — the Spanish pages are built but not advertised.
function urlBlock(loc, alts, prio) {
  const links = (alts ?? [])
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${DOMAIN}${a.path}" />`)
    .join('\n')
  const linksLine = links ? `${links}\n` : ''
  return `  <url>\n    <loc>${DOMAIN}${loc}</loc>\n${linksLine}    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${prio}</priority>\n  </url>`
}

const blocks = []
for (const u of urls) {
  const prio = priority(u)
  if (ES_PUBLIC) {
    const es = `/es${u}`
    const alts = [
      { lang: 'en', path: u },
      { lang: 'es', path: es },
      { lang: 'x-default', path: u },
    ]
    blocks.push(urlBlock(u, alts, prio))
    blocks.push(urlBlock(es, alts, prio))
  } else {
    blocks.push(urlBlock(u, null, prio))
  }
}
const body = blocks.join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`

const dist = path.join(ROOT, 'dist')
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true })
fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml)

console.log(
  ES_PUBLIC
    ? `✓ sitemap.xml — ${urls.length * 2} URLs (${urls.length} EN + ${urls.length} ES, hreflang-paired · ${clinicPaths.length} clinics · ${dentistPaths.length} dentists · ${categoryPaths.length} categories · ${servicePaths.length} services)`
    : `✓ sitemap.xml — ${urls.length} EN URLs (ES staged, not yet listed · ${clinicPaths.length} clinics · ${dentistPaths.length} dentists · ${categoryPaths.length} categories · ${servicePaths.length} services)`,
)
