import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Star, Sparkles } from 'lucide-react'
import type { Brand } from '../../types'

interface HeroV4Props {
  brand: Brand
}

function useCountUp(target: number, duration = 1800, start = true) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    let s: number
    const step = (t: number) => {
      if (!s) s = t
      const p = Math.min((t - s) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(eased * target)
      if (p < 1) raf = requestAnimationFrame(step)
      else setValue(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return value
}

export function HeroV4({ brand }: HeroV4Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animateStats, setAnimateStats] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setAnimateStats(true), 700)
    return () => clearTimeout(t)
  }, [])

  const reviews = useCountUp(2200, 2200, animateStats)
  const locations = useCountUp(9, 1000, animateStats)
  const years = useCountUp(20, 1500, animateStats)

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        background: '#FFFFFF',
        paddingTop: 168,
        paddingBottom: 120,
        overflow: 'hidden',
      }}
    >
      {/* Animated mesh gradient blobs */}
      <motion.div
        aria-hidden
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-15%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.45) 0%, rgba(255,138,80,0.25) 30%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '-15%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(96,165,250,0.2) 30%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '40%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,182,159,0.4) 0%, transparent 60%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(10,10,15,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 80% 50% at 50% 30%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 50% at 50% 30%, black 30%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 28px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Top eyebrow chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(10,10,15,0.06)',
            borderRadius: 999,
            padding: '8px 8px 8px 18px',
            marginBottom: 36,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 2px 12px rgba(10,10,15,0.04)',
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: '#0A0A0F',
            }}
          >
            Now Booking
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'white',
              background:
                'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
              borderRadius: 999,
              padding: '4px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 4px 12px rgba(243,103,42,0.32)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'white',
                animation: 'pulse-dot 1.5s ease-in-out infinite',
              }}
            />
            Live
          </span>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          {/* LEFT — headline + body + CTAs + counters */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
              style={{
                fontSize: 'clamp(48px, 7vw, 104px)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-3px',
                color: '#0A0A0F',
                margin: '0 0 32px',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'block' }}>The future</span>
              <span
                style={{
                  display: 'block',
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 50%, #3B82F6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% 100%',
                  animation: 'gradient-shift 6s ease-in-out infinite',
                }}
              >
                of dental
              </span>
              <span style={{ display: 'block', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                lives here.
                <Sparkles
                  size={48}
                  color="#F3672A"
                  style={{
                    animation: 'sparkle 3s ease-in-out infinite',
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                fontSize: 19,
                lineHeight: 1.6,
                color: 'rgba(10,10,15,0.65)',
                margin: '0 0 40px',
                maxWidth: 560,
              }}
            >
              Nine offices across LV. Modern technology, transparent pricing,
              and a team that takes Medicaid because every smile deserves the
              best of what dentistry can do today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 56 }}
            >
              <motion.a
                href="#locations"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  color: 'white',
                  borderRadius: 999,
                  padding: '18px 32px',
                  fontSize: 15,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  boxShadow: '0 16px 36px rgba(243,103,42,0.35)',
                }}
              >
                Find My Office
                <ArrowUpRight size={17} />
              </motion.a>

              <motion.a
                href={`tel:${brand.phone.replace(/\D/g, '')}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'white',
                  border: '1.5px solid rgba(10,10,15,0.08)',
                  color: '#0A0A0F',
                  borderRadius: 999,
                  padding: '16px 30px',
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: 'none',
                  letterSpacing: 0.3,
                  boxShadow: '0 4px 12px rgba(10,10,15,0.04)',
                }}
              >
                {brand.phone}
              </motion.a>
            </motion.div>

            {/* Animated counter row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 24,
                paddingTop: 32,
                borderTop: '1px solid rgba(10,10,15,0.08)',
                maxWidth: 540,
              }}
            >
              <CounterStat value={Math.round(reviews)} suffix="+" label="Reviews" />
              <CounterStat value={Math.round(locations)} label="Offices" />
              <CounterStat value={Math.round(years)} suffix="yrs" label="Experience" />
            </motion.div>
          </div>

          {/* RIGHT — floating UI mockups */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ position: 'relative', height: 580 }}
          >
            {/* Big main card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 40,
                right: 0,
                width: '85%',
                background: 'white',
                borderRadius: 28,
                padding: 28,
                boxShadow:
                  '0 24px 64px rgba(243,103,42,0.16), 0 8px 16px rgba(10,10,15,0.06)',
                border: '1px solid rgba(10,10,15,0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: '#3B82F6',
                  }}
                >
                  Today · Eastern & Russell
                </div>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 0 4px rgba(16,185,129,0.18)',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#0A0A0F',
                  letterSpacing: '-0.6px',
                  lineHeight: 1.15,
                  marginBottom: 22,
                }}
              >
                3 same-day
                <br />
                slots open.
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {['9:30 AM', '1:15 PM', '4:45 PM'].map((time, i) => (
                  <div
                    key={time}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: i === 1 ? '#F3672A' : '#F8F8FB',
                      color: i === 1 ? 'white' : '#0A0A0F',
                      borderRadius: 12,
                      padding: '12px 16px',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    <span>{time}</span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        opacity: 0.7,
                      }}
                    >
                      {i === 1 ? 'Booking…' : 'Open'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating rating chip */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'white',
                borderRadius: 18,
                padding: '14px 18px',
                boxShadow:
                  '0 16px 40px rgba(59,130,246,0.18), 0 4px 12px rgba(10,10,15,0.06)',
                border: '1px solid rgba(10,10,15,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div style={{ display: 'flex', gap: 1 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    fill="#F3672A"
                    style={{ color: '#F3672A' }}
                  />
                ))}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: '#0A0A0F',
                    lineHeight: 1,
                    letterSpacing: '-0.3px',
                  }}
                >
                  4.9
                </div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: 'rgba(10,10,15,0.5)',
                    marginTop: 2,
                  }}
                >
                  2,200+ reviews
                </div>
              </div>
            </motion.div>

            {/* Floating insurance pill */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{
                position: 'absolute',
                bottom: 80,
                left: 20,
                background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                color: 'white',
                borderRadius: 18,
                padding: '16px 20px',
                boxShadow: '0 16px 36px rgba(59,130,246,0.32)',
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  opacity: 0.85,
                  marginBottom: 6,
                }}
              >
                Insurance verified
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: '-0.3px',
                }}
              >
                Delta Dental · in network
              </div>
            </motion.div>

            {/* Floating doctor mini-chip */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 50,
                background: 'white',
                borderRadius: 18,
                padding: '14px 16px',
                boxShadow: '0 12px 28px rgba(10,10,15,0.08)',
                border: '1px solid rgba(10,10,15,0.04)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 0.3,
                }}
              >
                WD
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#0A0A0F',
                    lineHeight: 1.2,
                    letterSpacing: '-0.1px',
                  }}
                >
                  Dr. Wyatt Dannels
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: 'rgba(10,10,15,0.55)',
                    marginTop: 2,
                  }}
                >
                  Founder · 20 yrs
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.7; } }
        @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes sparkle { 0%, 100% { transform: rotate(0deg) scale(1); opacity: 1; } 50% { transform: rotate(180deg) scale(1.15); opacity: 0.85; } }
      `}</style>
    </section>
  )
}

function CounterStat({
  value,
  suffix = '',
  label,
}: {
  value: number
  suffix?: string
  label: string
}) {
  const formatted = value.toLocaleString()
  return (
    <div>
      <div
        style={{
          fontSize: 'clamp(28px, 3vw, 40px)',
          fontWeight: 800,
          color: '#0A0A0F',
          letterSpacing: '-1.5px',
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {formatted}
        <span style={{ color: '#F3672A' }}>{suffix}</span>
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'rgba(10,10,15,0.55)',
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default HeroV4
