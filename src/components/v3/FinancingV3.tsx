import { motion } from 'framer-motion'
import { CheckCircle2, ArrowUpRight, Building2, CreditCard, Wallet, Sparkles } from 'lucide-react'

const PLANS = [
  {
    icon: Building2,
    name: 'Boca In-House',
    tag: 'Most flexible',
    body: 'Direct monthly plans with $0 down on most treatments. No third-party application.',
    highlight: true,
  },
  {
    icon: CreditCard,
    name: 'CareCredit',
    tag: 'Healthcare',
    body: '6, 12, 18, or 24-month no-interest financing on purchases over $200 for qualified patients.',
    highlight: false,
  },
  {
    icon: Wallet,
    name: 'Sunbit',
    tag: 'Quick approval',
    body: 'Pay over time. No hard credit check to apply. Flexible monthly payments, no late fees.',
    highlight: false,
  },
  {
    icon: Sparkles,
    name: 'Alphaeon',
    tag: 'Big treatments',
    body: 'Dedicated dental financing with longer terms — built for implants, Invisalign, full mouth.',
    highlight: false,
  },
]

const INSURANCE_LEFT = [
  'Delta Dental',
  'MetLife',
  'Cigna',
  'Aetna',
  'United Healthcare',
  'Guardian',
]
const INSURANCE_RIGHT = [
  'Humana',
  'Anthem BCBS',
  'Ameritas',
  'Principal',
  'Nevada Medicaid',
  'Nevada CHIP',
]

export function FinancingV3() {
  return (
    <section
      id="financing"
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
          top: '20%',
          left: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(22,46,122,0.5) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

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
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 64, maxWidth: 760 }}
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
            [ 09 ] · How To Pay
          </div>
          <h2
            style={{
              fontSize: 'clamp(44px, 5.6vw, 76px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2.2px',
              color: 'white',
              margin: '0 0 28px',
              textTransform: 'uppercase',
            }}
          >
            Treatment that
            <br />
            <span style={{ color: '#F3672A' }}>actually</span> fits your
            <br />
            paycheck.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 600,
            }}
          >
            Cost should never be the reason you put off dental care. We accept
            most insurance and offer four ways to finance — pick the one that
            works for your budget.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 32,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — financing plan stack */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 8,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Financing options
            </div>

            {PLANS.map((plan, i) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  style={{
                    background: plan.highlight
                      ? 'linear-gradient(135deg, rgba(243,103,42,0.18) 0%, rgba(243,103,42,0.06) 100%)'
                      : 'rgba(255,255,255,0.03)',
                    border: plan.highlight
                      ? '1px solid rgba(243,103,42,0.4)'
                      : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 16,
                    padding: '24px 26px',
                    display: 'grid',
                    gridTemplateColumns: '52px 1fr auto',
                    gap: 18,
                    alignItems: 'center',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: plan.highlight
                        ? '#F3672A'
                        : 'rgba(243,103,42,0.12)',
                      border: plan.highlight ? 'none' : '1px solid rgba(243,103,42,0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} color="white" />
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 17,
                          fontWeight: 800,
                          color: 'white',
                          textTransform: 'uppercase',
                          letterSpacing: '-0.2px',
                        }}
                      >
                        {plan.name}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: 1.2,
                          textTransform: 'uppercase',
                          color: '#F3672A',
                          background: 'rgba(243,103,42,0.12)',
                          border: '1px solid rgba(243,103,42,0.25)',
                          borderRadius: 999,
                          padding: '3px 8px',
                          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                        }}
                      >
                        {plan.tag}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.65)',
                        lineHeight: 1.6,
                      }}
                    >
                      {plan.body}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* RIGHT — insurance + verify */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 12,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Insurance accepted
            </div>

            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '28px 30px',
                marginBottom: 14,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                {[INSURANCE_LEFT, INSURANCE_RIGHT].map((col, idx) => (
                  <div
                    key={idx}
                    style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
                  >
                    {col.map((p) => (
                      <div
                        key={p}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          fontSize: 13,
                          color: 'rgba(255,255,255,0.85)',
                          fontWeight: 500,
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
                ))}
              </div>

              <div
                style={{
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.6,
                }}
              >
                Plus 20+ additional plans. Don't see yours? We probably take it.
              </div>
            </div>

            <a
              href="#request-consultation"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                background: '#F3672A',
                color: 'white',
                borderRadius: 16,
                padding: '22px 26px',
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                boxShadow: '0 12px 28px rgba(243,103,42,0.28)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#d95a22'
                ;(e.currentTarget as HTMLElement).style.transform =
                  'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#F3672A'
                ;(e.currentTarget as HTMLElement).style.transform =
                  'translateY(0)'
              }}
            >
              <div>
                <div style={{ fontSize: 16, marginBottom: 4 }}>
                  Verify my insurance
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: 0.4,
                    textTransform: 'none',
                  }}
                >
                  We'll check your benefits before you visit.
                </div>
              </div>
              <ArrowUpRight size={20} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FinancingV3
