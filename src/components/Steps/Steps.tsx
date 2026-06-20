import { motion } from 'framer-motion'
import {
  Phone,
  FileText,
  Stethoscope,
  ClipboardCheck,
  Clock,
  ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLang, t } from '../../lib/lang'

interface Step {
  number: string
  title: string
  body: string
  icon: LucideIcon
  duration: string
}

function getSteps(lang: import('../../lib/lang').Lang): Step[] { return [
  {
    number: '01',
    title: t(lang, 'Book Your Appointment', 'Reserva Tu Cita'),
    body: t(lang, 'Call any Boca location or book online. Most locations offer same-day and next-day appointments for new patients.', 'Llama a cualquier clínica Boca o reserva en línea. La mayoría de las clínicas ofrecen citas el mismo día para nuevos pacientes.'),
    icon: Phone,
    duration: t(lang, '< 5 min', '< 5 min'),
  },
  {
    number: '02',
    title: t(lang, 'Complete Your Forms', 'Completa Tu Documentación'),
    body: t(lang, 'When you book, we text your new patient forms straight to your phone — complete them in minutes before you arrive. We accept most insurance plans.', 'Al reservar, te enviamos tus formularios por mensaje de texto — complétalos en minutos antes de llegar. Aceptamos la mayoría de los seguros.'),
    icon: FileText,
    duration: t(lang, '~ 10 min', '~ 10 min'),
  },
  {
    number: '03',
    title: t(lang, 'Your First Visit', 'Tu Primera Visita'),
    body: t(lang, 'Meet your dentist, get a full exam and X-rays, and discuss your treatment options — no pressure, no surprises.', 'Conoce a tu dentista, recibe un examen completo y radiografías, y discute tus opciones de tratamiento — sin presión, sin sorpresas.'),
    icon: Stethoscope,
    duration: t(lang, '~ 45 min', '~ 45 min'),
  },
  {
    number: '04',
    title: t(lang, 'Your Treatment Plan', 'Tu Plan de Tratamiento'),
    body: t(lang, 'We build a personalized treatment plan around your needs and budget. Financing options available if needed.', 'Elaboramos un plan personalizado según tus necesidades y presupuesto. Opciones de financiamiento disponibles.'),
    icon: ClipboardCheck,
    duration: t(lang, 'Same visit', 'Misma visita'),
  },
]}

const ORANGE = '#F3672A'
const NAVY = '#162E7A'
const NAVY_DEEP = '#001D3D'

export function Steps() {
  const lang = useLang()
  const STEPS = getSteps(lang)
  return (
    <section
      id="new-patients"
      style={{
        background: 'linear-gradient(180deg, #F7F7FA 0%, #EEF1F8 100%)',
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft orange glow accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.10) 0%, transparent 65%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px 6px 10px',
              background: 'rgba(243,103,42,0.10)',
              border: `1px solid rgba(243,103,42,0.22)`,
              borderRadius: 999,
              marginBottom: 18,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: ORANGE,
                boxShadow: '0 0 10px rgba(243,103,42,0.6)',
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: ORANGE,
              }}
            >
              {t(lang, 'New patients · simple process', 'Nuevos pacientes · proceso simple')}
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: NAVY_DEEP,
              margin: '0 0 14px',
              letterSpacing: '-0.5px',
              lineHeight: 1.05,
            }}
          >
            {t(lang, 'Getting started is', 'Comenzar es')}{' '}
            <span style={{ color: ORANGE, fontStyle: 'italic' }}>{t(lang, 'easy.', 'fácil.')}</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: '#475569',
              maxWidth: 540,
              margin: '0 auto',
              lineHeight: 1.65,
              textWrap: 'balance' as React.CSSProperties['textWrap'],
            }}
          >
            {t(lang, "From your first call to your first appointment — here's what to expect when you choose Boca Dental & Braces.", 'Desde tu primera llamada hasta tu primera cita — esto es lo que puedes esperar al elegir Boca Dental & Braces.')}
            expect when you choose Boca Dental &amp; Braces.
          </p>
        </motion.div>

        {/* Steps grid — cards with icons + duration chips */}
        <div
          className="steps-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18,
            position: 'relative',
          }}
        >
          <style>{`
            @media (max-width: 980px) {
              .steps-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
              .steps-connector { display: none !important; }
            }
            @media (max-width: 560px) {
              .steps-grid { grid-template-columns: 1fr !important; }
            }
            .step-card { transition: all 0.25s ease; }
            .step-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 18px 40px rgba(0,29,61,0.12), 0 2px 6px rgba(0,29,61,0.06) !important;
              border-color: rgba(243,103,42,0.35) !important;
            }
            .step-card:hover .step-icon-bg {
              background: ${ORANGE} !important;
              border-color: ${ORANGE} !important;
              color: white !important;
              transform: rotate(-6deg);
            }
          `}</style>

          {/* Connector line behind cards */}
          <div
            aria-hidden
            className="steps-connector"
            style={{
              position: 'absolute',
              top: 52,
              left: '8%',
              right: '8%',
              height: 2,
              background:
                'linear-gradient(90deg, rgba(243,103,42,0.5) 0%, rgba(243,103,42,0.3) 33%, rgba(22,46,122,0.3) 66%, rgba(22,46,122,0.5) 100%)',
              zIndex: 0,
            }}
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="step-card"
                style={{
                  background: 'white',
                  border: '1px solid rgba(0,29,61,0.08)',
                  borderRadius: 16,
                  padding: '22px 22px 24px',
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 4px 14px rgba(0,29,61,0.05)',
                  minHeight: 280,
                }}
              >
                {/* Icon tile + step number badge */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 16,
                  }}
                >
                  <div
                    className="step-icon-bg"
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background:
                        'linear-gradient(135deg, rgba(243,103,42,0.14) 0%, rgba(243,103,42,0.04) 100%)',
                      border: '1px solid rgba(243,103,42,0.22)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.25s ease',
                      color: ORANGE,
                    }}
                  >
                    <Icon size={26} strokeWidth={2} />
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 40,
                      height: 40,
                      padding: '0 12px',
                      borderRadius: 999,
                      background: i === 0 ? ORANGE : 'white',
                      border: `2px solid ${i === 0 ? ORANGE : '#E2E8F0'}`,
                      color: i === 0 ? 'white' : NAVY,
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: '-0.5px',
                      boxShadow:
                        i === 0
                          ? '0 6px 16px rgba(243,103,42,0.35)'
                          : '0 1px 3px rgba(0,0,0,0.06)',
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: NAVY_DEEP,
                    margin: '0 0 10px',
                    letterSpacing: '-0.3px',
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: 13.5,
                    color: '#64748B',
                    lineHeight: 1.65,
                    margin: '0 0 16px',
                    flex: 1,
                  }}
                >
                  {step.body}
                </p>

                {/* Duration chip footer */}
                <div
                  style={{
                    paddingTop: 14,
                    borderTop: '1px solid rgba(0,29,61,0.06)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: NAVY,
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  <Clock size={12} color={ORANGE} strokeWidth={2.5} />
                  {step.duration}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA below steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            textAlign: 'center',
            marginTop: 56,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <a
            href="tel:7024560005"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: ORANGE,
              color: 'white',
              borderRadius: 8,
              padding: '15px 30px',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              boxShadow: '0 14px 32px rgba(243,103,42,0.32)',
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
            <Phone size={15} />
            {t(lang, 'Call to Book — (702) 456-0005', 'Llama para Reservar — (702) 456-0005')}
            <ArrowRight size={14} />
          </a>
          <div
            style={{
              fontSize: 12,
              color: '#94A3B8',
              fontWeight: 600,
              letterSpacing: 0.3,
            }}
          >
            Or book online at any location page
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Steps
