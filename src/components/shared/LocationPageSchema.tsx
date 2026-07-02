import { useEffect } from 'react'
import type { Location } from '../../types'

/**
 * LocationPageSchema
 * Emits the per-location JSON-LD graph mandated by CLAUDE4 §SEO/Schema:
 *   - Dentist (or DentalSpecialty for kids: true) — LocalBusiness subtype tied to GBP Place ID
 *   - AggregateRating embedded on the entity
 *   - FAQPage assembled from location.faqs
 *   - BreadcrumbList (Home > Clinics > this location)
 *   - Reference to the practice-level @id so Google joins it to the homepage Organization
 *
 * Production target: this content moves to PHP `wp_head` per CLAUDE4.
 * Today (mockup), it's rendered as inline <script type="application/ld+json"> + injected
 * into <head> via useEffect so view-source on the deployed preview shows the full graph.
 */
const DOMAIN = 'https://bocadentalandbraces.com'

function buildLocationGraph(location: Location, coords?: [number, number]) {
  const url = `${DOMAIN}/clinics/${location.slug}/`
  const businessType = location.kids ? 'DentalSpecialty' : 'Dentist'
  // gbp_id is a Google CID (numeric) → cid=… is the resolvable map URL form.
  const gbpUrl = location.gbp_id ? `https://www.google.com/maps?cid=${location.gbp_id}` : undefined

  const localBusiness = {
    '@type': businessType,
    '@id': `${url}#localbusiness`,
    name: `Boca Dental & Braces — ${location.label}`,
    url,
    telephone: location.phone,
    description: location.narrative,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressRegion: location.state,
      postalCode: location.zip,
      addressCountry: 'US',
    },
    openingHours: ['Mo-Fr 09:00-17:00', 'Sa 09:00-17:00'],
    aggregateRating:
      location.review_count > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: location.rating.toFixed(1),
            reviewCount: location.review_count,
            itemReviewed: { '@id': `${url}#localbusiness` },
          }
        : undefined,
    areaServed: { '@type': 'City', name: 'Las Vegas' },
    parentOrganization: { '@id': `${DOMAIN}/#organization` },
    isPartOf: { '@id': `${DOMAIN}/#practice` },
    ...(coords ? { geo: { '@type': 'GeoCoordinates', latitude: coords[1], longitude: coords[0] } } : {}),
    ...(gbpUrl ? { hasMap: gbpUrl, sameAs: [gbpUrl] } : {}),
    ...(location.kids ? { medicalSpecialty: 'Pediatric Dentistry' } : {}),
  }

  const faqPage =
    location.faqs.length > 0
      ? {
          '@type': 'FAQPage',
          '@id': `${url}#faq`,
          mainEntity: location.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }
      : null

  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${DOMAIN}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Clinics',
        item: `${DOMAIN}/clinics/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: location.label,
        item: url,
      },
    ],
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      localBusiness,
      breadcrumbs,
      ...(faqPage ? [faqPage] : []),
    ],
  }
}

export function LocationPageSchema({ location, coords }: { location: Location; coords?: [number, number] }) {
  useEffect(() => {
    const id = `boca-location-schema-${location.slug}`
    if (document.getElementById(id)) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.text = JSON.stringify(buildLocationGraph(location, coords))
    document.head.appendChild(script)
    return () => {
      const s = document.getElementById(id)
      if (s) s.remove()
    }
  }, [location, coords])

  const graph = buildLocationGraph(location, coords)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}

export default LocationPageSchema
