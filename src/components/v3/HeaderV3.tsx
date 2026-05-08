import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Phone, ArrowUpRight, Menu, X } from 'lucide-react'
import type { Brand, Announcement } from '../../types'

interface HeaderV3Props {
  brand: Brand
  announcement: Announcement
}

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Locations', href: '#locations' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Why Boca', href: '#why-boca' },
  { label: 'FAQ', href: '#faq' },
]

export function HeaderV3({ brand, announcement }: HeaderV3Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useEffect(
    () => scrollY.on('change', (v) => setScrolled(v > 60)),
    [scrollY]
  )

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    >
      {/* Slim announcement strip — different vibe than v1 orange bar */}
      {announcement.enabled && (
        <div
          style={{
            background: '#0A0A0F',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '8px 24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 0 3px rgba(16,185,129,0.18)',
            }}
          />
          {announcement.text}
          {announcement.linkLabel && (
            <a
              href={announcement.link ?? '#'}
              style={{
                color: '#F3672A',
                textDecoration: 'none',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              {announcement.linkLabel}
              <ArrowUpRight size={11} />
            </a>
          )}
        </div>
      )}

      {/* Main nav row — glass when scrolled, transparent at top */}
      <motion.div
        animate={{
          background: scrolled ? 'rgba(10,10,15,0.85)' : 'rgba(10,10,15,0)',
          borderBottomColor: scrolled
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: 68,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img
              src="/boca-logo.png"
              alt="Boca Dental and Braces"
              style={{ height: 28, width: 'auto', display: 'block' }}
            />
            <div
              style={{
                paddingLeft: 14,
                borderLeft: '1px solid rgba(255,255,255,0.16)',
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                lineHeight: 1.3,
              }}
            >
              <div>LV · 9 Offices</div>
              <div style={{ color: 'rgba(255,255,255,0.3)' }}>Est. 2006</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-block',
                  padding: '8px 14px',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  borderRadius: 999,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'white'
                  ;(e.currentTarget as HTMLElement).style.background =
                    'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color =
                    'rgba(255,255,255,0.7)'
                  ;(e.currentTarget as HTMLElement).style.background =
                    'transparent'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <a
              href={`tel:${brand.phone.replace(/\D/g, '')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 12,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                letterSpacing: 0.4,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = '#F3672A')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  'rgba(255,255,255,0.75)')
              }
            >
              <Phone size={13} />
              {brand.phone}
            </a>

            <a
              href="#request-consultation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#F3672A',
                color: 'white',
                borderRadius: 999,
                padding: '10px 22px',
                fontSize: 12,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 1,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#d95a22')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#F3672A')
              }
            >
              Book Visit
              <ArrowUpRight size={13} />
            </a>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{
                display: 'none',
                width: 40,
                height: 40,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                background: 'rgba(10,10,15,0.95)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                {NAV.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{
                      padding: '14px 18px',
                      fontSize: 14,
                      fontWeight: 700,
                      color: 'white',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}

export default HeaderV3
