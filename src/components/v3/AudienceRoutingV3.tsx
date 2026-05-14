import { motion } from 'framer-motion'
import { Users, Baby, Sparkles, Siren, Brackets, ArrowUpRight } from 'lucide-react'

const ROUTES = [
  {
    icon: Users,
    label: 'New family',
    title: 'New family patient',
    body: 'Exams, cleanings, general care.',
    href: '/general-dentistry/',
  },
  {
    icon: Baby,
    label: 'Pediatric',
    title: 'Parent / child patient',
    body: 'Boca Kids — for every age.',
    href: '/pediatric-dentistry/',
  },
  {
    icon: Sparkles,
    label: 'Cosmetic',
    title: 'Adult / cosmetic',
    body: 'Whitening, veneers, smile makeover.',
    href: '/cosmetic-dentistry/',
  },
  {
    icon: Siren,
    label: 'Same-day',
    title: 'Dental emergency',
    body: 'Same-day care, pain relief.',
    href: '/general-dentistry/emergency-dental-care/',
  },
  {
    icon: Brackets,
    label: 'Ortho',
    title: 'Orthodontic patient',
    body: 'Invisalign, braces, retainers.',
    href: '/orthodontics/',
  },
]

export function AudienceRoutingV3() {
  return (
    <section
      id="how-can-we-help"
      style={{
        background: '#0A0A0F',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid pattern */}
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

      {/* Orange glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 500,
          background:
            'radial-gradient(ellipse, rgba(243,103,42,0.08) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 32,
            marginBottom: 56,
            paddingBottom: 22,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                fontFamily:
                  'ui-monospace, "SF Mono", Menlo, monospace',
                marginBottom: 12,
              }}
            >
              / Audience routing · 05 paths
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 800,
                color: 'white',
                lineHeight: 0.95,
                letterSpacing: '-1.5px',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              How can we help —{' '}
              <span style={{ color: '#F3672A' }}>pick a path.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.55,
              margin: 0,
              maxWidth: 380,
              alignSelf: 'flex-end',
            }}
          >
            Skip the mega-menu. Each route drops you on the right page in two
            seconds.
          </p>
        </motion.div>

        {/* ── 5 cards — modern tech tiles ────────────────── */}
        <div
          className="audience-routing-v3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 980px) {
              .audience-routing-v3 { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 520px) {
              .audience-routing-v3 { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {ROUTES.map((route, i) => {
            const Icon = route.icon
            const numeral = String(i + 1).padStart(2, '0')
            return (
              <motion.a
                key={route.title}
                href={route.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: '24px 22px 22px',
                  textDecoration: 'none',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 260,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(243,103,42,0.06)'
                  el.style.borderColor = 'rgba(243,103,42,0.35)'
                  el.style.transform = 'translateY(-6px)'
                  el.style.boxShadow =
                    '0 20px 48px rgba(243,103,42,0.18)'
                  const arrow = el.querySelector(
                    '[data-arrow]',
                  ) as HTMLElement
                  if (arrow) {
                    arrow.style.background = '#F3672A'
                    arrow.style.color = 'white'
                    arrow.style.borderColor = '#F3672A'
                    arrow.style.transform =
                      'translateX(4px) rotate(-12deg)'
                  }
                  const num = el.querySelector('[data-num]') as HTMLElement
                  if (num) num.style.color = '#F3672A'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,255,255,0.03)'
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                  const arrow = el.querySelector(
                    '[data-arrow]',
                  ) as HTMLElement
                  if (arrow) {
                    arrow.style.background = 'transparent'
                    arrow.style.color = 'white'
                    arrow.style.borderColor = 'rgba(255,255,255,0.25)'
                    arrow.style.transform = 'translateX(0) rotate(0deg)'
                  }
                  const num = el.querySelector('[data-num]') as HTMLElement
                  if (num) num.style.color = 'rgba(255,255,255,0.35)'
                }}
              >
                {/* Top row — numeral + icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 28,
                  }}
                >
                  <div
                    data-num
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.35)',
                      fontFamily:
                        'ui-monospace, "SF Mono", Menlo, monospace',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    / {numeral}
                  </div>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'rgba(243,103,42,0.12)',
                      border: '1px solid rgba(243,103,42,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} color="#F3672A" />
                  </div>
                </div>

                {/* Eyebrow */}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#F3672A',
                    marginBottom: 10,
                  }}
                >
                  {route.label}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: 'white',
                    letterSpacing: '-0.3px',
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  {route.title}
                </div>

                {/* Body */}
                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.5,
                    marginBottom: 24,
                    flexGrow: 1,
                  }}
                >
                  {route.body}
                </div>

                {/* Footer — start here + arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 14,
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.7)',
                    }}
                  >
                    Start here
                  </span>
                  <span
                    data-arrow
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      border: '1.5px solid rgba(255,255,255,0.25)',
                      background: 'transparent',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AudienceRoutingV3
