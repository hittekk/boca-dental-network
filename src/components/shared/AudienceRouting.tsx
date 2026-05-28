import { motion } from 'framer-motion'
import { Users, Baby, Sparkles, Siren, Brackets, ArrowUpRight } from 'lucide-react'
import { useLang, t } from '../../lib/lang'

type Theme = 'light' | 'dark' | 'cream'

function getCards(lang: import('../../lib/lang').Lang) { return [
  {
    icon: Users,
    title: t(lang,'New Family Patient','Nuevo Paciente Familiar'),
    body: t(lang,'Exams, cleanings & family care','Exámenes, limpiezas y cuidado familiar'),
    href: '/general-dentistry/',
    color: '#162E7A',
    colorBright: '#2E4AB0',
    tag: t(lang,'New here?','¿Primera vez?'),
  },
  {
    icon: Baby,
    title: t(lang,'Parent / Child Patient','Paciente Pediátrico'),
    body: t(lang,'Pediatric & kids dentistry','Odontología pediátrica y para niños'),
    href: '/pediatric-dentistry/',
    color: '#0E7C66',
    colorBright: '#1FA188',
    tag: t(lang,'Ages 0–17','Edades 0–17'),
  },
  {
    icon: Sparkles,
    title: t(lang,'Adult / Cosmetic Patient','Paciente Adulto / Cosmético'),
    body: t(lang,'Smile makeovers, whitening, veneers','Cambios de sonrisa, blanqueamiento, carillas'),
    href: '/cosmetic-dentistry/',
    color: '#B86F0F',
    colorBright: '#D88718',
    tag: t(lang,'Smile goals','Metas de sonrisa'),
  },
  {
    icon: Siren,
    title: t(lang,'Dental Emergency','Urgencia Dental'),
    body: t(lang,'Same-day care, pain relief','Atención el mismo día, alivio del dolor'),
    href: '/general-dentistry/emergency-dental-care/',
    color: '#B83A2D',
    colorBright: '#D85040',
    tag: t(lang,'Same day','Mismo día'),
  },
  {
    icon: Brackets,
    title: t(lang,'Orthodontic Patient','Paciente de Ortodoncia'),
    body: t(lang,'Invisalign & braces','Invisalign y frenos dentales'),
    href: '/orthodontics/',
    color: '#5B3FB8',
    colorBright: '#7D5DD8',
    tag: t(lang,'Teens & adults','Adolescentes y adultos'),
  },
]}

export function AudienceRouting({ theme = 'light' }: { theme?: Theme }) {
  const lang = useLang()
  const CARDS = getCards(lang)
  const isDark = theme === 'dark'
  const sectionBg = isDark ? '#0A0A0F' : theme === 'cream' ? '#FFFAF6' : '#FFFFFF'
  const headingColor = isDark ? 'white' : '#0A0A0F'
  const subColor = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(10,10,15,0.65)'
  const cardTextColor = 'rgba(255,255,255,0.92)'

  return (
    <section
      id="how-can-we-help"
      style={{
        background: sectionBg,
        padding: '96px 32px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 48px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: isDark ? 'rgba(243,103,42,0.12)' : 'rgba(243,103,42,0.08)',
              border: '1px solid rgba(243,103,42,0.22)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 22,
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
              {t(lang,'Skip the menu','Saltar el menú')} · {t(lang,'5 quickest paths','5 caminos rápidos')}
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-1.6px',
              color: headingColor,
              margin: '0 0 16px',
              textTransform: 'uppercase',
            }}
          >
            How can we help you{' '}
            <span style={{ color: '#F3672A' }}>today?</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: subColor,
              lineHeight: 1.65,
              margin: '0 auto',
              maxWidth: 620,
              textWrap: 'balance' as React.CSSProperties['textWrap'],
            }}
          >
            {t(lang,"Skip the mega-menu. Pick the path that matches you and we'll route you to the right page in two seconds.","Elige el camino que te describe y te llevamos a la página correcta en dos segundos.")}
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            .audience-card { transition: all 0.3s cubic-bezier(0.0, 0.0, 0.2, 1.0); }
            .audience-card:hover { transform: translateY(-6px); }
            .audience-card:hover .audience-watermark { transform: rotate(-10deg) scale(1.1); opacity: 0.16 !important; }
            .audience-card:hover .audience-arrow { transform: translate(3px, -3px); }
            .audience-card:hover .audience-icon-tile { background: rgba(255,255,255,0.32) !important; transform: rotate(-4deg) scale(1.06); }
            .audience-card:hover .audience-start { gap: 10px !important; }
          `}</style>
          {CARDS.map((card, i) => {
            const Icon = card.icon
            const idx = String(i + 1).padStart(2, '0')
            return (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="audience-card"
                style={{
                  // Subtle gradient from card.colorBright (top-left) to card.color (bottom-right)
                  background: `linear-gradient(135deg, ${card.colorBright} 0%, ${card.color} 65%, ${card.color} 100%)`,
                  color: 'white',
                  borderRadius: 18,
                  padding: '24px 22px 22px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 260,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 6px 18px ${card.color}28`,
                  // Subtle top highlight (glass effect)
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 18px 44px ${card.color}66`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 6px 18px ${card.color}28`
                }}
              >
                {/* Watermark icon — large, faded, bottom-right corner */}
                <div
                  aria-hidden
                  className="audience-watermark"
                  style={{
                    position: 'absolute',
                    bottom: -28,
                    right: -22,
                    opacity: 0.09,
                    transition: 'all 0.35s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <Icon size={180} color="white" strokeWidth={1.4} />
                </div>

                {/* Top row: icon tile + mono index */}
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
                    className="audience-icon-tile"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.18)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    <Icon size={22} color="white" strokeWidth={2} />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      color: 'rgba(255,255,255,0.55)',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    / {idx}
                  </div>
                </div>

                {/* Bottom block: tag + title + body + Start here */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Tag chip */}
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '3px 9px',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.16)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.95)',
                      marginBottom: 10,
                      backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                    }}
                  >
                    {card.tag}
                  </div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.3px',
                      lineHeight: 1.15,
                      marginBottom: 8,
                      color: 'white',
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: cardTextColor,
                      lineHeight: 1.5,
                      marginBottom: 16,
                    }}
                  >
                    {card.body}
                  </div>
                  {/* Start here — animated arrow on hover */}
                  <div
                    className="audience-start"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: 'white',
                      paddingTop: 12,
                      borderTop: '1px solid rgba(255,255,255,0.16)',
                      width: '100%',
                      justifyContent: 'space-between',
                      transition: 'gap 0.25s ease',
                    }}
                  >
                    <span>Start here</span>
                    <span
                      className="audience-arrow"
                      style={{
                        display: 'inline-flex',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AudienceRouting
