# BOCA DENTAL NETWORK — MASTER DOC (single source of truth)
**Last updated:** 2026-06-12 · **Repo HEAD at write:** `a008c75`
**Live site:** boca.datastacklogic.com · **Repo:** `hittekk/boca-dental-network` (**PUBLIC**, branch `main`) — clones with no auth; this is WHY a live token must NEVER be committed (GitHub secret-scanning auto-revokes it).
**Netlify site ID:** `f6412e13-9738-4bf5-bdbf-cb60da6917c2`  *(consensus value across past sessions; verify against Netlify dashboard if a deploy ever lands wrong)*

> This is the consolidated record of everything across all build sessions. Read this first every session.
> **Secrets are NEVER in this file or in git** — they live only in `/home/claude/.dsl/config.json` (recreated each session).

---

## 1. SESSION BOOTSTRAP (container wipes between sessions — do this first)
1. Write `/home/claude/.dsl/config.json` with: `github_pat`, `mapbox_token`, `repo`, `netlify_site_id`.
   - **TOKEN HOME (anti-hunting rule, set 2026-06-12):** the current GitHub PAT lives in the **`gitHUB_PAT` project-knowledge file** — read it first, don't go searching past chats. If that file's token returns `401 Bad credentials`, it's been **rotated** → ask Robert to update the project file with the current one. (Robert maintains that file; it's the single durable store. NEVER put the token in git — repo is public.)
   - **Working token as of 2026-06-12:** the **fine-grained** PAT ending `…IXULLAEFJYiMDDif` (93 chars) is LIVE with **push + admin** on this repo. NOTE: this REVERSES the old note here — it was the *fine-grained* one that survived, not a classic token. Verify with `curl -H "Authorization: Bearer $PAT" https://api.github.com/repos/hittekk/boca-dental-network` (look for `"push": true`).
   - If `mapbox_token` is missing this session, build-only work is blocked until Robert pastes it or it's pulled from a past session; code/content edits + smoke tests don't need it.
2. Clone: `git clone https://hittekk:${PAT}@github.com/hittekk/boca-dental-network.git`
3. `npm ci` (needed for builds, not for doc edits). Skipping it causes silent build failures.
- Mapbox token is a build-time env var, NOT committed, NOT readable via Netlify MCP (deploy ops only). Uploads land in `/mnt/user-data/uploads/` and reset every session.

## 2. WORKFLOW RULES (strict)
- **Build:** `VITE_MAPBOX_TOKEN=$(python3 -c "import json;print(json.load(open('/home/claude/.dsl/config.json'))['mapbox_token'])") npx vite build`
- **Push:** `git push "https://hittekk:${PAT}@github.com/hittekk/boca-dental-network.git" main`
- **EVERY dev commit message MUST include `[skip netlify]`.** Nothing goes live until Robert explicitly says **"push to netlify."** `[skip netlify]` pushes feed Robert's **localhost:8080 watcher** (pulls `main` every ~30s) and do NOT deploy live.
- `vite build` does **NOT** typecheck → a green build can still crash at runtime. **Smoke-test any touched render path before pushing.**
- **`LocationPageV1.tsx` — NEVER modify unless explicitly directed.** Restore: `git checkout v1.2-location-final -- src/pages/LocationPageV1.tsx`.
- One page at a time. Do NOT retro-edit previously approved pages.
- Client-approved, DO NOT change: Reviews page filter **tab strip**; Clinics page filter **pills**.
- No embedded forms anywhere — only buttons linking to `/request-consultation`.

## 3. ARCHITECTURE CONSTRAINT (do not violate)
ALL photo / gallery / provider data is **data-driven on the location & doctor objects in `src/data/initialData.ts`** — never hardcoded in components. It serializes into the DentalPress backend (`wp_options` JSON → `window.__INITIAL_DATA__`) so staff edit content from WP admin with zero code changes. Same rule applies to the provider→clinic mapping.
- Stack: React / Vite / TypeScript / Tailwind / Framer Motion / Mapbox GL / Supabase.
- Variant A (Modern Clinic) only; V2/V3 preserved as templates (see `TEMPLATES.md`).
- Brand: ORANGE `#F3672A` · NAVY `#001D3D` · BLUE `#162E7A`. Main phone (702) 456-0005.
- Language: EN↔ES toggle via `useLang()` / `t(...)`. **Every component using `lang` must call `useLang()` internally** or it white-screens. Spanish landing renders the Homepage component for parity.

## 4. SMOKE-TEST HARNESS (learned the hard way)
- One Node script = SPA http server (serve `dist`, fall back to `index.html` only for extension-less paths; real 404 for missing assets) **+** puppeteer, placed **inside** the repo dir so `puppeteer` resolves. Delete the script after.
- `waitUntil:'domcontentloaded'` + ~1.8s settle. **`networkidle2` hangs** on Mapbox tile retries.
- `page.setRequestInterception(true)`, `req.abort()` for `/mapbox|tiles|events\.map/i`. Filter those + `401|access token|net::ERR|Failed to load resource` from console errors.
- Hardstop `setTimeout(()=>process.exit(2), ~45–75s)` — background processes don't survive across bash calls.
- Routes: clinics `/clinics/:slug`; provider bios `/about-us/dentists/:slug`.

## 5. PHOTO-INTAKE PIPELINE (per batch, Pillow)
1. Build a **labeled contact sheet keyed by FILE LEADING NUMBER** (upload order ≠ leading number — always verify via the sheet).
2. View → map scene→leading#.
3. **★ STANDING DIRECTIVE: post ALL images and let the client decide cuts** — present every shot with scene labels + a suggested disposition; flag likely-drops (back-office, restroom, empty lot, any screen showing a patient appointment schedule = PHI) but do NOT exclude unilaterally. Wire only the keepers after Robert/Frankie/Carlos choose.
4. Convert keepers: location → **WebP 1600w q82 method6** → `public/locations/<slug>/NN-name.webp`; portraits → **WebP 600w q85** → `public/team/` (`dr-<slug>.webp`, `om-*.webp`).
5. Wire `heroImage` + flat `gallery[]` mirroring the `charleston-lamb` object. `01-reception.webp` is always the hero; exteriors last; alternates committed as `alt-*.webp` but NOT in the gallery array.
6. Build → smoke-test `/clinics/<slug>` → commit `[skip netlify]` → push.

## 6. LOCATIONS — 9 LV clinics (slug | address | phone | status)
| slug | address | phone | gallery |
|---|---|---|---|
| russell-eastern | 5642 S Eastern Ave, Ste B | (702) 984-3678 | ✅ 8 |
| boca-kids-dentistry | 5642 S Eastern Ave, Ste F | (702) 389-1543 | 🔲 needs photos |
| bonanza-eastern | 556 N Eastern Ave, Ste I | (702) 960-4484 | ✅ 11 |
| sahara-decatur | 4750 W Sahara Ave, Ste 12 | (702) 381-7059 | ⏳ uploaded, NOT processed |
| jones-i95 | 240 N Jones Blvd, Ste C | (702) 508-0755 | ✅ 10 (suite corrected B→C per signage) |
| charleston-lamb | 4235 E Charleston Blvd | (702) 505-9180 | ✅ 12 |
| flamingo-torrey | 6680 W Flamingo Rd, Ste A | (702) 389-0430 | ✅ 11 |
| cheyenne-commons | 3163 N Rainbow Blvd | (702) 805-1178 | ✅ 13 |
| beltway-marketplace | Eastern Ave & E Serene Ave | (702) 000-0000 placeholder | 🔲 needs photos |

**Galleries wired = 6 of 9.** Also: **`9210-eastern`** — 10 photos staged in `public/locations/9210-eastern/` but NOT wired; needs a slug decision (no matching slug among the 9). Reno/Tahoe is a **separate future build** (3 NV locations, different brand) — keep its doctors/locations out of this site.

## 7. PROVIDERS (14) & HEADSHOTS
- **Headshots wired (6 of 14):** Gonzalez, Wall, Minh Nguyen, James Yun, Brendan Marlin, Cole Thompson.
- **Missing headshots (8):** dr-wyatt-dannels, dr-harrison-luu, dr-sana-fahim, dr-kelcey-loveland, dr-johnson-fong, dr-michael-st-laurent, dr-charles-calder, dr-farhan-hossain.
- **Unresolved — Dr. Cal Heinrich:** uploaded portrait matches NO documented slug (closest is `dr-charles-calder`, a different person). Do NOT assume a mapping — ask Robert: new provider? slug? which clinic? Then stage `dr-cal-heinrich.webp`.
- Bios: most populated; historically 3 lacked bios (Dannels/Founder, Loveland, Hossain). Reno doctors (Abdelmeseeh, Montalvo) intentionally excluded as Reno-brand.

### ★ PROVIDER→CLINIC MAPPING — TOP BLOCKER
All 14 providers still have empty `locations: []` in `initialData.ts`, so "Book" CTAs fall back to the location picker. Pattern observed (each dentist arrived alongside that clinic's office manager): **Marlin → Flamingo**, **Cole Thompson → Jones** — implied, NOT confirmed (no-assume rule). **Action:** get Robert's full `provider: clinic(s)` list in ONE pass, populate every `locations[]`, and the book buttons + "Practices At" sections all light up together.

## 8. OFFICE MANAGERS (staged, no UI slot yet)
Pedraza (Charleston), Barone, Rodriguez, Lopez/Yuli (Cheyenne), Raingel/Jennifer (Flamingo), Rabre/Sildy (Jones) — plus pending **Liz Reyes** (OM Sahara). **Open decision:** add a "Meet the Team / Office Managers" strip on About, or keep holding.

## 9. BOOKING FLOW
- `/request-consultation` — 2-step (location picker → form). `ConsultationForm` has an `embedded` prop for inline hero use.
- Deep link `/request-consultation?location=<slug>` pre-selects + locks the office and skips to step 2. All site-wide "Book" CTAs route here.
- Fixed: "Book with RDH" credential-stripping bug; compound-surname handling (e.g. "St. Laurent").

## 10. SERVICE PAGES
- 19 full 11-section pages in `src/data/serviceContent.ts`; `generateScaffold()` auto-generates copy for ~33 remaining slugs; `src/data/serviceCatalog.ts` holds 52 service-page definitions.

## 11. GOING LIVE (only when Robert says "push to netlify")
- GitHub pushes alone do NOT reliably trigger Netlify builds. Reliable paths: **local build → Netlify MCP `deploy-site`** (dist is gitignored), OR Chrome automation publish, OR push a commit **without** `[skip netlify]` (e.g. `git commit --allow-empty -m "deploy: ..."`).
- Verify live: `curl -s "https://boca.datastacklogic.com/clinics/" | grep -o 'src="/assets/index-[^"]*"'`, then grep that bundle for expected strings.
- Restoration checkpoints: git tags `v1.1-stable`, `v1.2-location-final`; `v1.0-stable`. Past stable deploys noted: `fb43ab4`, `6a140a60847e25188d621b57`.

## 12. KEY FILES
| File | Purpose |
|---|---|
| `src/data/initialData.ts` | locations (`heroImage`/`gallery`/`faqs`/`gbp_id`) + doctors (`photo`/`bio`/`title`/`locations`) |
| `src/pages/LocationPageV1.tsx` | clinic page — **LOCKED**; gallery/lightbox/hero state lives in the `NeighborhoodNarrative` sub-component (moving it out caused the `hasGallery` crash) |
| `src/pages/LocationPage.tsx` | route wrapper + `COORDS_BY_LOCATION` |
| `src/pages/DentistPage.tsx` | provider page; `bookHref` + lastName logic |
| `src/pages/CorePages.tsx` | hub pages incl. ClinicsHubPage, ReviewsPage, RequestConsultationPage (reads `?location=`) |
| `src/data/dentistContent.ts` | `dentistContentFor(slug)` overlays initialData onto bios |
| `src/data/serviceContent.ts` / `serviceCatalog.ts` | service page copy + 52 defs |
| `src/components/ConsultationForm/ConsultationForm.tsx` | 2-step booking form |
| `src/components/shared/AllLocationsMap.tsx` | Mapbox multi-pin map |
| `src/App.tsx` | routes (`/clinics/:slug`, `/about-us/dentists/:slug`) |
| `TEMPLATES.md` / `LAUNCH_CHECKLIST.md` / `SESSION_HANDOFF.md` | reactivate variants / full go-live list / session pointer |

## 13. SUPABASE & INTEGRATIONS
- Supabase project `kedtmmfgqkvnqxeqjike` (leads + locations tables — confirm they exist before launch).
- SmileTransformations component is **hidden** pending before/after photos from Carlos (uncomment in `App.tsx` when delivered).

## 14. OPEN ITEMS (priority order)
1. **Provider→clinic mapping** (BLOCKER) — get full list, populate all `locations[]`.
2. **Dr. Cal Heinrich** — confirm identity/slug/clinic before staging; stage **Liz Reyes** as `om-liz-reyes.webp`.
3. **Sahara & Decatur** — re-upload photos (container reset) and process per pipeline.
4. **8 missing headshots** (list in §7).
5. **Office-manager strip** decision (§8).
6. **9210-eastern** slug decision (§6).
7. Pre-launch: permanent `VITE_MAPBOX_TOKEN` in Netlify env; Supabase leads table confirm; real NAP / GBP Place IDs / hours per `LAUNCH_CHECKLIST.md`; FAQ page (schema `FAQPage`); Blog (Supabase + Netlify, reverse-proxied under `/blog/`); Reno/Tahoe separate build.

## 15. PEOPLE
- **Frankie** — Boca CMO (approvals). **Carlos** — before/after photos. Robert "HIT" Hicks — DataStackLogic, owner/dev.
