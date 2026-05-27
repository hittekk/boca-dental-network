import { motion } from 'framer-motion'
import { MapPin, CreditCard, Clock, UserPlus, Languages } from 'lucide-react'
import { GoogleG } from './icons/GoogleG'
import { useLang, t } from '../../lib/lang'

type Theme = 'light' | 'dark' | 'cream'

function getItems(lang: import('../../lib/lang').Lang) { return [
  { icon: <GoogleG size={14} />, text: t(lang, '4.9 — 1,200+ Google Reviews', '4.9 — Más de 1,200 Reseñas en Google'), bold: true },
  { icon: <MapPin size={13} />, text: t(lang, '9 Las Vegas Locations', '9 Clínicas en Las Vegas') },
  { icon: <CreditCard size={13} />, text: t(lang, 'Most Insurance Accepted', 'Aceptamos la Mayoría de Seguros') },
  { icon: <Clock size={13} />, text: t(lang, 'Evening & Weekend Hours', 'Horario de Noche y Fin de Semana') },
  { icon: <UserPlus size={13} />, text: t(lang, 'Accepting New Patients', 'Aceptamos Nuevos Pacientes') },
  { icon: <Languages size={13} />, text: t(lang, 'Se Habla Español', 'Se Habla Español') },
]}

export function TrustBar({ theme = 'light' }: { theme?: Theme }) {
  const lang = useLang()
  const ITEMS = getItems(lang)
  const isDark = theme === 'dark'
  const bg = isDark ? '#0F0F15' : theme === 'cream' ? '#FFF4ED' : 'white'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,15,0.06)'
  const textColor = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(10,10,15,0.78)'
  const iconColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(10,10,15,0.5)'
  const dividerColor = isDark ? 'rgba(255,255,255,0.14)' : 'rgba(10,10,15,0.12)'
  const chipBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(10,10,15,0.03)'
  const chipBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,15,0.06)'

  return (
    <div
      style={{
        background: bg,
        borderTop: `1px solid ${border}`,
        borderBottom: `1px solid ${border}`,
        padding: '18px 20px',
      }}
      role="region"
      aria-label="Boca Dental & Braces trust signals"
    >
      <style>{`
        /* Desktop: single horizontal row with dividers — 6th item (Se Habla Español) hidden */
        .trust-bar-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 12px 0;
        }
        .trust-bar-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 22px;
          border-right: 1px solid var(--trust-divider);
        }
        .trust-bar-item:last-child,
        .trust-bar-item:nth-last-child(2) { border-right: none; }
        .trust-bar-item-text { white-space: nowrap; }
        /* Hide the 6th item (Se Habla Español) everywhere except phone */
        .trust-bar-item:nth-child(6) { display: none; }

        /* Tablet: 2-col grid of chips, no dividers; 5th item spans both cols */
        @media (max-width: 760px) {
          .trust-bar-row {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            max-width: 540px;
          }
          .trust-bar-item {
            border-right: none !important;
            padding: 10px 12px !important;
            background: var(--trust-chip-bg);
            border: 1px solid var(--trust-chip-border);
            border-radius: 999px;
            justify-content: center;
          }
          .trust-bar-item-text {
            white-space: normal;
            text-align: center;
          }
          /* 5th item (Accepting New Patients) spans both columns so the last row fills cleanly */
          .trust-bar-item:nth-child(5) { grid-column: span 2; }
        }

        /* Phone: single column stack — surface the 6th item (Se Habla Español) here */
        @media (max-width: 460px) {
          .trust-bar-row { grid-template-columns: 1fr !important; }
          .trust-bar-item:nth-child(5) { grid-column: auto; }
          .trust-bar-item:nth-child(6) { display: inline-flex; }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="trust-bar-row"
        style={
          {
            maxWidth: 1280,
            margin: '0 auto',
            // Custom properties feed the media queries above
            ['--trust-divider' as string]: dividerColor,
            ['--trust-chip-bg' as string]: chipBg,
            ['--trust-chip-border' as string]: chipBorder,
          } as React.CSSProperties
        }
      >
        {ITEMS.map((item, i) => (
          <div key={i} className="trust-bar-item">
            <span style={{ color: iconColor, display: 'inline-flex' }}>{item.icon}</span>
            <span
              className="trust-bar-item-text"
              style={{
                fontSize: 12,
                fontWeight: item.bold ? 800 : 700,
                letterSpacing: 0.4,
                color: textColor,
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
