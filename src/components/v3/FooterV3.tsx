import { motion } from 'framer-motion'
import { Phone, ArrowUpRight, MapPin } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'

const QUICK = [
  { label: 'Services', href: '#services' },
  { label: 'Locations', href: '#locations' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Boca Kids', href: '#boca-kids' },
  { label: 'Why Boca', href: '#why-boca' },
  { label: 'Financing', href: '#financing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Book a Visit', href: '#request-consultation' },
]

const SERVICES = [
  { label: 'General Dentistry', href: '/general-dentistry/' },
  { label: 'Cosmetic & Veneers', href: '/cosmetic-dentistry/' },
  { label: 'Dental Implants', href: '/dental-implants/' },
  { label: 'Orthodontics & Invisalign', href: '/orthodontics/' },
  { label: 'Pediatric · Boca Kids', href: '/pediatric-dentistry/' },
  { label: 'Emergency Care', href: '/general-dentistry/emergency-dental-care/' },
  { label: 'Crowns & Bridges', href: '/restorative-dentistry/' },
  { label: 'Whitening', href: '/cosmetic-dentistry/teeth-whitening/' },
]

export function FooterV3() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#0A0A0F',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top hairline */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(243,103,42,0.4) 50%, transparent 100%)',
        }}
      />

      {/* Massive editorial wordmark */}
      <div
        style={{
          padding: '80px 32px 40px',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 'clamp(64px, 11vw, 200px)',
            fontWeight: 800,
            color: 'white',
            lineHeight: 0.86,
            letterSpacing: '-5px',
            textTransform: 'uppercase',
            margin: '0 0 56px',
            wordBreak: 'break-word',
          }}
        >
          Boca <span style={{ color: '#F3672A' }}>Dental.</span>
          <br />
          Built for{' '}
          <span style={{ fontStyle: 'italic', textDecoration: 'underline', textDecorationThickness: 6, textUnderlineOffset: 14 }}>
            Vegas.
          </span>
        </motion.div>

        {/* Top callout row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr',
            gap: 32,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: 14,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / About
            </div>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.65,
                margin: '0 0 24px',
                maxWidth: 480,
              }}
            >
              Knocking out the competition with world-class dental care
              you can afford — across Las Vegas, Henderson, and Clark County
              since 2006.
            </p>
            <a
              href={`tel:${INITIAL_DATA.brand.phone.replace(/\D/g, '')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 22,
                fontWeight: 800,
                color: '#F3672A',
                textDecoration: 'none',
                letterSpacing: '-0.4px',
              }}
            >
              <Phone size={18} />
              {INITIAL_DATA.brand.phone}
            </a>
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: 16,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Quick links
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {QUICK.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.18s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.7)')
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: 16,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Services
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {SERVICES.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.18s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.7)')
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Locations grid — full row */}
        <div
          style={{
            paddingTop: 48,
            paddingBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: 20,
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            / Network · {INITIAL_DATA.locations.length} offices
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 14,
            }}
          >
            {INITIAL_DATA.locations.map((loc, i) => (
              <a
                key={loc.id}
                href={`/clinics/${loc.slug}/`}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: '16px 18px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  transition: 'all 0.18s ease',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    'rgba(255,255,255,0.06)'
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(243,103,42,0.4)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background =
                    'rgba(255,255,255,0.03)'
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(255,255,255,0.08)'
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  / {String(i + 1).padStart(2, '0')}
                  {loc.kids && (
                    <span style={{ color: '#F3672A', marginLeft: 6 }}>
                      KIDS
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: 'white',
                    letterSpacing: '-0.2px',
                    lineHeight: 1.15,
                    textTransform: 'uppercase',
                  }}
                >
                  {loc.label}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    letterSpacing: 0.4,
                  }}
                >
                  {loc.phone}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 32px',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            fontSize: 11,
            color: 'rgba(255,255,255,0.45)',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            letterSpacing: 0.5,
          }}
        >
          <div>
            © {year} Boca Dental and Braces · All rights reserved
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy', href: '/privacy' },
              { label: 'HIPAA', href: '/hipaa' },
              { label: 'Terms', href: '/terms' },
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

          <a
            href="https://datastacklogic.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.18s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = '#F3672A')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                'rgba(255,255,255,0.4)')
            }
          >
            <MapPin size={11} />
            Built by DataStackLogic
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default FooterV3
