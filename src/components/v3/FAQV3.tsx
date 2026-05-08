import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    cat: 'Insurance',
    question: 'Do you accept Nevada Medicaid and CHIP?',
    answer:
      'Yes — every Boca location accepts Nevada Medicaid and CHIP for qualifying patients, including full pediatric dental at Boca Kids offices. Bring your card to your first visit and we will handle the rest.',
  },
  {
    cat: 'Insurance',
    question: 'Which dental insurance plans do you take?',
    answer:
      'We are in-network with Delta Dental, MetLife, Cigna, Aetna, United Healthcare, Guardian, Humana, Anthem BCBS, Ameritas, Principal, and 25+ more. We verify your benefits before your first visit so you know exactly what is covered.',
  },
  {
    cat: 'Pricing',
    question: 'What if I do not have insurance?',
    answer:
      'In-house payment plans starting at $0 down, plus financing through CareCredit, Sunbit, and Alphaeon. Many treatments can be split over 6–24 months with low or no interest.',
  },
  {
    cat: 'Booking',
    question: 'Are you accepting new patients right now?',
    answer:
      'Yes — all 9 Boca offices are accepting new patients. Most can schedule new patient exams within the same week. Same-day or next-day visits often available.',
  },
  {
    cat: 'Care',
    question: 'Same-day emergency appointments?',
    answer:
      'Yes — most Boca offices keep same-day emergency slots open during business hours. Toothache, broken crown, knocked-out tooth, sudden swelling — call your nearest office immediately.',
  },
  {
    cat: 'Languages',
    question: '¿Hay personal que habla español?',
    answer:
      'Sí — every Boca location has Spanish-speaking team members at the front desk and chairside. Hablamos español en todas nuestras 9 oficinas en Las Vegas y Henderson para servirle mejor.',
  },
  {
    cat: 'Pediatric',
    question: 'How young can my child start at Boca Kids?',
    answer:
      'We recommend a child\'s first dental visit by age 1, or within 6 months of their first tooth. Boca Kids is built specifically for pediatric care from toddler years through teen years, including braces.',
  },
  {
    cat: 'Hours',
    question: 'When are you open?',
    answer:
      'Most Boca locations are open Monday–Friday 9am–7pm and Saturday 9am–7pm — a few offices have shorter Saturday hours. Closed Sundays. Visit any location page for that office\'s exact schedule.',
  },
]

export function FAQV3() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section
      id="faq"
      style={{
        background: '#F5F0EA',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          right: 40,
          fontSize: 'clamp(180px, 22vw, 360px)',
          fontWeight: 800,
          color: 'rgba(10,10,15,0.04)',
          lineHeight: 0.85,
          letterSpacing: '-12px',
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        }}
      >
        ?
      </div>

      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.85fr 1.15fr',
            gap: 80,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — sticky panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'sticky', top: 110 }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 24,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 08 ] · Asked & Answered
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2px',
                color: '#0A0A0F',
                margin: '0 0 28px',
                textTransform: 'uppercase',
              }}
            >
              The questions
              <br />
              we hear{' '}
              <span style={{ color: '#F3672A' }}>every day.</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: 'rgba(10,10,15,0.65)',
                lineHeight: 1.65,
                margin: '0 0 28px',
                maxWidth: 380,
              }}
            >
              Insurance, pricing, kids, emergencies, hours — the eight things
              our front desk gets asked most. Yours not here? Just call.
            </p>
            <a
              href="tel:7024560005"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#0A0A0F',
                color: 'white',
                borderRadius: 8,
                padding: '14px 26px',
                fontSize: 13,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#1a1a24')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#0A0A0F')
              }
            >
              Call (702) 456-0005
            </a>
          </motion.div>

          {/* RIGHT — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6 }}
          >
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  style={{
                    borderTop: '1px solid rgba(10,10,15,0.12)',
                    borderBottom:
                      i === FAQS.length - 1
                        ? '1px solid rgba(10,10,15,0.12)'
                        : 'none',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      padding: '28px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 24,
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        color: 'rgba(10,10,15,0.4)',
                        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                        minWidth: 80,
                        flexShrink: 0,
                      }}
                    >
                      / {String(i + 1).padStart(2, '0')}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        fontSize: 19,
                        fontWeight: 700,
                        color: isOpen ? '#F3672A' : '#0A0A0F',
                        letterSpacing: '-0.3px',
                        lineHeight: 1.3,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {faq.question}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        color: '#F3672A',
                        background: 'rgba(243,103,42,0.08)',
                        border: '1px solid rgba(243,103,42,0.18)',
                        borderRadius: 999,
                        padding: '4px 10px',
                        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                        flexShrink: 0,
                      }}
                    >
                      {faq.cat}
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: isOpen ? '#F3672A' : 'rgba(10,10,15,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'background 0.2s ease',
                      }}
                    >
                      <Plus
                        size={16}
                        style={{ color: isOpen ? 'white' : '#0A0A0F' }}
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
                            paddingLeft: 104,
                            paddingRight: 60,
                            paddingBottom: 32,
                            fontSize: 16,
                            color: 'rgba(10,10,15,0.7)',
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FAQV3
