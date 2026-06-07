# Boca Dental Network — Session Handoff
**Last updated:** 2026-06-07 (HEAD `a2b40ac`)
**Live site:** boca.datastacklogic.com
**Repo:** hittekk/boca-dental-network (branch: main)
**Netlify Site ID:** short slug `f6412e13` — ⚠️ VERIFY full ID against Netlify dashboard (historical docs disagree: `…cb60da6917c2` vs `…cb96da6917c2`)
**Secrets:** never committed. Live only in `/home/claude/.dsl/config.json` (github_pat, mapbox_token) — recreate each session.

---

## ⚡ SESSION BOOTSTRAP (container wipes between sessions — do this first)
1. Write `/home/claude/.dsl/config.json` with: `github_pat` (working: classic `ghp_fCXR…`; the fine-grained `github_pat_11AAIK…` is REVOKED), `mapbox_token` (`pk.eyJ1IjoiaGl0dGVray…`), `repo`, `netlify_site_id`. If either secret is lost, ask Robert to re-paste.
2. Clone: `git clone https://hittekk:${PAT}@github.com/hittekk/boca-dental-network.git`
3. `npm ci` (needed only for builds, not for doc edits).
- Mapbox token is build-time env var, NOT in repo, NOT readable via Netlify MCP (deploy ops only).

## 🔒 WORKFLOW RULES (strict)
- **Build:** `VITE_MAPBOX_TOKEN=$(python3 -c "import json;print(json.load(open('/home/claude/.dsl/config.json'))['mapbox_token'])") npx vite build`
- **Push:** `git push "https://hittekk:${PAT}@github.com/hittekk/boca-dental-network.git" main`
- **EVERY dev commit message MUST include `[skip netlify]`.** Nothing goes live until Robert explicitly says "push to netlify." GitHub `[skip netlify]` pushes are the authorized dev loop — Robert's localhost:8080 watcher pulls `main` every ~30s; this does NOT deploy live.
- `vite build` does NOT typecheck → smoke-test any touched render path before pushing.
- `LocationPageV1.tsx` — NEVER modify unless explicitly directed. (Restore: `git checkout v1.2-location-final -- src/pages/LocationPageV1.tsx`)
- All photo/gallery/provider data stays data-driven in `src/data/initialData.ts` → `window.__INITIAL_DATA__`.

## ★ STANDING DIRECTIVE (all locations)
"Post all images, let the client decide what is not a good image." Build a labeled contact sheet, PRESENT every shot with scene labels + a suggested disposition (flag likely-drops: back-office, restroom, empty lot) but do NOT exclude unilaterally. Wire only the keepers after Robert/Frankie/Carlos pick cuts.

## 📷 PHOTO-INTAKE PIPELINE (per batch)
Uploads land in `/mnt/user-data/uploads/` (resets each session). Pillow available.
1. Build labeled contact sheet keyed by FILE LEADING NUMBER (upload order ≠ leading number — always verify via the sheet).
2. View → map scene→leading#. 3. Present all per standing directive.
4. Convert keepers: location → WebP 1600w q82 method6 → `public/locations/<slug>/NN-name.webp`; portraits → WebP 600w q85 → `public/team/` (`dr-<slug>.webp`, `om-*.webp`).
5. Wire `heroImage` + flat `gallery[]` mirroring `charleston-lamb` in initialData.ts. `01-reception.webp` is always hero; exteriors last; alternates committed as `alt-*.webp` but NOT in the gallery array.
6. Build → smoke-test `/clinics/<slug>` → commit `[skip netlify]` → push.

**Smoke-test harness:** place the node script INSIDE the repo dir (so `puppeteer` resolves). One script = SPA http server (serve `dist`, fall back to index.html only for extension-less paths) + puppeteer. `waitUntil:'domcontentloaded'` + ~1.8s settle (networkidle2 hangs on Mapbox). `setRequestInterception(true)`, abort `mapbox|tiles|events.map`. Hardstop `setTimeout(...process.exit)`. Delete script after.

## 📊 GALLERY STATUS — 6 of 9 LV clinics wired
✅ bonanza-eastern · charleston-lamb · cheyenne-commons · flamingo-torrey · jones-i95 · russell-eastern (latest, `a2b40ac`)
🔲 boca-kids-dentistry (5642 S Eastern Ste F) · beltway-marketplace (placeholder phone) · sahara-decatur ⏳ (uploaded but NOT processed; container reset — Robert must re-upload to process)
🔲 9210-eastern: 10 photos staged in `public/locations/9210-eastern/` but NOT wired — needs a slug decision.

## 🚧 OPEN ITEMS (priority order)
1. **Provider→clinic mapping (BLOCKER):** all 14 providers in initialData.ts have empty `locations: []` → book CTAs fall back to picker. Need Robert's full `provider: clinic(s)` list in one pass. Marlin↔Flamingo, Thompson↔Jones implied but NOT confirmed (no-assume rule).
2. **Unresolved provider — Dr. Cal Heinrich:** matches no documented slug (closest is `dr-charles-calder`, a different person). Ask Robert: new provider? slug? which clinic? before staging. Liz Reyes = OM Sahara → stage `om-liz-reyes.webp`.
3. **8 missing headshots:** dr-wyatt-dannels, dr-harrison-luu, dr-sana-fahim, dr-kelcey-loveland, dr-johnson-fong, dr-michael-st-laurent, dr-charles-calder, dr-farhan-hossain.
4. **Office managers staged, no UI slot:** pedraza, barone, rodriguez, lopez, raingel, rabre (+ pending reyes). Decision: add an "Office Managers" strip on About, or keep holding.
5. Pre-launch: permanent `VITE_MAPBOX_TOKEN` in Netlify env; Supabase leads table confirm; SmileTransformations hidden pending Carlos photos.

---

## Stack
- React / Vite / TypeScript / Tailwind / Framer Motion / Mapbox GL
- Variant A (Modern Clinic) only — V2/V3 preserved as templates in src/components/v2|v3/
- Data: src/data/initialData.ts → window.__INITIAL_DATA__ in production
- Language toggle: ?lang=es via src/lib/useLanguage.ts + src/content/homepage.ts

---

## ✅ Confirmed Done This Session

### /clinics/ (Locations Hub)
- Navy hero with ClinicsHeroMap SVG — gradient overlays REMOVED (hard line gone)
- Mapbox multi-pin map — 48px tooth SVG pins (orange = standard, navy = Boca Kids)
- Map pin click → highlights card only, NO scroll down (scrollIntoView removed)
- Filter pills — wrapping pill style (KEEP AS IS — client approved)
- Location card grid — 3 col, neighborhood filter, orange ring on active card

### /patient-resources/reviews/ (Reviews Page)
- Hero illustration — Google Reviews SVG (NOT a photo, NO gradient overlay)
  - Main card: G logo, 4.8 rating, 5 stars, 1534+ reviews, mini bar chart
  - 3 floating mini review cards with Google brand accent colors
  - Orange floating badge — REMOVED
  - Trophy illustration — REMOVED
- Filter bar — horizontal scroll TAB STRIP (client approved, DO NOT change)
  - Single row, no wrapping, orange underline on active tab
  - "All Locations 9" badge, left/right white fades
  - Sticky at top of page

### Service Pages
- 19 fully-written 11-section pages in src/data/serviceContent.ts
- generateScaffold() auto-generates copy for remaining ~33 slugs
- Full list: invisalign, dental-exams-cleanings, emergency-dental-care,
  teeth-whitening, dental-crowns, root-canal-treatment, dental-implants,
  braces, veneers, wisdom-tooth-removal, tooth-colored-fillings,
  gum-disease-treatment, dentures, smile-makeovers, full-arch-implants,
  dental-bonding, dental-bridges, scaling-root-planing, tooth-extractions

### Booking Flow
- /request-consultation — 2-step form (location picker → form)
- Deep link: /request-consultation?location=slug pre-selects office
- ConsultationForm has embedded prop for inline hero use
- All "Book Appointment" links site-wide → /request-consultation

### Other
- Se Habla Español / EN↔ES toggle — full homepage wired
- SmileTransformations — hidden (awaiting before/after photos from Carlos)
- Supabase: kedtmmfgqkvnqxeqjike (leads + locations — confirm tables exist before launch)

---

## 🔲 Remaining (LAUNCH_CHECKLIST.md for full list)
1. Individual location pages /clinics/[slug]/ — review + content per sitemap
2. Real data — phone numbers, GBP Place IDs, hours, NAP per LAUNCH_CHECKLIST.md
3. SmileTransformations — uncomment in App.tsx when Carlos delivers photos
4. Netlify env var — VITE_MAPBOX_TOKEN needs to be set permanently in Netlify dashboard
5. Reno/Tahoe build — separate build, 3 NV locations, different brand
6. Supabase leads table — confirm before launch
7. FAQ page — schema-optimized FAQPage
8. Blog — Supabase + Netlify, reverse-proxied under /blog/

---

## Key Files
| File | Purpose |
|------|---------|
| src/App.tsx | Routes — Variant A only |
| src/pages/CorePages.tsx | ALL hub pages incl. ClinicsHubPage, ReviewsPage, RequestConsultationPage |
| src/components/ConsultationForm/ConsultationForm.tsx | 2-step booking form |
| src/components/shared/AllLocationsMap.tsx | Mapbox multi-pin map |
| src/data/serviceContent.ts | 19 full service pages + scaffold generator |
| src/data/serviceCatalog.ts | 52 service page definitions |
| src/pages/LocationPageV1.tsx | Individual location page template |
| src/pages/LocationPage.tsx | Route wrapper + COORDS_BY_LOCATION |
| TEMPLATES.md | How to reactivate Variant B/C |
| LAUNCH_CHECKLIST.md | Full go-live checklist |

---

## Rules (Client Directed)
- One page at a time. When client moves to a new page, do NOT go back and change previous pages.
- Reviews page filter tab strip — DO NOT change, client approved.
- Clinics page filter pills — DO NOT change, client approved.
- No changes to any page unless client explicitly asks.
