# Boca Dental Network — Session Handoff
**Last updated:** 2026-05-26  
**Live site:** boca.datastacklogic.com  
**Repo:** hittekk/boca-dental-network (branch: main)  
**Netlify Site ID:** f6412e13-9738-4bf5-bdbf-cb60da6917c2  
**Deploy method:** local build → Netlify MCP (dist is gitignored)  
**Mapbox token:** [MAPBOX_TOKEN — set in Netlify env vars]

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
