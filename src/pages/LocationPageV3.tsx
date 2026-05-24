import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ArrowUpRight,
  Calendar,
  Shield,
  Languages,
  Check,
  BadgeCheck,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { HeaderV3 } from '../components/v3/HeaderV3'
import { FooterV3 } from '../components/v3/FooterV3'
import { CTAv3 } from '../components/v3/CTAv3'
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
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace'

export function LocationPageV3({ location }: { location: Location }) {
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

  const idx = INITIAL_DATA.locations.findIndex((l) => l.slug === location.slug)
  const officeNumber = String(idx + 1).padStart(2, '0')

  return (
    <div style={{ background: '#0A0A0F', color: 'white', fontFamily: 'inherit' }}>
      <HeaderV3
        brand={INITIAL_DATA.brand}
        announcement={INITIAL_DATA.announcement}
      />

      {/* §1 ── HERO ─────────────────────────────────── */}
      <LocationHero
        location={location}
        officeNumber={officeNumber}
      />

      {/* Trust strip — slots in after the hero (Treysyde §1 trust bar) */}
      <TrustStrip location={location} />

      {/* §2 ── CLINIC INFORMATION (NAP + day-by-day hours + languages + parking) */}
      <ClinicInfoSection location={location} theme="dark" officeNo={officeNumber} />

      {/* §3 ── ABOUT THIS LOCATION (neighborhood narrative) */}
      <NeighborhoodNarrative location={location} />

      {/* §4 ── MEET YOUR DENTAL TEAM */}
      {doctors.length > 0 && <DoctorsHere doctors={doctors} location={location} />}

      {/* §5 ── DENTAL SERVICES AT THIS LOCATION (with availability note appended) */}
      <ServicesHere services={services} location={location} />

      {/* §6 ── PATIENT REVIEWS (location-specific) */}
      <PatientReviewsSection location={location} theme="dark" />

      {/* §7 ── LOCATION FAQs */}
      {location.faqs.length > 0 && <LocationFAQs faqs={location.faqs} location={location} />}

      {/* §8 ── INSURANCE & FINANCING */}
      <InsuranceFinancingSection location={location} theme="dark" />

      {/* §9 ── FIND US & BOOK YOUR APPOINTMENT (Map + Other locations cross-link) */}
      {coords && <SinglePinMap coords={coords} location={location} />}
      <OtherLocations locations={otherLocations} currentSlug={location.slug} />

      {/* BOOK CTA + FOOTER */}
      <CTAv3 />

      <FooterV3 />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

function LocationHero({
  location,
  officeNumber,
}: {
  location: Location
  officeNumber: string
}) {
  const coords = COORDS_BY_LOCATION[location.slug]
  const mapToken = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined
  const mapBgUrl =
    coords && mapToken
      ? `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-l+F3672A(${coords[0]},${coords[1]})/${coords[0]},${coords[1]},13.5,0/1600x900@2x?access_token=${mapToken}&logo=false&attribution=false`
      : null
  return (
    <section
      style={{
        background: '#0A0A0F',
        padding: '160px 32px 88px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Faint dark map — anchors the hero to the real neighborhood */}
      {mapBgUrl && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${mapBgUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        />
      )}
      {/* Dark overlay — drops the map back further so copy stays readable */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,10,15,0.78) 0%, rgba(10,10,15,0.55) 45%, rgba(10,10,15,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Orange glow accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 700,
          height: 700,
          background: `radial-gradient(circle, rgba(243,103,42,0.14) 0%, transparent 65%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Faint vertical grid lines for tech texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '120px 100%',
          pointerEvents: 'none',
        }}
      />

      {/* Giant intersection-name watermark — the section's identity anchor.
          Replaces the previous dim "01" so each location page has a unique
          background flourish naming the actual neighborhood crossing. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '38%',
          transform: 'translate(-50%, -50%)',
          fontFamily:
            'Georgia, "Playfair Display", "Times New Roman", serif',
          fontSize: 'clamp(120px, 18vw, 280px)',
          fontWeight: 800,
          fontStyle: 'italic',
          color: ORANGE,
          opacity: 0.045,
          lineHeight: 0.85,
          letterSpacing: '-6px',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}
      >
        {location.label}
      </div>

      {/* Small mono office-number flag — bottom-right corner */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 28,
          bottom: 28,
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <span style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.25)' }} />
        Office No. {officeNumber}
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb-style eyebrow */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 16,
              fontFamily: MONO,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
            }}
          >
            <a
              href="/"
              style={{
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
              }}
            >
              Boca Dental
            </a>
            <span style={{ opacity: 0.4 }}>/</span>
            <a
              href="/clinics/"
              style={{
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
              }}
            >
              Clinics
            </a>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: ORANGE }}>
              [ {officeNumber} ] · {location.neighborhood}
            </span>
          </div>

          {/* Pulse keyframes — used by the status console (now above the
              NAP card in the right column) */}
          <style>{`
            @keyframes loc-hero-pulse {
              0%   { transform: scale(1);   opacity: 0.55; }
              70%  { transform: scale(2.6); opacity: 0;    }
              100% { transform: scale(2.6); opacity: 0;    }
            }
          `}</style>

          <div
            className="loc-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.3fr 1fr',
              gap: 56,
              alignItems: 'center',
            }}
          >
            <style>{`
              @media (max-width: 900px) {
                .loc-hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
              }
            `}</style>

            {/* LEFT — name + intro */}
            <div style={{ position: 'relative' }}>
              {/* Vertical orange tick accent — magazine drop-bar */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: -22,
                  top: 8,
                  width: 3,
                  height: 64,
                  background: ORANGE,
                  borderRadius: 2,
                  boxShadow: '0 0 16px rgba(243,103,42,0.6)',
                }}
                className="hero-tick-v3"
              />
              <style>{`
                @media (max-width: 900px) { .hero-tick-v3 { left: -16px !important; height: 48px !important; } }
              `}</style>
              <h1
                style={{
                  margin: '0 0 20px',
                  lineHeight: 1.0,
                  color: 'white',
                  letterSpacing: '-1.6px',
                }}
              >
                {/* Brand pre-headline — small uppercase kicker so the H1
                    still reads "Boca Dental & Braces — Your [neighborhood]
                    Dentist Near [Intersection]." as one sentence for SEO,
                    while the visual emphasis lands on the location. */}
                <span
                  style={{
                    display: 'block',
                    fontSize: 'clamp(13px, 1.4vw, 18px)',
                    fontWeight: 800,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: 14,
                  }}
                >
                  Boca Dental &amp; Braces
                </span>
                {/* White connector line — smaller subhead so the orange
                    intersection name below can dominate as the page anchor.
                    `text-wrap: balance` is scoped to mobile only via media
                    query so the desktop layout still fits on a single line;
                    on phone widths the connector wraps to two balanced lines
                    instead of orphaning "NEAR" by itself. */}
                <style>{`
                  @media (max-width: 900px) {
                    .loc-hero-v3-connector { text-wrap: balance; }
                  }
                `}</style>
                <span
                  className="loc-hero-v3-connector"
                  style={{
                    display: 'block',
                    fontSize: 'clamp(22px, 2.6vw, 38px)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.6px',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.92)',
                    marginBottom: 10,
                  }}
                >
                  Your {location.neighborhood} dentist near
                </span>
                {/* Intersection — dominant orange italic anchor */}
                <span
                  style={{
                    display: 'block',
                    fontSize: 'clamp(40px, 5.8vw, 80px)',
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: '-2.4px',
                    textTransform: 'uppercase',
                    color: ORANGE,
                    fontStyle: 'italic',
                    textShadow:
                      '0 0 28px rgba(243,103,42,0.55), 0 0 80px rgba(243,103,42,0.3)',
                  }}
                >
                  {location.label}.
                </span>
              </h1>

              {/* Decorative editorial rule below H1 */}
              <div
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 26,
                }}
              >
                <div
                  style={{
                    height: 2,
                    width: 56,
                    background: ORANGE,
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {location.neighborhood} · {location.zip}
                </span>
                <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
              </div>

              {/* Inline stat chips */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                <Chip
                  icon={<Star size={12} fill={ORANGE} color={ORANGE} />}
                  text={`${location.rating} · ${location.review_count} reviews`}
                />
                <Chip
                  icon={
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#10b981',
                        display: 'inline-block',
                      }}
                    />
                  }
                  text="Open today · 8a — 8p"
                  border="rgba(16,185,129,0.32)"
                />
                {location.kids && (
                  <Chip
                    icon={
                      <span
                        style={{
                          fontSize: 8,
                          fontWeight: 800,
                          fontFamily: MONO,
                          color: 'white',
                          background: ORANGE,
                          padding: '1px 5px',
                          borderRadius: 4,
                        }}
                      >
                        KIDS
                      </span>
                    }
                    text="Pediatric-only office"
                  />
                )}
                <Chip
                  icon={<Languages size={11} color={ORANGE} />}
                  text="Se Habla Español"
                />
              </div>

              <p
                style={{
                  fontSize: 17,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.6,
                  margin: '0 0 32px',
                  maxWidth: 580,
                }}
              >
                Modern dental care{' '}
                {location.kids ? 'built just for kids' : 'for the whole family'} —
                serving {location.neighborhood} since 2006. Same-day appointments,
                most insurance accepted, and a team that actually picks up the phone.
              </p>

              {/* Action buttons — go full-width on mobile so they don't
                  shrink to half-width and look anemic on a phone */}
              <style>{`
                @media (max-width: 900px) {
                  .loc-hero-v3-actions { flex-direction: column !important; align-items: stretch !important; }
                  .loc-hero-v3-actions > a { width: 100% !important; justify-content: center !important; }
                }
              `}</style>
              <div
                className="loc-hero-v3-actions"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
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
                    padding: '17px 28px',
                    fontSize: 14,
                    fontWeight: 800,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: 0.6,
                    boxShadow: `0 16px 40px rgba(243,103,42,0.3)`,
                  }}
                >
                  Book at this office
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={`tel:${location.phone.replace(/\D/g, '')}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'rgba(255,255,255,0.04)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 8,
                    padding: '16px 26px',
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: 0.3,
                  }}
                >
                  <Phone size={15} color={ORANGE} />
                  {location.phone}
                </a>
              </div>
            </div>

            {/* RIGHT — status console + NAP card */}
            <div>
              {/* STATUS console line — now above the NAP card */}
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'relative',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 12px rgba(16,185,129,0.8)',
                    display: 'inline-block',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: '#10b981',
                      animation: 'loc-hero-pulse 2.4s ease-out infinite',
                      pointerEvents: 'none',
                    }}
                  />
                </span>
                <span style={{ color: '#10b981' }}>Open · accepting</span>
                <span style={{ opacity: 0.3 }}>·</span>
                <span>Office #{officeNumber}</span>
                <span style={{ opacity: 0.3 }}>·</span>
                <span style={{ color: ORANGE }}>
                  Est. {location.id === 9 ? '2024' : '2006'}
                </span>
              </div>

              {/* NAP card */}
              <div
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderTop: `2px solid ${ORANGE}`,
                  borderRadius: 14,
                  padding: '24px 28px 22px',
                  boxShadow:
                    '0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(243,103,42,0.06) inset',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
              {/* Faint scanlines for tech texture */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 5px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Header row: title + live dot */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                  paddingBottom: 16,
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: ORANGE,
                    fontFamily: MONO,
                  }}
                >
                  / Visit us
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: '#10b981',
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 8px rgba(16,185,129,0.7)',
                    }}
                  />
                  Live
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <NAPRow
                  icon={<MapPin size={14} color={ORANGE} />}
                  label="Address"
                  primary={location.address}
                  secondary={`${location.city}, ${location.state} ${location.zip}`}
                  index="01"
                />
                <NAPRow
                  icon={<Phone size={14} color={ORANGE} />}
                  label="Phone"
                  primary={location.phone}
                  secondary="24/7 emergency line"
                  index="02"
                />
                <NAPRow
                  icon={<Clock size={14} color={ORANGE} />}
                  label="Hours"
                  primary={location.hours}
                  secondary="Sunday by emergency only"
                  last
                  index="03"
                />
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Boca Dental ${location.label} Las Vegas`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: ORANGE,
                  textDecoration: 'none',
                  fontFamily: MONO,
                  position: 'relative',
                }}
              >
                <span>Get directions</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  Open map
                  <ArrowUpRight size={12} />
                </span>
              </a>
            </div>
            {/* close RIGHT wrapper (status console + NAP card) */}
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Chip({
  icon,
  text,
  border = 'rgba(255,255,255,0.14)',
}: {
  icon: React.ReactNode
  text: string
  border?: string
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${border}`,
        borderRadius: 999,
        padding: '6px 12px',
        fontSize: 12,
        fontWeight: 700,
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      {icon}
      {text}
    </span>
  )
}

function NAPRow({
  icon,
  label,
  primary,
  secondary,
  last = false,
  index,
}: {
  icon: React.ReactNode
  label: string
  primary: string
  secondary?: string
  last?: boolean
  index?: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        paddingBottom: last ? 0 : 18,
        marginBottom: last ? 0 : 18,
        borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          flexShrink: 0,
          borderRadius: 8,
          background: 'rgba(243,103,42,0.12)',
          border: '1px solid rgba(243,103,42,0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: MONO,
            }}
          >
            {label}
          </div>
          {index && (
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 1.5,
                color: 'rgba(255,255,255,0.25)',
              }}
            >
              [ {index} ]
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-0.2px',
            lineHeight: 1.3,
            marginBottom: secondary ? 2 : 0,
          }}
        >
          {primary}
        </div>
        {secondary && (
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: 0.3,
            }}
          >
            {secondary}
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TRUST STRIP
// ─────────────────────────────────────────────────────────────────────────────

function TrustStrip({ location }: { location: Location }) {
  const items: {
    value: string
    label: string
    Icon: LucideIcon
    note: string
    bars: number[]
  }[] = [
    {
      value: location.rating.toFixed(1) + '★',
      label: 'Avg patient rating',
      Icon: Star,
      note: 'Last 30 days',
      bars: [0.45, 0.6, 0.55, 0.72, 0.68, 0.85, 0.92],
    },
    {
      value: location.review_count + '+',
      label: 'Verified reviews',
      Icon: BadgeCheck,
      note: 'Google + Healthgrades',
      bars: [0.3, 0.42, 0.5, 0.55, 0.7, 0.82, 1.0],
    },
    {
      value: '7',
      label: 'Days a week open',
      Icon: Calendar,
      note: 'Sun by emergency',
      bars: [0.6, 0.7, 0.7, 0.7, 0.7, 0.6, 0.45],
    },
    {
      value: 'All',
      label: 'Major insurance accepted',
      Icon: ShieldCheck,
      note: 'PPO · Medicaid · HMO',
      bars: [0.6, 0.68, 0.78, 0.82, 0.9, 0.95, 1.0],
    },
  ]
  return (
    <section
      style={{
        background: '#0A0A0F',
        padding: '56px 32px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* eyebrow */}
      <div
        className="ts-eyebrow-v3"
        style={{
          maxWidth: 1280,
          margin: '0 auto 22px',
          fontFamily: MONO,
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ color: ORANGE }}>[ 01 ]</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Office stats</span>
        <span
          className="ts-eyebrow-rule-v3"
          style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)', minWidth: 20 }}
        />
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: ORANGE,
            opacity: 0.85,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: ORANGE,
              boxShadow: '0 0 10px rgba(243,103,42,0.7)',
            }}
          />
          live · {location.slug}
        </span>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          position: 'relative',
        }}
        className="trust-strip-grid"
      >
        <style>{`
          @media (max-width: 760px) {
            .trust-strip-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 460px) {
            .trust-strip-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          }
          @media (max-width: 460px) {
            .ts-card-v3 { padding: 14px 16px 12px !important; }
            .ts-bars-v3 { display: none !important; }
            .ts-card-row { gap: 8px !important; }
            .ts-label-v3 { font-size: 10px !important; }
          }
        `}</style>
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="ts-card-v3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: `1.5px solid ${ORANGE}`,
              borderRadius: 6,
              padding: '18px 18px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Corner mono index */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 14,
                fontFamily: MONO,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 1.5,
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              [ 0{i + 1} ]
            </div>

            {/* Header row: icon + label */}
            <div className="ts-card-row" style={{ display: 'flex', alignItems: 'center', gap: 10, paddingRight: 28 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  background: 'rgba(243,103,42,0.12)',
                  border: '1px solid rgba(243,103,42,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <it.Icon
                  size={15}
                  color={ORANGE}
                  strokeWidth={2}
                  {...(it.Icon === Star ? { fill: ORANGE } : {})}
                />
              </div>
              <div
                className="ts-label-v3"
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: 0.4,
                  textTransform: 'uppercase',
                  lineHeight: 1.25,
                }}
              >
                {it.label}
              </div>
            </div>

            {/* Big value */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(28px, 2.4vw, 36px)',
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-1px',
                  lineHeight: 0.9,
                }}
              >
                {it.value}
              </div>
              {/* Sparkline-style mini bars */}
              <div
                aria-hidden
                className="ts-bars-v3"
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 2,
                  height: 22,
                }}
              >
                {it.bars.map((h, bi) => (
                  <div
                    key={bi}
                    style={{
                      width: 3,
                      height: `${h * 100}%`,
                      background: ORANGE,
                      opacity: 0.3 + h * 0.55,
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Footer note */}
            <div
              style={{
                fontFamily: MONO,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                paddingTop: 10,
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {it.note}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NEIGHBORHOOD NARRATIVE
// ─────────────────────────────────────────────────────────────────────────────

function NeighborhoodNarrative({ location }: { location: Location }) {
  const officeNo = String(location.id).padStart(2, '0')
  const coords = COORDS_BY_LOCATION[location.slug]
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

  const coordLabel = coords
    ? `${coords[1].toFixed(4)}°N · ${Math.abs(coords[0]).toFixed(4)}°W`
    : '36.0000°N · 115.0000°W'

  return (
    <section
      className="nh-section-v3"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px 130px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          .nh-section-v3 { padding: 72px 20px 72px !important; }
        }
      `}</style>
      {/* Soft orange glow accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '40%',
          left: '-15%',
          width: 700,
          height: 700,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.10) 0%, transparent 65%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative tech grid lines */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '100px 100%',
          pointerEvents: 'none',
        }}
      />

      {/* Massive faint mono office number watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-2%',
          bottom: '-8%',
          fontFamily: MONO,
          fontSize: 'clamp(280px, 36vw, 560px)',
          fontWeight: 800,
          color: ORANGE,
          opacity: 0.05,
          lineHeight: 0.85,
          letterSpacing: '-20px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {officeNo}
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* COORD STRIP — GPS console-style top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            paddingBottom: 18,
            marginBottom: 56,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: ORANGE }}>[ {officeNo} ]</span>
          <span style={{ opacity: 0.35 }}>·</span>
          <span>{coordLabel}</span>
          <span style={{ opacity: 0.35 }}>·</span>
          <span>{location.address.split(',')[0]}</span>
          <span style={{ opacity: 0.35 }}>·</span>
          <span>
            {location.city}, {location.state} {location.zip}
          </span>
          <span style={{ marginLeft: 'auto', color: ORANGE, opacity: 0.7 }}>
            ● live
          </span>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.85fr 1.6fr',
            gap: 72,
            alignItems: 'start',
          }}
          className="nh-v3"
        >
          <style>{`
            @media (max-width: 920px) {
              .nh-v3 { grid-template-columns: 1fr !important; gap: 36px !important; }
              .nh-v3-glance { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>

          {/* LEFT — title block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: ORANGE,
                marginBottom: 22,
                fontFamily: MONO,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: ORANGE,
                  display: 'inline-block',
                  boxShadow: '0 0 12px rgba(243,103,42,0.7)',
                }}
              />
              The Neighborhood
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 3.6vw, 52px)',
                fontWeight: 800,
                letterSpacing: '-1.4px',
                color: 'white',
                margin: 0,
                lineHeight: 1.0,
                textTransform: 'uppercase',
              }}
            >
              About{' '}
              <span style={{ color: ORANGE, fontStyle: 'italic' }}>
                {location.neighborhood}.
              </span>
            </h2>

            {/* Mono key/value pair list — terminal feel */}
            <div
              style={{
                marginTop: 34,
                paddingTop: 22,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                fontFamily: MONO,
                fontSize: 12,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <KV label="zone" value={location.neighborhood} />
              <KV label="office" value={`No. ${officeNo}`} />
              <KV
                label="status"
                value={location.review_count > 0 ? 'Open · accepting' : 'Now booking'}
                accent
              />
              {location.kids && <KV label="program" value="Pediatric only" />}
            </div>
          </motion.div>

          {/* RIGHT — narrative + glance strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Body with drop cap */}
            <p
              style={{
                fontSize: 'clamp(17px, 1.3vw, 19px)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.82)',
                margin: 0,
                fontWeight: 400,
              }}
            >
              <span
                style={{
                  float: 'left',
                  fontFamily: MONO,
                  fontWeight: 800,
                  color: ORANGE,
                  fontSize: 'clamp(72px, 7vw, 104px)',
                  lineHeight: 0.85,
                  marginRight: 14,
                  marginTop: 6,
                  textShadow: '0 0 24px rgba(243,103,42,0.35)',
                }}
              >
                {firstChar}
              </span>
              {restOfNarrative}
            </p>

            {/* AT A GLANCE */}
            <div
              style={{
                marginTop: 56,
                paddingTop: 24,
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: 18,
                  fontFamily: MONO,
                }}
              >
                [ glance ] · key stats
              </div>
              <div
                className="nh-v3-glance"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 14,
                }}
              >
                {atAGlance.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderTop: `2px solid ${ORANGE}`,
                      borderRadius: 6,
                      padding: '16px 18px',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: 8,
                        fontFamily: MONO,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(16px, 1.4vw, 20px)',
                        fontWeight: 800,
                        color: 'white',
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
      </div>
    </section>
  )
}

function KV({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
      <span
        style={{
          color: 'rgba(255,255,255,0.35)',
          minWidth: 70,
          textTransform: 'lowercase',
        }}
      >
        &gt; {label}:
      </span>
      <span
        style={{
          color: accent ? ORANGE : 'rgba(255,255,255,0.85)',
          fontWeight: accent ? 800 : 500,
        }}
      >
        {value}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE-PIN MAP
// ─────────────────────────────────────────────────────────────────────────────

function SinglePinMap({
  coords,
  location,
}: {
  coords: [number, number]
  location: Location
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    if (!mapboxgl.accessToken) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: coords,
      zoom: 14.5,
      pitch: 38,
      bearing: -6,
      attributionControl: false,
    })
    mapRef.current = map

    map.on('load', () => {
      // Marker
      const el = document.createElement('div')
      el.style.cssText = [
        'position: relative',
        'width: 30px',
        'height: 30px',
        'border-radius: 50%',
        'background: radial-gradient(circle at 30% 30%, #ff8a4a 0%, #F3672A 55%, #c44e1c 100%)',
        'border: 2px solid #ffffff',
        'box-shadow: 0 0 0 6px rgba(243,103,42,0.22), 0 8px 24px rgba(243,103,42,0.45)',
      ].join(';')
      const inner = document.createElement('div')
      inner.style.cssText = [
        'position: absolute',
        'top: 50%',
        'left: 50%',
        'transform: translate(-50%, -50%)',
        'width: 8px',
        'height: 8px',
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
  }, [coords])

  return (
    <section
      className="findus-section-v3"
      style={{ background: '#0A0A0F', padding: '24px 32px 80px' }}
    >
      <style>{`
        @media (max-width: 600px) {
          .findus-section-v3 { padding: 24px 20px 60px !important; }
          .findus-map-v3 { min-height: 280px !important; aspect-ratio: auto !important; }
          .findus-address-chip-v3 { max-width: calc(100% - 32px) !important; top: 12px !important; left: 12px !important; padding: 10px 14px !important; }
          .findus-open-btn-v3 { bottom: 12px !important; right: 12px !important; padding: 8px 12px !important; font-size: 10px !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        <SectionEyebrow number="02" label="Find us" />
        <div
          className="findus-map-v3"
          style={{
            position: 'relative',
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            aspectRatio: '3 / 1',
            minHeight: 320,
            maxHeight: 460,
            width: '100%',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div
            ref={containerRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#0A0A0F',
            }}
          />
          {/* Address chip overlay */}
          <div
            className="findus-address-chip-v3"
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              background: 'rgba(10,10,15,0.86)',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              borderRadius: 12,
              padding: '14px 18px',
              maxWidth: 320,
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: ORANGE,
                marginBottom: 4,
                fontFamily: MONO,
              }}
            >
              / Boca Dental
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.2px',
                marginBottom: 6,
              }}
            >
              {location.label}
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.4,
              }}
            >
              {location.address}
              <br />
              {location.city}, {location.state} {location.zip}
            </div>
          </div>
          {/* Open in Maps button */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Boca Dental ${location.label} Las Vegas`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="findus-open-btn-v3"
            style={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: ORANGE,
              color: 'white',
              borderRadius: 8,
              padding: '10px 16px',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(243,103,42,0.4)',
              zIndex: 2,
            }}
          >
            Open in Maps
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES HERE
// ─────────────────────────────────────────────────────────────────────────────

function ServicesHere({
  services,
  location,
}: {
  services: { slug: string; label: string; desc: string; category?: string }[]
  location: Location
}) {
  return (
    <section style={{ background: '#0A0A0F', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow
          number="03"
          label={`What we do at ${location.label}`}
        />
        <h2
          style={{
            fontSize: 'clamp(34px, 4.4vw, 64px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-1.8px',
            color: 'white',
            margin: '0 0 36px',
            textTransform: 'uppercase',
            maxWidth: 820,
          }}
        >
          Full-spectrum dental care{' '}
          <span style={{ color: ORANGE, fontStyle: 'italic' }}>here.</span>
        </h2>

        <div
          className="services-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 980px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          {services.map((s, i) => (
            <motion.a
              key={s.slug}
              href={`/${s.slug}/`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '22px 22px 20px',
                textDecoration: 'none',
                color: 'white',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(243,103,42,0.4)'
                ;(e.currentTarget as HTMLElement).style.transform =
                  'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,255,255,0.08)'
                ;(e.currentTarget as HTMLElement).style.transform =
                  'translateY(0)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: ORANGE,
                    fontFamily: MONO,
                  }}
                >
                  / 0{i + 1}
                </div>
                <ArrowUpRight size={14} style={{ opacity: 0.5 }} />
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '-0.4px',
                  lineHeight: 1.15,
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.55,
                }}
              >
                {s.desc}
              </div>
            </motion.a>
          ))}
        </div>
        <ServiceAvailabilityNote location={location} theme="dark" />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCTORS HERE
// ─────────────────────────────────────────────────────────────────────────────

function DoctorsHere({
  doctors,
  location,
}: {
  doctors: { slug: string; name: string; title: string }[]
  location: Location
}) {
  return (
    <section
      style={{
        background: '#0A0A0F',
        padding: '80px 32px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionEyebrow number="04" label="Your team at this office" />
        <h2
          style={{
            fontSize: 'clamp(34px, 4.4vw, 64px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-1.8px',
            color: 'white',
            margin: '0 0 36px',
            textTransform: 'uppercase',
            maxWidth: 820,
          }}
        >
          The dentists practicing at{' '}
          <span style={{ color: ORANGE, fontStyle: 'italic' }}>
            {location.label}.
          </span>
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(doctors.length, 3)}, 1fr)`,
            gap: 16,
          }}
          className="doctors-grid"
        >
          <style>{`
            @media (max-width: 800px) { .doctors-grid { grid-template-columns: 1fr !important; } }
            .doctor-card-v3:hover { border-color: rgba(243,103,42,0.5) !important; transform: translateY(-2px); }
            .doctor-card-v3:hover .doctor-arrow-v3 { transform: translate(2px,-2px); color: ${ORANGE}; }
            .doctor-card-v3:hover .doctor-headshot-v3::after { opacity: 1; }
          `}</style>
          {doctors.map((d, i) => {
            const initials = d.name
              .replace(/^Dr\.\s+/i, '')
              .split(/\s+/)
              .map((w) => w[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
            const isPediatric = /pediatric|kid/i.test(d.title)
            const isOrtho = /ortho/i.test(d.title)
            const isOralSurgery = /oral.*surgery|maxillofacial/i.test(d.title)
            const specialtyChip = isPediatric
              ? 'Pediatric'
              : isOrtho
                ? 'Orthodontics'
                : isOralSurgery
                  ? 'Oral surgery'
                  : 'General dentistry'
            const idx = String(i + 1).padStart(2, '0')
            return (
              <a
                key={d.slug}
                href={`/about-us/dentists/${d.slug}/`}
                className="doctor-card-v3"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 14,
                  padding: '22px 22px 24px',
                  textDecoration: 'none',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  transition: 'all 0.25s cubic-bezier(0.0, 0.0, 0.2, 1.0)',
                  position: 'relative',
                }}
              >
                {/* Top meta row: index · arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: MONO,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  <span>[ {idx} ]</span>
                  <span
                    className="doctor-arrow-v3"
                    style={{
                      display: 'inline-flex',
                      transition:
                        'transform 0.2s ease, color 0.2s ease',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </span>
                </div>

                {/* Headshot placeholder with monogram + scanline */}
                <div
                  className="doctor-headshot-v3"
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 5',
                    borderRadius: 10,
                    background:
                      'linear-gradient(160deg, rgba(243,103,42,0.22) 0%, rgba(243,103,42,0.06) 55%, rgba(10,10,15,0.4) 100%)',
                    border: '1px solid rgba(243,103,42,0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Scanline texture */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Big monogram */}
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 'clamp(48px, 5vw, 76px)',
                      fontWeight: 800,
                      color: 'rgba(255,255,255,0.92)',
                      letterSpacing: '-1px',
                      textShadow: '0 0 28px rgba(243,103,42,0.35)',
                      lineHeight: 1,
                    }}
                  >
                    {initials}
                  </div>
                  {/* Bottom-left HEADSHOT tag */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 10,
                      bottom: 10,
                      fontFamily: MONO,
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)',
                      background: 'rgba(10,10,15,0.55)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      padding: '4px 8px',
                    }}
                  >
                    Headshot
                  </div>
                  {/* Star rating chip */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      fontSize: 11,
                      fontWeight: 800,
                      color: 'white',
                      background: 'rgba(10,10,15,0.7)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 999,
                      padding: '4px 9px 4px 8px',
                      letterSpacing: 0.3,
                    }}
                  >
                    <Star size={11} fill={ORANGE} color={ORANGE} strokeWidth={2} />
                    4.9
                  </div>
                </div>

                <div>
                  {/* Specialty chip row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        color: ORANGE,
                        background: 'rgba(243,103,42,0.10)',
                        border: '1px solid rgba(243,103,42,0.25)',
                        borderRadius: 999,
                        padding: '4px 9px',
                        fontFamily: MONO,
                      }}
                    >
                      <Stethoscope size={10} strokeWidth={2.5} />
                      {specialtyChip}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 999,
                        padding: '4px 9px',
                        fontFamily: MONO,
                      }}
                    >
                      DDS
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(17px, 1.4vw, 20px)',
                      fontWeight: 800,
                      color: 'white',
                      letterSpacing: '-0.4px',
                      lineHeight: 1.2,
                      marginBottom: 6,
                    }}
                  >
                    {d.name}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.55)',
                      letterSpacing: 0.3,
                      lineHeight: 1.4,
                    }}
                  >
                    {d.title}
                  </div>

                  {/* Bottom mono footer */}
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 12,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Practices here
                    </span>
                    <span style={{ color: ORANGE }}>View profile →</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCATION FAQS
// ─────────────────────────────────────────────────────────────────────────────

function LocationFAQs({
  faqs,
  location,
}: {
  faqs: { question: string; answer: string }[]
  location: Location
}) {
  return (
    <section
      style={{
        background: '#0A0A0F',
        padding: '80px 32px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <SectionEyebrow number="05" label="Frequently asked" />
        <h2
          style={{
            fontSize: 'clamp(32px, 3.8vw, 56px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-1.4px',
            color: 'white',
            margin: '0 0 36px',
            textTransform: 'uppercase',
          }}
        >
          Questions about{' '}
          <span style={{ color: ORANGE, fontStyle: 'italic' }}>
            {location.label}.
          </span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((f, i) => (
            <details
              key={i}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '18px 22px',
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
                  color: 'white',
                  letterSpacing: '-0.2px',
                  lineHeight: 1.4,
                }}
              >
                <span>{f.question}</span>
                <span
                  style={{
                    color: ORANGE,
                    fontSize: 18,
                    fontWeight: 400,
                    flexShrink: 0,
                    transition: 'transform 0.2s ease',
                  }}
                >
                  +
                </span>
              </summary>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.7)',
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

// ─────────────────────────────────────────────────────────────────────────────
// OTHER LOCATIONS
// ─────────────────────────────────────────────────────────────────────────────

function OtherLocations({
  locations,
  currentSlug,
}: {
  locations: Location[]
  currentSlug: string
}) {
  if (locations.length === 0) return null
  const currentCoords = COORDS_BY_LOCATION[currentSlug]
  return (
    <section
      style={{
        background: '#0A0A0F',
        padding: '120px 32px 100px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint grid lines */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '120px 100%',
          pointerEvents: 'none',
        }}
      />
      {/* Soft orange glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <SectionEyebrow number="06" label="Other Boca offices" />
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 24,
            marginBottom: 12,
            flexWrap: 'wrap',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 3.2vw, 44px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-1px',
              color: 'white',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            Closer to{' '}
            <span
              style={{
                color: ORANGE,
                fontStyle: 'italic',
                textShadow: '0 0 28px rgba(243,103,42,0.4)',
              }}
            >
              you?
            </span>
          </h2>
          <a
            href="/clinics/"
            className="see-all-link-v3"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              color: ORANGE,
              textDecoration: 'none',
              fontFamily: MONO,
              padding: '8px 14px',
              border: '1px solid rgba(243,103,42,0.3)',
              borderRadius: 6,
              transition: 'all 0.2s ease',
            }}
          >
            See all 9 offices
            <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Subhead with console-style hairline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 36,
            paddingBottom: 18,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontFamily: MONO,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          <span>Sorted by distance from this office</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          <span style={{ color: ORANGE }}>{locations.length} nearby</span>
        </div>

        <div
          className="other-loc-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 980px) { .other-loc-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .other-loc-grid { grid-template-columns: 1fr !important; } }
            .other-loc-card-v3:hover { border-color: rgba(243,103,42,0.5) !important; transform: translateY(-2px); }
            .other-loc-card-v3:hover .other-loc-arrow-v3 { transform: translate(3px,-3px); color: ${ORANGE}; }
            .other-loc-card-v3:hover .other-loc-pin-v3 { box-shadow: 0 0 18px rgba(243,103,42,0.6); }
            .see-all-link-v3:hover { background: rgba(243,103,42,0.12); border-color: ${ORANGE} !important; }
          `}</style>
          {locations
            .map((loc) => ({
              loc,
              distance: distanceMiles(currentCoords, COORDS_BY_LOCATION[loc.slug]),
            }))
            .sort((a, b) => (a.distance ?? 99) - (b.distance ?? 99))
            .map(({ loc, distance }, i) => {
              const idx = String(i + 1).padStart(2, '0')
              return (
                <a
                  key={loc.slug}
                  href={`/clinics/${loc.slug}/`}
                  className="other-loc-card-v3"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderTop: `1.5px solid rgba(243,103,42,0.5)`,
                    borderRadius: 8,
                    padding: '18px 18px 16px',
                    textDecoration: 'none',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    transition: 'all 0.25s cubic-bezier(0.0, 0.0, 0.2, 1.0)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top mono header: index + arrow */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: MONO,
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    <span>[ {idx} ]</span>
                    <span
                      className="other-loc-arrow-v3"
                      style={{
                        display: 'inline-flex',
                        transition:
                          'transform 0.2s ease, color 0.2s ease',
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </span>
                  </div>

                  {/* Map pin chip + neighborhood */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <div
                      className="other-loc-pin-v3"
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        background: 'rgba(243,103,42,0.14)',
                        border: '1px solid rgba(243,103,42,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'box-shadow 0.2s ease',
                      }}
                    >
                      <MapPin size={12} color={ORANGE} strokeWidth={2.5} />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          letterSpacing: 1.2,
                          color: 'rgba(255,255,255,0.55)',
                          fontFamily: MONO,
                          textTransform: 'uppercase',
                          marginBottom: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {loc.neighborhood}
                        </span>
                        {loc.kids && (
                          <span
                            style={{
                              fontSize: 8,
                              fontWeight: 800,
                              color: 'white',
                              background: ORANGE,
                              padding: '2px 5px',
                              borderRadius: 3,
                              letterSpacing: 0.5,
                            }}
                          >
                            KIDS
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 800,
                          color: 'white',
                          letterSpacing: '-0.3px',
                          lineHeight: 1.15,
                          textTransform: 'uppercase',
                        }}
                      >
                        {loc.label}
                      </div>
                    </div>
                  </div>

                  {/* Distance bar */}
                  {distance != null && (
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          marginBottom: 6,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: MONO,
                            fontSize: 9,
                            fontWeight: 800,
                            letterSpacing: 1.5,
                            color: 'rgba(255,255,255,0.4)',
                            textTransform: 'uppercase',
                          }}
                        >
                          Distance
                        </span>
                        <span
                          style={{
                            fontFamily: MONO,
                            fontSize: 12,
                            fontWeight: 800,
                            color: 'white',
                          }}
                        >
                          {distance < 1
                            ? `${(distance * 5280).toFixed(0)} ft`
                            : `${distance.toFixed(1)} mi`}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 3,
                          background: 'rgba(255,255,255,0.06)',
                          borderRadius: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(100, Math.max(8, (distance / 15) * 100))}%`,
                            background: ORANGE,
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Footer with phone + view link */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 12,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      fontFamily: MONO,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 0.3,
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {loc.phone}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        color: ORANGE,
                      }}
                    >
                      View →
                    </span>
                  </div>
                </a>
              )
            })}
        </div>
      </div>
    </section>
  )
}

// Haversine-ish distance for design-time sorting. Returns miles, null if missing coords.
function distanceMiles(
  a: [number, number] | undefined,
  b: [number, number] | undefined,
): number | null {
  if (!a || !b) return null
  const toRad = (d: number) => (d * Math.PI) / 180
  const R = 3958.7613
  const [lng1, lat1] = a
  const [lng2, lat2] = b
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function SectionEyebrow({
  number,
  label,
}: {
  number: string
  label: string
}) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: ORANGE,
        marginBottom: 18,
        fontFamily: MONO,
      }}
    >
      [ {number} ] · {label}
    </div>
  )
}

export default LocationPageV3
