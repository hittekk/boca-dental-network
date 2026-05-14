import { motion } from 'framer-motion'
import {
  MapPin,
  Clock,
  CheckCircle,
  CreditCard,
  Award,
  Users,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ORANGE = '#F3672A'

interface Reason {
  icon: LucideIcon
  stat: string
  statLabel: string
  title: string
  body: string
}

// Treysyde Homepage §4 differentiator cards (2×3) — each now anchored with a
// concrete stat callout to give the eye something to grab onto.
const REASONS: Reason[] = [
  {
    icon: MapPin,
    stat: '9',
    statLabel: 'Las Vegas clinics',
    title: '9 Locations Across Las Vegas',
    body: 'From Bonanza to Serene, we are close to where you live, work, and raise your family. No long drives, no waiting weeks for an appointment.',
  },
  {
    icon: Clock,
    stat: '6',
    statLabel: 'Days per week',
    title: 'Evening & Weekend Hours',
    body: 'We work around your schedule — not the other way around. Appointments available Monday through Saturday, including early morning and evening slots.',
  },
  {
    icon: CheckCircle,
    stat: '30+',
    statLabel: 'PPO plans accepted',
    title: 'Most Insurance Accepted',
    body: 'Boca Dental & Braces accepts most major PPO dental insurance plans. Our front desk team verifies your benefits before your appointment so there are no surprises.',
  },
  {
    icon: CreditCard,
    stat: '24mo',
    statLabel: 'CareCredit financing',
    title: 'Flexible Financing Options',
    body: "Treatment shouldn't wait because of cost. We offer CareCredit financing and in-house payment plans to make dental care accessible for every budget.",
  },
  {
    icon: Award,
    stat: '14',
    statLabel: 'Licensed providers',
    title: 'Experienced, Caring Providers',
    body: 'Our team includes general dentists, a board-eligible orthodontist, oral surgeons, periodontists, and pediatric specialists — all under one practice umbrella.',
  },
  {
    icon: Users,
    stat: 'EN · ES',
    statLabel: 'Languages spoken',
    title: 'Bilingual Staff',
    body: "We serve Las Vegas' full community. Spanish-speaking staff are available at multiple locations to ensure every patient feels understood and at ease.",
  },
]

export function WhyBoca() {
  return (
    <section
      id="why-boca"
      style={{
        background: '#001D3D',
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft orange glow orb — depth */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      {/* Subtle grid lines for tech texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '120px 100%',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px 6px 10px',
              background: 'rgba(243,103,42,0.10)',
              border: '1px solid rgba(243,103,42,0.28)',
              borderRadius: 999,
              marginBottom: 18,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: ORANGE,
                boxShadow: '0 0 10px rgba(243,103,42,0.6)',
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: ORANGE,
              }}
            >
              Why Boca
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: 'white',
              margin: '0 0 14px',
              letterSpacing: '-0.5px',
              lineHeight: 1.05,
            }}
          >
            Why Las Vegas chooses{' '}
            <span style={{ display: 'block', color: ORANGE, fontStyle: 'italic' }}>
              Boca Dental &amp; Braces.
            </span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: 560,
              margin: '0 auto',
              lineHeight: 1.65,
              textWrap: 'balance' as React.CSSProperties['textWrap'],
            }}
          >
            We built Boca Dental around one idea — every Las Vegas family
            deserves world-class dental care at a price they can actually afford.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
          }}
        >
          <style>{`
            @media (max-width: 980px) {
              .why-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
            }
            @media (max-width: 580px) {
              .why-grid { grid-template-columns: 1fr !important; }
            }
            .why-card { transition: all 0.3s cubic-bezier(0.0,0.0,0.2,1.0); }
            .why-card:hover {
              transform: translateY(-4px);
              border-color: rgba(243,103,42,0.4) !important;
              box-shadow: 0 18px 44px rgba(0,0,0,0.4) !important;
            }
            .why-card:hover .why-icon-tile {
              background: rgba(243,103,42,0.22) !important;
              border-color: rgba(243,103,42,0.5) !important;
              transform: rotate(-6deg);
            }
            .why-card:hover .why-watermark { opacity: 0.10 !important; transform: rotate(-8deg) scale(1.05); }
          `}</style>

          {REASONS.map((reason, i) => {
            const Icon = reason.icon
            const idx = String(i + 1).padStart(2, '0')
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="why-card"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderTop: `2px solid ${ORANGE}`,
                  borderRadius: 16,
                  padding: '24px 24px 22px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 280,
                }}
              >
                {/* Watermark icon — large faint version in bottom-right */}
                <div
                  aria-hidden
                  className="why-watermark"
                  style={{
                    position: 'absolute',
                    bottom: -28,
                    right: -22,
                    opacity: 0.06,
                    transition: 'all 0.35s ease',
                    pointerEvents: 'none',
                    color: ORANGE,
                  }}
                >
                  <Icon size={170} strokeWidth={1.4} />
                </div>

                {/* Top row: icon + mono index */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 18,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div
                    className="why-icon-tile"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'rgba(243,103,42,0.12)',
                      border: '1px solid rgba(243,103,42,0.25)',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      color: ORANGE,
                    }}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      color: 'rgba(255,255,255,0.35)',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    / {idx}
                  </div>
                </div>

                {/* Stat callout — big number anchor */}
                <div
                  style={{
                    marginBottom: 14,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(28px, 3vw, 38px)',
                      fontWeight: 800,
                      color: ORANGE,
                      letterSpacing: '-1.2px',
                      lineHeight: 1,
                      fontFamily:
                        reason.stat.includes('·') || reason.stat.length > 4
                          ? 'ui-monospace, "SF Mono", Menlo, monospace'
                          : 'inherit',
                    }}
                  >
                    {reason.stat}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.5)',
                      marginTop: 4,
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    {reason.statLabel}
                  </div>
                </div>

                {/* Title + body */}
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: 'white',
                    marginBottom: 10,
                    letterSpacing: '-0.2px',
                    lineHeight: 1.15,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {reason.title}
                </div>
                <div
                  style={{
                    fontSize: 13.5,
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.65,
                    position: 'relative',
                    zIndex: 1,
                    flex: 1,
                  }}
                >
                  {reason.body}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: 56,
            padding: '32px 40px',
            background:
              'linear-gradient(135deg, rgba(243,103,42,0.14) 0%, rgba(243,103,42,0.06) 100%)',
            border: '1px solid rgba(243,103,42,0.28)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="why-cta-strip"
        >
          <style>{`
            @media (max-width: 720px) {
              .why-cta-strip { flex-direction: column !important; align-items: stretch !important; text-align: center; padding: 28px 28px !important; }
              .why-cta-strip > a { width: 100% !important; justify-content: center !important; }
            }
          `}</style>
          <div>
            <div
              style={{
                fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'white',
                letterSpacing: '-0.3px',
                lineHeight: 1.2,
                marginBottom: 6,
              }}
            >
              Ready to experience the Boca difference?
            </div>
            <div
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              New patients welcome at all 9 Las Vegas locations.
            </div>
          </div>
          <a
            href="#locations"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: ORANGE,
              color: 'white',
              borderRadius: 8,
              padding: '14px 28px',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              boxShadow: '0 12px 28px rgba(243,103,42,0.4)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#d95a22'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = ORANGE
              el.style.transform = 'translateY(0)'
            }}
          >
            Book Appointment
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyBoca
