import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'
import { useLang, t } from '../../lib/lang'

// 8 homepage FAQs — exact text per Treysyde spec §9.
// These match the FAQPage JSON-LD emitted by HomepageSchema and inject-schema.mjs
// (Google penalizes schema/visible-content mismatches).
function getFAQS(lang: import('../../lib/lang').Lang) { return [
  {
    question: t(lang, 'Is Boca Dental & Braces accepting new patients?', '¿Boca Dental & Braces acepta nuevos pacientes?'),
    answer:
      t(lang, 'Yes. All 9 Boca Dental & Braces locations in Las Vegas are currently accepting new patients. You can book an appointment online at any time or call your nearest location directly. Most new patient appointments can be scheduled within a few days.', 'Sí — las 9 clínicas de Boca Dental & Braces en Las Vegas están aceptando nuevos pacientes. Reserva en línea o llama a tu clínica más cercana. La mayoría de las citas para nuevos pacientes se pueden agendar en pocos días.'),
  },
  {
    question: t(lang, 'Does Boca Dental & Braces accept dental insurance?', '¿Aceptan seguros dentales?'),
    answer:
      t(lang, 'Boca Dental & Braces accepts Nevada Medicaid and many major PPO and dental plans — including Cigna, Delta Dental, Guardian, MetLife, United Concordia, Liberty Dental, Sierra Health, Careington, and DenteMax, among others. This is not a complete list, so our team will verify your specific plan and benefits before your appointment.', 'Boca Dental & Braces acepta Nevada Medicaid y muchos planes PPO y dentales importantes — incluyendo Cigna, Delta Dental, Guardian, MetLife, United Concordia, Liberty Dental, Sierra Health, Careington y DenteMax, entre otros. Esta no es una lista completa, por lo que nuestro equipo verificará tu plan y beneficios específicos antes de tu cita.'),
  },
  {
    question: t(lang, 'What dental services does Boca Dental & Braces offer?', '¿Qué servicios dentales ofrecen?'),
    answer:
      t(lang, 'Boca Dental & Braces offers a comprehensive range of dental services including general and preventive dentistry, cosmetic dentistry, restorative dentistry, dental implants, orthodontics (Invisalign and traditional braces), pediatric dentistry, oral surgery, periodontal care, and sedation dentistry. Not all services are available at every location — contact your nearest clinic or browse our services page to confirm availability.', 'Ofrecemos atención dental completa: odontología general, cosmética, restauradora, implantes, ortodoncia (Invisalign y frenos), odontología pediátrica, cirugía oral, atención periodontal y sedación. No todos los servicios están disponibles en cada clínica.'),
  },
  {
    question: t(lang, 'Do you offer same-day or emergency dental appointments?', '¿Ofrecen citas de urgencia o el mismo día?'),
    answer:
      t(lang, 'Yes. Boca Dental & Braces offers same-day emergency dental appointments at multiple Las Vegas locations. If you are experiencing a dental emergency — severe toothache, broken tooth, lost crown, swelling, or dental trauma — call your nearest location immediately. We prioritize emergency cases and work to see patients as quickly as possible, often the same day.', 'Sí. Ofrecemos citas de urgencia el mismo día en varias clínicas de Las Vegas. Si tienes una emergencia dental — dolor intenso, diente roto, corona perdida, inflamación o trauma — llama de inmediato a tu clínica más cercana.'),
  },
  {
    question: t(lang, "Where are Boca Dental & Braces' Las Vegas locations?", '¿Dónde están ubicadas sus clínicas en Las Vegas?'),
    answer:
      t(lang, 'Boca Dental & Braces has 9 dental clinic locations across Las Vegas, Nevada: Bonanza & Eastern, Russell & Eastern, Sahara & Decatur, Charleston & Lamb, Flamingo & Torrey Pines, Cheyenne Commons, Beltway Marketplace, Jones & I-95, and our dedicated pediatric clinic Boca Kids Dentistry. Use our location finder to identify the clinic nearest to you.', 'Boca Dental & Braces tiene 9 clínicas en Las Vegas: Bonanza y Eastern, Russell y Eastern, Sahara y Decatur, Charleston y Lamb, Flamingo y Torrey Pines, Cheyenne Commons, Beltway Marketplace, Jones e I-95, y Boca Kids Dentistry.'),
  },
  {
    question: t(lang, 'What are your office hours?', '¿Cuáles son sus horarios de atención?'),
    answer:
      t(lang, 'Hours vary by location. Most Boca Dental & Braces clinics are open Monday through Saturday with early morning, daytime, and evening appointment slots available. We designed our hours around Las Vegas families and working adults — so you will find options that fit your schedule without taking time off work.', 'Los horarios varían por clínica. La mayoría abren de lunes a sábado con horario matutino, diurno y nocturno. Diseñamos nuestros horarios para familias de Las Vegas y adultos que trabajan.'),
  },
  {
    question: t(lang, 'Do you offer payment plans for dental treatment?', '¿Ofrecen planes de pago para los tratamientos?'),
    answer:
      t(lang, 'Boca Dental & Braces is committed to making dental care accessible. We accept Nevada Medicaid and most major PPO plans, and our team will work with you to find a payment approach that fits your budget. Ask us about your options at your visit — no one should delay needed care because of cost.', 'Boca Dental & Braces se compromete a que la atención dental sea accesible. Aceptamos Nevada Medicaid y la mayoría de los planes PPO, y nuestro equipo trabajará contigo para encontrar una forma de pago que se ajuste a tu presupuesto. Pregúntanos por tus opciones en tu visita — nadie debe retrasar la atención necesaria por el costo.'),
  },
  {
    question: t(lang, 'Is Boca Dental & Braces good for kids?', '¿Es Boca Dental & Braces buena opción para niños?'),
    answer:
      t(lang, 'Absolutely. Boca Dental & Braces has a dedicated pediatric dentistry program and a fully kid-focused clinic — Boca Kids Dentistry — adjacent to our Russell & Eastern flagship. We see patients starting from their first tooth. Our team is experienced in creating a calm, friendly environment for children, and we offer preventive services like sealants and fluoride treatments specifically designed for young patients.', 'Absolutamente. Boca Dental & Braces tiene un programa pediátrico dedicado y una clínica completamente enfocada en niños — Boca Kids Dentistry. Atendemos pacientes desde su primer diente con selladores, flúor y un ambiente amigable para los niños.'),
  },
]}


function FaqItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof FAQS)[0]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      style={{
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: isOpen ? '#F3672A' : '#162E7A',
            letterSpacing: '-0.2px',
            lineHeight: 1.35,
            transition: 'color 0.2s ease',
          }}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: isOpen ? '#F3672A' : '#F7F7FA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s ease',
          }}
        >
          <ChevronDown
            size={16}
            style={{ color: isOpen ? 'white' : '#162E7A' }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                fontSize: 15,
                color: '#64748B',
                lineHeight: 1.75,
                paddingBottom: 24,
                paddingRight: 56,
              }}
            >
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const lang = useLang()
  const FAQS = getFAQS(lang)
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section id="faq" style={{ background: '#ffffff', padding: '96px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          className="faq-two-col"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 80,
            alignItems: 'flex-start',
          }}
        >
          <style>{`
            @media (max-width: 880px) {
              .faq-two-col { grid-template-columns: 1fr !important; gap: 36px !important; }
              .faq-sticky-panel { position: static !important; top: auto !important; }
            }
          `}</style>
          {/* Left — sticky panel (desktop only; static stacked on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
            className="faq-sticky-panel"
            style={{
              position: 'sticky',
              top: 100,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 12,
              }}
            >
              FAQs
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#162E7A',
                lineHeight: 1.05,
                letterSpacing: '-0.5px',
                margin: '0 0 20px',
              }}
            >
              {t(lang, 'Frequently Asked Questions', 'Preguntas Frecuentes')}
              <br />
              <span style={{ color: '#F3672A' }}>About Boca Dental &amp; Braces</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: '#64748B',
                lineHeight: 1.75,
                margin: '0 0 32px',
              }}
            >
              Insurance, financing, hours, kids, emergencies — here are
              the questions our front desk hears every day. Do not see
              yours? Give us a call.
            </p>

            <a
              href="tel:7024560005"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#F3672A',
                color: 'white',
                borderRadius: 8,
                padding: '13px 28px',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#d95a22')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#F3672A')
              }
            >
              <Phone size={15} />
              Call (702) 456-0005
            </a>
          </motion.div>

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ borderTop: '1px solid #E2E8F0' }}
          >
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.question}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
