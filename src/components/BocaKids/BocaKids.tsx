import { motion } from 'framer-motion'
import { Star, Quote, Phone, ArrowRight, Smile, ShieldCheck, Heart, Sparkles } from 'lucide-react'
import { KIDS_FEATURE_ICONS } from './KidsIcons'
import { useLang, t } from '../../lib/lang'

const ORANGE = '#F3672A'
const NAVY = '#162E7A'
const NAVY_DEEP = '#001D3D'

function getKidsFeatures(lang: import('../../lib/lang').Lang) { return [
  t(lang,'Pediatric dental care from age 1','Atención pediátrica desde los 12 meses'),
  t(lang,'Kid-friendly offices built for comfort','Clínicas diseñadas para la comodidad de los niños'),
  t(lang,'Medicaid and CHIP accepted','Medicaid y CHIP aceptados'),
  t(lang,'Bilingual staff — hablamos español','Personal bilingüe — hablamos español'),
  t(lang,'Preventive care, fillings, and extractions','Cuidado preventivo, empastes y extracciones'),
  t(lang,'Orthodontics and braces for kids and teens','Ortodoncia y frenos para niños y adolescentes'),
]}

function getStats(lang: import('../../lib/lang').Lang) { return [
  { value: t(lang,'Age 1+','Edad 1+'), label: t(lang,'First-visit age','Primera visita') },
  { value: '1,500+', label: t(lang,'Happy kids served','Niños felices atendidos') },
  { value: '★ 4.9',  label: t(lang,'Parent rating','Calificación de padres') },
  { value: 'EN · ES', label: t(lang,'Bilingual care','Atención bilingüe') },
]}

export function BocaKids() {
  const lang = useLang()
  const KIDS_FEATURES = getKidsFeatures(lang)
  const STATS = getStats(lang)
  return (
    <section
      id="boca-kids"
      style={{
        background:
          'linear-gradient(180deg, #FFFAF6 0%, #FFF4ED 60%, #FFFAF6 100%)',
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft orange glow accents */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-12%',
          width: 720,
          height: 720,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.18) 0%, transparent 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: 580,
          height: 580,
          background:
            'radial-gradient(circle, rgba(22,46,122,0.08) 0%, transparent 65%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />
      {/* Faint star pattern (playful pediatric feel) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(243,103,42,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="boca-kids-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <style>{`
            @media (max-width: 980px) {
              .boca-kids-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
              .boca-kids-image-col { order: -1; }
            }
            @media (max-width: 768px) {
              .boca-kids-ctas { flex-direction: column !important; }
              .boca-kids-ctas > a { width: 100% !important; justify-content: center !important; }
            }
            @media (max-width: 560px) {
              .boca-kids-stats { grid-template-columns: 1fr !important; }
              .boca-kids-features { grid-template-columns: 1fr !important; }
            }
            .kid-feature { transition: all 0.25s ease; }
            .kid-feature:hover {
              background: white !important;
              border-color: rgba(243,103,42,0.3) !important;
              transform: translateY(-2px);
              box-shadow: 0 8px 20px rgba(243,103,42,0.10);
            }
            .kid-feature:hover .kid-feat-icon {
              background: ${ORANGE} !important;
              color: white !important;
              transform: rotate(-6deg);
            }
          `}</style>

          {/* LEFT — content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            {/* Eyebrow badge with smile icon */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 20,
                background: 'white',
                border: '1px solid rgba(243,103,42,0.28)',
                borderRadius: 999,
                padding: '6px 14px 6px 8px',
                boxShadow: '0 4px 14px rgba(243,103,42,0.10)',
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: ORANGE,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <Smile size={13} strokeWidth={2.5} />
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: ORANGE,
                }}
              >
                Boca Kids Dental &amp; Braces
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 46px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: NAVY_DEEP,
                lineHeight: 1.05,
                letterSpacing: '-0.6px',
                margin: '0 0 18px',
              }}
            >
              Dental Care{' '}
              <span
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  color: ORANGE,
                }}
              >
                {t(lang,'built','pensada')}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    right: 0,
                    height: 8,
                    background: 'rgba(243,103,42,0.22)',
                    borderRadius: 4,
                    zIndex: -1,
                  }}
                />
              </span>{' '}
              {t(lang,'for kids.','para niños.')}
            </h2>

            <p
              style={{
                fontSize: 16.5,
                color: 'rgba(0,29,61,0.7)',
                lineHeight: 1.7,
                margin: '0 0 28px',
                maxWidth: 540,
              }}
            >
              {t(lang, 'Boca Kids is our dedicated pediatric practice — designed from the ground up to make every child\'s dental visit comfortable, fun, and fear-free. From their first tooth through their teenage years.', 'Boca Kids es nuestra clínica pediátrica dedicada — diseñada para hacer de cada visita dental una experiencia cómoda, divertida y sin miedo. Desde el primer diente hasta la adolescencia.')}
            </p>

            {/* Stats cluster */}
            <div
              className="boca-kids-stats"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 10,
                marginBottom: 28,
              }}
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  style={{
                    background: 'white',
                    border: '1px solid rgba(243,103,42,0.16)',
                    borderTop: `2px solid ${ORANGE}`,
                    borderRadius: 10,
                    padding: '14px 12px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(15px, 1.5vw, 19px)',
                      fontWeight: 800,
                      color: NAVY,
                      letterSpacing: '-0.3px',
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: 'rgba(0,29,61,0.55)',
                    }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature mini-cards — 2 column grid */}
            <div
              className="boca-kids-features"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 10,
                marginBottom: 32,
              }}
            >
              {KIDS_FEATURES.map((feature, i) => {
                const Icon = KIDS_FEATURE_ICONS[i]
                return (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="kid-feature"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(243,103,42,0.12)',
                      borderRadius: 10,
                    }}
                  >
                    {Icon && (
                      <div
                        className="kid-feat-icon"
                        style={{
                          width: 34,
                          height: 34,
                          background: 'rgba(243,103,42,0.10)',
                          border: '1px solid rgba(243,103,42,0.22)',
                          borderRadius: 8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          color: ORANGE,
                          transition: 'all 0.25s ease',
                        }}
                      >
                        <Icon size={17} />
                      </div>
                    )}
                    <span
                      style={{
                        fontSize: 13,
                        color: NAVY_DEEP,
                        fontWeight: 600,
                        lineHeight: 1.35,
                      }}
                    >
                      {feature}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* CTAs */}
            <div
              className="boca-kids-ctas"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <a
                href="/clinics/boca-kids-dentistry/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: ORANGE,
                  color: 'white',
                  borderRadius: 8,
                  padding: '14px 26px',
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  boxShadow: '0 14px 32px rgba(243,103,42,0.34)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#d95a22'
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = ORANGE
                  el.style.transform = 'translateY(0)'
                }}
              >
                {t(lang, 'Find Boca Kids near you', 'Visitar Boca Kids')}
                <ArrowRight size={14} />
              </a>
              <a
                href="tel:7023891543"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'transparent',
                  color: NAVY_DEEP,
                  border: '2px solid rgba(0,29,61,0.22)',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = NAVY_DEEP
                  el.style.color = 'white'
                  el.style.borderColor = NAVY_DEEP
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  el.style.color = NAVY_DEEP
                  el.style.borderColor = 'rgba(0,29,61,0.22)'
                }}
              >
                <Phone size={14} color={ORANGE} />
                (702) 389-1543
              </a>
            </div>
          </motion.div>

          {/* RIGHT — image + floating badges + parent quote */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ position: 'relative' }}
            className="boca-kids-image-col"
          >
            {/* Main image card */}
            <div
              style={{
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 20,
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(243,103,42,0.22)',
                boxShadow:
                  '0 30px 60px rgba(243,103,42,0.16), 0 8px 24px rgba(0,29,61,0.10)',
              }}
            >
              <img
                src="/boca-kids-office.webp"
                alt="Smiling child in a Boca Kids dental chair with a friendly hygienist showing them a mirror"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '35% center',
                  display: 'block',
                }}
              />
              {/* Subtle gradient overlay at bottom for legibility */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(0,29,61,0.6) 100%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Bottom orange accent strip */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: ORANGE,
                }}
              />
            </div>

            {/* Floating "Age 1+" badge (bottom-left, on image) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: -18,
                left: -16,
                background: NAVY_DEEP,
                borderRadius: 14,
                padding: '14px 18px',
                boxShadow: '0 14px 36px rgba(0,29,61,0.32)',
                textAlign: 'center',
                minWidth: 124,
                border: '2px solid white',
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1,
                  letterSpacing: '-0.5px',
                }}
              >
                Age 1+
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginTop: 6,
                  fontWeight: 700,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                First Visit
              </div>
            </motion.div>

            {/* Floating Medicaid badge (top-right, on image) */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: 16,
                right: -16,
                background: 'white',
                borderRadius: 12,
                padding: '10px 14px',
                boxShadow: '0 12px 28px rgba(0,29,61,0.16)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                border: '1px solid rgba(243,103,42,0.2)',
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: 'rgba(34,197,94,0.12)',
                  border: '1px solid rgba(34,197,94,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a',
                }}
              >
                <ShieldCheck size={16} strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: NAVY_DEEP, lineHeight: 1.1 }}>
                  Medicaid + CHIP
                </div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: 'rgba(0,29,61,0.55)',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    marginTop: 2,
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  Accepted
                </div>
              </div>
            </motion.div>

            {/* Floating "Fear-free" sparkle badge (middle-right, on image) */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '46%',
                right: -22,
                background: ORANGE,
                color: 'white',
                borderRadius: 10,
                padding: '9px 14px',
                boxShadow: '0 12px 28px rgba(243,103,42,0.36)',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Sparkles size={13} strokeWidth={2.5} />
              Fear-free zone
            </motion.div>

            {/* Parent testimonial quote card (below image) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              style={{
                marginTop: 32,
                background: 'white',
                border: '1px solid rgba(243,103,42,0.18)',
                borderRadius: 14,
                padding: '20px 22px',
                boxShadow: '0 10px 28px rgba(0,29,61,0.06)',
                position: 'relative',
              }}
            >
              <Quote
                size={22}
                color={ORANGE}
                strokeWidth={1.8}
                style={{ opacity: 0.4, marginBottom: 8 }}
              />
              <p
                style={{
                  fontSize: 14,
                  color: NAVY_DEEP,
                  lineHeight: 1.55,
                  margin: '0 0 12px',
                  fontStyle: 'italic',
                }}
              >
                {t(lang, "My 4-year-old was terrified of the dentist until we came to Boca Kids. They have a special quiet room and the team is amazing with sensory-sensitive kids. Game-changer.", "Mi niña de 4 años le tenía terror al dentista hasta que vinimos a Boca Kids. Tienen una sala silenciosa especial y el equipo es increíble con niños con necesidades sensoriales. ¡Un cambio total!")}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 10,
                  borderTop: '1px solid rgba(0,29,61,0.06)',
                }}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: NAVY_DEEP }}>
                    Jessica P.
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(0,29,61,0.55)', marginTop: 2 }}>
                    Henderson · Google review
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 1, color: ORANGE }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill={ORANGE} color={ORANGE} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Decorative heart corner */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: -22,
                left: -14,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(243,103,42,0.22)',
                color: ORANGE,
              }}
            >
              <Heart size={18} fill={ORANGE} strokeWidth={2} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BocaKids
