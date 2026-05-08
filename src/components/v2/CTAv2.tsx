import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'

export function CTAv2() {
  return (
    <section
      id="cta"
      style={{
        background: '#001D3D',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial backdrop word */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -40,
          left: -20,
          fontSize: 'clamp(220px, 26vw, 420px)',
          fontWeight: 800,
          color: 'rgba(243,103,42,0.08)',
          lineHeight: 0.85,
          letterSpacing: '-14px',
          pointerEvents: 'none',
          userSelect: 'none',
          textTransform: 'uppercase',
        }}
      >
        BOOK
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#F3672A',
              marginBottom: 18,
            }}
          >
            Most offices have appointments this week
          </div>

          <h2
            style={{
              fontSize: 'clamp(44px, 6.5vw, 92px)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-2.5px',
              color: 'white',
              margin: '0 0 32px',
              textTransform: 'uppercase',
              maxWidth: 920,
            }}
          >
            Stop putting it{' '}
            <span style={{ color: '#F3672A', fontStyle: 'italic' }}>off.</span>
            <br />
            Book a chair near you.
          </h2>

          <p
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.65,
              margin: '0 0 48px',
              maxWidth: 560,
            }}
          >
            Same-day and next-day visits available across all 9 Boca offices.
            New patients always welcome — most insurance plans accepted, plus
            Medicaid and CHIP.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              alignItems: 'center',
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
                padding: '18px 36px',
                fontSize: 16,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                boxShadow: '0 12px 32px rgba(243,103,42,0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#d95a22'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#F3672A'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
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
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.4)',
                borderRadius: 8,
                padding: '16px 34px',
                fontSize: 16,
                fontWeight: 800,
                textDecoration: 'none',
                letterSpacing: 0.5,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.08)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'white'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,255,255,0.4)'
              }}
            >
              <Phone size={16} />
              (702) 456-0005
            </a>

            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                paddingLeft: 8,
              }}
            >
              Se Habla Español ·{' '}
              <span style={{ color: '#F3672A' }}>Medicaid Welcome</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTAv2
