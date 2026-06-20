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

const urls = [...new Set([
  ...staticPaths,
  ...clinicPaths,
  ...dentistPaths,
  ...categoryPaths,
  ...servicePaths,
  ...dbServicePaths,
  ...dbCustomPagePaths,
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

const body = urls
  .map((u) =>
    `  <url>\n    <loc>${DOMAIN}${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority(u)}</priority>\n  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

const dist = path.join(ROOT, 'dist')
if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true })
fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml)

console.log(`✓ sitemap.xml — ${urls.length} URLs (${clinicPaths.length} clinics · ${dentistPaths.length} dentists · ${categoryPaths.length} categories · ${servicePaths.length} services)`)
