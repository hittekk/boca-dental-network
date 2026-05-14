# Boca Dental & Braces — Launch Checklist

Comprehensive list of everything that must be confirmed, written, or wired up
before this site can go live. Every page in the Expansion sheet of the sitemap
has a scaffold in code with placeholder content where real assets are missing.

This checklist is grouped by **owner** and **page type** so Frankie's team,
the content writers, the legal counsel, and DSL dev can each see their lane.

Tag legend:
- **[verify]** Frankie or GBP — confirm against the live business records
- **[content]** Content/creative team — write, source, or approve copy/imagery
- **[legal]** Boca's counsel — review and approve legal text
- **[dev]** DSL/DentalPress engineering — implement before launch

Cross-reference: `~/Desktop/Boca Dental Web Build Sitemap V1.xlsx` (Expansion sheet) for the canonical URL list, and the four Treysyde PDFs on the same desktop for spec.

---

## A · Practice-Level Verification (applies to all pages)

- [ ] **[verify]** Aggregate review count and star rating confirmed (currently `★ 4.9 · 1,200+` across 9 locations — match exact number from GBPs at launch)
- [ ] **[verify]** Year practice was founded confirmed (currently using 2006)
- [ ] **[verify]** Main practice line `(702) 456-0005` confirmed as the central / receptionist number
- [ ] **[verify]** Final list of insurance plans accepted across the network (Delta, Aetna, Cigna, Guardian, MetLife, etc.) — confirm against each clinic's actual contracts
- [ ] **[verify]** Whether Nevada Medicaid is accepted at every location or only select ones (currently advertised as "eligible patients at select locations")
- [ ] **[verify]** Whether SAME-DAY emergency policy applies to all 9 LV clinics or only some

---

## B · Per-Location Data (×9 clinics)

For each of the 9 LV locations, confirm and replace placeholders. Slugs match the sitemap Expansion sheet:

`bonanza-eastern`, `russell-eastern`, `sahara-decatur`, `charleston-lamb`, `flamingo-torrey`, `cheyenne-commons`, `jones-i95`, `beltway-marketplace`, `boca-kids-dentistry`

### B.1 NAP + GBP data (per location)

- [ ] **[verify · BLOCKER]** Real Google Place ID for every location (`gbp_id` field) — currently every location has `ChIJ-[slug]-placeholder`. Schema validation fails at launch without these.
- [ ] **[verify · BLOCKER]** Phone number — currently `Beltway Marketplace` shows `(702) 000-0000`. All other clinics need numbers matched against the live GBP exactly (no nicknames, no abbreviations).
- [ ] **[verify · BLOCKER]** Street address, suite, ZIP — confirm EXACT format matches each clinic's GBP listing (Google penalizes mismatches).
- [ ] **[verify]** Day-by-day hours per clinic — current scaffold uses `Mon–Sat 9am–7pm, Sun closed (emergency only)` and a `short-Saturday` variant for 3 clinics. See `src/data/locationDetails.ts` → `LOCATION_HOURS_DETAIL`. Each location must be confirmed against GBP.
- [ ] **[verify]** Accepting New Patients — Yes/No per clinic
- [ ] **[verify]** Emergency Appointments policy per clinic — same-day available? walk-ins? after-hours line?
- [ ] **[verify]** Lat/Long coordinates per location for embedded map pin — currently using approximated values in `COORDS_BY_LOCATION` in `src/pages/LocationPage.tsx`. Replace with exact GBP coordinates.

### B.2 Location-page content (per location)

- [ ] **[content · BLOCKER]** Neighborhood narrative paragraph (100-150 words, uniquely written for each clinic) — current scaffolds in `src/data/initialData.ts` `narrative` field. Treysyde flags this as "the #1 local-SEO killer" if duplicated.
- [ ] **[content]** 3-5 location-specific FAQs each (parking, hours, transit, insurance, walk-ins, language). Current `faqs` array on each location is empty or has 2 generic items.
- [ ] **[content]** 3 location-specific Google reviews per clinic for Section 6 — `src/data/locationDetails.ts` → `LOCATION_REVIEWS`. Currently has placeholder reviewer names + plausible bodies. Replace with REAL Google reviews that mention the specific clinic, a provider, or a nearby neighborhood.
- [ ] **[verify]** Languages spoken per clinic — `LOCATION_LANGUAGES` in locationDetails.ts. Currently extrapolated (e.g. Sahara & Decatur has "Mandarin/Cantonese"). Confirm with each clinic's front desk.
- [ ] **[verify]** Parking details per clinic — `LOCATION_PARKING` in locationDetails.ts. Currently descriptive placeholders.
- [ ] **[verify]** Service availability per clinic (which services are NOT offered at each location) — `LOCATION_SERVICES_UNAVAILABLE` in locationDetails.ts. Currently extrapolated from spec note "Sedation at 3, oral surgery at 1, kids at 1." Must be confirmed against each clinic's actual capabilities.
- [ ] **[verify]** Which dentists work at each location — `DOCTORS_BY_LOCATION` map in `src/pages/LocationPage.tsx`. Mock assignments currently.

### B.3 Location-page imagery

- [ ] **[content]** Hero image per clinic (exterior building OR interior). Currently using a single placeholder. Per Treysyde: "Not a generic stock photo shared across all locations."
- [ ] **[content]** Office interior photos for the gallery component (Phase 2 OK if not ready at launch — currently no gallery wired)

### B.4 GBP wiring (per location)

- [ ] **[verify · BLOCKER]** Each clinic's GBP "Website" URL updated to point to `https://bocadentalandbraces.com/clinics/[slug]/` — must happen after launch DNS swap

---

## C · Per-Dentist Data (×14 providers)

Slugs match the sitemap. Currently 14 entries scaffolded in `src/data/initialData.ts` `doctors` array, with full content for 3 pilot dentists (Loveland, Calder, Dannels) in `src/data/dentistContent.ts`. The other 11 use a default template.

### C.1 Universal per-dentist

- [ ] **[verify · BLOCKER]** Each dentist is currently licensed and working at Boca Dental & Braces
- [ ] **[verify]** Full credentials — DDS or DMD, dental school, graduation year, residencies, specialty board status (board-eligible vs board-certified)
- [ ] **[verify]** Specialty designation — General Dentistry / Orthodontics / Oral & Maxillofacial Surgery / Periodontics / Pediatric Dentistry / Endodontics / Prosthodontics
- [ ] **[content]** 2-3 sentence short bio per dentist
- [ ] **[content]** 5-8 sentence long bio per dentist (about page section 2)
- [ ] **[content]** Professional headshot per dentist
- [ ] **[verify]** Languages spoken per dentist
- [ ] **[verify]** Which clinics each dentist practices at (some travel between clinics — see `worksAt` array)

### C.2 Specific high-profile verifications

- [ ] **[verify · BLOCKER]** Dr. Kelcey Loveland — confirm "board-eligible orthodontist" (currently in content). May actually be board-certified. Critical for service-page provider claims.
- [ ] **[verify · BLOCKER]** Dr. Charles Calder — confirm oral and maxillofacial surgeon designation + UCSF residency claim
- [ ] **[verify]** Dr. Wyatt Dannels — confirm founder claim + 2006 founding year + UNLV alma mater
- [ ] **[verify]** "Diamond+ Invisalign provider" claim for Dr. Loveland — this is a real Align Technology designation; only use if true

---

## D · Service Pages (~50 total)

### D.1 Service page status

- [x] **Service page template (11 sections)** — built. See `src/pages/ServicePage.tsx`.
- [x] **Invisalign pilot page** — full content from Treysyde pilot PDF lives at `src/data/serviceContent.ts`. Renders at `/orthodontics/invisalign/`.
- [ ] **[content · BLOCKER]** Full Treysyde 11-section content for the remaining ~49 service pages. Each needs: hero intro (2-3 sentences, GEO citation), "What Is" definition (150-250 words), 2-3 key facts callouts, signs/symptoms list (4-5), candidacy criteria (3-4), step-by-step process (3-5 steps), duration timeline, technology mention, 4-6 benefit cards, optional comparison table (for veneers, implants, smile makeovers), 3-4 differentiator bullets, provider credentials inline (1-2 sentences), 9-location convenience statement, 3-4 service-specific reviews, 6-8 service-specific FAQs, cost range, related-services list (3-4).

Until content is added, each service page falls back to scaffold renderings with "[content needed]" placeholder boxes — all URLs still resolve and have meta + breadcrumb schema.

### D.2 Cost ranges (per service)

- [ ] **[verify]** Realistic Las Vegas cost range for each service. Treysyde explicitly warns NOT to hide pricing — competitive transparency is the spec. Need actual ranges from Frankie / billing for: dental exams, fillings, crowns ($X-$Y), bridges, dentures, implants (currently $1,500-$3,000 per implant per Treysyde example), full-arch / All-on-4, root canals, extractions, wisdom teeth, Invisalign ($3,000-$7,000 confirmed in pilot), traditional braces, veneers, whitening, smile makeovers.

### D.3 Service-page imagery + before/after

- [ ] **[content]** Hero image per service page (replace placeholder)
- [ ] **[content]** Before/after gallery for cosmetic services (veneers, whitening, smile makeovers, Invisalign, implants). **NEVER stock photos** per Treysyde spec — defer to Phase 2 if real patient photos aren't ready. Current homepage `SmileTransformations` component has placeholder slots already.

---

## E · Homepage

Current state is largely Treysyde-compliant. Outstanding:

- [ ] **[content]** Real hero image — currently a placeholder family photo. Per spec: real Boca team or patient lifestyle with consent. Never stock.
- [ ] **[content]** 4 review cards on Section 5 (homepage) selected to cover: (1) general/family/new-patient, (2) ortho or cosmetic, (3) pediatric/family, (4) location-specific. Currently has demo text.
- [ ] **[content]** Before/after gallery photos for §7 (Smile Transformations). 6-8 pairs. Already wired with interactive before/after slider; just needs real URLs in `PAIRS` array in `src/components/shared/SmileTransformations.tsx`.
- [ ] **[verify]** "Bilingual Staff" claim on Why Boca §4 confirmed at every location (or scope to which clinics)
- [ ] **[verify]** Dr. Loveland "board-eligible" / "board-certified" status for §8 provider highlight
- [ ] **[verify]** Dr. Calder oral surgeon credential for §8
- [ ] **[dev]** SiteLinksSearchBox schema implemented + tested in GSC AFTER launch
- [ ] **[dev]** AggregateRating displayed count matches `reviewCount` in schema exactly

---

## F · Core / Patient Resource Pages

| Page | Status |
|---|---|
| `/about-us/` | Scaffold built. **[content]** add: founding story details, mission statement, team-level claims |
| `/about-us/dentists/` | Built — 14 dentists listed |
| `/clinics/` | Built — 9 clinics grid |
| `/services/` | Built — 12 categories grid |
| `/patient-resources/` | Hub built |
| `/patient-resources/new-patient-forms/` | **[content]** PDF forms from Frankie. Will also need an embedded online intake flow integrated with the dental software |
| `/patient-resources/insurance/` | Scaffold built. **[verify]** final PPO list per clinic; **[content]** insurance verification flow |
| `/patient-resources/financing/` | Scaffold built. **[content]** confirm CareCredit + in-house plan exact terms |
| `/patient-resources/reviews/` | **[dev]** live Google reviews feed widget — currently placeholder |
| `/oficina-de-habla-hispana/` | Scaffold built with trust signals. **[content]** Full Spanish-language content team to write the page — testimonials, neighborhood mentions, Spanish-speaking provider highlights, services in Spanish |
| `/contact-us/` | Built — links to all 9 clinic pages |
| `/request-consultation/` | **[dev · BLOCKER]** real booking flow integrated with Boca's booking provider (NexHealth / Yapi / LocalMed / etc.) + email/SMS confirmation; **[verify]** which booking provider Boca uses |
| `/careers` | Scaffold built. **[content]** open positions + ATS link or careers email; **[content]** culture/DEI statements |
| `/privacy-policy/` | **[legal · BLOCKER]** final privacy policy text from Boca's counsel. Must cover CCPA + Nevada NRS 603A. |
| `/hipaa-compliance/` | **[legal · BLOCKER]** final HIPAA Notice of Privacy Practices text from counsel |

---

## G · Schema & SEO Validation

All schema is JSON-LD, currently injected via React `useEffect` (mockup target). Production target: PHP `wp_head` in the DentalPress plugin.

- [x] Homepage: Organization, MedicalBusiness/Dentist (practice), WebSite + SearchAction, Dentist × 9 (LV only, Henderson excluded), Person × 4, FAQPage, AggregateRating
- [x] Location pages: LocalBusiness (this clinic, Dentist/DentalSpecialty subtype), BreadcrumbList, FAQPage, AggregateRating (when reviews > 0), Review (per Section 6 card)
- [x] Service pages: MedicalProcedure, BreadcrumbList, FAQPage, AggregateRating, HowTo (when steps present)
- [x] Dentist pages: Person + Physician (medicalSpecialty, alumniOf, worksFor, workLocation), BreadcrumbList
- [x] Core pages: BreadcrumbList per page

Validation tasks:
- [ ] **[dev · BLOCKER]** Validate every page type via Google Rich Results Test (https://search.google.com/test/rich-results)
- [ ] **[dev]** Validate Schema.org compliance via https://validator.schema.org
- [ ] **[dev]** AggregateRating `reviewCount` matches the displayed number on each page
- [ ] **[dev]** Each location's `openingHoursSpecification` has all 7 days
- [ ] **[dev]** Each location's `geo` block has real lat/lng (not placeholder)
- [ ] **[dev]** `sameAs` arrays populated on Organization (Facebook, Instagram) and per-location LocalBusiness (GBP, Yelp, Healthgrades)
- [ ] **[dev]** Schema injection moves from React `useEffect` to PHP `wp_head` for production deployment
- [ ] **[dev]** Static `index.html` schema block re-generated via `node scripts/inject-schema.mjs` whenever `initialData.ts` changes
- [ ] **[dev]** SiteLinksSearchBox post-launch test in Google Search Console

---

## H · Page Meta (per page type)

- [x] Homepage `<title>`, meta description, canonical, OG — set in `index.html`
- [x] Location pages — set per page via `LocationPageMeta` component using spec formulas
- [x] Service pages — set per page via inline `useEffect` using `ServiceContent.titleTag` + `metaDesc`
- [x] Dentist pages — set per page
- [x] Core pages — set per page

Tasks:
- [ ] **[dev]** Confirm canonical URLs match deployment domain after DNS swap (currently `bocadentalandbraces.com`)
- [ ] **[content]** Per-service meta descriptions — need 150-160 character unique descriptions for all ~49 non-Invisalign service pages
- [ ] **[content]** Per-page OG image (1200×630) — currently using the brand logo as fallback. Per Treysyde "Generate 1200×630 OG image per page type."

---

## I · Mobile + Responsive

- [x] All variants tested at 375×812 (iPhone size)
- [x] Hero CTAs full-width on mobile across all variants
- [x] Hero copy centered on mobile across all variants
- [x] Global mobile safety net in `src/index.css` catches multi-column grids that lack explicit media queries
- [x] Sticky mobile CTA bar
- [ ] **[dev]** End-to-end mobile QA at 320px (iPhone SE) and 414px (Pro Max)
- [ ] **[dev]** Tablet pass at 768px and 1024px

---

## J · Performance + Accessibility

- [ ] **[dev]** Lighthouse run pre-launch — Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100
- [ ] **[dev]** All hero/section images delivered as WebP (production target — placeholders are currently JPG)
- [ ] **[dev]** All images have proper alt text per Treysyde format ("[service] at Boca Dental Las Vegas")
- [ ] **[dev]** Color contrast WCAG AA on all variants (especially Variant C's dark theme)
- [ ] **[dev]** Keyboard-accessible accordion FAQs
- [ ] **[dev]** Focus-visible outlines on all interactive elements
- [ ] **[dev]** Skip-to-main link

---

## K · Integrations + Tracking

- [ ] **[dev]** Booking flow provider chosen + integrated on `/request-consultation/` and all "Book at this location" CTAs
- [ ] **[dev]** Google Analytics 4 set up — confirm which property
- [ ] **[dev]** Google Tag Manager container
- [ ] **[dev]** Google Ads conversion pixel on booking-flow completion
- [ ] **[dev]** Meta Pixel for paid social retargeting
- [ ] **[dev]** Click-to-call tracking (event on `tel:` links per clinic)
- [ ] **[dev]** Form submission tracking (lead-form events)
- [ ] **[dev]** Heatmap/session-recording tool (Hotjar / Clarity)
- [ ] **[dev]** Server-side tracking via Cloudflare Workers (matches DSL standard playbook)

---

## L · Hosting + DNS

- [x] Netlify build config (`netlify.toml`)
- [ ] **[dev]** Production deploy target confirmed (Netlify vs Flywheel)
- [ ] **[dev]** PHP plugin wrapper for WP (DentalPress) — `window.INITIAL_DATA` injection
- [ ] **[dev]** DNS records prepared for instant swap at launch
- [ ] **[dev]** SSL cert (auto via Netlify / Cloudflare)
- [ ] **[dev]** `/blog/*` reverse proxy if blog ships separately (per CLAUDE4)
- [ ] **[dev]** 301 redirects from current site to new URLs — needs current site's full URL map first

---

## M · Pre-Launch Smoke Test

Once everything above is checked off, run:
- [ ] Visit every URL in the sitemap (Expansion sheet) — confirm 200 status, correct title, correct H1
- [ ] Submit `request-consultation` form end-to-end + confirm lead arrives at the right inbox
- [ ] Click-to-call from each location page — confirm correct phone number dials
- [ ] Verify all 9 GBP listings link to their correct `/clinics/[slug]/` page
- [ ] Run Google Rich Results Test against every page type
- [ ] Run Lighthouse on homepage + 1 location + 1 service page
- [ ] Mobile QA at 375px on every page type
- [ ] Verify `inject-schema.mjs` was re-run after final `initialData.ts` changes
- [ ] Search-Console submission of sitemap.xml + IndexNow for the URL list
- [ ] Confirm all `/[category]/[service]/` URLs match the Expansion sheet exactly

---

## N · Known Mismatches Between Treysyde Docs and Sitemap

These should be resolved with Frankie before launch:

1. **Service URLs:** Treysyde Service Page spec says canonical is `/services/[service-slug]/`. Expansion sheet says `/[category]/[service]/` (no `/services/` prefix). Code follows the **sitemap**. Confirm.

2. **Invisalign URL:** Treysyde Invisalign pilot doc says `/services/invisalign/`. Sitemap says `/orthodontics/invisalign/`. Code follows the **sitemap**. Confirm.

3. **Domain:** Treysyde docs use `bocadentallasvegas.com` (their working placeholder). The actual project domain is `bocadentalandbraces.com`. Code uses **`bocadentalandbraces.com`**.

4. **Henderson Boca Kids:** Was previously in our `initialData.ts` (id 10) but is NOT in the LV sitemap Expansion. Code now excludes it. The 10th clinic likely belongs to the future Reno/Tahoe site. Confirm.

5. **Location label spelling:** Expansion sheet uses "Russell & Eastern" (and similar reversed orders) — different from earlier "Eastern & Russell." Sitemap wins. Code follows the **sitemap**.

---

## How to use this checklist

1. Walk Section A first (practice-level facts) — most affect every page.
2. Then B (per-location) — 9 locations × ~15 items each is the bulk of the work.
3. C (dentists) and D (service-page content) are the writer/content team's queue.
4. E + F are the editor's final-pass items.
5. G–N are dev tasks.

Updating `src/data/initialData.ts`, `src/data/locationDetails.ts`, `src/data/dentistContent.ts`, and `src/data/serviceContent.ts` are the four files that absorb 95% of the launch content.
