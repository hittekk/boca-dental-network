import { motion } from 'framer-motion'

const STEPS = [
  { num: '01', label: 'Reach out', body: 'Online form, phone, or walk-in. Pick an office.', eta: '< 1 hr', color: '#F3672A' },
  { num: '02', label: 'Plan it', body: 'Insurance verified. Treatment quoted. Before you sit.', eta: 'Same day', color: '#3B82F6' },
  { num: '03', label: 'See us', body: 'Comprehensive exam, 3D imaging, time to discuss everything.', eta: '60–90 min', color: '#F3672A' },
  { num: '04', label: 'Take care', body: 'Treatment on your terms with financing built in.', eta: 'Your pace', color: '#3B82F6' },
]

export function StepsV4() {
  return (
    <section
      id="new-patients"
      style={{
        background: '#FAFAFA',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 72px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(243,103,42,0.08)',
              border: '1px solid rgba(243,103,42,0.2)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#F3672A',
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#F3672A',
              }}
            >
              How It Works · Four Steps
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2.2px',
              color: '#0A0A0F',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            From{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              "hello"
            </span>{' '}
            to a healthier smile.
          </h2>
        </motion.div>

        {/* SVG flowing connector + cards */}
        <div style={{ position: 'relative' }}>
          <svg
            aria-hidden
            style={{
              position: 'absolute',
              top: 60,
              left: '12.5%',
              right: '12.5%',
              width: '75%',
              height: 60,
              zIndex: 0,
            }}
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 0 30 Q 250 -20 500 30 T 1000 30"
              fill="none"
              stroke="url(#step-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="step-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#F3672A" />
                <stop offset="0.5" stopColor="#FF8A50" />
                <stop offset="1" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
              position: 'relative',
              zIndex: 1,
            }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,10,15,0.06)',
                  borderRadius: 22,
                  padding: '32px 24px 26px',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(10,10,15,0.04)',
                  transition: 'box-shadow 0.25s ease',
                  position: 'relative',
                }}
              >
                {/* Step circle */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background:
                      i === 0
                        ? `linear-gradient(135deg, ${step.color} 0%, #FF8A50 100%)`
                        : `${step.color}10`,
                    border: i === 0 ? 'none' : `1.5px solid ${step.color}33`,
                    color: i === 0 ? 'white' : step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    fontSize: 18,
                    fontWeight: 800,
                    letterSpacing: '-0.5px',
                    boxShadow:
                      i === 0
                        ? `0 12px 28px ${step.color}45`
                        : 'none',
                  }}
                >
                  {step.num}
                </div>

                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: step.color,
                    marginBottom: 8,
                  }}
                >
                  {step.label}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(10,10,15,0.6)',
                    lineHeight: 1.6,
                    marginBottom: 18,
                  }}
                >
                  {step.body}
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    textTransform: 'uppercase',
                    color: step.color,
                    background: `${step.color}14`,
                    border: `1px solid ${step.color}30`,
                    borderRadius: 999,
                    padding: '5px 12px',
                  }}
                >
                  {step.eta}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StepsV4
