import { motion } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'
import { useLang, t } from '../../lib/lang'

type Theme = 'light' | 'dark' | 'cream'

// LV-only coverage — Henderson is NOT served (belongs to the separate
// Reno/Tahoe Boca Specialty site). Neighborhoods reflect actual clinic
// catchment areas per location narratives in initialData.ts.
const NEIGHBORHOODS = [
  'Downtown Las Vegas',
  'East Las Vegas',
  'Southeast Las Vegas',
  'West Las Vegas',
  'Northwest Las Vegas',
  'Spring Valley',
  'Paradise',
  'Southern Highlands',
]

export function LocationsMap({ theme = 'light' }: { theme?: Theme }) {
  const lang = useLang()
  const isDark  = theme === 'dark'
  const isCream = theme === 'cream'

  // Tokens
  const sectionBg    = isDark ? '#0A0A0F' : isCream ? '#FFFAF6' : '#FFFFFF'
  const headingColor = isDark ? 'white'   : isCream ? '#001D3D' : '#0A0A0F'
  const bodyColor    = isDark ? 'rgba(255,255,255,0.7)' : isCream ? 'rgba(0,29,61,0.7)' : 'rgba(10,10,15,0.7)'
  const subtleBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,15,0.06)'
  const chipBg       = isDark ? 'rgba(255,255,255,0.04)' : 'white'
  const chipBorder   = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(22,46,122,0.12)'
  const chipText     = isDark ? 'rgba(255,255,255,0.8)' : '#162E7A'
  const dotColor     = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(22,46,122,0.07)'

  // Headline scale per theme — mirrors the H2 scale used elsewhere on the
  // page so this section visually belongs alongside Services / WhyBoca /
  // Testimonials / SmileTransformations of the same variant.
  //   light  → Variant A scale (clamp 28–44)
  //   cream  → Variant B scale (clamp 40–72)
  //   dark   → Variant C scale (clamp 40–62)
  const headingSize          = isDark ? 'clamp(40px, 4.6vw, 62px)' : isCream ? 'clamp(40px, 5.5vw, 72px)' : 'clamp(28px, 4vw, 44px)'
  const headingLineHeight    = isCream || isDark ? 0.95 : 1.05
  const headingLetterSpacing = isCream ? '-2px' : isDark ? '-1.6px' : '-1px'
  const accentItalic         = isCream  // matches V2's orange-italic accent pattern

  return (
    <section
      id="locations"
      style={{
        background: sectionBg,
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Background design layer ───────────────────────────────────── */}
      {/* Dotted map-grid pattern — very subtle, suggests a city map */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${dotColor} 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 85%)',
          pointerEvents: 'none',
        }}
      />
      {/* Soft orange glow positioned behind the map */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          right: '-8%',
          width: 640,
          height: 640,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.14) 0%, transparent 65%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      {/* Soft navy glow lower-left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-8%',
          width: 520,
          height: 520,
          background:
            'radial-gradient(circle, rgba(22,46,122,0.10) 0%, transparent 65%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* LEFT — copy + neighborhoods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(243,103,42,0.08)',
              border: '1px solid rgba(243,103,42,0.22)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 22,
            }}
          >
            <MapPin size={12} color="#F3672A" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#F3672A',
              }}
            >
              {t(lang, 'Greater Las Vegas Coverage', 'Cobertura en el Gran Las Vegas')}
            </span>
          </div>

          <h3
            style={{
              fontSize:      headingSize,
              fontWeight:    800,
              lineHeight:    headingLineHeight,
              letterSpacing: headingLetterSpacing,
              color:         headingColor,
              margin:        '0 0 22px',
              textTransform: 'uppercase',
            }}
          >
            {t(lang, 'Coverage Across the', 'Cobertura en Todo')}
            <br />
            <span
              style={{
                color:     '#F3672A',
                fontStyle: accentItalic ? 'italic' : 'normal',
              }}
            >
              {t(lang, 'Las Vegas Valley', 'el Valle de Las Vegas')}
            </span>
          </h3>

          {/* GEO paragraph — entity-rich copy for AI / LLM citation per Treysyde spec */}
          <p
            style={{
              fontSize: 15,
              color: bodyColor,
              lineHeight: 1.7,
              margin: '0 0 32px',
              maxWidth: 540,
            }}
          >
            <strong style={{ color: headingColor }}>Boca Dental & Braces</strong>{' '}
            operates 9 dental clinics across Las Vegas, Nevada — from{' '}
            <strong style={{ color: headingColor }}>Downtown</strong> and{' '}
            <strong style={{ color: headingColor }}>East Las Vegas</strong> out
            to <strong style={{ color: headingColor }}>Spring Valley</strong>,{' '}
            <strong style={{ color: headingColor }}>Northwest Las Vegas</strong>
            , and the{' '}
            <strong style={{ color: headingColor }}>Southern Highlands</strong>.
            Every location offers general and preventive dental care, with
            specialist services including{' '}
            <strong style={{ color: headingColor }}>orthodontics</strong>,{' '}
            <strong style={{ color: headingColor }}>oral surgery</strong>,{' '}
            <strong style={{ color: headingColor }}>pediatric dentistry</strong>
            , and{' '}
            <strong style={{ color: headingColor }}>sedation dentistry</strong>{' '}
            available at select clinics.
          </p>

          {/* Eyebrow above the neighborhood chips */}
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: isDark ? 'rgba(255,255,255,0.5)' : '#94A3B8',
              marginBottom: 12,
            }}
          >
            {t(lang, 'Neighborhoods we serve', 'Vecindarios que atendemos')}
          </div>

          {/* Neighborhood chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 32,
            }}
          >
            {NEIGHBORHOODS.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: chipBg,
                  border: `1px solid ${chipBorder}`,
                  borderRadius: 999,
                  padding: '7px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  color: chipText,
                  letterSpacing: 0.2,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: '#F3672A',
                    display: 'inline-block',
                  }}
                />
                {name}
              </motion.span>
            ))}
          </div>

          {/* CTA pill — matches Services / Testimonials standard */}
          <a
            href="#locations"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 0.5,
              color: isDark ? 'white' : '#162E7A',
              background: isDark ? 'rgba(255,255,255,0.04)' : 'white',
              textDecoration: 'none',
              border: `2px solid ${isDark ? 'rgba(255,255,255,0.25)' : '#162E7A'}`,
              borderRadius: 999,
              padding: '13px 28px',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = isDark ? 'white' : '#162E7A'
              el.style.color = isDark ? '#0A0A0F' : 'white'
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 12px 24px rgba(22,46,122,0.18)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'white'
              el.style.color = isDark ? 'white' : '#162E7A'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            {t(lang, 'View All 9 Locations', 'Ver las 9 Clínicas')}
            <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
          </a>
        </motion.div>

        {/* RIGHT — embedded Google Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            border: `1px solid ${subtleBorder}`,
            background: isDark ? '#1a1a24' : '#EFF6FF',
            aspectRatio: '4/3.4',
            boxShadow: isDark
              ? '0 24px 64px rgba(0,0,0,0.5)'
              : '0 24px 64px rgba(10,10,15,0.12), 0 8px 20px rgba(243,103,42,0.08)',
          }}
        >
          <iframe
            title="Boca Dental & Braces Las Vegas locations"
            src="https://maps.google.com/maps?q=Boca%20Dental%20Las%20Vegas&t=&z=10&ie=UTF8&iwloc=&output=embed"
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              filter: isDark ? 'grayscale(0.2) brightness(0.9)' : 'none',
            }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Top-left overlay chip with location count */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              background: 'white',
              borderRadius: 999,
              padding: '6px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 12px rgba(10,10,15,0.15)',
              pointerEvents: 'none',
            }}
          >
            <MapPin size={12} color="#F3672A" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                color: '#0A0A0F',
              }}
            >
              9 Boca offices · LV area
            </span>
          </div>
          <a
            href="https://www.google.com/maps/search/Boca+Dental+Las+Vegas/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'absolute',
              bottom: 14,
              right: 14,
              background: '#F3672A',
              color: 'white',
              borderRadius: 999,
              padding: '8px 14px',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 8px 20px rgba(243,103,42,0.4)',
            }}
          >
            Open in Maps
            <ExternalLink size={11} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default LocationsMap
