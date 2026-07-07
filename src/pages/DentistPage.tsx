import { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Stethoscope,
  Languages,
  MapPin,
  Phone,
  Star,
  Calendar,
  Quote,
} from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { INITIAL_DATA } from '../data/initialData'
import { dentistContentFor } from '../data/dentistContent'
import { useDoctors, useDoctorBySlug, useSiteData } from '../lib/site-data'
import { useLang } from '../lib/lang'
import { tr } from '../lib/es-translate'

const ORANGE = '#F3672A'
const NAVY = '#001D3D'
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace'
const DOMAIN = 'https://bocadentalandbraces.com'

/** First N sentences of a longer bio, for the card/short summary use. */
function firstSentences(bio: string, n = 2): string {
  const parts = bio.match(/[^.!?]+[.!?]+/g)
  return parts ? parts.slice(0, n).join(' ').trim() : bio
}

/**
 * Dentist detail page at /about-us/dentists/[slug]/
 * Emits Person + Physician schema (E-E-A-T critical for healthcare).
 */
export function DentistPage() {
  const { slug } = useParams<{ slug: string }>()
  const siteData = useSiteData()
  const dbDoc = useDoctorBySlug(slug)
  const lang = useLang()

  // Merge admin-editable DB fields (name/title/bio/photo/locations) over the
  // static schema content. Falls back to a sensible default for brand-new
  // doctors added in the admin that have no static entry yet.
  const content = useMemo(() => {
    const base = slug ? dentistContentFor(slug) : undefined
    if (!base && !dbDoc) return undefined
    const dbBio = (dbDoc?.bio ?? '').trim()
    const longBio = dbBio || base?.longBio || base?.shortBio || ''
    return {
      slug: slug!,
      name: dbDoc?.name ?? base?.name ?? '',
      title: dbDoc?.title ?? base?.title ?? 'Dentist',
      medicalSpecialty: base?.medicalSpecialty ?? 'General Dentistry',
      yearsInPractice: base?.yearsInPractice,
      dentalSchool: base?.dentalSchool,
      shortBio: dbBio ? firstSentences(dbBio, 2) : (base?.shortBio ?? ''),
      longBio,
      worksAt: (dbDoc?.locations?.length ? dbDoc.locations : base?.worksAt) ?? [],
      photo: dbDoc?.photo ?? base?.photo,
      familyPhoto: dbDoc?.familyPhoto ?? base?.familyPhoto,
      languages: base?.languages,
    }
  }, [slug, dbDoc])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  useEffect(() => {
    if (!content) return
    const namePart = content.name.replace(/, DDS$/, '')
    document.title = `${namePart} | ${content.medicalSpecialty ?? 'Dentist'} at Boca Dental & Braces Las Vegas`
    setMeta(
      'description',
      `${content.shortBio} Meet ${namePart} at Boca Dental & Braces in Las Vegas.`,
      'name',
    )
    setMeta('og:title', `${namePart} | ${content.medicalSpecialty ?? 'Dentist'} at Boca Dental & Braces Las Vegas`, 'property')
    setMeta('og:description', `${content.shortBio} Meet ${namePart} at Boca Dental & Braces in Las Vegas.`, 'property')
    setMeta('og:type', 'profile', 'property')
    setMeta('og:image', content.photo ?? `${DOMAIN}/boca-logo-color.png`, 'property')
    setLink('canonical', `${DOMAIN}/about-us/dentists/${content.slug}/`)
  }, [content])

  if (!content) return <DentistNotFound slug={slug} />

  const worksAtClinics = content.worksAt
    .map((s) => siteData.locations.find((l) => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => l != null)
  const nameShort = content.name.replace(/, DDS$/, '')
  // Last name without credentials (DDS/DMD/MD/RDH) or "Dr." prefix — e.g. "Minh Nguyen, RDH" → "Nguyen"
  const nameParts = content.name.replace(/,.*$/, '').replace(/^Dr\.\s+/i, '').trim().split(/\s+/)
  const surnamePrefix = /^(st\.?|de|del|della|van|von|la|le|da|di|dos|du|mc|mac)$/i
  const lastName =
    nameParts.length >= 2 && surnamePrefix.test(nameParts[nameParts.length - 2])
      ? nameParts.slice(-2).join(' ')
      : nameParts[nameParts.length - 1]
  // Booking deep-link: pre-select + lock the provider's clinic when known, else let the patient pick
  const bookHref = worksAtClinics[0]
    ? `/request-consultation?location=${worksAtClinics[0].slug}`
    : '/request-consultation'
  const initials = nameShort
    .replace(/^Dr\.\s+/i, '')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  // Spanish: translate the bio via the dictionary, then derive the short intro
  // from the translated text so both the hero summary and full bio are Spanish.
  const longBioEs = tr(content.longBio, lang)
  const shortBioEs = lang === 'es' ? firstSentences(longBioEs, 2) : content.shortBio

  return (
    <div style={{ background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="dark" />

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(180deg, #F7F9FC 0%, white 65%)',
          padding: '160px 32px 64px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, fontFamily: MONO, color: 'rgba(0,29,61,0.55)', marginBottom: 22, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to="/about-us/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>About</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to="/about-us/dentists/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Our Dentists</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: ORANGE, fontWeight: 700 }}>{nameShort}</span>
          </nav>

          <div
            className="dent-hero-grid"
            style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.4fr', gap: 48, alignItems: 'center' }}
          >
            <style>{`@media (max-width: 880px){ .dent-hero-grid{ grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>

            {/* Headshot placeholder */}
            <div
              style={{
                aspectRatio: '4 / 5',
                background:
                  'linear-gradient(160deg, rgba(243,103,42,0.22) 0%, rgba(243,103,42,0.06) 60%, rgba(0,29,61,0.06) 100%)',
                border: '1px solid rgba(243,103,42,0.22)',
                borderRadius: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {content.photo ? (
                <img src={content.photo} alt={`${nameShort} at Boca Dental & Braces Las Vegas`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
              ) : (
                <div style={{ fontFamily: MONO, fontSize: 'clamp(56px, 7vw, 96px)', fontWeight: 800, color: 'rgba(0,29,61,0.85)', letterSpacing: '-2px' }}>
                  {initials}
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>
                {content.medicalSpecialty}
              </div>
              <h1
                style={{
                  fontSize: 'clamp(32px, 4.4vw, 56px)',
                  fontWeight: 800,
                  letterSpacing: '-1.2px',
                  color: NAVY,
                  margin: '0 0 12px',
                  textTransform: 'uppercase',
                }}
              >
                {content.name}
              </h1>
              <div style={{ fontSize: 16, color: 'rgba(0,29,61,0.7)', marginBottom: 24, fontStyle: 'italic' }}>
                {content.title}
              </div>
              <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(0,29,61,0.78)', margin: '0 0 24px', maxWidth: 640 }}>
                {shortBioEs}
              </p>

              {/* Quick facts */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
                {content.dentalSchool && (
                  <Chip icon={<GraduationCap size={12} color={ORANGE} />} text={content.dentalSchool} />
                )}
                {content.medicalSpecialty && (
                  <Chip icon={<Stethoscope size={12} color={ORANGE} />} text={content.medicalSpecialty} />
                )}
                {content.languages && content.languages.length > 0 && (
                  <Chip icon={<Languages size={12} color={ORANGE} />} text={content.languages.join(' · ')} />
                )}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href={bookHref}
                  style={{ background: ORANGE, color: 'white', padding: '12px 24px', borderRadius: 8, fontSize: 13, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.6, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                >
                  Book with {lastName}
                  <ArrowUpRight size={14} />
                </a>
                {worksAtClinics[0] && (
                  <Link
                    to={`/clinics/${worksAtClinics[0].slug}/`}
                    style={{ background: 'transparent', color: NAVY, border: '2px solid rgba(0,29,61,0.22)', padding: '10px 22px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                  >
                    Visit {worksAtClinics[0].label} →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Long bio */}
      {content.longBio && (
        <section style={{ background: 'white', padding: '64px 32px' }}>
          <div style={{ maxWidth: 880, margin: '0 auto' }}>
            <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>
              [ 02 ] · About {nameShort}
            </div>
            <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, letterSpacing: '-0.4px', color: NAVY, margin: '0 0 20px', textTransform: 'uppercase' }}>
              Training &amp; Experience
            </h2>
            {content.familyPhoto ? (
              <div className="dent-about-flow">
                <style>{`
                  .dent-about-flow::after { content: ''; display: block; clear: both; }
                  .dent-about-flow p { font-size: 17px; line-height: 1.8; color: rgba(0,29,61,0.78); margin: 0 0 18px; }
                  .dent-about-flow p:last-of-type { margin-bottom: 0; }
                  .dent-about-flow p:first-of-type::first-letter { float: left; font-size: 56px; line-height: 0.8; font-weight: 800; color: ${ORANGE}; margin: 7px 12px 0 0; }
                  .dent-about-photo { float: right; width: 38%; max-width: 340px; margin: 10px 0 34px 72px; }
                  @media (max-width: 720px){
                    .dent-about-photo { float: none; width: 100%; max-width: 460px; margin: 0 auto 26px; }
                    .dent-about-flow p:first-of-type::first-letter { font-size: 46px; }
                  }
                `}</style>
                <figure className="dent-about-photo" style={{ margin: 0 }}>
                  <div
                    style={{
                      borderTop: `3px solid ${ORANGE}`,
                      borderRadius: 16,
                      overflow: 'hidden',
                      border: '1px solid rgba(0,29,61,0.06)',
                      boxShadow: '0 30px 60px -34px rgba(0,29,61,0.45)',
                    }}
                  >
                    <img
                      src={content.familyPhoto}
                      alt={`${nameShort} with family`}
                      loading="lazy"
                      style={{ width: '100%', display: 'block' }}
                    />
                  </div>
                  <figcaption style={{ marginTop: 14 }}>
                    <div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 800, letterSpacing: 1.6, textTransform: 'uppercase', color: ORANGE, marginBottom: 4 }}>
                      Outside the office
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(0,29,61,0.6)', lineHeight: 1.5 }}>
                      {nameShort} and family.
                    </div>
                  </figcaption>
                </figure>
                {longBioEs.split(/\n{2,}/).map((para, i) => {
                  const t = para.trim()
                  return t ? <p key={i}>{t}</p> : null
                })}
              </div>
            ) : (
              <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(0,29,61,0.78)' }}>
                {longBioEs}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Practices at */}
      {worksAtClinics.length > 0 && (
        <section style={{ background: '#F7F9FC', padding: '72px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>
              [ 03 ] · Practice locations
            </div>
            <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, letterSpacing: '-0.4px', color: NAVY, margin: '0 0 24px', textTransform: 'uppercase' }}>
              {nameShort} Practices At
            </h2>
            <div
              className="dent-loc-grid"
              style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(worksAtClinics.length, 3)}, 1fr)`, gap: 16 }}
            >
              <style>{`
                @media (max-width: 880px){ .dent-loc-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 560px){ .dent-loc-grid{ grid-template-columns: 1fr !important; } }
              `}</style>
              {worksAtClinics.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/clinics/${loc.slug}/`}
                  style={{ background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderTop: `2px solid ${ORANGE}`, borderRadius: 12, padding: '20px 22px', textDecoration: 'none', color: NAVY }}
                >
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE, fontFamily: MONO, marginBottom: 8 }}>
                    {loc.neighborhood}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: NAVY, marginBottom: 8 }}>{loc.label}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,29,61,0.6)', lineHeight: 1.5, marginBottom: 12 }}>
                    {loc.address}<br />{loc.city}, {loc.state} {loc.zip}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(0,29,61,0.06)', paddingTop: 10 }}>
                    <span style={{ fontSize: 12, color: NAVY, fontWeight: 700 }}>{loc.phone}</span>
                    <span style={{ fontSize: 11, color: ORANGE, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: MONO }}>Visit clinic →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA — contained card on white so it doesn't merge into the navy footer */}
      <section style={{ background: 'white', padding: '24px 24px 72px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', background: 'linear-gradient(160deg, #002a57 0%, #001D3D 70%)', borderRadius: 22, padding: '56px 32px', textAlign: 'center', color: 'white', boxShadow: '0 24px 60px -28px rgba(0,29,61,0.45)', borderTop: `4px solid ${ORANGE}` }}>
          <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, margin: '0 0 14px', textTransform: 'uppercase', letterSpacing: '-0.4px', color: 'white' }}>
            Book your first appointment with {nameShort}
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '0 0 22px', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            New patients always welcome at Boca Dental &amp; Braces. Free consultations, most insurance accepted, evening and weekend hours.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={bookHref} style={{ background: ORANGE, color: 'white', padding: '14px 26px', borderRadius: 8, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, textDecoration: 'none' }}>Book online</a>
            <a href={`tel:${INITIAL_DATA.brand.phone.replace(/\D/g, '')}`} style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.35)', padding: '12px 24px', borderRadius: 8, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Phone size={14} color={ORANGE} /> Call us
            </a>
          </div>
        </div>
      </section>

      <DentistSchema content={content} worksAtClinics={worksAtClinics} />
      <Footer />
    </div>
  )
}

function Chip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: 'rgba(0,29,61,0.04)',
        border: '1px solid rgba(0,29,61,0.1)',
        borderRadius: 999,
        padding: '6px 12px',
        fontSize: 12,
        fontWeight: 600,
        color: 'rgba(0,29,61,0.78)',
      }}
    >
      {icon}
      {text}
    </span>
  )
}

function DentistSchema({
  content,
  worksAtClinics,
}: {
  content: ReturnType<typeof dentistContentFor> & object
  worksAtClinics: Array<{ slug: string; label: string }>
}) {
  if (!content) return null
  const url = `${DOMAIN}/about-us/dentists/${content.slug}/`
  const graph = [
    {
      '@type': ['Person', 'Physician'],
      '@id': `${url}#person`,
      name: content.name,
      jobTitle: content.title,
      url,
      ...(content.photo ? { image: content.photo } : {}),
      ...(content.medicalSpecialty ? { medicalSpecialty: content.medicalSpecialty } : {}),
      ...(content.dentalSchool ? { alumniOf: { '@type': 'EducationalOrganization', name: content.dentalSchool } } : {}),
      ...(content.languages ? { knowsLanguage: content.languages } : {}),
      worksFor: { '@id': `${DOMAIN}/#practice` },
      ...(worksAtClinics.length > 0
        ? { workLocation: worksAtClinics.map((l) => ({ '@id': `${DOMAIN}/clinics/${l.slug}/#localbusiness` })) }
        : {}),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${DOMAIN}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${DOMAIN}/about-us/` },
        { '@type': 'ListItem', position: 3, name: 'Our Dentists', item: `${DOMAIN}/about-us/dentists/` },
        { '@type': 'ListItem', position: 4, name: content.name, item: url },
      ],
    },
  ]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
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

function DentistNotFound({ slug }: { slug?: string }) {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>404 · Dentist not found</div>
      <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>We couldn't find that dentist profile.</h1>
      <p style={{ fontSize: 15, opacity: 0.7, marginBottom: 24 }}>"{slug}" doesn't match any dentist in our directory.</p>
      <Link to="/about-us/dentists/" style={{ background: ORANGE, color: 'white', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.6 }}>
        See all dentists
      </Link>
    </div>
  )
}

export default DentistPage

// ─────────────────────────────────────────────────────────────────────────────
// Hub page at /about-us/dentists/
// ─────────────────────────────────────────────────────────────────────────────
export function DentistsHubPage() {
  // Roster comes from the DB (admin-editable) via siteData, static fallback.
  const doctors = useDoctors()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    document.title = 'Meet Our Dentists | Boca Dental & Braces Las Vegas'
    setMeta('description', 'Meet the licensed dentists and specialists at Boca Dental & Braces across our Las Vegas locations — orthodontists, oral surgeons, and general dentists.', 'name')
    setLink('canonical', `${DOMAIN}/about-us/dentists/`)
  }, [])

  return (
    <div style={{ background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="dark" />

      <section style={{ background: 'linear-gradient(180deg, #F7F9FC 0%, white 65%)', padding: '160px 32px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, fontFamily: MONO, color: 'rgba(0,29,61,0.55)', marginBottom: 22 }}>
            <Link to="/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Home</Link>
            <span style={{ opacity: 0.4, margin: '0 8px' }}>/</span>
            <Link to="/about-us/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>About</Link>
            <span style={{ opacity: 0.4, margin: '0 8px' }}>/</span>
            <span style={{ color: ORANGE, fontWeight: 700 }}>Our Dentists</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', fontWeight: 800, letterSpacing: '-1.2px', color: NAVY, margin: '0 0 18px', textTransform: 'uppercase' }}>
            Meet the Boca Dental &amp; Braces Team
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(0,29,61,0.78)', maxWidth: 820 }}>
            Licensed dentists and specialists serving our Las Vegas locations — general dentists,
            an orthodontist, an oral and maxillofacial surgeon, and
            pediatric specialists, all under one practice.
          </p>
        </div>
      </section>

      <section style={{ background: 'white', padding: '32px 32px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            className="dent-hub-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
          >
            <style>{`
              @media (max-width: 980px){ .dent-hub-grid{ grid-template-columns: repeat(3, 1fr) !important; } }
              @media (max-width: 720px){ .dent-hub-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 460px){ .dent-hub-grid{ grid-template-columns: 1fr !important; } }
            `}</style>
            {doctors.map((d) => {
              const c = dentistContentFor(d.slug)
              const photo = d.photo ?? c?.photo
              const initials = d.name.replace(/^Dr\.\s+/i, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('')
              return (
                <Link key={d.slug} to={`/about-us/dentists/${d.slug}/`} style={{ background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 12, padding: '18px 18px 20px', textDecoration: 'none', color: NAVY }}>
                  {photo ? (
                    <div style={{ aspectRatio: '4 / 5', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(0,29,61,0.08)', marginBottom: 14 }}>
                      <img src={photo} alt={`${d.name} — Boca Dental & Braces`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ aspectRatio: '4 / 5', borderRadius: 10, background: 'linear-gradient(160deg, rgba(243,103,42,0.16) 0%, rgba(243,103,42,0.04) 60%, rgba(0,29,61,0.04) 100%)', border: '1px solid rgba(243,103,42,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14, fontFamily: MONO, fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, color: 'rgba(0,29,61,0.85)' }}>
                      {initials}
                    </div>
                  )}
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE, fontFamily: MONO, marginBottom: 6 }}>{c?.medicalSpecialty ?? 'Dentist'}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: NAVY, letterSpacing: '-0.2px', marginBottom: 4 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(0,29,61,0.6)' }}>{d.title}</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
