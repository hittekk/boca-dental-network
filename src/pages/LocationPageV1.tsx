import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  Languages,
  Sparkles,
  Crown,
  Smile,
  Baby,
  Stethoscope,
  Moon,
  Activity,
  Wrench,
  ShieldCheck,
  BadgeCheck,
  Calendar,
  Car,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GoogleG } from '../components/shared/icons/GoogleG'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { CTA } from '../components/CTA/CTA'
import { useLang } from '../lib/lang'
import { tr } from '../lib/es-translate'
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
  COORDS_BY_LOCATION,
} from './LocationPage'
import { useDoctorsForLocation } from '../lib/site-data'
import {
  LOCATION_LANGUAGES,
  LOCATION_PARKING,
} from '../data/locationDetails'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined
const MAPBOX_READY = !!MAPBOX_TOKEN && MAPBOX_TOKEN !== 'undefined' && MAPBOX_TOKEN.startsWith('pk.')
if (MAPBOX_READY) mapboxgl.accessToken = MAPBOX_TOKEN!

const ORANGE = '#F3672A'
const NAVY = '#001D3D'
const NAVY_2 = '#162E7A'

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

export function LocationPageV1({ location }: { location: Location }) {
  const services = servicesForLocation(location.slug)
    .map((slug) => INITIAL_DATA.services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => s != null)
  // Provider list comes from the DB (admin-editable) via siteData, with the
  // static doctorLocations map as fallback — so turnover edits go live.
  const doctors = useDoctorsForLocation(location.slug)
  const coords = COORDS_BY_LOCATION[location.slug]

  const otherLocations = INITIAL_DATA.locations
    .filter((l) => l.slug !== location.slug && !l.slug.includes('henderson'))
    .slice(0, 4)

  return (
    <div
      style={{
        background: '#FFFFFF',
        color: NAVY,
        fontFamily: 'inherit',
      }}
    >
      <Header
        brand={INITIAL_DATA.brand}
        announcement={INITIAL_DATA.announcement}
        logoMode={location.slug === 'boca-kids-dentistry' ? 'light' : 'dark'}
      />

      {location.slug === 'boca-kids-dentistry' ? (
        <>
          <BocaKidsHero />
        </>
      ) : (
        <Hero location={location} coords={coords} />
      )}
      <TrustStrip location={location} />
      <ClinicInfoSection location={location} theme="light" officeNo={String(location.id).padStart(2, '0')} />
      <NeighborhoodNarrative location={location} />
      {doctors.length > 0 && <DoctorsHere doctors={doctors} location={location} />}
      <ServicesHere services={services} location={location} />
      <PatientReviewsSection location={location} theme="light" />
      {location.faqs.length > 0 && <LocationFAQs faqs={location.faqs} location={location} />}
      <InsuranceFinancingSection location={location} theme="light" />
      <OtherLocations locations={otherLocations} />
      <CTA />
      <Footer />
    </div>
  )
}


// ─── Boca Kids map + address section ────────────────────────────────────────
function BocaKidsMapSection({ location, coords }: { location: Location; coords?: [number, number] }) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const ORANGE = '#F3672A'
  const NAVY   = '#162E7A'

  useEffect(() => {
    if (!MAPBOX_READY || !mapContainer.current || mapRef.current || !coords) return
    let map: mapboxgl.Map
    try {
      map = new mapboxgl.Map({ container: mapContainer.current, style: 'mapbox://styles/mapbox/light-v11', center: coords, zoom: 14, interactive: false })
      mapRef.current = map
      map.on('load', () => {
        const el = document.createElement('div')
        el.style.cssText = 'width:44px;height:44px;background:#F3672A;border-radius:50%;border:3px solid white;box-shadow:0 4px 12px rgba(243,103,42,0.4);display:flex;align-items:center;justify-content:center;font-size:20px;'
        el.textContent = '🦷'
        new mapboxgl.Marker({ element: el, anchor: 'center' }).setLngLat(coords!).addTo(map)
      })
    } catch (err) { console.warn('[BocaKids] Map failed:', err) }
    return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null } }
  }, [coords])

  return (
    <section style={{ background: '#F7F9FC', padding: '64px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>Find Our Clinic</div>
        <h2 style={{ fontSize: 'clamp(22px, 2.5vw, 36px)', fontWeight: 800, letterSpacing: '-1px', color: NAVY, margin: '0 0 32px' }}>Visit Boca Kids Dentistry</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <style>{`@media(max-width:860px){ .bk-map-grid{ grid-template-columns:1fr !important; } }`}</style>
          {/* Map */}
          <div className="bk-map-grid" style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', minHeight: 360, border: '1px solid rgba(0,29,61,0.08)', boxShadow: '0 8px 32px rgba(0,29,61,0.1)' }}>
            <div ref={mapContainer} style={{ position: 'absolute', inset: 0, background: '#F0E9DF' }} />
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'white', background: ORANGE, borderRadius: 999, padding: '7px 14px', boxShadow: '0 6px 16px rgba(243,103,42,0.4)', zIndex: 2 }}>
              <MapPin size={11} /> Boca Kids · {location.neighborhood}
            </div>
          </div>
          {/* NAP card */}
          <div className="bk-map-grid" style={{ background: 'white', borderRadius: 18, padding: '32px', border: '1px solid rgba(0,29,61,0.08)', boxShadow: '0 8px 32px rgba(0,29,61,0.06)', display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: ORANGE, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>Address</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: NAVY, lineHeight: 1.55 }}>{location.address}<br />{location.city}, {location.state} {location.zip}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: ORANGE, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>Phone</div>
              <a href={"tel:" + location.phone.replace(/[^0-9]/g,"")} style={{ fontSize: 18, fontWeight: 800, color: NAVY, textDecoration: 'none' }}>{location.phone}</a>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: ORANGE, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>Hours</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,29,61,0.7)', lineHeight: 1.7 }}>Mon–Fri 9am–7pm<br />Sat 9am–5pm<br /><span style={{ color: ORANGE, fontWeight: 700, fontSize: 12 }}>Same-day emergency available</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
              <a href={`/request-consultation?location=${location.slug}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 8, padding: '14px', fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.4, boxShadow: '0 8px 18px rgba(243,103,42,0.28)' }}>
                Book at This Office →
              </a>
              {coords && <a href={"https://www.google.com/maps/dir/?api=1&destination=" + coords[1] + "," + coords[0]} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'white', color: NAVY, borderRadius: 8, padding: '12px', fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '1.5px solid rgba(0,29,61,0.12)', textTransform: 'uppercase', letterSpacing: 0.3 }}>Get Directions</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Boca Kids Hero — homepage formatting, photo full-bleed background ──────
function BocaKidsHero() {
  const ORANGE = '#F3672A'

  return (
    <section className="relative overflow-hidden" style={{ paddingTop: 180, paddingBottom: 96 }}>

      {/* Full-bleed photo */}
      <img src="/locations/boca-kids-dentistry/14.webp" alt="Boca Kids Dentistry space-themed pediatric operatory with a green alien mural and glow-in-the-dark stars, Southeast Las Vegas"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />

      {/* Solid navy left → fades right so photo shows through on right side */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #001D3D 0%, #162E7A 30%, rgba(22,46,122,0.85) 50%, rgba(22,46,122,0.3) 70%, transparent 100%)' }} />
      {/* Homepage-style diagonal tint */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,29,61,0.4) 0%, transparent 60%)' }} />

      {/* Homepage decorative rings */}
      <div className="absolute pointer-events-none" style={{ top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', border: '1.5px solid rgba(243,103,42,0.12)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(243,103,42,0.06) 0%, transparent 60%)' }} />

      <style>{`@media(max-width:860px){ .bk-grid{ grid-template-columns:1fr !important; } }`}</style>

      {/* Exact homepage grid */}
      <div className="bk-grid" style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 56, alignItems: 'center' }}>

        {/* Left — homepage copy format */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ display: 'inline-block', background: 'rgba(243,103,42,0.12)', border: '1px solid rgba(243,103,42,0.32)', borderRadius: 20, padding: '6px 20px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 22 }}>
            Pediatric Dentistry · Southeast Las Vegas
          </div>
          <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 56px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-1.2px', lineHeight: 1.0, color: 'white', margin: '0 0 22px' }}>
            <span style={{ display: 'block' }}>Where Kids</span>
            <span style={{ display: 'block' }}>Actually Love</span>
            <span style={{ display: 'block', color: ORANGE }}>the Dentist.</span>
            <span style={{ display: 'block', fontSize: '0.34em', fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.5)', marginTop: 18 }}>
              Boca Kids · 9 Locations
            </span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 500, margin: '0 0 36px' }}>
            Las Vegas's dedicated pediatric dental clinic — sensory-friendly rooms, bilingual staff, and Nevada Medicaid accepted. Built from the ground up for kids and teens.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginBottom: 32 }}>
            <a href={`/request-consultation?location=${location.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 8, padding: '14px 24px', fontSize: 14, fontWeight: 800, textDecoration: 'none', letterSpacing: 0.4, textTransform: 'uppercase', boxShadow: '0 8px 18px rgba(243,103,42,0.32)' }}>
              Book for My Child →
            </a>
            <a href="tel:7024560005" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8, padding: '14px 22px', fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: 0.3, textTransform: 'uppercase' }}>
              (702) 456-0005
            </a>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '8px 16px' }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ color: ORANGE, fontSize: 13 }}>★</span>)}
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>4.9</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>· 198 reviews · Boca Kids</span>
          </div>
        </motion.div>

        {/* Right — photo shows through here naturally */}
        <div style={{ minHeight: 480 }} />
      </div>
    </section>
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
    if (!MAPBOX_READY || !mapContainer.current || mapRef.current || !coords) return
    try {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: coords,
      zoom: 14.6,
      pitch: 36,
      bearing: -6,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
    })
    mapRef.current = map
    map.on('load', () => {
      // Branded marker — orange ball with white inner dot + soft halo
      const el = document.createElement('div')
      el.style.cssText = [
        'position: relative',
        'width: 28px',
        'height: 28px',
        'border-radius: 50%',
        'background: radial-gradient(circle at 30% 30%, #ff8a4a 0%, #F3672A 60%, #c44e1c 100%)',
        'border: 3px solid #ffffff',
        'box-shadow: 0 0 0 6px rgba(243,103,42,0.18), 0 8px 22px rgba(243,103,42,0.45)',
      ].join(';')
      const inner = document.createElement('div')
      inner.style.cssText = [
        'position: absolute',
        'top: 50%',
        'left: 50%',
        'transform: translate(-50%, -50%)',
        'width: 7px',
        'height: 7px',
        'border-radius: 50%',
        'background: white',
      ].join(';')
      el.appendChild(inner)
      new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat(coords)
        .addTo(map)
    })
    return () => {
      map.remove()
      mapRef.current = null
    }
    } catch (err) {
      console.warn('[LocationPage] Map init failed:', err)
    }
  }, [coords])

  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: '160px 32px 88px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(0,29,61,0.06)',
      }}
    >
      {/* Soft warm corner accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.06) 0%, transparent 60%)',
          filter: 'blur(40px)',
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
        {/* Breadcrumb */}
        <nav
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(0,29,61,0.5)',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <a
            href="/"
            style={{ color: 'rgba(0,29,61,0.5)', textDecoration: 'none' }}
          >
            Home
          </a>
          <span style={{ opacity: 0.4 }}>/</span>
          <a
            href="/clinics/"
            style={{ color: 'rgba(0,29,61,0.5)', textDecoration: 'none' }}
          >
            Our Locations
          </a>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: ORANGE, fontWeight: 700 }}>
            {location.label}
          </span>
        </nav>

        <div
          className="loc-hero-v1"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 56,
            alignItems: 'stretch',
          }}
        >
          <style>{`
            @media (max-width: 980px) {
              .loc-hero-v1 { grid-template-columns: 1fr !important; gap: 32px !important; }
              .loc-hero-image { order: -1; min-height: 320px !important; max-height: 360px; }
            }
          `}</style>

          {/* LEFT — copy + actions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: ORANGE,
                marginBottom: 22,
                padding: '7px 14px',
                background: 'rgba(243,103,42,0.08)',
                borderRadius: 999,
                alignSelf: 'flex-start',
              }}
            >
              <MapPin size={11} />
              {location.neighborhood}
            </div>

            <h1
              style={{
                fontSize: 'clamp(34px, 4.6vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-1.6px',
                color: NAVY,
                margin: '0 0 22px',
              }}
            >
              <span style={{ display: 'block' }}>Boca Dental &amp; Braces</span>
              <span style={{ display: 'block', fontSize: '0.55em', color: 'rgba(0,29,61,0.55)', fontWeight: 700, marginTop: 6 }}>
                Your {location.neighborhood} dentist near
              </span>
              <span style={{ display: 'block', color: ORANGE, fontStyle: 'italic' }}>
                {location.label}.
              </span>
            </h1>

            <p
              style={{
                fontSize: 17,
                color: 'rgba(0,29,61,0.65)',
                lineHeight: 1.6,
                margin: '0 0 26px',
                maxWidth: 540,
              }}
            >
              Modern dental care{' '}
              {location.kids
                ? 'designed just for kids and teens'
                : 'for the whole family'}{' '}
              — serving {location.neighborhood}. Same-day
              appointments, most insurance accepted.
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
              {location.kids && (
                <Badge
                  text="Kids only"
                  bg="rgba(243,103,42,0.1)"
                  color={ORANGE}
                />
              )}
              <Badge icon={<Languages size={11} />} text="Se Habla Español" />
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <a
                href={`/request-consultation?location=${location.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: ORANGE,
                  color: 'white',
                  borderRadius: 8,
                  padding: '15px 24px',
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 14px 32px rgba(243,103,42,0.28)',
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
                  color: NAVY,
                  border: '1.5px solid rgba(0,29,61,0.12)',
                  borderRadius: 8,
                  padding: '14px 22px',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                <Phone size={14} color={ORANGE} />
                {location.phone}
              </a>
            </div>
          </div>

          {/* RIGHT — branded Mapbox map with NAP overlay */}
          <div
            className="loc-hero-image"
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              minHeight: 480,
              border: '1px solid rgba(0,29,61,0.08)',
              boxShadow:
                '0 30px 60px rgba(0,29,61,0.16), 0 0 0 1px rgba(243,103,42,0.04)',
            }}
          >
            {/* Mapbox container */}
            <div
              ref={mapContainer}
              style={{
                position: 'absolute',
                inset: 0,
                background: '#F0E9DF',
              }}
            />
            {/* Soft orange glow tint over the map */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 50% 35%, rgba(243,103,42,0.08) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
            {/* Bottom dimming gradient — lets the NAP card sit cleanly */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 0%, transparent 55%, rgba(0,29,61,0.18) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Top tag */}
            <div
              style={{
                position: 'absolute',
                top: 18,
                left: 18,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'white',
                background: ORANGE,
                borderRadius: 999,
                padding: '7px 14px',
                boxShadow: '0 6px 16px rgba(243,103,42,0.4)',
                zIndex: 2,
              }}
            >
              <MapPin size={11} />
              Boca · {location.neighborhood}
            </div>

            {/* Bottom: NAP block overlay */}
            <div
              style={{
                position: 'absolute',
                left: 18,
                right: 18,
                bottom: 18,
                background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderRadius: 12,
                padding: '20px 22px',
                boxShadow: '0 14px 36px rgba(0,29,61,0.18)',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: ORANGE,
                  marginBottom: 12,
                }}
              >
                Visit us
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px 18px',
                }}
              >
                <NAPLine
                  icon={<MapPin size={13} color={ORANGE} />}
                  label="Address"
                  value={location.address}
                  sub={`${location.city}, ${location.state} ${location.zip}`}
                />
                <NAPLine
                  icon={<Phone size={13} color={ORANGE} />}
                  label="Phone"
                  value={location.phone}
                  sub="24/7 emergency"
                />
                <NAPLine
                  icon={<Clock size={13} color={ORANGE} />}
                  label="Hours"
                  value={location.hours.split(' · ')[0]}
                  sub={location.hours.split(' · ')[1] || 'Sun by emergency'}
                />
                <a
                  href={location.gbp_id ? `https://www.google.com/maps?cid=${location.gbp_id}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Boca Dental ${location.label} Las Vegas`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    alignSelf: 'flex-end',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    color: ORANGE,
                    textDecoration: 'none',
                    justifyContent: 'flex-end',
                  }}
                >
                  Get directions
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
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
          borderRadius: 7,
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
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            color: 'rgba(0,29,61,0.5)',
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: NAVY,
            lineHeight: 1.3,
            letterSpacing: '-0.1px',
          }}
        >
          {value}
        </div>
        {sub && (
          <div
            style={{
              fontSize: 11,
              color: 'rgba(0,29,61,0.5)',
              marginTop: 1,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}

function Badge({
  icon,
  text,
  bg = 'rgba(0,29,61,0.04)',
  color = NAVY,
}: {
  icon?: React.ReactNode
  text: string
  bg?: string
  color?: string
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: bg,
        borderRadius: 999,
        padding: '6px 12px',
        fontSize: 12,
        fontWeight: 700,
        color,
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
      accent: '#F3672A',
    },
    {
      value: location.review_count + '+',
      label: 'Verified Google reviews',
      Icon: BadgeCheck,
      accent: '#10b981',
    },
    {
      value: '6',
      label: 'Days a week open',
      Icon: Calendar,
      accent: '#162E7A',
    },
    {
      value: 'All',
      label: 'Major insurance accepted',
      Icon: ShieldCheck,
      accent: '#F3672A',
    },
  ]
  return (
    <section style={{ background: '#F8FAFB', padding: '48px 32px' }}>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}
        className="ts-v1"
      >
        <style>{`
          @media (max-width: 760px) { .ts-v1 { grid-template-columns: repeat(2, 1fr) !important; } }
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
              border: '1px solid rgba(0,29,61,0.06)',
              borderRadius: 14,
              padding: '20px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              boxShadow:
                '0 4px 14px rgba(0,29,61,0.04), 0 1px 2px rgba(0,29,61,0.04)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top accent stripe */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: it.accent,
                opacity: 0.9,
              }}
            />
            {/* Icon tile */}
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: `${it.accent}14`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <it.Icon
                size={22}
                color={it.accent}
                {...(it.Icon === Star
                  ? { fill: it.accent }
                  : {})}
                strokeWidth={2}
              />
            </div>
            {/* Value + label */}
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: NAVY,
                  letterSpacing: '-0.8px',
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {it.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(0,29,61,0.6)',
                  fontWeight: 600,
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

/**
 * Pull landmarks / context entities out of the narrative paragraph so we can
 * surface them as visual chips below the prose. Keeping this as a curated map
 * per slug (rather than a regex pass over the narrative) keeps the chips
 * editorial — only entities Frankie's team has approved.
 */
const LOCATION_LANDMARKS: Record<string, string[]> = {
  'russell-eastern':      ['215 Beltway', 'McCarran International', 'Sunset Park', 'Eastern Marketplace', '89119 · 89120'],
  'boca-kids-dentistry':  ['Whitney', 'Paradise', 'Henderson border', 'Sensory-quiet room', 'Nevada Medicaid'],
  'bonanza-eastern':      ['Downtown LV', 'East Las Vegas', 'Sunrise Manor', '89101', 'Free covered parking'],
  'sahara-decatur':       ['West Sahara', 'Chinatown corridor', '89102', 'RTC bus stop', 'Multilingual staff'],
  'jones-i95':            ['Northwest LV', 'US-95 freeway', 'Summerlin border', '89108', 'Wheelchair accessible'],
  'charleston-lamb':      ['East Charleston', 'Whitney Ranch', '89110', 'Free parking lot'],
  'flamingo-torrey':      ['Spring Valley', 'Flamingo corridor', '89117', 'Validated garage', 'Flagship clinic'],
  'cheyenne-commons':     ['Centennial Hills', 'Northwest LV', '89129', 'Cheyenne Commons plaza'],
  'beltway-marketplace':  ['Southern Highlands', "Mountain's Edge", 'Inspirada', '215 Beltway', 'Newest clinic'],
}

function landmarkIcon(landmark: string): LucideIcon {
  if (/zip|891\d\d/i.test(landmark)) return MapPin
  if (/parking|garage|accessible|bus/i.test(landmark)) return Car
  if (/medicaid|chip|insurance/i.test(landmark)) return ShieldCheck
  if (/multilingual|spanish|bilingual/i.test(landmark)) return Languages
  if (/sensory|kids|pediatric|infant/i.test(landmark)) return Baby
  if (/flagship|newest|specialty/i.test(landmark)) return Sparkles
  return MapPin
}

function NeighborhoodNarrative({ location }: { location: Location }) {
  const lang = useLang()
  const narrative = tr(location.narrative, lang)
  const languages = LOCATION_LANGUAGES[location.slug] ?? ['English']
  const parking   = LOCATION_PARKING[location.slug] ?? 'Free on-site parking'
  const landmarks = LOCATION_LANDMARKS[location.slug] ?? []
  const firstLetter = narrative.charAt(0)
  const restOfNarrative = narrative.slice(1)

  // Image gallery (data-driven — maps to the backend wp_options JSON; editable per-location with no code changes)
  const galleryImages = (location.gallery && location.gallery.length > 0) ? location.gallery : []
  const hasGallery = galleryImages.length > 0
  const [lightbox, setLightbox] = useState<number | null>(null)
  const closeLightbox = () => setLightbox(null)
  const stepLightbox = (dir: number) =>
    setLightbox((i) => (i === null ? null : (i + dir + galleryImages.length) % galleryImages.length))
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') stepLightbox(1)
      else if (e.key === 'ArrowLeft') stepLightbox(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <section
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 20% 0%, rgba(243,103,42,0.06), transparent 60%), ' +
          'radial-gradient(ellipse 80% 60% at 90% 100%, rgba(22,46,122,0.05), transparent 65%), ' +
          '#F7F9FC',
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark — large faded MapPin floating in the section corner */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -80,
          right: -60,
          opacity: 0.04,
          pointerEvents: 'none',
        }}
      >
        <MapPin size={420} color={NAVY} strokeWidth={1.2} />
      </div>

      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 36 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(243,103,42,0.08)',
              border: '1px solid rgba(243,103,42,0.22)',
              borderRadius: 999,
              padding: '7px 14px',
              marginBottom: 22,
            }}
          >
            <MapPin size={12} color={ORANGE} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: ORANGE,
              }}
            >
              About this location
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(34px, 4.4vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-1.4px',
              color: NAVY,
              margin: 0,
              lineHeight: 1.0,
              maxWidth: 880,
              textTransform: 'none',
            }}
          >
            Your neighborhood dentist in{' '}
            <span style={{ color: ORANGE }}>{location.neighborhood}</span>.
          </h2>
        </motion.div>

        <style>{`
          @media (max-width: 880px) {
            .neighborhood-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          }
        `}</style>
        {/* Office interior photo — full width, above the narrative grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              height: 420,
              position: 'relative',
              boxShadow:
                '0 30px 60px rgba(0,29,61,0.14), 0 0 0 1px rgba(243,103,42,0.06)',
            }}
          >
            <img
              src={hasGallery ? (location.heroImage || galleryImages[0]) : '/boca-office-interior.webp'}
              alt={`Boca Dental & Braces ${location.neighborhood} office interior`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: hasGallery ? 'center' : 'center 30%',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 60%, rgba(247,249,252,0.7) 100%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                background: 'rgba(0,29,61,0.82)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 12,
                fontWeight: 700,
                color: 'white',
                letterSpacing: 0.3,
              }}
            >
              <MapPin size={12} color={ORANGE} />
              Boca Dental & Braces · {location.neighborhood}
            </div>
          </div>
        </motion.div>

                <div
          className="neighborhood-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.55fr 1fr',
            gap: 56,
            alignItems: 'start',
          }}
        >
          {/* LEFT — narrative with drop cap + landmark chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: 'rgba(0,29,61,0.82)',
                margin: 0,
              }}
            >
              <span
                aria-hidden
                style={{
                  float: 'left',
                  fontSize: 80,
                  lineHeight: 0.85,
                  fontWeight: 800,
                  color: ORANGE,
                  marginRight: 14,
                  marginTop: 4,
                  fontFamily: 'Open Sans, system-ui, sans-serif',
                  letterSpacing: '-3px',
                }}
              >
                {firstLetter}
              </span>
              {restOfNarrative}
            </p>

            {landmarks.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: 'rgba(0,29,61,0.5)',
                    marginBottom: 12,
                  }}
                >
                  What's nearby · what makes this clinic
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {landmarks.map((label, i) => {
                    const Icon = landmarkIcon(label)
                    return (
                      <motion.span
                        key={label}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          background: 'white',
                          border: '1px solid rgba(22,46,122,0.12)',
                          borderRadius: 999,
                          padding: '6px 12px',
                          fontSize: 12,
                          fontWeight: 700,
                          color: NAVY_2,
                          boxShadow: '0 1px 2px rgba(0,29,61,0.04)',
                        }}
                      >
                        <Icon size={12} color={ORANGE} strokeWidth={2.4} />
                        {label}
                      </motion.span>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT — Image gallery */}
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            style={{ position: 'sticky', top: 100 }}
          >
            {hasGallery ? (
              <>
                {/* Main image — from location.heroImage / gallery[0] */}
                <button
                  type="button"
                  onClick={() => setLightbox(0)}
                  style={{ display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 16, overflow: 'hidden', marginBottom: 10, position: 'relative', height: 260, boxShadow: '0 8px 32px rgba(0,29,61,0.12)' }}
                  aria-label={`View ${location.label} photos`}
                >
                  <img
                    src={location.heroImage || galleryImages[0]}
                    alt={`Boca Dental & Braces ${location.neighborhood} — office`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  />
                  <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,29,61,0.78)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 999, padding: '6px 14px', fontSize: 11, fontWeight: 700, color: 'white', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={10} color={ORANGE} /> {location.neighborhood}
                  </div>
                </button>

                {/* Thumbnail row — next images, last tile shows "+N" when there are more */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  {galleryImages.slice(1, 4).map((src, i) => {
                    const idx = i + 1
                    const extra = galleryImages.length - 4
                    const showMore = i === 2 && extra > 0
                    return (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightbox(idx)}
                        style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 10, overflow: 'hidden', height: 90, position: 'relative', boxShadow: '0 2px 8px rgba(0,29,61,0.08)' }}
                        aria-label={`View photo ${idx + 1} of ${galleryImages.length}`}
                      >
                        <img src={src} alt={`${location.label} — photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {showMore && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,29,61,0.64)', backdropFilter: 'blur(1px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <span style={{ fontSize: 16, fontWeight: 800, lineHeight: 1 }}>+{extra}</span>
                            <span style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2, opacity: 0.85 }}>photos</span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              <>
                {/* Main image */}
                <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 10, position: 'relative', height: 260, boxShadow: '0 8px 32px rgba(0,29,61,0.12)' }}>
                  <img
                    src="/boca-office-interior.webp"
                    alt={`Boca Dental & Braces ${location.neighborhood} — reception`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
                  />
                  <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(0,29,61,0.78)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', borderRadius: 999, padding: '6px 14px', fontSize: 11, fontWeight: 700, color: 'white', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={10} color={ORANGE} /> {location.neighborhood}
                  </div>
                </div>

                {/* Thumbnail row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  {/* Thumb 1 — reuse hero image at different crop */}
                  <div style={{ borderRadius: 10, overflow: 'hidden', height: 90, position: 'relative', boxShadow: '0 2px 8px rgba(0,29,61,0.08)' }}>
                    <img src="/boca-office-interior.webp" alt="Office interior"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right 20%' }} />
                  </div>
                  {/* Thumb 2 — placeholder: Treatment room */}
                  <div style={{ borderRadius: 10, overflow: 'hidden', height: 90, background: 'linear-gradient(135deg, rgba(0,29,61,0.06) 0%, rgba(243,103,42,0.06) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, border: '1.5px dashed rgba(0,29,61,0.1)' }}>
                    <div style={{ fontSize: 18 }}>🦷</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(0,29,61,0.35)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', lineHeight: 1.3 }}>Treatment<br />Room</div>
                  </div>
                  {/* Thumb 3 — placeholder: Team */}
                  <div style={{ borderRadius: 10, overflow: 'hidden', height: 90, background: 'linear-gradient(135deg, rgba(243,103,42,0.06) 0%, rgba(0,29,61,0.06) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, border: '1.5px dashed rgba(0,29,61,0.1)' }}>
                    <div style={{ fontSize: 18 }}>👩‍⚕️</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(0,29,61,0.35)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', lineHeight: 1.3 }}>Our<br />Team</div>
                  </div>
                </div>
              </>
            )}

            {/* Rating + call CTA below gallery */}
            <div style={{ marginTop: 14, background: 'white', borderRadius: 14, border: '1px solid rgba(0,29,61,0.08)', padding: '16px 18px', boxShadow: '0 2px 12px rgba(0,29,61,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={13} fill={i <= Math.round(location.rating) ? ORANGE : 'none'} color={ORANGE} />
                  ))}
                  <span style={{ fontSize: 13, fontWeight: 800, color: NAVY, marginLeft: 4 }}>{location.rating.toFixed(1)}</span>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(0,29,61,0.4)', fontWeight: 600 }}>{location.review_count}+ reviews</span>
              </div>
              <a
                href={`tel:${location.phone.replace(/\D/g, '')}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 10, padding: '12px 16px', fontSize: 13, fontWeight: 800, textDecoration: 'none', letterSpacing: 0.4, textTransform: 'uppercase', boxShadow: '0 8px 20px rgba(243,103,42,0.3)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 28px rgba(243,103,42,0.42)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(243,103,42,0.3)' }}
              >
                <Phone size={13} /> Call {location.phone}
              </a>
            </div>
          </motion.aside>

          {/* Lightbox — full-screen gallery viewer */}
          {lightbox !== null && hasGallery && (
            <div
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,12,28,0.92)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }}
            >
              {/* Close */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close"
                style={{ position: 'absolute', top: 20, right: 20, width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 22, lineHeight: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>

              {/* Prev */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); stepLightbox(-1) }}
                  aria-label="Previous photo"
                  style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 26, lineHeight: 1, cursor: 'pointer' }}
                >
                  ‹
                </button>
              )}

              {/* Image + caption */}
              <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1100, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <img
                  src={galleryImages[lightbox]}
                  alt={`${location.label} — photo ${lightbox + 1} of ${galleryImages.length}`}
                  style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', borderRadius: 12, boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600 }}>
                  <MapPin size={13} color={ORANGE} />
                  <span>{location.label} · {location.address}</span>
                  <span style={{ opacity: 0.5 }}>|</span>
                  <span>{lightbox + 1} / {galleryImages.length}</span>
                </div>
              </div>

              {/* Next */}
              {galleryImages.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); stepLightbox(1) }}
                  aria-label="Next photo"
                  style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 26, lineHeight: 1, cursor: 'pointer' }}
                >
                  ›
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function AtAGlanceRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '11px 0',
        borderBottom: '1px solid rgba(0,29,61,0.05)',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 30,
          height: 30,
          borderRadius: 8,
          background: 'rgba(243,103,42,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={14} color={ORANGE} strokeWidth={2.2} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'rgba(0,29,61,0.5)',
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: NAVY,
            lineHeight: 1.4,
          }}
        >
          {value}
        </div>
      </div>
    </div>
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
        background: '#F8FAFB',
        padding: '88px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative orange smudge */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          left: '60%',
          width: 700,
          height: 700,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.05) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}
      >
        <SectionHeader
          number="02"
          label={`What we do at ${location.label}`}
          title="Full-spectrum dental care here."
        />
        <div
          className="svc-v1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          <style>{`
            @media (max-width: 980px) { .svc-v1 { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .svc-v1 { grid-template-columns: 1fr !important; } }
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
                  border: '1px solid rgba(0,29,61,0.06)',
                  borderRadius: 16,
                  padding: '24px 22px 22px',
                  textDecoration: 'none',
                  color: NAVY,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  boxShadow:
                    '0 8px 22px rgba(0,29,61,0.05), 0 1px 2px rgba(0,29,61,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.22s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow =
                    '0 22px 48px rgba(0,29,61,0.12), 0 0 0 1px rgba(243,103,42,0.18)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow =
                    '0 8px 22px rgba(0,29,61,0.05), 0 1px 2px rgba(0,29,61,0.04)'
                }}
              >
                {/* Corner index badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 16,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1,
                    color: 'rgba(0,29,61,0.3)',
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  0{i + 1}
                </div>

                {/* Icon tile — large, orange-tinted, the focal element */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background:
                      'linear-gradient(135deg, rgba(243,103,42,0.18) 0%, rgba(243,103,42,0.06) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(243,103,42,0.15)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 14px rgba(243,103,42,0.12)',
                  }}
                >
                  <Icon size={26} color={ORANGE} strokeWidth={2} />
                </div>

                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: NAVY,
                    letterSpacing: '-0.4px',
                    lineHeight: 1.2,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(0,29,61,0.6)',
                    lineHeight: 1.55,
                    flexGrow: 1,
                  }}
                >
                  {s.desc}
                </div>

                {/* Inline "Learn more" */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 6,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1,
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
        <ServiceAvailabilityNote location={location} theme="light" />
      </div>
    </section>
  )
}

function DoctorsHere({
  doctors,
  location,
}: {
  doctors: { slug: string; name: string; title: string; photo?: string }[]
  location: Location
}) {
  // Pull initials from name like "Dr. Wyatt Dannels" → "WD"
  const initials = (name: string) => {
    const parts = name.replace(/^Dr\.?\s+/i, '').split(/[\s,]+/).filter(Boolean)
    const first = parts[0]?.[0] ?? ''
    const last = parts[1]?.[0] ?? ''
    return (first + last).toUpperCase()
  }
  return (
    <section style={{ background: 'white', padding: '88px 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <SectionHeader
          number="03"
          label="Your team"
          title={`The dentists at ${location.label}.`}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(doctors.length, 3)}, 1fr)`,
            gap: 18,
          }}
          className="doc-v1"
        >
          <style>{`
            @media (max-width: 800px) { .doc-v1 { grid-template-columns: 1fr !important; } }
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
                background: '#F8FAFB',
                border: '1px solid rgba(0,29,61,0.06)',
                borderRadius: 18,
                padding: '24px 24px 26px',
                textDecoration: 'none',
                color: NAVY,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(0,29,61,0.04)',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'white'
                el.style.borderColor = 'rgba(243,103,42,0.4)'
                el.style.transform = 'translateY(-4px)'
                el.style.boxShadow =
                  '0 22px 48px rgba(0,29,61,0.1), 0 0 0 1px rgba(243,103,42,0.15)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#F8FAFB'
                el.style.borderColor = 'rgba(0,29,61,0.06)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 6px 18px rgba(0,29,61,0.04)'
              }}
            >
              {/* Headshot placeholder — gradient + initials + stethoscope badge */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: 14,
                  background:
                    'linear-gradient(135deg, rgba(243,103,42,0.22) 0%, rgba(22,46,122,0.16) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,29,61,0.06)',
                }}
              >
                {/* Soft radial accent */}
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
                {/* Real headshot when available, otherwise initials */}
                {d.photo ? (
                  <img
                    src={d.photo}
                    alt={d.name}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      position: 'relative',
                      fontSize: 'clamp(48px, 7vw, 88px)',
                      fontWeight: 800,
                      letterSpacing: '-2.5px',
                      color: NAVY,
                      opacity: 0.85,
                      lineHeight: 1,
                    }}
                  >
                    {initials(d.name)}
                  </span>
                )}
                {/* Star rating badge */}
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
                    color: NAVY,
                    boxShadow: '0 4px 12px rgba(0,29,61,0.1)',
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
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: ORANGE,
                  }}
                >
                  Dentist · {location.neighborhood.split(' ')[0]}
                </div>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: NAVY,
                    letterSpacing: '-0.4px',
                    lineHeight: 1.2,
                  }}
                >
                  {d.name}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(0,29,61,0.6)',
                    marginBottom: 4,
                  }}
                >
                  {d.title}
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: ORANGE,
                    marginTop: 2,
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
    <section style={{ background: '#F8FAFB', padding: '80px 32px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <SectionHeader
          number="04"
          label="Frequently asked"
          title={`Questions about ${location.label}.`}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((f, i) => (
            <details
              key={i}
              style={{
                background: 'white',
                border: '1px solid rgba(0,29,61,0.06)',
                borderRadius: 12,
                padding: '18px 22px',
                boxShadow: '0 4px 12px rgba(0,29,61,0.04)',
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
                  fontSize: 16,
                  fontWeight: 700,
                  color: NAVY,
                  lineHeight: 1.4,
                }}
              >
                <span>{f.question}</span>
                <span
                  style={{
                    color: ORANGE,
                    fontSize: 20,
                    fontWeight: 400,
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </summary>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: 'rgba(0,29,61,0.7)',
                  lineHeight: 1.65,
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
    <section style={{ background: 'white', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 28,
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: ORANGE,
                marginBottom: 8,
              }}
            >
              Other Boca offices
            </div>
            <h2
              style={{
                fontSize: 'clamp(26px, 3vw, 40px)',
                fontWeight: 800,
                letterSpacing: '-1px',
                color: NAVY,
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              Closer to you?
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
            }}
          >
            See all 9 offices
            <ArrowRight size={14} />
          </a>
        </div>
        <div
          className="oth-v1"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 980px) { .oth-v1 { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .oth-v1 { grid-template-columns: 1fr !important; } }
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
                border: '1px solid rgba(0,29,61,0.06)',
                borderRadius: 14,
                padding: '18px 18px 16px',
                textDecoration: 'none',
                color: NAVY,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                boxShadow: '0 6px 16px rgba(0,29,61,0.04)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(243,103,42,0.4)'
                el.style.transform = 'translateY(-3px)'
                el.style.boxShadow =
                  '0 18px 38px rgba(0,29,61,0.1), 0 0 0 1px rgba(243,103,42,0.15)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(0,29,61,0.06)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 6px 16px rgba(0,29,61,0.04)'
              }}
            >
              {/* Header: icon tile + arrow */}
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
                    borderRadius: 10,
                    background:
                      'linear-gradient(135deg, rgba(243,103,42,0.18) 0%, rgba(243,103,42,0.06) 100%)',
                    border: '1px solid rgba(243,103,42,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {loc.kids ? (
                    <Baby size={18} color={ORANGE} strokeWidth={2.2} />
                  ) : (
                    <MapPin size={18} color={ORANGE} strokeWidth={2.2} />
                  )}
                </div>
                <ArrowRight size={16} color={ORANGE} style={{ opacity: 0.7 }} />
              </div>

              {/* Neighborhood eyebrow */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(0,29,61,0.5)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                {loc.neighborhood}
                {loc.kids && (
                  <span
                    style={{
                      color: 'white',
                      background: ORANGE,
                      fontWeight: 800,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      fontSize: 8,
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}
                  >
                    KIDS
                  </span>
                )}
              </div>

              {/* Location name */}
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: NAVY,
                  letterSpacing: '-0.3px',
                  lineHeight: 1.2,
                }}
              >
                {loc.label}
              </div>

              {/* Phone with icon */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'rgba(0,29,61,0.6)',
                  paddingTop: 8,
                  borderTop: '1px solid rgba(0,29,61,0.06)',
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
  number,
  label,
  title,
}: {
  number: string
  label: string
  title: string
}) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: ORANGE,
          marginBottom: 12,
        }}
      >
        {number} · {label}
      </div>
      <h2
        style={{
          fontSize: 'clamp(28px, 3.4vw, 44px)',
          fontWeight: 800,
          letterSpacing: '-1px',
          color: NAVY,
          margin: 0,
          lineHeight: 1.1,
          maxWidth: 820,
        }}
      >
        {title}
      </h2>
    </div>
  )
}

export default LocationPageV1

// This is a placeholder — see BocaKidsMapSection defined earlier in file
