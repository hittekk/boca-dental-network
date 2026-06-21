import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { INITIAL_DATA } from '../data/initialData'
import { useSiteData } from '../lib/site-data'
import { LocationPageV1 } from './LocationPageV1'
import { LocationPageMeta } from '../components/shared/LocationPageMeta'
import { LocationPageSchema } from '../components/shared/LocationPageSchema'
import { COORDS_BY_LOCATION as COORDS } from '../data/doctorLocations'

// Service slugs available at each location. Per the Boca Bible (tab 3) every
// service is offered network-wide EXCEPT sedation dentistry, which is only at
// Charleston & Lamb (4G), Russell & Eastern, and Flamingo & Torrey Pines.
const SEDATION_LOCATIONS = ['charleston-lamb', 'russell-eastern', 'flamingo-torrey']
export function servicesForLocation(slug: string): string[] {
  const loc = INITIAL_DATA.locations.find((l) => l.slug === slug)
  if (!loc) return []
  const sedation = SEDATION_LOCATIONS.includes(slug) ? ['sedation-dentistry'] : []
  if (loc.kids) {
    return ['pediatric-dentistry', 'general-dentistry', 'orthodontics', ...sedation]
  }
  return [
    'general-dentistry', 'cosmetic-dentistry', 'restorative-dentistry',
    'dental-implants', 'orthodontics', 'periodontal', 'oral-surgery', ...sedation,
  ]
}

// Provider assignments per location + precise pin coordinates now live in the
// canonical Boca-Bible map. Re-exported here so existing imports keep working.
export { doctorsForLocation, COORDS_BY_LOCATION } from '../data/doctorLocations'

export function LocationPage() {
  const { slug } = useParams<{ slug: string }>()
  const siteData = useSiteData()

  // Try live Supabase data first, always fall back to static INITIAL_DATA.
  // This prevents a Supabase slug mismatch from ever blocking a known location.
  const location =
    siteData.locations.find((l) => l.slug === slug) ??
    INITIAL_DATA.locations.find((l) => l.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  if (!location) {
    return (
      <div
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 32px',
          textAlign: 'center',
          background: '#ffffff',
          color: '#001D3D',
          fontFamily: 'inherit',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#F3672A',
            marginBottom: 12,
          }}
        >
          404 · Location not found
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px', margin: '0 0 16px' }}>
          We couldn't find that office.
        </h1>
        <p style={{ fontSize: 16, opacity: 0.7, marginBottom: 24 }}>
          The URL <strong>/clinics/{slug}/</strong> doesn't match any of our 9 Las Vegas offices.
        </p>
        <a
          href="/clinics/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#F3672A',
            color: 'white',
            borderRadius: 8,
            padding: '14px 24px',
            fontSize: 14,
            fontWeight: 800,
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          View all locations →
        </a>
      </div>
    )
  }

  return (
    <>
      <LocationPageMeta location={location} />
      <LocationPageSchema location={location} coords={COORDS[location.slug]} />
      <LocationPageV1 location={location} />
    </>
  )
}

export default LocationPage
