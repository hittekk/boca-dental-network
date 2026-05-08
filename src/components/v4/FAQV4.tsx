import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    cat: 'Insurance',
    color: '#F3672A',
    question: 'Do you accept Nevada Medicaid and CHIP?',
    answer:
      'Yes — every Boca location accepts Nevada Medicaid and CHIP for qualifying patients, including full pediatric dental at Boca Kids offices. Bring your card to your first visit and we will handle the rest.',
  },
  {
    cat: 'Insurance',
    color: '#F3672A',
    question: 'Which dental insurance plans do you take?',
    answer:
      'We are in-network with Delta Dental, MetLife, Cigna, Aetna, United Healthcare, Guardian, Humana, Anthem BCBS, Ameritas, Principal, and 25+ more. We verify your benefits before your first visit so you know exactly what is covered.',
  },
  {
    cat: 'Pricing',
    color: '#3B82F6',
    question: 'What if I do not have insurance?',
    answer:
      'In-house payment plans starting at $0 down, plus financing through CareCredit, Sunbit, and Alphaeon. Many treatments can be split over 6–24 months with low or no interest.',
  },
  {
    cat: 'Booking',
    color: '#F3672A',
    question: 'Are you accepting new patients right now?',
    answer:
      'Yes — all 9 Boca offices are accepting new patients. Most can schedule new patient exams within the same week. Same-day or next-day visits often available.',
  },
  {
    cat: 'Care',
    color: '#3B82F6',
    question: 'Same-day emergency appointments?',
    answer:
      'Yes — most Boca offices keep same-day emergency slots open during business hours. Toothache, broken crown, knocked-out tooth, sudden swelling — call your nearest office immediately.',
  },
  {
    cat: 'Languages',
    color: '#F3672A',
    question: '¿Hay personal que habla español?',
    answer:
      'Sí — every Boca location has Spanish-speaking team members at the front desk and chairside. Hablamos español en todas nuestras 9 oficinas en Las Vegas y Henderson para servirle mejor.',
  },
  {
    cat: 'Pediatric',
    color: '#3B82F6',
    question: 'How young can my child start at Boca Kids?',
    answer:
      'We recommend a child\'s first dental visit by age 1, or within 6 months of their first tooth. Boca Kids is built specifically for pediatric care from toddler years through teen years, including braces.',
  },
  {
    cat: 'Hours',
    color: '#F3672A',
    question: 'When are you open?',
    answer:
      'Most Boca locations are open Monday–Friday 9am–7pm and Saturday 9am–7pm — a few offices have shorter Saturday hours. Closed Sundays. Visit any location page for that office\'s exact schedule.',
  },
]

export function FAQV4() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section
      id="faq"
      style={{
        background: '#FFFFFF',
        padding: '140px 32px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 56px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(243,103,42,0.08)',
              border: '1px solid rgba(243,103,42,0.18)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#F3672A',
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#F3672A',
              }}
            >
              Asked & Answered
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2.2px',
              color: '#0A0A0F',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            The questions
            <br />
            we hear{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              every day.
            </span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div
          style={{
            background: '#FAFAFA',
            border: '1px solid rgba(10,10,15,0.06)',
            borderRadius: 24,
            padding: '8px 24px',
          }}
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                style={{
                  borderBottom:
                    i < FAQS.length - 1
                      ? '1px solid rgba(10,10,15,0.08)'
                      : 'none',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    padding: '24px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: faq.color,
                      background: `${faq.color}14`,
                      border: `1px solid ${faq.color}30`,
                      borderRadius: 999,
                      padding: '4px 10px',
                      minWidth: 90,
                      textAlign: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {faq.cat}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontSize: 18,
                      fontWeight: 700,
                      color: isOpen ? faq.color : '#0A0A0F',
                      letterSpacing: '-0.3px',
                      lineHeight: 1.35,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {faq.question}
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: isOpen
                        ? `linear-gradient(135deg, ${faq.color} 0%, ${
                            faq.color === '#F3672A' ? '#FF8A50' : '#60A5FA'
                          } 100%)`
                        : 'white',
                      border: isOpen ? 'none' : '1px solid rgba(10,10,15,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: isOpen
                        ? `0 8px 16px ${faq.color}50`
                        : '0 2px 4px rgba(10,10,15,0.04)',
                      transition: 'background 0.25s ease, box-shadow 0.25s ease',
                    }}
                  >
                    <Plus
                      size={16}
                      style={{
                        color: isOpen ? 'white' : '#0A0A0F',
                      }}
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
                          paddingLeft: 108,
                          paddingRight: 60,
                          paddingBottom: 28,
                          fontSize: 15,
                          color: 'rgba(10,10,15,0.65)',
                          lineHeight: 1.7,
                        }}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQV4
