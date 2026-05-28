import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Smile, Sparkles, Crown, Wrench, Activity, Baby, Moon, Stethoscope, ShieldCheck, Zap, Layers, Heart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { CTA } from '../components/CTA/CTA'
import { INITIAL_DATA } from '../data/initialData'
import { SERVICE_CATEGORIES, SERVICE_PAGES } from '../data/serviceCatalog'

const ORANGE = '#F3672A'
const NAVY   = '#162E7A'

const ICON_MAP: Record<string, LucideIcon> = {
  'general-dentistry':     Smile,
  'cosmetic-dentistry':    Sparkles,
  'restorative-dentistry': Crown,
  'dental-implants':       Wrench,
  'orthodontics':          Activity,
  'pediatric-dentistry':   Baby,
  'sedation-dentistry':    Moon,
  'oral-surgery':          Stethoscope,
  'periodontal':           ShieldCheck,
  'endodontics':           Zap,
  'prosthodontics':        Layers,
  'preventive-dentistry':  Heart,
}

type Cat = { slug: string; label: string; desc?: string; longDesc?: string }

function ServiceCard({ cat, index }: { cat: Cat; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = ICON_MAP[cat.slug]
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.a
      href={`/${cat.slug}/`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: (index % 3) * 0.06, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? NAVY : '#F7F7FA',
        border: `1px solid ${hovered ? NAVY : '#E2E8F0'}`,
        borderRadius: 16,
        padding: '28px 26px',
        cursor: 'pointer',
        textDecoration: 'none',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? '0 16px 36px rgba(22,46,122,0.22)' : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 220,
      }}
    >
      {Icon && (
        <div aria-hidden style={{ position: 'absolute', bottom: -36, right: -28, opacity: hovered ? 0.12 : 0.07, transition: 'opacity 0.25s ease, transform 0.25s ease', transform: hovered ? 'rotate(-6deg)' : 'rotate(0deg)', pointerEvents: 'none' }}>
          <Icon size={180} color={hovered ? ORANGE : NAVY} />
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, position: 'relative', zIndex: 1 }}>
        {Icon ? <Icon size={34} color={hovered ? ORANGE : NAVY} /> : <span style={{ width: 34 }} />}
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: hovered ? 'rgba(255,255,255,0.4)' : 'rgba(22,46,122,0.35)', fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', transition: 'color 0.25s' }}>/ {num}</div>
      </div>
      <div style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.3px', color: hovered ? 'white' : NAVY, marginBottom: 8, lineHeight: 1.15, transition: 'color 0.25s', position: 'relative', zIndex: 1 }}>{cat.label}</div>
      <div style={{ fontSize: 13, color: hovered ? 'rgba(255,255,255,0.65)' : '#64748B', lineHeight: 1.6, marginBottom: 18, transition: 'color 0.25s', flex: 1, position: 'relative', zIndex: 1 }}>{cat.desc}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: ORANGE, textTransform: 'uppercase', letterSpacing: 1.2 }}>Explore →</span>
        <div style={{ width: 28, height: 2, background: hovered ? ORANGE : 'transparent', borderRadius: 999, transition: 'background 0.3s' }} />
      </div>
    </motion.a>
  )
}

export function ServicesHubPage() {
  const ALL_CATS = SERVICE_CATEGORIES

  const SPOTLIGHTS = [
    { slug: 'dental-implants',    label: 'Dental Implants',    eyebrow: 'Most Requested',  stat: '95%',  statLabel: 'Success rate',   desc: 'Single implants, full arch, All-on-4 — performed in-house by Dr. Charles Calder, oral & maxillofacial surgeon. No outside referrals needed.' },
    { slug: 'orthodontics',       label: 'Invisalign & Braces', eyebrow: 'Diamond+ Provider', stat: '6mo', statLabel: 'Avg. results',  desc: 'Clear aligners and traditional braces overseen by Dr. Kelcey Loveland. Teen and adult programs. Results in as little as 6 months.' },
    { slug: 'cosmetic-dentistry', label: 'Smile Makeovers',    eyebrow: 'Free Consult',     stat: '1 Day', statLabel: 'Whitening',    desc: 'Complete cosmetic transformations using porcelain veneers, professional whitening, and bonding — tailored to your goals.' },
  ]

  return (
    <div style={{ background: 'white' }}>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="light" />

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)', padding: '180px 32px 96px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', border: '1.5px solid rgba(243,103,42,0.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(243,103,42,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 56, alignItems: 'center' }}>
          <style>{`@media(max-width:860px){.sh-g{grid-template-columns:1fr!important}.sh-r{display:none!important}}`}</style>

          <motion.div className="sh-g" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-block', background: 'rgba(243,103,42,0.12)', border: '1px solid rgba(243,103,42,0.32)', borderRadius: 20, padding: '6px 20px', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 24 }}>
              9 Locations · Every Specialist In-House · No Referrals
            </div>
            <h1 style={{ fontSize: 'clamp(36px, 4.8vw, 64px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1.0, color: 'white', margin: '0 0 6px' }}>Every Specialty.</h1>
            <h1 style={{ fontSize: 'clamp(36px, 4.8vw, 64px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1.0, color: ORANGE, margin: '0 0 28px' }}>One Practice.</h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 500, margin: '0 0 36px' }}>
              General, cosmetic, orthodontics, implants, oral surgery, pediatric care and more — every specialist on staff at all 9 Las Vegas locations.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="/request-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 8, padding: '14px 28px', fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.4, boxShadow: '0 8px 18px rgba(243,103,42,0.32)' }}>Book an Appointment →</a>
              <a href="#services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8, padding: '14px 22px', fontSize: 14, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase' }}>Browse All Services ↓</a>
            </div>
          </motion.div>

          <motion.div className="sh-r" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['50+','Treatments','Available now'],['12','Specialties','All in-house'],['9','Locations','Las Vegas'],['0','Referrals','Needed']].map(([val,label,sub],i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.08 }} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '24px 18px', backdropFilter: 'blur(12px)' }}>
                <div style={{ fontSize: 'clamp(26px, 2.5vw, 38px)', fontWeight: 900, color: i === 3 ? '#10b981' : ORANGE, letterSpacing: '-1px', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'white', marginTop: 5 }}>{label}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background: '#F7F9FC', borderBottom: '1px solid rgba(0,29,61,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', overflowX: 'auto' }}>
          {['Nevada Medicaid Accepted','Most PPO Insurance','Same-Day Emergencies','Se Habla Español','9 Las Vegas Locations','Evening & Weekend Hours','Free Consultations'].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 22px', borderRight: i < arr.length-1 ? '1px solid rgba(0,29,61,0.07)' : 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ORANGE, flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(0,29,61,0.6)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPOTLIGHT 3 ── */}
      <section style={{ background: 'white', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>Most Requested</div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: '0 0 14px' }}>Our Signature Services.</h2>
            <p style={{ fontSize: 16, color: 'rgba(0,29,61,0.55)', maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>The treatments our patients ask for most — all done in-house by Boca specialists.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            <style>{`@media(max-width:860px){.sp-g{grid-template-columns:1fr!important}}`}</style>
            {SPOTLIGHTS.map((sp, i) => (
              <motion.div key={sp.slug} className="sp-g" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <a href={`/${sp.slug}/`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: 'linear-gradient(160deg, #001D3D, #162E7A)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 20px 48px rgba(22,46,122,0.18)' }}>
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${ORANGE}, rgba(243,103,42,0.2))` }} />
                  <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
                      <div style={{ padding: '4px 12px', background: 'rgba(243,103,42,0.15)', border: '1px solid rgba(243,103,42,0.3)', borderRadius: 999, fontSize: 10, fontWeight: 800, color: ORANGE, letterSpacing: 1.5, textTransform: 'uppercase' }}>{sp.eyebrow}</div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 22, fontWeight: 900, color: ORANGE, letterSpacing: '-0.5px', lineHeight: 1 }}>{sp.stat}</div>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{sp.statLabel}</div>
                      </div>
                    </div>
                    <h3 style={{ fontSize: 'clamp(18px, 1.6vw, 24px)', fontWeight: 800, color: 'white', letterSpacing: '-0.5px', margin: '0 0 12px', lineHeight: 1.1 }}>{sp.label}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: '0 0 24px', flex: 1 }}>{sp.desc}</p>
                    <div style={{ fontSize: 12, fontWeight: 800, color: ORANGE, textTransform: 'uppercase', letterSpacing: 1.2, display: 'flex', alignItems: 'center', gap: 6 }}>Learn More <ArrowRight size={12} /></div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES — homepage card style ── */}
      <section id="services" style={{ background: '#F7F9FC', padding: '96px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>All Services</div>
              <h2 style={{ fontSize: 'clamp(26px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: 0 }}>Complete Care Under One Roof.</h2>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(0,29,61,0.55)', maxWidth: 380, lineHeight: 1.65, margin: 0 }}>Every specialist on staff. Select a category to explore all available treatments.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            <style>{`@media(max-width:860px){.sc-g{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:520px){.sc-g{grid-template-columns:1fr!important}}`}</style>
            {ALL_CATS.map((cat, i) => (
              <div key={cat.slug} className="sc-g">
                <ServiceCard cat={cat} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NO REFERRALS — dark accent like WhyBoca ── */}
      <section style={{ background: '#001D3D', padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(243,103,42,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <style>{`@media(max-width:860px){.nr-g{grid-template-columns:1fr!important}}`}</style>
            <div className="nr-g">
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 20 }}>The Boca Difference</div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 800, letterSpacing: '-2px', color: 'white', margin: '0 0 16px', lineHeight: 1.0 }}>
                Zero Outside<br /><span style={{ color: ORANGE }}>Referrals.</span> Ever.
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 36px' }}>Most practices send you out for surgery, implants, or ortho. Every Boca specialist is on staff. Your full treatment stays in one place.</p>
              <a href="/request-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 8, padding: '14px 28px', fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.4, boxShadow: '0 8px 18px rgba(243,103,42,0.32)' }}>Book an Appointment →</a>
            </div>
            <div className="nr-g" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              {[['No Referral Delays','Surgery, implants, ortho — all in-house. No weeks of lag, no extra copays.'],['One Patient Record','Your full history shared across every location. No repeating yourself.'],['Medicaid & Most PPOs','Nevada Medicaid, CHIP, and most major PPO plans accepted at all 9 locations.'],['9 Locations, One Standard','Same clinical protocols at every clinic. Go to whichever is closest.']].map(([title, body], i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ padding: '28px 24px', background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', borderTop: `3px solid ${i === 0 ? ORANGE : 'rgba(255,255,255,0.08)'}` }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'white', marginBottom: 10, lineHeight: 1.2 }}>{title}</div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  )
}
