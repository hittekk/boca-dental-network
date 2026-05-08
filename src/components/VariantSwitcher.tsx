import { motion } from 'framer-motion'

interface VariantSwitcherProps {
  current: 'a' | 'b'
  onChange: (next: 'a' | 'b') => void
}

export function VariantSwitcher({ current, onChange }: VariantSwitcherProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.4 }}
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
        gap: 0,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Mockup
      </div>
      {(['a', 'b'] as const).map((v) => {
        const active = current === v
        return (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{
              background: active ? '#F3672A' : 'transparent',
              color: active ? 'white' : 'rgba(255,255,255,0.7)',
              border: 'none',
              borderRadius: 999,
              padding: '8px 18px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => {
              if (!active) {
                ;(e.currentTarget as HTMLElement).style.color = 'white'
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                ;(e.currentTarget as HTMLElement).style.color =
                  'rgba(255,255,255,0.7)'
              }
            }}
          >
            {v.toUpperCase()}
          </button>
        )
      })}
    </motion.div>
  )
}

export default VariantSwitcher
