import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Zap,
  Languages,
  Receipt,
  Clock,
  Wallet,
  ArrowUpRight,
} from 'lucide-react'

const REASONS = [
  {
    num: '01',
    icon: ShieldCheck,
    pill: 'Coverage',
    title: 'Insurance + Medicaid',
    body: '30+ PPO plans accepted. Plus Nevada Medicaid and CHIP at every location — no exceptions, no second-class treatment.',
  },
  {
    num: '02',
    icon: Zap,
    pill: 'Same-day',
    title: 'Same-day emergencies',
    body: 'Toothache today? Broken crown? Most Boca offices keep same-day emergency slots open every business day.',
  },
  {
    num: '03',
    icon: Languages,
    pill: 'Bilingual',
    title: 'Real bilingual staff',
    body: 'Hablamos español at the front desk and chairside — not a translation card or a Google Translate handoff.',
  },
  {
    num: '04',
    icon: Receipt,
    pill: 'No surprises',
    title: 'No surprise pricing',
    body: 'You will know what something costs before we touch your teeth. We verify your benefits before your first visit.',
  },
  {
    num: '05',
    icon: Clock,
    pill: 'Real hours',
    title: 'Late + Saturday hours',
    body: 'Open until 7pm most days. Saturdays at every location. Care that fits around real work and real kids.',
  },
  {
    num: '06',
    icon: Wallet,
    pill: 'Financing',
    title: 'Financing that works',
    body: 'In-house monthly plans with $0 down. CareCredit, Sunbit, and Alphaeon for bigger treatments.',
  },
]

const STAT_ANCHORS = [
  { value: '20yr', label: 'In Las Vegas' },
  { value: '9', label: 'Offices' },
  { value: '30+', label: 'Insurance plans' },
  { value: 'EN·ES', label: 'Every chair' },
]

export function WhyBocaV2() {
  return (
    <section
      id="why-boca"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial backdrop word — "WHY" */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 80,
          left: -30,
          fontSize: 'clamp(180px, 22vw, 320px)',
          fontWeight: 800,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          letterSpacing: '-12px',
          pointerEvents: 'none',
          userSelect: 'none',
          textTransform: 'uppercase',
        }}
      >
        WHY
      </div>

      {/* Subtle radial accent — top right */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -100,
          right: -80,
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.10) 0%, rgba(243,103,42,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="whyv2-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 48,
            alignItems: 'flex-end',
            marginBottom: 56,
          }}
        >
          <style>{`
            @media (max-width: 880px) {
              .whyv2-header { grid-template-columns: 1fr !important; gap: 24px !important; }
              .whyv2-grid { grid-template-columns: 1fr !important; }
              .whyv2-stats { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 980px) and (min-width: 881px) {
              .whyv2-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            .whyv2-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
            .whyv2-card:hover { transform: translateY(-6px); box-shadow: 0 22px 50px rgba(0,29,61,0.10); border-color: rgba(243,103,42,0.35) !important; }
            .whyv2-card:hover .whyv2-accent-bar { width: 100% !important; }
            .whyv2-card:hover .whyv2-icon-wrap { background: #F3672A !important; color: white !important; transform: rotate(-6deg) scale(1.05); }
            .whyv2-card:hover .whyv2-arrow { opacity: 1 !important; transform: translate(0, 0) !important; }
          `}</style>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 1,
                  background: '#F3672A',
                  display: 'inline-block',
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                Six things we do differently
              </div>
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
              borderLeft: '2px solid #F3672A',
              paddingLeft: 18,
              fontStyle: 'italic',
            }}
          >
            This is the short version of what makes Boca different. The long
            version is word-of-mouth from Las Vegas families
            who keep coming back.
          </p>
        </motion.div>

        {/* Stat anchors strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="whyv2-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            marginBottom: 48,
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(243,103,42,0.18)',
            borderRadius: 16,
            overflow: 'hidden',
            backdropFilter: 'blur(6px)',
          }}
        >
          {STAT_ANCHORS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '20px 24px',
                borderRight:
                  i < STAT_ANCHORS.length - 1
                    ? '1px solid rgba(0,29,61,0.08)'
                    : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 800,
                  color: '#F3672A',
                  letterSpacing: '-1px',
                  lineHeight: 1,
                  fontStyle: 'italic',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(0,29,61,0.55)',
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Reason cards */}
        <div
          className="whyv2-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
          }}
        >
          {REASONS.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.45 }}
                className="whyv2-card"
                style={{
                  position: 'relative',
                  background: 'white',
                  border: '1px solid rgba(0,29,61,0.08)',
                  borderRadius: 16,
                  padding: '28px 26px 26px',
                  overflow: 'hidden',
                  cursor: 'default',
                  boxShadow: '0 2px 8px rgba(0,29,61,0.03)',
                }}
              >
                {/* Top orange accent bar (grows on hover) */}
                <div
                  className="whyv2-accent-bar"
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 3,
                    width: 48,
                    background: 'linear-gradient(90deg, #F3672A 0%, #FF8A50 100%)',
                    transition: 'width 0.4s ease',
                  }}
                />

                {/* Top row: icon + index */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 22,
                  }}
                >
                  <div
                    className="whyv2-icon-wrap"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: '#FFF4ED',
                      border: '1px solid rgba(243,103,42,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F3672A',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        color: 'rgba(0,29,61,0.4)',
                        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                      }}
                    >
                      N° {reason.num}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        color: '#F3672A',
                        background: 'rgba(243,103,42,0.10)',
                        border: '1px solid rgba(243,103,42,0.22)',
                        borderRadius: 999,
                        padding: '3px 8px',
                      }}
                    >
                      {reason.pill}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#001D3D',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.4px',
                    lineHeight: 1.1,
                    marginBottom: 10,
                  }}
                >
                  {reason.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(0,29,61,0.65)',
                    lineHeight: 1.65,
                    marginBottom: 18,
                  }}
                >
                  {reason.body}
                </div>

                {/* Bottom hairline + arrow that appears on hover */}
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: '1px solid rgba(0,29,61,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(0,29,61,0.45)',
                    }}
                  >
                    The Boca way
                  </span>
                  <span
                    className="whyv2-arrow"
                    aria-hidden
                    style={{
                      color: '#F3672A',
                      opacity: 0,
                      transform: 'translate(-6px, 4px)',
                      transition: 'all 0.3s ease',
                      display: 'inline-flex',
                    }}
                  >
                    <ArrowUpRight size={16} strokeWidth={2.5} />
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyBocaV2
