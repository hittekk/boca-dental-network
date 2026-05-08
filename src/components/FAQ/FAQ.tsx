import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'

const FAQS = [
  {
    question: 'Do you accept Nevada Medicaid and CHIP?',
    answer:
      'Yes — every Boca Dental and Braces location accepts Nevada Medicaid and CHIP for qualifying patients, including full pediatric dental coverage at our Boca Kids offices. Bring your Medicaid card to your first visit and we will handle the rest.',
  },
  {
    question: 'Which dental insurance plans do you take?',
    answer:
      'We are in-network with most major dental plans including Delta Dental, MetLife, Cigna, Aetna, United Healthcare, Guardian, Humana, Anthem Blue Cross Blue Shield, and 25+ more. We verify your benefits before your first visit so you know exactly what is covered.',
  },
  {
    question: 'What if I do not have insurance — can I still afford care?',
    answer:
      'Absolutely. We offer in-house payment plans starting at $0 down, plus financing through CareCredit, Sunbit, and Alphaeon. Many treatments can be split over 6 to 24 months with low or no interest. Cost should never be the reason you avoid the dentist.',
  },
  {
    question: 'Are you accepting new patients right now?',
    answer:
      'Yes — all 9 Boca locations are accepting new patients. Most offices can schedule new patient exams within the same week, and many offer same-day or next-day availability. Call (702) 456-0005 or book online at any location page.',
  },
  {
    question: 'Do you handle dental emergencies on the same day?',
    answer:
      'Yes — toothache, broken crown, knocked-out tooth, or sudden swelling? Most Boca locations offer same-day emergency appointments during business hours. Call your nearest office immediately and we will work you into the schedule.',
  },
  {
    question: '¿Hay personal que habla español?',
    answer:
      'Sí — every Boca Dental and Braces location has Spanish-speaking team members at the front desk and in the operatories. Hablamos español en todas nuestras 9 oficinas en Las Vegas y Henderson para servirle mejor.',
  },
  {
    question: 'How young can my child start coming to Boca Kids?',
    answer:
      'We recommend a child\'s first dental visit by age 1, or within 6 months of their first tooth appearing. Boca Kids is built specifically for pediatric care from the toddler years through the teenage years, including braces and orthodontics.',
  },
  {
    question: 'What are your office hours?',
    answer:
      'Most Boca locations are open Monday through Friday 9am to 7pm and Saturday 9am to 7pm — a few offices have shorter Saturday hours. Closed Sundays. Visit any location page for that office\'s exact schedule.',
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
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 80,
            alignItems: 'flex-start',
          }}
        >
          {/* Left — sticky panel */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
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
              Common Questions
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#162E7A',
                lineHeight: 1.05,
                letterSpacing: '-0.5px',
                margin: '0 0 20px',
              }}
            >
              Questions?
              <br />
              <span style={{ color: '#F3672A' }}>We Have Answers.</span>
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
