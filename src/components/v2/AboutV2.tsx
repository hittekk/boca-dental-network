import { motion } from 'framer-motion'

const PROOF_POINTS = [
  { num: '01', title: 'Family-owned', body: 'Boca is locally led — not a private equity rollup wearing a friendly mask.' },
  { num: '02', title: 'Real prices', body: 'Honest, transparent pricing. We will tell you the cost before we touch your teeth.' },
  { num: '03', title: 'Insurance + Medicaid', body: '30+ PPO plans plus Nevada Medicaid and CHIP across all 9 offices.' },
  { num: '04', title: 'Spanish-speaking', body: 'Hablamos español at every front desk and operatory.' },
]

export function AboutV2() {
  return (
    <section
      id="about"
      style={{
        background: '#001D3D',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial backdrop number */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 80,
          right: -80,
          fontSize: 'clamp(280px, 36vw, 540px)',
          fontWeight: 800,
          color: 'rgba(243,103,42,0.06)',
          lineHeight: 0.85,
          letterSpacing: '-20px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        20
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 64, maxWidth: 760 }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#F3672A',
              marginBottom: 14,
            }}
          >
            Twenty Years In · Still Family-Owned
          </div>
          <h2
            style={{
              fontSize: 'clamp(40px, 5.5vw, 76px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2px',
              color: 'white',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            We don't sell{' '}
            <span style={{ color: '#F3672A', fontStyle: 'italic', fontWeight: 800 }}>
              upgrades.
            </span>
            <br />
            We sell <span style={{ color: '#F3672A' }}>trust.</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'flex-start',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.78)',
                margin: '0 0 24px',
              }}
            >
              Most dental groups outgrow their patients. Boca didn't. Across nine
              Las Vegas offices we still run things the way Dr. Dannels ran the first
              one — show up, listen, treat the person in front of you, and tell
              them what something actually costs before they sit in the chair.
            </p>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.78)',
                margin: 0,
              }}
            >
              That's why we accept Medicaid at every location. Why our front desks
              speak Spanish. Why the same patients have been coming back — and bringing their kids and grandkids with them.
            </p>

            <a
              href="#locations"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 36,
                background: '#F3672A',
                color: 'white',
                borderRadius: 8,
                padding: '14px 30px',
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#d95a22')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#F3672A')
              }
            >
              Find your office →
            </a>
          </motion.div>

          {/* Proof points — numbered editorial list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            {PROOF_POINTS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                style={{
                  display: 'flex',
                  gap: 24,
                  paddingBottom: 24,
                  borderBottom:
                    i < PROOF_POINTS.length - 1
                      ? '1px solid rgba(255,255,255,0.08)'
                      : 'none',
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: '#F3672A',
                    lineHeight: 1,
                    letterSpacing: '-1px',
                    flexShrink: 0,
                    minWidth: 56,
                  }}
                >
                  {p.num}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: 'white',
                      letterSpacing: '-0.2px',
                      marginBottom: 6,
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {p.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutV2
