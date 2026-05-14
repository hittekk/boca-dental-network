import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'

const QUICK_LINKS = [
  { label: 'About Boca', href: '#about' },
  { label: 'Locations', href: '#locations' },
  { label: 'Services', href: '#services' },
  { label: 'New Patients', href: '#new-patients' },
  { label: 'Boca Kids', href: '#boca-kids' },
  { label: 'Financing', href: '#financing' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact', href: '#cta' },
]

const SERVICE_LINKS = [
  { label: 'General Dentistry', href: '#services' },
  { label: 'Braces & Orthodontics', href: '#services' },
  { label: 'Invisalign', href: '#services' },
  { label: 'Dental Implants', href: '#services' },
  { label: 'Teeth Whitening', href: '#services' },
  { label: 'Emergency Dental', href: '#services' },
  { label: 'Pediatric Care', href: '#boca-kids' },
  { label: 'Crowns & Veneers', href: '#services' },
]

export function FooterV2() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="footer"
      style={{
        background: '#001D3D',
        padding: '88px 32px 32px',
        color: 'rgba(255,255,255,0.7)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Logo watermark — masthead-style background */}
      <img
        aria-hidden
        src="/boca-logo.png"
        alt=""
        style={{
          position: 'absolute',
          bottom: -120,
          right: -120,
          width: 'clamp(420px, 50vw, 760px)',
          height: 'auto',
          opacity: 0.04,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Faint orange glow lower-left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.1) 0%, transparent 65%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Mobile-stack rules — below 880px the masthead + 3-col links grid
            collapse into single-column stacks so the italic tagline doesn't
            squeeze word-per-line and the locations grid isn't cramped. */}
        <style>{`
          @media (max-width: 880px) {
            .footerv2-masthead {
              grid-template-columns: 1fr !important;
              align-items: flex-start !important;
              gap: 20px !important;
            }
            .footerv2-masthead a[href^="tel:"] {
              align-self: stretch;
              justify-content: center;
            }
            .footerv2-links-grid {
              grid-template-columns: 1fr !important;
              gap: 36px !important;
            }
            .footerv2-locations-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* ── Masthead row ───────────────────────────────── */}
        <motion.div
          className="footerv2-masthead"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 32,
            alignItems: 'center',
            paddingBottom: 36,
            marginBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 14,
              }}
            >
              <img
                src="/boca-logo.png"
                alt="Boca Dental and Braces"
                style={{ height: 52, width: 'auto', display: 'block' }}
              />
              <div
                style={{
                  borderLeft: '1px solid rgba(255,255,255,0.18)',
                  paddingLeft: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  Las Vegas
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.55)',
                    marginTop: 4,
                    fontFamily: 'Georgia, "Playfair Display", serif',
                    fontStyle: 'italic',
                  }}
                >
                  Nine clinics, one team
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.55,
                margin: 0,
                maxWidth: 520,
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontStyle: 'italic',
              }}
            >
              Family-first dental care across Las Vegas, Henderson, and Clark
              County — built around your schedule and your budget.
            </p>
          </div>

          <a
            href={`tel:${INITIAL_DATA.brand.phone.replace(/\D/g, '')}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#F3672A',
              color: 'white',
              borderRadius: 999,
              padding: '14px 28px',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              boxShadow: '0 12px 32px rgba(243,103,42,0.3)',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#d95a22'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#F3672A'
              el.style.transform = 'translateY(0)'
            }}
          >
            <Phone size={14} />
            {INITIAL_DATA.brand.phone}
          </a>
        </motion.div>

        {/* ── 3-column links grid ─────────────────────── */}
        <motion.div
          className="footerv2-links-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 0.9fr 1.5fr',
            gap: 56,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            marginBottom: 28,
          }}
        >
          {/* Quick Links */}
          <FooterColumn title="Quick links" subtitle="Find your page">
            {QUICK_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Services */}
          <FooterColumn
            title="Services"
            subtitle="What we do"
            accent="#F3672A"
          >
            {SERVICE_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* All 9 Locations */}
          <div>
            <FooterColumnHeader
              title="All 9 locations"
              subtitle="Across the valley"
              accent="#F3672A"
            />
            <div
              className="footerv2-locations-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '18px 24px',
                marginTop: 22,
              }}
            >
              {INITIAL_DATA.locations.map((loc) => (
                <a
                  key={loc.id}
                  href={`/clinics/${loc.slug}/`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    const label = (e.currentTarget as HTMLElement)
                      .querySelector('[data-label]') as HTMLElement | null
                    if (label) label.style.color = '#F3672A'
                  }}
                  onMouseLeave={(e) => {
                    const label = (e.currentTarget as HTMLElement)
                      .querySelector('[data-label]') as HTMLElement | null
                    if (label) label.style.color = 'white'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      data-label
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: 'white',
                        letterSpacing: '-0.2px',
                        lineHeight: 1.2,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {loc.label}
                    </span>
                    {loc.kids && (
                      <span
                        style={{
                          fontSize: 8,
                          fontWeight: 800,
                          background: '#F3672A',
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: 10,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                        }}
                      >
                        Kids
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: 'rgba(255,255,255,0.55)',
                      fontFamily: 'Georgia, "Playfair Display", serif',
                      fontStyle: 'italic',
                      lineHeight: 1.4,
                    }}
                  >
                    {loc.neighborhood} · {loc.phone}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Bottom masthead bar ────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontStyle: 'italic',
            }}
          >
            © {year} Boca Dental and Braces. All rights reserved.
          </div>

          <div
            style={{
              display: 'flex',
              gap: 28,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="#privacy"
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = '#F3672A')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  'rgba(255,255,255,0.55)')
              }
            >
              Privacy Policy
            </a>
            <a
              href="#hipaa"
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = '#F3672A')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  'rgba(255,255,255,0.55)')
              }
            >
              HIPAA Notice
            </a>
            <a
              href="#accessibility"
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = '#F3672A')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  'rgba(255,255,255,0.55)')
              }
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumnHeader({
  title,
  subtitle,
  accent = 'white',
}: {
  title: string
  subtitle: string
  accent?: string
}) {
  return (
    <div style={{ paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 2.5,
          textTransform: 'uppercase',
          color: accent === 'white' ? 'white' : accent,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
        }}
      >
        {subtitle}
      </div>
    </div>
  )
}

function FooterColumn({
  title,
  subtitle,
  accent = 'white',
  children,
}: {
  title: string
  subtitle: string
  accent?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <FooterColumnHeader title={title} subtitle={subtitle} accent={accent} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 22,
        }}
      >
        {children}
      </div>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: 'rgba(255,255,255,0.65)',
        textDecoration: 'none',
        transition: 'color 0.2s ease, padding-left 0.2s ease',
        position: 'relative',
        paddingLeft: 0,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.color = '#F3672A'
        el.style.paddingLeft = '6px'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.color = 'rgba(255,255,255,0.65)'
        el.style.paddingLeft = '0px'
      }}
    >
      {children}
    </a>
  )
}

export default FooterV2
