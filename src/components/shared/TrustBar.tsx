import { motion } from 'framer-motion'
import { Star, MapPin, CreditCard, Clock, UserPlus } from 'lucide-react'

type Theme = 'light' | 'dark' | 'cream'

const ITEMS = [
  { icon: <Star size={13} fill="#F3672A" style={{ color: '#F3672A' }} />, text: '4.9 — 1,200+ Google Reviews', bold: true },
  { icon: <MapPin size={13} />, text: '9 Las Vegas Locations' },
  { icon: <CreditCard size={13} />, text: 'Most Insurance Accepted' },
  { icon: <Clock size={13} />, text: 'Evening & Weekend Hours' },
  { icon: <UserPlus size={13} />, text: 'Accepting New Patients' },
]

export function TrustBar({ theme = 'light' }: { theme?: Theme }) {
  const isDark = theme === 'dark'
  const bg = isDark ? 'rgba(255,255,255,0.04)' : theme === 'cream' ? '#FFF4ED' : 'white'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,15,0.06)'
  const textColor = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,15,0.78)'
  const iconColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,15,0.5)'
  const dividerColor = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(10,10,15,0.12)'

  return (
    <div
      style={{
        background: bg,
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        padding: '18px 24px',
      }}
      role="region"
      aria-label="Boca Dental & Braces trust signals"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px 0',
        }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 22px',
              borderRight: i < ITEMS.length - 1 ? `1px solid ${dividerColor}` : 'none',
            }}
          >
            <span style={{ color: iconColor, display: 'inline-flex' }}>{item.icon}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: item.bold ? 800 : 700,
                letterSpacing: 0.4,
                color: textColor,
                whiteSpace: 'nowrap',
              }}
            >
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default TrustBar
