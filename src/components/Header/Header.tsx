// ─────────────────────────────────────────────────────────────────────────────
// src/components/Header/Header.tsx
//
// Glassmorphic sticky header for Boca Dental and Braces.
//
// Inline-styles-only refactor (no Tailwind utility classes inside the
// component) — keeps the project consistent with the rest of the codebase
// per CLAUDE4 rules. Behavior is identical to the previous Tailwind version:
//
//   • Starts transparent over the hero
//   • Transitions to dark glass on scroll past 80px
//   • Height collapses 72px → 60px on scroll
//   • Announcement bar (dismissible, sessionStorage-persistent)
//   • Desktop ≥ 1024px: logo · nav links · CTAs
//   • Mobile < 1024px: logo · hamburger · slide-down menu
//   • All animations via Framer Motion
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Phone, X, ChevronRight, Calendar } from 'lucide-react'
import type { Brand, Announcement, NavLink } from '../../types'
import { BocaLogo } from './BocaLogo'

// ── Types ────────────────────────────────────────────────────────────────────

interface HeaderProps {
  brand: Brand
  announcement: Announcement
  activeSection?: string
  /** 'white' = light logo for dark heroes (Variant A); 'dark' = navy logo for cream/light heroes (Variant B) */
  logoMode?: 'white' | 'dark'
}

// ── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services/' },
  { label: 'Locations', href: '/clinics/' },
  { label: 'Boca Kids', href: '/clinics/boca-kids-dentistry/' },
  { label: 'About', href: '/about-us/' },
  { label: 'Reviews', href: '/patient-resources/reviews/' },
]

const SCROLL_THRESHOLD = 80

// All media-query responsive bits live in this single <style> block.
// Everything else is inline styles per project convention.
const HEADER_CSS = `
  .boca-hdr-desktop-only { display: none; }
  .boca-hdr-mobile-only  { display: flex; }
  @media (min-width: 1024px) {
    .boca-hdr-desktop-only { display: flex; }
    .boca-hdr-mobile-only  { display: none; }
    .boca-hdr-inner        { padding: 0 32px; }
  }

  @keyframes boca-shimmer {
    0%   { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
`

// ── Animation variants ──────────────────────────────────────────────────────

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, duration: 0.4, ease: 'easeOut' as const },
  }),
}

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: 'easeOut' as const },
  }),
}

const GLASS_BG = 'rgba(16, 29, 74, 0.80)'
const GLASS_BLUR = 'blur(20px) saturate(180%)'
const GLASS_BORDER = 'rgba(255,255,255,0.08)'
const GLASS_SHADOW = '0 4px 30px rgba(0,0,0,0.30)'
const ORANGE = '#F3672A'
const ORANGE_HOVER = '#d95a22'

// ── AnnouncementBar ─────────────────────────────────────────────────────────

function AnnouncementBar({ data }: { data: Announcement }) {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('boca-ann-dismissed') === '1'
  })

  const dismiss = useCallback(() => {
    sessionStorage.setItem('boca-ann-dismissed', '1')
    setDismissed(true)
  }, [])

  if (!data.enabled || dismissed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          width: '100%',
          overflow: 'hidden',
          background: ORANGE,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            position: 'relative',
          }}
        >
          <p
            style={{
              color: 'white',
              fontSize: 13,
              fontWeight: 600,
              textAlign: 'center',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {data.text}
          </p>

          {data.link && data.linkLabel && (
            <a
              href={data.link}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 12,
                fontWeight: 700,
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.3)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.2)')
              }
            >
              {data.linkLabel}
              <ChevronRight size={12} />
            </a>
          )}

          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss announcement"
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.8)',
              background: 'transparent',
              border: 'none',
              padding: 4,
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'white')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                'rgba(255,255,255,0.8)')
            }
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── DesktopNav ──────────────────────────────────────────────────────────────

function DesktopNav({
  activeSection,
  logoMode = 'white',
}: {
  activeSection?: string
  logoMode?: 'white' | 'dark'
}) {
  const isDark = logoMode === 'dark'
  const idleColor = isDark ? 'rgba(0,29,61,0.85)' : 'rgba(255,255,255,0.85)'
  const hoverColor = isDark ? '#001D3D' : 'white'
  return (
    <nav
      className="boca-hdr-desktop-only"
      aria-label="Primary"
      style={{
        alignItems: 'center',
        gap: 32,
      }}
    >
      {NAV_LINKS.map((link, i) => {
        const isActive = activeSection === link.href.replace('#', '')
        return (
          <motion.a
            key={link.href}
            href={link.href}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            style={{
              position: 'relative',
              color: idleColor,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              padding: '4px 0',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = hoverColor)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = idleColor)
            }
          >
            {link.label}
            {isActive && (
              <motion.span
                layoutId="nav-active"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -4,
                  height: 2,
                  borderRadius: 2,
                  background: ORANGE,
                }}
              />
            )}
          </motion.a>
        )
      })}
    </nav>
  )
}

// ── HeaderCTAs ──────────────────────────────────────────────────────────────

function HeaderCTAs({ phone, logoMode = 'white' }: { phone: string; logoMode?: 'white' | 'dark' }) {
  const isDark = logoMode === 'dark'
  const subtleColor = isDark ? 'rgba(0,29,61,0.6)' : 'rgba(255,255,255,0.6)'
  const phoneIdle = isDark ? 'rgba(0,29,61,0.75)' : 'rgba(255,255,255,0.75)'
  const phoneHover = isDark ? '#001D3D' : 'white'
  return (
    <div
      className="boca-hdr-desktop-only"
      style={{
        alignItems: 'center',
        gap: 16,
      }}
    >
      <a
        href="/oficina-de-habla-hispana/"
        style={{
          color: subtleColor,
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.color = phoneHover)
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.color = subtleColor)
        }
      >
        Se Habla Español
      </a>

      <a
        href={`tel:${phone.replace(/\D/g, '')}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: phoneIdle,
          fontSize: 12,
          fontWeight: 600,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.color = phoneHover)
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.color = phoneIdle)
        }
      >
        <Phone size={14} />
        {phone}
      </a>

      <a
        href="/request-consultation"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: 'white',
          fontSize: 14,
          fontWeight: 700,
          padding: '10px 20px',
          borderRadius: 8,
          background: ORANGE,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 8px 18px rgba(243,103,42,0.32)',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = ORANGE_HOVER)
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = ORANGE)
        }
      >
        <Calendar size={14} />
        Book Appointment
      </a>
    </div>
  )
}

// ── MobileMenu ──────────────────────────────────────────────────────────────

function MobileMenu({
  isOpen,
  onClose,
  phone,
}: {
  isOpen: boolean
  onClose: () => void
  phone: string
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={mobileMenuVariants}
          className="boca-hdr-mobile-only"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            padding: '0 16px 16px',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              borderRadius: 16,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              background: GLASS_BG,
              backdropFilter: GLASS_BLUR,
              WebkitBackdropFilter: GLASS_BLUR,
              border: `1px solid ${GLASS_BORDER}`,
              boxShadow: GLASS_SHADOW,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={mobileLinkVariants}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 8px',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${
                    i < NAV_LINKS.length - 1 ? 'rgba(255,255,255,0.1)' : 'transparent'
                  }`,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = ORANGE)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = 'white')
                }
              >
                {link.label}
                <ChevronRight
                  size={16}
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                />
              </motion.a>
            ))}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginTop: 16,
              }}
            >
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px 0',
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'rgba(255,255,255,0.1)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'transparent')
                }
              >
                <Phone size={14} />
                {phone}
              </a>
              <a
                href="/request-consultation"
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px 0',
                  borderRadius: 8,
                  background: ORANGE,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = ORANGE_HOVER)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = ORANGE)
                }
              >
                <Calendar size={14} />
                Book Appointment
              </a>
              <a
                href="/oficina-de-habla-hispana/"
                style={{
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginTop: 8,
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                Se Habla Español
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── HamburgerBtn ────────────────────────────────────────────────────────────

function HamburgerBtn({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      className="boca-hdr-mobile-only"
      style={{
        position: 'relative',
        width: 40,
        height: 40,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          display: 'block',
          width: 24,
          height: 2,
          background: 'white',
          borderRadius: 999,
          transformOrigin: 'center',
        }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'block',
          width: 24,
          height: 2,
          background: 'white',
          borderRadius: 999,
        }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          display: 'block',
          width: 24,
          height: 2,
          background: 'white',
          borderRadius: 999,
          transformOrigin: 'center',
        }}
      />
    </button>
  )
}

// ── Header (root export) ────────────────────────────────────────────────────

/**
 * Header
 * Root header component. Combines announcement bar, glass nav, mobile menu.
 * Never fetches its own data — always receives via props from App.tsx.
 *
 * @example
 *   <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} />
 */
export function Header({ brand, announcement, activeSection, logoMode = 'white' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { scrollY } = useScroll()

  useEffect(
    () => scrollY.on('change', (v) => setScrolled(v > SCROLL_THRESHOLD)),
    [scrollY],
  )

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <style>{HEADER_CSS}</style>

      <header
        aria-label={`${brand.name} site header`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
      >
        <AnnouncementBar data={announcement} />

        <motion.div
          animate={{
            background: scrolled ? GLASS_BG : 'rgba(0,0,0,0)',
            boxShadow: scrolled ? GLASS_SHADOW : 'none',
            borderBottom: `1px solid ${scrolled ? GLASS_BORDER : 'transparent'}`,
            backdropFilter: scrolled ? GLASS_BLUR : 'none',
            WebkitBackdropFilter: scrolled ? GLASS_BLUR : 'none',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ position: 'relative', width: '100%' }}
        >
          <motion.div
            className="boca-hdr-inner"
            animate={{ height: scrolled ? 60 : 72 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              maxWidth: 1280,
              margin: '0 auto',
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Once the user scrolls, the dark navy glass background kicks in
                — at that point everything must read as light-on-dark regardless
                of the variant's idle logoMode. */}
            <BocaLogo mode={scrolled ? 'white' : logoMode} />
            <DesktopNav
              activeSection={activeSection}
              logoMode={scrolled ? 'white' : logoMode}
            />
            <HeaderCTAs
              phone={brand.phone}
              logoMode={scrolled ? 'white' : logoMode}
            />
            <HamburgerBtn
              isOpen={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
            />
          </motion.div>

          <MobileMenu
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
            phone={brand.phone}
          />
        </motion.div>
      </header>
    </>
  )
}

export default Header
