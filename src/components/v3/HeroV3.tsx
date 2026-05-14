import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, Star, MapPin, Clock } from 'lucide-react'
import { GoogleG } from '../shared/icons/GoogleG'
import type { Brand } from '../../types'

interface HeroV3Props {
  brand: Brand
}

export function HeroV3({ brand }: HeroV3Props) {
  return (
    <section
      style={{
        position: 'relative',
        background: '#0A0A0F',
        minHeight: 'min(78vh, 760px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Full-bleed background image ──────────────────────────── */}
      <img
        src="/boca-modern-office.webp"
        alt="A modern Boca Dental and Braces treatment room at dusk overlooking the Las Vegas skyline"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
          zIndex: 0,
        }}
      />

      {/* Dark gradient overlay — readability + cinematic mood */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.35) 35%, rgba(10,10,15,0.65) 70%, rgba(10,10,15,0.92) 100%)',
          zIndex: 1,
        }}
      />

      {/* Side vignette for left-aligned content readability */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.15) 45%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Subtle grid pattern overlay — modern signature */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 90%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 1280,
          width: '100%',
          margin: '0 auto',
          padding: '160px 32px 96px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top status bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(10,10,15,0.6)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              padding: '8px 18px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10b981',
                display: 'inline-block',
                boxShadow: '0 0 0 4px rgba(16,185,129,0.18)',
              }}
            />
            Live · Booking now for next week
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            v.2026 · Boca Dental + Braces
          </div>
        </motion.div>

        {/* ── Content ─────────────────────── */}
        <div style={{ height: 56 }} aria-hidden />
        <div
          className="hero-v3-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
          }}
        >
          <style>{`
            @media (max-width: 768px) {
              .hero-v3-copy { text-align: center !important; }
              .hero-v3-copy > * { margin-left: auto !important; margin-right: auto !important; }
              .hero-v3-ctas { justify-content: center !important; }
            }
          `}</style>
          {/* LEFT — headline + CTAs */}
          <div className="hero-v3-copy">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 22,
              }}
            >
              Boca Dental + Braces · Est. 2006
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
              style={{
                fontSize: 'clamp(28px, 4vw, 58px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-1.2px',
                color: 'white',
                margin: '0 0 26px',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
                Vegas' Dental
              </span>
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>
                Home. Nine offices.
              </span>
              <span
                style={{
                  display: 'block',
                  color: '#F3672A',
                  whiteSpace: 'nowrap',
                }}
              >
                One team.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.78)',
                margin: '0 0 36px',
                maxWidth: 540,
              }}
            >
              General, cosmetic, orthodontic, and specialty dental care under
              one roof — flexible scheduling, most insurance accepted, free
              consultations across Las Vegas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="hero-v3-ctas"
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
            >
              <style>{`
                @media (max-width: 768px) {
                  .hero-v3-ctas { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
                  .hero-v3-ctas > a, .hero-v3-ctas > button { width: 100% !important; justify-content: center !important; }
                }
              `}</style>
              <a
                href="#locations"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: '#F3672A',
                  color: 'white',
                  borderRadius: 8,
                  padding: '16px 30px',
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  boxShadow: '0 12px 32px rgba(243,103,42,0.4)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#d95a22'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#F3672A'
                  el.style.transform = 'translateY(0)'
                }}
              >
                Find a location
                <ArrowUpRight size={16} />
              </a>

              <a
                href={`tel:${brand.phone.replace(/\D/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  color: 'white',
                  borderRadius: 8,
                  padding: '15px 28px',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: 0.4,
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,255,255,0.12)'
                  el.style.borderColor = 'rgba(255,255,255,0.4)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,255,255,0.06)'
                  el.style.borderColor = 'rgba(255,255,255,0.22)'
                }}
              >
                <Phone size={14} />
                {brand.phone}
              </a>
            </motion.div>
          </div>

          {/* RIGHT — illustrated trust card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(10,10,15,0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow:
                '0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(243,103,42,0.06)',
            }}
          >
            {/* Soft orange glow accent in the top-left */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -80,
                left: -80,
                width: 280,
                height: 280,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(243,103,42,0.18) 0%, transparent 65%)',
                pointerEvents: 'none',
              }}
            />

            {/* Header strip */}
            <div
              style={{
                position: 'relative',
                padding: '16px 22px 14px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / By the numbers
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 0 3px rgba(16,185,129,0.18)',
                  }}
                />
                Live
              </div>
            </div>

            {/* Stat rows */}
            {[
              {
                icon: <GoogleG size={20} />,
                value: '4.9',
                suffix: '★',
                label: 'Google rating',
                sub: 'Average across 9 LV offices',
              },
              {
                icon: (
                  <Star
                    size={18}
                    fill="#F3672A"
                    style={{ color: '#F3672A' }}
                  />
                ),
                value: '1,200',
                suffix: '+',
                label: 'Verified reviews',
                sub: 'Real patients, real ratings',
              },
              {
                icon: <MapPin size={18} style={{ color: '#F3672A' }} />,
                value: '9',
                suffix: '',
                label: 'LV-area offices',
                sub: 'East · West · NW · SE · Henderson',
              },
              {
                icon: <Clock size={18} style={{ color: '#F3672A' }} />,
                value: '20',
                suffix: 'yrs',
                label: 'Family-owned',
                sub: 'Same team, since 2006',
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: '54px 1fr auto',
                  gap: 16,
                  alignItems: 'center',
                  padding: '20px 22px',
                  borderBottom:
                    i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  cursor: 'default',
                  transition: 'background 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    'rgba(243,103,42,0.04)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    'transparent'
                }}
              >
                {/* Icon tile */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(243,103,42,0.12)',
                    border: '1px solid rgba(243,103,42,0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </div>

                {/* Value + label + sub */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 10,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 30,
                        fontWeight: 800,
                        color: 'white',
                        lineHeight: 1,
                        letterSpacing: '-1.2px',
                      }}
                    >
                      {stat.value}
                      <span
                        style={{
                          color: '#F3672A',
                          fontSize: '0.6em',
                          marginLeft: 2,
                        }}
                      >
                        {stat.suffix}
                      </span>
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.85)',
                        letterSpacing: '-0.2px',
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.sub}
                  </div>
                </div>

                {/* Monospace index */}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  / {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroV3
