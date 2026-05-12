import { motion } from 'framer-motion'

export type Variant = 'a' | 'b' | 'c' | 'd'

interface VariantSwitcherProps {
  current: Variant
  onChange: (next: Variant) => void
}

const VARIANTS: { key: Variant; label: string; tag: string }[] = [
  { key: 'a', label: 'A', tag: 'Modern Clinic' },
  { key: 'b', label: 'B', tag: 'Warm Editorial' },
  { key: 'c', label: 'C', tag: 'Super Modern' },
  { key: 'd', label: 'D', tag: 'Futuristic Light' },
]

export function VariantSwitcher({ current, onChange }: VariantSwitcherProps) {
  const activeTag = VARIANTS.find((v) => v.key === current)?.tag ?? ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.4 }}
      className="boca-variant-switcher"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 100,
        background: 'rgba(0, 29, 61, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 999,
        padding: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* On mobile lift above the sticky CTA bar */}
      <style>{`
        @media (max-width: 767px) {
          .boca-variant-switcher { bottom: 90px !important; }
        }
      `}</style>
      <div
        style={{
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          padding: '0 12px 0 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          whiteSpace: 'nowrap',
        }}
      >
        Mockup
        <span style={{ color: '#F3672A', fontWeight: 700 }}>{activeTag}</span>
      </div>
      {VARIANTS.map((v) => {
        const active = current === v.key
        return (
          <button
            key={v.key}
            onClick={() => onChange(v.key)}
            title={v.tag}
            style={{
              background: active ? '#F3672A' : 'transparent',
              color: active ? 'white' : 'rgba(255,255,255,0.7)',
              border: 'none',
              borderRadius: 999,
              padding: '8px 14px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              if (!active)
                ((e.currentTarget as HTMLElement).style.color = 'white')
            }}
            onMouseLeave={(e) => {
              if (!active)
                ((e.currentTarget as HTMLElement).style.color =
                  'rgba(255,255,255,0.7)')
            }}
          >
            {v.label}
          </button>
        )
      })}
    </motion.div>
  )
}

export default VariantSwitcher
