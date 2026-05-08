import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'
import { SERVICE_ICON_MAP } from '../Services/ServiceIcons'

// Bento layout — each card has a hand-tuned color scheme + size class.
// Featured card spans 2 cols; rest are single.
const TILE_STYLES: Record<
  string,
  { bg: string; fg: string; subFg: string; size: 'xl' | 'md'; eyebrow: string }
> = {
  general: {
    bg: '#001D3D',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.65)',
    size: 'xl',
    eyebrow: 'Most popular',
  },
  braces: {
    bg: '#F3672A',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.78)',
    size: 'md',
    eyebrow: 'Orthodontics',
  },
  invisalign: {
    bg: '#FFF4ED',
    fg: '#001D3D',
    subFg: 'rgba(0,29,61,0.6)',
    size: 'md',
    eyebrow: 'Cosmetic',
  },
  implants: {
    bg: '#162E7A',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.6)',
    size: 'md',
    eyebrow: 'Restorative',
  },
  whitening: {
    bg: '#FFF4ED',
    fg: '#001D3D',
    subFg: 'rgba(0,29,61,0.6)',
    size: 'md',
    eyebrow: 'Cosmetic',
  },
  emergency: {
    bg: '#F3672A',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.78)',
    size: 'md',
    eyebrow: 'Same-day',
  },
  kids: {
    bg: '#001D3D',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.65)',
    size: 'md',
    eyebrow: 'Pediatric',
  },
  crowns: {
    bg: '#FFF4ED',
    fg: '#001D3D',
    subFg: 'rgba(0,29,61,0.6)',
    size: 'md',
    eyebrow: 'Restorative',
  },
}

export function ServicesV2() {
  return (
    <section
      id="services"
      style={{ background: '#FFFAF6', padding: '120px 32px' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 14,
              }}
            >
              Everything in one place
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
              From a routine
              <br />
              cleaning to a{' '}
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                full mouth
              </span>{' '}
              rebuild.
            </h2>
          </div>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(0,29,61,0.7)',
              lineHeight: 1.65,
              margin: 0,
              paddingBottom: 8,
            }}
          >
            Whatever your teeth need this year, we do it under one roof —
            general dentistry, kids, orthodontics, implants, and emergencies all
            staffed at every Boca office.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          {INITIAL_DATA.services.map((service, i) => {
            const Icon = SERVICE_ICON_MAP[service.slug]
            const tile = TILE_STYLES[service.slug] ?? TILE_STYLES.general
            const span = tile.size === 'xl' ? 2 : 1
            return (
              <motion.a
                key={service.slug}
                href={`#${service.slug}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                style={{
                  gridColumn: `span ${span}`,
                  background: tile.bg,
                  color: tile.fg,
                  borderRadius: 18,
                  padding: tile.size === 'xl' ? '36px 32px 32px' : '26px 24px 24px',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: tile.size === 'xl' ? 280 : 220,
                  border:
                    tile.bg === '#FFF4ED'
                      ? '1px solid rgba(243,103,42,0.18)'
                      : 'none',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(-4px)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 16px 40px rgba(0,29,61,0.18)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color:
                        tile.fg === 'white'
                          ? 'rgba(255,255,255,0.5)'
                          : '#F3672A',
                    }}
                  >
                    {tile.eyebrow}
                  </div>
                  {Icon && (
                    <Icon
                      size={tile.size === 'xl' ? 44 : 32}
                      color={tile.fg === 'white' ? '#F3672A' : '#F3672A'}
                    />
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: tile.size === 'xl' ? 36 : 22,
                      fontWeight: 800,
                      letterSpacing: '-0.5px',
                      lineHeight: 1.05,
                      color: tile.fg,
                      marginBottom: 10,
                      textTransform: 'uppercase',
                    }}
                  >
                    {service.label}
                  </div>
                  <div
                    style={{
                      fontSize: tile.size === 'xl' ? 14 : 12,
                      color: tile.subFg,
                      lineHeight: 1.55,
                      marginBottom: 18,
                    }}
                  >
                    {service.desc}
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                      color: tile.fg === 'white' ? '#F3672A' : '#F3672A',
                    }}
                  >
                    Learn more
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

export default ServicesV2
