import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { INITIAL_DATA } from '../data/initialData'
import { findCategory, servicePagesInCategory } from '../data/serviceCatalog'

const ORANGE = '#F3672A'
const NAVY = '#001D3D'
const MONO = 'ui-monospace, "SF Mono", Menlo, monospace'
const DOMAIN = 'https://bocadentalandbraces.com'

/**
 * Service category hub at /[category]/  e.g. /orthodontics/
 * Lists all sub-services in the category and links to /[category]/[service]/
 */
export function ServiceCategoryPage({ categorySlugProp }: { categorySlugProp?: string } = {}) {
  const params = useParams<{ category?: string }>()
  const category = categorySlugProp ?? params.category
  const cat = category ? findCategory(category) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [category])

  useEffect(() => {
    if (!cat) return
    document.title = `${cat.label} in Las Vegas | Boca Dental & Braces`
    setMeta('description', cat.longDesc ?? cat.desc ?? '', 'name')
    setLink('canonical', `${DOMAIN}/${cat.slug}/`)
  }, [cat])

  if (!cat) return <CategoryNotFound slug={category} />

  const services = servicePagesInCategory(cat.slug)

  return (
    <div style={{ background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="dark" />

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(180deg, #F7F9FC 0%, white 65%)',
          padding: '160px 32px 64px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, fontFamily: MONO, color: 'rgba(0,29,61,0.55)', marginBottom: 22, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to="/services/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Services</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: ORANGE, fontWeight: 700 }}>{cat.label}</span>
          </nav>
          <h1
            style={{
              fontSize: 'clamp(32px, 4.4vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-1.2px',
              color: NAVY,
              margin: '0 0 18px',
              textTransform: 'uppercase',
            }}
          >
            {cat.label} in Las Vegas — Boca Dental &amp; Braces
          </h1>
          {cat.longDesc && (
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(0,29,61,0.75)', maxWidth: 880, margin: 0 }}>
              {cat.longDesc}
            </p>
          )}
        </div>
      </section>

      {/* Services in this category */}
      <section style={{ background: 'white', padding: '64px 32px 96px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: ORANGE,
              marginBottom: 14,
            }}
          >
            All {cat.label} services
          </div>
          {services.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: 'rgba(0,29,61,0.55)' }}>
              This category currently has no sub-services. Detail pages are forthcoming.
            </p>
          ) : (
            <div
              className="cat-services-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
              }}
            >
              <style>{`
                @media (max-width: 880px){ .cat-services-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
                @media (max-width: 560px){ .cat-services-grid{ grid-template-columns: 1fr !important; } }
              `}</style>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/${cat.slug}/${s.slug}/`}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(0,29,61,0.08)',
                    borderTop: `2px solid ${ORANGE}`,
                    borderRadius: 12,
                    padding: '22px 24px',
                    textDecoration: 'none',
                    color: NAVY,
                  }}
                >
                  <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.2px' }}>{s.label}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(0,29,61,0.65)', margin: '0 0 14px', lineHeight: 1.5 }}>{s.desc}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: ORANGE, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: MONO }}>
                    Learn more
                    <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 9-location anchor */}
      <section style={{ background: '#F7F9FC', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, color: NAVY, margin: '0 0 22px', textTransform: 'uppercase' }}>
            Find {cat.label} Near You — 9 Las Vegas Locations
          </h2>
          <div className="cat-loc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            <style>{`
              @media (max-width: 880px){ .cat-loc-grid{ grid-template-columns: repeat(2, 1fr) !important; } }
              @media (max-width: 520px){ .cat-loc-grid{ grid-template-columns: 1fr !important; } }
            `}</style>
            {INITIAL_DATA.locations.map((loc) => (
              <Link key={loc.slug} to={`/clinics/${loc.slug}/`} style={{ background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 10, padding: '16px 18px', textDecoration: 'none', color: NAVY }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE, fontFamily: MONO, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={11} color={ORANGE} /> {loc.neighborhood}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: NAVY, marginTop: 6 }}>{loc.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(0,29,61,0.55)', marginTop: 4 }}>
                  <Phone size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> {loc.phone}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function setMeta(name: string, content: string, attr: 'name' | 'property') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
function setLink(rel: string, href: string) {
  let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
  el.setAttribute('href', href)
}

function CategoryNotFound({ slug }: { slug?: string }) {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', background: 'white', color: NAVY, fontFamily: 'inherit' }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 12 }}>404 · Category not found</div>
      <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>We couldn't find that service category.</h1>
      <p style={{ fontSize: 15, opacity: 0.7, marginBottom: 24 }}>The category /{slug}/ doesn't exist in our catalog.</p>
      <Link to="/services/" style={{ background: ORANGE, color: 'white', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.6 }}>
        See all services
      </Link>
    </div>
  )
}

export default ServiceCategoryPage
