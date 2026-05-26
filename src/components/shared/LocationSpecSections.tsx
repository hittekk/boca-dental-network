// ─────────────────────────────────────────────────────────────────────────────
// LocationSpecSections.tsx
// Shared sections that complete the Treysyde Location Page spec (sections 2,
// 5-availability, 6, 8). Each is theme-aware so V1 (Modern Clinic / white),
// V2 (Warm Editorial / cream), and V3 (Super Modern / dark) all reuse them.
//
// Wired into each variant from LocationPageV1/V2/V3.tsx.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Star, Languages, Car, Quote, ShieldCheck, CreditCard, PiggyBank, ArrowRight, BadgeCheck, Siren } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Location, Service } from '../../types'
import {
  hoursDetailFor,
  languagesFor,
  parkingFor,
  servicesUnavailableFor,
  reviewsFor,
} from '../../data/locationDetails'
import { INITIAL_DATA } from '../../data/initialData'

const ORANGE = '#F3672A'
const NAVY = '#001D3D'
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace'
const NAVY_GRADIENT = 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)'

export type LocationTheme = 'light' | 'cream' | 'dark'

interface PaletteShape {
  bg: string
  bg2: string
  text: string
  textMuted: string
  textFaint: string
  cardBg: string
  cardBorder: string
  divider: string
  serif: boolean
  mono: string
}

function paletteFor(theme: LocationTheme): PaletteShape {
  if (theme === 'dark')
    return {
      bg: '#0A0A0F',
      bg2: 'rgba(255,255,255,0.02)',
      text: 'white',
      textMuted: 'rgba(255,255,255,0.7)',
      textFaint: 'rgba(255,255,255,0.45)',
      cardBg:
        'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
      cardBorder: 'rgba(255,255,255,0.1)',
      divider: 'rgba(255,255,255,0.08)',
      serif: false,
      mono: MONO,
    }
  if (theme === 'cream')
    return {
      bg: '#FFF4ED',
      bg2: '#FFFAF6',
      text: '#001D3D',
      textMuted: 'rgba(0,29,61,0.7)',
      textFaint: 'rgba(0,29,61,0.45)',
      cardBg: 'white',
      cardBorder: 'rgba(0,29,61,0.08)',
      divider: 'rgba(0,29,61,0.1)',
      serif: true,
      mono: MONO,
    }
  return {
    bg: '#F7F9FC',
    bg2: '#FFFFFF',
    text: NAVY,
    textMuted: 'rgba(0,29,61,0.7)',
    textFaint: 'rgba(0,29,61,0.5)',
    cardBg: 'white',
    cardBorder: 'rgba(0,29,61,0.08)',
    divider: 'rgba(0,29,61,0.1)',
    serif: false,
    mono: MONO,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Eyebrow + H2 helper
// ─────────────────────────────────────────────────────────────────────────────
function SectionHead({
  eyebrow,
  title,
  intro,
  palette,
}: {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
  palette: PaletteShape
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 36, maxWidth: 760 }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: ORANGE,
          marginBottom: 14,
          fontFamily: MONO,
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          fontSize: 'clamp(26px, 3vw, 40px)',
          fontWeight: 800,
          letterSpacing: '-0.6px',
          color: palette.text,
          margin: 0,
          lineHeight: 1.1,
          textTransform: 'none',
        }}
      >
        {title}
      </h2>
      {intro && (
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: palette.textMuted,
            marginTop: 14,
            maxWidth: 680,
          }}
        >
          {intro}
        </p>
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Clinic Information (NAP + day-by-day hours + languages + parking)
// ─────────────────────────────────────────────────────────────────────────────

export function ClinicInfoSection({
  location,
  theme = 'light',
  officeNo,
}: {
  location: Location
  theme?: LocationTheme
  officeNo: string
}) {
  const palette = paletteFor(theme)
  const hours = hoursDetailFor(location.slug)
  const languages = languagesFor(location.slug)
  const parking = parkingFor(location.slug)

  return (
    <section
      style={{
        background: palette.bg,
        padding: '88px 32px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHead
          eyebrow={`[ 02 ] · Clinic information`}
          title={
            <>
              Visit us at{' '}
              <span style={{ color: ORANGE, fontStyle: palette.serif ? 'italic' : 'normal' }}>
                {location.label}
              </span>
              .
            </>
          }
          intro="Address, phone, hours, languages, and parking — verified against our Google Business Profile."
          palette={palette}
        />

        <div
          className="clinic-info-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}
        >
          <style>{`
            @media (max-width: 880px) {
              .clinic-info-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* NAP card */}
          <div
            style={{
              background: palette.cardBg,
              border: `1px solid ${palette.cardBorder}`,
              borderTop: `2px solid ${ORANGE}`,
              borderRadius: 12,
              padding: '24px 28px',
            }}
          >
            <NAPRow
              icon={MapPin}
              label="Address"
              palette={palette}
              primary={location.address}
              secondary={`${location.city}, ${location.state} ${location.zip}`}
            />
            <NAPRow
              icon={Phone}
              label="Phone"
              palette={palette}
              primary={location.phone}
              secondary={
                <a
                  href={`tel:${location.phone.replace(/\D/g, '')}`}
                  style={{ color: ORANGE, fontWeight: 700, textDecoration: 'none' }}
                >
                  Tap to call →
                </a>
              }
            />
            <NAPRow
              icon={Star}
              label="Patient rating"
              palette={palette}
              primary={
                location.review_count > 0
                  ? `${location.rating.toFixed(1)} · ${location.review_count}+ reviews`
                  : 'Now booking — new patients welcome'
              }
              secondary="From verified Google reviews"
            />
            <NAPRow
              icon={Siren}
              label="Emergency appointments"
              palette={palette}
              primary="Same-day emergencies welcome"
              secondary="Toothache, broken tooth, lost crown — call ahead and we'll work you in"
              last
            />
          </div>

          {/* Hours table */}
          <div
            style={{
              background: palette.cardBg,
              border: `1px solid ${palette.cardBorder}`,
              borderTop: `2px solid ${ORANGE}`,
              borderRadius: 12,
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'rgba(243,103,42,0.12)',
                  border: '1px solid rgba(243,103,42,0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={14} color={ORANGE} />
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: palette.textFaint,
                  fontFamily: MONO,
                }}
              >
                Hours · Office No. {officeNo}
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${palette.divider}` }}>
              {hours.map((h, i) => (
                <div
                  key={h.day}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr auto',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 0',
                    // No borderBottom on the last row — the Languages/Parking
                    // footer below provides its own borderTop, and two
                    // parallel rules with a gap looks like a "double line".
                    borderBottom:
                      i === hours.length - 1
                        ? 'none'
                        : `1px solid ${palette.divider}`,
                    fontSize: 14,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      color: palette.text,
                      letterSpacing: 0.2,
                    }}
                  >
                    {h.day}
                  </span>
                  <span style={{ color: h.closed ? palette.textFaint : palette.textMuted }}>
                    {h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                  </span>
                  {h.note && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: ORANGE,
                        textTransform: 'uppercase',
                        letterSpacing: 1.2,
                        fontFamily: MONO,
                      }}
                    >
                      {h.note}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Languages + parking footer */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 14,
                marginTop: 16,
                paddingTop: 16,
                borderTop: `1px solid ${palette.divider}`,
              }}
            >
              <FootMeta
                icon={Languages}
                label="Languages"
                value={languages.join(', ')}
                palette={palette}
              />
              <FootMeta
                icon={Car}
                label="Parking"
                value={parking}
                palette={palette}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function NAPRow({
  icon: Icon,
  label,
  palette,
  primary,
  secondary,
  last,
}: {
  icon: LucideIcon
  label: string
  palette: PaletteShape
  primary: React.ReactNode
  secondary?: React.ReactNode
  last?: boolean
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        paddingBottom: last ? 0 : 18,
        marginBottom: last ? 0 : 18,
        borderBottom: last ? 'none' : `1px solid ${palette.divider}`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          flexShrink: 0,
          borderRadius: 8,
          background: 'rgba(243,103,42,0.12)',
          border: '1px solid rgba(243,103,42,0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={15} color={ORANGE} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: palette.textFaint,
            marginBottom: 4,
            fontFamily: MONO,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: palette.text,
            letterSpacing: '-0.2px',
            lineHeight: 1.3,
            marginBottom: secondary ? 4 : 0,
          }}
        >
          {primary}
        </div>
        {secondary && (
          <div style={{ fontSize: 13, color: palette.textMuted }}>{secondary}</div>
        )}
      </div>
    </div>
  )
}

function FootMeta({
  icon: Icon,
  label,
  value,
  palette,
}: {
  icon: LucideIcon
  label: string
  value: string
  palette: PaletteShape
}) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: palette.textFaint,
          marginBottom: 6,
          fontFamily: MONO,
        }}
      >
        <Icon size={11} color={ORANGE} />
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: palette.text,
          lineHeight: 1.4,
        }}
      >
        {value}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 5 — Service availability note (rendered inline below the services grid)
// ─────────────────────────────────────────────────────────────────────────────

export function ServiceAvailabilityNote({
  location,
  theme = 'light',
}: {
  location: Location
  theme?: LocationTheme
}) {
  const palette = paletteFor(theme)
  const unavailable = servicesUnavailableFor(location.slug)
  if (unavailable.length === 0) {
    return (
      <div
        style={{
          marginTop: 28,
          padding: '14px 20px',
          background:
            theme === 'dark'
              ? 'rgba(16,185,129,0.08)'
              : 'rgba(16,185,129,0.06)',
          border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: 8,
          fontSize: 13,
          color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : palette.textMuted,
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: theme === 'dark' ? 'white' : palette.text }}>
          All services available.
        </strong>{' '}
        {location.label} offers the full Boca Dental & Braces service menu — general, cosmetic, restorative, implants, orthodontics, oral surgery, periodontal, sedation, and pediatric care.
      </div>
    )
  }
  const unavailableLabels = unavailable
    .map((slug) => INITIAL_DATA.services.find((s) => s.slug === slug)?.label)
    .filter(Boolean) as string[]
  const otherLocations = INITIAL_DATA.locations
    .filter(
      (l) =>
        l.slug !== location.slug &&
        !(servicesUnavailableFor(l.slug).length === unavailable.length &&
          servicesUnavailableFor(l.slug).every((s) => unavailable.includes(s))),
    )
    .slice(0, 3)
  return (
    <div
      style={{
        marginTop: 28,
        padding: '16px 22px',
        background:
          theme === 'dark'
            ? 'rgba(243,103,42,0.08)'
            : 'rgba(243,103,42,0.06)',
        border: '1px solid rgba(243,103,42,0.25)',
        borderRadius: 8,
        fontSize: 13,
        color: theme === 'dark' ? 'rgba(255,255,255,0.85)' : palette.textMuted,
        lineHeight: 1.6,
      }}
    >
      <strong style={{ color: theme === 'dark' ? 'white' : palette.text }}>
        Note on service availability:
      </strong>{' '}
      {unavailableLabels.length === 1 ? (
        <>
          {unavailableLabels[0]} is <strong>NOT</strong> available at this location. For {unavailableLabels[0]} care, visit one of our other clinics{otherLocations.length > 0 ? ' — ' : '.'}{otherLocations.length > 0 && otherLocations.map((l, i) => (
            <span key={l.slug}>
              <a href={`/clinics/${l.slug}/`} style={{ color: ORANGE, fontWeight: 700, textDecoration: 'none' }}>
                {l.label}
              </a>
              {i < otherLocations.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </>
      ) : (
        <>
          The following services are <strong>NOT</strong> available at this location:{' '}
          {unavailableLabels.join(', ')}. They are offered at {otherLocations.map((l, i) => (
            <span key={l.slug}>
              <a href={`/clinics/${l.slug}/`} style={{ color: ORANGE, fontWeight: 700, textDecoration: 'none' }}>
                {l.label}
              </a>
              {i < otherLocations.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 6 — Patient Reviews (3 location-specific cards + Review schema)
// ─────────────────────────────────────────────────────────────────────────────

export function PatientReviewsSection({
  location,
  theme = 'light',
}: {
  location: Location
  theme?: LocationTheme
}) {
  const palette = paletteFor(theme)
  const reviews = reviewsFor(location.slug)

  // Build Review JSON-LD inline so Google sees per-review schema
  const reviewSchemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': reviews.map((r) => ({
      '@type': 'Review',
      itemReviewed: {
        '@type': location.kids ? 'DentalSpecialty' : 'Dentist',
        name: `Boca Dental & Braces — ${location.label}`,
      },
      author: { '@type': 'Person', name: r.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.body,
      ...(r.date ? { datePublished: r.date } : {}),
    })),
  })

  return (
    <section style={{ background: NAVY_GRADIENT, padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle radial glow */}
      <div aria-hidden style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHead
          eyebrow={`[ 06 ] · Patient reviews`}
          title={
            <>
              What patients at our{' '}
              <span style={{ color: ORANGE }}>
                {location.label}
              </span>{' '}
              location are saying.
            </>
          }
          intro={
            location.review_count > 0
              ? `Reviews from real patients who specifically mention this clinic, a provider here, or a nearby neighborhood. Aggregated from ${location.review_count}+ verified Google reviews.`
              : 'Pre-launch placeholders — real Google reviews will be selected before launch.'
          }
          palette={{ ...palette, text: 'white', textMuted: 'rgba(255,255,255,0.7)', textFaint: 'rgba(255,255,255,0.45)', serif: false, bg: NAVY_GRADIENT, bg2: NAVY_GRADIENT, cardBg: 'rgba(255,255,255,0.07)', cardBorder: 'rgba(255,255,255,0.12)', divider: 'rgba(255,255,255,0.12)', mono: MONO }}
        />

        <div
          className="reviews-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
          }}
        >
          <style>{`
            @media (max-width: 880px) {
              .reviews-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderTop: `2px solid ${ORANGE}`,
                borderRadius: 14,
                padding: '24px 24px 22px',
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} fill={ORANGE} color={ORANGE} />
                ))}
              </div>
              {/* Body */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.88)',
                  margin: '0 0 18px',
                  position: 'relative',
                }}
              >
                <Quote size={20} color={ORANGE} style={{ opacity: 0.3, marginRight: 6, marginBottom: -2 }} />
                {r.body}
              </p>
              {/* Author */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 14,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'white', letterSpacing: '-0.1px' }}>
                    {r.author}
                  </div>
                  {r.authorArea && (
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
                      {r.authorArea}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 9, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase',
                    color: ORANGE, fontFamily: MONO,
                    background: 'rgba(243,103,42,0.18)', border: '1px solid rgba(243,103,42,0.35)',
                    borderRadius: 999, padding: '3px 9px',
                  }}
                >
                  Verified
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* External link to all reviews on GBP — pill button, matches the
            "View all" pattern used elsewhere on the page (Services, Locations,
            LocationsMap). */}
        <div style={{ marginTop: 36, textAlign: 'center' }}>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Boca Dental ' + location.label + ' Las Vegas')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              color: 'white',
              background: 'rgba(255,255,255,0.1)',
              textDecoration: 'none',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 999,
              padding: '13px 28px',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = ORANGE
              el.style.borderColor = ORANGE
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 12px 24px rgba(243,103,42,0.35)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(255,255,255,0.1)'
              el.style.borderColor = 'rgba(255,255,255,0.3)'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            Read all reviews on Google
            <ArrowRight size={14} strokeWidth={2.4} />
          </a>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: reviewSchemaJson }}
      />
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 8 — Insurance & Financing
// ─────────────────────────────────────────────────────────────────────────────

const PPO_PLANS = [
  'Delta Dental',
  'Aetna',
  'Cigna',
  'Guardian',
  'MetLife',
  'United Healthcare',
  'Humana',
  'Anthem BCBS',
]

export function InsuranceFinancingSection({
  location,
  theme = 'light',
}: {
  location: Location
  theme?: LocationTheme
}) {
  const palette = paletteFor(theme)

  return (
    <section style={{ background: palette.bg, padding: '96px 32px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <SectionHead
          eyebrow={`[ 08 ] · Insurance & financing`}
          title={
            <>
              Making dental care affordable in{' '}
              <span style={{ color: ORANGE, fontStyle: palette.serif ? 'italic' : 'normal' }}>
                {location.neighborhood}
              </span>
              .
            </>
          }
          intro="Insurance verified before your appointment at no cost. Flexible payment plans for what insurance doesn't cover."
          palette={palette}
        />

        <div
          className="ins-fin-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
            marginBottom: 28,
          }}
        >
          <style>{`
            @media (max-width: 980px) { .ins-fin-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 600px) { .ins-fin-grid { grid-template-columns: 1fr !important; } }
          `}</style>

          {/* Insurance card */}
          <div
            style={{
              background: palette.cardBg,
              border: `1px solid ${palette.cardBorder}`,
              borderTop: `2px solid ${ORANGE}`,
              borderRadius: 12,
              padding: '22px 24px',
            }}
          >
            <CardHead
              icon={ShieldCheck}
              label="Insurance"
              title="Most major PPO plans"
              palette={palette}
            />
            <p
              style={{
                fontSize: 14,
                color: palette.textMuted,
                lineHeight: 1.6,
                margin: '0 0 14px',
              }}
            >
              Boca Dental &amp; Braces at {location.label} accepts most major
              PPO dental insurance plans. We verify your benefits before your
              appointment at no cost, so your out-of-pocket is clear upfront.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
              }}
            >
              {PPO_PLANS.map((p) => (
                <span
                  key={p}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: palette.textMuted,
                    background:
                      theme === 'dark'
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(0,29,61,0.04)',
                    border: `1px solid ${palette.cardBorder}`,
                    borderRadius: 999,
                    padding: '4px 10px',
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: `1px solid ${palette.divider}`,
                fontSize: 12,
                color: palette.textFaint,
              }}
            >
              Nevada Medicaid + CHIP accepted for eligible patients at this location.
            </div>
          </div>

          {/* CareCredit card */}
          <div
            style={{
              background: palette.cardBg,
              border: `1px solid ${palette.cardBorder}`,
              borderTop: `2px solid ${ORANGE}`,
              borderRadius: 12,
              padding: '22px 24px',
            }}
          >
            <CardHead
              icon={CreditCard}
              label="Financing"
              title="CareCredit + in-house plans"
              palette={palette}
            />
            <p
              style={{
                fontSize: 14,
                color: palette.textMuted,
                lineHeight: 1.6,
                margin: '0 0 14px',
              }}
            >
              CareCredit lets you spread treatment over 6, 12, 18, or 24 months
              with low or no interest. We also offer in-house payment plans
              with no credit check for routine care.
            </p>
            <ul
              style={{
                margin: 0,
                padding: '0 0 0 18px',
                fontSize: 13,
                color: palette.textMuted,
                lineHeight: 1.7,
              }}
            >
              <li>Apply in minutes at the front desk or online</li>
              <li>Same-day approval common for qualified applicants</li>
              <li>Use for any service — implants, ortho, restorative</li>
            </ul>
          </div>

          {/* FSA / HSA card */}
          <div
            style={{
              background: palette.cardBg,
              border: `1px solid ${palette.cardBorder}`,
              borderTop: `2px solid ${ORANGE}`,
              borderRadius: 12,
              padding: '22px 24px',
            }}
          >
            <CardHead
              icon={PiggyBank}
              label="Pre-tax dollars"
              title="FSA + HSA accepted"
              palette={palette}
            />
            <p
              style={{
                fontSize: 14,
                color: palette.textMuted,
                lineHeight: 1.6,
                margin: '0 0 14px',
              }}
            >
              Use Flexible Spending Account or Health Savings Account funds for
              dental treatment — reduces your taxable out-of-pocket cost.
            </p>
            <div
              style={{
                fontSize: 12,
                color: palette.textFaint,
                lineHeight: 1.5,
              }}
            >
              Bring your FSA/HSA card to your visit or submit receipts to your
              plan administrator after the appointment.
            </div>
          </div>
        </div>

        {/* Inline CTA */}
        <div
          style={{
            background:
              theme === 'dark'
                ? 'rgba(243,103,42,0.10)'
                : 'rgba(243,103,42,0.08)',
            border: '1px solid rgba(243,103,42,0.28)',
            borderRadius: 12,
            padding: '20px 26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            flexWrap: 'wrap',
          }}
          className="ins-cta-row"
        >
          <style>{`
            @media (max-width: 700px) {
              .ins-cta-row { flex-direction: column !important; align-items: stretch !important; text-align: center; }
              .ins-cta-row > a { width: 100% !important; justify-content: center !important; }
            }
          `}</style>
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: palette.text,
                letterSpacing: '-0.2px',
                marginBottom: 4,
              }}
            >
              Questions about coverage or payment options?
            </div>
            <div style={{ fontSize: 13, color: palette.textMuted }}>
              Call our {location.label} team at{' '}
              <a
                href={`tel:${location.phone.replace(/\D/g, '')}`}
                style={{ color: ORANGE, fontWeight: 700, textDecoration: 'none' }}
              >
                {location.phone}
              </a>{' '}
              or book online — we'll walk you through everything at your first visit.
            </div>
          </div>
          <a
            href="#request-consultation"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: ORANGE,
              color: 'white',
              borderRadius: 8,
              padding: '12px 22px',
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              boxShadow: '0 10px 24px rgba(243,103,42,0.28)',
              flexShrink: 0,
            }}
          >
            Book at this location
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

function CardHead({
  icon: Icon,
  label,
  title,
  palette,
}: {
  icon: LucideIcon
  label: string
  title: string
  palette: PaletteShape
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'rgba(243,103,42,0.12)',
            border: '1px solid rgba(243,103,42,0.22)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={15} color={ORANGE} />
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: palette.textFaint,
            fontFamily: MONO,
          }}
        >
          {label}
        </div>
      </div>
      <div
        style={{
          fontSize: 17,
          fontWeight: 800,
          color: palette.text,
          letterSpacing: '-0.3px',
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
    </div>
  )
}

// Re-export the service type for consumers who want to filter
export type { Service }
