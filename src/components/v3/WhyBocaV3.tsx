import { motion } from 'framer-motion'

const PILLARS = [
  {
    num: '01',
    title: 'Insurance + Medicaid',
    body: '30+ PPO plans accepted. Plus Nevada Medicaid and CHIP at every location.',
  },
  {
    num: '02',
    title: 'Same-day care',
    body: 'Most offices keep emergency slots open every business day. Toothache today gets seen today.',
  },
  {
    num: '03',
    title: 'Bilingual team',
    body: 'Hablamos español at every front desk and chairside. Not a translation card — real people.',
  },
  {
    num: '04',
    title: 'Honest pricing',
    body: 'You will know what something costs before we touch your teeth. No surprise invoices.',
  },
  {
    num: '05',
    title: 'Late + Saturday hours',
    body: 'Open until 7pm most days. Saturdays at every location. Care that fits real schedules.',
  },
  {
    num: '06',
    title: 'Built-in financing',
    body: 'In-house plans with $0 down. CareCredit, Sunbit, Alphaeon for bigger treatments.',
  },
]

export function WhyBocaV3() {
  return (
    <section
      id="why-boca"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 72,
          }}
        >
          <div>
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
              [ 04 ] · The Difference
            </div>
            <h2
              style={{
                fontSize: 'clamp(44px, 5.6vw, 76px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2.2px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Six things we
              <br />
              do <span style={{ color: '#F3672A' }}>differently.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 460,
            }}
          >
            The short version of what makes Boca different. The long version is
            twenty years of word-of-mouth from Las Vegas families who keep
            coming back.
          </p>
        </motion.div>

        {/* Pillar grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'background 0.25s ease, border-color 0.25s ease',
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: 'rgba(255,255,255,0.45)',
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  / {pillar.num}
                </span>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#F3672A',
                    boxShadow: '0 0 0 4px rgba(243,103,42,0.2)',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'white',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.1,
                  marginBottom: 14,
                }}
              >
                {pillar.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.65,
                }}
              >
                {pillar.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyBocaV3
