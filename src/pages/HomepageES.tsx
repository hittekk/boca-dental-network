// ─────────────────────────────────────────────────────────────────────────────
// src/pages/HomepageES.tsx
// Full Spanish homepage — replica of Homepage() with every element translated.
// Route: /oficina-de-habla-hispana/
// DO NOT IMPORT this in App.tsx directly — it is imported via SpanishLandingPage
// in CorePages.tsx which sets the canonical + hreflang.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Clock, CreditCard, UserPlus, Languages, Star,
  ChevronDown, Phone, Calendar, Smile, Sparkles, Crown,
  Wrench, Activity, Baby, Moon, Stethoscope, ShieldCheck,
  ChevronRight, ArrowRight, BadgeCheck, Building2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import { INITIAL_DATA } from '../data/initialData'
import { GoogleG } from '../components/shared/icons/GoogleG'

const ORANGE = '#F3672A'
const NAVY   = '#162E7A'
const DARK   = '#001D3D'

// ─── Helper: scroll to element ────────────────────────────────────────────────
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// ─── TrustBar ES ──────────────────────────────────────────────────────────────
function TrustBarES() {
  const items = [
    { icon: <GoogleG size={14} />, text: '4.9 — Más de 1,200 Reseñas en Google', bold: true },
    { icon: <MapPin size={13} />, text: '9 Clínicas en Las Vegas' },
    { icon: <CreditCard size={13} />, text: 'Aceptamos la Mayoría de Seguros' },
    { icon: <Clock size={13} />, text: 'Horario de Noche y Fin de Semana' },
    { icon: <UserPlus size={13} />, text: 'Aceptamos Nuevos Pacientes' },
    { icon: <Languages size={13} />, text: 'Se Habla Español' },
  ]
  return (
    <div style={{ background: '#F7F9FC', borderBottom: '1px solid rgba(0,29,61,0.07)', overflowX: 'auto' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRight: i < items.length - 1 ? '1px solid rgba(0,29,61,0.07)' : 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            <span style={{ color: ORANGE, display: 'flex' }}>{item.icon}</span>
            <span style={{ fontSize: 12, fontWeight: item.bold ? 700 : 600, color: item.bold ? NAVY : 'rgba(0,29,61,0.65)', letterSpacing: 0.2 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Hero ES ──────────────────────────────────────────────────────────────────
function HeroES() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: 180, paddingBottom: 96, background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 60%, #1a3a8f 100%)' }}>
      <div className="absolute pointer-events-none" style={{ top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', border: '1.5px solid rgba(243,103,42,0.12)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.04)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(243,103,42,0.06) 0%, transparent 60%)' }} />

      <style>{`
        @media(max-width:860px) {
          .es-hero-grid { grid-template-columns: 1fr !important; }
          .es-hero-img  { min-height: 320px !important; order: -1 !important; }
        }
      `}</style>

      <div className="es-hero-grid" style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 56, alignItems: 'stretch' }}>

        {/* Copy */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            style={{ display: 'inline-block', background: 'rgba(243,103,42,0.12)', border: '1px solid rgba(243,103,42,0.32)', borderRadius: 20, padding: '6px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: ORANGE, marginBottom: 22 }}>
            Aceptando Nuevos Pacientes · Seguros · Medicaid Bienvenido
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontSize: 'clamp(34px, 4.6vw, 56px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-1.2px', lineHeight: 1.0, color: 'white', margin: '0 0 22px' }}>
            <span style={{ display: 'block' }}>Tu Clínica Dental</span>
            <span style={{ display: 'block' }}>en Las Vegas para</span>
            <span style={{ display: 'block', color: ORANGE }}>Toda la Familia</span>
            <span style={{ display: 'block', fontSize: '0.34em', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: 18 }}>
              9 Clínicas · Un Solo Equipo
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }}
            style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, maxWidth: 540, margin: '0 0 36px' }}>
            Atención dental general, cosmética, ortodoncia y especialidades bajo un mismo techo — con horarios flexibles, la mayoría de seguros aceptados y consultas gratuitas en clínicas por todo Las Vegas.
          </motion.p>

          <motion.div className="boca-hero-ctas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', marginBottom: 32 }}>
            <a href="/request-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 8, padding: '14px 24px', fontSize: 14, fontWeight: 800, textDecoration: 'none', letterSpacing: 0.4, textTransform: 'uppercase', boxShadow: '0 8px 18px rgba(243,103,42,0.32)' }}>
              <Calendar size={15} /> Reservar Cita
            </a>
            <button onClick={() => scrollTo('ubicaciones')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8, padding: '14px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.3, textTransform: 'uppercase' }}>
              <MapPin size={15} /> Encontrar Clínica
            </button>
          </motion.div>

          <motion.div className="boca-hero-rating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05, duration: 0.5 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: '8px 16px' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={13} fill="#F3672A" color="#F3672A" />)}
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>4.9 de 5</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>en 9 clínicas de Las Vegas</span>
          </motion.div>
        </motion.div>

        {/* Image card */}
        <motion.div className="es-hero-img" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
          style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.32), 0 8px 16px rgba(0,0,0,0.18)', border: '1px solid rgba(255,255,255,0.06)', minHeight: 520 }}>
          <img src="/hero-1.png" alt="Familia en la sala de espera de Boca Dental and Braces Las Vegas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%', display: 'block' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 110, background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }}
            style={{ position: 'absolute', bottom: 18, left: 18, right: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: 999, padding: '8px 16px', fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#162E7A', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> Recibiendo Pacientes
            </div>
            <div style={{ background: ORANGE, color: 'white', borderRadius: 999, padding: '8px 16px', fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', boxShadow: '0 6px 14px rgba(243,103,42,0.45)' }}>
              Se Habla Español
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Audience Routing ES ──────────────────────────────────────────────────────
function AudienceRoutingES() {
  const cards = [
    { icon: UserPlus, label: 'Nuevo Paciente', desc: 'Primera visita, registro de seguro y consulta gratuita.', href: '/request-consultation' },
    { icon: Baby, label: 'Mi Hijo', desc: 'Boca Kids Dentistry — cuidado pediátrico desde los primeros dientes.', href: '/clinics/boca-kids-dentistry/' },
    { icon: Sparkles, label: 'Estética Dental', desc: 'Blanqueamiento, carillas, Invisalign y transformaciones de sonrisa.', href: '/cosmetic-dentistry/' },
    { icon: ShieldCheck, label: 'Urgencia Dental', desc: 'Citas el mismo día para dolor, trauma o diente roto.', href: '/request-consultation' },
  ]
  return (
    <section style={{ background: 'white', padding: '56px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        <style>{`@media(max-width:860px){ .es-aud-grid{ grid-template-columns:repeat(2,1fr) !important; } } @media(max-width:500px){ .es-aud-grid{ grid-template-columns:1fr !important; } }`}</style>
        {cards.map((c, i) => (
          <a key={i} className="es-aud-grid" href={c.href} style={{ textDecoration: 'none', background: '#F7F9FC', borderRadius: 14, padding: '24px 22px', border: '1px solid rgba(0,29,61,0.07)', display: 'flex', flexDirection: 'column', gap: 10, transition: 'box-shadow 0.2s' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(243,103,42,0.1)', border: '1px solid rgba(243,103,42,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <c.icon size={20} color={ORANGE} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, letterSpacing: '-0.2px' }}>{c.label}</div>
            <p style={{ fontSize: 13, color: 'rgba(0,29,61,0.6)', lineHeight: 1.55, margin: 0 }}>{c.desc}</p>
            <span style={{ fontSize: 11, fontWeight: 800, color: ORANGE, textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 4, marginTop: 'auto' }}>Ver más <ArrowRight size={11} /></span>
          </a>
        ))}
      </div>
    </section>
  )
}

// ─── Services ES ──────────────────────────────────────────────────────────────
function ServicesES() {
  const [hovered, setHovered] = useState<string | null>(null)
  const services = [
    { slug: 'general-dentistry', icon: Smile, label: 'Odontología General', desc: 'Exámenes, limpiezas, radiografías, empastes y urgencias' },
    { slug: 'cosmetic-dentistry', icon: Sparkles, label: 'Odontología Cosmética', desc: 'Blanqueamiento, carillas, bonding y cambios de sonrisa' },
    { slug: 'restorative-dentistry', icon: Crown, label: 'Odontología Restauradora', desc: 'Coronas, puentes, dentaduras y reparación de dientes agrietados' },
    { slug: 'dental-implants', icon: Wrench, label: 'Implantes Dentales', desc: 'Implante individual, arco completo, All-on-4 e implantes sobre dentaduras' },
    { slug: 'orthodontics', icon: Activity, label: 'Ortodoncia', desc: 'Invisalign, frenos tradicionales, ortodoncia para adolescentes y adultos' },
    { slug: 'pediatric-dentistry', icon: Baby, label: 'Odontología Pediátrica', desc: 'Exámenes para niños, cuidado infantil, selladores y urgencias pediátricas' },
    { slug: 'sedation-dentistry', icon: Moon, label: 'Sedación Dental', desc: 'Óxido nitroso, sedación oral y sedación intravenosa' },
    { slug: 'oral-surgery', icon: Stethoscope, label: 'Cirugía Oral', desc: 'Extracciones, muelas del juicio, injerto óseo' },
    { slug: 'periodontal', icon: ShieldCheck, label: 'Atención Periodontal', desc: 'Tratamiento de enfermedad de las encías, limpieza profunda y mantenimiento' },
  ]
  return (
    <section id="servicios" style={{ background: '#ffffff', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ORANGE, textTransform: 'uppercase', marginBottom: 12 }}>Nuestros Servicios</div>
            <h2 style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: 0 }}>Atención Completa Bajo Un Mismo Techo.</h2>
          </div>
          <Link to="/services/" style={{ fontSize: 13, fontWeight: 800, color: ORANGE, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
            Ver Todos los Servicios <ChevronRight size={14} />
          </Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {['Todos', 'Familiar', 'Cosmético', 'Urgencias'].map((f, i) => (
            <button key={i} style={{ padding: '7px 18px', borderRadius: 999, border: `1px solid ${i === 0 ? ORANGE : 'rgba(0,29,61,0.12)'}`, background: i === 0 ? ORANGE : 'white', color: i === 0 ? 'white' : NAVY, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{f}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          <style>{`@media(max-width:860px){ .es-svc-grid{ grid-template-columns:repeat(2,1fr) !important; } } @media(max-width:520px){ .es-svc-grid{ grid-template-columns:1fr !important; } }`}</style>
          {services.map((s) => (
            <Link key={s.slug} className="es-svc-grid" to={`/${s.slug}/`}
              onMouseEnter={() => setHovered(s.slug)} onMouseLeave={() => setHovered(null)}
              style={{ textDecoration: 'none', background: hovered === s.slug ? NAVY : '#F7F7FA', border: `1px solid ${hovered === s.slug ? 'transparent' : 'rgba(0,29,61,0.08)'}`, borderRadius: 14, padding: '28px 26px', display: 'flex', flexDirection: 'column', gap: 10, transition: 'all 0.25s ease', boxShadow: hovered === s.slug ? '0 12px 32px rgba(22,46,122,0.18)' : 'none', transform: hovered === s.slug ? 'translateY(-2px)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: hovered === s.slug ? 'rgba(243,103,42,0.15)' : 'rgba(243,103,42,0.1)', border: `1px solid ${hovered === s.slug ? 'rgba(243,103,42,0.4)' : 'rgba(243,103,42,0.22)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <s.icon size={20} color={ORANGE} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: hovered === s.slug ? 'white' : NAVY, letterSpacing: '-0.2px' }}>{s.label}</div>
              <p style={{ fontSize: 13, color: hovered === s.slug ? 'rgba(255,255,255,0.65)' : 'rgba(0,29,61,0.6)', margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              <span style={{ fontSize: 11, fontWeight: 800, color: ORANGE, textTransform: 'uppercase', letterSpacing: 1.2, display: 'flex', alignItems: 'center', gap: 4, marginTop: 'auto' }}>
                Ver {s.label} <ChevronRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WhyBoca ES ───────────────────────────────────────────────────────────────
function WhyBocaES() {
  const pillars = [
    { icon: Building2, title: '9 Clínicas en Todo Las Vegas', body: 'De Bonanza a Serene, estamos cerca de donde vives, trabajas y crías a tu familia. Sin viajes largos, sin semanas de espera para una cita.' },
    { icon: Clock, title: 'Horario de Noche y Fin de Semana', body: 'Trabajamos según tu horario — no al revés. Citas disponibles de lunes a sábado, incluyendo horario matutino y nocturno.' },
    { icon: CreditCard, title: 'Aceptamos la Mayoría de Seguros', body: 'Boca Dental & Braces acepta la mayoría de los planes de seguro dental PPO. Nuestro equipo verifica tus beneficios antes de tu cita para que no haya sorpresas.' },
    { icon: Star, title: 'Opciones de Financiamiento Flexible', body: 'Financiamiento sin intereses a través de Sunbit y opciones de pago dentro de la clínica — para que el costo nunca sea un obstáculo para tu sonrisa.' },
    { icon: BadgeCheck, title: 'Proveedores con Experiencia y Vocación', body: 'Nuestro equipo incluye dentistas generales, un ortodoncista, cirujanos orales, periodoncistas y especialistas en pediatría — todo bajo una misma práctica.' },
    { icon: Languages, title: 'Personal Bilingüe', body: 'Se habla español en todas nuestras clínicas. Nuestro equipo bilingüe asegura que entiendas cada paso de tu plan de tratamiento.' },
  ]
  return (
    <section id="por-que-boca" style={{ background: DARK, padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '20%', width: 600, height: 400, background: 'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '120px 100%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56, maxWidth: 600 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ORANGE, textTransform: 'uppercase', marginBottom: 14 }}>Por Qué Boca</div>
          <h2 style={{ fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: 0 }}>¿Por Qué Las Familias de Las Vegas Eligen Boca?</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          <style>{`@media(max-width:860px){ .es-why-grid{ grid-template-columns:repeat(2,1fr) !important; } } @media(max-width:540px){ .es-why-grid{ grid-template-columns:1fr !important; } }`}</style>
          {pillars.map((p, i) => (
            <motion.div key={i} className="es-why-grid" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }}
              style={{ padding: '36px 32px', background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.045)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: 36, height: 3, background: ORANGE }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(243,103,42,0.1)', border: '1px solid rgba(243,103,42,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <p.icon size={20} color={ORANGE} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'white', letterSpacing: '-0.3px', marginBottom: 10 }}>{p.title}</div>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Steps ES ─────────────────────────────────────────────────────────────────
function StepsES() {
  const steps = [
    { number: '01', title: 'Reserva Tu Cita', body: 'Llama a cualquier clínica Boca o reserva en línea. La mayoría de las clínicas ofrecen citas el mismo día y el día siguiente para nuevos pacientes.', duration: '< 5 min' },
    { number: '02', title: 'Completa Tu Documentación', body: 'Descarga y completa tus formularios de nuevo paciente antes de la visita para ahorrar tiempo. Aceptamos la mayoría de los seguros.', duration: '~ 10 min' },
    { number: '03', title: 'Tu Primera Visita', body: 'Conoce a tu dentista, recibe un examen completo y radiografías, y discute tus opciones de tratamiento — sin presión, sin sorpresas.', duration: '~ 45 min' },
    { number: '04', title: 'Tu Plan de Tratamiento', body: 'Elaboramos un plan de tratamiento personalizado según tus necesidades y presupuesto. Opciones de financiamiento disponibles si es necesario.', duration: 'Misma visita' },
  ]
  return (
    <section style={{ background: '#F7F9FC', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ORANGE, textTransform: 'uppercase', marginBottom: 14 }}>Cómo Funciona</div>
          <h2 style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: 0 }}>Del Primer Contacto a Tu Sonrisa Ideal.</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          <style>{`@media(max-width:860px){ .es-steps-grid{ grid-template-columns:repeat(2,1fr) !important; } } @media(max-width:500px){ .es-steps-grid{ grid-template-columns:1fr !important; } }`}</style>
          {steps.map((s, i) => (
            <motion.div key={i} className="es-steps-grid" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ background: 'white', borderRadius: 16, padding: '28px 24px', border: '1px solid rgba(0,29,61,0.07)', boxShadow: '0 2px 12px rgba(0,29,61,0.05)', position: 'relative' }}>
              <div style={{ fontSize: 42, fontWeight: 900, color: 'rgba(0,29,61,0.05)', letterSpacing: '-2px', lineHeight: 1, position: 'absolute', top: 16, right: 20 }}>{s.number}</div>
              <div style={{ display: 'inline-block', background: ORANGE, color: 'white', borderRadius: 999, padding: '3px 12px', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>{s.duration}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: NAVY, marginBottom: 10, letterSpacing: '-0.2px' }}>{s.title}</div>
              <p style={{ fontSize: 13, color: 'rgba(0,29,61,0.6)', lineHeight: 1.65, margin: 0 }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ES ──────────────────────────────────────────────────────────
function TestimonialsES() {
  const reviews = [
    { initials: 'MG', name: 'Maria G.', location: 'Clínica Sahara', rating: 5, quote: 'Todo el equipo de Boca Sahara me hizo sentir muy bienvenida. Hablan español perfecto y me explicaron cada opción con mi seguro. La mejor experiencia dental que he tenido en Las Vegas.' },
    { initials: 'SL', name: 'Sofia L.', location: 'Clínica Flamingo', rating: 5, quote: 'Empecé Invisalign aquí hace 8 meses y mi sonrisa ya se transformó. El financiamiento a través de Sunbit lo hizo realmente asequible. La recepción es increíble y muy paciente con mis preguntas.' },
    { initials: 'AM', name: 'Ana M.', location: 'Boca Kids Dentistry', rating: 5, quote: 'Mi niña de 4 años le tenía terror al dentista. El equipo de Boca Kids lo convirtió en una visita divertida — ahora PIDE que la llevemos. Aceptan Medicaid, lo que lo hizo posible para nosotros. Por siempre agradecida.' },
    { initials: 'DT', name: 'David T.', location: 'Clínica Jones & I-95', rating: 5, quote: 'Traje a toda mi familia a la clínica de Jones e I-95 para limpiezas. Tomaron nuestro seguro Aetna sin sorpresas al momento de pagar. La higienista fue suave y minuciosa. Muy recomendada si buscas un dentista familiar en el west side.' },
  ]
  return (
    <section style={{ background: DARK, padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '120px 100%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ORANGE, textTransform: 'uppercase', marginBottom: 14 }}>Reseñas de Pacientes</div>
          <h2 style={{ fontSize: 'clamp(26px,3vw,42px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: '0 0 8px' }}>Lo Que Dicen las Familias de Las Vegas.</h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 999, padding: '8px 18px', marginTop: 16 }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={ORANGE} color={ORANGE} />)}
            <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>4.9 de 5</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Más de 1,200 reseñas en Google en las 9 clínicas de Las Vegas</span>
          </div>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 48 }}>
          <style>{`@media(max-width:720px){ .es-test-grid{ grid-template-columns:1fr !important; } }`}</style>
          {reviews.map((r, i) => (
            <motion.div key={i} className="es-test-grid" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.1 }}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '28px 28px' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>{[1,2,3,4,5].map(j => <Star key={j} size={13} fill={ORANGE} color={ORANGE} />)}</div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>"{r.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(243,103,42,0.15)', border: '1px solid rgba(243,103,42,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: ORANGE }}>{r.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{r.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── BocaKids ES ──────────────────────────────────────────────────────────────
function BocaKidsES() {
  return (
    <section style={{ background: '#F7F9FC', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <style>{`@media(max-width:860px){ .es-kids-grid{ grid-template-columns:1fr !important; } }`}</style>
        <motion.div className="es-kids-grid" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ORANGE, textTransform: 'uppercase', marginBottom: 14 }}>Boca Kids Dentistry</div>
          <h2 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: '0 0 20px' }}>Donde los Niños Realmente Aman al Dentista.</h2>
          <p style={{ fontSize: 16, color: 'rgba(0,29,61,0.7)', lineHeight: 1.75, margin: '0 0 28px' }}>
            Nuestra clínica pediátrica dedicada fue construida desde cero para niños y adolescentes. Sala silenciosa para niños con necesidades sensoriales, equipo bilingüe y Medicaid de Nevada aceptado.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {['Desde el primer diente', 'Personal bilingüe en turno', 'Medicaid y CHIP aceptados', 'Sala apta para necesidades sensoriales'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(243,103,42,0.1)', border: '1px solid rgba(243,103,42,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: ORANGE }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{item}</span>
              </div>
            ))}
          </div>
          <a href="/clinics/boca-kids-dentistry/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 8, padding: '13px 24px', fontSize: 14, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.4, boxShadow: '0 8px 18px rgba(243,103,42,0.25)' }}>
            Visitar Boca Kids →
          </a>
        </motion.div>
        <motion.div className="es-kids-grid" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', background: 'linear-gradient(135deg, #001D3D, #162E7A)', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <img src="/boca-kids-hero.jpg" alt="Niña feliz en la silla dental de Boca Kids Dentistry Las Vegas" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,29,61,0.5) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, background: ORANGE, borderRadius: 999, padding: '8px 18px', fontSize: 12, fontWeight: 800, color: 'white', letterSpacing: 1, textTransform: 'uppercase', boxShadow: '0 4px 14px rgba(243,103,42,0.4)' }}>
              Se Habla Español
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Locations Map ES ─────────────────────────────────────────────────────────
function LocationsES() {
  return (
    <section id="ubicaciones" style={{ background: DARK, padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '120px 100%', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ORANGE, textTransform: 'uppercase', marginBottom: 14 }}>9 Clínicas en Las Vegas</div>
            <h2 style={{ fontSize: 'clamp(26px,3vw,44px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: 0 }}>Siempre Cerca de Tu Hogar.</h2>
          </div>
          <Link to="/clinics/" style={{ fontSize: 13, fontWeight: 800, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1 }}>Ver Todas las Ubicaciones →</Link>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
          <style>{`@media(max-width:780px){ .es-loc-grid{ grid-template-columns:repeat(2,1fr) !important; } } @media(max-width:480px){ .es-loc-grid{ grid-template-columns:1fr !important; } }`}</style>
          {INITIAL_DATA.locations.map((loc, i) => (
            <Link key={loc.slug} className="es-loc-grid" to={`/clinics/${loc.slug}/`}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)', padding: '18px 22px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'white', marginBottom: 3 }}>{loc.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{loc.neighborhood}</div>
              </div>
              <span style={{ color: ORANGE, fontSize: 16 }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ES ───────────────────────────────────────────────────────────────────
function FAQES() {
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: '¿Boca Dental & Braces acepta nuevos pacientes?', a: 'Sí — aceptamos nuevos pacientes en las 9 clínicas de Las Vegas. La mayoría de las ubicaciones ofrecen citas el mismo día. Llama al (702) 456-0005 o reserva en línea.' },
    { q: '¿Aceptan seguros dentales?', a: 'Aceptamos la mayoría de los planes de seguro PPO, incluyendo Delta Dental, Aetna, Cigna, Guardian, MetLife y más. También aceptamos Medicaid de Nevada y CHIP. Nuestro equipo verifica tus beneficios antes de la cita.' },
    { q: '¿Qué servicios dentales ofrecen?', a: 'Ofrecemos atención completa: odontología general, cosmética, restauradora, implantes dentales, ortodoncia (Invisalign y frenos), odontología pediátrica, sedación, cirugía oral y atención periodontal — todo bajo un mismo techo.' },
    { q: '¿Ofrecen citas de urgencia o el mismo día?', a: 'Sí. Ofrecemos citas de urgencia el mismo día en la mayoría de las clínicas. Llama al (702) 456-0005 para ser atendido lo antes posible.' },
    { q: '¿Dónde están ubicadas sus clínicas en Las Vegas?', a: 'Tenemos 9 clínicas en todo Las Vegas: Russell y Eastern, Boca Kids Dentistry, Bonanza y Eastern, Sahara y Decatur, Charleston y Lamb, Flamingo y Torrey, Cheyenne Commons, Jones e I-95, y Beltway Marketplace.' },
    { q: '¿Cuáles son sus horarios de atención?', a: 'Los horarios varían por clínica. La mayoría abren de lunes a sábado con horario matutino y nocturno. Consulta la página de tu clínica más cercana para ver los horarios exactos.' },
    { q: '¿Ofrecen planes de pago para los tratamientos?', a: 'Sí. Ofrecemos financiamiento sin intereses a través de Sunbit, además de opciones de pago dentro de la clínica y aceptamos FSA/HSA. Pregunta en la recepción o llámanos para más detalles.' },
    { q: '¿Boca Dental & Braces es buena opción para niños?', a: 'Absolutamente. Tenemos una clínica pediátrica dedicada — Boca Kids Dentistry — y personal capacitado para atender a niños en la mayoría de nuestras ubicaciones. Aceptamos Medicaid y CHIP para pacientes elegibles.' },
  ]
  return (
    <section style={{ background: 'white', padding: '96px 32px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ORANGE, textTransform: 'uppercase', marginBottom: 14 }}>Preguntas Frecuentes</div>
          <h2 style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 800, letterSpacing: '-1.5px', color: NAVY, margin: 0 }}>Preguntas Comunes de Nuestros Pacientes.</h2>
        </motion.div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ border: '1px solid rgba(0,29,61,0.08)', borderRadius: 12, overflow: 'hidden' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: open === i ? '#F7F9FC' : 'white', border: 'none', cursor: 'pointer', gap: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: NAVY, textAlign: 'left' }}>{faq.q}</span>
                <ChevronDown size={18} color={ORANGE} style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p style={{ fontSize: 14, color: 'rgba(0,29,61,0.7)', lineHeight: 1.7, margin: 0, padding: '0 24px 20px' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ES ───────────────────────────────────────────────────────────────────
function CTAES() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #001D3D 0%, #162E7A 100%)', padding: '96px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '36px 36px', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: ORANGE, textTransform: 'uppercase', marginBottom: 20 }}>Último Paso · Reserva Tu Visita</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            {[{ icon: Languages, text: 'Se Habla Español' }, { icon: ShieldCheck, text: 'Medicaid · CHIP' }, { icon: Clock, text: 'Abierto Hoy' }].map((p, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                <p.icon size={13} color={ORANGE} />{p.text}
              </div>
            ))}
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-1.5px', color: 'white', margin: '0 0 20px', lineHeight: 1.1 }}>
            ¿Listo para Reservar?{' '}
            <span style={{ color: ORANGE }}>Tu Sonrisa Puede Esperar,</span>
            <br />Pero Nosotros No Tienes Que.
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 44px', maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Reserva en línea en menos de 2 minutos, o llámanos directamente. La mayoría de las clínicas ofrecen citas disponibles esta semana.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a href="/request-consultation" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ORANGE, color: 'white', borderRadius: 8, padding: '16px 32px', fontSize: 15, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 0.4, boxShadow: '0 8px 24px rgba(243,103,42,0.35)' }}>
              <Calendar size={16} /> Reservar Cita en Línea
            </a>
            <a href="tel:7024560005" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', color: 'white', borderRadius: 8, padding: '16px 28px', fontSize: 15, fontWeight: 800, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', textTransform: 'uppercase', letterSpacing: 0.4 }}>
              <Phone size={16} /> (702) 456-0005
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function HomepageES() {
  return (
    <div>
      <Header brand={INITIAL_DATA.brand} announcement={INITIAL_DATA.announcement} logoMode="light" />
      <HeroES />
      <TrustBarES />
      <AudienceRoutingES />
      <ServicesES />
      <WhyBocaES />
      <StepsES />
      <TestimonialsES />
      <BocaKidsES />
      <LocationsES />
      <FAQES />
      <CTAES />
      <Footer />
    </div>
  )
}
