import { motion } from 'framer-motion'
import {
  CheckCircle2,
  ArrowUpRight,
  Building2,
  CreditCard,
  Wallet,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'

const PLANS = [
  {
    icon: Building2,
    name: 'Boca In-House',
    tag: 'Most flexible',
    down: '$0',
    term: '6–24 mo',
    credit: 'None',
    body: 'Direct monthly plans through our office. No third-party application required.',
    highlight: true,
  },
  {
    icon: CreditCard,
    name: 'CareCredit',
    tag: 'Healthcare',
    down: '$0',
    term: '6–24 mo',
    credit: 'Required',
    body: 'No-interest plans for qualified patients on purchases over $200.',
    highlight: false,
  },
  {
    icon: Wallet,
    name: 'Sunbit',
    tag: 'Quick approval',
    down: '$0',
    term: 'Flexible',
    credit: 'Soft pull',
    body: 'Quick approval for nearly anyone. No hard credit check to apply.',
    highlight: false,
  },
  {
    icon: Sparkles,
    name: 'Alphaeon',
    tag: 'Big treatments',
    down: '$0',
    term: 'Long-term',
    credit: 'Required',
    body: 'Dedicated dental financing — built for implants, Invisalign, full-mouth work.',
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
      {/* Background glows */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(22,46,122,0.4) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '0%',
          right: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
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
        {/* ── Header ─────────────────────────────────────── */}
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
            marginBottom: 48,
            paddingBottom: 22,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
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
                marginBottom: 22,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 09 ] · How To Pay
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 4.6vw, 62px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-1.8px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>Treatment that</span>
              <br />
              <span style={{ whiteSpace: 'nowrap' }}>
                <span style={{ color: '#F3672A' }}>actually</span> fits
                your paycheck.
              </span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 460,
            }}
          >
            Cost should never be the reason you put off dental care. We accept
            most insurance and offer four ways to finance — pick the one that
            works for your budget.
          </p>
        </motion.div>

        {/* ── Financing plans — 4-column pricing matrix ─── */}
        <div
          style={{
            marginBottom: 56,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 14,
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            / Four ways to finance · Pick what fits
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 0,
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {PLANS.map((plan, i) => {
              const Icon = plan.icon
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  style={{
                    background: plan.highlight
                      ? 'linear-gradient(180deg, rgba(243,103,42,0.18) 0%, rgba(243,103,42,0.04) 100%)'
                      : 'transparent',
                    borderRight:
                      i < PLANS.length - 1
                        ? '1px solid rgba(255,255,255,0.06)'
                        : 'none',
                    padding: '32px 24px 28px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Highlighted ribbon */}
                  {plan.highlight && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 14,
                        right: 14,
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: '#F3672A',
                        background: 'rgba(243,103,42,0.14)',
                        border: '1px solid rgba(243,103,42,0.4)',
                        borderRadius: 999,
                        padding: '3px 8px',
                        fontFamily:
                          'ui-monospace, "SF Mono", Menlo, monospace',
                      }}
                    >
                      Recommended
                    </div>
                  )}

                  {/* Plan index */}
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      color: 'rgba(255,255,255,0.35)',
                      marginBottom: 22,
                      fontFamily:
                        'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    / 0{i + 1}
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: plan.highlight
                        ? '#F3672A'
                        : 'rgba(243,103,42,0.12)',
                      border: plan.highlight
                        ? 'none'
                        : '1px solid rgba(243,103,42,0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 22,
                    }}
                  >
                    <Icon size={22} color={plan.highlight ? 'white' : '#F3672A'} />
                  </div>

                  {/* Name + tagline */}
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: 'white',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.3px',
                      lineHeight: 1.1,
                      marginBottom: 6,
                    }}
                  >
                    {plan.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: '#F3672A',
                      marginBottom: 18,
                      fontFamily:
                        'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    {plan.tag}
                  </div>

                  {/* Body */}
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.55,
                      marginBottom: 22,
                      minHeight: 60,
                    }}
                  >
                    {plan.body}
                  </div>

                  {/* Spec rows — pricing-table style */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                      paddingTop: 18,
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      marginTop: 'auto',
                    }}
                  >
                    {[
                      { label: 'Down', value: plan.down },
                      { label: 'Term', value: plan.term },
                      { label: 'Credit', value: plan.credit },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.4)',
                            fontFamily:
                              'ui-monospace, "SF Mono", Menlo, monospace',
                          }}
                        >
                          / {spec.label}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: 'white',
                            letterSpacing: '-0.1px',
                          }}
                        >
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── Insurance + verify — full-width strip ───── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: 24,
            alignItems: 'stretch',
          }}
        >
          {/* LEFT — insurance carriers wrapped */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '28px 30px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: 18,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Insurance accepted · 30+ plans
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px 18px',
                marginBottom: 22,
                flexGrow: 1,
              }}
            >
              {INSURANCE.map((carrier) => (
                <div
                  key={carrier}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle2
                    size={14}
                    style={{ color: '#F3672A', flexShrink: 0 }}
                  />
                  {carrier}
                </div>
              ))}
            </div>

            <div
              style={{
                paddingTop: 16,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.55,
              }}
            >
              Plus{' '}
              <span style={{ color: '#F3672A', fontWeight: 800 }}>20+</span>{' '}
              additional plans. Don't see yours? We probably take it.
            </div>
          </div>

          {/* RIGHT — verify guarantee + CTA stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                background:
                  'linear-gradient(135deg, rgba(243,103,42,0.16) 0%, rgba(243,103,42,0.04) 100%)',
                border: '1px solid rgba(243,103,42,0.3)',
                borderRadius: 16,
                padding: '20px 22px',
                display: 'grid',
                gridTemplateColumns: '52px 1fr',
                gap: 16,
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(243,103,42,0.4)',
                    '0 0 0 8px rgba(243,103,42,0)',
                    '0 0 0 0 rgba(243,103,42,0)',
                  ],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: '#F3672A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldCheck size={26} color="white" />
              </motion.div>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#F3672A',
                    marginBottom: 4,
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  / Pre-visit guarantee
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'white',
                    lineHeight: 1.35,
                    letterSpacing: '-0.2px',
                  }}
                >
                  Benefits verified. Costs estimated.
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.65)',
                      display: 'block',
                    }}
                  >
                    No surprises at checkout.
                  </span>
                </div>
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
                padding: '20px 24px',
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                boxShadow: '0 12px 28px rgba(243,103,42,0.28)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#d95a22'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#F3672A'
                el.style.transform = 'translateY(0)'
              }}
            >
              <div>
                <div style={{ fontSize: 15, marginBottom: 3 }}>
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
                  We check your benefits before you visit.
                </div>
              </div>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinancingV3
