import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, Sparkles } from 'lucide-react'

export function CTAv4() {
  return (
    <section
      id="cta"
      style={{
        background: '#FFFFFF',
        padding: '120px 32px 140px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
          style={{
            position: 'relative',
            background:
              'linear-gradient(135deg, #F3672A 0%, #FF8A50 50%, #3B82F6 130%)',
            backgroundSize: '200% 200%',
            animation: 'cta-gradient 12s ease-in-out infinite',
            borderRadius: 36,
            padding: '100px 64px',
            color: 'white',
            overflow: 'hidden',
            boxShadow: '0 48px 96px rgba(243,103,42,0.32)',
          }}
        >
          {/* Decorative blobs */}
          <motion.div
            aria-hidden
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 30, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-15%',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }}
          />
          <motion.div
            aria-hidden
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 30, -20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '20%',
              width: 700,
              height: 700,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Backdrop typography */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -40,
              left: -20,
              fontSize: 'clamp(220px, 28vw, 460px)',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.06)',
              lineHeight: 0.85,
              letterSpacing: '-14px',
              pointerEvents: 'none',
              userSelect: 'none',
              textTransform: 'uppercase',
            }}
          >
            BOOK
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: 999,
                padding: '8px 16px',
                marginBottom: 36,
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <Sparkles size={13} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                Most offices have appointments this week
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(48px, 7vw, 124px)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-3px',
                color: 'white',
                margin: '0 0 36px',
                textTransform: 'uppercase',
              }}
            >
              Stop putting it
              <br />
              <motion.span
                animate={{ rotate: [0, -1, 1, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  display: 'inline-block',
                  fontStyle: 'italic',
                  background: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  padding: '0 20px',
                  borderRadius: 16,
                }}
              >
                off.
              </motion.span>
              <br />
              Book a chair.
            </h2>

            <p
              style={{
                fontSize: 19,
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1.55,
                margin: '0 0 48px',
                maxWidth: 600,
              }}
            >
              Same-day and next-day visits across all 9 LV-area Boca offices.
              New patients always welcome — most insurance, plus Medicaid and
              CHIP.
            </p>

            <div
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <motion.a
                href="#locations"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'white',
                  color: '#F3672A',
                  borderRadius: 999,
                  padding: '20px 36px',
                  fontSize: 16,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  boxShadow: '0 16px 36px rgba(10,10,15,0.18)',
                }}
              >
                Find an office
                <ArrowUpRight size={18} />
              </motion.a>

              <motion.a
                href="tel:7024560005"
                whileHover={{ scale: 1.02 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(255,255,255,0.18)',
                  color: 'white',
                  border: '1.5px solid rgba(255,255,255,0.45)',
                  borderRadius: 999,
                  padding: '18px 34px',
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: 0.4,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <Phone size={16} />
                (702) 456-0005
              </motion.a>
            </div>
          </div>

          <style>{`@keyframes cta-gradient { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`}</style>
        </motion.div>
      </div>
    </section>
  )
}

export default CTAv4
