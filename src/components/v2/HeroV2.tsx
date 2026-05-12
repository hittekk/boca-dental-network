import { motion } from 'framer-motion'
import { MapPin, Phone, Star } from 'lucide-react'
import type { Brand } from '../../types'

interface HeroV2Props {
  brand: Brand
}

const HIGHLIGHTS = [
  { value: '4.9', suffix: '★', label: 'Avg Rating' },
  { value: '1,200', suffix: '+', label: 'Reviews' },
  { value: '20', suffix: 'yrs', label: 'Experience' },
]

export function HeroV2({ brand }: HeroV2Props) {
  const scrollToLocations = () =>
    document
      .getElementById('locations')
      ?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      style={{
        position: 'relative',
        background: '#FFF4ED',
        paddingTop: 180,
        paddingBottom: 120,
        overflow: 'hidden',
      }}
    >
      {/* Background editorial accents */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '8%',
          right: '-10%',
          width: 540,
          height: 540,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 80,
          right: 64,
          fontSize: 'clamp(180px, 24vw, 380px)',
          fontWeight: 800,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          textTransform: 'uppercase',
          letterSpacing: '-12px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        BOCA
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 32px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* LEFT — Editorial headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 28,
                background: '#001D3D',
                color: 'white',
                borderRadius: 999,
                padding: '8px 18px',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#F3672A',
                  display: 'inline-block',
                }}
              />
              Now Accepting New Patients
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
              style={{
                fontSize: 'clamp(44px, 6.5vw, 88px)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-2.5px',
                color: '#001D3D',
                margin: '0 0 28px',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'block' }}>Vegas' dental home</span>
              <span style={{ display: 'block', color: '#F3672A' }}>
                for the whole family.
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.42em',
                  fontWeight: 600,
                  letterSpacing: 0,
                  textTransform: 'none',
                  color: 'rgba(0,29,61,0.55)',
                  marginTop: 18,
                  fontStyle: 'italic',
                  lineHeight: 1.3,
                }}
              >
                9 locations. One team. General, cosmetic, orthodontic,
                <br />
                and specialty care under one roof.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}
            >
              <button
                onClick={scrollToLocations}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#001D3D',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '16px 32px',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#002952')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#001D3D')
                }
              >
                <MapPin size={16} />
                Find My Office
              </button>

              <a
                href={`tel:${brand.phone.replace(/\D/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'transparent',
                  color: '#F3672A',
                  border: '2px solid #F3672A',
                  borderRadius: 8,
                  padding: '14px 30px',
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#F3672A'
                  ;(e.currentTarget as HTMLElement).style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = '#F3672A'
                }}
              >
                <Phone size={16} />
                {brand.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                fontSize: 13,
                color: 'rgba(0,29,61,0.65)',
              }}
            >
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="#F3672A"
                    style={{ color: '#F3672A' }}
                  />
                ))}
              </div>
              <span style={{ fontWeight: 700, color: '#001D3D' }}>4.9</span>
              <span style={{ opacity: 0.6 }}>·</span>
              <span>1,200+ verified reviews</span>
              <span style={{ opacity: 0.6 }}>·</span>
              <span>Medicaid welcome · Se Habla Español</span>
            </motion.div>
          </div>

          {/* RIGHT — Editorial photo block + stat overlays */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 20,
                overflow: 'hidden',
                background:
                  'linear-gradient(155deg, #F3672A 0%, #d95a22 60%, #001D3D 100%)',
                position: 'relative',
                boxShadow: '0 24px 64px rgba(0,29,61,0.18)',
              }}
            >
              {/* Decorative number */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  fontSize: 280,
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.18)',
                  lineHeight: 0.85,
                  letterSpacing: '-12px',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                9
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 28,
                  left: 28,
                  right: 28,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                Boca Dental and Braces
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 32,
                  right: 28,
                  textAlign: 'right',
                  color: 'white',
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.2px',
                    lineHeight: 1.2,
                  }}
                >
                  Locations
                </div>
                <div
                  style={{
                    fontSize: 12,
                    opacity: 0.7,
                    marginTop: 4,
                  }}
                >
                  Across Las Vegas
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: 24,
                right: -36,
                background: 'white',
                borderRadius: 16,
                padding: '18px 22px',
                boxShadow: '0 12px 32px rgba(0,29,61,0.15)',
                border: '1px solid rgba(0,29,61,0.06)',
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                  marginBottom: 6,
                }}
              >
                Same-day care
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: '#001D3D',
                  letterSpacing: '-0.3px',
                  lineHeight: 1.15,
                }}
              >
                Open 7 days
                <br />
                a week
              </div>
            </motion.div>

            {/* Floating bottom stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: -28,
                left: -28,
                right: 40,
                background: 'white',
                borderRadius: 16,
                padding: '18px 24px',
                boxShadow: '0 12px 32px rgba(0,29,61,0.18)',
                display: 'flex',
                gap: 24,
                border: '1px solid rgba(0,29,61,0.06)',
              }}
            >
              {HIGHLIGHTS.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    borderRight:
                      i < HIGHLIGHTS.length - 1
                        ? '1px solid rgba(0,29,61,0.08)'
                        : 'none',
                    paddingRight: i < HIGHLIGHTS.length - 1 ? 16 : 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: '#F3672A',
                      lineHeight: 1,
                      letterSpacing: '-0.5px',
                    }}
                  >
                    {stat.value}
                    <span style={{ fontSize: 14 }}>{stat.suffix}</span>
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: 'rgba(0,29,61,0.55)',
                      textTransform: 'uppercase',
                      letterSpacing: 1.5,
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroV2
