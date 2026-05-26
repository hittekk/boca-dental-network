// ─────────────────────────────────────────────────────────────────────────────
// src/pages/CorePages.tsx
// Scaffolded versions of every "core" page in the sitemap so every URL in the
// Expansion sheet resolves with reasonable meta + content placeholders.
//
// Pages included:
//   /about-us/                         AboutUsPage
//   /clinics/                          ClinicsHubPage
//   /services/                         ServicesHubPage
//   /patient-resources/                PatientResourcesHubPage
//   /patient-resources/new-patient-forms/   NewPatientFormsPage
//   /patient-resources/insurance/      InsurancePage
//   /patient-resources/financing/      FinancingPage
//   /patient-resources/reviews/        ReviewsPage
//   /oficina-de-habla-hispana/         SpanishLandingPage
//   /contact-us/                       ContactPage
//   /request-consultation/             RequestConsultationPage
//   /careers                           CareersPage
//   /privacy-policy/                   PrivacyPage
//   /hipaa-compliance/                 HipaaPage
//
// Each page emits proper <title>, meta description, canonical, and a
// BreadcrumbList JSON-LD. Body content is scaffolded — see LAUNCH_CHECKLIST.md
// for what real content needs to come from Frankie before launch.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MapPin, Phone, Clock, Star, Mail, Briefcase, FileText, ShieldCheck, CreditCard, MessageCircle, Globe } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { ConsultationForm } from '../components/ConsultationForm/ConsultationForm'
import { INITIAL_DATA } from '../data/initialData'
import { SERVICE_CATEGORIES, SERVICE_PAGES } from '../data/serviceCatalog'
import { LOCATION_REVIEWS } from '../data/locationDetails'
import { COORDS_BY_LOCATION } from './LocationPage'
import { Homepage } from '../App'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const ORANGE = '#F3672A'
const NAVY = '#001D3D'
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace'
const DOMAIN = 'https://bocadentalandbraces.com'

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout helpers
// ─────────────────────────────────────────────────────────────────────────────

function usePageMeta(opts: {
  title: string
  description: string
  url: string
  breadcrumb?: { name: string; url?: string }[]
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    document.title = opts.title
    setMeta('description', opts.description, 'name')
    setMeta('og:title', opts.title, 'property')
    setMeta('og:description', opts.description, 'property')
    setMeta('og:url', opts.url, 'property')
    setLink('canonical', opts.url)
  }, [opts.title, opts.description, opts.url])
  if (!opts.breadcrumb) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: opts.breadcrumb.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name,
            ...(b.url ? { item: b.url } : {}),
          })),
        }),
      }}
    />
  )
}

function setMeta(name: string, content: string, attr: 'name' | 'property') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
  el.setAttribute('href', href)
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="dark" />
      {children}
      <Footer />
    </div>
  )
}

function HeroBlock({
  eyebrow,
  h1,
  intro,
  breadcrumb,
}: {
  eyebrow: string
  h1: string
  intro: string
  breadcrumb: { name: string; href?: string }[]
}) {
  return (
    <section style={{ background: 'linear-gradient(180deg, #F7F9FC 0%, white 65%)', padding: '160px 32px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <nav style={{ fontSize: 12, fontFamily: MONO, color: 'rgba(0,29,61,0.55)', marginBottom: 22, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {breadcrumb.map((b, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ opacity: 0.4 }}>/</span>}
              {b.href ? (
                <Link to={b.href} style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>{b.name}</Link>
              ) : (
                <span style={{ color: ORANGE, fontWeight: 700 }}>{b.name}</span>
              )}
            </span>
          ))}
        </nav>
        <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>
          {eyebrow}
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', fontWeight: 800, letterSpacing: '-1.2px', color: NAVY, margin: '0 0 18px', textTransform: 'uppercase' }}>
          {h1}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(0,29,61,0.75)', maxWidth: 880, margin: 0 }}>
          {intro}
        </p>
      </div>
    </section>
  )
}

function PlaceholderBody({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ background: 'white', padding: '32px 32px 96px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            background: '#F7F9FC',
            border: '1px dashed rgba(0,29,61,0.2)',
            borderRadius: 12,
            padding: '24px 28px',
            fontSize: 15,
            color: 'rgba(0,29,61,0.7)',
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

function CTAStrip({ headline = 'Ready to book? Your new Las Vegas dentist is waiting.' }: { headline?: string }) {
  return (
    <section style={{ background: NAVY, color: 'white', padding: '56px 32px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, color: 'white', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.4px' }}>
          {headline}
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/request-consultation/" style={{ background: ORANGE, color: 'white', padding: '14px 26px', borderRadius: 8, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, textDecoration: 'none' }}>
            Book online
          </Link>
          <a href={`tel:${INITIAL_DATA.brand.phone.replace(/\D/g, '')}`} style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.35)', padding: '12px 24px', borderRadius: 8, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Phone size={14} color={ORANGE} /> Call us
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page exports
// ─────────────────────────────────────────────────────────────────────────────

export function AboutUsPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'About Boca Dental & Braces | Multi-Location Las Vegas Dental Practice',
    description: 'Founded in 2006, Boca Dental & Braces is a Las Vegas multi-specialty dental practice with 9 locations and 14 licensed providers — general, cosmetic, orthodontic, oral surgery, and pediatric care under one roof.',
    url: `${DOMAIN}/about-us/`,
    breadcrumb: [
      { name: 'Home', url: `${DOMAIN}/` },
      { name: 'About' },
    ],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 01 ] · About"
        h1="About Boca Dental & Braces"
        intro="Boca Dental & Braces is a Las Vegas-based multi-specialty dental practice serving patients across 9 clinic locations in the greater Las Vegas, Nevada area. Our team includes licensed general dentists, a board-eligible orthodontist, oral and maxillofacial surgeons, periodontists, and pediatric dental specialists — all working under one unified practice."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'About' }]}
      />
      <section style={{ background: 'white', padding: '32px 32px 80px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, color: NAVY, margin: '0 0 18px', textTransform: 'uppercase' }}>Our Story</h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(0,29,61,0.78)', marginBottom: 16 }}>
            Founded in 2006 by Dr. Wyatt Dannels at the Russell &amp; Eastern clinic in Southeast Las Vegas, Boca Dental &amp; Braces was built on a single idea: every Las Vegas family deserves consistent, high-quality dental care close to home — regardless of ZIP code, schedule, or budget. Today, we operate 9 clinics across Las Vegas serving tens of thousands of patients each year.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(0,29,61,0.78)' }}>
            We believe access to high-quality dental care should not depend on your zip code, schedule, or budget. Every Boca Dental &amp; Braces location accepts most major insurance plans, offers flexible payment options, and welcomes new patients.
          </p>
        </div>
      </section>
      <CTAStrip />
      {breadcrumbSchema}
    </Shell>
  )
}

// ─── SVG illustrated city grid for hero ──────────────────────────────────────
function ClinicsHeroMap() {
  // Approximate screen positions for all 9 LV locations within a 700×480 viewBox
  const pins = [
    { x: 505, y: 344, kids: false, label: 'Russell & Eastern' },
    { x: 510, y: 352, kids: true,  label: 'Boca Kids' },
    { x: 505, y: 135, kids: false, label: 'Bonanza & Eastern' },
    { x: 254, y: 195, kids: false, label: 'Sahara & Decatur' },
    { x: 214, y: 141, kids: false, label: 'Jones & I-95' },
    { x: 577, y: 171, kids: false, label: 'Charleston & Lamb' },
    { x: 104, y: 252, kids: false, label: 'Flamingo & Torrey' },
    { x: 161, y:  62, kids: false, label: 'Cheyenne Commons' },
    { x: 505, y: 419, kids: false, label: 'Beltway Marketplace' },
  ]

  return (
    <svg
      viewBox="0 0 700 480"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      <defs>
        <radialGradient id="heroFade" cx="100%" cy="50%" r="100%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="55%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="fadeMask">
          <rect width="700" height="480" fill="url(#heroFade)" />
        </mask>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softglow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g mask="url(#fadeMask)" opacity="0.45">
        {/* ── Road grid — major E/W streets ── */}
        {[62, 141, 171, 195, 252, 344, 419].map((y, i) => (
          <line key={`ew${i}`} x1="0" y1={y} x2="700" y2={y}
            stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="6 4" />
        ))}
        {/* ── Major N/S streets ── */}
        {[104, 161, 214, 254, 380, 505, 577].map((x, i) => (
          <line key={`ns${i}`} x1={x} y1="0" x2={x} y2="480"
            stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="6 4" />
        ))}

        {/* ── Location pins ── */}
        {pins.map((p, i) => (
          <g key={i} filter="url(#softglow)">
            {/* Outer pulse ring */}
            <circle cx={p.x} cy={p.y} r="18"
              fill="none"
              stroke={p.kids ? 'rgba(96,165,250,0.3)' : 'rgba(243,103,42,0.3)'}
              strokeWidth="1" />
            {/* Mid ring */}
            <circle cx={p.x} cy={p.y} r="10"
              fill="none"
              stroke={p.kids ? 'rgba(96,165,250,0.5)' : 'rgba(243,103,42,0.5)'}
              strokeWidth="1" />
            {/* Core dot */}
            <circle cx={p.x} cy={p.y} r="5"
              fill={p.kids ? '#60a5fa' : '#F3672A'} />
          </g>
        ))}
      </g>
    </svg>
  )
}

// ─── Mapbox multi-pin map for /clinics/ ──────────────────────────────────────
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

const MAPBOX_TOKEN_RAW = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined
const CLINICS_MAP_READY = !!MAPBOX_TOKEN_RAW && MAPBOX_TOKEN_RAW !== 'undefined' && MAPBOX_TOKEN_RAW.startsWith('pk.')
if (CLINICS_MAP_READY && !mapboxgl.accessToken) mapboxgl.accessToken = MAPBOX_TOKEN_RAW!

function ClinicsMap({ onSelect, onDeselect }: {
  onSelect: (slug: string) => void
  onDeselect: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [active, setActive] = React.useState<null | {
    slug: string; label: string; neighborhood: string; phone: string;
    address: string; city: string; state: string; zip: string;
    hours: string; rating: number; review_count: number; kids: boolean;
  }>(null)
  const markersRef = useRef<Record<string, HTMLDivElement>>({})

  // Inject popup + pin animation styles once
  useEffect(() => {
    const id = 'clinics-map-styles'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      .mapboxgl-ctrl-logo { display: none !important; }
      .mapboxgl-ctrl-attrib { display: none !important; }
      .boca-pin-inner {
        transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
      }
      .boca-pin-wrap:hover .boca-pin-inner {
        transform: scale(1.18) translateY(-3px);
        box-shadow: 0 8px 28px rgba(0,0,0,0.30) !important;
      }
      .boca-pin-wrap.active-pin .boca-pin-inner {
        transform: scale(1.22) translateY(-4px);
        box-shadow: 0 10px 32px rgba(243,103,42,0.40) !important;
      }
    `
    document.head.appendChild(style)
  }, [])

  useEffect(() => {
    if (!CLINICS_MAP_READY || !containerRef.current || mapRef.current) return
    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-115.1900, 36.1300],
        zoom: 10.2,
        pitch: 0,
        attributionControl: false,
        cooperativeGestures: true,
      })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right')

      map.on('load', () => {
        INITIAL_DATA.locations.forEach(loc => {
          const coords = COORDS_BY_LOCATION[loc.slug]
          if (!coords) return

          const pinColor = loc.kids ? '#001D3D' : '#F3672A'

          // Outer: Mapbox positions this — never apply transform here
          const el = document.createElement('div')
          el.className = 'boca-pin-wrap'
          el.style.cssText = 'width:44px;height:44px;cursor:pointer;'

          // Inner: all visual effects go here
          const inner = document.createElement('div')
          inner.className = 'boca-pin-inner'
          inner.style.cssText = [
            'width:44px', 'height:44px', 'border-radius:50%',
            'display:flex', 'align-items:center', 'justify-content:center',
            `background:${pinColor}`,
            'border:3px solid white',
            'box-shadow:0 4px 20px rgba(0,0,0,0.22)',
          ].join(';')

          inner.innerHTML = `<svg width="22" height="24" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.5 2 5 4 5 8C5 10.5 5.5 12.5 6 14.5C6.5 16.5 7 19 7 21C7 22.5 7.5 24 8.5 24C9.5 24 10 22.5 10.5 20C11 17.5 11.5 16 12 16C12.5 16 13 17.5 13.5 20C14 22.5 14.5 24 15.5 24C16.5 24 17 22.5 17 21C17 19 17.5 16.5 18 14.5C18.5 12.5 19 10.5 19 8C19 4 15.5 2 12 2Z" fill="white"/>
          </svg>`
          el.appendChild(inner)

          markersRef.current[loc.slug] = el

          el.addEventListener('click', (e) => {
            e.stopPropagation() // prevent map click from immediately dismissing
            Object.values(markersRef.current).forEach(m => m.classList.remove('active-pin'))
            el.classList.add('active-pin')
            setActive({
              slug: loc.slug, label: loc.label, neighborhood: loc.neighborhood,
              phone: loc.phone, address: loc.address, city: loc.city,
              state: loc.state, zip: loc.zip, hours: loc.hours,
              rating: loc.rating, review_count: loc.review_count, kids: loc.kids,
            })
            onSelect(loc.slug)
            map.easeTo({ center: [coords[0] + 0.02, coords[1]], zoom: 12.5, duration: 600, easing: (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t })
          })

          new mapboxgl.Marker({ element: el, anchor: 'center' })
            .setLngLat(coords)
            .addTo(map)
        })

        // Click on map background dismisses panel and resets view
        map.on('click', () => {
          setActive(null)
          Object.values(markersRef.current).forEach(m => m.classList.remove('active-pin'))
          onDeselect()
          map.easeTo({ center: [-115.1900, 36.1300], zoom: 10.2, duration: 500, easing: (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t })
        })
      })

      return () => { map.remove(); mapRef.current = null }
    } catch (err) {
      console.warn('[ClinicsMap] Mapbox failed to initialize:', err)
    }
  }, [])

  const stars = (n: number) => Array.from({ length: 5 }).map((_, i) =>
    `<span style="color:${i < Math.round(n) ? '#F3672A' : 'rgba(0,29,61,0.15)'}">★</span>`
  ).join('')

  return (
    <div style={{ position: 'relative', width: '100%', height: 560 }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Legend — bottom left */}
      <div style={{ position: 'absolute', bottom: 16, left: 16, background: 'white', borderRadius: 10, padding: '9px 16px', fontSize: 11, fontWeight: 700, color: '#001D3D', display: 'flex', gap: 16, zIndex: 2, boxShadow: '0 2px 12px rgba(0,29,61,0.10)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F3672A', display: 'inline-block' }} />
          General
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#001D3D', display: 'inline-block' }} />
          Kids
        </span>
      </div>

      {/* Left-side location panel */}
      <div style={{
        position: 'absolute', top: 16, left: 16, bottom: 16,
        width: 280,
        background: 'white',
        borderRadius: 16,
        boxShadow: '0 8px 40px rgba(0,29,61,0.13)',
        zIndex: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: active ? 1 : 0,
        transform: active ? 'translateX(0)' : 'translateX(-16px)',
        pointerEvents: active ? 'all' : 'none',
        transition: 'opacity 0.28s cubic-bezier(0.4,0,0.2,1), transform 0.28s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {active && (
          <>
            {/* Colored top bar */}
            <div style={{ height: 4, background: active.kids ? '#001D3D' : '#F3672A', flexShrink: 0 }} />

            {/* Header */}
            <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(0,29,61,0.06)', flexShrink: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#F3672A', marginBottom: 6 }}>
                {active.kids ? '🦷 Kids Clinic · ' : ''}{active.neighborhood}
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#001D3D', lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 8 }}>
                {active.label}
              </div>
              {active.rating > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span dangerouslySetInnerHTML={{ __html: stars(active.rating) }} style={{ fontSize: 12 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#001D3D' }}>{active.rating.toFixed(1)}</span>
                  <span style={{ fontSize: 11, color: 'rgba(0,29,61,0.4)', fontWeight: 600 }}>({active.review_count}+)</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div style={{ padding: '14px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 14, lineHeight: 1, marginTop: 1 }}>📍</span>
                <div style={{ fontSize: 13, color: 'rgba(0,29,61,0.7)', lineHeight: 1.4 }}>
                  {active.address}<br />{active.city}, {active.state} {active.zip}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 14 }}>📞</span>
                <a href={`tel:${active.phone.replace(/\D/g,'')}`} style={{ fontSize: 13, color: '#F3672A', fontWeight: 700, textDecoration: 'none' }}>
                  {active.phone}
                </a>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 14, marginTop: 1 }}>🕐</span>
                <div style={{ fontSize: 12, color: 'rgba(0,29,61,0.55)', lineHeight: 1.5 }}>
                  {active.hours.split(' · ').map((h, i) => <div key={i}>{h}</div>)}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <a href={`/request-consultation?location=${active.slug}`} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#F3672A', color: 'white', borderRadius: 10,
                padding: '12px 16px', fontSize: 13, fontWeight: 800,
                textDecoration: 'none', letterSpacing: 0.3, gap: 6,
                transition: 'background 0.15s ease',
              }}>
                Book appointment →
              </a>
              <a href={`/clinics/${active.slug}/`} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', color: '#001D3D', borderRadius: 10,
                padding: '10px 16px', fontSize: 12, fontWeight: 700,
                textDecoration: 'none', border: '1.5px solid rgba(0,29,61,0.12)',
                transition: 'border-color 0.15s ease',
              }}>
                View clinic page
              </a>
            </div>

            {/* Close button */}
            <button onClick={() => {
              setActive(null)
              Object.values(markersRef.current).forEach(m => m.classList.remove('active-pin'))
              onDeselect()
              mapRef.current?.easeTo({ center: [-115.1900, 36.1300], zoom: 10.2, duration: 500, easing: (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t })
            }} style={{
              position: 'absolute', top: 12, right: 12,
              width: 26, height: 26, borderRadius: '50%',
              background: 'rgba(0,29,61,0.07)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, color: 'rgba(0,29,61,0.5)', lineHeight: 1,
              transition: 'background 0.15s',
            }}>×</button>
          </>
        )}
      </div>
    </div>
  )
}

export function ClinicsHubPage() {
  const [activeNeighborhood, setActiveNeighborhood] = React.useState<string>('All')
  const [activeSlug, setActiveSlug] = React.useState<string | null>(null)
  const cardRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

  const handleMapSelect = (slug: string) => {
    setActiveSlug(slug)
    setActiveNeighborhood('All') // show all cards so the selected one is visible
    // highlight only — no scroll
  }

  const handleMapDeselect = () => setActiveSlug(null)
  const breadcrumbSchema = usePageMeta({
    title: '9 Boca Dental & Braces Locations Across Las Vegas',
    description: 'Find your nearest Boca Dental & Braces — 9 dental clinic locations across Las Vegas, NV. Interactive map, hours, phone, and directions for every office.',
    url: `${DOMAIN}/clinics/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Our Locations' }],
  })

  const neighborhoods = ['All', ...Array.from(new Set(INITIAL_DATA.locations.map(l => l.neighborhood)))]
  const filtered = activeNeighborhood === 'All'
    ? INITIAL_DATA.locations
    : INITIAL_DATA.locations.filter(l => l.neighborhood === activeNeighborhood)

  return (
    <div style={{ background: '#fff', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="light" />

      {/* ── Navy hero ── */}
      <section style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)', padding: '160px 32px 72px', position: 'relative', overflow: 'hidden', minHeight: 440 }}>

        {/* SVG illustrated city grid — right side, fades into blue */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
          <ClinicsHeroMap />
          {/* Hard left-edge cover — blends SVG into hero background */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '38%', height: '100%', background: 'linear-gradient(to right, #001D3D 0%, #001D3D 30%, rgba(0,29,61,0.85) 60%, transparent 100%)', pointerEvents: 'none' }} />
          {/* Bottom fade */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, #001D3D 0%, transparent 100%)', pointerEvents: 'none' }} />
        </div>

        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#F3672A', marginBottom: 20, padding: '6px 14px', background: 'rgba(243,103,42,0.12)', borderRadius: 999 }}>
            <MapPin size={11} /> 9 Las Vegas Locations
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 800, letterSpacing: '-3px', color: 'white', margin: '0 0 20px', lineHeight: 0.9 }}>
            Find your<br /><span style={{ color: '#F3672A' }}>nearest Boca.</span>
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', maxWidth: 520, lineHeight: 1.6, margin: '0 0 40px' }}>
            Nine clinics across greater Las Vegas — general, cosmetic, orthodontics, pediatric, and emergency care. Most insurance accepted.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center' }}>
            {[{ val: '9', label: 'Locations' }, { val: '4.8★', label: 'Avg Rating' }, { val: '20k+', label: 'Patients Served' }, { val: '2006', label: 'Est. Las Vegas' }].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-1px', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
            <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
            <a href="tel:7024560005" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              <Phone size={14} color="#F3672A" /> (702) 456-0005
            </a>
          </div>
        </div>
      </section>

      {/* ── Mapbox interactive map ── */}
      <section style={{ background: '#F7F9FC', padding: '48px 32px 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', borderRadius: 20, overflow: 'hidden' }}>
          <ClinicsMap onSelect={handleMapSelect} onDeselect={handleMapDeselect} />
        </div>
      </section>

      {/* ── Filter bar + grid ── */}
      <section style={{ background: '#F7F9FC', padding: '0 0 80px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>

          {/* ── Tab strip ── */}
          <div style={{ position: 'relative', borderBottom: '2px solid rgba(0,29,61,0.08)', marginBottom: 48 }}>
            {/* Left fade */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, background: 'linear-gradient(to right, #F7F9FC, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            {/* Right fade */}
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, background: 'linear-gradient(to left, #F7F9FC, transparent)', zIndex: 2, pointerEvents: 'none' }} />

            <div style={{ overflowX: 'auto', display: 'flex', gap: 0, scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '0 40px' }}>
              <style>{`
                .loc-tab-strip::-webkit-scrollbar { display: none; }
                .loc-tab { position: relative; padding: 20px 22px 18px; font-size: 13px; font-weight: 700;
                  white-space: nowrap; cursor: pointer; border: none; background: transparent;
                  color: rgba(0,29,61,0.45); letter-spacing: 0.2px; transition: color 0.2s; flex-shrink: 0; }
                .loc-tab:hover { color: #001D3D; }
                .loc-tab.active { color: #F3672A; }
                .loc-tab.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
                  height: 2px; background: #F3672A; border-radius: 2px 2px 0 0; }
              `}</style>
              {neighborhoods.map(n => {
                const count = n === 'All' ? INITIAL_DATA.locations.length : INITIAL_DATA.locations.filter(l => l.neighborhood === n).length
                const isActive = activeNeighborhood === n
                return (
                  <button
                    key={n}
                    className={`loc-tab${isActive ? ' active' : ''}`}
                    onClick={() => setActiveNeighborhood(n)}
                  >
                    {n === 'All' ? 'All Locations' : n}
                    {n === 'All' && (
                      <span style={{ marginLeft: 7, fontSize: 11, fontWeight: 800, background: isActive ? '#F3672A' : 'rgba(0,29,61,0.1)', color: isActive ? 'white' : 'rgba(0,29,61,0.5)', borderRadius: 999, padding: '2px 7px', transition: 'all 0.2s' }}>9</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cards grid */}
          <div style={{ padding: '0 32px' }}>
          <div className="clinics-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <style>{`
              @media (max-width: 900px){ .clinics-hub-grid{ grid-template-columns: repeat(2,1fr) !important; } }
              @media (max-width: 540px){ .clinics-hub-grid{ grid-template-columns: 1fr !important; } }
            `}</style>
            {filtered.map(loc => {
              const isActive = activeSlug === loc.slug
              const isDimmed = activeSlug !== null && !isActive
              return (
              <div
                key={loc.slug}
                ref={el => { cardRefs.current[loc.slug] = el }}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  border: isActive ? `2px solid ${ORANGE}` : '1px solid rgba(0,29,61,0.07)',
                  overflow: 'hidden',
                  boxShadow: isActive ? `0 0 0 4px rgba(243,103,42,0.12), 0 8px 32px rgba(243,103,42,0.18)` : '0 4px 16px rgba(0,29,61,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: isDimmed ? 0.38 : 1,
                  transform: isActive ? 'scale(1.02)' : 'scale(1)',
                  transition: 'opacity 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                {/* Card top accent */}
                <div style={{ height: 4, background: loc.kids ? NAVY : ORANGE }} />
                <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE, marginBottom: 4 }}>{loc.neighborhood} {loc.kids && '· Kids'}</div>
                      <div style={{ fontSize: 17, fontWeight: 800, color: NAVY, letterSpacing: '-0.3px', lineHeight: 1.2 }}>{loc.label}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(243,103,42,0.08)', borderRadius: 8, padding: '4px 8px', flexShrink: 0 }}>
                      <Star size={11} fill={ORANGE} color={ORANGE} />
                      <span style={{ fontSize: 12, fontWeight: 800, color: NAVY }}>{loc.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'rgba(0,29,61,0.65)' }}>
                      <MapPin size={13} color={ORANGE} style={{ flexShrink: 0, marginTop: 1 }} />
                      <span>{loc.address}, {loc.city}, {loc.state} {loc.zip}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(0,29,61,0.65)' }}>
                      <Clock size={13} color={ORANGE} />
                      <span>{loc.hours.split(' · ')[0]}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(0,29,61,0.65)' }}>
                      <Phone size={13} color={ORANGE} />
                      <span>{loc.phone}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(0,29,61,0.06)' }}>
                    <Link to={`/request-consultation?location=${loc.slug}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: ORANGE, color: 'white', borderRadius: 8, padding: '10px 14px', fontSize: 12, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Book here
                    </Link>
                    <Link to={`/clinics/${loc.slug}/`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'white', color: NAVY, border: '1.5px solid rgba(0,29,61,0.12)', borderRadius: 8, padding: '10px 14px', fontSize: 12, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      View clinic
                    </Link>
                  </div>
                </div>
              </div>
            )
            })}
          </div>
          </div>
        </div>
      </section>

      {/* ── Insurance trust bar ── */}
      <section style={{ background: NAVY, padding: '40px 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5, marginRight: 8 }}>Insurance accepted:</div>
          {['Delta Dental', 'Aetna', 'Cigna', 'MetLife', 'Guardian', 'Nevada Medicaid'].map(ins => (
            <span key={ins} style={{ fontSize: 13, fontWeight: 700, color: 'white', background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: '6px 14px' }}>{ins}</span>
          ))}
        </div>
      </section>

      <Footer />
      {breadcrumbSchema}
    </div>
  )
}

export function ServicesHubPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'All Dental Services in Las Vegas | Boca Dental & Braces',
    description: 'Complete list of dental services at Boca Dental & Braces Las Vegas: general dentistry, cosmetic dentistry, restorative, dental implants, orthodontics, pediatric, sedation, oral surgery, periodontal, endodontics, prosthodontics, and preventive care.',
    url: `${DOMAIN}/services/`,
    breadcrumb: [
      { name: 'Home', url: `${DOMAIN}/` },
      { name: 'Services' },
    ],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 01 ] · All services"
        h1="Comprehensive Dental Services in Las Vegas"
        intro="From routine cleanings to full-mouth restorations, orthodontics to pediatric care — Boca Dental & Braces provides a complete range of dental services at 9 Las Vegas locations. Browse by category below or use the location finder to see which services are offered at the clinic closest to you."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Services' }]}
      />
      <section style={{ background: 'white', padding: '32px 32px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="services-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <style>{`
              @media (max-width: 880px){ .services-hub-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 520px){ .services-hub-grid{ grid-template-columns: 1fr !important; } }
            `}</style>
            {SERVICE_CATEGORIES.map((cat) => {
              const subCount = SERVICE_PAGES.filter((s) => s.categorySlug === cat.slug).length
              return (
                <Link key={cat.slug} to={`/${cat.slug}/`} style={{ background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderTop: `2px solid ${ORANGE}`, borderRadius: 12, padding: '20px 22px', textDecoration: 'none', color: NAVY }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE, fontFamily: MONO, marginBottom: 8 }}>
                    {subCount > 0 ? `${subCount} sub-services` : 'Category'}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, marginBottom: 8, letterSpacing: '-0.3px' }}>{cat.label}</div>
                  <p style={{ fontSize: 13, color: 'rgba(0,29,61,0.65)', margin: '0 0 12px', lineHeight: 1.5 }}>{cat.desc}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: ORANGE, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: MONO }}>
                    View {cat.label.toLowerCase()} <ArrowRight size={12} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      {breadcrumbSchema}
    </Shell>
  )
}

export function PatientResourcesHubPage() {
  const items = [
    { slug: 'new-patient-forms', label: 'New Patient Forms', desc: 'Download and complete intake paperwork before your visit.', icon: FileText },
    { slug: 'insurance', label: 'Insurance We Accept', desc: 'View accepted PPO plans + Nevada Medicaid eligibility.', icon: ShieldCheck },
    { slug: 'financing', label: 'Financing Options', desc: 'CareCredit, in-house plans, FSA/HSA — see all options.', icon: CreditCard },
    { slug: 'reviews', label: 'Patient Reviews', desc: 'Read what 1,200+ Las Vegas patients are saying.', icon: Star },
  ]
  const breadcrumbSchema = usePageMeta({
    title: 'Patient Resources | Boca Dental & Braces Las Vegas',
    description: 'Patient resources for Boca Dental & Braces Las Vegas: new patient forms, accepted insurance plans, financing options, and patient reviews.',
    url: `${DOMAIN}/patient-resources/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Patient Resources' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 01 ] · Patient resources"
        h1="Patient Resources & Information"
        intro="Everything you need before, during, and after your visit at Boca Dental & Braces Las Vegas."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Patient Resources' }]}
      />
      <section style={{ background: 'white', padding: '32px 32px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="pr-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            <style>{`@media (max-width: 720px){ .pr-hub-grid{ grid-template-columns: 1fr !important; } }`}</style>
            {items.map((it) => (
              <Link key={it.slug} to={`/patient-resources/${it.slug}/`} style={{ background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 12, padding: '22px 24px', textDecoration: 'none', color: NAVY, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(243,103,42,0.1)', border: '1px solid rgba(243,103,42,0.22)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <it.icon size={18} color={ORANGE} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: NAVY, marginBottom: 6, letterSpacing: '-0.2px' }}>{it.label}</div>
                  <p style={{ fontSize: 13, color: 'rgba(0,29,61,0.65)', margin: 0, lineHeight: 1.5 }}>{it.desc}</p>
                </div>
                <ArrowRight size={16} color={ORANGE} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTAStrip />
      {breadcrumbSchema}
    </Shell>
  )
}

export function NewPatientFormsPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'New Patient Forms | Boca Dental & Braces Las Vegas',
    description: 'Download and complete your new patient intake forms before your first visit at Boca Dental & Braces Las Vegas. Saves time at check-in.',
    url: `${DOMAIN}/patient-resources/new-patient-forms/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Patient Resources', url: `${DOMAIN}/patient-resources/` }, { name: 'New Patient Forms' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 02 ] · Intake"
        h1="New Patient Forms"
        intro="Complete your intake paperwork in advance so check-in is fast. Forms below are also available at the front desk on the day of your visit."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Patient Resources', href: '/patient-resources/' }, { name: 'New Patient Forms' }]}
      />
      <PlaceholderBody>
        <strong>[content needed]</strong> — PDF forms from Frankie. Will include: patient medical history,
        dental history, consent for treatment, HIPAA acknowledgment, insurance information form, and
        pediatric forms for our Boca Kids Dentistry location. Forms should be embedded with download
        links and an optional online intake flow.
      </PlaceholderBody>
      <CTAStrip />
      {breadcrumbSchema}
    </Shell>
  )
}

export function InsurancePage() {
  const PPO_PLANS = ['Delta Dental', 'Aetna', 'Cigna', 'Guardian', 'MetLife', 'United Healthcare', 'Humana', 'Anthem Blue Cross Blue Shield', 'Principal', 'Ameritas', 'Premier Access', 'Liberty Dental', 'Sun Life', 'Lincoln Financial', 'Mutual of Omaha']
  const breadcrumbSchema = usePageMeta({
    title: 'Insurance We Accept | Boca Dental & Braces Las Vegas',
    description: 'Boca Dental & Braces accepts most major PPO dental insurance plans including Delta Dental, Aetna, Cigna, Guardian, MetLife. Nevada Medicaid + CHIP also accepted.',
    url: `${DOMAIN}/patient-resources/insurance/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Patient Resources', url: `${DOMAIN}/patient-resources/` }, { name: 'Insurance' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 02 ] · Insurance"
        h1="Insurance We Accept"
        intro="Boca Dental & Braces accepts most major PPO dental insurance plans across all 9 Las Vegas locations. We also accept Nevada Medicaid and CHIP for eligible patients. Our team verifies your benefits before treatment at no cost so there are no surprises."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Patient Resources', href: '/patient-resources/' }, { name: 'Insurance' }]}
      />
      <section style={{ background: 'white', padding: '32px 32px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, color: NAVY, margin: '0 0 18px', textTransform: 'uppercase' }}>PPO Plans We Accept</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {PPO_PLANS.map((p) => (
              <span key={p} style={{ background: '#F7F9FC', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: NAVY }}>{p}</span>
            ))}
          </div>
          <PlaceholderBody>
            <strong>[verify with client]</strong> — full insurance carrier list per location. The plans shown above are a representative list — the final list should be confirmed against each clinic's contracts.
          </PlaceholderBody>
        </div>
      </section>
      <CTAStrip />
      {breadcrumbSchema}
    </Shell>
  )
}

export function FinancingPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'Financing & Payment Plans | Boca Dental & Braces Las Vegas',
    description: 'Flexible financing options at Boca Dental & Braces — CareCredit, in-house payment plans, FSA/HSA accepted. Spread treatment cost over 6, 12, 18, or 24 months.',
    url: `${DOMAIN}/patient-resources/financing/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Patient Resources', url: `${DOMAIN}/patient-resources/` }, { name: 'Financing' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 02 ] · Financing"
        h1="Financing & Payment Plans"
        intro="No patient should delay needed dental care because of cost. Boca Dental & Braces offers multiple financing options across all 9 Las Vegas locations to make treatment affordable for every budget."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Patient Resources', href: '/patient-resources/' }, { name: 'Financing' }]}
      />
      <section style={{ background: 'white', padding: '32px 32px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="fin-grid">
            <style>{`@media (max-width: 720px){ .fin-grid{ grid-template-columns: 1fr !important; } }`}</style>
            <FinCard title="CareCredit" body="Spread the cost over 6, 12, 18, or 24 months. Low or no interest. Apply in minutes at the front desk or online. Subject to credit approval." />
            <FinCard title="In-House Payment Plans" body="We also offer in-house monthly payment plans without a hard credit check for routine care. Ask your treatment coordinator at your visit." />
            <FinCard title="FSA / HSA Accepted" body="Use pre-tax Flexible Spending Account or Health Savings Account funds toward your dental treatment to reduce your out-of-pocket cost." />
            <FinCard title="No Insurance?" body="Boca Dental & Braces accepts cash, check, and all major credit cards. We never let cost stop necessary care — talk to us about all available options." />
          </div>
        </div>
      </section>
      <CTAStrip />
      {breadcrumbSchema}
    </Shell>
  )
}

function FinCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderTop: `2px solid ${ORANGE}`, borderRadius: 12, padding: '22px 24px' }}>
      <h3 style={{ fontSize: 17, fontWeight: 800, color: NAVY, margin: '0 0 10px', letterSpacing: '-0.2px' }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'rgba(0,29,61,0.7)', margin: 0, lineHeight: 1.6 }}>{body}</p>
    </div>
  )
}

export function ReviewsPage() {
  const [activeLocation, setActiveLocation] = React.useState<string>('all')

  const breadcrumbSchema = usePageMeta({
    title: 'Patient Reviews | Boca Dental & Braces Las Vegas',
    description: 'Read 1,200+ verified Google reviews for Boca Dental & Braces across 9 Las Vegas locations. Rated 4.9 stars by patients across Southeast Las Vegas, Spring Valley, Downtown, and more.',
    url: `${DOMAIN}/patient-resources/reviews/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Patient Resources', url: `${DOMAIN}/patient-resources/` }, { name: 'Reviews' }],
  })

  const allLocationReviews = INITIAL_DATA.locations.map(loc => ({
    location: loc,
    reviews: LOCATION_REVIEWS[loc.slug] ?? [],
  }))

  const displayed = activeLocation === 'all'
    ? allLocationReviews
    : allLocationReviews.filter(lr => lr.location.slug === activeLocation)

  const totalReviews = INITIAL_DATA.locations.reduce((sum, l) => sum + l.review_count, 0)
  const avgRating = (INITIAL_DATA.locations.reduce((sum, l) => sum + l.rating, 0) / INITIAL_DATA.locations.length).toFixed(1)

  return (
    <div style={{ background: '#fff', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="light" />

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)', minHeight: 580, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        <style>{`
          @keyframes rev-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @media(max-width:860px){ .rev-trophy-img{ display:none!important } }
        `}</style>

        {/* SVG illustration — reviews hero right side */}
        <div className="rev-trophy-img" aria-hidden style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '52%', pointerEvents: 'none' }}>
          <svg viewBox="0 0 560 580" xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <radialGradient id="rg-glow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F3672A" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#F3672A" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rg-glow2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F3672A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#F3672A" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="rg-fade" cx="0%" cy="50%" r="100%">
                <stop offset="0%" stopColor="#001D3D" stopOpacity="1" />
                <stop offset="40%" stopColor="#001D3D" stopOpacity="0" />
              </radialGradient>
              <filter id="rg-blur">
                <feGaussianBlur stdDeviation="18" />
              </filter>
              <filter id="rg-softglow">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="rg-glow3">
                <feGaussianBlur stdDeviation="8" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            {/* Background ambient glow */}
            <ellipse cx="300" cy="300" rx="260" ry="240" fill="url(#rg-glow1)" filter="url(#rg-blur)" />

            {/* Subtle grid lines */}
            {[80,160,240,320,400,480].map((y,i) => (
              <line key={`h${i}`} x1="0" y1={y} x2="560" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            {[100,200,300,400,500].map((x,i) => (
              <line key={`v${i}`} x1={x} y1="0" x2={x} y2="580" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}

            {/* ── TROPHY CUP ── */}
            {/* Base plate */}
            <rect x="222" y="468" width="116" height="14" rx="7" fill="rgba(255,255,255,0.12)" stroke="#F3672A" strokeWidth="1.5" />
            {/* Stem */}
            <rect x="265" y="420" width="30" height="52" rx="4" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {/* Stem highlight */}
            <rect x="272" y="424" width="8" height="44" rx="3" fill="rgba(255,255,255,0.08)" />

            {/* Cup body */}
            <path d="M190 220 Q185 340 210 380 Q240 420 280 422 Q320 420 350 380 Q375 340 370 220 Z"
              fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            {/* Cup body inner highlight */}
            <path d="M210 230 Q207 330 226 368 Q250 404 280 406 Q246 370 242 310 Q238 260 240 230 Z"
              fill="rgba(255,255,255,0.06)" />

            {/* Cup rim */}
            <ellipse cx="280" cy="220" rx="92" ry="18" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
            {/* Rim orange accent */}
            <ellipse cx="280" cy="220" rx="92" ry="18" fill="none" stroke="#F3672A" strokeWidth="1" strokeOpacity="0.5" />

            {/* Left handle */}
            <path d="M192 240 Q148 242 145 290 Q142 338 190 342"
              fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" strokeLinecap="round" />
            <path d="M192 240 Q148 242 145 290 Q142 338 190 342"
              fill="none" stroke="#F3672A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />

            {/* Right handle */}
            <path d="M368 240 Q412 242 415 290 Q418 338 370 342"
              fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8" strokeLinecap="round" />
            <path d="M368 240 Q412 242 415 290 Q418 338 370 342"
              fill="none" stroke="#F3672A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.6" />

            {/* ── TOOTH shape inside cup ── */}
            <g filter="url(#rg-softglow)" transform="translate(253, 248) scale(0.52)">
              <path d="M52 0 C30 0 10 16 10 38 C10 52 14 62 18 76 C22 90 24 110 28 124 C30 132 36 136 42 130 C46 126 48 116 52 116 C56 116 58 126 62 130 C68 136 74 132 76 124 C80 110 82 90 86 76 C90 62 94 52 94 38 C94 16 74 0 52 0 Z"
                fill="none" stroke="#F3672A" strokeWidth="3" strokeOpacity="0.9" />
              <path d="M52 0 C30 0 10 16 10 38 C10 52 14 62 18 76 C22 90 24 110 28 124 C30 132 36 136 42 130 C46 126 48 116 52 116 C56 116 58 126 62 130 C68 136 74 132 76 124 C80 110 82 90 86 76 C90 62 94 52 94 38 C94 16 74 0 52 0 Z"
                fill="#F3672A" fillOpacity="0.1" />
            </g>

            {/* ── STAR RATING row ── */}
            {[0,1,2,3,4].map((i) => {
              const cx = 214 + i * 34
              return (
                <g key={`star${i}`} filter="url(#rg-softglow)">
                  <polygon
                    points={`${cx},148 ${cx+6},163 ${cx+22},163 ${cx+10},172 ${cx+14},188 ${cx},179 ${cx-14},188 ${cx-10},172 ${cx-22},163 ${cx-6},163`}
                    fill={i < 4 ? '#F3672A' : 'none'}
                    stroke="#F3672A"
                    strokeWidth={i < 4 ? '0' : '2'}
                    strokeOpacity="0.7"
                    fillOpacity={i < 4 ? '0.9' : '0'}
                    transform={`scale(0.72) translate(${cx * 0.39}, ${148 * 0.39})`}
                    style={{ transformOrigin: `${cx}px 168px` }}
                  />
                </g>
              )
            })}
            {/* Simpler star row */}
            {[0,1,2,3,4].map((i) => {
              const x = 196 + i * 34
              const y = 156
              const r = 11
              const pts = Array.from({length:5}, (_,k) => {
                const a = (k * 144 - 90) * Math.PI / 180
                const b = (k * 144 - 90 + 72) * Math.PI / 180
                return `${x + r * Math.cos(a)},${y + r * Math.sin(a)} ${x + r*0.4 * Math.cos(b)},${y + r*0.4 * Math.sin(b)}`
              }).join(' ')
              return (
                <polygon key={`s${i}`}
                  points={pts}
                  fill={i < 4 ? '#F3672A' : 'none'}
                  stroke="#F3672A" strokeWidth="1.5"
                  fillOpacity={i < 4 ? '1' : '0'}
                  filter={i < 4 ? 'url(#rg-softglow)' : undefined}
                />
              )
            })}

            {/* Rating number */}
            <text x="388" y="166" fontSize="22" fontWeight="800" fill="#F3672A" fontFamily="sans-serif" opacity="0.9">4.8</text>

            {/* ── Floating review cards ── */}
            {/* Card 1 */}
            <g transform="translate(62, 98)">
              <rect width="148" height="64" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
              <rect width="148" height="2" rx="1" fill="#F3672A" fillOpacity="0.6" />
              {[0,1,2].map(i => (
                <rect key={i} x="12" y={14 + i*14} width={i===0?80:i===1?110:60} height="6" rx="3" fill="rgba(255,255,255,0.12)" />
              ))}
              {/* mini stars */}
              {[0,1,2,3,4].map(i => (
                <circle key={i} cx={12 + i*10} cy={56} r="3" fill="#F3672A" fillOpacity="0.8" />
              ))}
            </g>

            {/* Card 2 */}
            <g transform="translate(352, 140)">
              <rect width="140" height="60" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
              <rect width="140" height="2" rx="1" fill="#F3672A" fillOpacity="0.6" />
              {[0,1,2].map(i => (
                <rect key={i} x="12" y={14 + i*13} width={i===0?90:i===1?70:100} height="5" rx="2.5" fill="rgba(255,255,255,0.12)" />
              ))}
              {[0,1,2,3,4].map(i => (
                <circle key={i} cx={12 + i*10} cy={52} r="3" fill="#F3672A" fillOpacity="0.8" />
              ))}
            </g>

            {/* Card 3 */}
            <g transform="translate(80, 460)">
              <rect width="130" height="56" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
              <rect width="130" height="2" rx="1" fill="#F3672A" fillOpacity="0.6" />
              {[0,1].map(i => (
                <rect key={i} x="12" y={14 + i*14} width={i===0?70:95} height="6" rx="3" fill="rgba(255,255,255,0.12)" />
              ))}
              {[0,1,2,3,4].map(i => (
                <circle key={i} cx={12 + i*10} cy={48} r="3" fill="#F3672A" fillOpacity="0.8" />
              ))}
            </g>

            {/* Orange accent dots / sparkles */}
            {[
              {cx:460,cy:80,r:4},{cx:100,cy:400,r:3},{cx:490,cy:460,r:5},
              {cx:140,cy:180,r:2.5},{cx:420,cy:380,r:3.5},{cx:60,cy:300,r:2},
            ].map((d,i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#F3672A" fillOpacity="0.5" filter="url(#rg-softglow)" />
            ))}

            {/* Connecting arc lines (subtle) */}
            <path d="M210 157 Q168 128 148 148" fill="none" stroke="#F3672A" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
            <path d="M350 157 Q388 152 392 162" fill="none" stroke="#F3672A" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />

            {/* Left edge fade to match section bg */}
            <rect x="0" y="0" width="560" height="580" fill="url(#rg-fade)" />
          </svg>
        </div>

        {/* Floating rating badge */}
        <div className="rev-trophy-img" style={{
          position: 'absolute', bottom: 52, right: '7%',
          background: ORANGE, borderRadius: 999,
          padding: '12px 26px', fontSize: 18, fontWeight: 800,
          color: 'white', boxShadow: '0 8px 32px rgba(243,103,42,0.6)',
          whiteSpace: 'nowrap', zIndex: 2,
          animation: 'rev-float 4s ease-in-out infinite',
        }}>
          {avgRating} ★
        </div>

        {/* Left — copy */}
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '160px 32px 120px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: ORANGE, marginBottom: 24, padding: '7px 16px', background: 'rgba(243,103,42,0.12)', borderRadius: 999, border: '1px solid rgba(243,103,42,0.2)' }}>
              <Star size={11} fill={ORANGE} color={ORANGE} /> Verified Google Reviews
            </div>
            <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 58px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: '0 0 4px', lineHeight: 1.0 }}>
              What Las Vegas patients
            </h1>
            <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 58px)', fontWeight: 800, letterSpacing: '-1.5px', color: ORANGE, margin: '0 0 22px', lineHeight: 1.0 }}>
              say about Boca.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: '0 0 44px' }}>
              Real reviews from real patients. We never pay for reviews — every star is earned at one of our 9 Las Vegas clinics.
            </p>
            <div className="rev-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 2, width: 'fit-content' }}>
              <style>{`@media(max-width:640px){ .rev-hero-stats{ grid-template-columns:1fr 1fr !important; } }`}</style>
              {[
                { value: `${avgRating}\u2605`, label: 'Average rating', accent: ORANGE },
                { value: `${totalReviews.toLocaleString()}+`, label: 'Google reviews', accent: '#10b981' },
                { value: '9', label: 'LV locations', accent: '#60a5fa' },
              ].map((stat, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0', border: '1px solid rgba(255,255,255,0.1)', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.1)', padding: '24px 36px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: stat.accent, letterSpacing: '-1px', lineHeight: 1, marginBottom: 6 }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(0,29,61,0.07)', padding: '20px 32px', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 4px 20px rgba(0,29,61,0.06)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(0,29,61,0.4)', textTransform: 'uppercase', letterSpacing: 1.5, marginRight: 4, flexShrink: 0 }}>Filter:</span>
          {[{ slug: 'all', label: 'All 9 locations' }, ...INITIAL_DATA.locations.map(l => ({ slug: l.slug, label: l.label }))].map(opt => (
            <button key={opt.slug} onClick={() => setActiveLocation(opt.slug)} style={{ padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.18s ease', border: activeLocation === opt.slug ? 'none' : '1.5px solid rgba(0,29,61,0.1)', background: activeLocation === opt.slug ? ORANGE : 'transparent', color: activeLocation === opt.slug ? 'white' : 'rgba(0,29,61,0.6)', boxShadow: activeLocation === opt.slug ? '0 4px 12px rgba(243,103,42,0.3)' : 'none' }}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── REVIEW SECTIONS ── */}
      <section style={{ background: '#F7F9FC', padding: '64px 32px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 56 }}>
          {displayed.map(({ location: loc, reviews }, groupIdx) => (
            <div key={loc.slug} style={{ background: 'white', borderRadius: 24, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,29,61,0.07), 0 1px 2px rgba(0,29,61,0.05)' }}>

              {/* Location header bar */}
              <div style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)', padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: loc.kids ? 'rgba(96,165,250,0.2)' : 'rgba(243,103,42,0.2)', border: `1px solid ${loc.kids ? 'rgba(96,165,250,0.3)' : 'rgba(243,103,42,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} color={loc.kids ? '#60a5fa' : ORANGE} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: loc.kids ? '#60a5fa' : ORANGE, marginBottom: 4 }}>
                      {loc.neighborhood}{loc.kids ? ' · Pediatric' : ''}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>{loc.label}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'flex-end' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={15} fill={ORANGE} color={ORANGE} />)}
                      <span style={{ fontSize: 22, fontWeight: 800, color: 'white', marginLeft: 6 }}>{loc.rating.toFixed(1)}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 3, fontWeight: 600 }}>{loc.review_count}+ verified reviews</div>
                  </div>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Boca Dental ${loc.label} Las Vegas`)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: 10, padding: '10px 18px', fontSize: 12, fontWeight: 800, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap', transition: 'background 0.2s' }}>
                    <ArrowUpRight size={13} /> Google Maps
                  </a>
                </div>
              </div>

              {/* Review cards */}
              <div style={{ padding: '32px' }}>
                <div className="rev-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
                  <style>{`
                    @media(max-width:960px){.rev-cards{grid-template-columns:1fr 1fr !important;}}
                    @media(max-width:580px){.rev-cards{grid-template-columns:1fr !important;}}
                  `}</style>
                  {reviews.map((review, i) => (
                    <div key={i} style={{ background: '#F7F9FC', borderRadius: 18, padding: '26px 24px', border: '1px solid rgba(0,29,61,0.06)', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', overflow: 'hidden' }}>
                      {/* Giant decorative quote mark */}
                      <div aria-hidden style={{ position: 'absolute', top: -8, right: 18, fontSize: 100, lineHeight: 1, color: 'rgba(243,103,42,0.07)', fontFamily: 'Georgia, serif', fontWeight: 900, pointerEvents: 'none', userSelect: 'none' }}>"</div>
                      {/* Stars */}
                      <div style={{ display: 'flex', gap: 3, position: 'relative', zIndex: 1 }}>
                        {Array.from({ length: review.rating }).map((_, s) => <Star key={s} size={14} fill={ORANGE} color={ORANGE} />)}
                      </div>
                      {/* Quote body */}
                      <p style={{ fontSize: 14, lineHeight: 1.72, color: 'rgba(0,29,61,0.78)', margin: 0, flex: 1, position: 'relative', zIndex: 1, fontStyle: 'italic' }}>
                        "{review.body}"
                      </p>
                      {/* Author row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(0,29,61,0.07)', position: 'relative', zIndex: 1 }}>
                        {/* Avatar */}
                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: `linear-gradient(135deg, ${ORANGE}40, ${NAVY}30)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: NAVY, flexShrink: 0, border: '2px solid rgba(243,103,42,0.15)' }}>
                          {review.author.charAt(0)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, marginBottom: 1 }}>{review.author}</div>
                          <div style={{ fontSize: 11, color: 'rgba(0,29,61,0.45)', fontWeight: 600 }}>{review.authorArea}</div>
                        </div>
                        {/* Google G badge */}
                        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5, background: 'white', borderRadius: 8, padding: '4px 8px', border: '1px solid rgba(0,29,61,0.08)', boxShadow: '0 1px 4px rgba(0,29,61,0.06)' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                          <span style={{ fontSize: 10, fontWeight: 800, color: '#4285F4' }}>Google</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Per-location CTA strip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(0,29,61,0.06)', flexWrap: 'wrap' }}>
                  <Link to={`/request-consultation?location=${loc.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 10, padding: '12px 24px', fontSize: 13, fontWeight: 800, textDecoration: 'none', boxShadow: '0 8px 22px rgba(243,103,42,0.28)', letterSpacing: 0.3 }}>
                    Book at {loc.label} <ArrowRight size={14} />
                  </Link>
                  <a href={`tel:${loc.phone.replace(/\D/g,'')}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: NAVY, borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 700, textDecoration: 'none', border: '1.5px solid rgba(0,29,61,0.1)' }}>
                    <Phone size={13} color={ORANGE} /> {loc.phone}
                  </a>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(0,29,61,0.35)', fontWeight: 600 }}>{loc.review_count}+ reviews · {loc.rating.toFixed(1)} stars</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEAVE A REVIEW CTA ── */}
      <section style={{ background: NAVY, padding: '96px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(243,103,42,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Star row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={28} fill={ORANGE} color={ORANGE} />
            ))}
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.5px', color: 'white', margin: '0 0 16px' }}>
            Had a great experience?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', margin: '0 0 40px', lineHeight: 1.65, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Your review helps other Las Vegas families find quality dental care. It takes 60 seconds on Google and means the world to our team.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <a href="https://www.google.com/maps/search/?api=1&query=Boca+Dental+and+Braces+Las+Vegas" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: ORANGE, color: 'white', borderRadius: 10, padding: '16px 32px', fontSize: 15, fontWeight: 800, textDecoration: 'none', boxShadow: '0 14px 36px rgba(243,103,42,0.4)', letterSpacing: 0.3 }}>
              Leave a Google review <ArrowUpRight size={16} />
            </a>
            <Link to="/request-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.08)', color: 'white', borderRadius: 10, padding: '16px 32px', fontSize: 15, fontWeight: 800, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              Book your next visit <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      {breadcrumbSchema}
    </div>
  )
}

export function SpanishLandingPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    document.title = 'Dentista en Las Vegas que Habla Español | Boca Dental & Braces'
    setMeta('description', 'Boca Dental & Braces — 9 clínicas dentales en Las Vegas con personal bilingüe. Aceptamos Medicaid de Nevada y la mayoría de los seguros PPO. Citas el mismo día.', 'name')
    setMeta('og:title', 'Dentista en Las Vegas que Habla Español | Boca Dental & Braces', 'property')
    setLink('canonical', 'https://bocadentalandbraces.com/oficina-de-habla-hispana/')
  }, [])
  return <Homepage />
}


export function ContactPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'Contact Boca Dental & Braces | Las Vegas Dental Practice',
    description: 'Contact Boca Dental & Braces — 9 Las Vegas locations, main phone (702) 456-0005. Find your nearest clinic or send us a message.',
    url: `${DOMAIN}/contact-us/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Contact' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 01 ] · Contact"
        h1="Contact Boca Dental & Braces"
        intro="Reach our central line at (702) 456-0005, find a specific clinic's direct number below, or send us a message and we'll get back within one business day."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Contact' }]}
      />
      <section style={{ background: 'white', padding: '32px 32px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 28 }} className="contact-grid">
            <style>{`@media (max-width: 820px){ .contact-grid{ grid-template-columns: 1fr !important; } }`}</style>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: NAVY, margin: '0 0 14px', textTransform: 'uppercase' }}>Quick Contact</h2>
              <ContactRow icon={Phone} label="Main line" value={INITIAL_DATA.brand.phone} href={`tel:${INITIAL_DATA.brand.phone.replace(/\D/g, '')}`} />
              <ContactRow icon={Mail} label="Email" value="hello@bocadentalandbraces.com" href="mailto:hello@bocadentalandbraces.com" />
              <ContactRow icon={MessageCircle} label="Text us" value="Coming soon — text via your clinic's GBP" />
              <ContactRow icon={Globe} label="Hours" value="Mon–Sat hours vary by clinic. See location page." />
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: NAVY, margin: '0 0 14px', textTransform: 'uppercase' }}>9 Las Vegas Locations</h2>
              {INITIAL_DATA.locations.map((loc) => (
                <Link key={loc.slug} to={`/clinics/${loc.slug}/`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(0,29,61,0.08)', textDecoration: 'none', color: NAVY }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>{loc.label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(0,29,61,0.55)' }}>{loc.neighborhood}</div>
                  </div>
                  <div style={{ fontSize: 13, color: ORANGE, fontWeight: 700, fontFamily: MONO }}>{loc.phone}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTAStrip />
      {breadcrumbSchema}
    </Shell>
  )
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const content = (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(0,29,61,0.08)' }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(243,103,42,0.1)', border: '1px solid rgba(243,103,42,0.22)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={15} color={ORANGE} />
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(0,29,61,0.5)', fontFamily: MONO, marginBottom: 3 }}>{label}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>{value}</div>
      </div>
    </div>
  )
  if (href) return <a href={href} style={{ textDecoration: 'none', color: NAVY }}>{content}</a>
  return content
}

export function RequestConsultationPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [step, setStep] = React.useState<1 | 2>(
    searchParams.get('location') ? 2 : 1
  )
  const [selectedSlug, setSelectedSlug] = React.useState<string>(
    searchParams.get('location') ?? ''
  )

  const matchedLocation = selectedSlug
    ? INITIAL_DATA.locations.find((l) => l.slug === selectedSlug)
    : undefined

  const breadcrumbSchema = usePageMeta({
    title: 'Book an Appointment | Boca Dental & Braces Las Vegas',
    description: 'Book at any of our 9 Boca Dental & Braces Las Vegas locations. Select your office and fill out the form — we respond within one business hour.',
    url: `${DOMAIN}/request-consultation/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Book an Appointment' }],
  })

  const handleSelect = (slug: string) => {
    setSelectedSlug(slug)
    setSearchParams(slug ? { location: slug } : {})
    setStep(2)
    setTimeout(() => {
      document.getElementById('book-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const handleBack = () => {
    setStep(1)
    setSelectedSlug('')
    setSearchParams({})
    document.getElementById('book-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Shell>
      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)', padding: '170px 32px 80px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-8%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: ORANGE, marginBottom: 20, padding: '7px 16px', background: 'rgba(243,103,42,0.12)', borderRadius: 999, border: '1px solid rgba(243,103,42,0.22)' }}>
            <MapPin size={11} color={ORANGE} /> Free · No obligation
          </div>
          <h1 style={{ fontSize: 'clamp(34px, 4.8vw, 56px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: '0 0 14px', lineHeight: 1.0 }}>
            Book an Appointment
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>
            9 Las Vegas locations. Same-day appointments available. We respond within one business hour.
          </p>
        </div>
      </section>

      {/* ── 2-STEP FORM ── */}
      <section style={{ background: '#F7F9FC', padding: '0 32px 96px' }}>
        <div id="book-form-card" style={{ maxWidth: 760, margin: '0 auto', position: 'relative', top: -48 }}>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 0 }}>
            {[{ n: 1, label: 'Choose office' }, { n: 2, label: 'Your details' }].map((s, i) => (
              <React.Fragment key={s.n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', background: step === s.n ? ORANGE : 'white', borderRadius: i === 0 ? '12px 0 0 0' : '0 12px 0 0', flex: 1, justifyContent: 'center', transition: 'all 0.2s ease', boxShadow: '0 -2px 12px rgba(0,29,61,0.06)' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: step === s.n ? 'white' : step > s.n ? ORANGE : 'rgba(0,29,61,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: step === s.n ? ORANGE : step > s.n ? 'white' : 'rgba(0,29,61,0.35)', flexShrink: 0 }}>
                    {step > s.n ? '✓' : s.n}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: 'uppercase', color: step === s.n ? 'white' : 'rgba(0,29,61,0.35)' }}>{s.label}</span>
                </div>
                {i === 0 && <div style={{ width: 1, height: 46, background: 'rgba(0,29,61,0.08)' }} />}
              </React.Fragment>
            ))}
          </div>

          {/* Card */}
          <div style={{ background: 'white', borderRadius: '0 0 20px 20px', boxShadow: '0 16px 48px rgba(0,29,61,0.10)', overflow: 'hidden' }}>

            {/* Orange top accent */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, #F3672A 0%, #ff8a50 100%)' }} />

            {/* ── STEP 1: Location picker ── */}
            {step === 1 && (
              <div style={{ padding: '36px 40px 40px' }}>
                <div style={{ marginBottom: 28 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, letterSpacing: '-0.5px', margin: '0 0 6px' }}>Which office works best for you?</h2>
                  <p style={{ fontSize: 14, color: 'rgba(0,29,61,0.5)', margin: 0 }}>All 9 locations accept new patients and most insurance plans including Nevada Medicaid.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {INITIAL_DATA.locations.map((loc) => (
                    <button
                      key={loc.slug}
                      onClick={() => handleSelect(loc.slug)}
                      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px', background: 'white', border: '1.5px solid rgba(0,29,61,0.08)', borderRadius: 12, cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit', transition: 'all 0.15s ease' }}
                      onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = ORANGE; el.style.background = 'rgba(243,103,42,0.03)'; el.style.transform = 'translateX(4px)' }}
                      onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = 'rgba(0,29,61,0.08)'; el.style.background = 'white'; el.style.transform = 'translateX(0)' }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: loc.kids ? 'rgba(0,29,61,0.06)' : 'rgba(243,103,42,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <MapPin size={15} color={loc.kids ? NAVY : ORANGE} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                          <span style={{ fontSize: 15, fontWeight: 800, color: NAVY, letterSpacing: '-0.2px' }}>{loc.label}</span>
                          {loc.kids && <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', background: 'rgba(0,29,61,0.07)', color: NAVY, borderRadius: 999, padding: '2px 8px' }}>Kids</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(0,29,61,0.45)' }}>{loc.address} · <Star size={10} fill={ORANGE} color={ORANGE} style={{ verticalAlign: 'middle' }} /> {loc.rating.toFixed(1)}</div>
                      </div>
                      <ArrowRight size={15} color={ORANGE} style={{ flexShrink: 0, opacity: 0.6 }} />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleSelect('')}
                  style={{ display: 'block', width: '100%', marginTop: 16, padding: '12px', background: 'none', border: '1.5px dashed rgba(0,29,61,0.12)', borderRadius: 10, fontSize: 13, color: 'rgba(0,29,61,0.4)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}
                >
                  No preference — find me the nearest available location
                </button>
              </div>
            )}

            {/* ── STEP 2: Selected location + form ── */}
            {step === 2 && (
              <>
                {/* Location header bar */}
                <div style={{ padding: '18px 40px', background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={16} color={ORANGE} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: 2 }}>Your selected office</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: 'white', letterSpacing: '-0.3px' }}>
                        {matchedLocation ? matchedLocation.label : 'No preference — nearest available'}
                      </div>
                      {matchedLocation && (
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 1 }}>{matchedLocation.address}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleBack}
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}
                  >
                    ← Change
                  </button>
                </div>
                <ConsultationForm preselectedLocation={selectedSlug || undefined} />
              </>
            )}
          </div>
        </div>
      </section>

      {breadcrumbSchema}
    </Shell>
  )
}

export function CareersPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'Careers at Boca Dental & Braces Las Vegas',
    description: 'Join the Boca Dental & Braces team — open positions across 9 Las Vegas locations for dental hygienists, dental assistants, front desk, treatment coordinators, and licensed dentists.',
    url: `${DOMAIN}/careers`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Careers' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 01 ] · Careers"
        h1="Join the Boca Dental & Braces Team"
        intro="We're a growing multi-location dental practice in Las Vegas hiring across all 9 of our clinics. Competitive pay, comprehensive benefits, and a real career path for hygienists, assistants, coordinators, and dentists."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Careers' }]}
      />
      <PlaceholderBody>
        <strong>[content needed]</strong> — Open positions per location, benefits overview, application
        portal or ATS link, and any DEI or culture statements. Frankie to provide content + ATS
        integration (Greenhouse / Lever / Indeed).
      </PlaceholderBody>
      <CTAStrip headline="Looking for a patient appointment instead?" />
      {breadcrumbSchema}
    </Shell>
  )
}

export function PrivacyPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'Privacy Policy | Boca Dental & Braces Las Vegas',
    description: 'Privacy Policy for Boca Dental & Braces website and patient data handling.',
    url: `${DOMAIN}/privacy-policy/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Privacy Policy' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ Legal ]"
        h1="Privacy Policy"
        intro="Last updated: pending counsel review. This policy describes how Boca Dental & Braces collects, uses, and protects information submitted through this website."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Privacy Policy' }]}
      />
      <PlaceholderBody>
        <strong>[legal] — final privacy policy required from counsel before launch.</strong> Will include
        sections for: information collected, cookies and analytics, third-party sharing, HIPAA Notice of
        Privacy Practices (linked from `/hipaa-compliance/`), data retention, user rights, contact for
        privacy concerns, and California (CCPA) + Nevada (NRS 603A) disclosures.
      </PlaceholderBody>
      {breadcrumbSchema}
    </Shell>
  )
}

export function HipaaPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'HIPAA Notice of Privacy Practices | Boca Dental & Braces',
    description: 'HIPAA Notice of Privacy Practices for Boca Dental & Braces — how we use and disclose protected health information (PHI).',
    url: `${DOMAIN}/hipaa-compliance/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'HIPAA Compliance' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ Legal · HIPAA ]"
        h1="HIPAA Notice of Privacy Practices"
        intro="As a covered entity under HIPAA, Boca Dental & Braces is required to maintain the privacy of your protected health information (PHI). This notice describes how PHI may be used and disclosed and how you can access it."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'HIPAA Compliance' }]}
      />
      <PlaceholderBody>
        <strong>[legal] — final HIPAA Notice of Privacy Practices required before launch.</strong> Standard
        sections: Uses and Disclosures of PHI, Your Rights, Our Responsibilities, Changes to This Notice,
        Complaints, and Effective Date. Frankie's counsel to provide the final approved text.
      </PlaceholderBody>
      {breadcrumbSchema}
    </Shell>
  )
}
