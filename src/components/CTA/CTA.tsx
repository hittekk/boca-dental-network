import { motion } from 'framer-motion'
import { useLang, t } from '../../lib/lang'
import { useSiteData } from '../../lib/site-data'
import { reviewAggregate } from '../../lib/reviews'
import {
  Phone,
  ArrowRight,
  Languages,
  ShieldCheck,
  Clock,
  Star,
} from 'lucide-react'

export function CTA() {
  const lang = useLang()
  const { locations } = useSiteData()
  const agg = reviewAggregate(locations)
  return (
    <section
      id="cta"
      style={{
        background:
          'linear-gradient(135deg, #ff7a3a 0%, #F3672A 45%, #d95a22 100%)',
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
      }}
    >
      {/* Subtle radial highlight top-left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-30%',
          left: '-10%',
          width: 760,
          height: 760,
          background:
            'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 60%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      {/* Deep warm glow bottom-right */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: 700,
          height: 700,
          background:
            'radial-gradient(circle, rgba(217,90,34,0.65) 0%, transparent 65%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      {/* Concentric decorative rings */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-25%',
          right: '-8%',
          width: 540,
          height: 540,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.12)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-40%',
          left: '-8%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.1)',
          pointerEvents: 'none',
        }}
      />
      {/* Dot pattern overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 90%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="cta-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              .cta-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            }
          `}</style>

          {/* LEFT — eyebrow + trust chips + headline + subtext */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'white',
                background: 'rgba(255,255,255,0.16)',
                border: '1px solid rgba(255,255,255,0.22)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: 999,
                padding: '6px 12px',
                marginBottom: 22,
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'white',
                  display: 'inline-block',
                }}
              />
              {t(lang, 'Final Step · Book your visit', 'Último Paso · Reserva Tu Visita')}
            </div>

            <h2
              style={{
                fontSize: 'clamp(32px, 4.6vw, 60px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'white',
                margin: '0 0 22px',
                letterSpacing: '-1.4px',
                lineHeight: 1.0,
              }}
            >
              {t(lang, 'Ready to book?', '¿Listo para Reservar?')}{' '}
              <span style={{ display: 'block' }}>
                {t(lang, 'Your new Las Vegas dentist is', 'Tu nuevo dentista en Las Vegas te')}{' '}
                <span style={{ fontStyle: 'italic', opacity: 0.9 }}>
                  {t(lang, 'waiting.', 'espera.')}
                </span>
              </span>
            </h2>

            <p
              style={{
                fontSize: 17,
                color: 'rgba(255,255,255,0.92)',
                lineHeight: 1.65,
                margin: '0 0 26px',
                maxWidth: 540,
              }}
            >
              {t(lang, 'Free consultations available. Most insurance accepted. Evening and weekend hours at all 9 Las Vegas locations.', 'Consultas gratuitas. La mayoría de seguros aceptados. Horario de noche y fin de semana en las 9 clínicas de Las Vegas.')}
            </p>

            {/* Trust pills with real icons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              <TrustPill icon={<Languages size={13} />} text={t(lang, "Se Habla Español", "Se Habla Español")} />
              <TrustPill icon={<ShieldCheck size={13} />} text={t(lang, "Nevada Medicaid", "Nevada Medicaid")} />
              <TrustPill icon={<Clock size={13} />} text={t(lang, "Mon–Sat · 9am–5pm", "Lun–Sáb · 9am–5pm")} />
              {agg && (
                <TrustPill
                  icon={<Star size={13} fill="white" />}
                  text={t(lang, `${agg.rating} · ${agg.count.toLocaleString('en-US')}+ reviews`, `${agg.rating} · Más de ${agg.count.toLocaleString('en-US')} Reseñas`)}
                />
              )}
            </div>
          </motion.div>

          {/* RIGHT — glass action card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.22)',
              backdropFilter: 'blur(16px) saturate(140%)',
              WebkitBackdropFilter: 'blur(16px) saturate(140%)',
              borderRadius: 18,
              padding: '24px 24px 22px',
              boxShadow:
                '0 24px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                marginBottom: 4,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                Booking now
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: 'white',
                  background: 'rgba(16,185,129,0.32)',
                  border: '1px solid rgba(16,185,129,0.55)',
                  borderRadius: 999,
                  padding: '4px 9px',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 6px rgba(16,185,129,0.8)',
                  }}
                />
                Live
              </div>
            </div>

            {/* Primary — Book online */}
            <a
              href="/request-consultation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                background: 'white',
                color: '#F3672A',
                borderRadius: 12,
                padding: '17px 22px',
                fontSize: 15,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                width: '100%',
                boxShadow:
                  '0 14px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.7)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform =
                  'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 20px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.7)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.transform =
                  'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 14px 32px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.7)'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <Clock size={16} />
                {t(lang, 'Book an appointment', 'Reservar Cita')}
              </span>
              <ArrowRight size={17} />
            </a>

            {/* Secondary — Call */}
            <a
              href="tel:7024560005"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                background: 'rgba(255,255,255,0.06)',
                color: 'white',
                border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: 12,
                padding: '14px 22px',
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.4,
                width: '100%',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.16)'
                el.style.borderColor = 'white'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.06)'
                el.style.borderColor = 'rgba(255,255,255,0.4)'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <Phone size={15} />
                (702) 456-0005
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 1,
                  opacity: 0.8,
                }}
              >
                24/7
              </span>
            </a>

            {/* Trust footer inside the card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                marginTop: 6,
                paddingTop: 14,
                borderTop: '1px solid rgba(255,255,255,0.18)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.4,
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <MapPinIcon /> 9 Las Vegas offices
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <ShieldCheck size={12} /> Insurance · Medicaid
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TrustPill({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: string
}) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.3,
        color: 'white',
        background: 'rgba(255,255,255,0.14)',
        border: '1px solid rgba(255,255,255,0.22)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderRadius: 999,
        padding: '7px 13px',
      }}
    >
      {icon}
      {text}
    </span>
  )
}

// Tiny inline location pin so the card footer doesn't need another import
function MapPinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default CTA
