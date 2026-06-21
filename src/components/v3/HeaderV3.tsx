import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { Phone, ArrowUpRight, Menu, X, Star, MapPin, Globe } from 'lucide-react'
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

// ── Ticker bar helpers ─────────────────────────────────────────
function TickerSegment({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 20px',
        cursor: 'default',
      }}
    >
      {children}
    </div>
  )
}

function TickerLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.7)',
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

function TickerDivider() {
  return (
    <div
      aria-hidden
      style={{
        width: 1,
        background: 'rgba(255,255,255,0.08)',
        margin: '8px 0',
        flexShrink: 0,
      }}
    />
  )
}

// Rotating announcement / news ticker. Cycles through the messages every 5s,
// cross-fading between each. Items are easy to swap by editing the NEWS array.
const NEWS = [
  'Now booking next week · 9 LV offices',
  'Closed Mon May 26 · Memorial Day',
  'New Henderson Boca Kids clinic — now open',
  'Same-day emergencies always available',
  'See location pages for holiday hours',
]

function NewsTicker() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % NEWS.length), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        minWidth: 280,
        height: 14,
        overflow: 'hidden',
        verticalAlign: 'middle',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {NEWS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

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
      {/* Multi-segment data ticker — premium "by-the-numbers" strip */}
      {announcement.enabled && (
        <div
          style={{
            background: '#0A0A0F',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Scan line accent at the top */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background:
                'linear-gradient(to right, transparent 0%, rgba(243,103,42,0.4) 15%, rgba(243,103,42,0.6) 50%, rgba(243,103,42,0.4) 85%, transparent 100%)',
            }}
          />

          {/* Animated shimmer that drifts across */}
          <motion.div
            aria-hidden
            animate={{ x: ['-30%', '130%'] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: 0,
              width: '20%',
              height: 1,
              background:
                'linear-gradient(to right, transparent 0%, rgba(243,103,42,1) 50%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              maxWidth: 1440,
              margin: '0 auto',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'stretch',
              minHeight: 44,
            }}
          >
            {/* Segment 1 — Rotating news ticker */}
            <TickerSegment>
              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    '0 0 0 0 rgba(243,103,42,0.6)',
                    '0 0 0 6px rgba(243,103,42,0)',
                    '0 0 0 0 rgba(243,103,42,0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#F3672A',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <NewsTicker />
            </TickerSegment>

            <TickerDivider />

            {/* Segment 2 — Rating */}
            <TickerSegment>
              <Star
                size={12}
                fill="#F3672A"
                style={{ color: '#F3672A', flexShrink: 0 }}
              />
              <TickerLabel>
                <strong style={{ color: 'white', fontWeight: 800 }}>4.9</strong>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}> · </span>
                1,200+ Google reviews
              </TickerLabel>
            </TickerSegment>

            <TickerDivider />

            {/* Segment 3 — Locations */}
            <TickerSegment>
              <MapPin size={12} style={{ color: '#F3672A', flexShrink: 0 }} />
              <TickerLabel>
                <strong style={{ color: 'white', fontWeight: 800 }}>9</strong>{' '}
                LV offices
                <span style={{ color: 'rgba(255,255,255,0.4)' }}> · </span>
                Open Mon–Sat
              </TickerLabel>
            </TickerSegment>

            <TickerDivider />

            {/* Segment 4 — Languages */}
            <TickerSegment>
              <Globe size={12} style={{ color: '#F3672A', flexShrink: 0 }} />
              <TickerLabel>EN · ES · Medicaid welcome</TickerLabel>
            </TickerSegment>
          </div>
        </div>
      )}

      {/* Mobile/desktop visibility helpers — applied via classNames below */}
      <style>{`
        @media (max-width: 900px) {
          .hv3-nav, .hv3-phone-text { display: none !important; }
          .hv3-burger { display: inline-flex !important; }
          .hv3-book-cta { padding: 9px 16px !important; font-size: 11px !important; }
        }
        @media (max-width: 560px) {
          .hv3-logo-meta { display: none !important; }
        }
      `}</style>
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
              className="hv3-logo-meta"
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
              <div style={{ color: 'rgba(255,255,255,0.3)' }}>Las Vegas, NV</div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hv3-nav"
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
              className="hv3-phone-text"
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
              className="hv3-book-cta"
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
              className="hv3-burger"
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
