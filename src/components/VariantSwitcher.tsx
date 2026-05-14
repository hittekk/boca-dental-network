import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { INITIAL_DATA } from '../data/initialData'

export type Variant = 'a' | 'b' | 'c'

interface VariantSwitcherProps {
  current: Variant
  onChange: (next: Variant) => void
}

const VARIANTS: { key: Variant; label: string; tag: string }[] = [
  { key: 'a', label: 'A', tag: 'Modern Clinic' },
  { key: 'b', label: 'B', tag: 'Warm Editorial' },
  { key: 'c', label: 'C', tag: 'Super Modern' },
]

export function VariantSwitcher({ current, onChange }: VariantSwitcherProps) {
  const activeTag = VARIANTS.find((v) => v.key === current)?.tag ?? ''
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [pickerOpen, setPickerOpen] = useState(false)

  const isLocationPage = pathname.startsWith('/clinics/')
  const pageContext = isLocationPage
    ? 'Location'
    : pathname === '/'
      ? 'Home'
      : 'Page'

  const currentSlug = isLocationPage
    ? pathname.replace(/^\/clinics\//, '').replace(/\/$/, '')
    : null
  const currentLocation = INITIAL_DATA.locations.find(
    (l) => l.slug === currentSlug,
  )

  const jumpTo = (target: 'home' | string) => {
    const params = new URLSearchParams(window.location.search)
    const qs = params.toString()
    const path = target === 'home' ? '/' : `/clinics/${target}/`
    navigate(qs ? `${path}?${qs}` : path)
    setPickerOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }

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
        <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700 }}>
          {pageContext}
        </span>
        <span style={{ opacity: 0.35 }}>·</span>
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

      {/* Divider */}
      <span
        aria-hidden
        style={{
          width: 1,
          height: 18,
          background: 'rgba(255,255,255,0.15)',
          margin: '0 6px 0 4px',
        }}
      />

      {/* Page picker — jump between home and 9 location pages */}
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setPickerOpen((v) => !v)}
          style={{
            background: pickerOpen ? 'rgba(255,255,255,0.12)' : 'transparent',
            color: 'white',
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
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <span style={{ opacity: 0.8 }}>
            {isLocationPage && currentLocation ? currentLocation.label : 'Home'}
          </span>
          <span style={{ fontSize: 9, opacity: 0.7 }}>▾</span>
        </button>

        {pickerOpen && (
          <>
            {/* Click-outside backdrop */}
            <div
              onClick={() => setPickerOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 'calc(100% + 12px)',
                right: 0,
                zIndex: 101,
                minWidth: 260,
                background: 'rgba(0, 29, 61, 0.96)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
                padding: '8px',
                boxShadow:
                  '0 24px 60px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
                maxHeight: 420,
                overflowY: 'auto',
              }}
            >
              {/* Section label: Home */}
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  padding: '8px 12px 6px',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / Homepage
              </div>
              <PickerItem
                active={!isLocationPage}
                label="Homepage"
                sub={`Variant ${current.toUpperCase()} · ${activeTag}`}
                onClick={() => jumpTo('home')}
              />

              {/* Section label: Location sample */}
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  padding: '14px 12px 6px',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / Location page · sample
              </div>
              {(() => {
                const sample =
                  INITIAL_DATA.locations.find(
                    (l) => l.slug === 'russell-eastern',
                  ) ?? INITIAL_DATA.locations[0]
                return (
                  <PickerItem
                    active={currentSlug === sample.slug}
                    label={sample.label}
                    sub={`${sample.neighborhood} · Sample location`}
                    onClick={() => jumpTo(sample.slug)}
                  />
                )
              })()}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

function PickerItem({
  active,
  label,
  sub,
  onClick,
}: {
  active: boolean
  label: string
  sub: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 2,
        width: '100%',
        textAlign: 'left',
        background: active ? 'rgba(243,103,42,0.16)' : 'transparent',
        border: active
          ? '1px solid rgba(243,103,42,0.4)'
          : '1px solid transparent',
        color: 'white',
        borderRadius: 8,
        padding: '9px 12px',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'background 0.15s ease',
      }}
      onMouseEnter={(e) => {
        if (!active)
          ((e.currentTarget as HTMLElement).style.background =
            'rgba(255,255,255,0.06)')
      }}
      onMouseLeave={(e) => {
        if (!active)
          ((e.currentTarget as HTMLElement).style.background = 'transparent')
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'white',
          letterSpacing: '-0.1px',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 11,
          color: active ? '#F3672A' : 'rgba(255,255,255,0.5)',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          letterSpacing: 0.3,
        }}
      >
        {sub}
      </span>
    </button>
  )
}

export default VariantSwitcher
