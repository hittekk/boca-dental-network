import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const SIGNATURE_FACTS = [
  { label: 'Locations', value: '9', detail: 'across the valley' },
  { label: 'Doctors', value: '14', detail: 'on staff today' },
  { label: 'Languages', value: '2', detail: 'English + Spanish' },
  { label: 'Plans', value: '30+', detail: 'PPO + Medicaid' },
]

export function AboutV3() {
  return (
    <section
      id="about"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
        }}
      />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — heading + body */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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
              [ 01 ] · About Boca
            </div>

            <h2
              style={{
                fontSize: 'clamp(44px, 5.6vw, 76px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2.2px',
                color: 'white',
                margin: '0 0 36px',
                textTransform: 'uppercase',
              }}
            >
              Built by{' '}
              <span style={{ color: '#F3672A' }}>dentists.</span>
              <br />
              Run for{' '}
              <span style={{ color: '#F3672A' }}>families.</span>
            </h2>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.7)',
                margin: '0 0 24px',
                maxWidth: 520,
              }}
            >
              Boca isn't a private-equity rollup wearing a friendly mask.
              It's a Las Vegas family practice that grew. Same founder. Same
              standard of care across every office. Same answer when you ask
              what something costs.
            </p>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.7)',
                margin: '0 0 40px',
                maxWidth: 520,
              }}
            >
              The same patients keep coming back — and
              bringing their kids. That's the part the marketing can't fake.
            </p>

            <a
              href="#about-more"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'white',
                textDecoration: 'none',
                paddingBottom: 6,
                borderBottom: '1px solid #F3672A',
              }}
            >
              Read our story
              <ArrowUpRight size={14} color="#F3672A" />
            </a>
          </motion.div>

          {/* RIGHT — signature facts grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 20,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Signature
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 0,
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {SIGNATURE_FACTS.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }}
                  style={{
                    padding: '32px 28px',
                    borderRight:
                      i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    borderBottom:
                      i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                      marginBottom: 14,
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    {fact.label}
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(36px, 3.6vw, 52px)',
                      fontWeight: 800,
                      color: '#F3672A',
                      lineHeight: 0.95,
                      letterSpacing: '-1.5px',
                      marginBottom: 10,
                    }}
                  >
                    {fact.value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.5,
                    }}
                  >
                    {fact.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutV3
