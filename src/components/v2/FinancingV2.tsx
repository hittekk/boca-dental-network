import { motion } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'

const PLANS = [
  {
    name: 'CareCredit',
    tagline: 'Healthcare financing',
    body: 'Special financing on purchases of $200+, with 6, 12, 18, or 24-month no-interest plans for qualified applicants.',
  },
  {
    name: 'Sunbit',
    tagline: 'Pay over time',
    body: 'Quick approval for nearly everyone — no credit impact to apply. Flexible monthly payments with no late fees.',
  },
  {
    name: 'Alphaeon',
    tagline: 'Smile financing',
    body: 'Dedicated dental financing with promotional terms and longer repayment options for implants and Invisalign.',
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

export function FinancingV2() {
  return (
    <section
      id="financing"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          right: -40,
          fontSize: 380,
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        $0
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <style>{`
          @media (max-width: 880px) {
            .fnv2-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 36px !important; }
            .fnv2-stats { grid-template-columns: repeat(2, 1fr) !important; }
            .fnv2-stats > div:nth-child(2) { border-right: none !important; }
            .fnv2-stats > div:nth-child(1), .fnv2-stats > div:nth-child(2) { border-bottom: 1px solid rgba(0,29,61,0.08) !important; }
            .fnv2-body { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>

        {/* ── Editorial header ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="fnv2-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 48,
          }}
        >
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
                Financing &amp; insurance
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
              Care you
              <br />
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                can
              </span>{' '}
              afford.
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
            Cost should never be the reason you delay dental care. We
            accept most insurance plans and offer flexible financing so
            quality care is always within reach.
          </p>
        </motion.div>

        {/* Stat anchors strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="fnv2-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(243,103,42,0.18)',
            borderRadius: 16,
            overflow: 'hidden',
            backdropFilter: 'blur(6px)',
            marginBottom: 64,
          }}
        >
          {[
            { value: '$0', label: 'Down payment' },
            { value: '4', label: 'Ways to pay' },
            { value: '12+', label: 'Insurance plans' },
            { value: '24mo', label: 'Same-as-cash' },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              style={{
                padding: '20px 24px',
                borderRight:
                  i < arr.length - 1
                    ? '1px solid rgba(0,29,61,0.08)'
                    : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(22px, 3vw, 36px)',
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

        {/* ── Two-column body ───────────────────────────── */}
        <div
          className="fnv2-body"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 72,
          }}
        >
          {/* LEFT — Financing options as editorial numbered list */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                marginBottom: 14,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(0,29,61,0.14)',
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: '#F3672A',
                  display: 'inline-block',
                  alignSelf: 'center',
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#001D3D',
                }}
              >
                Four ways to pay
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(0,29,61,0.5)',
                  fontFamily: 'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                }}
              >
                in-house + 3 partners
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {PLANS.map((plan, i) => {
                const numeral = String(i + 1).padStart(2, '0')
                const isLast = i === PLANS.length - 1
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '74px 1fr',
                      gap: 22,
                      padding: '24px 0',
                      borderBottom: isLast
                        ? 'none'
                        : '1px solid rgba(0,29,61,0.1)',
                    }}
                  >
                    {/* Outlined sans numeral — magazine-page-number treatment */}
                    <div
                      aria-hidden
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 6,
                        paddingTop: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'inherit',
                          fontWeight: 800,
                          fontSize: 72,
                          color: 'transparent',
                          WebkitTextStroke: '1.5px #F3672A',
                          lineHeight: 0.9,
                          letterSpacing: '-3px',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {numeral}
                      </span>
                      <span
                        style={{
                          width: 32,
                          height: 2,
                          background: '#F3672A',
                          borderRadius: 1,
                          display: 'inline-block',
                        }}
                      />
                    </div>

                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          justifyContent: 'space-between',
                          gap: 12,
                          marginBottom: 4,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 19,
                            fontWeight: 800,
                            color: '#162E7A',
                            letterSpacing: '-0.4px',
                            lineHeight: 1.15,
                            textTransform: 'uppercase',
                          }}
                        >
                          {plan.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: 1.5,
                            textTransform: 'uppercase',
                            color: '#F3672A',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {plan.tagline}
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: 1.55,
                          color: 'rgba(0,29,61,0.7)',
                          margin: 0,
                        }}
                      >
                        {plan.body}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — Insurance + verify card */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                marginBottom: 14,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(0,29,61,0.14)',
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: '#F3672A',
                  display: 'inline-block',
                  alignSelf: 'center',
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#001D3D',
                }}
              >
                Insurance we accept
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(0,29,61,0.5)',
                  fontFamily: 'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                }}
              >
                {INSURANCE.length}+ plans
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px 24px',
                paddingTop: 22,
                paddingBottom: 28,
              }}
            >
              {INSURANCE.map((carrier, i) => (
                <motion.div
                  key={carrier}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 14,
                    color: '#001D3D',
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: 'rgba(243,103,42,0.12)',
                      border: '1px solid rgba(243,103,42,0.3)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={12} style={{ color: '#F3672A' }} />
                  </span>
                  {carrier}
                </motion.div>
              ))}
            </motion.div>

            <p
              style={{
                fontSize: 13,
                color: 'rgba(0,29,61,0.55)',
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontStyle: 'italic',
                margin: '0 0 32px',
                borderTop: '1px solid rgba(0,29,61,0.1)',
                paddingTop: 18,
              }}
            >
              Plus 20+ additional plans. Don't see yours? Call us —{' '}
              <strong
                style={{ color: '#001D3D', fontStyle: 'normal' }}
              >
                we likely accept it.
              </strong>
            </p>

            {/* Verify card — peach editorial callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                background:
                  'linear-gradient(135deg, #FFF4ED 0%, #FFE4D6 100%)',
                border: '1px solid rgba(243,103,42,0.22)',
                borderRadius: 20,
                padding: '28px 28px 26px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Tiny serif accent in corner */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 18,
                  fontSize: 70,
                  fontFamily:
                    'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'rgba(243,103,42,0.18)',
                  lineHeight: 0.85,
                  letterSpacing: '-2px',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                ✓
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                  marginBottom: 10,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Before your first visit
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#001D3D',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.15,
                  margin: '0 0 12px',
                  position: 'relative',
                  zIndex: 1,
                  textTransform: 'uppercase',
                }}
              >
                We'll{' '}
                <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                  verify
                </span>{' '}
                your insurance
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: 'rgba(0,29,61,0.7)',
                  margin: '0 0 22px',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                Our team checks your benefits and walks you through your
                coverage before you arrive — so there are no surprises at
                checkout.
              </p>
              <a
                href="#consultation"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#001D3D',
                  color: 'white',
                  borderRadius: 999,
                  padding: '13px 26px',
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  zIndex: 1,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#F3672A'
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow =
                    '0 12px 24px rgba(243,103,42,0.3)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#001D3D'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                Check my coverage
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinancingV2
