#!/usr/bin/env node
/**
 * inject-schema.mjs
 * Builds the full homepage JSON-LD graph from INITIAL_DATA and writes
 * it into index.html between <!-- BOCA_SCHEMA_START --> and <!-- BOCA_SCHEMA_END -->
 *
 * This runs as a pre-build step so view-source on the deployed site
 * shows the complete schema graph in raw HTML — no JS rendering required.
 *
 * Re-runnable: idempotent. Run again any time INITIAL_DATA changes.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ── Read the data ──────────────────────────────────────────────────────────
// We can't import the .ts file from a plain Node script, so we eval it.
// Strip the TS interface import + type annotation, keep the JS export.
const dataSrc = fs.readFileSync(
  path.join(ROOT, 'src/data/initialData.ts'),
  'utf-8',
)
const jsSrc = dataSrc
  .replace(/^import\s+type[^;]+;?\s*$/gm, '')
  .replace(/:\s*InitialData/g, '')

const mod = await import(
  'data:text/javascript;base64,' +
    Buffer.from(jsSrc.replace(/^export\s+const\s+/m, 'export const ')).toString(
      'base64',
    )
)
const INITIAL_DATA = mod.INITIAL_DATA

const DOMAIN = 'https://bocadentalandbraces.com'
const LOGO = `${DOMAIN}/boca-logo.png`

// ── Featured providers (Treysyde spec: 3-4 highlighted on homepage) ────────
const PROVIDERS = [
  { slug: 'dr-kelcey-loveland', name: 'Dr. Kelcey Loveland', jobTitle: 'Orthodontist' },
  { slug: 'dr-charles-calder', name: 'Dr. Chad Calder', jobTitle: 'Oral and Maxillofacial Surgeon' },
  { slug: 'dr-wyatt-dannels', name: 'Dr. Wyatt Dannels', jobTitle: 'General Dentist · Founder' },
  { slug: 'dr-harrison-luu', name: 'Dr. Harrison Luu', jobTitle: 'General Dentist' },
]

// ── Homepage FAQs (spec Section 9) ─────────────────────────────────────────
const HOMEPAGE_FAQS = [
  {
    question: 'Is Boca Dental & Braces accepting new patients?',
    answer:
      'Yes. All 9 Boca Dental & Braces locations in Las Vegas are currently accepting new patients. You can book an appointment online at any time or call your nearest location directly. Most new patient appointments can be scheduled within a few days.',
  },
  {
    question: 'Does Boca Dental & Braces accept dental insurance?',
    answer:
      'Boca Dental & Braces accepts most major PPO dental insurance plans, including Delta Dental, Aetna, Cigna, Guardian, MetLife, and many others. Our team will verify your benefits before your appointment and provide a clear breakdown of your estimated out-of-pocket costs. We also accept Medicaid for eligible patients at select locations.',
  },
  {
    question: 'What dental services does Boca Dental & Braces offer?',
    answer:
      'Boca Dental & Braces offers a comprehensive range of dental services including general and preventive dentistry, cosmetic dentistry, restorative dentistry, dental implants, orthodontics (Invisalign and traditional braces), pediatric dentistry, oral surgery, periodontal care, and sedation dentistry. Not all services are available at every location.',
  },
  {
    question: 'Do you offer same-day or emergency dental appointments?',
    answer:
      'Yes. Boca Dental & Braces offers same-day emergency dental appointments at multiple Las Vegas locations. If you are experiencing a dental emergency — severe toothache, broken tooth, lost crown, swelling, or dental trauma — call your nearest location immediately. We prioritize emergency cases and work to see patients as quickly as possible, often the same day.',
  },
  {
    question: "Where are Boca Dental & Braces' Las Vegas locations?",
    answer:
      'Boca Dental & Braces has 9 dental clinic locations across Las Vegas, Nevada: Bonanza & Eastern, Russell & Eastern, Sahara & Decatur, Charleston & Lamb, Flamingo & Torrey Pines, Cheyenne Commons, Beltway Marketplace, Jones & I-95, and our dedicated pediatric clinic Boca Kids Dentistry.',
  },
  {
    question: 'What are your office hours?',
    answer:
      'Hours vary by location. Most Boca Dental & Braces clinics are open Monday through Saturday with early morning, daytime, and evening appointment slots available. We designed our hours around Las Vegas families and working adults — so you will find options that fit your schedule without taking time off work.',
  },
  {
    question: 'Do you offer payment plans for dental treatment?',
    answer:
      'Yes. Boca Dental & Braces offers flexible financing through CareCredit, allowing patients to spread treatment costs over 6, 12, 18, or 24 months. We also offer in-house payment plans at most locations. Additionally, FSA and HSA funds can be applied toward dental treatment.',
  },
  {
    question: 'Is Boca Dental & Braces good for kids?',
    answer:
      'Absolutely. Boca Dental & Braces has a dedicated pediatric dentistry program and a fully kid-focused clinic — Boca Kids Dentistry — adjacent to our Russell & Eastern flagship. We see patients starting from their first tooth. Our team is experienced in creating a calm, friendly environment for children, and we offer preventive services like sealants and fluoride treatments specifically designed for young patients.',
  },
]

// ── Build the graph ────────────────────────────────────────────────────────
// Filter to 9 LV-area locations only (Treysyde spec §6). The Henderson clinic
// is not part of the Las Vegas homepage scope — it belongs to the future
// Reno/Tahoe site or a Henderson sub-page per boca-dental.md memory.
const lvLocations = INITIAL_DATA.locations.filter(
  (loc) => loc.city === 'Las Vegas',
)
const locationsGraph = lvLocations.map((loc) => ({
  '@type': 'Dentist',
  ...(loc.kids && { medicalSpecialty: 'Pediatric Dentistry' }),
  '@id': `${DOMAIN}/clinics/${loc.slug}/#localbusiness`,
  name: `Boca Dental & Braces — ${loc.label}`,
  url: `${DOMAIN}/clinics/${loc.slug}/`,
  telephone: loc.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: loc.address,
    addressLocality: loc.city,
    addressRegion: loc.state,
    postalCode: loc.zip,
    addressCountry: 'US',
  },
  openingHours: ['Mo-Fr 09:00-19:00', 'Sa 09:00-19:00'],
  // aggregateRating intentionally omitted — no verified GBP rating/review data yet (no-fabrication).
  areaServed: { '@type': 'City', name: 'Las Vegas' },
}))

const providersGraph = PROVIDERS.map((p) => ({
  '@type': 'Person',
  '@id': `${DOMAIN}/about-us/dentists/${p.slug}/#person`,
  name: p.name,
  jobTitle: p.jobTitle,
  url: `${DOMAIN}/about-us/dentists/${p.slug}/`,
  affiliation: { '@id': `${DOMAIN}/#organization` },
  worksFor: { '@id': `${DOMAIN}/#organization` },
}))

const faqsGraph = HOMEPAGE_FAQS.map((f) => ({
  '@type': 'Question',
  name: f.question,
  acceptedAnswer: { '@type': 'Answer', text: f.answer },
}))

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${DOMAIN}/#organization`,
      name: 'Boca Dental & Braces',
      url: DOMAIN,
      logo: LOGO,
      sameAs: [
        'https://www.facebook.com/bocadental',
        'https://www.instagram.com/bocadental',
      ],
    },
    {
      '@type': ['MedicalBusiness', 'Dentist'],
      '@id': `${DOMAIN}/#practice`,
      name: 'Boca Dental & Braces',
      alternateName: 'Boca Dental and Braces',
      description:
        'Multi-location family and cosmetic dental practice serving Las Vegas, Nevada with 9 clinic locations. General, cosmetic, orthodontic, and specialty care under one practice.',
      url: DOMAIN,
      logo: LOGO,
      telephone: INITIAL_DATA.brand.phone,
      areaServed: { '@type': 'City', name: 'Las Vegas' },
      // aggregateRating intentionally omitted — placeholder 4.9/1200 was fabricated (no-fabrication).
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Dental Services',
        itemListElement: INITIAL_DATA.services.map((s, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: s.label,
            url: `${DOMAIN}/${s.slug}/`,
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${DOMAIN}/#website`,
      url: DOMAIN,
      name: 'Boca Dental & Braces',
      publisher: { '@id': `${DOMAIN}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${DOMAIN}/?s={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    ...locationsGraph,
    ...providersGraph,
    {
      '@type': 'FAQPage',
      '@id': `${DOMAIN}/#faq`,
      mainEntity: faqsGraph,
    },
  ],
}

// Pretty-print for readability in view-source
const jsonString = JSON.stringify(graph, null, 2)

const block =
  '<!-- BOCA_SCHEMA_START -->\n' +
  '    <script type="application/ld+json">\n' +
  jsonString +
  '\n    </script>\n' +
  '    <!-- BOCA_SCHEMA_END -->'

// ── Inject into index.html ────────────────────────────────────────────────
const indexPath = path.join(ROOT, 'index.html')
let html = fs.readFileSync(indexPath, 'utf-8')

const re = /<!-- BOCA_SCHEMA_START -->[\s\S]*?<!-- BOCA_SCHEMA_END -->/

if (re.test(html)) {
  html = html.replace(re, block)
  console.log('✓ Replaced existing schema block in index.html')
} else {
  // First-time injection: place right before </head>
  html = html.replace('</head>', `    ${block}\n  </head>`)
  console.log('✓ Inserted schema block into index.html')
}

fs.writeFileSync(indexPath, html)
console.log(`  ${lvLocations.length} LV locations (${INITIAL_DATA.locations.length} total) · ${PROVIDERS.length} providers · ${HOMEPAGE_FAQS.length} FAQs · ${INITIAL_DATA.services.length} services`)
console.log(`  → ${indexPath}`)
