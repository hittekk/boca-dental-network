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

// ─── Animated location ticker for hero right side ────────────────────────────
function ClinicsHeroTicker() {
  const [active, setActive] = React.useState(0)
  const locations = INITIAL_DATA.locations

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % locations.length), 2000)
    return () => clearInterval(t)
  }, [locations.length])

  return (
    <div className="clinics-hero-right" style={{ position: 'relative' }}>
      {/* Big stat */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 96, fontWeight: 800, color: 'white', letterSpacing: '-4px', lineHeight: 1, opacity: 0.12, position: 'absolute', top: -16, left: -8, userSelect: 'none' }}>9</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, position: 'relative' }}>
          <span style={{ fontSize: 64, fontWeight: 800, color: 'white', letterSpacing: '-2px', lineHeight: 1 }}>9</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'white' }}>Las Vegas</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>locations</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: '8px 14px' }}>
            <Star size={14} fill="#F3672A" color="#F3672A" />
            <span style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>4.8</span>
          </div>
        </div>
      </div>

      {/* Cycling location names */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {locations.map((loc, i) => (
          <div key={loc.slug} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 16px', borderRadius: 12,
            background: i === active ? 'rgba(243,103,42,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${i === active ? 'rgba(243,103,42,0.4)' : 'rgba(255,255,255,0.06)'}`,
            transition: 'all 0.4s ease',
            opacity: i === active ? 1 : 0.45,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: i === active ? '#F3672A' : 'rgba(255,255,255,0.3)', flexShrink: 0, transition: 'background 0.4s' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>{loc.label}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{loc.neighborhood}</div>
            </div>
            {i === active && (
              <div style={{ fontSize: 10, fontWeight: 800, color: '#F3672A', letterSpacing: 1, textTransform: 'uppercase' }}>
                {loc.rating}★
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mapbox multi-pin map for /clinics/ ──────────────────────────────────────
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

function ClinicsMap({ onSelectSlug }: { onSelectSlug: (slug: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapboxgl.accessToken) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-115.1729, 36.1420],
      zoom: 11,
      pitch: 0,
      attributionControl: false,
    })
    mapRef.current = map

    map.on('load', () => {
      INITIAL_DATA.locations.forEach(loc => {
        const coords = COORDS_BY_LOCATION[loc.slug]
        if (!coords) return

        const pinColor = loc.kids ? '#001D3D' : '#F3672A'

        const el = document.createElement('div')
        el.style.cssText = [
          'width:48px','height:48px','cursor:pointer',
          'display:flex','align-items:center','justify-content:center',
          `background:${pinColor}`,
          'border:3px solid white',
          'border-radius:50%',
          `box-shadow:0 4px 16px rgba(0,0,0,0.25)`,
          'transition:transform 0.15s ease',
        ].join(';')

        // SVG tooth icon — crown + two roots, matching the logo style
        el.innerHTML = `<svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.5 2 5 4 5 8C5 10.5 5.5 12.5 6 14.5C6.5 16.5 7 19 7 21C7 22.5 7.5 24 8.5 24C9.5 24 10 22.5 10.5 20C11 17.5 11.5 16 12 16C12.5 16 13 17.5 13.5 20C14 22.5 14.5 24 15.5 24C16.5 24 17 22.5 17 21C17 19 17.5 16.5 18 14.5C18.5 12.5 19 10.5 19 8C19 4 15.5 2 12 2Z" fill="white"/>
        </svg>`

        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.2)' })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
        el.addEventListener('click', () => onSelectSlug(loc.slug))

        const popup = new mapboxgl.Popup({ offset: 24, closeButton: false, closeOnClick: false })
          .setHTML(`
            <div style="font-family:inherit;padding:2px 0">
              <div style="font-size:10px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#F3672A;margin-bottom:4px">${loc.neighborhood}</div>
              <div style="font-size:14px;font-weight:800;color:#001D3D;margin-bottom:3px">${loc.label}</div>
              <div style="font-size:12px;color:rgba(0,29,61,0.55)">${loc.phone}</div>
              <div style="font-size:11px;font-weight:700;color:#F3672A;margin-top:6px;letter-spacing:0.5px">Click to view clinic →</div>
            </div>
          `)

        el.addEventListener('mouseenter', () => popup.addTo(map))
        el.addEventListener('mouseleave', () => popup.remove())

        new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat(coords)
          .setPopup(popup)
          .addTo(map)
      })
    })

    return () => { map.remove(); mapRef.current = null }
  }, [onSelectSlug])

  return (
    <div style={{ position: 'relative', width: '100%', height: 520 }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
      {/* Legend */}
      <div style={{ position: 'absolute', top: 16, left: 16, background: 'white', borderRadius: 10, padding: '10px 18px', boxShadow: '0 4px 20px rgba(0,29,61,0.14)', fontSize: 12, fontWeight: 700, color: '#001D3D', display: 'flex', gap: 18, zIndex: 2, border: '1px solid rgba(0,29,61,0.06)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#F3672A', display: 'inline-block', flexShrink: 0 }} />
          Standard clinic
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#001D3D', display: 'inline-block', flexShrink: 0, border: '1.5px solid rgba(0,29,61,0.3)' }} />
          Kids clinic
        </span>
      </div>
    </div>
  )
}

export function ClinicsHubPage() {
  const [activeNeighborhood, setActiveNeighborhood] = React.useState<string>('All')
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
      <section style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)', padding: '130px 32px 64px', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(243,103,42,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="clinics-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <style>{`
              @media(max-width:860px){.clinics-hero-grid{grid-template-columns:1fr !important;} .clinics-hero-right{display:none !important;}}
            `}</style>

            {/* Left — headline + copy + phone only */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#F3672A', marginBottom: 20, padding: '6px 14px', background: 'rgba(243,103,42,0.12)', borderRadius: 999 }}>
                <MapPin size={11} /> 9 Las Vegas Locations
              </div>
              <h1 style={{ fontSize: 'clamp(40px, 5.5vw, 76px)', fontWeight: 800, letterSpacing: '-2.5px', color: 'white', margin: '0 0 20px', lineHeight: 0.93 }}>
                Find your<br /><span style={{ color: '#F3672A' }}>nearest Boca.</span>
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', maxWidth: 480, lineHeight: 1.65, margin: '0 0 32px' }}>
                Nine dental clinics across Las Vegas — general, cosmetic, orthodontics, pediatric, and emergency care. Most insurance accepted. Se Habla Español.
              </p>
              <a href={`tel:7024560005`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none', opacity: 0.85 }}>
                <Phone size={15} color="#F3672A" /> (702) 456-0005
              </a>
            </div>

            {/* Right — animated location ticker */}
            <ClinicsHeroTicker />
          </div>
        </div>
      </section>

      {/* ── Mapbox interactive map ── */}
      <section style={{ background: '#F7F9FC', padding: '48px 32px 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,29,61,0.1)' }}>
          <ClinicsMap onSelectSlug={(slug) => window.location.href = `/clinics/${slug}/`} />
        </div>
      </section>

      {/* ── Filter pills + grid ── */}
      <section style={{ background: '#F7F9FC', padding: '64px 32px 80px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>

          {/* Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
            {neighborhoods.map(n => (
              <button key={n} onClick={() => setActiveNeighborhood(n)} style={{ padding: '8px 18px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: activeNeighborhood === n ? 'none' : '1.5px solid rgba(0,29,61,0.12)', background: activeNeighborhood === n ? ORANGE : 'white', color: activeNeighborhood === n ? 'white' : NAVY, transition: 'all 0.2s ease' }}>
                {n}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="clinics-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <style>{`
              @media (max-width: 900px){ .clinics-hub-grid{ grid-template-columns: repeat(2,1fr) !important; } }
              @media (max-width: 540px){ .clinics-hub-grid{ grid-template-columns: 1fr !important; } }
            `}</style>
            {filtered.map(loc => (
              <div key={loc.slug} style={{ background: 'white', borderRadius: 16, border: '1px solid rgba(0,29,61,0.07)', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,29,61,0.06)', display: 'flex', flexDirection: 'column' }}>
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
            ))}
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
      <section style={{ background: NAVY, padding: '140px 32px 100px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative radial glows */}
        <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-8%', width: 800, height: 800, background: 'radial-gradient(circle, rgba(243,103,42,0.14) 0%, transparent 58%)', pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(22,46,122,0.5) 0%, transparent 60%)', pointerEvents: 'none' }} />
        {/* Floating stars decoration */}
        {[{top:'18%',left:'6%',size:18,op:0.18},{top:'62%',left:'3%',size:11,op:0.12},{top:'30%',right:'4%',size:14,op:0.15},{top:'75%',right:'7%',size:20,op:0.1}].map((s,i)=>(
          <div key={i} aria-hidden style={{ position:'absolute', top:s.top, left:(s as any).left, right:(s as any).right, opacity:s.op, pointerEvents:'none' }}>
            <Star size={s.size} fill={ORANGE} color={ORANGE} />
          </div>
        ))}

        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: ORANGE, marginBottom: 24, padding: '7px 16px', background: 'rgba(243,103,42,0.12)', borderRadius: 999, border: '1px solid rgba(243,103,42,0.2)' }}>
            <Star size={11} fill={ORANGE} color={ORANGE} /> Verified Google Reviews
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 76px)', fontWeight: 800, letterSpacing: '-2.5px', color: 'white', margin: '0 0 6px', lineHeight: 0.93 }}>
            What Las Vegas patients
          </h1>
          <h1 style={{ fontSize: 'clamp(38px, 5.5vw, 76px)', fontWeight: 800, letterSpacing: '-2.5px', color: ORANGE, margin: '0 0 28px', lineHeight: 0.93, fontStyle: 'italic' }}>
            say about Boca.
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', maxWidth: 520, lineHeight: 1.7, margin: '0 0 56px' }}>
            Real reviews from real patients. We never pay for reviews — every star is earned at one of our 9 Las Vegas clinics.
          </p>

          {/* Aggregate stat cards */}
          <div className="rev-hero-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 2, width: 'fit-content' }}>
            <style>{`
              @media(max-width:640px){ .rev-hero-stats{ grid-template-columns:1fr 1fr !important; } }
            `}</style>
            {[
              { value: `${avgRating}★`, label: 'Average rating', accent: ORANGE },
              { value: `${totalReviews.toLocaleString()}+`, label: 'Google reviews', accent: '#10b981' },
              { value: '9', label: 'LV locations', accent: '#60a5fa' },
            ].map((stat, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0', border: '1px solid rgba(255,255,255,0.1)', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(255,255,255,0.1)', padding: '24px 36px', textAlign: 'center' }}>
                <div style={{ fontSize: 42, fontWeight: 800, color: 'white', letterSpacing: '-1.5px', lineHeight: 1, marginBottom: 6 }}>
                  <span style={{ color: stat.accent }}>{stat.value}</span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>{stat.label}</div>
              </div>
            ))}
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
              <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0d2654 100%)`, padding: '28px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
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
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: '0 0 16px', lineHeight: 1 }}>
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
  const [searchParams] = useSearchParams()
  const locationSlug = searchParams.get('location') ?? undefined

  // Resolve display name for the page title when a location is pre-set
  const matchedLocation = locationSlug
    ? INITIAL_DATA.locations.find((l) => l.slug === locationSlug)
    : undefined

  const pageTitle = matchedLocation
    ? `Book at ${matchedLocation.label} | Boca Dental & Braces`
    : 'Request a Free Consultation | Boca Dental & Braces Las Vegas'

  const breadcrumbSchema = usePageMeta({
    title: pageTitle,
    description: 'Book a free dental consultation at any of our 9 Boca Dental & Braces Las Vegas locations. No commitment, no obligation.',
    url: `${DOMAIN}/request-consultation/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Request Consultation' }],
  })

  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 01 ] · Free consultation"
        h1={matchedLocation ? `Book at ${matchedLocation.label}` : 'Request a Free Consultation'}
        intro={
          matchedLocation
            ? `You're booking with our ${matchedLocation.label} office at ${matchedLocation.address}. Fill out the form and someone from this location will reach out within one business hour.`
            : 'Free, no-obligation consultations at any of our 9 Las Vegas locations. Fill out the form and our team will reach out within one business hour to schedule your visit.'
        }
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Request Consultation' }]}
      />
      <ConsultationForm preselectedLocation={locationSlug} />
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
