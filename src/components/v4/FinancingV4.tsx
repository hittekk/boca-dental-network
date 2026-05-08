import { motion } from 'framer-motion'
import { CheckCircle2, ArrowUpRight, Building2, CreditCard, Wallet, Sparkles } from 'lucide-react'

const PLANS = [
  {
    icon: Building2,
    name: 'Boca In-House',
    tag: 'Most flexible',
    body: 'Direct monthly plans with $0 down on most treatments.',
    accent: '#F3672A',
    accentEnd: '#FF8A50',
    highlight: true,
  },
  {
    icon: CreditCard,
    name: 'CareCredit',
    tag: 'Healthcare',
    body: '6, 12, 18, or 24-month no-interest financing on $200+.',
    accent: '#3B82F6',
    accentEnd: '#60A5FA',
    highlight: false,
  },
  {
    icon: Wallet,
    name: 'Sunbit',
    tag: 'Quick approval',
    body: 'Pay over time, no hard credit check, no late fees.',
    accent: '#3B82F6',
    accentEnd: '#60A5FA',
    highlight: false,
  },
  {
    icon: Sparkles,
    name: 'Alphaeon',
    tag: 'Big treatments',
    body: 'Longer terms — built for implants, Invisalign, full mouth.',
    accent: '#3B82F6',
    accentEnd: '#60A5FA',
    highlight: false,
  },
]

const INSURANCE = [
  'Delta Dental',
  'MetLife',
  'Cigna',
  'Aetna',
  'United Healthcare',
  'Guardian',
  'Humana',
  'Anthem BCBS',
  'Ameritas',
  'Principal',
  'Nevada Medicaid',
  'Nevada CHIP',
]

export function FinancingV4() {
  return (
    <section
      id="financing"
      style={{
        background: '#FAFAFA',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 60%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 64px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'white',
              border: '1px solid rgba(243,103,42,0.18)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 24,
              boxShadow: '0 4px 12px rgba(243,103,42,0.06)',
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
              How To Pay · 4 Plans · 12+ Insurances
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
            Treatment that
            <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #F3672A 0%, #3B82F6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              actually fits
            </span>{' '}
            your paycheck.
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 28,
            alignItems: 'flex-start',
          }}
        >
          {/* Plans */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 14,
            }}
          >
            {PLANS.map((plan, i) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: plan.highlight
                      ? `linear-gradient(135deg, ${plan.accent} 0%, ${plan.accentEnd} 100%)`
                      : 'white',
                    color: plan.highlight ? 'white' : '#0A0A0F',
                    borderRadius: 22,
                    padding: '28px 26px',
                    border: plan.highlight
                      ? 'none'
                      : '1px solid rgba(10,10,15,0.06)',
                    boxShadow: plan.highlight
                      ? `0 24px 48px ${plan.accent}40`
                      : '0 4px 12px rgba(10,10,15,0.04)',
                    transition: 'box-shadow 0.25s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: plan.highlight
                        ? 'rgba(255,255,255,0.2)'
                        : `${plan.accent}14`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 22,
                    }}
                  >
                    <Icon size={22} color={plan.highlight ? 'white' : plan.accent} />
                  </div>

                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: '-0.3px',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                      color: plan.highlight ? 'white' : '#0A0A0F',
                    }}
                  >
                    {plan.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: plan.highlight
                        ? 'rgba(255,255,255,0.85)'
                        : plan.accent,
                      marginBottom: 12,
                    }}
                  >
                    {plan.tag}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: plan.highlight ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,15,0.6)',
                      lineHeight: 1.6,
                    }}
                  >
                    {plan.body}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Insurance + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                background: 'white',
                border: '1px solid rgba(10,10,15,0.06)',
                borderRadius: 22,
                padding: '28px 30px',
                marginBottom: 14,
                boxShadow: '0 4px 16px rgba(10,10,15,0.04)',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#3B82F6',
                  marginBottom: 18,
                }}
              >
                Insurance Accepted
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px 16px',
                }}
              >
                {INSURANCE.map((p) => (
                  <div
                    key={p}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 13,
                      color: '#0A0A0F',
                      fontWeight: 600,
                    }}
                  >
                    <CheckCircle2
                      size={14}
                      style={{ color: '#F3672A', flexShrink: 0 }}
                    />
                    {p}
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 18,
                  paddingTop: 14,
                  borderTop: '1px solid rgba(10,10,15,0.06)',
                  fontSize: 12,
                  color: 'rgba(10,10,15,0.5)',
                  lineHeight: 1.55,
                }}
              >
                Plus 20+ additional plans. Don't see yours? We probably take it.
              </div>
            </div>

            <motion.a
              href="#request-consultation"
              whileHover={{ scale: 1.02, y: -2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background:
                  'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                color: 'white',
                borderRadius: 22,
                padding: '22px 26px',
                textDecoration: 'none',
                boxShadow: '0 16px 36px rgba(243,103,42,0.32)',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    letterSpacing: 0.4,
                    textTransform: 'uppercase',
                    marginBottom: 4,
                  }}
                >
                  Verify my insurance
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  We check your benefits before you visit.
                </div>
              </div>
              <ArrowUpRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FinancingV4
