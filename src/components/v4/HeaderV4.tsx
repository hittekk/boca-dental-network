import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ArrowUpRight, Phone, Sparkles } from 'lucide-react'
import type { Brand, Announcement } from '../../types'

interface HeaderV4Props {
  brand: Brand
  announcement: Announcement
}

const NAV = [
  { label: 'Care', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Locations', href: '#locations' },
  { label: 'Why Boca', href: '#why-boca' },
  { label: 'Reviews', href: '#testimonials' },
]

export function HeaderV4({ brand, announcement }: HeaderV4Props) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(
    () => scrollY.on('change', (v) => setScrolled(v > 60)),
    [scrollY]
  )

  return (
    <header
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
    >
      {announcement.enabled && (
        <div
          style={{
            background: 'linear-gradient(90deg, #F3672A 0%, #FF8A50 50%, #3B82F6 100%)',
            backgroundSize: '200% 100%',
            animation: 'header-gradient 8s ease-in-out infinite',
            padding: '8px 24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
            fontSize: 12,
            fontWeight: 700,
            color: 'white',
          }}
        >
          <Sparkles size={13} />
          {announcement.text}
          {announcement.linkLabel && (
            <a
              href={announcement.link ?? '#'}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                background: 'rgba(255,255,255,0.22)',
                padding: '3px 10px',
                borderRadius: 999,
                fontSize: 11,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {announcement.linkLabel}
              <ArrowUpRight size={11} />
            </a>
          )}
          <style>{`@keyframes header-gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
        </div>
      )}

      <motion.div
        animate={{
          background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0)',
          borderBottomColor: scrolled ? 'rgba(10,10,15,0.06)' : 'rgba(10,10,15,0)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom: '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '0 28px',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Logo lockup with color */}
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
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background:
                  'linear-gradient(135deg, #F3672A 0%, #FF8A50 60%, #3B82F6 130%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: '-0.5px',
                boxShadow: '0 8px 20px rgba(243,103,42,0.3)',
              }}
            >
              B
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: '#0A0A0F',
                  letterSpacing: '-0.3px',
                  lineHeight: 1,
                }}
              >
                Boca Dental
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#3B82F6',
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                Las Vegas · Est. 2006
              </div>
            </div>
          </a>

          {/* Nav */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: 4,
              background: 'rgba(10,10,15,0.04)',
              borderRadius: 999,
            }}
          >
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'rgba(10,10,15,0.7)',
                  textDecoration: 'none',
                  borderRadius: 999,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'white'
                  ;(e.currentTarget as HTMLElement).style.color = '#0A0A0F'
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 2px 8px rgba(10,10,15,0.06)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = 'rgba(10,10,15,0.7)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              flexShrink: 0,
            }}
          >
            <a
              href={`tel:${brand.phone.replace(/\D/g, '')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 13,
                fontWeight: 700,
                color: '#0A0A0F',
                textDecoration: 'none',
              }}
            >
              <Phone size={13} />
              {brand.phone}
            </a>

            <motion.a
              href="#request-consultation"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background:
                  'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                color: 'white',
                borderRadius: 999,
                padding: '11px 22px',
                fontSize: 13,
                fontWeight: 800,
                textDecoration: 'none',
                letterSpacing: 0.3,
                boxShadow: '0 8px 20px rgba(243,103,42,0.32)',
              }}
            >
              Book a Visit
              <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </header>
  )
}

export default HeaderV4
