import { motion } from 'framer-motion'
import { CheckCircle, Wallet, CreditCard, Sparkles, Building2, ArrowRight } from 'lucide-react'

const PLANS = [
  {
    icon: Building2,
    name: 'In-House Plans',
    tagline: 'Boca Membership',
    body: 'Affordable monthly payment plans direct through our office — no third-party application required. $0 down on most treatments.',
    highlight: true,
  },
  {
    icon: CreditCard,
    name: 'CareCredit',
    tagline: 'Healthcare Financing',
    body: 'Special financing options on purchases of $200+, with 6, 12, 18, or 24-month no-interest plans for qualified applicants.',
    highlight: false,
  },
  {
    icon: Wallet,
    name: 'Sunbit',
    tagline: 'Pay Over Time',
    body: 'Quick approval for nearly everyone — no impact to your credit score to apply. Flexible monthly payments with no late fees.',
    highlight: false,
  },
  {
    icon: Sparkles,
    name: 'Alphaeon',
    tagline: 'Smile Financing',
    body: 'Dedicated dental financing with promotional terms and longer repayment options for larger treatment plans like implants and Invisalign.',
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

export function Financing() {
  return (
    <section
      id="financing"
      style={{ background: '#F7F7FA', padding: '96px 32px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#F3672A',
              marginBottom: 10,
            }}
          >
            Financing &amp; Insurance
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#162E7A',
              margin: '0 0 12px',
              letterSpacing: '-0.5px',
            }}
          >
            Care You Can Afford
          </h2>
          <p
            style={{
              fontSize: 15,
              color: '#64748B',
              maxWidth: 520,
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Cost should never be the reason you delay dental care. We
            accept most insurance plans and offer flexible financing
            so quality care is always within reach.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            alignItems: 'flex-start',
          }}
        >
          {/* Left — financing plans */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#162E7A',
                marginBottom: 16,
              }}
            >
              Financing Options
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PLANS.map((plan, i) => {
                const Icon = plan.icon
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    style={{
                      background: plan.highlight ? '#162E7A' : 'white',
                      border: `1px solid ${
                        plan.highlight ? '#162E7A' : '#E2E8F0'
                      }`,
                      borderRadius: 14,
                      padding: '20px 22px',
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      boxShadow: plan.highlight
                        ? '0 8px 24px rgba(22,46,122,0.18)'
                        : '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: plan.highlight
                          ? 'rgba(243,103,42,0.18)'
                          : '#FFF4F0',
                        border: `1px solid ${
                          plan.highlight
                            ? 'rgba(243,103,42,0.3)'
                            : 'rgba(243,103,42,0.15)'
                        }`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} color="#F3672A" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: 12,
                          marginBottom: 4,
                          flexWrap: 'wrap',
                        }}
                      >
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            color: plan.highlight ? 'white' : '#162E7A',
                            letterSpacing: '-0.2px',
                            lineHeight: 1.1,
                          }}
                        >
                          {plan.name}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: plan.highlight
                              ? 'rgba(255,255,255,0.5)'
                              : '#94A3B8',
                            textTransform: 'uppercase',
                            letterSpacing: 1.5,
                          }}
                        >
                          {plan.tagline}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: plan.highlight
                            ? 'rgba(255,255,255,0.7)'
                            : '#64748B',
                          lineHeight: 1.65,
                        }}
                      >
                        {plan.body}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — insurance + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#162E7A',
                marginBottom: 16,
              }}
            >
              Insurance We Accept
            </div>

            <div
              style={{
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: 14,
                padding: '20px 24px',
                marginBottom: 20,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px 20px',
                }}
              >
                {INSURANCE.map((plan, i) => (
                  <motion.div
                    key={plan}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontSize: 13,
                      color: '#0F172A',
                      fontWeight: 500,
                    }}
                  >
                    <CheckCircle
                      size={14}
                      style={{ color: '#F3672A', flexShrink: 0 }}
                    />
                    {plan}
                  </motion.div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: '1px solid #E2E8F0',
                  fontSize: 12,
                  color: '#94A3B8',
                  lineHeight: 1.6,
                }}
              >
                Plus 20+ additional plans. Do not see yours? Call us —
                we likely accept it.
              </div>
            </div>

            {/* Verify CTA box */}
            <div
              style={{
                background: 'rgba(243,103,42,0.08)',
                border: '1px solid rgba(243,103,42,0.25)',
                borderRadius: 14,
                padding: '24px 26px',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#162E7A',
                  letterSpacing: '-0.3px',
                  marginBottom: 6,
                }}
              >
                Verify My Insurance
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: '#64748B',
                  lineHeight: 1.6,
                  marginBottom: 16,
                }}
              >
                We will check your benefits and walk you through your
                coverage before your first visit — no surprises at checkout.
              </div>
              <a
                href="tel:7024560005"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#F3672A',
                  color: 'white',
                  borderRadius: 8,
                  padding: '11px 24px',
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#d95a22')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#F3672A')
                }
              >
                Check My Coverage
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Financing
