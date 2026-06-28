import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Phone,
  Eye,
  Sparkles,
  Smile,
  Target,
  CircleCheck,
  Calendar,
  Languages,
  MapPin,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { INITIAL_DATA } from '../data/initialData'
import {
  findCategory,
  findServicePage,
  servicePagesInCategory,
  SERVICE_PAGES,
} from '../data/serviceCatalog'
import { serviceContentFor, type ServiceContent } from '../data/serviceContent'
import { useServicePages } from '../lib/site-data'

const ORANGE = '#F3672A'
const NAVY = '#001D3D'
const NAVY_2 = '#162E7A'
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace'

// Map of icon-name strings to lucide components (used in benefit cards)
const ICON_MAP: Record<string, LucideIcon> = {
  Eye, Sparkles, Smile, Target, CircleCheck, Calendar,
}

const DOMAIN = 'https://bocadentalandbraces.com'
const LV_LOCATIONS = INITIAL_DATA.locations.filter((l) => l.city === 'Las Vegas')

// ─────────────────────────────────────────────────────────────────────────────
// Top-level page component — routed at /:category/:service/
// ─────────────────────────────────────────────────────────────────────────────
export function ServicePage({ categorySlugProp }: { categorySlugProp?: string } = {}) {
  const params = useParams<{ category?: string; service: string }>()
  const category = categorySlugProp ?? params.category
  const service = params.service
  const categoryEntry = category ? findCategory(category) : undefined
  const pageEntry = category && service ? findServicePage(category, service) : undefined
  // DB content (admin-editable) is the source of truth; static serviceContent is the fallback.
  const { content: dbServiceContent } = useServicePages()
  const content = service ? (dbServiceContent[service] ?? serviceContentFor(service)) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [category, service])

  // Per-page meta updater
  useEffect(() => {
    if (!pageEntry) return
    const titleTag = content?.titleTag ?? `${pageEntry.label} in Las Vegas, NV | Boca Dental & Braces`
    const desc = content?.metaDesc ?? `${pageEntry.desc} ${pageEntry.label} at Boca Dental & Braces — 9 convenient locations across Las Vegas. Book a free consultation.`
    const url = `${DOMAIN}/${category}/${service}/`
    const prevTitle = document.title
    document.title = titleTag
    setMetaTag('description', desc, 'name')
    setMetaTag('og:title', titleTag, 'property')
    setMetaTag('og:description', desc, 'property')
    setMetaTag('og:url', url, 'property')
    setMetaTag('og:type', 'article', 'property')
    setMetaTag('og:image', `${DOMAIN}/boca-logo-color.png`, 'property')
    setLink('canonical', url)
    return () => { document.title = prevTitle }
  }, [pageEntry, content, category, service])

  if (!categoryEntry || !pageEntry) {
    return <ServiceNotFound category={category} service={service} />
  }

  return (
    <div style={{ background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="light" />

      <Hero category={categoryEntry} page={pageEntry} content={content} />
      <TrustBar />
      <WhatIsSection page={pageEntry} content={content} />
      <SignsCandidacySection page={pageEntry} content={content} />
      <ProcessSection page={pageEntry} content={content} />
      <BenefitsSection page={pageEntry} content={content} />
      <WhyBocaSection page={pageEntry} content={content} />
      <ReviewsSection page={pageEntry} content={content} />
      <FAQSection page={pageEntry} content={content} />
      <CostInsuranceSection page={pageEntry} content={content} />
      <RelatedServicesSection category={categoryEntry} page={pageEntry} content={content} />
      <FindLocationSection page={pageEntry} content={content} />
      <BookingSection page={pageEntry} />
      <ClosingCTAStrip page={pageEntry} />

      <ServiceSchema category={categoryEntry} page={pageEntry} content={content} />

      <Footer />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Meta helpers
// ─────────────────────────────────────────────────────────────────────────────
function setMetaTag(name: string, content: string, attr: 'name' | 'property') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
  el.setAttribute('href', href)
}

// ─────────────────────────────────────────────────────────────────────────────
// 1 · Hero
// ─────────────────────────────────────────────────────────────────────────────
function Hero({
  category,
  page,
  content,
}: {
  category: { slug: string; label: string }
  page: { slug: string; label: string; desc: string }
  content?: ServiceContent
}) {
  const h1 = content?.h1 ?? `${page.label} in Las Vegas`
  const intro = content?.heroIntro ?? `Boca Dental & Braces offers ${page.label.toLowerCase()} at all 9 of its Las Vegas dental clinics. ${page.desc}`

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)',
        padding: '160px 32px 96px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(243,103,42,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Breadcrumb category={category} page={page} />

        <style>{`
          @media (max-width: 768px) { .srv-hero-ctas { flex-direction: column !important; align-items: stretch !important; }
            .srv-hero-ctas > a { width: 100% !important; justify-content: center !important; } }
        `}</style>

        {/* Category pill */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 20, marginTop: 28, padding: '6px 14px', background: 'rgba(243,103,42,0.12)', borderRadius: 999, border: '1px solid rgba(243,103,42,0.2)' }}>
          {category.label}
        </div>

        <h1
          style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-2px',
            color: 'white',
            margin: '0 0 12px',
            textTransform: 'uppercase',
            maxWidth: 900,
          }}
        >
          {h1.split('—')[0].trim()}
        </h1>
        {h1.includes('—') && (
          <h2 style={{ fontSize: 'clamp(20px, 3vw, 36px)', fontWeight: 700, color: ORANGE, margin: '0 0 28px', letterSpacing: '-0.5px', textTransform: 'uppercase' }}>
            {h1.split('—')[1]?.trim()}
          </h2>
        )}

        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.65)', margin: '0 0 40px', maxWidth: 580 }}>
          {intro}
        </p>

        <div className="srv-hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
          <Link
            to="/request-consultation"
            onClick={(e) => { e.preventDefault(); document.getElementById('request-consultation')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: ORANGE, color: 'white', borderRadius: 8,
              padding: '14px 28px', fontSize: 14, fontWeight: 800,
              textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.6,
              boxShadow: '0 12px 28px rgba(243,103,42,0.35)',
            }}
          >
            Book a free consultation <ArrowRight size={14} />
          </Link>
          <a
            href={`tel:${INITIAL_DATA.brand.phone.replace(/\D/g, '')}`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.08)', color: 'white',
              border: '1.5px solid rgba(255,255,255,0.18)', borderRadius: 8,
              padding: '13px 24px', fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}
          >
            <Phone size={14} color={ORANGE} />
            {INITIAL_DATA.brand.phone}
          </a>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { val: '9', label: 'LV Locations' },
            { val: '4.8★', label: 'Avg Rating' },
            { val: '20k+', label: 'Patients Served' },
            { val: 'Same Day', label: 'Appointments' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Breadcrumb({
  category,
  page,
}: {
  category: { slug: string; label: string }
  page: { label: string }
}) {
  return (
    <nav
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'rgba(0,29,61,0.55)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
        fontFamily: MONO,
      }}
      aria-label="Breadcrumb"
    >
      <Link to="/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Home</Link>
      <span style={{ opacity: 0.4 }}>/</span>
      <Link to="/services/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Services</Link>
      <span style={{ opacity: 0.4 }}>/</span>
      <Link to={`/${category.slug}/`} style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>
        {category.label}
      </Link>
      <span style={{ opacity: 0.4 }}>/</span>
      <span style={{ color: ORANGE, fontWeight: 700 }}>{page.label}</span>
    </nav>
  )
}

function TrustBar() {
  const items = [
    '9 Las Vegas Locations',
    'Accepting New Patients',
    'Most Insurance Accepted',
    'Evening & Weekend Hours',
  ]
  return (
    <section
      style={{
        background: 'white',
        borderTop: '1px solid rgba(0,29,61,0.06)',
        borderBottom: '1px solid rgba(0,29,61,0.06)',
        padding: '18px 32px',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 28,
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: NAVY,
          flexWrap: 'wrap',
        }}
      >
        {items.map((t) => (
          <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Check size={13} color={ORANGE} strokeWidth={3} />
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2 · What Is [Service]
// ─────────────────────────────────────────────────────────────────────────────
function WhatIsSection({ page, content }: { page: { label: string }; content?: ServiceContent }) {
  const header = content?.whatIsHeader ?? `What Is ${page.label}?`
  const body = content?.whatIsBody ?? [
    `${page.label} is a service offered by Boca Dental & Braces at all 9 of our Las Vegas clinics. Full clinical content for this page is pending — see the launch checklist for what content is required.`,
  ]
  const facts = content?.keyFacts ?? []

  return (
    <section style={{ background: '#F7F9FC', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Eyebrow num="02" label="Informational anchor" />
        <h2
          style={{
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.8px',
            color: NAVY,
            margin: '0 0 28px',
            textTransform: 'uppercase',
          }}
        >
          {header}
        </h2>
        {body.map((p, i) => (
          <p
            key={i}
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: 'rgba(0,29,61,0.78)',
              margin: '0 0 18px',
              maxWidth: 880,
            }}
          >
            {p}
          </p>
        ))}

        {/* Key facts callout */}
        {facts.length > 0 && (
          <div
            className="srv-facts-grid"
            style={{
              marginTop: 36,
              display: 'grid',
              gridTemplateColumns: `repeat(${facts.length}, 1fr)`,
              gap: 16,
            }}
          >
            <style>{`
              @media (max-width: 720px) {
                .srv-facts-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            {facts.map((f, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  border: '1px solid rgba(0,29,61,0.08)',
                  borderTop: `2px solid ${ORANGE}`,
                  borderRadius: 10,
                  padding: '22px 24px',
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(30px, 3.4vw, 44px)',
                    fontWeight: 800,
                    letterSpacing: '-1px',
                    color: NAVY,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {f.value}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(0,29,61,0.65)', lineHeight: 1.4 }}>
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 3 · Signs + Candidacy
// ─────────────────────────────────────────────────────────────────────────────
function SignsCandidacySection({ page, content }: { page: { label: string }; content?: ServiceContent }) {
  if (!content) {
    return (
      <PlaceholderSection num="03" label={`Is ${page.label} right for you?`}>
        Wondering if {page.label.toLowerCase()} is right for you? The best way to find out is a quick exam with a
        Boca dentist, who will review your goals, answer your questions, and recommend a personalized plan —
        with no pressure.
      </PlaceholderSection>
    )
  }
  return (
    <section style={{ background: 'white', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Eyebrow num="03" label="Signs + candidacy" />
        <h2
          style={{
            fontSize: 'clamp(26px, 3vw, 40px)',
            fontWeight: 800,
            letterSpacing: '-0.6px',
            color: NAVY,
            margin: '0 0 28px',
            textTransform: 'uppercase',
            maxWidth: 720,
          }}
        >
          Is {page.label} right for you? Signs, symptoms &amp; candidacy.
        </h2>
        <div className="srv-signs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <style>{`@media (max-width: 880px){ .srv-signs-grid{ grid-template-columns: 1fr !important; } }`}</style>
          <ListColumn title={content.signsLabel} items={content.signs} accent={ORANGE} />
          <ListColumn title={content.candidacyLabel} items={content.candidacy} accent={NAVY_2} />
        </div>
        {content.candidacyCaveat && (
          <div
            style={{
              marginTop: 28,
              padding: '16px 22px',
              background: 'rgba(91,63,184,0.06)',
              border: '1px solid rgba(91,63,184,0.18)',
              borderRadius: 8,
              fontSize: 14,
              fontStyle: 'italic',
              color: 'rgba(0,29,61,0.7)',
              lineHeight: 1.6,
            }}
          >
            {content.candidacyCaveat}
          </div>
        )}
        <div
          style={{
            marginTop: 28,
            fontSize: 15,
            color: 'rgba(0,29,61,0.75)',
            lineHeight: 1.6,
          }}
        >
          Not sure if {page.label.toLowerCase()} is right for you?{' '}
          <a href="/request-consultation" style={{ color: ORANGE, fontWeight: 800, textDecoration: 'none' }}>
            Schedule a free consultation
          </a>{' '}
          at any of our 9 Las Vegas locations.
        </div>
      </div>
    </section>
  )
}

function ListColumn({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: 0.5 }}>{title}</h3>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 12,
              fontSize: 15,
              lineHeight: 1.55,
              color: 'rgba(0,29,61,0.78)',
            }}
          >
            <Check size={18} color={accent} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 4 · Process (HowTo schema)
// ─────────────────────────────────────────────────────────────────────────────
function ProcessSection({ page, content }: { page: { label: string }; content?: ServiceContent }) {
  if (!content) {
    return (
      <PlaceholderSection num="04" label="Step-by-step process">
        Every {page.label.toLowerCase()} visit starts with a thorough exam so your dentist can tailor each step to
        you. We'll walk you through exactly what to expect, keep you comfortable throughout, and check in at
        every stage of treatment.
      </PlaceholderSection>
    )
  }
  return (
    <section style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 100%)', padding: '96px 32px', color: 'white' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <Eyebrow num="04" label="Step-by-step" dark />
        <h2
          style={{
            fontSize: 'clamp(28px, 3.4vw, 46px)',
            fontWeight: 800,
            letterSpacing: '-0.8px',
            color: 'white',
            margin: '0 0 18px',
            textTransform: 'uppercase',
            maxWidth: 780,
          }}
        >
          {content.processHeader}
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', margin: '0 0 36px', maxWidth: 700 }}>
          {content.processIntro}
        </p>

        <div
          className="srv-process-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 36 }}
        >
          <style>{`
            @media (max-width: 920px){ .srv-process-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px){ .srv-process-grid{ grid-template-columns: 1fr !important; } }
          `}</style>
          {content.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderTop: `2px solid ${ORANGE}`,
                borderRadius: 8,
                padding: '20px 22px',
              }}
            >
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, color: ORANGE, marginBottom: 12 }}>
                [ {s.number} ]
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: 'white', margin: '0 0 10px', letterSpacing: '-0.2px' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: 1.55 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          className="srv-process-callouts"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
        >
          <style>{`@media (max-width: 720px){ .srv-process-callouts{ grid-template-columns: 1fr !important; } }`}</style>
          <Callout label="Duration / Timeline" body={content.duration} dark />
          <Callout label="Technology at Boca" body={content.technology} dark />
        </div>
      </div>
    </section>
  )
}

function Callout({ label, body, dark = false }: { label: string; body: string; dark?: boolean }) {
  return (
    <div
      style={{
        background: dark ? 'rgba(243,103,42,0.08)' : 'rgba(243,103,42,0.06)',
        border: '1px solid rgba(243,103,42,0.28)',
        borderRadius: 10,
        padding: '18px 22px',
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: ORANGE,
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontSize: 14,
          color: dark ? 'rgba(255,255,255,0.82)' : 'rgba(0,29,61,0.78)',
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {body}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 5 · Benefits
// ─────────────────────────────────────────────────────────────────────────────
function BenefitsSection({ page, content }: { page: { label: string }; content?: ServiceContent }) {
  if (!content) {
    return (
      <PlaceholderSection num="05" label={`Benefits of ${page.label}`}>
        {page.label} can improve both how your smile looks and how it functions — restoring comfort, confidence,
        and long-term oral health. Your Boca dentist will explain the benefits specific to your situation at
        your visit.
      </PlaceholderSection>
    )
  }
  return (
    <section style={{ background: 'white', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Eyebrow num="05" label="Value proposition" />
        <h2
          style={{
            fontSize: 'clamp(26px, 3vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-0.6px',
            color: NAVY,
            margin: '0 0 36px',
            textTransform: 'uppercase',
            maxWidth: 820,
          }}
        >
          {content.benefitsHeader}
        </h2>

        <div
          className="srv-benefits-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
        >
          <style>{`
            @media (max-width: 880px){ .srv-benefits-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px){ .srv-benefits-grid{ grid-template-columns: 1fr !important; } }
          `}</style>
          {content.benefits.map((b, i) => {
            const Icon = ICON_MAP[b.icon] ?? Check
            return (
              <div
                key={i}
                style={{
                  background: 'white',
                  border: '1px solid rgba(0,29,61,0.08)',
                  borderRadius: 12,
                  padding: '24px 24px 22px',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'rgba(243,103,42,0.10)',
                    border: '1px solid rgba(243,103,42,0.22)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  <Icon size={18} color={ORANGE} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 8px', letterSpacing: '-0.2px' }}>
                  {b.label}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(0,29,61,0.7)', margin: 0, lineHeight: 1.55 }}>
                  {b.body}
                </p>
              </div>
            )
          })}
        </div>

        {/* Comparison table */}
        {content.comparison && (
          <div style={{ marginTop: 56 }}>
            <h3
              style={{
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 800,
                color: NAVY,
                margin: '0 0 18px',
                textTransform: 'uppercase',
                letterSpacing: '-0.4px',
              }}
            >
              {content.comparison.thisLabel} vs. {content.comparison.altLabel}
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: 580, borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: NAVY, color: 'white' }}>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, fontSize: 12 }}>Factor</th>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, fontSize: 12 }}>{content.comparison.thisLabel}</th>
                    <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{content.comparison.altLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {content.comparison.rows.map((r, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#F7F9FC' : 'white' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: NAVY, borderBottom: '1px solid rgba(0,29,61,0.08)' }}>{r.factor}</td>
                      <td style={{ padding: '12px 14px', color: NAVY, borderBottom: '1px solid rgba(0,29,61,0.08)' }}>{r.thisValue}</td>
                      <td style={{ padding: '12px 14px', color: 'rgba(0,29,61,0.65)', borderBottom: '1px solid rgba(0,29,61,0.08)' }}>{r.altValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6 · Why Boca
// ─────────────────────────────────────────────────────────────────────────────
function WhyBocaSection({ page, content }: { page: { label: string }; content?: ServiceContent }) {
  if (!content) {
    return (
      <PlaceholderSection num="06" label="Why Boca Dental & Braces">
        Patients across Las Vegas choose Boca Dental & Braces for {page.label.toLowerCase()} because we make quality
        care convenient and welcoming — neighborhood locations, same-day emergency availability, bilingual
        teams, and most major insurance plus Nevada Medicaid accepted.
      </PlaceholderSection>
    )
  }
  const providerDoc = content.providerInline.providerSlug
    ? INITIAL_DATA.doctors.find((d) => d.slug === content.providerInline.providerSlug)
    : undefined
  return (
    <section style={{ background: '#F7F9FC', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Eyebrow num="06" label="Trust, brand & providers" />
        <h2
          style={{
            fontSize: 'clamp(26px, 3vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-0.6px',
            color: NAVY,
            margin: '0 0 32px',
            textTransform: 'uppercase',
            maxWidth: 820,
          }}
        >
          Why Las Vegas Patients Choose Boca Dental &amp; Braces for {page.label}
        </h2>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 12, maxWidth: 780 }}>
          {content.differentiators.map((d, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, fontSize: 15, lineHeight: 1.55, color: 'rgba(0,29,61,0.78)' }}>
              <Check size={18} color={ORANGE} strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{d}</span>
            </li>
          ))}
        </ul>

        {/* Provider credentials inline */}
        <div
          style={{
            marginTop: 32,
            padding: '20px 24px',
            background: 'white',
            border: '1px solid rgba(0,29,61,0.08)',
            borderLeft: `3px solid ${ORANGE}`,
            borderRadius: 8,
            fontSize: 15,
            color: 'rgba(0,29,61,0.8)',
            lineHeight: 1.7,
          }}
        >
          {content.providerInline.sentence}
          {providerDoc && (
            <>
              {' '}
              <Link
                to={`/about-us/dentists/${providerDoc.slug}/`}
                style={{ color: ORANGE, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                Meet {providerDoc.name.replace(/^Dr\. /, 'Dr. ').split(',')[0]} →
              </Link>
            </>
          )}
        </div>

        {/* 9-location convenience statement */}
        <div
          style={{
            marginTop: 22,
            fontSize: 14,
            color: 'rgba(0,29,61,0.65)',
            lineHeight: 1.7,
            background: 'rgba(243,103,42,0.06)',
            border: '1px solid rgba(243,103,42,0.18)',
            borderRadius: 8,
            padding: '14px 20px',
          }}
        >
          <strong style={{ color: NAVY }}>9 locations across Las Vegas:</strong>{' '}
          {content.nineLocationStatement}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 7 · Reviews (service-specific)
// ─────────────────────────────────────────────────────────────────────────────
function ReviewsSection({ page, content }: { page: { label: string }; content?: ServiceContent }) {
  void page
  void content
  // Reviews intentionally omitted — no fabricated content. No placeholder reviewers and no
  // hardcoded aggregate rating are emitted. Wire real service-specific Google reviews from the
  // reviews table here when they are available.
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// 8 · FAQs
// ─────────────────────────────────────────────────────────────────────────────
function FAQSection({ page, content }: { page: { label: string }; content?: ServiceContent }) {
  const faqs = content?.faqs ?? [
    { question: `Does insurance cover ${page.label.toLowerCase()}?`, answer: 'Many dental plans cover at least a portion. Our team verifies your specific benefits at no cost before treatment, so you always know what to expect.' },
    { question: `How long does ${page.label.toLowerCase()} take?`, answer: 'It depends on your individual case. After a quick exam, your Boca dentist walks you through a personalized treatment plan and timeline.' },
    { question: `Is ${page.label.toLowerCase()} painful?`, answer: 'We prioritize your comfort at every step, using modern techniques and gentle care. Let your dentist know about any anxiety and we will tailor your visit around it.' },
    { question: 'Do you offer same-day or emergency visits?', answer: 'Yes — every Boca Dental & Braces location keeps same-day emergency slots open. Call your nearest office and we will get you seen quickly.' },
    { question: 'How do I book at Boca Dental & Braces?', answer: 'Book online or call any of our Las Vegas locations. Most offices offer same-day and next-day appointments for new patients.' },
  ]
  return (
    <section style={{ background: '#F7F9FC', padding: '96px 32px' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <Eyebrow num="08" label="FAQs · GEO anchor" />
        <h2
          style={{
            fontSize: 'clamp(26px, 3vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-0.6px',
            color: NAVY,
            margin: '0 0 28px',
            textTransform: 'uppercase',
          }}
        >
          Frequently Asked Questions About {page.label} in Las Vegas
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {faqs.map((f, i) => (
            <FAQItem key={i} faq={f} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ faq }: { faq: { question: string; answer: string } }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid rgba(0,29,61,0.08)',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '18px 22px',
          background: 'transparent',
          border: 'none',
          fontSize: 16,
          fontWeight: 700,
          color: NAVY,
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: 'inherit',
          letterSpacing: '-0.1px',
        }}
        aria-expanded={open}
      >
        <span>{faq.question}</span>
        <ChevronDown
          size={18}
          color={ORANGE}
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease', flexShrink: 0, marginLeft: 12 }}
        />
      </button>
      {open && (
        <div
          style={{
            padding: '0 22px 18px',
            fontSize: 14,
            color: 'rgba(0,29,61,0.75)',
            lineHeight: 1.65,
          }}
        >
          {faq.answer}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 9 · Cost & Insurance
// ─────────────────────────────────────────────────────────────────────────────
function CostInsuranceSection({ page, content }: { page: { label: string }; content?: ServiceContent }) {
  const header = content?.costHeader ?? `Making ${page.label} Affordable`
  const inlineCTA = content?.inlineCTA ?? `Book a free consultation at any of our Las Vegas locations and we'll build your personalized ${page.label.toLowerCase()} treatment plan.`
  return (
    <section style={{ background: 'white', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Eyebrow num="09" label="Barrier removal" />
        <h2
          style={{
            fontSize: 'clamp(26px, 3vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-0.6px',
            color: NAVY,
            margin: '0 0 24px',
            textTransform: 'uppercase',
          }}
        >
          {header}
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(0,29,61,0.78)', margin: '0 0 28px', maxWidth: 820 }}>
          At Boca Dental &amp; Braces, cost should never stand between you and the care you need. We accept Nevada Medicaid and many major dental plans, verify your benefits at no charge, and offer flexible financing — so you can move forward with confidence.
        </p>

        <h3 style={{ fontSize: 17, fontWeight: 800, color: NAVY, margin: '32px 0 14px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Insurance, Financing &amp; Payment Options
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr', gap: 12, fontSize: 14, color: 'rgba(0,29,61,0.78)', lineHeight: 1.6, maxWidth: 880 }}>
          <PaymentRow label="Insurance" body="Boca Dental & Braces accepts most major PPO dental insurance plans. Our team performs a complimentary benefits verification before treatment begins so you know your exact out-of-pocket cost." />
          <PaymentRow label="CareCredit financing" body="We offer CareCredit financing, which lets you spread the cost over 6, 12, 18, or 24 months. Apply in minutes at our front desk or online. Subject to credit approval." />
          <PaymentRow label="In-house payment plans" body="We also offer in-house payment plans to help make treatment affordable regardless of your insurance situation. Ask our team about monthly payment options at your free consultation." />
          <PaymentRow label="FSA / HSA" body="Flexible Spending Accounts (FSA) and Health Savings Accounts (HSA) can be used to pay for treatment, reducing your taxable out-of-pocket cost." />
        </div>

        <div
          style={{
            marginTop: 32,
            padding: '18px 22px',
            background: 'rgba(0,29,61,0.04)',
            borderRadius: 8,
            borderLeft: `3px solid ${ORANGE}`,
            fontSize: 15,
            color: 'rgba(0,29,61,0.78)',
            lineHeight: 1.6,
          }}
        >
          {inlineCTA}
        </div>
      </div>
    </section>
  )
}

function PaymentRow({ label, body }: { label: string; body: string }) {
  return (
    <>
      <div style={{ fontWeight: 800, color: NAVY, fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.6 }}>
        {label}
      </div>
      <div>{body}</div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 10 · Related services
// ─────────────────────────────────────────────────────────────────────────────
function RelatedServicesSection({
  category,
  page,
  content,
}: {
  category: { slug: string; label: string }
  page: { slug: string; label: string }
  content?: ServiceContent
}) {
  const relatedSlugs =
    content?.relatedSlugs ??
    servicePagesInCategory(category.slug)
      .filter((s) => s.slug !== page.slug)
      .slice(0, 4)
      .map((s) => s.slug)
  const related = relatedSlugs
    .map((slug) => SERVICE_PAGES.find((s) => s.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p != null)
    .slice(0, 4)

  return (
    <section style={{ background: '#F7F9FC', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Eyebrow num="10" label="Internal linking" />
        <h2
          style={{
            fontSize: 'clamp(24px, 2.8vw, 36px)',
            fontWeight: 800,
            letterSpacing: '-0.6px',
            color: NAVY,
            margin: '0 0 28px',
            textTransform: 'uppercase',
          }}
        >
          Other Services You May Be Interested In
        </h2>
        <div
          className="srv-related-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${related.length || 1}, 1fr)`,
            gap: 16,
          }}
        >
          <style>{`
            @media (max-width: 880px){ .srv-related-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px){ .srv-related-grid{ grid-template-columns: 1fr !important; } }
          `}</style>
          {related.map((r) => (
            <Link
              key={r.slug}
              to={`/${r.categorySlug}/${r.slug}/`}
              style={{
                background: 'white',
                border: '1px solid rgba(0,29,61,0.08)',
                borderRadius: 12,
                padding: '22px 24px',
                textDecoration: 'none',
                color: NAVY,
                display: 'block',
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 8px', letterSpacing: '-0.2px' }}>
                {r.label}
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(0,29,61,0.65)', margin: '0 0 14px', lineHeight: 1.5 }}>
                {r.desc}
              </p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  color: ORANGE,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  fontFamily: MONO,
                }}
              >
                View service
                <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 22, fontSize: 13, color: 'rgba(0,29,61,0.6)' }}>
          <Link
            to={`/${category.slug}/`}
            style={{
              color: ORANGE,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: MONO,
              fontSize: 12,
            }}
          >
            View all {category.label} services →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 11 · Find a location near you
// ─────────────────────────────────────────────────────────────────────────────
function FindLocationSection({
  page,
  content,
}: {
  page: { label: string }
  content?: ServiceContent
}) {
  const intersections = LV_LOCATIONS.map((l) => l.label).join(', ').replace(/, ([^,]*)$/, ', and $1')
  const geoPara =
    content?.geoParagraph ??
    `Boca Dental & Braces offers ${page.label.toLowerCase()} at all 9 of its Las Vegas dental clinics, including locations near ${intersections}.`
  return (
    <section style={{ background: 'white', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Eyebrow num="11" label="Local close · GEO anchor" />
        <h2
          style={{
            fontSize: 'clamp(24px, 2.8vw, 38px)',
            fontWeight: 800,
            letterSpacing: '-0.6px',
            color: NAVY,
            margin: '0 0 12px',
            textTransform: 'uppercase',
          }}
        >
          Find {page.label} Near You — 9 Boca Dental &amp; Braces Locations Across Las Vegas
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: 'rgba(0,29,61,0.75)',
            margin: '0 0 28px',
            maxWidth: 920,
          }}
        >
          {geoPara}
        </p>

        <div
          className="srv-loc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 880px){ .srv-loc-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 520px){ .srv-loc-grid{ grid-template-columns: 1fr !important; } }
          `}</style>
          {LV_LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              to={`/clinics/${loc.slug}/`}
              style={{
                background: 'white',
                border: '1px solid rgba(0,29,61,0.08)',
                borderTop: `2px solid ${ORANGE}`,
                borderRadius: 10,
                padding: '18px 20px',
                textDecoration: 'none',
                color: NAVY,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE, fontFamily: MONO, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={11} color={ORANGE} />
                {loc.neighborhood}
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, letterSpacing: '-0.2px' }}>{loc.label}</div>
              <div style={{ fontSize: 12, color: 'rgba(0,29,61,0.6)', lineHeight: 1.4 }}>
                {loc.address}
                <br />
                {loc.city}, {loc.state} {loc.zip}
              </div>
              <div style={{ marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: NAVY, fontWeight: 700 }}>{loc.phone}</span>
                <span style={{ fontSize: 11, color: ORANGE, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', fontFamily: MONO }}>
                  Book here →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Booking section — CTA button linking to booking page
// ─────────────────────────────────────────────────────────────────────────────
function BookingSection({ page }: { page: { label: string } }) {
  return (
    <section
      id="request-consultation"
      style={{ background: '#F7F9FC', padding: '96px 32px' }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#F3672A', marginBottom: 16, padding: '6px 14px', background: 'rgba(243,103,42,0.08)', borderRadius: 999, border: '1px solid rgba(243,103,42,0.2)' }}>
          Free consultation
        </div>
        <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 800, letterSpacing: '-0.8px', color: '#001D3D', margin: '0 0 12px', textTransform: 'uppercase' }}>
          Book Your {page.label} Appointment
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(0,29,61,0.6)', lineHeight: 1.65, maxWidth: 480, margin: '0 auto 36px' }}>
          Choose your nearest Boca location and we'll confirm within one business hour. Same-day and next-day appointments available.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/request-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F3672A', color: 'white', borderRadius: 8, padding: '16px 32px', fontSize: 15, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.4, boxShadow: '0 8px 18px rgba(243,103,42,0.32)' }}>
            Book an Appointment →
          </a>
          <a href="tel:7024560005" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: '#001D3D', border: '1.5px solid rgba(0,29,61,0.12)', borderRadius: 8, padding: '16px 28px', fontSize: 15, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.3 }}>
            (702) 456-0005
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page-closing CTA strip
// ─────────────────────────────────────────────────────────────────────────────
function ClosingCTAStrip({ page }: { page: { label: string } }) {
  return (
    <section style={{ background: NAVY, color: 'white', padding: '56px 32px' }}>
      <div
        style={{
          maxWidth: 980,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(22px, 2.4vw, 32px)',
            fontWeight: 800,
            margin: 0,
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '-0.4px',
          }}
        >
          Ready to get started with {page.label}? Book your appointment online or call your nearest Boca Dental &amp; Braces location today.
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href="/request-consultation"
            style={{
              background: ORANGE,
              color: 'white',
              padding: '14px 26px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              textDecoration: 'none',
            }}
          >
            Book online
          </a>
          <a
            href={`tel:${INITIAL_DATA.brand.phone.replace(/\D/g, '')}`}
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.35)',
              padding: '12px 24px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Phone size={14} color={ORANGE} />
            Call us now
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD schema injector
// ─────────────────────────────────────────────────────────────────────────────
function ServiceSchema({
  category,
  page,
  content,
}: {
  category: { slug: string; label: string }
  page: { slug: string; label: string; desc: string }
  content?: ServiceContent
}) {
  const url = `${DOMAIN}/${category.slug}/${page.slug}/`
  const graph: object[] = [
    {
      '@type': 'MedicalProcedure',
      '@id': `${url}#procedure`,
      name: page.label,
      description: content?.heroIntro ?? page.desc,
      url,
      provider: { '@id': `${DOMAIN}/#practice` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${DOMAIN}/services/` },
        { '@type': 'ListItem', position: 3, name: category.label, item: `${DOMAIN}/${category.slug}/` },
        { '@type': 'ListItem', position: 4, name: page.label, item: url },
      ],
    },
  ]
  if (content?.faqs && content.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: content.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }
  if (content?.steps && content.steps.length > 0) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: content.processHeader,
      step: content.steps.map((s) => ({
        '@type': 'HowToStep',
        position: parseInt(s.number, 10),
        name: s.title,
        text: s.body,
      })),
    })
  }

  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Placeholder / 404
// ─────────────────────────────────────────────────────────────────────────────
function PlaceholderSection({ num, label, children }: { num: string; label: string; children: React.ReactNode }) {
  return (
    <section style={{ background: '#F7F9FC', padding: '72px 32px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <Eyebrow num={num} label={label} />
        <div
          style={{
            background: 'white',
            border: '1px dashed rgba(0,29,61,0.18)',
            borderRadius: 10,
            padding: '22px 26px',
            fontSize: 14,
            color: 'rgba(0,29,61,0.6)',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

function Eyebrow({ num, label, dark = false }: { num: string; label: string; dark?: boolean }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: ORANGE,
        marginBottom: 16,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 12px',
        background: dark ? 'rgba(243,103,42,0.15)' : 'rgba(243,103,42,0.08)',
        borderRadius: 999,
        border: '1px solid rgba(243,103,42,0.2)',
      }}
    >
      {label}
    </div>
  )
}

function ServiceNotFound({ category, service }: { category?: string; service?: string }) {
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
        background: 'white',
        color: NAVY,
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: ORANGE,
          marginBottom: 12,
        }}
      >
        404 · Service not found
      </div>
      <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1px', margin: '0 0 16px' }}>
        We couldn't find that service.
      </h1>
      <p style={{ fontSize: 16, opacity: 0.7, marginBottom: 24, maxWidth: 540 }}>
        The URL /{category}/{service}/ doesn't match any service in our catalog. Browse the full
        list, or head home.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link
          to="/services/"
          style={{ background: ORANGE, color: 'white', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.6 }}
        >
          See all services
        </Link>
        <Link
          to="/"
          style={{ background: 'transparent', color: NAVY, border: '2px solid rgba(0,29,61,0.22)', padding: '10px 22px', borderRadius: 8, fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.6 }}
        >
          Back home
        </Link>
      </div>
    </div>
  )
}

export default ServicePage
