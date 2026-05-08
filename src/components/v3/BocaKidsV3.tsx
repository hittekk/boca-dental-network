import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

const KID_FACTS = [
  { num: 'Age 1', label: 'First visit' },
  { num: 'Yes', label: 'Medicaid + CHIP' },
  { num: 'Sí', label: 'En español' },
]

export function BocaKidsV3() {
  return (
    <section
      id="boca-kids"
      style={{
        background: '#F3672A',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Backdrop "KIDS" treatment */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -40,
          right: -30,
          fontSize: 'clamp(220px, 26vw, 420px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.1)',
          lineHeight: 0.85,
          letterSpacing: '-14px',
          pointerEvents: 'none',
          userSelect: 'none',
          textTransform: 'uppercase',
        }}
      >
        KIDS
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 24,
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            [ 06 ] · Boca Kids
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 80,
              alignItems: 'flex-start',
            }}
          >
            {/* LEFT */}
            <div>
              <h2
                style={{
                  fontSize: 'clamp(48px, 6.4vw, 92px)',
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: '-2.5px',
                  color: 'white',
                  margin: '0 0 36px',
                  textTransform: 'uppercase',
                }}
              >
                Dental
                <br />
                that doesn't{' '}
                <span style={{ fontStyle: 'italic', textDecoration: 'underline', textDecorationThickness: 4, textUnderlineOffset: 8 }}>
                  scare
                </span>
                <br />
                kids.
              </h2>

              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.9)',
                  margin: '0 0 36px',
                  maxWidth: 540,
                }}
              >
                Two pediatric Boca Kids offices designed from the operatory up
                for tiny humans. Bilingual team, Medicaid welcome, prizes on
                the way out, no scary metallic tools left within sight.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 14,
                  flexWrap: 'wrap',
                  marginBottom: 48,
                }}
              >
                <a
                  href="#locations"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#0A0A0F',
                    color: 'white',
                    borderRadius: 8,
                    padding: '16px 30px',
                    fontSize: 14,
                    fontWeight: 800,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#1a1a24')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#0A0A0F')
                  }
                >
                  Find Boca Kids
                  <ArrowUpRight size={16} />
                </a>

                <a
                  href="tel:7023891543"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'transparent',
                    color: 'white',
                    border: '1.5px solid rgba(255,255,255,0.45)',
                    borderRadius: 8,
                    padding: '14.5px 28px',
                    fontSize: 14,
                    fontWeight: 800,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'white'
                    ;(e.currentTarget as HTMLElement).style.color = '#F3672A'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.color = 'white'
                  }}
                >
                  (702) 389-1543
                </a>
              </div>
            </div>

            {/* RIGHT — illustration card stack */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <div
                style={{
                  background: '#0A0A0F',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 18,
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Sparkles
                  size={32}
                  color="#F3672A"
                  style={{ marginBottom: 20 }}
                />
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 8,
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  / Promise
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'white',
                    letterSpacing: '-0.4px',
                    lineHeight: 1.15,
                  }}
                >
                  No tears today,
                  <br />
                  better teeth tomorrow.
                </div>
              </div>

              {/* Quick fact pills */}
              {KID_FACTS.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(255,255,255,0.4)',
                    borderRadius: 14,
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: '#0A0A0F',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {fact.num}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(10,10,15,0.55)',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    / {fact.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BocaKidsV3
