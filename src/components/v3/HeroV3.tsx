import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'
import type { Brand } from '../../types'

interface HeroV3Props {
  brand: Brand
}

const STATS = [
  { value: '4.9', suffix: '★', label: 'Avg patient rating' },
  { value: '1,200', suffix: '+', label: 'Verified reviews' },
  { value: '9', suffix: '', label: 'LV-area offices' },
  { value: '20', suffix: 'yrs', label: 'Family-owned' },
]

const MARQUEE_ITEMS = [
  'Now accepting new patients',
  'Medicaid + CHIP welcome',
  'Se Habla Español',
  'Same-day emergencies',
  '30+ insurance plans',
  'Open 7 days',
]

export function HeroV3({ brand }: HeroV3Props) {
  return (
    <section
      style={{
        position: 'relative',
        background: '#0A0A0F',
        paddingTop: 180,
        paddingBottom: 0,
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />
      {/* Orange radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '15%',
          right: '-10%',
          width: 720,
          height: 720,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.18) 0%, transparent 60%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      {/* Cool glow lower-left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-12%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(22,46,122,0.4) 0%, transparent 60%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 32px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Top status bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 56,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 999,
              padding: '8px 18px',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#10b981',
                display: 'inline-block',
                boxShadow: '0 0 0 4px rgba(16,185,129,0.18)',
              }}
            />
            Live · Booking now for next week
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            v.2026 · Boca Dental + Braces
          </div>
        </motion.div>

        {/* Main hero grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr',
            gap: 72,
            alignItems: 'flex-start',
            marginBottom: 100,
          }}
        >
          {/* LEFT — massive headline */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
              style={{
                fontSize: 'clamp(48px, 7.5vw, 116px)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '-3.5px',
                color: 'white',
                margin: '0 0 36px',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'block' }}>Las Vegas</span>
              <span style={{ display: 'block' }}>dental,</span>
              <span style={{ display: 'block', color: '#F3672A' }}>
                reimagined.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                fontSize: 19,
                lineHeight: 1.55,
                color: 'rgba(255,255,255,0.65)',
                margin: '0 0 40px',
                maxWidth: 520,
              }}
            >
              Nine offices across LV. One shared standard — modern technology,
              transparent pricing, and a team that takes Medicaid because every
              smile deserves it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
            >
              <a
                href="#locations"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: '#F3672A',
                  color: 'white',
                  borderRadius: 8,
                  padding: '18px 32px',
                  fontSize: 15,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  boxShadow: '0 12px 32px rgba(243,103,42,0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#d95a22'
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = '#F3672A'
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(0)'
                }}
              >
                Find a Location
                <ArrowUpRight size={17} />
              </a>

              <a
                href={`tel:${brand.phone.replace(/\D/g, '')}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'white',
                  borderRadius: 8,
                  padding: '17px 30px',
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: 0.4,
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    'rgba(255,255,255,0.08)'
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(255,255,255,0.32)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    'rgba(255,255,255,0.04)'
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(255,255,255,0.18)'
                }}
              >
                <Phone size={15} />
                {brand.phone}
              </a>
            </motion.div>
          </div>

          {/* RIGHT — glass stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
              marginTop: 8,
            }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.5 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  padding: '22px 22px 18px',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: 14,
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  / {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  style={{
                    fontSize: 'clamp(36px, 4.5vw, 56px)',
                    fontWeight: 800,
                    color: 'white',
                    lineHeight: 0.9,
                    letterSpacing: '-2px',
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                  <span style={{ color: '#F3672A', fontSize: '0.6em' }}>
                    {stat.suffix}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: 1.4,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        style={{
          position: 'relative',
          zIndex: 2,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
          padding: '18px 0',
          overflow: 'hidden',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 48,
            whiteSpace: 'nowrap',
            animation: 'marquee 40s linear infinite',
            width: 'fit-content',
          }}
        >
          {Array.from({ length: 4 })
            .flatMap(() => MARQUEE_ITEMS)
            .map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 16,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                <span style={{ color: '#F3672A' }}>◆</span>
                {item}
              </div>
            ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </motion.div>
    </section>
  )
}

export default HeroV3
