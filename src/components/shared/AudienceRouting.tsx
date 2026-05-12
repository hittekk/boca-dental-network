import { motion } from 'framer-motion'
import { Users, Baby, Sparkles, Siren, Brackets, ArrowUpRight } from 'lucide-react'

type Theme = 'light' | 'dark' | 'cream'

const CARDS = [
  {
    icon: Users,
    title: 'New Family Patient',
    body: 'Exams, cleanings & family care',
    href: '/services/general-dentistry/',
    color: '#162E7A',
  },
  {
    icon: Baby,
    title: 'Parent / Child Patient',
    body: 'Pediatric & kids dentistry',
    href: '/services/pediatric-dentistry/',
    color: '#0E7C66',
  },
  {
    icon: Sparkles,
    title: 'Adult / Cosmetic Patient',
    body: 'Smile makeovers, whitening, veneers',
    href: '/services/cosmetic-dentistry/',
    color: '#B86F0F',
  },
  {
    icon: Siren,
    title: 'Dental Emergency',
    body: 'Same-day care, pain relief',
    href: '/services/emergency-dental-care/',
    color: '#B83A2D',
  },
  {
    icon: Brackets,
    title: 'Orthodontic Patient',
    body: 'Invisalign & braces',
    href: '/services/orthodontics/',
    color: '#5B3FB8',
  },
]

export function AudienceRouting({ theme = 'light' }: { theme?: Theme }) {
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
        padding: '120px 32px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 56, maxWidth: 720, margin: '0 auto 56px' }}
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
              Audience Routing · 5 Quickest Paths
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
              margin: 0,
            }}
          >
            Skip the mega-menu. Pick the path that matches you and we'll
            route you to the right page in two seconds.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 14,
          }}
        >
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{ y: -6 }}
                style={{
                  background: card.color,
                  color: 'white',
                  borderRadius: 18,
                  padding: '28px 22px 24px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 220,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.25s ease',
                  boxShadow: '0 4px 16px rgba(10,10,15,0.06)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${card.color}80`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 4px 16px rgba(10,10,15,0.06)'
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                  }}
                >
                  <Icon size={22} color="white" />
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.3px',
                      lineHeight: 1.15,
                      marginBottom: 8,
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
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.9)',
                    }}
                  >
                    Start here
                    <ArrowUpRight size={13} />
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
