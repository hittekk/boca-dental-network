import { motion } from 'framer-motion'

const REASONS = [
  {
    num: '01',
    title: 'Insurance + Medicaid',
    body: '30+ PPO plans accepted. Plus Nevada Medicaid and CHIP at every location — no exceptions, no second-class treatment.',
  },
  {
    num: '02',
    title: 'Same-day emergencies',
    body: 'Toothache today? Broken crown? Most Boca offices keep same-day emergency slots open every business day.',
  },
  {
    num: '03',
    title: 'Real bilingual staff',
    body: 'Hablamos español at the front desk and chairside — not a translation card or a Google Translate handoff.',
  },
  {
    num: '04',
    title: 'No surprise pricing',
    body: 'You will know what something costs before we touch your teeth. We verify your benefits before your first visit.',
  },
  {
    num: '05',
    title: 'Late + Saturday hours',
    body: 'Open until 7pm most days. Saturdays at every location. Care that fits around real work and real kids.',
  },
  {
    num: '06',
    title: 'Financing that works',
    body: 'In-house monthly plans with $0 down. CareCredit, Sunbit, and Alphaeon for bigger treatments.',
  },
]

export function WhyBocaV2() {
  return (
    <section
      id="why-boca"
      style={{ background: '#FFFAF6', padding: '120px 32px' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 48,
            alignItems: 'flex-end',
            marginBottom: 64,
          }}
        >
          <div>
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
              Six things we do differently
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2px',
                color: '#001D3D',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Built for{' '}
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                everyone
              </span>
              <br />
              who lives here.
            </h2>
          </div>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(0,29,61,0.7)',
              lineHeight: 1.65,
              margin: 0,
              paddingBottom: 8,
            }}
          >
            This is the short version of what makes Boca different. The long
            version is twenty years of word-of-mouth from Las Vegas families
            who keep coming back.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: 32,
            rowGap: 0,
          }}
        >
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
              style={{
                padding: '36px 0',
                borderTop: '1px solid rgba(0,29,61,0.08)',
                borderBottom:
                  i >= REASONS.length - 3
                    ? '1px solid rgba(0,29,61,0.08)'
                    : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: '#F3672A',
                    letterSpacing: 1,
                  }}
                >
                  {reason.num}
                </span>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#001D3D',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.4px',
                    lineHeight: 1.1,
                  }}
                >
                  {reason.title}
                </div>
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'rgba(0,29,61,0.65)',
                  lineHeight: 1.65,
                }}
              >
                {reason.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyBocaV2
