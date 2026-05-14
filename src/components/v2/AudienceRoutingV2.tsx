import { motion } from 'framer-motion'
import { ArrowUpRight, Users, Baby, Sparkles, Siren, Brackets } from 'lucide-react'

const ROUTES = [
  {
    icon: Users,
    title: 'New family patient',
    body: 'Exams, cleanings, and the kind of general care every family needs to keep coming back.',
    href: '/general-dentistry/',
    tag: 'Most common',
  },
  {
    icon: Baby,
    title: 'Parent or child patient',
    body: 'Pediatric dentistry for kids of every age — calm, friendly, and built around their pace.',
    href: '/pediatric-dentistry/',
    tag: 'Ages 0–17',
  },
  {
    icon: Sparkles,
    title: 'Adult, cosmetic, or smile-makeover',
    body: 'Whitening, veneers, bonding, Invisalign — the work that makes you smile in photos again.',
    href: '/cosmetic-dentistry/',
    tag: 'Smile work',
  },
  {
    icon: Siren,
    title: 'A dental emergency, today',
    body: 'Same-day care for a sudden ache, a broken tooth, or anything else that just cannot wait.',
    href: '/general-dentistry/',
    tag: 'Same-day',
  },
  {
    icon: Brackets,
    title: 'Orthodontic patient',
    body: 'Traditional braces and Invisalign for teens and adults — financing for both, always.',
    href: '/orthodontics/',
    tag: 'Boca & Braces',
  },
]

export function AudienceRoutingV2() {
  return (
    <section
      id="how-can-we-help"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial watermark — soft "?" mark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          right: -40,
          fontSize: 520,
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.8,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        ?
      </div>

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
            .arv2-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 36px !important; }
            .arv2-stats { grid-template-columns: repeat(2, 1fr) !important; }
            .arv2-stats > div:nth-child(2) { border-right: none !important; }
            .arv2-stats > div:nth-child(1), .arv2-stats > div:nth-child(2) { border-bottom: 1px solid rgba(0,29,61,0.08) !important; }
            .arv2-row { grid-template-columns: 64px 44px 1fr 36px !important; gap: 14px !important; padding: 22px 0 !important; }
            .arv2-numeral { font-size: 56px !important; }
            .arv2-title { font-size: 17px !important; }
            .arv2-body { font-size: 13px !important; }
            .arv2-tag { display: none !important; }
          }
        `}</style>

        {/* ── Editorial header ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="arv2-header"
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
                Find your path
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
              Where should
              <br />
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                we
              </span>{' '}
              begin?
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
            Five quickest paths to the right page. Pick the one that
            sounds like you and skip the mega-menu — we will take it
            from there.
          </p>
        </motion.div>

        {/* Stat anchors strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="arv2-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(243,103,42,0.18)',
            borderRadius: 16,
            overflow: 'hidden',
            backdropFilter: 'blur(6px)',
            marginBottom: 24,
          }}
        >
          {[
            { value: '5', label: 'Quickest paths' },
            { value: '0', label: 'Mega-menus' },
            { value: 'Same-day', label: 'Emergencies' },
            { value: 'EN·ES', label: 'Every chair' },
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

        {/* ── Editorial route list ──────────────────────── */}
        <div
          style={{
            borderTop: '1px solid rgba(0,29,61,0.12)',
          }}
        >
          {ROUTES.map((route, i) => {
            const Icon = route.icon
            const isLast = i === ROUTES.length - 1
            const numeral = String(i + 1).padStart(2, '0')
            return (
              <motion.a
                key={route.title}
                href={route.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="arv2-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 56px 1fr auto 48px',
                  alignItems: 'center',
                  gap: 24,
                  padding: '28px 0',
                  borderBottom: isLast
                    ? 'none'
                    : '1px solid rgba(0,29,61,0.12)',
                  textDecoration: 'none',
                  color: '#001D3D',
                  transition: 'background 0.25s ease, padding 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(243,103,42,0.05)'
                  el.style.paddingLeft = '20px'
                  el.style.paddingRight = '20px'
                  const arrow = el.querySelector('[data-arrow]') as HTMLElement
                  if (arrow) {
                    arrow.style.background = '#F3672A'
                    arrow.style.borderColor = '#F3672A'
                    arrow.style.color = 'white'
                    arrow.style.transform = 'translateX(4px) rotate(-12deg)'
                  }
                  const numEl = el.querySelector('[data-num]') as HTMLElement
                  if (numEl) {
                    numEl.style.color = '#F3672A'
                    numEl.style.transform = 'translateX(-4px) scale(1.04)'
                  }
                  const iconEl = el.querySelector('[data-icon]') as HTMLElement
                  if (iconEl) {
                    iconEl.style.background = '#F3672A'
                    iconEl.style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  el.style.paddingLeft = '0px'
                  el.style.paddingRight = '0px'
                  const arrow = el.querySelector('[data-arrow]') as HTMLElement
                  if (arrow) {
                    arrow.style.background = 'transparent'
                    arrow.style.borderColor = '#001D3D'
                    arrow.style.color = '#001D3D'
                    arrow.style.transform = 'translateX(0) rotate(0deg)'
                  }
                  const numEl = el.querySelector('[data-num]') as HTMLElement
                  if (numEl) {
                    numEl.style.color = 'rgba(243,103,42,0.18)'
                    numEl.style.transform = 'translateX(0) scale(1)'
                  }
                  const iconEl = el.querySelector('[data-icon]') as HTMLElement
                  if (iconEl) {
                    iconEl.style.background = '#FFF4ED'
                    iconEl.style.color = '#F3672A'
                  }
                }}
              >
                {/* Big bold sans numeral — faint by default, solid on hover */}
                <div
                  data-num
                  aria-hidden
                  className="arv2-numeral"
                  style={{
                    fontFamily: 'inherit',
                    fontWeight: 800,
                    fontSize: 80,
                    color: 'rgba(243,103,42,0.18)',
                    lineHeight: 0.9,
                    letterSpacing: '-3px',
                    fontVariantNumeric: 'tabular-nums',
                    transition: 'color 0.25s ease, transform 0.25s ease',
                  }}
                >
                  {numeral}
                </div>

                {/* Icon in soft tile */}
                <div
                  data-icon
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#FFF4ED',
                    border: '1px solid rgba(243,103,42,0.2)',
                    color: '#F3672A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <Icon size={20} />
                </div>

                {/* Title + body */}
                <div>
                  <div
                    className="arv2-title"
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: '-0.5px',
                      lineHeight: 1.15,
                      marginBottom: 6,
                      textTransform: 'uppercase',
                      color: '#162E7A',
                    }}
                  >
                    {route.title}
                  </div>
                  <div
                    className="arv2-body"
                    style={{
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: 'rgba(0,29,61,0.65)',
                      fontFamily: 'Georgia, "Playfair Display", serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {route.body}
                  </div>
                </div>

                {/* Tag pill */}
                <span
                  className="arv2-tag"
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: '#F3672A',
                    background: 'rgba(243,103,42,0.10)',
                    border: '1px solid rgba(243,103,42,0.22)',
                    borderRadius: 999,
                    padding: '4px 10px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {route.tag}
                </span>

                {/* Arrow circle */}
                <div
                  data-arrow
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    border: '1.5px solid #001D3D',
                    color: '#001D3D',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <ArrowUpRight size={18} />
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: 48,
            textAlign: 'center',
            fontSize: 13,
            color: 'rgba(0,29,61,0.5)',
            fontFamily: 'Georgia, "Playfair Display", serif',
            fontStyle: 'italic',
          }}
        >
          Not sure where to start?{' '}
          <a
            href="tel:7024560005"
            style={{
              color: '#F3672A',
              textDecoration: 'none',
              fontWeight: 700,
              fontFamily: 'inherit',
            }}
          >
            Just call us — (702) 456-0005.
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default AudienceRoutingV2
