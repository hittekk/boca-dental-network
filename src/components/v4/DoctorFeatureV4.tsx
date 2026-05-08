import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'

export function DoctorFeatureV4() {
  const featured = INITIAL_DATA.doctors[0]
  const otherCount = INITIAL_DATA.doctors.length - 1
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setTilt({ rx: y * -8, ry: x * 8 })
  }
  const reset = () => setTilt({ rx: 0, ry: 0 })

  return (
    <section
      id="doctors"
      style={{
        background: '#FAFAFA',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.18) 0%, transparent 60%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 56 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'white',
              border: '1px solid rgba(243,103,42,0.18)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 24,
              boxShadow: '0 4px 12px rgba(243,103,42,0.08)',
            }}
          >
            <Sparkles size={12} color="#F3672A" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#F3672A',
              }}
            >
              Meet the Team · 14 Doctors
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2.2px',
              color: '#0A0A0F',
              margin: 0,
              textTransform: 'uppercase',
              maxWidth: 800,
            }}
          >
            The dentists who
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
              built this thing.
            </span>
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* LEFT — tilt portrait card */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseLeave={reset}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              animate={{
                rotateX: tilt.rx,
                rotateY: tilt.ry,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                aspectRatio: '4/5',
                borderRadius: 28,
                background:
                  'linear-gradient(155deg, #F3672A 0%, #FF8A50 30%, #3B82F6 100%)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow:
                  '0 32px 80px rgba(243,103,42,0.25), 0 12px 24px rgba(10,10,15,0.08)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Decorative grain */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" /></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\" opacity=\"0.18\" /></svg>')",
                  mixBlendMode: 'overlay',
                  opacity: 0.4,
                }}
              />

              {/* Initial ID strip */}
              <div
                style={{
                  position: 'absolute',
                  top: 28,
                  left: 28,
                  right: 28,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.85)',
                  transform: 'translateZ(40px)',
                }}
              >
                <span>Lead Dentist</span>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    borderRadius: 999,
                    padding: '4px 10px',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  Founder
                </span>
              </div>

              {/* Big initials center */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(140px, 14vw, 220px)',
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.32)',
                  letterSpacing: '-8px',
                  transform: 'translateZ(20px)',
                }}
              >
                WD
              </div>

              {/* Name strip bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 28,
                  left: 28,
                  right: 28,
                  color: 'white',
                  transform: 'translateZ(40px)',
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    letterSpacing: '-0.5px',
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  Dr. Wyatt
                  <br />
                  Dannels, DDS
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    opacity: 0.85,
                  }}
                >
                  20 yrs · Las Vegas, NV
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — quote + bio + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#3B82F6',
                marginBottom: 20,
              }}
            >
              Founder's Note
            </div>

            <h3
              style={{
                fontSize: 'clamp(28px, 3.6vw, 44px)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-1.2px',
                color: '#0A0A0F',
                margin: '0 0 28px',
                textTransform: 'uppercase',
              }}
            >
              "We grew because we
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontStyle: 'italic',
                }}
              >
                {' '}earned{' '}
              </span>
              every patient — one office at a time."
            </h3>

            <p
              style={{
                fontSize: 17,
                color: 'rgba(10,10,15,0.65)',
                lineHeight: 1.65,
                margin: '0 0 36px',
                maxWidth: 540,
              }}
            >
              Dr. Dannels opened Boca's first office on Eastern in 2006. Today
              he leads a team of 14 dentists across nine LV-area locations —
              still seeing patients every week, still personally reviewing
              treatment plans for the most complex cases.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                flexWrap: 'wrap',
              }}
            >
              <motion.a
                href={`/about-us/dentists/${featured.slug}/`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  color: 'white',
                  borderRadius: 999,
                  padding: '14px 26px',
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  boxShadow: '0 12px 28px rgba(243,103,42,0.32)',
                }}
              >
                Read full bio
                <ArrowUpRight size={14} />
              </motion.a>

              <a
                href="/about-us/dentists/"
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#0A0A0F',
                  textDecoration: 'none',
                  letterSpacing: 0.4,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  paddingBottom: 4,
                  borderBottom: '2px solid #3B82F6',
                }}
              >
                + {otherCount} more dentists →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default DoctorFeatureV4
