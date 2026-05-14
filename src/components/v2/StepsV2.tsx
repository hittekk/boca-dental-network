import { motion } from 'framer-motion'
import {
  Phone,
  PhoneCall,
  ClipboardList,
  Stethoscope,
  FileCheck,
  ArrowUpRight,
} from 'lucide-react'

const STEPS = [
  {
    label: 'First Call',
    title: 'Book your appointment',
    body: 'Call any Boca location or book online. Most clinics offer same-day or next-day visits for new patients.',
    icon: PhoneCall,
    duration: '~ 2 min',
  },
  {
    label: 'Before your visit',
    title: 'Complete your forms',
    body: 'Fill out new-patient paperwork in advance so we can verify insurance and shorten your time in the chair.',
    icon: ClipboardList,
    duration: '~ 8 min',
  },
  {
    label: 'In the chair',
    title: 'Meet your dentist',
    body: 'A full exam, X-rays, and a relaxed conversation about your goals. No pressure, no surprises.',
    icon: Stethoscope,
    duration: '45–60 min',
  },
  {
    label: 'After',
    title: 'Your treatment plan',
    body: 'A clear, written plan built around your needs and your budget — with financing options if you want them.',
    icon: FileCheck,
    duration: 'Same day',
  },
]

const STAT_ANCHORS = [
  { value: '4', label: 'Simple steps' },
  { value: 'Same-day', label: 'Most new patients' },
  { value: '24/7', label: 'Online booking' },
  { value: '0', label: 'Surprises' },
]

export function StepsV2() {
  return (
    <section
      id="steps"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow accent — bottom left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -120,
          left: -80,
          width: 460,
          height: 460,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.10) 0%, rgba(243,103,42,0) 70%)',
          pointerEvents: 'none',
        }}
      />

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
            .stepsv2-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 36px !important; }
            .stepsv2-stats { grid-template-columns: repeat(2, 1fr) !important; }
            .stepsv2-stats > div:nth-child(2) { border-right: none !important; }
            .stepsv2-stats > div:nth-child(1), .stepsv2-stats > div:nth-child(2) { border-bottom: 1px solid rgba(0,29,61,0.08) !important; }
            .stepsv2-cards { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 980px) and (min-width: 881px) {
            .stepsv2-cards { grid-template-columns: repeat(2, 1fr) !important; }
          }
          .stepsv2-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }
          .stepsv2-card:hover { transform: translateY(-6px); box-shadow: 0 22px 50px rgba(0,29,61,0.10); border-color: rgba(243,103,42,0.4) !important; }
          .stepsv2-card:hover .stepsv2-icon { background: #F3672A !important; color: white !important; transform: rotate(-6deg) scale(1.05); }
          .stepsv2-card:hover .stepsv2-arrow { opacity: 1 !important; transform: translate(0, 0) !important; }
        `}</style>

        {/* ── Editorial header ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="stepsv2-header"
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
                The Boca way
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
              Four steps.
              <br />
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                No stress.
              </span>
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
            From your first call to your first cleaning, we've cut every
            unnecessary step. You'll know what to expect at every visit.
          </p>
        </motion.div>

        {/* Stat anchors strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="stepsv2-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(243,103,42,0.18)',
            borderRadius: 16,
            overflow: 'hidden',
            backdropFilter: 'blur(6px)',
            marginBottom: 48,
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

        {/* ── Four step cards in a row ──────────────────── */}
        <div
          className="stepsv2-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18,
          }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="stepsv2-card"
                style={{
                  position: 'relative',
                  background: 'white',
                  borderRadius: 18,
                  border: '1px solid rgba(0,29,61,0.08)',
                  padding: '28px 24px 24px',
                  overflow: 'hidden',
                  minHeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 8px rgba(0,29,61,0.03)',
                }}
              >
                {/* Top orange accent bar */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 3,
                    width: 48,
                    background: 'linear-gradient(90deg, #F3672A 0%, #FF8A50 100%)',
                  }}
                />

                {/* Top row: icon + duration chip */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 22,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div
                    className="stepsv2-icon"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: '#FFF4ED',
                      border: '1px solid rgba(243,103,42,0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#F3672A',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: '#F3672A',
                      background: 'rgba(243,103,42,0.10)',
                      border: '1px solid rgba(243,103,42,0.22)',
                      borderRadius: 999,
                      padding: '3px 8px',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {step.duration}
                  </span>
                </div>

                {/* Step label eyebrow */}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#F3672A',
                    marginBottom: 10,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {step.label}
                </div>

                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#001D3D',
                    margin: '0 0 12px',
                    letterSpacing: '-0.4px',
                    lineHeight: 1.15,
                    textTransform: 'uppercase',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: 'rgba(0,29,61,0.65)',
                    lineHeight: 1.6,
                    margin: '0 0 18px',
                    position: 'relative',
                    zIndex: 1,
                    flex: 1,
                  }}
                >
                  {step.body}
                </p>

                {/* Bottom row: hairline + reveal arrow */}
                <div
                  style={{
                    paddingTop: 12,
                    borderTop: '1px solid rgba(0,29,61,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(0,29,61,0.45)',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    Step {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="stepsv2-arrow"
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

        {/* ── Bottom CTA row ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 18,
            marginTop: 64,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="tel:7024560005"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#001D3D',
              color: 'white',
              borderRadius: 999,
              padding: '14px 28px',
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#F3672A'
              ;(e.currentTarget as HTMLElement).style.transform =
                'translateY(-2px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow =
                '0 12px 24px rgba(243,103,42,0.3)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#001D3D'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            <Phone size={14} />
            Call to book — (702) 456-0005
          </a>
          <span
            style={{
              fontSize: 13,
              color: 'rgba(0,29,61,0.5)',
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontStyle: 'italic',
            }}
          >
            or book online at any location page
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default StepsV2
