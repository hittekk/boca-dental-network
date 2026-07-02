import { motion } from 'framer-motion'
import { Phone, MapPin } from 'lucide-react'
import { useSiteData } from '../../lib/site-data'
import { useLang } from '../../lib/lang'
import { localizeHref } from '../../lib/seo'

// Real page URLs, not homepage section anchors — the footer renders sitewide,
// and '#services'-style anchors only resolve on the homepage (dead links
// everywhere else). Real URLs also give every page internal links to the
// money pages.
const QUICK_LINKS = [
  { label: 'About Boca', href: '/about-us/' },
  { label: 'Locations', href: '/clinics/' },
  { label: 'Services', href: '/services/' },
  { label: 'New Patients', href: '/request-consultation/' },
  { label: 'Boca Kids', href: '/clinics/boca-kids-dentistry/' },
  { label: 'Financing', href: '/patient-resources/financing/' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Careers', href: '/careers/' },
  { label: 'Contact', href: '/contact-us/' },
]

const SERVICE_LINKS = [
  { label: 'General Dentistry', href: '/general-dentistry/' },
  { label: 'Braces & Orthodontics', href: '/orthodontics/braces/' },
  { label: 'Invisalign', href: '/orthodontics/invisalign/' },
  { label: 'Dental Implants', href: '/dental-implants/' },
  { label: 'Teeth Whitening', href: '/cosmetic-dentistry/teeth-whitening/' },
  { label: 'Emergency Dental', href: '/general-dentistry/emergency-dental-care/' },
  { label: 'Pediatric Care', href: '/pediatric-dentistry/' },
  { label: 'Crowns & Veneers', href: '/cosmetic-dentistry/veneers/' },
]

export function Footer() {
  const year = new Date().getFullYear()
  const siteData = useSiteData()
  const lang = useLang()

  return (
    <footer
      id="footer"
      style={{
        background: '#001D3D',
        padding: '72px 32px 32px',
        color: 'rgba(255,255,255,0.65)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Top — 4 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr 0.9fr 1.4fr',
            gap: 40,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Col 1 — Logo + tagline + phone */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <img
                src="/boca-logo.png"
                alt="Boca Dental and Braces"
                style={{ height: 52, width: 'auto', display: 'block' }}
              />
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  marginTop: 12,
                }}
              >
                Las Vegas · 9 Locations
              </div>
            </div>

            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                margin: '0 0 24px',
              }}
            >
              Knocking out the competition with world-class dental care
              you can afford — across Las Vegas, Henderson, and Clark County.
            </p>

            <a
              href={`tel:${siteData.brand.phone.replace(/\D/g, '')}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: '#F3672A',
                textDecoration: 'none',
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: '-0.2px',
              }}
            >
              <Phone size={15} />
              {siteData.brand.phone}
            </a>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'white',
                marginBottom: 18,
              }}
            >
              Quick Links
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={localizeHref(link.href, lang)}
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.6)')
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3 — Services */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'white',
                marginBottom: 18,
              }}
            >
              Services
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={localizeHref(link.href, lang)}
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = '#F3672A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.6)')
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 4 — All 9 Locations */}
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'white',
                marginBottom: 18,
              }}
            >
              All 9 Locations
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px 16px',
              }}
            >
              {siteData.locations.map((loc) => (
                <a
                  key={loc.id}
                  href={localizeHref(`/clinics/${loc.slug}/`, lang)}
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
                      marginBottom: 3,
                    }}
                  >
                    <span
                      data-label
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: 'white',
                        textTransform: 'uppercase',
                        letterSpacing: '-0.1px',
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
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.5,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 4,
                    }}
                  >
                    <Phone
                      size={9}
                      style={{ color: '#F3672A', marginTop: 3, flexShrink: 0 }}
                    />
                    {loc.phone}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 28,
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
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            © {year} Boca Dental and Braces. All rights reserved.
            {' · '}
            Site by{' '}
            <a
              href="https://blazedigital.io/"
              target="_blank"
              rel="noopener"
              style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#F3672A')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
            >
              Blaze Digital
            </a>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Privacy Policy', href: '/privacy-policy/' },
              { label: 'HIPAA Notice', href: '/hipaa-compliance/' },
            ].map((link) => (
              <a
                key={link.label}
                href={localizeHref(link.href, lang)}
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
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

export default Footer
