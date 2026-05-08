import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const PILLARS = [
  { num: '01', title: 'Family-owned', body: 'Locally led since 2006. Not a private equity rollup.' },
  { num: '02', title: 'Real prices', body: 'Quoted before treatment. Always.' },
  { num: '03', title: 'Insurance + Medicaid', body: '30+ PPO plans plus Nevada Medicaid + CHIP.' },
  { num: '04', title: 'Bilingual team', body: 'Hablamos español at every front desk.' },
]

export function AboutV4() {
  return (
    <section
      id="about"
      style={{
        background: '#FAFAFA',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft gradient accent */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'flex-start',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'white',
                border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: 999,
                padding: '8px 16px',
                marginBottom: 28,
                boxShadow: '0 4px 12px rgba(59,130,246,0.06)',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#3B82F6',
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#3B82F6',
                }}
              >
                About Boca · Est. 2006
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(40px, 5.4vw, 72px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2.2px',
                color: '#0A0A0F',
                margin: '0 0 32px',
                textTransform: 'uppercase',
              }}
            >
              Twenty years
              <br />
              of getting it{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                right.
              </span>
            </h2>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'rgba(10,10,15,0.65)',
                margin: '0 0 24px',
                maxWidth: 520,
              }}
            >
              Boca didn't grow because it bought competitors. It grew because
              the patients who came once kept coming back — and brought their
              kids.
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'rgba(10,10,15,0.65)',
                margin: '0 0 36px',
                maxWidth: 520,
              }}
            >
              Same founder. Same dentists. Same answer when you ask what
              something costs. Now across nine locations in LV.
            </p>

            <a
              href="#about-more"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 800,
                color: '#F3672A',
                textDecoration: 'none',
                letterSpacing: 0.4,
                paddingBottom: 4,
                borderBottom: '2px solid #F3672A',
              }}
            >
              Read our story
              <ArrowUpRight size={15} />
            </a>
          </motion.div>

          {/* Pillar grid with hover lift */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.45 }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 24px 48px rgba(243,103,42,0.16), 0 8px 16px rgba(10,10,15,0.06)',
                }}
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,10,15,0.05)',
                  borderRadius: 22,
                  padding: '28px 26px',
                  boxShadow: '0 4px 12px rgba(10,10,15,0.04)',
                  transition: 'box-shadow 0.25s ease',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      background:
                        i === 0
                          ? 'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)'
                          : 'rgba(243,103,42,0.1)',
                      color: i === 0 ? 'white' : '#F3672A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: 0.3,
                    }}
                  >
                    {p.num}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: '#0A0A0F',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.2px',
                    }}
                  >
                    {p.title}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(10,10,15,0.6)',
                    lineHeight: 1.6,
                  }}
                >
                  {p.body}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutV4
