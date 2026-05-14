import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'

// 8 homepage FAQs — exact text per Treysyde spec §9.
// These match the FAQPage JSON-LD emitted by HomepageSchema and inject-schema.mjs
// (Google penalizes schema/visible-content mismatches).
const FAQS = [
  {
    question: 'Is Boca Dental & Braces accepting new patients?',
    answer:
      'Yes. All 9 Boca Dental & Braces locations in Las Vegas are currently accepting new patients. You can book an appointment online at any time or call your nearest location directly. Most new patient appointments can be scheduled within a few days.',
  },
  {
    question: 'Does Boca Dental & Braces accept dental insurance?',
    answer:
      'Boca Dental & Braces accepts most major PPO dental insurance plans, including Delta Dental, Aetna, Cigna, Guardian, MetLife, and many others. Our team will verify your benefits before your appointment and provide a clear breakdown of your estimated out-of-pocket costs. We also accept Medicaid for eligible patients at select locations.',
  },
  {
    question: 'What dental services does Boca Dental & Braces offer?',
    answer:
      'Boca Dental & Braces offers a comprehensive range of dental services including general and preventive dentistry, cosmetic dentistry, restorative dentistry, dental implants, orthodontics (Invisalign and traditional braces), pediatric dentistry, oral surgery, periodontal care, and sedation dentistry. Not all services are available at every location — contact your nearest clinic or browse our services page to confirm availability.',
  },
  {
    question: 'Do you offer same-day or emergency dental appointments?',
    answer:
      'Yes. Boca Dental & Braces offers same-day emergency dental appointments at multiple Las Vegas locations. If you are experiencing a dental emergency — severe toothache, broken tooth, lost crown, swelling, or dental trauma — call your nearest location immediately. We prioritize emergency cases and work to see patients as quickly as possible, often the same day.',
  },
  {
    question: "Where are Boca Dental & Braces' Las Vegas locations?",
    answer:
      'Boca Dental & Braces has 9 dental clinic locations across Las Vegas, Nevada: Bonanza & Eastern, Russell & Eastern, Sahara & Decatur, Charleston & Lamb, Flamingo & Torrey Pines, Cheyenne Commons, Beltway Marketplace, Jones & I-95, and our dedicated pediatric clinic Boca Kids Dentistry. Use our location finder to identify the clinic nearest to you.',
  },
  {
    question: 'What are your office hours?',
    answer:
      'Hours vary by location. Most Boca Dental & Braces clinics are open Monday through Saturday with early morning, daytime, and evening appointment slots available. We designed our hours around Las Vegas families and working adults — so you will find options that fit your schedule without taking time off work.',
  },
  {
    question: 'Do you offer payment plans for dental treatment?',
    answer:
      'Yes. Boca Dental & Braces offers flexible financing through CareCredit, allowing patients to spread treatment costs over 6, 12, 18, or 24 months. We also offer in-house payment plans at most locations. Additionally, FSA and HSA funds can be applied toward dental treatment. No patient should delay needed dental care because of cost — our team will work with you to find a plan that fits your budget.',
  },
  {
    question: 'Is Boca Dental & Braces good for kids?',
    answer:
      'Absolutely. Boca Dental & Braces has a dedicated pediatric dentistry program and a fully kid-focused clinic — Boca Kids Dentistry — adjacent to our Russell & Eastern flagship. We see patients starting from their first tooth. Our team is experienced in creating a calm, friendly environment for children, and we offer preventive services like sealants and fluoride treatments specifically designed for young patients.',
  },
]

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
              Frequently Asked Questions
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
