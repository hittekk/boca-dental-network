import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, Check } from 'lucide-react'

const TRUST_BITS = [
  'Same-day visits available',
  'New patients always welcome',
  'Most insurance accepted',
  'Medicaid · CHIP · Se habla español',
]

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
      {/* Logo watermark — consistent with Hero V2 */}
      <img
        aria-hidden
        src="/boca-logo.png"
        alt=""
        style={{
          position: 'absolute',
          top: -40,
          right: -80,
          width: 'clamp(560px, 60vw, 1000px)',
          height: 'auto',
          opacity: 0.05,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Soft orange glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: 720,
          height: 720,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.15) 0%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}
      >
        {/* ── LEFT — headline + CTAs ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
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
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 0.95,
              letterSpacing: '-1.6px',
              margin: '0 0 28px',
            }}
          >
            Stop putting it{' '}
            <span
              style={{
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontStyle: 'italic',
                fontWeight: 500,
                color: '#F3672A',
                letterSpacing: '-2px',
              }}
            >
              off.
            </span>
            <br />
            Book a chair{' '}
            <span
              style={{
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontStyle: 'italic',
                fontWeight: 500,
                color: '#F3672A',
                letterSpacing: '-2px',
              }}
            >
              near you.
            </span>
          </h2>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.78)',
              margin: '0 0 36px',
              maxWidth: 560,
              fontWeight: 400,
              textWrap: 'pretty' as React.CSSProperties['textWrap'],
            }}
          >
            Same-day and next-day visits available across all 9 Boca offices.
            Insurance, Medicaid, financing — all sorted before you sit down.
          </p>

          {/* Pill CTAs — match the V2 standard */}
          <div
            style={{
              display: 'flex',
              gap: 14,
              flexWrap: 'wrap',
              alignItems: 'center',
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
                borderRadius: 999,
                padding: '15px 30px',
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                boxShadow: '0 12px 32px rgba(243,103,42,0.32)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#d95a22'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 16px 40px rgba(243,103,42,0.45)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#F3672A'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = '0 12px 32px rgba(243,103,42,0.32)'
              }}
            >
              Find an office
              <ArrowUpRight size={16} />
            </a>

            <a
              href="tel:7024560005"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.35)',
                borderRadius: 999,
                padding: '13px 28px',
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                letterSpacing: 0.5,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.08)'
                el.style.borderColor = 'white'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
                el.style.borderColor = 'rgba(255,255,255,0.35)'
              }}
            >
              <Phone size={14} />
              (702) 456-0005
            </a>
          </div>
        </motion.div>

        {/* ── RIGHT — editorial trust strip ─────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            padding: '36px 32px',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              color: '#F3672A',
              marginBottom: 18,
            }}
          >
            What to expect
          </div>

          <h3
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.15,
              letterSpacing: '-0.6px',
              margin: '0 0 24px',
            }}
          >
            We answer the phone.
            <br />
            <span
              style={{
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontStyle: 'italic',
                fontWeight: 500,
                color: '#F3672A',
              }}
            >
              You get a chair.
            </span>
          </h3>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              paddingTop: 22,
              borderTop: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {TRUST_BITS.map((bit, i) => (
              <motion.div
                key={bit}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.85)',
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(243,103,42,0.18)',
                    border: '1px solid rgba(243,103,42,0.4)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} style={{ color: '#F3672A' }} />
                </span>
                {bit}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTAv2
