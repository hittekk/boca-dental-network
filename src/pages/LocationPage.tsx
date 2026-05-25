import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { INITIAL_DATA } from '../data/initialData'
import { useSiteData } from '../lib/site-data'
import type { Variant } from '../components/VariantSwitcher'
import { LocationPageV1 } from './LocationPageV1'
import { LocationPageV2 } from './LocationPageV2'
import { LocationPageV3 } from './LocationPageV3'
import { LocationPageMeta } from '../components/shared/LocationPageMeta'
import { LocationPageSchema } from '../components/shared/LocationPageSchema'

// Service slugs available at each location. Kids offices = pediatric only.
// Real CMS will manage this; for the design phase we derive from `kids` flag.
export function servicesForLocation(slug: string): string[] {
  const loc = INITIAL_DATA.locations.find((l) => l.slug === slug)
  if (!loc) return []
  if (loc.kids) {
    return [
      'pediatric-dentistry',
      'general-dentistry',
      'orthodontics',
      'sedation-dentistry',
    ]
  }
  return [
    'general-dentistry',
    'cosmetic-dentistry',
    'restorative-dentistry',
    'dental-implants',
    'orthodontics',
    'periodontal',
    'oral-surgery',
    'sedation-dentistry',
  ]
}

// Doctors assigned per location. Deterministic mock — replaced by CMS later.
// 2-3 doctors per office to keep the strip readable.
const DOCTORS_BY_LOCATION: Record<string, string[]> = {
  'russell-eastern': ['dr-wyatt-dannels', 'dr-harrison-luu', 'dr-sana-fahim'],
  'boca-kids-dentistry': ['dr-kelcey-loveland', 'minh-nguyen'],
  'bonanza-eastern': ['dr-justin-wall', 'dr-johnson-fong'],
  'sahara-decatur': ['dr-michael-st-laurent', 'dr-bredan-marlin'],
  'jones-i95': ['dr-charles-calder', 'dr-james-yun'],
  'charleston-lamb': ['dr-harrison-luu', 'dr-sana-fahim'],
  'flamingo-torrey': ['dr-justin-wall', 'dr-kelcey-loveland'],
  'cheyenne-commons': ['dr-johnson-fong', 'minh-nguyen'],
  'beltway-marketplace': ['dr-wyatt-dannels', 'dr-bredan-marlin'],
}

export function doctorsForLocation(slug: string): string[] {
  return DOCTORS_BY_LOCATION[slug] ?? []
}

// Approximate lat/lng per location for the embedded single-pin map.
// Real values come from GBP Place ID via the admin dashboard.
export const COORDS_BY_LOCATION: Record<string, [number, number]> = {
  'russell-eastern': [-115.1198, 36.0641],
  'boca-kids-dentistry': [-115.1186, 36.0631],
  'bonanza-eastern': [-115.1198, 36.1762],
  'sahara-decatur': [-115.2095, 36.1442],
  'jones-i95': [-115.2236, 36.1731],
  'charleston-lamb': [-115.0942, 36.1577],
  'flamingo-torrey': [-115.2628, 36.1147],
  'cheyenne-commons': [-115.2425, 36.2167],
  'beltway-marketplace': [-115.1198, 36.0227],
}

export function LocationPage() {
  const { slug } = useParams<{ slug: string }>()
  const siteData = useSiteData()
  const location = siteData.locations.find((l) => l.slug === slug)

  // Scroll to top when the slug changes (route transitions don't reset scroll)
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
          background: variant === 'c' ? '#0A0A0F' : '#ffffff',
          color: variant === 'c' ? 'white' : '#001D3D',
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
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: '-1px',
            margin: '0 0 16px',
          }}
        >
          We couldn't find that office.
        </h1>
        <p style={{ fontSize: 16, opacity: 0.7, marginBottom: 24 }}>
          The clinic slug "{slug}" doesn't match any of our 9 Las Vegas
          offices.
        </p>
        <a
          href="/"
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
          Back to home →
        </a>
      </div>
    )
  }

  return (
    <>
      <LocationPageMeta location={location} />
      <LocationPageSchema location={location} />
      <LocationPageV1 location={location} />
    </>
  )
}

export default LocationPage
