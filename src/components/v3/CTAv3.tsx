import { motion } from 'framer-motion'
import { ArrowUpRight, Phone } from 'lucide-react'

export function CTAv3() {
  return (
    <section
      id="cta"
      className="cta-v3"
      style={{
        background: '#0A0A0F',
        padding: '140px 0 120px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 640,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .cta-v3 { min-height: 0 !important; padding: 100px 0 96px !important; }
        }
      `}</style>
      {/* Full-bleed chair image — chair visible on the right side */}
      <img
        src="/boca-chair-vegas.webp"
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'right center',
          opacity: 0.95,
          pointerEvents: 'none',
        }}
      />

      {/* Left-side dark gradient so the copy stays legible */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(10,10,15,0.96) 0%, rgba(10,10,15,0.88) 35%, rgba(10,10,15,0.45) 60%, rgba(10,10,15,0.05) 85%, rgba(10,10,15,0) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Soft orange glow accent on the left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '30%',
          left: '-10%',
          width: 700,
          height: 700,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.14) 0%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ width: '100%', padding: '0 32px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ maxWidth: 600 }}
          >
            {/* LEFT — copy + actions */}
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
              [ 09 ] · Book Your Visit
            </div>

            <h2
              style={{
                fontSize: 'clamp(40px, 4.6vw, 78px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-1.8px',
                color: 'white',
                margin: '0 0 28px',
                textTransform: 'uppercase',
              }}
            >
              Stop putting it{' '}
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>off.</span>
              <br />
              Book a chair near you.
            </h2>

            <p
              style={{
                fontSize: 17,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.55,
                margin: '0 0 32px',
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
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <a
                href="#locations"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#F3672A',
                  color: 'white',
                  borderRadius: 8,
                  padding: '18px 30px',
                  fontSize: 15,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  boxShadow: '0 16px 40px rgba(243,103,42,0.3)',
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
                <ArrowUpRight size={17} />
              </a>

              <a
                href="tel:7024560005"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.04)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 8,
                  padding: '17px 28px',
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: 0.3,
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
                <Phone size={15} style={{ color: '#F3672A' }} />
                (702) 456-0005
              </a>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginLeft: 4,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#10b981',
                    display: 'inline-block',
                  }}
                />
                Open · 24/7 phone
              </span>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTAv3
