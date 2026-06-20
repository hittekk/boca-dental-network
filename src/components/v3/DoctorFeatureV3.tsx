import { motion } from 'framer-motion'
import { ArrowUpRight, Stethoscope } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'

export function DoctorFeatureV3() {
  const featured = INITIAL_DATA.doctors[0] // Dr. Wyatt Dannels — Lead Dentist & Founder
  const otherCount = INITIAL_DATA.doctors.length - 1

  return (
    <section
      id="doctors"
      style={{
        background: '#0A0A0F',
        padding: '0 32px 140px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#F3672A',
              marginBottom: 24,
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            [ 02 ] · Meet Your Dentist
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '0.9fr 1.1fr',
              gap: 64,
              alignItems: 'center',
              background:
                'linear-gradient(135deg, rgba(243,103,42,0.08) 0%, rgba(22,46,122,0.08) 60%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: '52px 48px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative big initial */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -40,
                right: -20,
                fontSize: 'clamp(220px, 22vw, 360px)',
                fontWeight: 800,
                color: 'rgba(243,103,42,0.06)',
                lineHeight: 0.85,
                letterSpacing: '-12px',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              WD
            </div>

            {/* LEFT — portrait placeholder + mono label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4/5',
                  borderRadius: 16,
                  background:
                    'linear-gradient(155deg, #1a1a24 0%, #0F0F14 60%, #001D3D 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  padding: 20,
                }}
              >
                {/* Mono ID strip top */}
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  <span>DOC-001</span>
                  <span>BOCA · LV</span>
                </div>
                {/* Stethoscope icon as visual placeholder */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(243,103,42,0.45)',
                  }}
                >
                  <Stethoscope size={84} strokeWidth={1.25} />
                </div>
                {/* Bottom name strip */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.45)',
                      marginBottom: 4,
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    Lead Dentist · Founder
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: 'white',
                      lineHeight: 1.1,
                      letterSpacing: '-0.4px',
                    }}
                  >
                    Dr. Wyatt Dannels
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — bio + CTA */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 16,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / Founder's note
              </div>

              <h3
                style={{
                  fontSize: 'clamp(32px, 3.8vw, 48px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-1.4px',
                  color: 'white',
                  margin: '0 0 28px',
                  textTransform: 'uppercase',
                }}
              >
                "We grew because we{' '}
                <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                  earned
                </span>{' '}
                every patient — one office at a time."
              </h3>

              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.7)',
                  margin: '0 0 32px',
                  maxWidth: 520,
                }}
              >
                Dr. Dannels opened Boca's first office on Eastern. Today
                he leads a team of 14 dentists across nine LV-area locations —
                still seeing patients every week, still personally reviewing
                treatment plans for the most complex cases.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href={`/about-us/dentists/${featured.slug}/`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#F3672A',
                    color: 'white',
                    borderRadius: 8,
                    padding: '14px 26px',
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#d95a22')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#F3672A')
                  }
                >
                  Read full bio
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="/about-us/dentists/"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    letterSpacing: 0.4,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.7)')
                  }
                >
                  + {otherCount} other dentists across the network →
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DoctorFeatureV3
