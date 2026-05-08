import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'

const MARQUEE = [
  'Now booking',
  'Same-day appointments',
  'Medicaid welcome',
  'Se Habla Español',
  'New patients always',
  'Open 7 days',
]

export function CTAv3() {
  return (
    <section
      id="cta"
      style={{
        background: '#0A0A0F',
        padding: '140px 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial backdrop */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          right: '-15%',
          width: 800,
          height: 800,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.16) 0%, transparent 60%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ padding: '0 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 28,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 09 ] · Book Your Visit
            </div>

            <h2
              style={{
                fontSize: 'clamp(56px, 9vw, 156px)',
                fontWeight: 800,
                lineHeight: 0.86,
                letterSpacing: '-4px',
                color: 'white',
                margin: '0 0 56px',
                textTransform: 'uppercase',
                maxWidth: 1100,
              }}
            >
              Stop putting it{' '}
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>off.</span>
              <br />
              Book a chair near you.
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 48,
                alignItems: 'center',
                paddingBottom: 100,
              }}
            >
              <p
                style={{
                  fontSize: 19,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.55,
                  margin: 0,
                  maxWidth: 540,
                }}
              >
                Same-day and next-day visits available across all 9 LV-area
                Boca offices. New patients always welcome — most insurance,
                plus Medicaid and CHIP.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
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
                    padding: '20px 36px',
                    fontSize: 16,
                    fontWeight: 800,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: 0.6,
                    boxShadow: '0 16px 40px rgba(243,103,42,0.3)',
                    width: '100%',
                    minWidth: 320,
                    justifyContent: 'space-between',
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
                  Find an office
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href="tel:7024560005"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'rgba(255,255,255,0.04)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 8,
                    padding: '18px 34px',
                    fontSize: 16,
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: 0.4,
                    width: '100%',
                    minWidth: 320,
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease',
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
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                    <Phone size={16} />
                    (702) 456-0005
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    }}
                  >
                    24/7 line
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee strip at bottom */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 0',
          background: 'rgba(255,255,255,0.02)',
          overflow: 'hidden',
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 64,
            whiteSpace: 'nowrap',
            animation: 'marquee-cta 35s linear infinite',
            width: 'fit-content',
          }}
        >
          {Array.from({ length: 4 })
            .flatMap(() => MARQUEE)
            .map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 18,
                  fontSize: 'clamp(20px, 2.4vw, 36px)',
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  textTransform: 'uppercase',
                  color: 'white',
                }}
              >
                <span style={{ color: '#F3672A' }}>◆</span>
                {item}
              </div>
            ))}
        </div>
        <style>{`@keyframes marquee-cta { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>
    </section>
  )
}

export default CTAv3
