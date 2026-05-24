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

import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, MapPin, Phone, Clock, Star, Mail, Briefcase, FileText, ShieldCheck, CreditCard, MessageCircle, Globe } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { ConsultationForm } from '../components/ConsultationForm/ConsultationForm'
import { INITIAL_DATA } from '../data/initialData'
import { SERVICE_CATEGORIES, SERVICE_PAGES } from '../data/serviceCatalog'

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

export function ClinicsHubPage() {
  const breadcrumbSchema = usePageMeta({
    title: '9 Boca Dental & Braces Locations Across Las Vegas',
    description: 'Find Boca Dental & Braces near you — 9 dental clinics across Las Vegas including Bonanza & Eastern, Russell & Eastern, Sahara & Decatur, Charleston & Lamb, Flamingo & Torrey Pines, Cheyenne Commons, Jones & I-95, Beltway Marketplace, and Boca Kids Dentistry.',
    url: `${DOMAIN}/clinics/`,
    breadcrumb: [
      { name: 'Home', url: `${DOMAIN}/` },
      { name: 'Find a Location' },
    ],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 01 ] · Find a location"
        h1="9 Boca Dental & Braces Locations Across Las Vegas"
        intro="Boca Dental & Braces operates 9 dental clinics across Las Vegas, Nevada, including locations near Bonanza & Eastern, Russell & Eastern, Sahara & Decatur, Charleston & Lamb, Flamingo & Torrey Pines, Cheyenne Commons, Beltway Marketplace, Jones & I-95, and our dedicated kids clinic, Boca Kids Dentistry. Every location offers general and preventive dental care, with specialist services including orthodontics, oral surgery, pediatric dentistry, and sedation dentistry available at select clinics."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Find a Location' }]}
      />
      <section style={{ background: 'white', padding: '32px 32px 96px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="clinics-hub-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <style>{`
              @media (max-width: 880px){ .clinics-hub-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 520px){ .clinics-hub-grid{ grid-template-columns: 1fr !important; } }
            `}</style>
            {INITIAL_DATA.locations.map((loc) => (
              <Link key={loc.slug} to={`/clinics/${loc.slug}/`} style={{ background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderTop: `2px solid ${ORANGE}`, borderRadius: 12, padding: '20px 22px', textDecoration: 'none', color: NAVY }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE, fontFamily: MONO, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <MapPin size={11} color={ORANGE} /> {loc.neighborhood}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, letterSpacing: '-0.3px', marginBottom: 8 }}>{loc.label}</div>
                <div style={{ fontSize: 13, color: 'rgba(0,29,61,0.6)', lineHeight: 1.5, marginBottom: 12 }}>{loc.address}<br />{loc.city}, {loc.state} {loc.zip}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid rgba(0,29,61,0.06)' }}>
                  <span style={{ fontSize: 13, color: NAVY, fontWeight: 700 }}>{loc.phone}</span>
                  <span style={{ fontSize: 11, color: ORANGE, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: MONO }}>View clinic →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {breadcrumbSchema}
    </Shell>
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
  const breadcrumbSchema = usePageMeta({
    title: 'Patient Reviews | Boca Dental & Braces Las Vegas',
    description: 'Read 1,200+ verified Google reviews about Boca Dental & Braces across our 9 Las Vegas locations.',
    url: `${DOMAIN}/patient-resources/reviews/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Patient Resources', url: `${DOMAIN}/patient-resources/` }, { name: 'Reviews' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 02 ] · Reviews"
        h1="What Las Vegas Patients Say About Boca Dental & Braces"
        intro="★ 4.9 out of 5 across 1,200+ verified Google reviews at our 9 Las Vegas locations. Browse reviews by location or read the latest below."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Patient Resources', href: '/patient-resources/' }, { name: 'Reviews' }]}
      />
      <PlaceholderBody>
        <strong>[content needed]</strong> — Live Google reviews feed (or curated 12–16 review cards) sorted
        by location. Will include filter by clinic, filter by service category, and direct link to the GBP
        for each location.
      </PlaceholderBody>
      <CTAStrip />
      {breadcrumbSchema}
    </Shell>
  )
}

export function SpanishLandingPage() {
  const breadcrumbSchema = usePageMeta({
    title: 'Dentista en Las Vegas que Habla Español | Boca Dental & Braces',
    description: 'Boca Dental & Braces — clínicas dentales en Las Vegas con personal que habla español. 9 ubicaciones, aceptamos Medicaid de Nevada y la mayoría de los seguros.',
    url: `${DOMAIN}/oficina-de-habla-hispana/`,
    breadcrumb: [{ name: 'Home', url: `${DOMAIN}/` }, { name: 'Oficina de Habla Hispana' }],
  })
  return (
    <Shell>
      <HeroBlock
        eyebrow="[ 01 ] · En español"
        h1="Dentista en Las Vegas que Habla Español"
        intro="Boca Dental & Braces es una práctica dental con 9 ubicaciones en todo Las Vegas. Personal bilingüe (inglés/español) en cada oficina. Aceptamos Medicaid de Nevada y la mayoría de los planes PPO. Citas el mismo día disponibles para emergencias dentales."
        breadcrumb={[{ name: 'Home', href: '/' }, { name: 'Oficina de Habla Hispana' }]}
      />
      <section style={{ background: 'white', padding: '32px 32px 80px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, color: NAVY, margin: '0 0 16px', textTransform: 'uppercase' }}>¿Por Qué Boca Dental?</h2>
          <ul style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(0,29,61,0.78)', paddingLeft: 22, marginBottom: 28 }}>
            <li>9 oficinas en Las Vegas — cerca de su trabajo, su hogar o la escuela de sus hijos</li>
            <li>Personal bilingüe (inglés y español) en cada ubicación</li>
            <li>Aceptamos Medicaid de Nevada y CHIP para niños</li>
            <li>Aceptamos los principales planes de seguro PPO (Delta, Aetna, Cigna, MetLife, y más)</li>
            <li>Financiamiento flexible — CareCredit y planes de pago internos</li>
            <li>Horarios nocturnos y de fin de semana en la mayoría de las oficinas</li>
            <li>Citas de emergencia el mismo día — para dolor de muelas, dientes rotos, y trauma dental</li>
          </ul>
          <PlaceholderBody>
            <strong>[content needed]</strong> — Full Spanish-language content team to write the complete page
            including testimonials, neighborhood mentions in Spanish, and Spanish-speaking provider highlights.
            Currently scaffolded with key trust signals.
          </PlaceholderBody>
        </div>
      </section>
      <CTAStrip headline="¿Listo para reservar? Su nuevo dentista de Las Vegas le está esperando." />
      {breadcrumbSchema}
    </Shell>
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
