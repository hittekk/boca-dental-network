import { motion } from 'framer-motion'
import { MapPin, CreditCard, Clock, UserPlus } from 'lucide-react'
import { GoogleG } from '../shared/icons/GoogleG'

const ITEMS = [
  {
    icon: <GoogleG size={20} />,
    value: '4.9',
    suffix: '★',
    label: 'Google rating',
    sub: '1,200+ reviews',
  },
  {
    icon: <MapPin size={18} style={{ color: '#F3672A' }} />,
    value: '9',
    suffix: '',
    label: 'Las Vegas locations',
    sub: 'Open 7 days',
  },
  {
    icon: <CreditCard size={18} style={{ color: '#F3672A' }} />,
    value: '30',
    suffix: '+',
    label: 'Insurance plans',
    sub: 'Medicaid + CHIP',
  },
  {
    icon: <Clock size={18} style={{ color: '#F3672A' }} />,
    value: '7am',
    suffix: '–7pm',
    label: 'Evening + weekend',
    sub: 'Most clinics',
  },
  {
    icon: <UserPlus size={18} style={{ color: '#F3672A' }} />,
    value: 'New',
    suffix: '',
    label: 'Patients welcome',
    sub: 'Same-day available',
  },
]

export function TrustBarV3() {
  return (
    <div
      style={{
        background: '#0A0A0F',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
      role="region"
      aria-label="Boca Dental & Braces trust signals"
    >
      {/* Subtle horizontal scan line — modern tech aesthetic */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(to right, transparent 0%, rgba(243,103,42,0.4) 20%, rgba(243,103,42,0.4) 80%, transparent 100%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="trustbar-v3"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.06)',
        }}
      >
        <style>{`
          @media (max-width: 980px) {
            .trustbar-v3 { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 460px) {
            .trustbar-v3 { grid-template-columns: 1fr !important; }
          }
        `}</style>
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            style={{
              background: '#0A0A0F',
              padding: '6px 22px 6px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              position: 'relative',
              transition: 'background 0.25s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background =
                'rgba(243,103,42,0.04)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#0A0A0F'
            }}
          >
            {/* Monospace index label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / {String(i + 1).padStart(2, '0')}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </div>
            </div>

            {/* Big value */}
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: 'white',
                lineHeight: 1,
                letterSpacing: '-0.8px',
                display: 'flex',
                alignItems: 'baseline',
                gap: 2,
              }}
            >
              {item.value}
              <span style={{ color: '#F3672A', fontSize: '0.7em' }}>
                {item.suffix}
              </span>
            </div>

            {/* Label + sub */}
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.85)',
                  letterSpacing: 0.2,
                  lineHeight: 1.2,
                  marginBottom: 2,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.3,
                }}
              >
                {item.sub}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default TrustBarV3
