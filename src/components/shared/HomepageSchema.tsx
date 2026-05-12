import { useEffect } from 'react'
import { INITIAL_DATA } from '../../data/initialData'

/**
 * HomepageSchema
 * Emits the JSON-LD schema stack mandated by the Treysyde homepage spec:
 *   - Organization
 *   - MedicalBusiness / Dental (entity)
 *   - WebSite + SiteLinksSearchBox
 *   - LocalBusiness × N (one per clinic, NAP matches GBP)
 *   - AggregateRating
 *   - FAQPage (from homepage FAQs)
 *   - Person × N (provider highlights)
 *
 * Production target: this content moves to PHP `wp_head` injection per CLAUDE4.
 * Today (mockup), we render it as raw <script type="application/ld+json"> tags
 * so view-source on the deployed preview shows the full schema stack —
 * useful for the Frankie demo and for Google Rich Results Test screenshots.
 */
const DOMAIN = 'https://bocadentalandbraces.com'
const LOGO = `${DOMAIN}/boca-logo.png`

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
    question: 'Where are Boca Dental & Braces\' Las Vegas locations?',
    answer:
      'Boca Dental & Braces has 9 dental clinic locations across Las Vegas, Nevada, including locations near Eastern & Bonanza, Eastern & Russell, Sahara & Decatur, Charleston & Eastern, Flamingo & Torrey Pines, Rainbow & Cheyenne, Eastern & Serene, Jones & Alta, and a dedicated kids clinic at Eastern & Russell.',
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
      'Absolutely. Boca Dental & Braces has a dedicated pediatric dentistry program and a kids-focused clinic at the Eastern & Russell location. We see patients starting from their first tooth. Our team is experienced in creating a calm, friendly environment for children, and we offer preventive services like sealants and fluoride treatments specifically designed for young patients.',
  },
]

const PROVIDERS = [
  { slug: 'dr-kelcey-loveland', name: 'Dr. Kelcey Loveland', jobTitle: 'Orthodontist' },
  { slug: 'dr-charles-calder', name: 'Dr. Charles Calder', jobTitle: 'Oral and Maxillofacial Surgeon' },
  { slug: 'dr-wyatt-dannels', name: 'Dr. Wyatt Dannels', jobTitle: 'General Dentist · Founder' },
  { slug: 'dr-harrison-luu', name: 'Dr. Harrison Luu', jobTitle: 'General Dentist' },
]

function buildSchemaJSON() {
  const locations = INITIAL_DATA.locations.map((loc) => ({
    '@type': loc.kids ? 'DentalSpecialty' : 'Dentist',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: loc.rating.toFixed(1),
      reviewCount: loc.review_count,
    },
    sameAs: [],
    areaServed: { '@type': 'City', name: 'Las Vegas' },
  }))

  const faqs = HOMEPAGE_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  }))

  const providers = PROVIDERS.map((p) => ({
    '@type': 'Person',
    '@id': `${DOMAIN}/about-us/dentists/${p.slug}/#person`,
    name: p.name,
    jobTitle: p.jobTitle,
    url: `${DOMAIN}/about-us/dentists/${p.slug}/`,
    affiliation: { '@id': `${DOMAIN}/#organization` },
    worksFor: { '@id': `${DOMAIN}/#organization` },
  }))

  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        // Organization (sitewide)
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
        // MedicalBusiness / Dental (practice entity) with hasOfferCatalog
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
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: 1200,
            itemReviewed: { '@id': `${DOMAIN}/#practice` },
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Dental Services',
            itemListElement: INITIAL_DATA.services.map((s, i) => ({
              '@type': 'Offer',
              position: i + 1,
              itemOffered: {
                '@type': 'MedicalProcedure',
                name: s.label,
                url: `${DOMAIN}/services/${s.slug}/`,
              },
            })),
          },
        },
        // WebSite + SiteLinksSearchBox
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
        // LocalBusiness × N (one per clinic)
        ...locations,
        // Person × N (provider highlights)
        ...providers,
        // FAQPage
        {
          '@type': 'FAQPage',
          '@id': `${DOMAIN}/#faq`,
          mainEntity: faqs,
        },
      ],
    },
  ]
}

export function HomepageSchema() {
  // Also inject into <head> so it's discoverable for the Rich Results Test —
  // mirrors how the PHP plugin will inject in production.
  useEffect(() => {
    const id = 'boca-homepage-schema-head'
    if (document.getElementById(id)) return
    const blocks = buildSchemaJSON()
    blocks.forEach((schema, i) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = `${id}-${i}`
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    })
    return () => {
      blocks.forEach((_, i) => {
        const s = document.getElementById(`${id}-${i}`)
        if (s) s.remove()
      })
    }
  }, [])

  // Also render inline in body for view-source visibility on the React render
  const blocks = buildSchemaJSON()
  return (
    <>
      {blocks.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

export default HomepageSchema
