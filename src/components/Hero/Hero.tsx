import { motion } from 'framer-motion'
import { MapPin, Phone, ChevronDown, Star } from 'lucide-react'
import type { Brand } from '../../types'
import { GoogleG } from '../shared/icons/GoogleG'

interface HeroProps {
  brand: Brand
}

export function Hero({ brand }: HeroProps) {
  const scrollToLocations = () => {
    document.getElementById('locations')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 180,
        paddingBottom: 96,
        background:
          'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)',
      }}
    >
      {/* Decorative rings (kept) */}
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
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(243,103,42,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Mobile-stack media query — Treysyde spec: single column on small screens */}
      <style>{`
        @media (max-width: 768px) {
          .boca-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .boca-hero-image {
            min-height: 320px !important;
            order: -1 !important;
          }
          .boca-hero-copy { text-align: center !important; }
          .boca-hero-copy > * { margin-left: auto !important; margin-right: auto !important; }
          .boca-hero-ctas { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
          .boca-hero-ctas > a, .boca-hero-ctas > button { width: 100% !important; justify-content: center !important; }
          .boca-hero-rating { justify-content: center !important; }
        }
      `}</style>
      <div
        className="boca-hero-grid"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 56,
          alignItems: 'stretch',
        }}
      >
        {/* LEFT — copy + CTAs */}
        <div className="boca-hero-copy">
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
              fontSize: 'clamp(34px, 4.6vw, 56px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-1.2px',
              lineHeight: 1.0,
              color: 'white',
              margin: '0 0 22px',
            }}
          >
            <span style={{ display: 'block' }}>Las Vegas' Dental</span>
            <span style={{ display: 'block' }}>Home for the</span>
            <span style={{ display: 'block', color: '#F3672A' }}>
              Whole Family
            </span>
            <span
              style={{
                display: 'block',
                fontSize: '0.34em',
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                marginTop: 18,
              }}
            >
              9 Locations · One Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.65,
              maxWidth: 540,
              margin: '0 0 36px',
            }}
          >
            General, cosmetic, orthodontic, and specialty dental care under
            one roof — with flexible scheduling, most insurance accepted, and
            free consultations at locations across Las Vegas.
          </motion.p>

          <motion.div
            className="boca-hero-ctas"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              marginBottom: 36,
            }}
          >
            {/* Primary CTA: Book an Appointment (per Treysyde spec) */}
            <a
              href="/request-consultation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#F3672A',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '14px 30px',
                fontSize: 15,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                transition: 'background 0.2s ease',
                boxShadow: '0 12px 28px rgba(243,103,42,0.32)',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#d95a22')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#F3672A')
              }
            >
              Book an Appointment
            </a>

            {/* Secondary CTA: Find a Location Near You (per Treysyde spec) */}
            <button
              onClick={scrollToLocations}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.35)',
                borderRadius: 8,
                padding: '12px 28px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.08)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'transparent')
              }
            >
              <MapPin size={16} />
              Find a Location Near You
            </button>
          </motion.div>

          {/* Inline rating line — micro trust signal in copy column */}
          <motion.div
            className="boca-hero-rating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', gap: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill="#F3672A"
                  style={{ color: '#F3672A' }}
                />
              ))}
            </div>
            <span style={{ fontWeight: 700, color: 'white' }}>4.9</span>
            <span style={{ opacity: 0.55 }}>·</span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <GoogleG size={14} />
              <span>1,200+ Google reviews</span>
            </span>
            <span style={{ opacity: 0.55 }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={13} color="#F3672A" />
              <span>across 9 Las Vegas offices</span>
            </span>
          </motion.div>
        </div>

        {/* RIGHT — hero image (stretches to match copy column height) */}
        <motion.div
          className="boca-hero-image"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.0, 0.0, 0.2, 1.0] }}
          style={{
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow:
              '0 24px 64px rgba(0,0,0,0.32), 0 8px 16px rgba(0,0,0,0.18)',
            border: '1px solid rgba(255,255,255,0.06)',
            minHeight: 520,
          }}
        >
          <img
            src="/hero-1.png"
            alt="A mother and daughter sharing a moment in the warmly lit Boca Dental and Braces waiting room — Las Vegas family dental practice"
            width={1312}
            height={736}
            loading="eager"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              display: 'block',
            }}
          />

          {/* Bottom gradient + caption chip */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 110,
              background:
                'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)',
              pointerEvents: 'none',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 18,
              left: 18,
              right: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#162E7A',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#10b981',
                }}
              />
              Now Booking
            </div>
            <div
              style={{
                background: '#F3672A',
                color: 'white',
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                boxShadow: '0 6px 14px rgba(243,103,42,0.45)',
              }}
            >
              Se Habla Español
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.5 },
          y: { delay: 2, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        onClick={scrollToLocations}
      >
        <span
          className="text-white/30 uppercase tracking-widest"
          style={{ fontSize: 9 }}
        >
          Scroll
        </span>
        <ChevronDown size={16} className="text-white/30" />
      </motion.div>
    </section>
  )
}

export default Hero
