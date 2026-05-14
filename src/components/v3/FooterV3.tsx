import { motion } from 'framer-motion'
import { Phone, ArrowUpRight, MapPin, Clock } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'

const COLUMNS = [
  {
    title: 'Care',
    links: [
      { label: 'General Dentistry', href: '/general-dentistry/' },
      { label: 'Cosmetic & Veneers', href: '/cosmetic-dentistry/' },
      { label: 'Dental Implants', href: '/dental-implants/' },
      { label: 'Orthodontics · Invisalign', href: '/orthodontics/' },
      { label: 'Boca Kids · Pediatric', href: '/pediatric-dentistry/' },
      { label: 'Emergency Care', href: '/general-dentistry/emergency-dental-care/' },
    ],
  },
  {
    title: 'Patients',
    links: [
      { label: 'Book a Visit', href: '#request-consultation' },
      { label: 'Insurance & Medicaid', href: '/patient-resources/insurance/' },
      { label: 'Financing Options', href: '/patient-resources/financing/' },
      { label: 'New Patient Forms', href: '/patient-resources/new-patient-forms/' },
      { label: 'Patient Reviews', href: '/patient-resources/reviews/' },
      { label: 'Oficina de Habla Hispana', href: '/oficina-de-habla-hispana/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Boca', href: '/about-us/' },
      { label: 'Our Doctors', href: '/about-us/dentists/' },
      { label: 'All 9 Offices', href: '/clinics/' },
      { label: 'Careers', href: '/careers/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
]

export function FooterV3() {
  const year = new Date().getFullYear()
  // Locations grouped by neighborhood prefix for the compact directory
  const directory = INITIAL_DATA.locations.map((loc) => ({
    slug: loc.slug,
    label: loc.label,
    phone: loc.phone,
    kids: loc.kids,
  }))

  return (
    <footer
      style={{
        background: '#0A0A0F',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top accent line */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(243,103,42,0.45) 50%, transparent 100%)',
        }}
      />

      {/* ── Action band — primary CTA zone ─────────────── */}
      <div
        style={{
          padding: '64px 32px 56px',
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 48,
            alignItems: 'center',
          }}
        >
          {/* Left — eyebrow + headline + call */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 14,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Ready when you are
            </div>
            <h2
              style={{
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.02,
                letterSpacing: '-1.2px',
                margin: '0 0 18px',
                textTransform: 'uppercase',
              }}
            >
              Find a chair near you — or{' '}
              <span style={{ color: '#F3672A' }}>just call.</span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.62)',
                lineHeight: 1.6,
                margin: '0 0 24px',
                maxWidth: 540,
              }}
            >
              9 offices across the valley. Same-day and next-day appointments
              for new patients. Most insurance, Medicaid, and CHIP accepted.
            </p>
            <a
              href={`tel:${INITIAL_DATA.brand.phone.replace(/\D/g, '')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 800,
                color: 'white',
                textDecoration: 'none',
                letterSpacing: '-1px',
                transition: 'color 0.18s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = '#F3672A')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'white')
              }
            >
              <Phone size={24} style={{ color: '#F3672A' }} />
              {INITIAL_DATA.brand.phone}
            </a>
          </div>

          {/* Right — actions + open-now chip */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                marginBottom: 4,
                alignSelf: 'flex-start',
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.28)',
                borderRadius: 999,
                padding: '6px 12px',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'inline-block',
                }}
              />
              Open today · 8a — 8p
            </div>
            <a
              href="#locations"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                background: '#F3672A',
                color: 'white',
                borderRadius: 10,
                padding: '18px 24px',
                fontSize: 14,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                boxShadow: '0 12px 30px rgba(243,103,42,0.28)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#d95a22'
                ;(e.currentTarget as HTMLElement).style.transform =
                  'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = '#F3672A'
                ;(e.currentTarget as HTMLElement).style.transform =
                  'translateY(0)'
              }}
            >
              Find your nearest office
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#request-consultation"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                background: 'rgba(255,255,255,0.04)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 10,
                padding: '17px 24px',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: 0.4,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.07)'
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,255,255,0.32)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.04)'
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  'rgba(255,255,255,0.16)'
              }}
            >
              <span
                style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}
              >
                <Clock size={16} style={{ color: '#F3672A' }} />
                Request consultation
              </span>
              <ArrowUpRight size={16} style={{ opacity: 0.6 }} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Sitemap columns ───────────────────────────── */}
      <div
        style={{
          padding: '40px 32px 32px',
          maxWidth: 1280,
          margin: '0 auto',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
            gap: 40,
          }}
        >
          {/* Network directory — wider column, lists all 9 offices */}
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.42)',
                marginBottom: 16,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Network · {directory.length} offices
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px 16px',
              }}
            >
              {directory.map((loc) => (
                <a
                  key={loc.slug}
                  href={`/clinics/${loc.slug}/`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.72)',
                    textDecoration: 'none',
                    transition: 'color 0.18s ease',
                    padding: '2px 0',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.72)')
                  }
                >
                  <MapPin size={11} style={{ color: '#F3672A', flexShrink: 0 }} />
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {loc.label}
                    {loc.kids && (
                      <span
                        style={{
                          color: '#F3672A',
                          fontWeight: 800,
                          fontSize: 9,
                          marginLeft: 6,
                          letterSpacing: 0.5,
                          textTransform: 'uppercase',
                          fontFamily:
                            'ui-monospace, "SF Mono", Menlo, monospace',
                        }}
                      >
                        Kids
                      </span>
                    )}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Three link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.42)',
                  marginBottom: 16,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / {col.title}
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {col.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.72)',
                      textDecoration: 'none',
                      transition: 'color 0.18s ease',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        'rgba(255,255,255,0.72)')
                    }
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────── */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 32px',
          background: 'rgba(255,255,255,0.015)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            fontSize: 11,
            color: 'rgba(255,255,255,0.42)',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            letterSpacing: 0.5,
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
            <span style={{ color: '#F3672A', fontWeight: 800 }}>
              Boca Dental & Braces
            </span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>© {year} · All rights reserved</span>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'HIPAA', href: '/hipaa' },
              { label: 'Terms', href: '/terms' },
              { label: 'Accessibility', href: '/accessibility' },
              { label: 'Sitemap', href: '/sitemap.xml' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.18s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    'rgba(255,255,255,0.5)')
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterV3
