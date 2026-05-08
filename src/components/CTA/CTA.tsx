import { motion } from 'framer-motion'
import { MapPin, Phone } from 'lucide-react'

export function CTA() {
  return (
    <section
      id="cta"
      style={{
        background: '#F3672A',
        padding: '88px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative rings */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-8%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.12)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-40%',
          left: '-6%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '40%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 12,
              }}
            >
              Book Your Visit
            </div>
            <h2
              style={{
                fontSize: 'clamp(30px, 4.5vw, 52px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'white',
                margin: '0 0 16px',
                letterSpacing: '-0.5px',
                lineHeight: 1.05,
              }}
            >
              Ready to Book Your Appointment?
            </h2>
            <p
              style={{
                fontSize: 17,
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 480,
              }}
            >
              Same-day and next-day appointments available at most of
              our 9 Las Vegas–area locations. New patients always
              welcome.
            </p>
          </motion.div>

          {/* Right — buttons */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <a
              href="#locations"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                background: 'white',
                color: '#F3672A',
                borderRadius: 8,
                padding: '16px 32px',
                fontSize: 15,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                width: '100%',
                maxWidth: 360,
                boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  'translateY(-2px)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  'translateY(0)')
              }
            >
              <MapPin size={17} />
              Find a Location
            </a>

            <a
              href="tel:7024560005"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.6)',
                borderRadius: 8,
                padding: '14px 30px',
                fontSize: 15,
                fontWeight: 800,
                textDecoration: 'none',
                letterSpacing: 0.3,
                width: '100%',
                maxWidth: 360,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.1)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'white'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'transparent'
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,255,255,0.6)'
              }}
            >
              <Phone size={16} />
              (702) 456-0005
            </a>

            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.85)',
                marginTop: 6,
                paddingLeft: 4,
              }}
            >
              Se Habla Español · Medicaid Welcome
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CTA
