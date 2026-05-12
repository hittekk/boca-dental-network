#!/usr/bin/env node
/**
 * prerender.mjs
 *
 * After `vite build`, run the built bundle in a headless Chrome, scroll the
 * page to trigger every Framer-Motion whileInView animation, capture the
 * fully-rendered DOM, and write it back to dist/index.html.
 *
 * Result: view-source on the deployed site shows the complete homepage HTML
 * (every section, every word) instead of an empty React shell.
 *
 * Trade-off: build takes ~30s longer; the snapshot has `opacity: 1` on every
 * animated element (animations have already played). React hydrates and
 * preserves the DOM — there's no animation re-flash on load.
 */

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import serveHandler from 'serve-handler'
import puppeteer from 'puppeteer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PORT = 4173

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error('✗ dist/index.html not found — run `vite build` first.')
  process.exit(1)
}

// ── Start a static server serving dist/ ───────────────────────────────────
// Important: rewrite / → /index.html so the SPA root resolves, otherwise
// serve-handler defaults to a directory listing.
const server = http.createServer((req, res) =>
  serveHandler(req, res, {
    public: DIST,
    rewrites: [
      { source: '/', destination: '/index.html' },
    ],
  }),
)
await new Promise((r) => server.listen(PORT, r))
console.log(`✓ Local static server on http://localhost:${PORT}`)

// ── Launch headless Chrome ────────────────────────────────────────────────
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900 })

await page.goto(`http://localhost:${PORT}/`, {
  waitUntil: 'networkidle0',
  timeout: 60_000,
})
console.log('✓ Page loaded — triggering all whileInView animations…')

// ── Scroll the entire page to fire every IntersectionObserver hook ────────
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
    }, 60)
  })
})

// Let any settling animations complete + IntersectionObserver re-fire at top
await new Promise((r) => setTimeout(r, 1500))

// ── Capture the rendered DOM ──────────────────────────────────────────────
let html = await page.content()
console.log(`✓ Captured ${html.length.toLocaleString()} bytes of rendered HTML`)

// Strip dev-time / hydration-breaking artifacts:
//   - Inline framer-motion transforms that may re-trigger on hydrate
//   - Vite HMR script tags (shouldn't exist in prod build, but defensive)
html = html.replace(
  /<script[^>]*type="module"[^>]*data-vite[^>]*>[\s\S]*?<\/script>/g,
  '',
)

// ── Write back to dist/index.html ─────────────────────────────────────────
const outPath = path.join(DIST, 'index.html')
fs.writeFileSync(outPath, html, 'utf-8')
console.log(`✓ Wrote prerendered HTML → ${outPath}`)

// ── Cleanup ───────────────────────────────────────────────────────────────
await browser.close()
server.close()
console.log('✓ Prerender complete')
