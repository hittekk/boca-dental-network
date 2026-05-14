import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'
import { SERVICE_ICON_MAP } from '../Services/ServiceIcons'

export function ServicesV3() {
  const [hovered, setHovered] = useState<string | null>(null)

  const categories = Array.from(
    new Set(INITIAL_DATA.services.map((s) => s.category).filter(Boolean) as string[]),
  )

  return (
    <section
      id="services"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial backdrop number */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -20,
          left: -10,
          fontSize: 'clamp(220px, 26vw, 420px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.04)',
          lineHeight: 0.85,
          letterSpacing: '-14px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        03
      </div>

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 30% 50%, black 20%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 30% 50%, black 20%, transparent 85%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 24,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 03 ] · What We Do
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 4.6vw, 62px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-1.8px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Every kind of
              <br />
              dental care,
              <br />
              <span style={{ whiteSpace: 'nowrap' }}>
                in <span style={{ color: '#F3672A' }}>one network.</span>
              </span>
            </h2>
          </div>
          <div>
            <p
              style={{
                fontSize: 17,
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.65,
                margin: '0 0 24px',
                maxWidth: 460,
              }}
            >
              From a routine cleaning to a full-mouth rebuild — every Boca
              office is staffed for it. No referral chains. No specialists you
              have to track down across town.
            </p>
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              {categories.map((cat) => (
                <span
                  key={cat}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.78)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 999,
                    padding: '6px 14px',
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Service grid — dark glass cards with bottom accent on hover */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            overflow: 'hidden',
          }}
        >
          {INITIAL_DATA.services.map((service, i) => {
            const Icon = SERVICE_ICON_MAP[service.slug]
            const isHovered = hovered === service.slug
            const col = i % 3
            const row = Math.floor(i / 3)
            const isLastRow =
              row === Math.floor((INITIAL_DATA.services.length - 1) / 3)
            const isLastCol = col === 2
            return (
              <motion.a
                key={service.slug}
                href={`#${service.slug}`}
                onMouseEnter={() => setHovered(service.slug)}
                onMouseLeave={() => setHovered(null)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                style={{
                  position: 'relative',
                  padding: '36px 28px 32px',
                  borderRight: isLastCol
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.06)',
                  borderBottom: isLastRow
                    ? 'none'
                    : '1px solid rgba(255,255,255,0.06)',
                  background: isHovered
                    ? 'rgba(243,103,42,0.08)'
                    : 'transparent',
                  color: 'white',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.25s ease',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: isHovered
                      ? '#F3672A'
                      : 'rgba(255,255,255,0.4)',
                    marginBottom: 20,
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    transition: 'color 0.25s ease',
                  }}
                >
                  / {String(i + 1).padStart(2, '0')} ·{' '}
                  {service.category ?? 'Service'}
                </div>

                {Icon && (
                  <div style={{ marginBottom: 24 }}>
                    <Icon
                      size={32}
                      color={isHovered ? '#F3672A' : 'rgba(255,255,255,0.85)'}
                    />
                  </div>
                )}

                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    letterSpacing: '-0.5px',
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    marginBottom: 10,
                    color: 'white',
                  }}
                >
                  {service.label}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.55,
                    marginBottom: 28,
                    minHeight: 40,
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
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: '#F3672A',
                  }}
                >
                  Explore
                  <ArrowUpRight size={13} />
                </div>

                {/* Hover bottom accent */}
                <motion.div
                  initial={false}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: '#F3672A',
                    transformOrigin: 'left',
                  }}
                />
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesV3
