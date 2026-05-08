import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'
import { SERVICE_ICON_MAP } from '../Services/ServiceIcons'

const COLOR_FOR_INDEX = [
  { from: '#F3672A', to: '#FF8A50' },
  { from: '#3B82F6', to: '#60A5FA' },
  { from: '#F3672A', to: '#FF8A50' },
  { from: '#3B82F6', to: '#60A5FA' },
  { from: '#F3672A', to: '#FF8A50' },
  { from: '#3B82F6', to: '#60A5FA' },
  { from: '#F3672A', to: '#FF8A50' },
  { from: '#3B82F6', to: '#60A5FA' },
]

export function ServicesV4() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      id="services"
      style={{
        background: '#FFFFFF',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginBottom: 64,
            maxWidth: 760,
            margin: '0 auto 64px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(243,103,42,0.08)',
              border: '1px solid rgba(243,103,42,0.18)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 24,
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
              What We Do · 8 Categories · 50+ Services
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2.2px',
              color: '#0A0A0F',
              margin: '0 0 20px',
              textTransform: 'uppercase',
            }}
          >
            Every kind of care,
            <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #F3672A 0%, #3B82F6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              under one roof.
            </span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(10,10,15,0.65)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            From a routine cleaning to a full-mouth rebuild — every Boca
            office is staffed for it. No referral chains, no specialists across
            town.
          </p>
        </motion.div>

        {/* Service grid with gradient hover */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {INITIAL_DATA.services.map((service, i) => {
            const Icon = SERVICE_ICON_MAP[service.slug]
            const c = COLOR_FOR_INDEX[i % COLOR_FOR_INDEX.length]
            const isHover = hovered === service.slug
            return (
              <motion.a
                key={service.slug}
                href={`#${service.slug}`}
                onMouseEnter={() => setHovered(service.slug)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                whileHover={{ y: -8 }}
                style={{
                  position: 'relative',
                  background: 'white',
                  border: '1px solid rgba(10,10,15,0.06)',
                  borderRadius: 24,
                  padding: '32px 26px 28px',
                  textDecoration: 'none',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: isHover
                    ? `0 24px 48px ${c.from}33, 0 8px 16px rgba(10,10,15,0.06)`
                    : '0 2px 8px rgba(10,10,15,0.04)',
                  transition: 'box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 240,
                }}
              >
                {/* Gradient overlay that appears on hover */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isHover ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Decorative blob top-right */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${c.from}, ${c.to})`,
                    opacity: isHover ? 0 : 0.08,
                    filter: 'blur(20px)',
                    transition: 'opacity 0.3s ease',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: isHover
                        ? 'rgba(255,255,255,0.18)'
                        : `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 24,
                      transition: 'background 0.3s ease',
                    }}
                  >
                    {Icon && <Icon size={24} color="white" />}
                  </div>
                  <div
                    style={{
                      fontSize: 19,
                      fontWeight: 800,
                      color: isHover ? 'white' : '#0A0A0F',
                      letterSpacing: '-0.4px',
                      lineHeight: 1.1,
                      marginBottom: 10,
                      textTransform: 'uppercase',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {service.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: isHover ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,15,0.6)',
                      lineHeight: 1.6,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {service.desc}
                  </div>
                </div>

                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    marginTop: 'auto',
                    paddingTop: 24,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: isHover ? 'white' : c.from,
                    transition: 'color 0.3s ease',
                  }}
                >
                  Explore
                  <ArrowUpRight size={13} />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesV4
