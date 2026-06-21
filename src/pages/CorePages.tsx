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
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MapPin, Phone, Clock, Star, Mail, Briefcase, FileText, ShieldCheck, CreditCard, MessageCircle, Globe } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { Services } from '../components/Services/Services'
import { CTA } from '../components/CTA/CTA'
import { LangProvider } from '../lib/lang'
import { ConsultationForm } from '../components/ConsultationForm/ConsultationForm'
import { INITIAL_DATA } from '../data/initialData'
import { useDoctors } from '../lib/site-data'
import { SERVICE_CATEGORIES, SERVICE_PAGES } from '../data/serviceCatalog'
import { LOCATION_REVIEWS } from '../data/locationDetails'
import { COORDS_BY_LOCATION } from './LocationPage'
import { ServicesHubPage } from './ServicesPage'
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

export function usePageMeta(opts: {
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
    setMeta('twitter:title', opts.title, 'name')
    setMeta('twitter:description', opts.description, 'name')
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

export function Shell({ children, logoMode = 'dark' }: { children: React.ReactNode, logoMode?: 'white' | 'dark' }) {
  return (
    <div style={{ background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode={logoMode} />
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

export function CTAStrip({ headline = 'Ready to book? Your new Las Vegas dentist is waiting.' }: { headline?: string }) {
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
  const doctors = useDoctors()
  const breadcrumbSchema = usePageMeta({
    title: 'About Boca Dental & Braces | Las Vegas, NV',
    description: 'Founded by Dr. Wyatt Dannels, Boca Dental & Braces has grown to 9 Las Vegas locations with a team of licensed providers — delivering consistent, high-quality care to every Las Vegas family regardless of ZIP code, schedule, or budget.',
    url: `${DOMAIN}/about-us/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'About Us' }],
  })

  const FEATURED_DOCTORS = [
    {
      slug: 'dr-wyatt-dannels',
      name: 'Dr. Wyatt Dannels',
      title: 'Founder & Lead Dentist',
      school: 'University of Southern California',
      years: 13,
      bio: 'Dr. Dannels founded Boca Dental & Braces with one goal: give every Las Vegas family access to consistent, high-quality dental care regardless of ZIP code or budget. He oversees clinical standards across all 9 locations and personally sees patients at Russell & Eastern and our newest Beltway Marketplace clinic. He is a member of the American Dental Association and the Nevada Dental Association.',
      langs: ['English', 'Spanish'],
      initial: 'W',
    },
    {
      slug: 'dr-kelcey-loveland',
      name: 'Dr. Kelcey Loveland',
      title: 'Orthodontist · Board-Eligible',
      school: 'University of the Pacific, Arthur A. Dugoni School of Dentistry',
      years: 8,
      bio: 'Dr. Loveland personally reviews and approves every Invisalign treatment plan across the Boca Dental & Braces network. A Diamond+ Invisalign provider, she completed her specialty residency focused on digital workflow and clear aligner therapy, and runs Invisalign Teen programs across the practice. She serves on the orthodontic faculty advisory committee at the Nevada State Dental Association.',
      langs: ['English', 'Spanish'],
      initial: 'K',
    },
    {
      slug: 'dr-charles-calder',
      name: 'Dr. Charles Calder',
      title: 'Oral & Maxillofacial Surgeon',
      school: 'UCLA School of Dentistry · UCSF Medical Center Residency',
      years: 14,
      bio: 'Dr. Calder completed a four-year oral and maxillofacial surgery residency at UCSF Medical Center and is licensed in IV sedation. He performs all surgical procedures at Boca — wisdom teeth, implant placement, bone grafting, and frenectomy — and has lectured nationally on minimally invasive implant placement.',
      langs: ['English'],
      initial: 'C',
    },
  ]

  const VALUES = [
    { num: '01', title: 'Access for Every Family', body: 'Nevada Medicaid accepted. Most major PPO plans welcomed. Flexible in-house payment options available. We built Boca so that cost is never the reason a Las Vegas family skips dental care.' },
    { num: '02', title: 'Bilingual by Design', body: 'Se habla español en todas nuestras oficinas. Spanish-speaking staff at every one of our 9 Las Vegas locations — because serving Las Vegas means serving the whole community.' },
    { num: '03', title: 'Every Specialty, One Roof', body: 'General dentistry, orthodontics, oral surgery, periodontics, pediatric care, sedation, implants, and cosmetics. No outside referrals. No runaround. One practice that handles it all.' },
    { num: '04', title: 'Same-Day When You Need It', body: "Dental emergencies don't wait. Same-day emergency appointments are available at all 9 Las Vegas locations. Saturday hours at select clinics. We are here when life happens." },
  ]

  return (
    <div style={{ background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="light" />

      {/* ── HERO — editorial, full-bleed, centered ── */}
      <section style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)', minHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '180px 32px 96px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        {/* Large year watermark */}
        <div style={{ position: 'absolute', bottom: -20, right: -20, fontSize: 'clamp(120px, 18vw, 260px)', fontWeight: 900, color: 'rgba(255,255,255,0.03)', letterSpacing: '-8px', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>BOCA</div>
        {/* Glow */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 500, background: 'radial-gradient(ellipse, rgba(243,103,42,0.08) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 32, padding: '6px 18px', background: 'rgba(243,103,42,0.1)', borderRadius: 999, border: '1px solid rgba(243,103,42,0.2)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: ORANGE, display: 'inline-block' }} />
            Las Vegas, Nevada
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-3px', color: 'white', margin: '0 0 12px', lineHeight: 0.95 }}>
            Knocking Out
          </h1>
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 800, letterSpacing: '-3px', color: ORANGE, margin: '0 0 36px', lineHeight: 0.95 }}>
            the Competition.
          </h1>

          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 640, margin: '0 auto 52px' }}>
            Las Vegas deserved a better dental practice. One that accepts Medicaid. One that speaks Spanish. One that has specialists on staff — not on referral. Dr. Wyatt Dannels built that practice. Nine locations later, that is still the mission.
          </p>

          {/* Stats row */}
          <div className="about-hero-stats" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '28px 0', margin: '0 auto', maxWidth: 860 }}>
            <style>{`
              .about-hero-stats{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); align-items:center; }
              .about-hero-stats > div{ position:relative; text-align:center; padding:6px 10px; }
              .about-hero-stats > div + div::before{ content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); height:34px; width:1px; background:rgba(255,255,255,0.1); }
              @media(max-width:760px){ .about-hero-stats{ grid-template-columns:repeat(3, minmax(0,1fr)); row-gap:26px; } .about-hero-stats > div + div::before{ display:none; } }
              @media(max-width:440px){ .about-hero-stats{ grid-template-columns:repeat(2, minmax(0,1fr)); } }
            `}</style>
            {[['9', 'Locations'], ['14', 'Providers'], ['20k+', 'Patients'], ['4.8★', 'Rating'], ['Medicaid', 'Accepted']].map(([val, label], i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: 800, color: 'white', letterSpacing: '-0.5px', lineHeight: 1.05, whiteSpace: 'nowrap' }}>{val}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── FOUNDING STORY — editorial two-column ── */}
      <section style={{ background: 'white', padding: '112px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0 80px', alignItems: 'start' }}>
            <style>{`@media(max-width:860px){ .about-story-grid{ grid-template-columns:1fr !important; } }`}</style>

            {/* Left — sticky label */}
            <motion.div className="about-story-grid" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ position: 'sticky', top: 120 }}>
              <div style={{ width: 40, height: 3, background: ORANGE, marginBottom: 24, borderRadius: 2 }} />
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 16 }}>Our Story</div>
              <h2 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: '0 0 20px', lineHeight: 1.1 }}>
                One Clinic.<br />One Idea.
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(0,29,61,0.5)', lineHeight: 1.7, margin: 0 }}>Southeast Las Vegas.</p>
            </motion.div>

            {/* Right — story */}
            <motion.div className="about-story-grid" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
              {/* Pull quote */}
              <div style={{ borderLeft: `4px solid ${ORANGE}`, paddingLeft: 28, marginBottom: 40 }}>
                <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 700, color: NAVY, lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                  "Every Las Vegas family deserves consistent, high-quality dental care close to home — regardless of ZIP code, schedule, or budget."
                </p>
                <p style={{ fontSize: 13, color: 'rgba(0,29,61,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginTop: 14, marginBottom: 0 }}>
                  Dr. Wyatt Dannels · Founder & CEO
                </p>
              </div>

                            <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(0,29,61,0.75)', marginBottom: 24 }}>
                Dr. Wyatt Dannels' commitment to serving underserved communities began long before he opened his first dental practice. From 2000 to 2002 he lived in Torreón, Mexico, spending two years serving the Hispanic community — an experience that profoundly shaped his perspective on healthcare, service, and the barriers many families face when seeking dental treatment.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(0,29,61,0.75)', marginBottom: 24 }}>
                Upon returning home, Dr. Dannels pursued degrees in both Spanish and Biology, knowing his calling was to become a dentist who could bridge cultural and language gaps in healthcare. He later earned his Doctor of Dental Surgery degree from the University of Southern California, where his bilingual abilities allowed him to care for many Spanish-speaking patients who had never visited a dentist or who suffered from significant dental anxiety.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(0,29,61,0.75)', marginBottom: 24 }}>
                After graduating from dental school, Dr. Dannels moved his family to Las Vegas with a clear mission: to improve access to quality dental care for underserved populations. He soon realized the challenges of limited access extended far beyond any single demographic — families from every background faced financial barriers, fear of treatment, and too few quality providers.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(0,29,61,0.75)', marginBottom: 40 }}>
                Driven by the belief that everyone deserves exceptional dental care, he expanded his vision and began opening practices throughout the Las Vegas Valley to serve the communities with the greatest need. Today Boca Dental & Braces spans nine Las Vegas locations, and his mission remains simple: to ensure that every patient — regardless of language, background, or circumstance — has access to the high-quality dental care they deserve.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUES — numbered list, not card grid ── */}
      <section style={{ background: '#001D3D', padding: '112px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '120px 100%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 16 }}>What We Stand For</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: 0, maxWidth: 600 }}>
              Built Different.<br />By Design.
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <style>{`@media(max-width:720px){ .about-val-grid{ grid-template-columns:1fr !important; } }`}</style>
            {VALUES.map((v, i) => (
              <motion.div key={i} className="about-val-grid" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ position: 'relative', overflow: 'hidden', background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.045)', padding: '52px 48px', borderTop: `1px solid rgba(255,255,255,0.06)`, borderLeft: i % 2 === 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                {/* Ghost number watermark */}
                <div style={{ position: 'absolute', top: -10, right: 24, fontSize: 140, fontWeight: 900, color: 'rgba(255,255,255,0.03)', letterSpacing: '-6px', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{v.num}</div>
                {/* Orange top bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: 48, height: 3, background: ORANGE, borderRadius: '0 0 2px 0' }} />
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: ORANGE, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>{v.num}</div>
                  <h3 style={{ fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 800, color: 'white', letterSpacing: '-0.5px', lineHeight: 1.2, margin: '0 0 16px' }}>{v.title}</h3>
                  <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>{v.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES — same as homepage ── */}
      <Services />

      {/* ── LEADERSHIP — featured doctors ── */}
      <section style={{ background: '#F7F9FC', padding: '112px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>Our Providers</div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: 0 }}>Our Dentists.<br />Every Specialty.</h2>
            </div>
            <a href="/about-us/dentists/" style={{ fontSize: 13, fontWeight: 800, color: ORANGE, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1 }}>Meet All Providers →</a>
          </motion.div>

          {/* Featured 3 — premium credential cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
            <style>{`@media(max-width:960px){ .about-doc-grid{ grid-template-columns:1fr !important; } }`}</style>
            {FEATURED_DOCTORS.map((doc, i) => (
              <motion.div key={i} className="about-doc-grid" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12 }}
                style={{ background: 'linear-gradient(160deg, #001D3D 0%, #0a2a55 100%)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>

                {/* Orange top accent */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${ORANGE} 0%, rgba(243,103,42,0.3) 100%)` }} />

                {/* Header */}
                <div style={{ padding: '36px 32px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {/* Monogram */}
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(243,103,42,0.12)', border: '2px solid rgba(243,103,42,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: ORANGE }}>{doc.initial}</span>
                  </div>
                  <div style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', fontWeight: 800, color: 'white', letterSpacing: '-0.4px', lineHeight: 1.2, marginBottom: 10 }}>{doc.name}</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 12px', background: 'rgba(243,103,42,0.15)', border: '1px solid rgba(243,103,42,0.25)', borderRadius: 999, fontSize: 10, fontWeight: 800, color: ORANGE, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                    {doc.title}
                  </div>
                </div>

                {/* Stats row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ padding: '18px 24px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-1px', lineHeight: 1 }}>{doc.years}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginTop: 4 }}>Years in Practice</div>
                  </div>
                  <div style={{ padding: '18px 24px' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {doc.langs.map((lang, li) => (
                        <span key={li} style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.08)' }}>{lang}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, marginTop: 6 }}>Languages</div>
                  </div>
                </div>

                {/* School */}
                <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12 }}>🎓</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>{doc.school}</div>
                </div>

                {/* Bio */}
                <div style={{ padding: '24px 24px 28px' }}>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 22px' }}>{doc.bio}</p>
                  <a href={`/about-us/dentists/${doc.slug}/`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: ORANGE, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1.2, padding: '8px 16px', background: 'rgba(243,103,42,0.1)', borderRadius: 6, border: '1px solid rgba(243,103,42,0.2)' }}>
                    Full Profile →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All 14 — small cards */}
          <div style={{ background: 'white', borderRadius: 16, padding: '32px', border: '1px solid rgba(0,29,61,0.07)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(0,29,61,0.35)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 24 }}>All Licensed Providers — Boca Dental & Braces Las Vegas</div>
            <div className="about-all-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              <style>{`@media(max-width:860px){ .about-all-g{ grid-template-columns:repeat(3,1fr) !important; } } @media(max-width:560px){ .about-all-g{ grid-template-columns:repeat(2,1fr) !important; } }`}</style>
              {doctors.map((d, i) => {
                const initials = d.name.replace(/^Dr\.\s+/i, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('')
                return (
                  <Link key={d.slug} to={`/about-us/dentists/${d.slug}/`} style={{ display: 'block', background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', color: NAVY }}>
                    {d.photo ? (
                      <div style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}>
                        <img src={d.photo} alt={`${d.name} — Boca Dental & Braces`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                      </div>
                    ) : (
                      <div style={{ aspectRatio: '4 / 5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, background: i % 2 === 0 ? 'linear-gradient(160deg, rgba(243,103,42,0.14), rgba(243,103,42,0.04))' : 'linear-gradient(160deg, rgba(22,46,122,0.12), rgba(0,29,61,0.04))', color: i % 2 === 0 ? ORANGE : NAVY }}>{initials}</div>
                    )}
                    <div style={{ padding: '12px 12px 14px', textAlign: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, lineHeight: 1.25 }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(0,29,61,0.55)', marginTop: 3 }}>{d.title}</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRACTICE MANAGEMENT — office / practice managers ── */}
      <section style={{ background: 'white', padding: '112px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>Practice Management</div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: 0 }}>The Team Behind<br />Every Visit.</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(0,29,61,0.6)', maxWidth: 560, marginTop: 18 }}>Our office and practice managers keep every Boca Dental &amp; Braces location running smoothly — coordinating care, scheduling, and the front-desk experience patients feel from the moment they walk in.</p>
          </motion.div>

          <div className="about-mgr-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            <style>{`@media(max-width:860px){ .about-mgr-g{ grid-template-columns:repeat(3,1fr) !important; } } @media(max-width:560px){ .about-mgr-g{ grid-template-columns:repeat(2,1fr) !important; } }`}</style>
            {INITIAL_DATA.managers.map((m, i) => {
              const initials = m.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('')
              const clinic = INITIAL_DATA.locations.find((l) => l.slug === m.locationSlug)?.label
              return (
                <div key={m.slug} style={{ display: 'block', background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 12, overflow: 'hidden', color: NAVY }}>
                  {m.photo ? (
                    <div style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}>
                      <img src={m.photo} alt={`${m.name} — ${m.title}, Boca Dental & Braces`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ aspectRatio: '4 / 5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, background: i % 2 === 0 ? 'linear-gradient(160deg, rgba(243,103,42,0.14), rgba(243,103,42,0.04))' : 'linear-gradient(160deg, rgba(22,46,122,0.12), rgba(0,29,61,0.04))', color: i % 2 === 0 ? ORANGE : NAVY }}>{initials}</div>
                  )}
                  <div style={{ padding: '12px 12px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: NAVY, lineHeight: 1.25 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(0,29,61,0.55)', marginTop: 3 }}>{m.title}</div>
                    {clinic && <div style={{ fontSize: 11, fontWeight: 700, color: ORANGE, marginTop: 6 }}>{clinic}</div>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section style={{ background: '#001D3D', padding: '112px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '120px 100%', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>9 Las Vegas Locations</div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: 0 }}>Always Close to Home.</h2>
            </div>
            <a href="/clinics/" style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1, whiteSpace: 'nowrap' }}>Interactive Map →</a>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            <style>{`@media(max-width:780px){ .about-loc-g{ grid-template-columns:repeat(2,1fr) !important; } } @media(max-width:500px){ .about-loc-g{ grid-template-columns:1fr !important; } }`}</style>
            {[
              { label: 'Russell & Eastern', sub: 'Original Location', slug: 'russell-eastern' },
              { label: 'Boca Kids Dentistry', sub: 'Pediatric Specialist Clinic', slug: 'boca-kids-dentistry' },
              { label: 'Bonanza & Eastern', sub: 'Downtown Las Vegas', slug: 'bonanza-eastern' },
              { label: 'Sahara & Decatur', sub: 'Central Las Vegas', slug: 'sahara-decatur' },
              { label: 'Charleston & Lamb', sub: 'East Las Vegas', slug: 'charleston-lamb' },
              { label: 'Flamingo & Torrey', sub: 'Spring Valley', slug: 'flamingo-torrey' },
              { label: 'Cheyenne Commons', sub: 'Northwest Las Vegas', slug: 'cheyenne-commons' },
              { label: 'Jones & I-95', sub: 'West Las Vegas', slug: 'jones-i95' },
              { label: 'Beltway Marketplace', sub: 'Southeast · Newest Location', slug: 'beltway-marketplace' },
            ].map((loc, i) => (
              <a key={i} className="about-loc-g" href={`/clinics/${loc.slug}/`} style={{ textDecoration: 'none', padding: '24px 24px', background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'white', marginBottom: 3 }}>{loc.label}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 0.5 }}>{loc.sub}</div>
                </div>
                <span style={{ color: ORANGE, fontSize: 16, opacity: 0.7, flexShrink: 0 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
      {breadcrumbSchema}
    </div>
  )
}

// ─── SVG illustrated city grid for hero ──────────────────────────────────────
function ClinicsHeroMap() {
  const pins = [
    { x: 505, y: 344, kids: false, label: 'Russell & Eastern' },
    { x: 510, y: 355, kids: true,  label: 'Boca Kids' },
    { x: 505, y: 130, kids: false, label: 'Bonanza & Eastern' },
    { x: 254, y: 195, kids: false, label: 'Sahara & Decatur' },
    { x: 204, y: 138, kids: false, label: 'Jones & I-95' },
    { x: 577, y: 168, kids: false, label: 'Charleston & Lamb' },
    { x: 100, y: 248, kids: false, label: 'Flamingo & Torrey' },
    { x: 158, y:  58, kids: false, label: 'Cheyenne Commons' },
    { x: 505, y: 422, kids: false, label: 'Beltway Marketplace' },
  ]

  return (
    <svg
      viewBox="0 0 700 480"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden
    >
      <defs>
        {/* Left-to-right fade so map dissolves into the navy hero copy area */}
        <linearGradient id="mapFadeL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#001D3D" stopOpacity="1" />
          <stop offset="28%"  stopColor="#001D3D" stopOpacity="0" />
        </linearGradient>
        {/* Top fade */}
        <linearGradient id="mapFadeT" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"  stopColor="#001D3D" stopOpacity="0.6" />
          <stop offset="18%" stopColor="#001D3D" stopOpacity="0" />
        </linearGradient>
        {/* Bottom fade */}
        <linearGradient id="mapFadeB" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="75%" stopColor="#001D3D" stopOpacity="0" />
          <stop offset="100%" stopColor="#001D3D" stopOpacity="0.7" />
        </linearGradient>
        <filter id="pinGlow">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="labelShadow">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#001D3D" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* ── MAP BASE — block grid (city blocks) ── */}
      <g opacity="0.22">
        {/* City block fills — lighter squares */}
        {[
          [0,0,104,58],[104,0,57,58],[161,0,53,58],[214,0,40,58],[254,0,126,58],[380,0,125,58],[505,0,72,58],[577,0,123,58],
          [0,58,104,80],[104,58,57,80],[161,58,53,80],[214,58,40,80],[254,58,126,80],[380,58,125,80],[505,58,72,80],[577,58,123,80],
          [0,138,104,57],[104,138,57,57],[161,138,53,57],[214,138,40,57],[254,138,126,57],[380,138,125,57],[505,138,72,57],[577,138,123,57],
        ].map(([x,y,w,h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        ))}
      </g>

      {/* ── MAJOR ROADS — E/W arterials ── */}
      <g opacity="0.55">
        {/* Cheyenne Ave */}
        <line x1="0" y1="58"  x2="700" y2="58"  stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        <text x="8" y="54" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.45)" fontFamily="sans-serif" letterSpacing="0.5">CHEYENNE AVE</text>

        {/* Craig Rd / Bonanza */}
        <line x1="0" y1="130" x2="700" y2="130" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <text x="8" y="126" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.38)" fontFamily="sans-serif" letterSpacing="0.5">BONANZA RD</text>

        {/* Sahara Ave */}
        <line x1="0" y1="195" x2="700" y2="195" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        <text x="8" y="191" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.45)" fontFamily="sans-serif" letterSpacing="0.5">SAHARA AVE</text>

        {/* Charleston */}
        <line x1="0" y1="168" x2="700" y2="168" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        <text x="386" y="164" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.38)" fontFamily="sans-serif" letterSpacing="0.5">CHARLESTON BLVD</text>

        {/* Flamingo */}
        <line x1="0" y1="248" x2="700" y2="248" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        <text x="8" y="244" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.45)" fontFamily="sans-serif" letterSpacing="0.5">FLAMINGO RD</text>

        {/* Russell */}
        <line x1="0" y1="344" x2="700" y2="344" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
        <text x="8" y="340" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.38)" fontFamily="sans-serif" letterSpacing="0.5">RUSSELL RD</text>

        {/* Beltway */}
        <line x1="0" y1="422" x2="700" y2="422" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
        <text x="8" y="418" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.38)" fontFamily="sans-serif" letterSpacing="0.5">BELTWAY / I-215</text>
      </g>

      {/* ── MAJOR ROADS — N/S arterials ── */}
      <g opacity="0.55">
        {/* Torrey Pines */}
        <line x1="100" y1="0" x2="100" y2="480" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />

        {/* Decatur */}
        <line x1="214" y1="0" x2="214" y2="480" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
        <text x="207" y="476" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.38)" fontFamily="sans-serif" letterSpacing="0.5" transform="rotate(-90 214 460)">DECATUR BLVD</text>

        {/* Eastern */}
        <line x1="505" y1="0" x2="505" y2="480" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        <text x="508" y="80" fontSize="8" fontWeight="700" fill="rgba(255,255,255,0.45)" fontFamily="sans-serif" letterSpacing="0.5">EASTERN AVE</text>

        {/* Lamb */}
        <line x1="577" y1="0" x2="577" y2="480" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />

        {/* Rainbow */}
        <line x1="158" y1="0" x2="158" y2="480" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
        <text x="161" y="80" fontSize="7.5" fontWeight="700" fill="rgba(255,255,255,0.35)" fontFamily="sans-serif" letterSpacing="0.5">RAINBOW BLVD</text>
      </g>

      {/* ── HIGHWAY — I-15 diagonal ── */}
      <g opacity="0.5">
        {/* I-15 shield only — no line */}
        <rect x="296" y="88" width="24" height="18" rx="4" fill="rgba(255,255,255,0.15)" />
        <text x="308" y="101" fontSize="9" fontWeight="900" fill="white" textAnchor="middle" fontFamily="sans-serif">I-15</text>
        <rect x="303" y="260" width="24" height="18" rx="4" fill="rgba(255,255,255,0.15)" />
        <text x="315" y="273" fontSize="9" fontWeight="900" fill="white" textAnchor="middle" fontFamily="sans-serif">I-15</text>
      </g>

      {/* ── US-95 shield label only — no path ── */}
      <g opacity="0.5">
        <rect x="142" y="98" width="28" height="18" rx="4" fill="rgba(255,255,255,0.15)" />
        <text x="156" y="111" fontSize="8" fontWeight="900" fill="white" textAnchor="middle" fontFamily="sans-serif">US 95</text>
      </g>

      {/* ── Left-edge gradient fade ── */}
      <rect x="0" y="0" width="700" height="480" fill="url(#mapFadeL)" />

      {/* ── LAS VEGAS watermark text ── */}
      <text
        x="350" y="310"
        fontSize="52"
        fontWeight="900"
        fill="rgba(255,255,255,0.06)"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="4"
        style={{ userSelect: 'none' }}
      >LAS VEGAS</text>

      {/* ── Neighborhood labels ── */}
      <g opacity="0.5" fontSize="8.5" fontFamily="sans-serif" fontWeight="600" fill="rgba(255,255,255,0.5)" letterSpacing="0.8">
        <text x="130" y="30">NORTH LV</text>
        <text x="420" y="30">NE LAS VEGAS</text>
        <text x="50"  y="220">SUMMERLIN</text>
        <text x="230" y="295">THE STRIP</text>
        <text x="420" y="295">HENDERSON</text>
        <text x="50"  y="390">SW LAS VEGAS</text>
      </g>

      {/* ── Location pins ── */}
      {pins.map((p, i) => (
        <g key={i} filter="url(#pinGlow)">
          {/* Pulse ring */}
          <circle cx={p.x} cy={p.y} r="16"
            fill="none"
            stroke={p.kids ? 'rgba(96,165,250,0.35)' : 'rgba(243,103,42,0.35)'}
            strokeWidth="1.5" />
          {/* Pin body */}
          <circle cx={p.x} cy={p.y} r="7"
            fill={p.kids ? '#60a5fa' : '#F3672A'}
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.5" />
          {/* Label */}
          <text
            x={p.x + (p.x > 400 ? -14 : 12)}
            y={p.y + 4}
            fontSize="8"
            fontWeight="800"
            fill="rgba(255,255,255,0.85)"
            fontFamily="sans-serif"
            textAnchor={p.x > 400 ? 'end' : 'start'}
            filter="url(#labelShadow)"
          >{p.label}</text>
        </g>
      ))}

    </svg>
  )
}

// ─── Mapbox multi-pin map for /clinics/ ──────────────────────────────────────
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

const MAPBOX_TOKEN_RAW = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined
const CLINICS_MAP_READY = !!MAPBOX_TOKEN_RAW && MAPBOX_TOKEN_RAW !== 'undefined' && MAPBOX_TOKEN_RAW.startsWith('pk.')
if (CLINICS_MAP_READY && !mapboxgl.accessToken) mapboxgl.accessToken = MAPBOX_TOKEN_RAW!

type ActiveClinic = {
  slug: string; label: string; neighborhood: string; phone: string
  address: string; city: string; state: string; zip: string
  hours: string; rating: number; review_count: number; kids: boolean
}

function ClinicsMap({ onSelect, onDeselect, activeSlug, registerReset }: {
  onSelect: (loc: ActiveClinic) => void
  onDeselect: () => void
  activeSlug: string | null
  registerReset: (fn: () => void) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<Record<string, HTMLDivElement>>({})

  // Inject pin animation styles once
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
        const resetView = () => {
          Object.values(markersRef.current).forEach(m => m.classList.remove('active-pin'))
          map.easeTo({ center: [-115.1900, 36.1300], zoom: 10.2, duration: 500, easing: (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t })
        }
        registerReset(resetView)
        INITIAL_DATA.locations.forEach(loc => {
          const coords = COORDS_BY_LOCATION[loc.slug]
          if (!coords) return

          const pinColor = loc.kids ? '#001D3D' : '#F3672A'

          const el = document.createElement('div')
          el.className = 'boca-pin-wrap'
          el.style.cssText = 'width:44px;height:44px;cursor:pointer;'

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
            e.stopPropagation()
            Object.values(markersRef.current).forEach(m => m.classList.remove('active-pin'))
            el.classList.add('active-pin')
            onSelect({
              slug: loc.slug, label: loc.label, neighborhood: loc.neighborhood,
              phone: loc.phone, address: loc.address, city: loc.city,
              state: loc.state, zip: loc.zip, hours: loc.hours,
              rating: loc.rating, review_count: loc.review_count, kids: loc.kids,
            })
            map.easeTo({ center: [coords[0], coords[1]], zoom: 12.5, duration: 600, easing: (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t })
          })

          new mapboxgl.Marker({ element: el, anchor: 'center' })
            .setLngLat(coords)
            .addTo(map)
        })

        map.on('click', () => {
          resetView()
          onDeselect()
        })
      })

      return () => { map.remove(); mapRef.current = null }
    } catch (err) {
      console.warn('[ClinicsMap] Mapbox failed to initialize:', err)
    }
  }, [])

  // Sync active pin highlight when activeSlug changes externally
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([slug, el]) => {
      if (slug === activeSlug) el.classList.add('active-pin')
      else el.classList.remove('active-pin')
    })
  }, [activeSlug])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 560 }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} />
    </div>
  )
}

// ── Standalone clinic popup — rendered at page root, zero stacking-context issues ──
function ClinicPopup({ clinic, onClose }: { clinic: ActiveClinic | null; onClose: () => void }) {
  const stars = (n: number) => Array.from({ length: 5 }).map((_, i) =>
    `<span style="color:${i < Math.round(n) ? '#F3672A' : 'rgba(0,29,61,0.15)'}">★</span>`
  ).join('')

  return (
    <div style={{
      position: 'fixed',
      top: 112,
      right: 24,
      width: 272,
      maxHeight: 'calc(100vh - 132px)',
      background: 'white',
      borderRadius: 16,
      boxShadow: '0 12px 48px rgba(0,29,61,0.18)',
      zIndex: 9999,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      opacity: clinic ? 1 : 0,
      transform: clinic ? 'translateX(0) scale(1)' : 'translateX(16px) scale(0.97)',
      pointerEvents: clinic ? 'all' : 'none',
      transition: 'opacity 0.22s ease, transform 0.22s cubic-bezier(0.4,0,0.2,1)',
    }}>
      {clinic && (
        <>
          <div style={{ height: 4, background: clinic.kids ? '#001D3D' : '#F3672A', flexShrink: 0 }} />

          <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(0,29,61,0.06)', flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#F3672A', marginBottom: 6 }}>
              {clinic.kids ? '🦷 Kids · ' : ''}{clinic.neighborhood}
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#001D3D', lineHeight: 1.2, letterSpacing: '-0.3px', marginBottom: 8 }}>
              {clinic.label}
            </div>
            {clinic.rating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span dangerouslySetInnerHTML={{ __html: stars(clinic.rating) }} style={{ fontSize: 12 }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#001D3D' }}>{clinic.rating.toFixed(1)}</span>
                <span style={{ fontSize: 11, color: 'rgba(0,29,61,0.4)', fontWeight: 600 }}>({clinic.review_count}+)</span>
              </div>
            )}
          </div>

          <div style={{ padding: '14px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 11, overflowY: 'auto' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 14, lineHeight: 1, marginTop: 1 }}>📍</span>
              <div style={{ fontSize: 13, color: 'rgba(0,29,61,0.7)', lineHeight: 1.4 }}>
                {clinic.address}<br />{clinic.city}, {clinic.state} {clinic.zip}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 14 }}>📞</span>
              <a href={`tel:${clinic.phone.replace(/\D/g,'')}`} style={{ fontSize: 13, color: '#F3672A', fontWeight: 700, textDecoration: 'none' }}>
                {clinic.phone}
              </a>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 14, marginTop: 1 }}>🕐</span>
              <div style={{ fontSize: 12, color: 'rgba(0,29,61,0.55)', lineHeight: 1.5 }}>
                {clinic.hours.split(' · ').map((h: string, i: number) => <div key={i}>{h}</div>)}
              </div>
            </div>
          </div>

          <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
            <a href={`/request-consultation?location=${clinic.slug}`} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#F3672A', color: 'white', borderRadius: 10,
              padding: '12px 16px', fontSize: 13, fontWeight: 800,
              textDecoration: 'none', letterSpacing: 0.3,
            }}>
              Book appointment →
            </a>
            <a href={`/clinics/${clinic.slug}/`} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', color: '#001D3D', borderRadius: 10,
              padding: '10px 16px', fontSize: 12, fontWeight: 700,
              textDecoration: 'none', border: '1.5px solid rgba(0,29,61,0.12)',
            }}>
              View clinic page
            </a>
          </div>

          <button onClick={onClose} style={{
            position: 'absolute', top: 12, right: 12,
            width: 26, height: 26, borderRadius: '50%',
            background: 'rgba(0,29,61,0.07)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, color: 'rgba(0,29,61,0.5)', lineHeight: 1,
          }}>×</button>
        </>
      )}
    </div>
  )
}

export function ClinicsHubPage() {
  const [activeNeighborhood, setActiveNeighborhood] = React.useState<string>('All')
  const [activeClinic, setActiveClinic] = React.useState<ActiveClinic | null>(null)
  const mapResetRef = React.useRef<(() => void) | null>(null)
  const cardRefs = React.useRef<Record<string, HTMLDivElement | null>>({})

  const handleMapSelect = (loc: ActiveClinic) => {
    setActiveClinic(loc)
    setActiveNeighborhood('All')
  }

  const handleClose = () => {
    setActiveClinic(null)
    mapResetRef.current?.()
  }

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

  // Force dark nav glass on this page only
  React.useEffect(() => {
    document.body.classList.add('page-clinics')
    return () => document.body.classList.remove('page-clinics')
  }, [])

  return (
    <div style={{ background: '#fff', color: NAVY, fontFamily: 'inherit' }}>
      <style>{`
        @media (max-width: 768px) {
          .clinics-hero-split { flex-direction: column !important; height: auto !important; min-height: 100vh !important; }
          .clinics-left-panel { width: 100% !important; padding: 28px 20px !important; }
          .clinics-map-panel { height: 50vh !important; }
        }
        body.page-clinics .boca-nav-bg {
          background: rgba(22,46,122,0.95) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          box-shadow: 0 4px 30px rgba(0,0,0,0.30) !important;
          border-bottom: 1px solid rgba(255,255,255,0.08) !important;
        }
      `}</style>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="light" />

      {/* ── Full-viewport hero: navy panel left, real Mapbox map right ── */}
      <section className="clinics-hero-split" style={{ display: 'flex', height: '100vh', paddingTop: 110, overflow: 'hidden', position: 'relative' }}>

        {/* Left: navy copy panel */}
        <div className="clinics-left-panel" style={{
          width: 400,
          flexShrink: 0,
          background: 'linear-gradient(180deg, #162E7A 0%, #001D3D 55%, #001228 100%)',
          // className via parent
          padding: '40px 44px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 2,
          boxShadow: '6px 0 48px rgba(0,0,0,0.32)',
          overflowY: 'auto',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#F3672A', marginBottom: 22, padding: '5px 12px', background: 'rgba(243,103,42,0.12)', borderRadius: 999, width: 'fit-content' }}>
            <MapPin size={10} /> 9 Las Vegas Locations
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 2.6vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: '0 0 18px', lineHeight: 1.05 }}>
            Find your<br /><span style={{ color: '#F3672A' }}>nearest Boca.</span>
          </h1>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: '0 0 28px' }}>
            Nine clinics across greater Las Vegas — general, cosmetic, orthodontics, pediatric, and emergency care. Click any pin on the map.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 20px', marginBottom: 32, paddingBottom: 28, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            {[{ val: '9', label: 'Locations' }, { val: '4.8★', label: 'Avg Rating' }, { val: '20k+', label: 'Patients Served' }, { val: '6', label: 'Days a Week' }].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 5 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <a href="/request-consultation" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#F3672A', color: 'white', borderRadius: 10, padding: '14px 20px', fontSize: 13, fontWeight: 800, textDecoration: 'none', letterSpacing: 0.4, marginBottom: 10, textTransform: 'uppercase' }}>
            Book an Appointment →
          </a>
          <a href="tel:7024560005" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 700, textDecoration: 'none', padding: '8px 0' }}>
            <Phone size={13} color="#F3672A" /> (702) 456-0005
          </a>

          <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', gap: 20, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#F3672A', display: 'inline-block' }} /> General
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'white', border: '2px solid rgba(255,255,255,0.5)', display: 'inline-block' }} /> Kids
            </span>
            <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 10 }}>Click a pin</span>
          </div>
        </div>

        {/* Right: Mapbox map */}
        <div className="clinics-map-panel" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <ClinicsMap
            onSelect={handleMapSelect}
            onDeselect={handleClose}
            activeSlug={activeClinic?.slug ?? null}
            registerReset={(fn) => { mapResetRef.current = fn }}
          />
        </div>
      </section>

      {/* Popup rendered here — at page root, outside any stacking context */}
      <ClinicPopup clinic={activeClinic} onClose={handleClose} />

      {/* ── Filter pills + grid ── */}
      <section style={{ background: '#F7F9FC', padding: '72px 32px 96px', position: 'relative', overflow: 'hidden' }}>

        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section heading */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>Find Your Location</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 38px)', fontWeight: 800, letterSpacing: '-1px', color: NAVY, margin: 0 }}>
                9 Clinics Across Las Vegas
              </h2>
              {/* Filter pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {neighborhoods.map(n => (
                  <button key={n} onClick={() => setActiveNeighborhood(n)} style={{ padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: activeNeighborhood === n ? 'none' : '1.5px solid rgba(0,29,61,0.15)', background: activeNeighborhood === n ? ORANGE : 'white', color: activeNeighborhood === n ? 'white' : NAVY, transition: 'all 0.2s ease', boxShadow: activeNeighborhood === n ? '0 4px 12px rgba(243,103,42,0.3)' : 'none' }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="clinics-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <style>{`
              @media (max-width: 768px){ .clinics-hub-grid{ grid-template-columns: repeat(2,1fr) !important; gap: 12px !important; } }
              @media (max-width: 480px){ .clinics-hub-grid{ grid-template-columns: 1fr !important; } }
              .clinic-card:hover { transform: translateY(-4px) !important; box-shadow: 0 20px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(243,103,42,0.25) !important; }
              .clinic-card { transition: all 0.25s ease !important; }
            `}</style>
            {filtered.map(loc => {
              const isActive = activeClinic?.slug === loc.slug
              const isDimmed = activeClinic !== null && !isActive
              return (
                <div
                  key={loc.slug}
                  ref={el => { cardRefs.current[loc.slug] = el }}
                  className="clinic-card"
                  style={{
                    background: 'white',
                    borderRadius: 14,
                    border: isActive ? `1.5px solid ${ORANGE}` : '1px solid rgba(0,29,61,0.09)',
                    overflow: 'hidden',
                    boxShadow: isActive ? `0 0 0 3px rgba(243,103,42,0.10), 0 8px 20px rgba(0,0,0,0.10)` : '0 1px 8px rgba(0,29,61,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: isDimmed ? 0.35 : 1,
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.25s ease',
                  }}>
                  {/* Subtle top accent */}
                  <div style={{ height: 3, background: loc.kids ? NAVY : ORANGE }} />
                  <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE }}>{loc.neighborhood}{loc.kids ? ' · Kids' : ''}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Star size={10} fill={ORANGE} color={ORANGE} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,29,61,0.5)' }}>{loc.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, letterSpacing: '-0.4px', lineHeight: 1.15 }}>{loc.label}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'rgba(0,29,61,0.6)' }}>
                        <MapPin size={13} color={ORANGE} style={{ flexShrink: 0, marginTop: 1 }} />
                        <span style={{ lineHeight: 1.4 }}>{loc.address}, {loc.city}, {loc.state} {loc.zip}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(0,29,61,0.6)' }}>
                        <Clock size={13} color={ORANGE} />
                        <span>{loc.hours.split(' · ')[0]}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(0,29,61,0.6)' }}>
                        <Phone size={13} color={ORANGE} />
                        <a href={`tel:${loc.phone.replace(/[^0-9]/g, '')}`} style={{ color: 'rgba(0,29,61,0.6)', textDecoration: 'none' }}>{loc.phone}</a>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(0,29,61,0.06)' }}>
                      <Link to={`/request-consultation?location=${loc.slug}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ORANGE, color: 'white', borderRadius: 8, padding: '10px', fontSize: 12, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5, boxShadow: '0 3px 8px rgba(243,103,42,0.25)' }}>
                        Book Here
                      </Link>
                      <Link to={`/clinics/${loc.slug}/`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F9FC', color: NAVY, border: '1px solid rgba(0,29,61,0.1)', borderRadius: 8, padding: '10px', fontSize: 12, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        View Clinic
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Insurance trust bar */}
      <section style={{ background: NAVY, padding: '40px 32px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.5, marginRight: 8 }}>Insurance accepted:</div>
          {['Delta Dental', 'Cigna', 'Guardian', 'MetLife', 'United Concordia', 'Nevada Medicaid'].map(ins => (
            <span key={ins} style={{ fontSize: 13, fontWeight: 700, color: 'white', background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: '6px 14px' }}>{ins}</span>
          ))}
        </div>
      </section>

      <Footer />
      {breadcrumbSchema}
    </div>
  )
}


export function PatientResourcesHubPage() {
  const items = [
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

// New Patient Forms page removed per client (Frankie): forms are texted to the
// patient when they schedule, so the site does not host an intake-forms page.

export function InsurancePage() {
  const PPO_PLANS = ['Delta Dental PPO', 'Cigna PPO', 'Guardian PPO', 'MetLife', 'United Concordia', 'Liberty Dental PPO', 'Careington', 'DenteMax', 'Diversified', 'Primecare Administrators (NDB)', 'Sierra Health (SHL / SHO / HPN)']
  const MEDICAID_PLANS = ['Nevada Medicaid', 'Liberty Dental Medicaid (HMO)']
  const breadcrumbSchema = usePageMeta({
    title: 'Insurance We Accept | Boca Dental & Braces Las Vegas',
    description: 'Boca Dental & Braces accepts many major dental plans including Delta Dental, Cigna, Guardian, MetLife and United Concordia, plus Nevada Medicaid for eligible patients. Coverage varies by plan — we verify your benefits at no cost.',
    url: `${DOMAIN}/patient-resources/insurance/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Patient Resources', url: `${DOMAIN}/patient-resources/` }, { name: 'Insurance' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 02 ] · Insurance"
        h1="Insurance We Accept"
        intro="Boca Dental & Braces accepts many major dental plans across our Las Vegas locations, plus Nevada Medicaid for eligible patients. Coverage and accepted plans can vary by plan and location, so our team verifies your specific benefits before treatment at no cost — no surprises."
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
          <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, color: NAVY, margin: '8px 0 18px', textTransform: 'uppercase' }}>Medicaid We Accept</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {MEDICAID_PLANS.map((p) => (
              <span key={p} style={{ background: '#F7F9FC', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: NAVY }}>{p}</span>
            ))}
          </div>
          <p style={{ fontSize: 14, color: 'rgba(0,29,61,0.6)', lineHeight: 1.7, maxWidth: 760 }}>
            Accepted plans can vary by location. Don't see your plan listed? Call your nearest Boca Dental &amp; Braces office — our team will verify your specific benefits at no cost before any treatment.
          </p>
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

        {/* Google Reviews illustration — right side */}
        <div className="rev-trophy-img" aria-hidden style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '52%', pointerEvents: 'none' }}>
          <svg viewBox="0 0 560 580" xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
              <radialGradient id="gr-fade" cx="0%" cy="50%" r="100%">
                <stop offset="0%" stopColor="#001D3D" stopOpacity="1" />
                <stop offset="45%" stopColor="#001D3D" stopOpacity="0" />
              </radialGradient>
              <filter id="gr-glow">
                <feGaussianBlur stdDeviation="5" result="b" />
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="gr-glow-soft">
                <feGaussianBlur stdDeviation="12" />
              </filter>
            </defs>

            {/* Ambient orange glow behind card */}
            <ellipse cx="310" cy="260" rx="200" ry="160" fill="rgba(243,103,42,0.08)" filter="url(#gr-glow-soft)" />

            {/* ── Main Google Reviews card ── */}
            <g transform="translate(120, 130)">
              {/* Card background */}
              <rect width="330" height="200" rx="18" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
              {/* Orange top accent removed */}

              {/* Google G logo */}
              <g transform="translate(24, 28)">
                {/* G shape using paths */}
                <circle cx="18" cy="18" r="18" fill="rgba(255,255,255,0.06)" />
                <text x="18" y="24" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="Arial, sans-serif" fill="white" fillOpacity="0.9">G</text>
                {/* Color dots under G for Google colors */}
                {[['#4285F4','#EA4335','#FBBC05','#34A853']].map((colors) =>
                  colors.map((c, i) => (
                    <circle key={i} cx={6 + i * 9} cy={40} r="3.5" fill={c} fillOpacity="0.85" />
                  ))
                )}
              </g>

              {/* "Google Reviews" label */}
              <text x="72" y="42" fontSize="15" fontWeight="800" fontFamily="sans-serif" fill="white" fillOpacity="0.95">Google Reviews</text>
              <text x="72" y="58" fontSize="11" fontWeight="600" fontFamily="sans-serif" fill="rgba(255,255,255,0.45)">Boca Dental &amp; Braces · Las Vegas</text>

              {/* Divider */}
              <line x1="24" y1="75" x2="306" y2="75" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* Rating number + stars */}
              <text x="24" y="118" fontSize="52" fontWeight="900" fontFamily="sans-serif" fill="white">4.8</text>
              {/* 5 stars */}
              {[0,1,2,3,4].map(i => {
                const cx = 110 + i * 36
                const cy = 104
                const r = 14
                const pts = Array.from({length:5}, (_,k) => {
                  const a = (k * 144 - 90) * Math.PI / 180
                  const b = (k * 144 - 90 + 72) * Math.PI / 180
                  return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)} ${cx + r*0.42 * Math.cos(b)},${cy + r*0.42 * Math.sin(b)}`
                }).join(' ')
                return <polygon key={i} points={pts} fill={i < 4 ? '#F3672A' : 'none'} stroke="#F3672A" strokeWidth="1.5" fillOpacity={i < 4 ? '1' : '0'} filter={i < 4 ? 'url(#gr-glow)' : undefined} />
              })}

              {/* Review count */}
              <text x="24" y="145" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill="rgba(255,255,255,0.45)">Based on 1,534+ verified reviews</text>

              {/* Mini bar chart */}
              {[[5,'#F3672A',0.9,72],[4,'rgba(243,103,42,0.6)',0.6,48],[3,'rgba(243,103,42,0.3)',0.3,20]].map(([label, color, op, w], i) => (
                <g key={i} transform={`translate(24, ${162 + i * 13})`}>
                  <text x="0" y="9" fontSize="9" fontWeight="700" fontFamily="sans-serif" fill="rgba(255,255,255,0.4)">{label}★</text>
                  <rect x="22" y="1" width={w as number} height="7" rx="3" fill={color as string} fillOpacity={op as number} />
                </g>
              ))}
            </g>

            {/* ── Floating mini review cards ── */}

            {/* Review card — bottom left */}
            <g transform="translate(60, 370)">
              <rect width="210" height="110" rx="14" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
              {/* Avatar circle */}
              <circle cx="24" cy="24" r="14" fill="rgba(243,103,42,0.25)" />
              <text x="24" y="29" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="sans-serif" fill="#F3672A">M</text>
              {/* Name */}
              <text x="44" y="20" fontSize="11" fontWeight="700" fontFamily="sans-serif" fill="rgba(255,255,255,0.9)">Maria G.</text>
              {/* Stars */}
              <text x="44" y="33" fontSize="10" fontFamily="sans-serif" fill="#F3672A">★★★★★</text>
              {/* Divider */}
              <line x1="14" y1="46" x2="196" y2="46" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              {/* Review text lines */}
              <text x="14" y="64" fontSize="9.5" fontFamily="sans-serif" fill="rgba(255,255,255,0.65)">"Best dental experience I've had</text>
              <text x="14" y="79" fontSize="9.5" fontFamily="sans-serif" fill="rgba(255,255,255,0.65)">in Las Vegas. Staff was amazing</text>
              <text x="14" y="94" fontSize="9.5" fontFamily="sans-serif" fill="rgba(255,255,255,0.45)">and they accept my insurance!"</text>
            </g>

            {/* Review card — bottom right */}
            <g transform="translate(305, 400)">
              <rect width="210" height="110" rx="14" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
              {/* Avatar circle */}
              <circle cx="24" cy="24" r="14" fill="rgba(96,165,250,0.2)" />
              <text x="24" y="29" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="sans-serif" fill="#60a5fa">J</text>
              {/* Name */}
              <text x="44" y="20" fontSize="11" fontWeight="700" fontFamily="sans-serif" fill="rgba(255,255,255,0.9)">James T.</text>
              {/* Stars */}
              <text x="44" y="33" fontSize="10" fontFamily="sans-serif" fill="#F3672A">★★★★★</text>
              {/* Divider */}
              <line x1="14" y1="46" x2="196" y2="46" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              {/* Review text lines */}
              <text x="14" y="64" fontSize="9.5" fontFamily="sans-serif" fill="rgba(255,255,255,0.65)">"Got my Invisalign here. Dr. L is</text>
              <text x="14" y="79" fontSize="9.5" fontFamily="sans-serif" fill="rgba(255,255,255,0.65)">incredible — results in 6 months.</text>
              <text x="14" y="94" fontSize="9.5" fontFamily="sans-serif" fill="rgba(255,255,255,0.45)">Highly recommend Boca!"</text>
            </g>

            {/* Accent dots */}
            {[{cx:88,cy:120,r:4},{cx:500,cy:200,r:3},{cx:460,cy:520,r:4},{cx:95,cy:500,r:3}].map((d,i) => (
              <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#F3672A" fillOpacity="0.4" filter="url(#gr-glow)" />
            ))}

            {/* Left edge fade removed */}
          </svg>
        </div>

        {/* Left — copy */}        {/* Left — copy */}
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '200px 32px 140px', position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: 2.5, textTransform: 'uppercase', color: ORANGE, marginBottom: 32, padding: '7px 16px', background: 'rgba(243,103,42,0.12)', borderRadius: 999, border: '1px solid rgba(243,103,42,0.2)' }}>
              <Star size={11} fill={ORANGE} color={ORANGE} /> Verified Google Reviews
            </div>
            <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 58px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: '0 0 4px', lineHeight: 1.0 }}>
              What Las Vegas patients
            </h1>
            <h1 style={{ fontSize: 'clamp(34px, 4.6vw, 58px)', fontWeight: 800, letterSpacing: '-1.5px', color: ORANGE, margin: '0 0 28px', lineHeight: 1.0 }}>
              say about Boca.
            </h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: '0 0 52px' }}>
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
      <div style={{ background: 'white', borderBottom: '2px solid rgba(0,29,61,0.07)', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 4px 20px rgba(0,29,61,0.06)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
          {/* Left fade */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 48, background: 'linear-gradient(to right, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          {/* Right fade */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 48, background: 'linear-gradient(to left, white, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ overflowX: 'auto', display: 'flex', scrollbarWidth: 'none' as const }}>
            <style>{`
              .rev-filter-strip::-webkit-scrollbar { display: none; }
              .rev-tab { position: relative; padding: 18px 20px 16px; font-size: 13px; font-weight: 700;
                white-space: nowrap; cursor: pointer; border: none; background: transparent;
                color: rgba(0,29,61,0.4); transition: color 0.18s; flex-shrink: 0; }
              .rev-tab:hover { color: #001D3D; }
              .rev-tab.active { color: #F3672A; }
              .rev-tab.active::after { content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
                height: 2px; background: #F3672A; border-radius: 2px 2px 0 0; }
            `}</style>
            {[{ slug: 'all', label: 'All Locations' }, ...INITIAL_DATA.locations.map(l => ({ slug: l.slug, label: l.label }))].map(opt => (
              <button
                key={opt.slug}
                className={`rev-tab${activeLocation === opt.slug ? ' active' : ''}`}
                onClick={() => setActiveLocation(opt.slug)}
              >
                {opt.label}
                {opt.slug === 'all' && (
                  <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 800, background: activeLocation === 'all' ? '#F3672A' : 'rgba(0,29,61,0.08)', color: activeLocation === 'all' ? 'white' : 'rgba(0,29,61,0.4)', borderRadius: 999, padding: '2px 6px', transition: 'all 0.18s' }}>9</span>
                )}
              </button>
            ))}
          </div>
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
                  <a href={loc.gbp_id ? `https://www.google.com/maps?cid=${loc.gbp_id}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Boca Dental ${loc.label} Las Vegas`)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: 10, padding: '10px 18px', fontSize: 12, fontWeight: 800, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap', transition: 'background 0.2s' }}>
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
    setMeta('description', 'Boca Dental & Braces — 9 clínicas dentales en Las Vegas con personal bilingüe. Aceptamos Medicaid de Nevada y la mayoría de los seguros PPO. Citas el mismo día disponibles.', 'name')
    setMeta('og:title', 'Dentista en Las Vegas que Habla Español | Boca Dental & Braces', 'property')
    setLink('canonical', 'https://bocadentalandbraces.com/oficina-de-habla-hispana/')
  }, [])
  return (
    <LangProvider lang="es">
      <Homepage />
    </LangProvider>
  )
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
    <Shell logoMode="light">
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                          <div style={{ fontSize: 12, color: 'rgba(0,29,61,0.45)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{loc.address}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}><Star size={10} fill={ORANGE} color={ORANGE} /><span style={{ fontSize: 12, color: 'rgba(0,29,61,0.45)', fontWeight: 600 }}>{loc.rating.toFixed(1)}</span></div>
                        </div>
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
                      {matchedLocation && (
                        <a href={`tel:${matchedLocation.phone.replace(/[^0-9]/g,'')}`} style={{ fontSize: 12, color: ORANGE, fontWeight: 700, marginTop: 4, display: 'inline-block', textDecoration: 'none' }}>
                          📞 {matchedLocation.phone}
                        </a>
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
                <ConsultationForm preselectedLocation={selectedSlug || undefined} embedded />
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
        We're always growing, and we hire across our Las Vegas locations — hygienists, dental
        assistants, treatment coordinators, front-office team members, and dentists. To ask about
        current openings, call your nearest Boca Dental &amp; Braces office or stop in and introduce
        yourself. We offer competitive pay, benefits, and a real path to grow with the practice.
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
        intro="This policy describes how Boca Dental & Braces collects, uses, and protects information submitted through this website."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Privacy Policy' }]}
      />
      <PlaceholderBody>
        Boca Dental &amp; Braces respects your privacy. Information you submit through this website —
        such as your name, contact details, and appointment requests — is used only to respond to you
        and coordinate your care, and is never sold. Our full Privacy Policy, including how we handle
        cookies, analytics, and protected health information, is being finalized. For any privacy
        questions in the meantime, please contact any Boca Dental &amp; Braces location.
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
        As a covered entity under HIPAA, Boca Dental &amp; Braces is committed to protecting your health
        information. You have the right to access your records, request corrections, and understand how
        your information is used and disclosed. Our complete Notice of Privacy Practices is available at
        any of our offices and will be posted here. To request a copy or ask a question, please contact
        your nearest location.
      </PlaceholderBody>
      {breadcrumbSchema}
    </Shell>
  )
}

export { ServicesHubPage }
