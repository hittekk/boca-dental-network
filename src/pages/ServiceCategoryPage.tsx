import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Phone, CheckCircle, Calendar } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { CTA } from '../components/CTA/CTA'
import { INITIAL_DATA } from '../data/initialData'
import { findCategory, servicePagesInCategory } from '../data/serviceCatalog'

const ORANGE = '#F3672A'
const NAVY   = '#001D3D'
const BRAND  = '#162E7A'
const DOMAIN = 'https://bocadentalandbraces.com'

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

function ServiceCard({ s, catSlug, index }: { s: { slug: string; label: string; desc: string }; catSlug: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: (index % 3) * 0.07, duration: 0.4 }}
    >
      <Link
        to={`/${catSlug}/${s.slug}/`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex', flexDirection: 'column',
          background: hovered ? NAVY : '#F7F7FA',
          border: `1px solid ${hovered ? NAVY : '#E2E8F0'}`,
          borderRadius: 16, padding: '28px 26px',
          textDecoration: 'none', overflow: 'hidden', position: 'relative',
          transition: 'all 0.25s ease',
          boxShadow: hovered ? '0 16px 36px rgba(22,46,122,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          minHeight: 180,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: ORANGE }} />
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: hovered ? 'rgba(255,255,255,0.35)' : 'rgba(0,29,61,0.3)', fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace' }}>
            / {String(index + 1).padStart(2, '0')}
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.3px', color: hovered ? 'white' : NAVY, marginBottom: 10, lineHeight: 1.15, transition: 'color 0.25s' }}>{s.label}</div>
        <p style={{ fontSize: 13, color: hovered ? 'rgba(255,255,255,0.65)' : '#64748B', lineHeight: 1.6, margin: '0 0 18px', flex: 1, transition: 'color 0.25s' }}>{s.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: ORANGE, textTransform: 'uppercase', letterSpacing: 1.2 }}>
          Learn More <ArrowRight size={11} />
        </div>
      </Link>
    </motion.div>
  )
}

export function ServiceCategoryPage({ categorySlugProp }: { categorySlugProp?: string } = {}) {
  const params = useParams<{ category?: string }>()
  const category = categorySlugProp ?? params.category
  const cat = category ? findCategory(category) : undefined

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [category])
  useEffect(() => {
    if (!cat) return
    document.title = `${cat.label} in Las Vegas | Boca Dental & Braces`
    setMeta('description', cat.longDesc ?? cat.desc ?? '', 'name')
    setMeta('og:title', `${cat.label} in Las Vegas | Boca Dental & Braces`, 'property')
    setMeta('og:description', cat.longDesc ?? cat.desc ?? '', 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:image', `${DOMAIN}/boca-logo-color.png`, 'property')
    setLink('canonical', `${DOMAIN}/${cat.slug}/`)
  }, [cat])

  if (!cat) return <CategoryNotFound slug={category} />

  const services = servicePagesInCategory(cat.slug)

  return (
    <div style={{ background: 'white', fontFamily: 'inherit' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="light" />

      {/* ── HERO — full brand dark gradient ── */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${BRAND} 60%, #1a3a8f 100%)`, padding: '180px 32px 96px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', border: '1.5px solid rgba(243,103,42,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(243,103,42,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
            <Link to="/services/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontWeight: 600 }}>Services</Link>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>/</span>
            <span style={{ color: ORANGE, fontWeight: 700 }}>{cat.label}</span>
          </motion.nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 56, alignItems: 'center' }}>
            <style>{`@media(max-width:860px){.sc-hero-grid{grid-template-columns:1fr!important}.sc-hero-right{display:none!important}}`}</style>

            <motion.div className="sc-hero-grid" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'inline-block', background: 'rgba(243,103,42,0.12)', border: '1px solid rgba(243,103,42,0.32)', borderRadius: 20, padding: '6px 20px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 24 }}>
                Las Vegas · All 9 Locations · In-House Specialists
              </div>
              <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 62px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1.0, color: 'white', margin: '0 0 6px' }}>
                {cat.label}
              </h1>
              <h2 style={{ fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.1, color: ORANGE, margin: '0 0 28px', textTransform: 'uppercase' }}>
                in Las Vegas — Boca Dental &amp; Braces
              </h2>
              {cat.longDesc && (
                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, maxWidth: 540, margin: '0 0 36px' }}>
                  {cat.longDesc}
                </p>
              )}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="/request-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 8, padding: '14px 28px', fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.4, boxShadow: '0 8px 18px rgba(243,103,42,0.32)' }}>
                  <Calendar size={15} /> Book a Consultation →
                </a>
                <a href="tel:7024560005" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8, padding: '14px 22px', fontSize: 14, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase' }}>
                  <Phone size={14} /> (702) 456-0005
                </a>
              </div>
            </motion.div>

            {/* Right — trust pillars */}
            <motion.div className="sc-hero-right" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['No outside referrals — every specialist in-house', 'Nevada Medicaid & most PPO insurance accepted', 'Same-day and next-day appointments available', 'Se habla español · Bilingual staff at all locations'].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 18px', backdropFilter: 'blur(8px)' }}>
                  <CheckCircle size={16} color={ORANGE} style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.55, fontWeight: 600 }}>{item}</span>
                </motion.div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                {[['4.9★','Google Rating'],['1,200+','Reviews'],['9','Locations']].map(([val, label], i) => (
                  <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: ORANGE, letterSpacing: '-0.5px' }}>{val}</div>
                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background: '#F7F9FC', borderBottom: '1px solid rgba(0,29,61,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
          {['Nevada Medicaid Accepted', 'Most PPO Insurance', 'Same-Day Emergency', 'Se Habla Español', '9 Las Vegas Locations', 'Free Consultations'].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 22px', borderRight: i < arr.length - 1 ? '1px solid rgba(0,29,61,0.07)' : 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ORANGE, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(0,29,61,0.6)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      {services.length > 0 && (
        <section style={{ background: 'white', padding: '96px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>
                All {cat.label} Services
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', fontWeight: 800, letterSpacing: '-1.2px', color: NAVY, margin: 0 }}>
                Treatments We Offer
              </h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              <style>{`@media(max-width:768px){.svc-cat-grid{grid-template-columns:repeat(2,1fr)!important;gap:12px!important}}@media(max-width:480px){.svc-cat-grid{grid-template-columns:1fr!important}}`}</style>
              {services.map((s, i) => (
                <div key={s.slug} className="svc-cat-grid">
                  <ServiceCard s={s} catSlug={cat.slug} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9 LOCATIONS — dark section ── */}
      <section style={{ background: NAVY, padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(243,103,42,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>Available Near You</div>
            <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', fontWeight: 800, letterSpacing: '-1.2px', color: 'white', margin: 0 }}>
              {cat.label} at All 9 Las Vegas Locations
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            <style>{`@media(max-width:768px){.loc-grid{grid-template-columns:repeat(2,1fr)!important;gap:8px!important}}@media(max-width:480px){.loc-grid{grid-template-columns:1fr!important}}`}</style>
            {INITIAL_DATA.locations.map((loc, i) => (
              <motion.div key={loc.slug} className="loc-grid" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.07 }}>
                <Link to={`/clinics/${loc.slug}/`} style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 20px', textDecoration: 'none', transition: 'background 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: ORANGE }}>
                    <MapPin size={11} /> {loc.neighborhood}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>{loc.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>
                    <Phone size={10} /> {loc.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: ORANGE, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 4 }}>
                    Book here <ArrowRight size={10} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  )
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
