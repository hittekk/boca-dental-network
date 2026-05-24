import { motion } from 'framer-motion'
import { Phone, Calendar } from 'lucide-react'

/**
 * MobileStickyCTA
 * Bottom-fixed dual CTA bar that appears only on mobile (≤ 767px).
 * Treysyde spec mandates: "Primary CTA Book an Appointment → sticky on mobile."
 *
 * Two buttons side by side:
 *  - Primary (orange):  Book Appointment → /request-consultation
 *  - Secondary (navy):  Call → tel: link
 *
 * Above the fold has its own desktop CTAs (Hero), so this only fires on mobile.
 */
export function MobileStickyCTA({ phone = '(702) 456-0005' }: { phone?: string }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      className="boca-mobile-cta"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderTop: '1px solid rgba(10,10,15,0.08)',
        padding: '12px 14px calc(12px + env(safe-area-inset-bottom))',
        display: 'flex',
        gap: 10,
        boxShadow: '0 -8px 24px rgba(10,10,15,0.08)',
      }}
    >
      <a
        href="/request-consultation"
        style={{
          flex: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          background: '#F3672A',
          color: 'white',
          borderRadius: 10,
          padding: '14px 16px',
          fontSize: 14,
          fontWeight: 800,
          textDecoration: 'none',
          textTransform: 'uppercase',
          letterSpacing: 0.4,
          boxShadow: '0 8px 20px rgba(243,103,42,0.32)',
        }}
      >
        <Calendar size={15} />
        Book Appointment
      </a>
      <a
        href={`tel:${phone.replace(/\D/g, '')}`}
        style={{
          flex: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          background: '#162E7A',
          color: 'white',
          borderRadius: 10,
          padding: '14px 18px',
          fontSize: 13,
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: 0.3,
          minWidth: 56,
        }}
        aria-label={`Call ${phone}`}
      >
        <Phone size={15} />
      </a>

      {/* Hide on desktop ≥768px */}
      <style>{`
        @media (min-width: 768px) {
          .boca-mobile-cta { display: none !important; }
        }
      `}</style>
    </motion.div>
  )
}

export default MobileStickyCTA
