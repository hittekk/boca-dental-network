# Boca Dental & Braces — Session Handoff
**Project:** bocadentalandbraces.com mockup  
**Live preview:** https://boca.datastacklogic.com  
**Local repo:** `/Users/hittekk/Desktop/boca-dental-network`  
**GitHub:** `git@github.com:hittekk/boca-dental-network`  
**Client:** Frankie (CMO) via Carlos Mendez  
**Date range:** May 2026  

---

## What This Project Is

A full Vite + React + TypeScript SPA built against Treysyde's 5-document spec (Homepage 10§ · Location 9§ · Service 11§ · Invisalign pilot · Sitemap). Three complete design variants ship in a single codebase — the client picks one (or a mix).

### Three Design Variants

| Variant | Theme | Key Feel |
|---------|-------|----------|
| **A — Modern Clinic** | `light` | White bg, navy headings, clean clinical |
| **B — Warm Editorial** | `cream` | Warm off-white, Georgia serif headlines, editorial/luxury |
| **C — Super Modern** | `dark` | `#0A0A0F` bg, uppercase condensed type, glassmorphism panels |

**Navigation:** The live site routes by pathname:
- `boca.datastacklogic.com/` → Homepage (all 3 variants, tabbed)
- `/clinics/bonanza-eastern/` → Location page (V1 A, V2 B, V3 C)
- `/general-dentistry/` `/invisalign/` `/orthodontics/` etc. → Service pages

---

## Architecture

```
src/
  components/
    v1/           # Variant A components
    v2/           # Variant B components
    v3/           # Variant C components
    shared/       # Shared across all 3 (SmileTransformations, LocationsMap, etc.)
    CTA/          # Consultation form + CTA strip
    ConsultationForm/
    Locations/    # V1 locations grid
  pages/
    LocationPageV1.tsx    # A — warm card grid
    LocationPageV2.tsx    # B — editorial full-bleed
    LocationPageV3.tsx    # C — dark glassmorphism
    ServicePageV1/V2/V3.tsx
    InvisalignPage.tsx
  lib/
    site-data.tsx         # useSiteData() hook — all locations, phone, schema data
  data/
    locationDetails.ts    # Per-location landmarks, languages, parking, hours
  types/            # Location, Service, etc.

scripts/
  prerender.mjs    # Puppeteer → 52 routes → dist/<route>/index.html
  inject-schema.mjs  # Writes JSON-LD to dist/index.html at build time

dist/              # Prebuilt, uploaded to Netlify directly (never built on Netlify)
```

### Build Pipeline

```bash
# Full local build (run before every deploy)
npm run build
# = inject-schema → vite build → prerender 52 routes (~135s)

# Deploy to Netlify (upload prebuilt dist, no-op build on Netlify side)
# Use @netlify/mcp deploy-site with prebuilt dist/
# Site ID: stored in memory/reference_boca_netlify_deploy.md
```

**Why no-op build?** Netlify's container OOMs when Puppeteer tries to download Chromium. We prerender locally and upload the finished dist/.

---

## All 9 Locations

| ID | Label | Neighborhood | Kids |
|----|-------|-------------|------|
| 1 | Bonanza & Eastern | East Las Vegas | — |
| 2 | Russell & Eastern | Southeast Las Vegas | — |
| 3 | Sahara & Decatur | West Las Vegas | — |
| 4 | Charleston & Lamb | Central Las Vegas | — |
| 5 | Flamingo & Torrey Pines | Spring Valley | — |
| 6 | Cheyenne Commons | Northwest Las Vegas | — |
| 7 | Beltway Marketplace | Southern Highlands | — |
| 8 | Jones & I-95 | Southwest Las Vegas | — |
| 9 | Boca Kids Dentistry | Henderson | ✓ |

---

## Per-Route Prerendering (52 Routes)

Every URL gets its own `dist/<route>/index.html` with:
- Unique `<title>` tag
- Unique `<meta name="description">`
- Correct JSON-LD schema for that page type
- Branded ASCII masthead in HTML source
- Section divider comments (homepage only)
- Footer credit line

Routes covered: homepage, 9 location pages × 3 variants, all service pages, all pillar pages, Invisalign.

---

## JSON-LD Schema

Canonical schema is injected by `scripts/inject-schema.mjs` at build time. Covers:
- `Organization` (brand-level)
- `MedicalBusiness` (local business per location)
- `WebSite` + `SearchAction`
- `LocalBusiness` with `AggregateRating`
- `MedicalProcedure` for each service
- `Person` + `Physician` for dentist bios
- `FAQPage` on FAQ section

**Service URL prefix:** `/[slug]/` (e.g. `/general-dentistry/`) — NOT `/services/[slug]/`

---

## Key Design Decisions Made This Session

### Typography
- **Google Sans + Open Sans** confirmed from brand guide pptx
- V2 (cream) headlines: Georgia serif italic for hero anchors
- V3 (dark): uppercase condensed, monospace label elements

### Color Palette
- Brand orange: `#F3672A`
- Brand navy: `#162E7A` / `#001D3D`
- V3 background: `#0A0A0F`

### Component-Level Changes

**SmileTransformations** — Theme-aware H2 scale:
- light: `clamp(28px, 4vw, 44px)`
- cream: `clamp(40px, 5.5vw, 72px)`
- dark: `clamp(40px, 4.6vw, 62px)`

**LocationsMap** — Henderson removed from neighborhood pills; replaced with Southern Highlands. Theme-aware H3 sizing.

**StepsV2** — Removed backdrop "04" watermark and per-card numerals (too busy).

**FooterV2** — Mobile stack breakpoint at 880px (masthead, links grid, locations grid all go single-column).

**LocationPageV3 hero** — 3-tier H1:
1. Brand kicker (18px monospace orange)
2. Connector ("YOUR [NEIGHBORHOOD] DENTAL OFFICE NEAR")  
3. Anchor (Georgia italic, clamp 40→80px, orange)
- Intersection-name watermark (259px, 0.045 opacity) in background
- Radar pulse animation on green status dot
- Status console moved above NAP card (right column)
- Grid `alignItems: center`

**LocationPageV2 hero** — 3-tier H1:
1. Kicker: clamp(13→17px), faded uppercase
2. Connector: clamp(22→36px), uppercase
3. Anchor: clamp(40→72px), Georgia italic, orange

**LocationPageV1 NeighborhoodNarrative** — Redesigned as two-column:
- Left: narrative with drop cap (80px orange first letter), landmark chips with icons
- Right: sticky at-a-glance card (address, hours, languages, parking, emergency)

**LocationSpecSections**:
- Hours table: last row no `borderBottom` (prevents double line with footer)
- NAP card: Emergency Appointments row (Siren icon) added; Accepting New Patients row removed
- "Read all reviews" → pill button (navy border, hover animated)

**ConsultationForm** — "Jones & I-95 office" (was "Jones & Alta office")

**CTA.tsx** — "4.9 · 1,200+ reviews" (was 2,000+)

**AudienceRoutingV3** — All service hrefs corrected (removed `/services/` prefix)

**HeroV3** — H1 arranged as:
```
Vegas' Dental
Home. Nine offices.
One team.          ← orange
```
fontSize: `clamp(28px, 4vw, 58px)`, `whiteSpace: nowrap` per line

---

## Mapbox

`VITE_MAPBOX_TOKEN` must be set in Netlify environment variables for maps to render. Set via Netlify MCP manage-env-vars. Maps use `LocationsMap.tsx` in the shared/ folder.

---

## Git Commits (this session)

| Hash | Description |
|------|-------------|
| `21f8611` | Full build: all spec fixes, visual polish, schema corrections |
| `277a435` | Per-route prerender pipeline (52 routes → unique HTML per URL) |

---

## Carlos Email — How to Explain Mockup Navigation

> Subject: Boca Dental Mockup — How to Navigate the Preview
>
> Hi Carlos,
>
> The preview link is: **https://boca.datastacklogic.com**
>
> What's inside:
> - **Homepage** — all three design directions are visible when you load the page. You can switch between them using the tabs at the top.
> - **Location page** — go to `/clinics/bonanza-eastern/` to see the same location in all three design styles side-by-side.
> - **Service pages** — `/general-dentistry/`, `/invisalign/`, `/orthodontics/` etc.
>
> We can mix and match elements from one theme to another — for example, take Variant C's dark hero with Variant A's card grid below it. Everything is modular.
>
> Let us know which direction resonates with Frankie and we'll lock in that design.

---

## Phase 2 (Not Started)

- [ ] Real photography (replace placeholder images)
- [ ] Live Google reviews / GBP Place IDs
- [ ] Dentist bios (real names, photos, credentials)
- [ ] Service page body content (Treysyde 11§ spec)
- [ ] Legal text (Privacy Policy, HIPAA Notice, Accessibility statement)
- [ ] Booking integration (Dentrix / Eaglesoft widget)
- [ ] GA4 + GTM tracking
- [ ] WordPress plugin packaging → repo `dentalpress-frontend-plugin`
- [ ] Brand font swap to Google Sans for headlines

---

## Memory Files

| File | Contents |
|------|----------|
| `memory/projects/boca-dental.md` | Full live state documentation |
| `memory/reference_boca_netlify_deploy.md` | Site ID, DNS, redeploy steps |
| `memory/feedback_netlify_prerender_pipeline.md` | OOM/no-op build pattern |
| `memory/playbooks/boca-spec-bible.md` | Authoritative Treysyde spec consolidation |

---

## Treysyde Spec Status

| Page Type | Sections | Status |
|-----------|----------|--------|
| Homepage (10§) | Hero, Schema/SEO, About, Locations Map, Services, New Patients, Boca Kids, Financing, FAQ, CTA | ✅ All implemented |
| Location (9§) | Hero, NAP, Services offered, Neighborhood, Hours, Smile Transformations, Reviews, FAQ, CTA | ✅ All implemented |
| Service (11§) | Hero, Overview, Benefits, Process, FAQ, Schema, etc. | ✅ All implemented |
| Invisalign Pilot | Dedicated page, correct schema | ✅ |

**Remaining content fills:** placeholder copy → real copy, placeholder images → real photos.
