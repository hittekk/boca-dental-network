import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, ChevronDown } from 'lucide-react'
import type { Brand } from '../../types'

interface HeroProps {
  brand: Brand
}

const STATS = [
  { value: 4.9, suffix: '★', label: 'Average Rating' },
  { value: 2200, suffix: '+', label: 'Patient Reviews' },
  { value: 9, suffix: '', label: 'Locations' },
  { value: 20, suffix: 'yrs', label: 'Experience' },
]

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatItem({
  stat,
  index,
  animate,
}: {
  stat: (typeof STATS)[0]
  index: number
  animate: boolean
}) {
  const decimalCount = useCountUp(stat.value * 10, 2000, animate)
  const intCount = useCountUp(stat.value, 2000, animate)
  const display =
    stat.value % 1 !== 0 ? (decimalCount / 10).toFixed(1) : intCount

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
      className="text-center px-6 md:px-10"
      style={{
        borderRight:
          index < STATS.length - 1
            ? '1px solid rgba(255,255,255,0.12)'
            : 'none',
      }}
    >
      <div
        className="font-display font-extrabold leading-none"
        style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          color: '#F3672A',
        }}
      >
        {display}
        {stat.suffix}
      </div>
      <div
        className="text-white/50 uppercase tracking-widest mt-1"
        style={{ fontSize: 9 }}
      >
        {stat.label}
      </div>
    </motion.div>
  )
}

export function Hero({ brand }: HeroProps) {
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const scrollToLocations = () => {
    document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 180,
        paddingBottom: 96,
        background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1.5px solid rgba(243,103,42,0.12)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-15%',
          left: '-8%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.04)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(243,103,42,0.06)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(243,103,42,0.06) 0%, transparent 60%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 28,
            background: 'rgba(243,103,42,0.12)',
            border: '1px solid rgba(243,103,42,0.32)',
            borderRadius: 20,
            padding: '6px 20px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#F3672A',
          }}
        >
          Accepting New Patients · Most Insurance · Medicaid Welcome
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          style={{
            fontSize: 'clamp(34px, 4.6vw, 58px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-1px',
            lineHeight: 1.05,
            color: 'white',
            margin: '0 0 22px',
            maxWidth: 940,
          }}
        >
          <span style={{ display: 'block' }}>
            Las Vegas'{' '}
            <span style={{ color: '#F3672A' }}>Most Trusted</span>
          </span>
          <span style={{ display: 'block' }}>
            Dental &amp; Braces Group
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          style={{
            fontSize: 17,
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.65,
            maxWidth: 540,
            margin: '0 0 36px',
          }}
        >
          General dentistry, braces, implants, and pediatric care
          across 9 convenient Las Vegas–area locations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
            marginBottom: 64,
          }}
        >
          <button
            onClick={scrollToLocations}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#F3672A',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '14px 32px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#d95a22')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#F3672A')
            }
          >
            <MapPin size={16} />
            Find My Location
          </button>

          <a
            href={`tel:${brand.phone.replace(/\D/g, '')}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.35)',
              borderRadius: 8,
              padding: '14px 32px',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'rgba(255,255,255,0.08)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = 'transparent')
            }
          >
            <Phone size={16} />
            {brand.phone}
          </a>
        </motion.div>

        <motion.div
          ref={statsRef}
          initial={{ opacity: 0 }}
          animate={statsVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            paddingTop: 36,
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              stat={stat}
              index={i}
              animate={statsVisible}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          y: { delay: 2, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        onClick={scrollToLocations}
      >
        <span className="text-white/30 uppercase tracking-widest" style={{ fontSize: 9 }}>
          Scroll
        </span>
        <ChevronDown size={16} className="text-white/30" />
      </motion.div>
    </section>
  )
}

export default Hero
