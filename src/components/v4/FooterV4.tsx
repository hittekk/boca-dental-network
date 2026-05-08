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
  { label: 'Book', href: '#request-consultation' },
]

const SERVICES = [
  { label: 'General Dentistry', href: '/general-dentistry/' },
  { label: 'Cosmetic & Veneers', href: '/cosmetic-dentistry/' },
  { label: 'Dental Implants', href: '/dental-implants/' },
  { label: 'Orthodontics', href: '/orthodontics/' },
  { label: 'Pediatric · Boca Kids', href: '/pediatric-dentistry/' },
  { label: 'Emergency Care', href: '/general-dentistry/emergency-dental-care/' },
  { label: 'Crowns & Bridges', href: '/restorative-dentistry/' },
  { label: 'Whitening', href: '/cosmetic-dentistry/teeth-whitening/' },
]

export function FooterV4() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#FAFAFA', position: 'relative' }}>
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '80px 32px 32px',
        }}
      >
        {/* Massive editorial wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 'clamp(60px, 11vw, 200px)',
            fontWeight: 800,
            color: '#0A0A0F',
            lineHeight: 0.86,
            letterSpacing: '-5px',
            textTransform: 'uppercase',
            margin: '0 0 56px',
            wordBreak: 'break-word',
          }}
        >
          Boca{' '}
          <span
            style={{
              background:
                'linear-gradient(135deg, #F3672A 0%, #FF8A50 50%, #3B82F6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Dental.
          </span>
          <br />
          Built for Vegas.
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(10,10,15,0.08)',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#3B82F6',
                marginBottom: 14,
              }}
            >
              About Boca
            </div>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(10,10,15,0.65)',
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
                fontSize: 24,
                fontWeight: 800,
                color: '#F3672A',
                textDecoration: 'none',
                letterSpacing: '-0.4px',
              }}
            >
              <Phone size={20} />
              {INITIAL_DATA.brand.phone}
            </a>
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#0A0A0F',
                marginBottom: 16,
              }}
            >
              Quick Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUICK.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 14,
                    color: 'rgba(10,10,15,0.65)',
                    textDecoration: 'none',
                    transition: 'color 0.18s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(10,10,15,0.65)')
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
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#0A0A0F',
                marginBottom: 16,
              }}
            >
              Services
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 14,
                    color: 'rgba(10,10,15,0.65)',
                    textDecoration: 'none',
                    transition: 'color 0.18s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(10,10,15,0.65)')
                  }
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Locations grid */}
        <div style={{ paddingTop: 48, paddingBottom: 32 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: '#3B82F6',
              marginBottom: 20,
            }}
          >
            The Network · {INITIAL_DATA.locations.length} Offices
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
                  background: 'white',
                  border: '1px solid rgba(10,10,15,0.06)',
                  borderRadius: 16,
                  padding: '16px 18px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(10,10,15,0.03)',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(-2px)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = '#F3672A'
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 8px 20px rgba(243,103,42,0.16)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.transform =
                    'translateY(0)'
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    'rgba(10,10,15,0.06)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    '0 2px 6px rgba(10,10,15,0.03)'
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    color: '#3B82F6',
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
                    color: '#0A0A0F',
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
                    color: 'rgba(10,10,15,0.55)',
                    fontWeight: 600,
                  }}
                >
                  {loc.phone}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(10,10,15,0.08)',
          padding: '24px 32px',
          background: 'white',
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            fontSize: 12,
            color: 'rgba(10,10,15,0.55)',
          }}
        >
          <div>© {year} Boca Dental and Braces · All rights reserved</div>

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
                  color: 'rgba(10,10,15,0.55)',
                  textDecoration: 'none',
                  transition: 'color 0.18s ease',
                  fontWeight: 600,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    'rgba(10,10,15,0.55)')
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
              color: 'rgba(10,10,15,0.5)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 600,
              transition: 'color 0.18s ease',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = '#F3672A')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                'rgba(10,10,15,0.5)')
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

export default FooterV4
