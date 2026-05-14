import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Phone, Sparkles, Heart, Smile } from 'lucide-react'

const KID_FACTS = [
  {
    icon: Smile,
    num: 'Age 1',
    label: 'First visit',
    sub: 'When the first tooth shows up.',
  },
  {
    icon: Heart,
    num: 'Yes',
    label: 'Medicaid + CHIP',
    sub: 'Accepted at every Boca Kids clinic.',
  },
  {
    icon: Sparkles,
    num: 'Sí',
    label: 'En español',
    sub: 'Hablamos español todos los días.',
  },
]

/** Animated number that counts up to target when in view. */
function useCountUp(target: number, durationMs = 1600, start = true) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    let startTime: number | null = null
    const step = (t: number) => {
      if (startTime === null) startTime = t
      const progress = Math.min((t - startTime) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * target)
      if (progress < 1) raf = requestAnimationFrame(step)
      else setValue(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs, start])
  return value
}

function ParentRatingCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reviewCount = useCountUp(200, 1800, inView)
  const rating = useCountUp(4.9, 1400, inView)
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
      <div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: 'white',
            lineHeight: 1,
            letterSpacing: '-1.5px',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {rating.toFixed(1)}
          <span style={{ color: '#F3672A', fontSize: 32, marginLeft: 4 }}>★</span>
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
            marginTop: 6,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          From parents
        </div>
      </div>
      <div
        aria-hidden
        style={{
          width: 1,
          height: 44,
          background: 'rgba(255,255,255,0.18)',
        }}
      />
      <div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: 'white',
            lineHeight: 1,
            letterSpacing: '-1.5px',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {Math.round(reviewCount)}
          <span style={{ color: '#F3672A' }}>+</span>
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.55)',
            marginTop: 6,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Pediatric reviews
        </div>
      </div>
    </div>
  )
}

export function BocaKidsV3() {
  return (
    <section
      id="boca-kids"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Big "KIDS" watermark — subtle on dark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -40,
          right: -30,
          fontSize: 'clamp(220px, 26vw, 420px)',
          fontWeight: 800,
          color: 'rgba(243,103,42,0.06)',
          lineHeight: 0.85,
          letterSpacing: '-14px',
          pointerEvents: 'none',
          userSelect: 'none',
          textTransform: 'uppercase',
        }}
      >
        KIDS
      </div>

      {/* Animated orange glow blobs */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '-8%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.16) 0%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: 500,
          height: 500,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
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
            [ 06 ] · Boca Kids
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 72,
            alignItems: 'center',
          }}
        >
          {/* ── LEFT — copy + facts + CTAs ────────────────────── */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
              style={{
                fontSize: 'clamp(42px, 5.4vw, 72px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2px',
                color: 'white',
                margin: '0 0 32px',
                textTransform: 'uppercase',
              }}
            >
              Dental
              <br />
              that doesn't{' '}
              <span
                style={{
                  fontStyle: 'italic',
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                scare
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: '#F3672A',
                    transformOrigin: 'left',
                  }}
                />
              </span>
              <br />
              kids.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.7)',
                margin: '0 0 36px',
                maxWidth: 520,
              }}
            >
              Two pediatric Boca Kids offices designed from the operatory up
              for tiny humans. Bilingual team, Medicaid welcome, prizes on the
              way out, no scary metallic tools left within sight.
            </motion.p>

            {/* Animated parent rating row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                padding: '24px 0 28px',
                marginBottom: 36,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <ParentRatingCounter />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
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
                  padding: '15px 28px',
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  boxShadow: '0 12px 32px rgba(243,103,42,0.4)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#d95a22'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#F3672A'
                  el.style.transform = 'translateY(0)'
                }}
              >
                Find Boca Kids
                <ArrowUpRight size={16} />
              </a>
              <a
                href="tel:7023891543"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  color: 'white',
                  borderRadius: 8,
                  padding: '14px 26px',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: 0.4,
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,255,255,0.12)'
                  el.style.borderColor = 'rgba(255,255,255,0.4)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'rgba(255,255,255,0.06)'
                  el.style.borderColor = 'rgba(255,255,255,0.22)'
                }}
              >
                <Phone size={14} />
                (702) 389-1543
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — image with floating callout + fact pills ─ */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            {/* The image */}
            <div
              style={{
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              <img
                src="/boca-kids-office.webp"
                alt="A smiling child in a Boca Kids dental chair with a friendly hygienist showing them a mirror"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '35% center',
                  display: 'block',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(to bottom, transparent 40%, rgba(10,10,15,0.5) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Floating "promise" callout — pulsing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{
                position: 'absolute',
                top: 24,
                left: -32,
                background: '#0A0A0F',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 18,
                padding: '20px 26px',
                color: 'white',
                maxWidth: 320,
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'rgba(243,103,42,0.15)',
                  border: '1px solid rgba(243,103,42,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}
              >
                <Sparkles size={18} color="#F3672A" />
              </motion.div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                  marginBottom: 6,
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / The promise
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1.3,
                  letterSpacing: '-0.3px',
                }}
              >
                No tears today,
                <br />
                better teeth tomorrow.
              </div>
            </motion.div>

            {/* Floating fact strip — bottom of image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                position: 'absolute',
                bottom: -28,
                left: 24,
                right: -32,
                background: '#0A0A0F',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 16,
                padding: '6px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                overflow: 'hidden',
              }}
            >
              {KID_FACTS.map((fact, i) => {
                const Icon = fact.icon
                return (
                  <motion.div
                    key={fact.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.65 + i * 0.08, duration: 0.4 }}
                    style={{
                      padding: '14px 16px',
                      borderRight:
                        i < KID_FACTS.length - 1
                          ? '1px solid rgba(255,255,255,0.08)'
                          : 'none',
                      cursor: 'default',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background =
                        'rgba(243,103,42,0.06)'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background =
                        'transparent'
                    }}
                  >
                    <Icon
                      size={14}
                      style={{ color: '#F3672A', marginBottom: 6 }}
                    />
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: 'white',
                        lineHeight: 1,
                        letterSpacing: '-0.4px',
                      }}
                    >
                      {fact.num}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.55)',
                        marginTop: 4,
                        fontFamily:
                          'ui-monospace, "SF Mono", Menlo, monospace',
                      }}
                    >
                      / {fact.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BocaKidsV3
