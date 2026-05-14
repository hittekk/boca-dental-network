import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Languages,
  BadgeCheck,
  Calendar,
  ShieldCheck,
  Sparkles,
  Crown,
  Smile,
  Baby,
  Stethoscope,
  Moon,
  Activity,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Header } from '../components/Header/Header'
import { FooterV2 } from '../components/v2/FooterV2'
import { CTAv2 } from '../components/v2/CTAv2'
import {
  ClinicInfoSection,
  ServiceAvailabilityNote,
  PatientReviewsSection,
  InsuranceFinancingSection,
} from '../components/shared/LocationSpecSections'
import { INITIAL_DATA } from '../data/initialData'
import type { Location } from '../types'
import {
  servicesForLocation,
  doctorsForLocation,
  COORDS_BY_LOCATION,
} from './LocationPage'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

const ORANGE = '#F3672A'
const INK = '#001D3D'
const CREAM = '#FFFAF6'
const CREAM_2 = '#FFF4ED'
const SERIF = 'Georgia, "Playfair Display", serif'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'general-dentistry': Smile,
  'cosmetic-dentistry': Sparkles,
  'restorative-dentistry': Crown,
  'dental-implants': Wrench,
  orthodontics: Activity,
  'pediatric-dentistry': Baby,
  'sedation-dentistry': Moon,
  'oral-surgery': Stethoscope,
  periodontal: ShieldCheck,
}

export function LocationPageV2({ location }: { location: Location }) {
  const services = servicesForLocation(location.slug)
    .map((slug) => INITIAL_DATA.services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => s != null)
  const doctors = doctorsForLocation(location.slug)
    .map((slug) => INITIAL_DATA.doctors.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => d != null)
  const coords = COORDS_BY_LOCATION[location.slug]

  const otherLocations = INITIAL_DATA.locations
    .filter((l) => l.slug !== location.slug && !l.slug.includes('henderson'))
    .slice(0, 4)

  return (
    <div
      style={{ background: CREAM, color: INK, fontFamily: 'inherit' }}
    >
      <Header
        brand={INITIAL_DATA.brand}
        announcement={INITIAL_DATA.announcement}
        logoMode="dark"
      />

      <Hero location={location} coords={coords} />
      <TrustStrip location={location} />
      <ClinicInfoSection location={location} theme="cream" officeNo={String(location.id).padStart(2, '0')} />
      <NeighborhoodNarrative location={location} />
      {doctors.length > 0 && <DoctorsHere doctors={doctors} location={location} />}
      <ServicesHere services={services} location={location} />
      <PatientReviewsSection location={location} theme="cream" />
      {location.faqs.length > 0 && <LocationFAQs faqs={location.faqs} location={location} />}
      <InsuranceFinancingSection location={location} theme="cream" />
      <OtherLocations locations={otherLocations} />
      <CTAv2 />
      <FooterV2 />
    </div>
  )
}

function Hero({
  location,
  coords,
}: {
  location: Location
  coords?: [number, number]
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !coords) return
    if (!mapboxgl.accessToken) return
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: coords,
      zoom: 14.4,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
    })
    mapRef.current = map
    map.on('load', () => {
      const el = document.createElement('div')
      el.style.cssText = [
        'width: 24px',
        'height: 24px',
        'border-radius: 50%',
        'background: #F3672A',
        'border: 3px solid #ffffff',
        'box-shadow: 0 0 0 5px rgba(243,103,42,0.16), 0 6px 16px rgba(243,103,42,0.4)',
      ].join(';')
      new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat(coords)
        .addTo(map)
    })
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [coords])

  const intro = location.kids
    ? 'Pediatric dental care, designed around how kids actually behave in a chair.'
    : 'Modern dental care with the warmth of a neighborhood practice.'

  return (
    <section
      className="loc-hero-v2-section"
      style={{
        background: CREAM_2,
        padding: '160px 32px 56px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(26,20,16,0.08)',
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          .loc-hero-v2-section { padding: 130px 20px 48px !important; }
        }
      `}</style>
      {/* Huge watermark Boca logo background — matches V2 homepage */}
      <img
        aria-hidden
        src="/boca-logo-color.png"
        alt=""
        style={{
          position: 'absolute',
          top: 80,
          right: -120,
          width: 'clamp(640px, 70vw, 1100px)',
          height: 'auto',
          opacity: 0.06,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '4%',
          right: '-10%',
          width: 540,
          height: 540,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Breadcrumb — italic editorial */}
        <nav
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(26,20,16,0.55)',
            marginBottom: 26,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontStyle: 'italic',
            fontFamily: SERIF,
          }}
        >
          <a
            href="/"
            style={{ color: 'rgba(26,20,16,0.55)', textDecoration: 'none' }}
          >
            Home
          </a>
          <span style={{ opacity: 0.45 }}>·</span>
          <a
            href="/clinics/"
            style={{ color: 'rgba(26,20,16,0.55)', textDecoration: 'none' }}
          >
            Our Locations
          </a>
          <span style={{ opacity: 0.45 }}>·</span>
          <span style={{ color: ORANGE, fontWeight: 700, fontStyle: 'normal' }}>
            {location.label}
          </span>
        </nav>

        {/* Asymmetric magazine layout — columns auto-stretch to match height */}
        <div
          className="loc-hero-v2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.55fr 1fr',
            gap: 64,
            alignItems: 'stretch',
          }}
        >
          <style>{`
            @media (max-width: 980px) {
              .loc-hero-v2 { grid-template-columns: 1fr !important; gap: 36px !important; }
              .loc-hero-v2-aside { min-height: 360px !important; }
            }
            @media (max-width: 600px) {
              .loc-hero-v2-aside { min-height: 320px !important; }
            }
          `}</style>

          {/* LEFT — magazine column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            {/* Navy pill chip — matches V2 homepage pattern */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 28,
                background: INK,
                color: 'white',
                borderRadius: 999,
                padding: '8px 18px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: ORANGE,
                  display: 'inline-block',
                }}
              />
              {location.neighborhood} · Office #{location.id}
            </div>

            {/* HEADLINE — three-tier hierarchy reading as one sentence:
                small brand kicker → medium white connector → large orange
                intersection anchor. Same pattern as the V3 location hero so
                the eye lands on the intersection name without competing
                size blocks. */}
            <h1
              style={{
                margin: '0 0 22px',
                color: INK,
                lineHeight: 1.0,
                letterSpacing: '-1.5px',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(13px, 1.3vw, 17px)',
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: 'rgba(0,29,61,0.55)',
                  marginBottom: 16,
                }}
              >
                Boca Dental &amp; Braces
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(22px, 2.6vw, 36px)',
                  fontWeight: 700,
                  letterSpacing: '-0.4px',
                  textTransform: 'uppercase',
                  color: 'rgba(0,29,61,0.85)',
                  lineHeight: 1.1,
                  marginBottom: 10,
                }}
              >
                Your {location.neighborhood} dentist near
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(40px, 5.4vw, 72px)',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  fontFamily: SERIF,
                  letterSpacing: '-1.8px',
                  color: ORANGE,
                  lineHeight: 0.98,
                }}
              >
                {location.label}.
              </span>
            </h1>

            {/* Orange editorial rule */}
            <div
              aria-hidden
              style={{
                height: 2,
                width: 80,
                background: ORANGE,
                marginBottom: 24,
              }}
            />

            {/* Subhead — serif but not italic, slightly larger with looser
                line-height so it scans easily. Italic small serif is the
                hardest body-text combination to read. */}
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(18px, 1.8vw, 21px)',
                fontWeight: 400,
                color: 'rgba(26,20,16,0.82)',
                lineHeight: 1.6,
                margin: '0 0 28px',
                maxWidth: 580,
              }}
            >
              {intro} Serving {location.neighborhood}{' '}
              <span style={{ fontWeight: 700, color: INK }}>
                since 2006.
              </span>
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 28,
              }}
            >
              <Badge
                icon={<Star size={11} fill={ORANGE} color={ORANGE} />}
                text={`${location.rating} · ${location.review_count} reviews`}
              />
              <Badge
                icon={
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#10b981',
                    }}
                  />
                }
                text="Open today · 8a–8p"
              />
              {location.kids && <Badge text="Kids only" />}
              <Badge
                icon={<Languages size={11} color={ORANGE} />}
                text="Se Habla Español"
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                href="#book"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: INK,
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '16px 30px',
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  boxShadow: '0 14px 30px rgba(26,20,16,0.22)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(0)'
                }}
              >
                Book at this office
                <ArrowRight size={15} />
              </a>
              <a
                href={`tel:${location.phone.replace(/\D/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'white',
                  color: INK,
                  border: '1.5px solid rgba(26,20,16,0.16)',
                  borderRadius: 8,
                  padding: '15px 26px',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <Phone size={14} color={ORANGE} />
                {location.phone}
              </a>
            </div>

            {/* Editorial pull-quote — distinct V2 motif, not in V1 */}
            <blockquote
              style={{
                marginTop: 40,
                paddingLeft: 24,
                borderLeft: `3px solid ${ORANGE}`,
                maxWidth: 520,
              }}
            >
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: 20,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: INK,
                  lineHeight: 1.45,
                  margin: 0,
                  letterSpacing: '-0.2px',
                }}
              >
                "Every chair, every doctor, every office — same Boca standard,
                neighborhood by neighborhood."
              </p>
              <footer
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(26,20,16,0.55)',
                }}
              >
                — Boca Dental, Est. 2006
              </footer>
            </blockquote>
          </motion.div>

          {/* RIGHT — full-height map column with NAP paper card overlay */}
          <motion.aside
            className="loc-hero-v2-aside"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0, 0, 0.2, 1] }}
            style={{
              position: 'relative',
              display: 'flex',
              minHeight: 560,
            }}
          >
            {/* Tall map card filling the right column */}
            <div
              style={{
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid rgba(26,20,16,0.08)',
                boxShadow: '0 20px 50px rgba(26,20,16,0.12)',
                background: '#F0E9DF',
                flex: 1,
                width: '100%',
              }}
            >
              <div
                ref={mapContainer}
                style={{ position: 'absolute', inset: 0 }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at 50% 35%, rgba(243,103,42,0.06) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Top-left editorial label */}
              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  background: ORANGE,
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  padding: '7px 14px',
                  borderRadius: 4,
                  boxShadow: '0 6px 16px rgba(243,103,42,0.32)',
                  zIndex: 2,
                }}
              >
                · Find us ·
              </div>

              {/* Compact NAP card overlay at the bottom of the map */}
              <div
                style={{
                  position: 'absolute',
                  left: 14,
                  right: 14,
                  bottom: 14,
                  background: 'white',
                  border: '1px solid rgba(26,20,16,0.08)',
                  borderRadius: 4,
                  padding: '14px 16px',
                  boxShadow: '0 12px 30px rgba(26,20,16,0.18)',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: ORANGE,
                    marginBottom: 6,
                  }}
                >
                  · The clinic ·
                </div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 17,
                    fontWeight: 400,
                    color: INK,
                    letterSpacing: '-0.3px',
                    lineHeight: 1.15,
                    marginBottom: 10,
                  }}
                >
                  {location.label}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px 14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                    <MapPin
                      size={11}
                      color={ORANGE}
                      style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 12, color: INK, lineHeight: 1.35, fontWeight: 600 }}>
                      {location.address}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                    <Phone
                      size={11}
                      color={ORANGE}
                      style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 12, color: INK, fontWeight: 600 }}>
                      {location.phone}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                    <Clock
                      size={11}
                      color={ORANGE}
                      style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 12, color: INK, fontWeight: 600, lineHeight: 1.35 }}>
                      {location.hours.split(' · ')[0]}
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Boca Dental ${location.label} Las Vegas`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 6,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: ORANGE,
                      textDecoration: 'none',
                    }}
                  >
                    Get directions
                    <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

function NAPLine({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
      <div
        style={{
          width: 26,
          height: 26,
          flexShrink: 0,
          borderRadius: '50%',
          background: 'rgba(243,103,42,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'rgba(26,20,16,0.5)',
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: INK,
            lineHeight: 1.3,
          }}
        >
          {value}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 11,
              color: 'rgba(26,20,16,0.5)',
              marginTop: 1,
              fontStyle: 'italic',
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}

function Badge({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: CREAM_2,
        border: '1px solid rgba(26,20,16,0.08)',
        borderRadius: 999,
        padding: '6px 13px',
        fontSize: 12,
        fontWeight: 700,
        color: INK,
      }}
    >
      {icon}
      {text}
    </span>
  )
}

function TrustStrip({ location }: { location: Location }) {
  const items: {
    value: string
    label: string
    Icon: LucideIcon
    accent: string
  }[] = [
    {
      value: location.rating.toFixed(1),
      label: 'Avg patient rating',
      Icon: Star,
      accent: ORANGE,
    },
    {
      value: location.review_count + '+',
      label: 'Verified Google reviews',
      Icon: BadgeCheck,
      accent: ORANGE,
    },
    {
      value: '7',
      label: 'Days a week open',
      Icon: Calendar,
      accent: ORANGE,
    },
    {
      value: 'All',
      label: 'Major insurance accepted',
      Icon: ShieldCheck,
      accent: ORANGE,
    },
  ]
  return (
    <section style={{ background: CREAM_2, padding: '56px 32px' }}>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}
        className="ts-v2"
      >
        <style>{`
          @media (max-width: 760px) { .ts-v2 { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            style={{
              background: 'white',
              border: '1px solid rgba(26,20,16,0.06)',
              padding: '20px 22px',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent stripe — editorial */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: 3,
                background: it.accent,
                opacity: 0.85,
              }}
            />
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: `${it.accent}14`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginLeft: 8,
              }}
            >
              <it.Icon
                size={20}
                color={it.accent}
                {...(it.Icon === Star ? { fill: it.accent } : {})}
                strokeWidth={1.8}
              />
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 28,
                  fontWeight: 400,
                  color: INK,
                  letterSpacing: '-0.6px',
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {it.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(26,20,16,0.6)',
                  fontStyle: 'italic',
                  letterSpacing: 0.2,
                }}
              >
                {it.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function NeighborhoodNarrative({ location }: { location: Location }) {
  const officeNo = String(location.id).padStart(2, '0')
  const firstChar = location.narrative.charAt(0)
  const restOfNarrative = location.narrative.slice(1)
  const speaksSpanish = /spanish/i.test(location.narrative)
  const acceptsMedicaid = /medicaid/i.test(location.narrative)
  const hasSameDay = /same-day|same day|walk-in/i.test(location.narrative)

  const atAGlance: { label: string; value: string }[] = [
    { label: 'Office', value: `No. ${officeNo}` },
    {
      label: 'Patient rating',
      value:
        location.review_count > 0
          ? `★ ${location.rating.toFixed(1)} · ${location.review_count}`
          : 'Now booking',
    },
    { label: 'Neighborhood', value: location.neighborhood },
    {
      label: 'Highlights',
      value: [
        speaksSpanish && 'Bilingual',
        acceptsMedicaid && 'Medicaid',
        hasSameDay && 'Same-day',
      ]
        .filter(Boolean)
        .join(' · ') || 'New patients',
    },
  ]

  return (
    <section
      style={{
        background: CREAM,
        padding: '120px 32px 110px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative watermark: massive serif office number */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '-1.5%',
          top: 40,
          fontFamily: SERIF,
          fontSize: 'clamp(220px, 28vw, 420px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: ORANGE,
          opacity: 0.05,
          lineHeight: 0.85,
          letterSpacing: '-12px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {officeNo}
      </div>

      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.7fr',
          gap: 72,
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}
        className="nh-v2"
      >
        <style>{`
          @media (max-width: 880px) {
            .nh-v2 { grid-template-columns: 1fr !important; gap: 36px !important; }
            .nh-v2-glance { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>

        {/* LEFT — eyebrow + H2 + office tag + ornamental rule */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: ORANGE,
              marginBottom: 16,
            }}
          >
            · The neighborhood ·
          </div>

          <h2
            style={{
              fontSize: 'clamp(30px, 3.2vw, 44px)',
              fontWeight: 800,
              letterSpacing: '-0.9px',
              color: INK,
              margin: 0,
              lineHeight: 1.05,
              textTransform: 'none',
            }}
          >
            About {location.label}.
          </h2>

          {/* Serif italic editorial tagline */}
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(18px, 1.5vw, 22px)',
              fontWeight: 400,
              color: 'rgba(0,29,61,0.55)',
              marginTop: 18,
              lineHeight: 1.4,
            }}
          >
            One of nine Boca neighborhoods.
          </div>

          {/* Ornamental rule with end-dot */}
          <div
            aria-hidden
            style={{
              marginTop: 28,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div style={{ height: 2, width: 56, background: ORANGE }} />
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: ORANGE,
              }}
            />
          </div>

          {/* Office tag */}
          <div
            style={{
              marginTop: 22,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px 6px 12px',
              borderRadius: 999,
              border: '1px solid rgba(0,29,61,0.15)',
              background: 'rgba(255,255,255,0.6)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: INK,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: ORANGE,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                fontWeight: 800,
              }}
            >
              [ {officeNo} ]
            </span>
            <span style={{ opacity: 0.35 }}>·</span>
            Office on {location.address.split(',')[0]}
          </div>
        </motion.div>

        {/* RIGHT — narrative w/ drop cap + pull quote + at-a-glance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Narrative body — drop cap on first character */}
          <p
            style={{
              fontSize: 'clamp(17px, 1.3vw, 19px)',
              lineHeight: 1.75,
              color: INK,
              margin: 0,
              fontWeight: 400,
            }}
          >
            <span
              style={{
                float: 'left',
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontWeight: 400,
                color: ORANGE,
                fontSize: 'clamp(72px, 7vw, 100px)',
                lineHeight: 0.82,
                marginRight: 12,
                marginTop: 4,
                paddingTop: 0,
              }}
            >
              {firstChar}
            </span>
            {restOfNarrative}
          </p>

          {/* AT A GLANCE — 4-up stat strip */}
          <div
            style={{
              marginTop: 56,
              paddingTop: 24,
              borderTop: '1px solid rgba(0,29,61,0.12)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                color: 'rgba(0,29,61,0.55)',
                marginBottom: 18,
              }}
            >
              · At a glance ·
            </div>
            <div
              className="nh-v2-glance"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
              }}
            >
              {atAGlance.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(0,29,61,0.08)',
                    borderTop: `2px solid ${ORANGE}`,
                    borderRadius: 4,
                    padding: '16px 18px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(0,29,61,0.5)',
                      marginBottom: 8,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: SERIF,
                      fontSize: 'clamp(18px, 1.6vw, 22px)',
                      fontWeight: 400,
                      color: INK,
                      letterSpacing: '-0.3px',
                      lineHeight: 1.15,
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ServicesHere({
  services,
  location,
}: {
  services: { slug: string; label: string; desc: string }[]
  location: Location
}) {
  return (
    <section
      style={{
        background: CREAM_2,
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-15%',
          right: '50%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.05) 0%, transparent 60%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}
      >
        <SectionHeader
          eyebrow={`· What we do at ${location.label} ·`}
          title="Full-spectrum dental care, right here."
        />
        <div
          className="svc-v2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          <style>{`
            @media (max-width: 980px) { .svc-v2 { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .svc-v2 { grid-template-columns: 1fr !important; } }
          `}</style>
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.slug] ?? Smile
            return (
              <motion.a
                key={s.slug}
                href={`/${s.slug}/`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                style={{
                  background: 'white',
                  border: '1px solid rgba(26,20,16,0.06)',
                  padding: '26px 22px 22px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  color: INK,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 6px 18px rgba(26,20,16,0.05)',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = ORANGE
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow =
                    '0 20px 44px rgba(26,20,16,0.12), 0 0 0 1px rgba(243,103,42,0.18)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(26,20,16,0.06)'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 6px 18px rgba(26,20,16,0.05)'
                }}
              >
                {/* Decorative editorial top stroke */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: ORANGE,
                    opacity: 0.85,
                  }}
                />
                {/* Index */}
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 18,
                    fontFamily: SERIF,
                    fontSize: 18,
                    fontStyle: 'italic',
                    color: 'rgba(26,20,16,0.32)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Icon medallion — editorial circle */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, rgba(243,103,42,0.18) 0%, rgba(243,103,42,0.06) 100%)',
                    border: '1px solid rgba(243,103,42,0.16)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={24} color={ORANGE} strokeWidth={1.8} />
                </div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 22,
                    fontWeight: 400,
                    color: INK,
                    letterSpacing: '-0.4px',
                    lineHeight: 1.1,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(26,20,16,0.65)',
                    lineHeight: 1.6,
                    flexGrow: 1,
                  }}
                >
                  {s.desc}
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 4,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: ORANGE,
                  }}
                >
                  Learn more
                  <ArrowRight size={12} />
                </div>
              </motion.a>
            )
          })}
        </div>
        <ServiceAvailabilityNote location={location} theme="cream" />
      </div>
    </section>
  )
}

function DoctorsHere({
  doctors,
  location,
}: {
  doctors: { slug: string; name: string; title: string }[]
  location: Location
}) {
  const initials = (name: string) => {
    const parts = name.replace(/^Dr\.?\s+/i, '').split(/[\s,]+/).filter(Boolean)
    const first = parts[0]?.[0] ?? ''
    const last = parts[1]?.[0] ?? ''
    return (first + last).toUpperCase()
  }
  return (
    <section style={{ background: CREAM, padding: '96px 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="· Your team ·"
          title={`The dentists at ${location.label}.`}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(doctors.length, 3)}, 1fr)`,
            gap: 20,
          }}
          className="doc-v2"
        >
          <style>{`
            @media (max-width: 800px) { .doc-v2 { grid-template-columns: 1fr !important; } }
          `}</style>
          {doctors.map((d, i) => (
            <motion.a
              key={d.slug}
              href={`/about-us/dentists/${d.slug}/`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              style={{
                background: 'white',
                border: '1px solid rgba(26,20,16,0.06)',
                borderRadius: 4,
                padding: '26px 26px 28px',
                textDecoration: 'none',
                color: INK,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(26,20,16,0.05)',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = ORANGE
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow =
                  '0 22px 48px rgba(26,20,16,0.12), 0 0 0 1px rgba(243,103,42,0.15)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(26,20,16,0.06)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 8px 24px rgba(26,20,16,0.05)'
              }}
            >
              {/* Editorial decorative top stroke */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 24,
                  right: 24,
                  height: 1,
                  background: ORANGE,
                  opacity: 0.7,
                }}
              />

              {/* Headshot placeholder — warm gradient + serif initials */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: 2,
                  background:
                    'linear-gradient(135deg, rgba(243,103,42,0.22) 0%, rgba(26,20,16,0.06) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(26,20,16,0.06)',
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.55) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'relative',
                    fontFamily: SERIF,
                    fontSize: 'clamp(56px, 8vw, 96px)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    letterSpacing: '-2px',
                    color: INK,
                    opacity: 0.85,
                    lineHeight: 1,
                  }}
                >
                  {initials(d.name)}
                </span>
                {/* DDS pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'white',
                    borderRadius: 999,
                    padding: '5px 11px',
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: INK,
                    boxShadow: '0 4px 12px rgba(26,20,16,0.1)',
                  }}
                >
                  <Stethoscope size={11} color={ORANGE} />
                  DDS
                </div>
                {/* Rating */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    background: 'white',
                    borderRadius: 999,
                    padding: '4px 9px',
                    fontSize: 10,
                    fontWeight: 800,
                    color: INK,
                    boxShadow: '0 4px 12px rgba(26,20,16,0.1)',
                  }}
                >
                  <Star size={9} fill={ORANGE} color={ORANGE} />
                  4.9
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: ORANGE,
                  }}
                >
                  · Dentist · {location.neighborhood.split(' ')[0]} ·
                </div>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontSize: 22,
                    fontWeight: 400,
                    color: INK,
                    letterSpacing: '-0.3px',
                    lineHeight: 1.15,
                  }}
                >
                  {d.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(26,20,16,0.6)',
                    fontStyle: 'italic',
                  }}
                >
                  {d.title}
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 4,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: ORANGE,
                  }}
                >
                  View profile
                  <ArrowRight size={12} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

function LocationFAQs({
  faqs,
  location,
}: {
  faqs: { question: string; answer: string }[]
  location: Location
}) {
  return (
    <section style={{ background: CREAM_2, padding: '96px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="· Frequently asked ·"
          title={`Questions about ${location.label}.`}
          wide
          centered
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 880,
            margin: '0 auto',
          }}
        >
          {faqs.map((f, i) => (
            <details
              key={i}
              style={{
                background: 'white',
                border: '1px solid rgba(26,20,16,0.06)',
                borderRadius: 4,
                padding: '20px 24px',
              }}
            >
              <summary
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 14,
                  cursor: 'pointer',
                  listStyle: 'none',
                  fontFamily: SERIF,
                  fontSize: 18,
                  fontWeight: 400,
                  color: INK,
                  lineHeight: 1.35,
                }}
              >
                <span>{f.question}</span>
                <span
                  style={{
                    color: ORANGE,
                    fontSize: 22,
                    fontWeight: 400,
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <div
                style={{
                  marginTop: 14,
                  fontSize: 15,
                  color: 'rgba(26,20,16,0.72)',
                  lineHeight: 1.7,
                }}
              >
                {f.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function OtherLocations({ locations }: { locations: Location[] }) {
  if (locations.length === 0) return null
  return (
    <section style={{ background: CREAM, padding: '96px 32px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 32,
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: ORANGE,
                marginBottom: 12,
              }}
            >
              · Other Boca offices ·
            </div>
            <h2
              style={{
                fontSize: 'clamp(34px, 4vw, 54px)',
                fontWeight: 800,
                letterSpacing: '-1.2px',
                color: INK,
                margin: 0,
                lineHeight: 1.05,
                textTransform: 'none',
              }}
            >
              Closer to <em>you</em>?
            </h2>
          </div>
          <a
            href="/clinics/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 800,
              color: ORANGE,
              textDecoration: 'none',
              letterSpacing: 0.4,
            }}
          >
            See all 9 offices
            <ArrowRight size={14} />
          </a>
        </div>
        <div
          className="oth-v2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 980px) { .oth-v2 { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .oth-v2 { grid-template-columns: 1fr !important; } }
          `}</style>
          {locations.map((loc, i) => (
            <motion.a
              key={loc.slug}
              href={`/clinics/${loc.slug}/`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              style={{
                background: 'white',
                border: '1px solid rgba(26,20,16,0.06)',
                borderRadius: 4,
                padding: '18px 20px 16px',
                textDecoration: 'none',
                color: INK,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: '0 6px 18px rgba(26,20,16,0.05)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = ORANGE
                el.style.transform = 'translateY(-3px)'
                el.style.boxShadow =
                  '0 18px 38px rgba(26,20,16,0.12), 0 0 0 1px rgba(243,103,42,0.15)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(26,20,16,0.06)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 6px 18px rgba(26,20,16,0.05)'
              }}
            >
              {/* Header row: icon + arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, rgba(243,103,42,0.18) 0%, rgba(243,103,42,0.06) 100%)',
                    border: '1px solid rgba(243,103,42,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {loc.kids ? (
                    <Baby size={18} color={ORANGE} strokeWidth={1.8} />
                  ) : (
                    <MapPin size={18} color={ORANGE} strokeWidth={1.8} />
                  )}
                </div>
                <ArrowRight size={15} color={ORANGE} style={{ opacity: 0.7 }} />
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'rgba(26,20,16,0.5)',
                  fontStyle: 'italic',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                · {loc.neighborhood} ·
                {loc.kids && (
                  <span
                    style={{
                      color: 'white',
                      background: ORANGE,
                      marginLeft: 4,
                      fontWeight: 800,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      fontSize: 8,
                      fontStyle: 'normal',
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}
                  >
                    KIDS
                  </span>
                )}
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 19,
                  fontWeight: 400,
                  color: INK,
                  letterSpacing: '-0.3px',
                  lineHeight: 1.15,
                }}
              >
                {loc.label}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'rgba(26,20,16,0.55)',
                  paddingTop: 8,
                  borderTop: '1px solid rgba(26,20,16,0.06)',
                  marginTop: 2,
                }}
              >
                <Phone size={11} color={ORANGE} />
                {loc.phone}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader({
  eyebrow,
  title,
  wide,
  centered,
}: {
  eyebrow: string
  title: string
  /** When set, lets the H2 use the full container width so longer titles
   *  (e.g. "Questions about Russell & Eastern.") fit on a single line. */
  wide?: boolean
  /** When set, center-aligns the eyebrow + H2 (the H2's max-width still
   *  applies, but the block is centered within its parent). */
  centered?: boolean
}) {
  return (
    <div
      style={{
        marginBottom: 40,
        textAlign: centered ? 'center' : 'left',
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: ORANGE,
          marginBottom: 14,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontSize: 'clamp(36px, 4.4vw, 60px)',
          fontWeight: 800,
          letterSpacing: '-1.2px',
          color: INK,
          margin: centered ? '0 auto' : 0,
          lineHeight: 1.05,
          maxWidth: wide ? 'none' : 760,
          textTransform: 'none',
        }}
      >
        {title}
      </h2>
    </div>
  )
}

export default LocationPageV2
