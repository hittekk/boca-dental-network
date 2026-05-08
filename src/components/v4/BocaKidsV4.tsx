import { motion } from 'framer-motion'
import { ArrowUpRight, Heart, Sparkles } from 'lucide-react'

export function BocaKidsV4() {
  return (
    <section
      id="boca-kids"
      style={{
        background: '#FFFFFF',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            position: 'relative',
            background:
              'linear-gradient(135deg, #F3672A 0%, #FF8A50 50%, #3B82F6 130%)',
            borderRadius: 36,
            padding: '80px 64px',
            color: 'white',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(243,103,42,0.28)',
          }}
        >
          {/* Animated decorative blobs inside hero card */}
          <motion.div
            aria-hidden
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-15%',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 60%)',
              pointerEvents: 'none',
              filter: 'blur(40px)',
            }}
          />
          <motion.div
            aria-hidden
            animate={{
              x: [0, -30, 40, 0],
              y: [0, 30, -20, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '-30%',
              left: '20%',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 60%)',
              pointerEvents: 'none',
              filter: 'blur(50px)',
            }}
          />

          {/* Backdrop typography */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: -60,
              right: -40,
              fontSize: 'clamp(220px, 26vw, 460px)',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.08)',
              lineHeight: 0.85,
              letterSpacing: '-14px',
              pointerEvents: 'none',
              userSelect: 'none',
              textTransform: 'uppercase',
            }}
          >
            KIDS
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 64,
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
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
                  marginBottom: 28,
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <Heart size={13} fill="white" />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                  }}
                >
                  Boca Kids · Pediatric
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(48px, 6.4vw, 92px)',
                  fontWeight: 800,
                  lineHeight: 0.92,
                  letterSpacing: '-2.5px',
                  margin: '0 0 28px',
                  textTransform: 'uppercase',
                }}
              >
                Dental that
                <br />
                doesn't{' '}
                <motion.span
                  animate={{
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    display: 'inline-block',
                    fontStyle: 'italic',
                    background: 'rgba(255,255,255,0.28)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    padding: '0 16px',
                    borderRadius: 12,
                    transform: 'rotate(-2deg)',
                  }}
                >
                  scare
                </motion.span>{' '}
                kids.
              </h2>

              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.92)',
                  margin: '0 0 36px',
                  maxWidth: 540,
                }}
              >
                Two pediatric Boca Kids offices designed from the operatory up
                for tiny humans. Bilingual team, Medicaid welcome, prizes on
                the way out, and a whole lot less fluorescent lighting.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <motion.a
                  href="#locations"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: 'white',
                    color: '#F3672A',
                    borderRadius: 999,
                    padding: '16px 30px',
                    fontSize: 14,
                    fontWeight: 800,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    boxShadow: '0 16px 32px rgba(10,10,15,0.18)',
                  }}
                >
                  Find Boca Kids
                  <ArrowUpRight size={15} />
                </motion.a>
                <motion.a
                  href="tel:7023891543"
                  whileHover={{ scale: 1.02 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.18)',
                    color: 'white',
                    border: '1.5px solid rgba(255,255,255,0.35)',
                    borderRadius: 999,
                    padding: '14px 28px',
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    letterSpacing: 0.4,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  (702) 389-1543
                </motion.a>
              </div>
            </motion.div>

            {/* RIGHT — fact pills */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              {[
                { num: 'Age 1', label: 'First visit', icon: Sparkles },
                { num: 'Yes', label: 'Medicaid + CHIP', icon: Heart },
                { num: 'Sí', label: 'En español', icon: Sparkles },
              ].map((fact, i) => {
                const Icon = fact.icon
                return (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.03 }}
                    style={{
                      background: 'white',
                      borderRadius: 22,
                      padding: '24px 28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      boxShadow: '0 8px 24px rgba(10,10,15,0.1)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: 'rgba(243,103,42,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#F3672A',
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          color: '#0A0A0F',
                          letterSpacing: '-0.5px',
                        }}
                      >
                        {fact.num}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        color: 'rgba(10,10,15,0.55)',
                        textAlign: 'right',
                      }}
                    >
                      {fact.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BocaKidsV4
