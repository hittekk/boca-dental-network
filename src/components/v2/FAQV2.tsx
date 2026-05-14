import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Phone } from 'lucide-react'

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
      'Yes — all 9 Boca locations are accepting new patients. Most offices can schedule new-patient exams within the same week, and many offer same-day or next-day availability. Call (702) 456-0005 or book online at any location page.',
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
      "We recommend a child's first dental visit by age 1, or within 6 months of their first tooth appearing. Boca Kids is built specifically for pediatric care from the toddler years through the teenage years, including braces and orthodontics.",
  },
  {
    question: 'What are your office hours?',
    answer:
      "Most Boca locations are open Monday through Friday 9am to 7pm and Saturday 9am to 7pm — a few offices have shorter Saturday hours. Closed Sundays. Visit any location page for that office's exact schedule.",
  },
]

function FaqRow({
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
  const numeral = String(index + 1).padStart(2, '0')
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      style={{
        borderBottom: '1px solid rgba(0,29,61,0.12)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '24px 0',
          display: 'grid',
          gridTemplateColumns: '64px 1fr 40px',
          alignItems: 'center',
          gap: 18,
          textAlign: 'left',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {/* Outlined sans numeral — magazine-page-number treatment */}
        <span
          aria-hidden
          style={{
            fontFamily: 'inherit',
            fontWeight: 800,
            fontSize: 32,
            color: isOpen ? '#F3672A' : 'transparent',
            WebkitTextStroke: isOpen ? '0' : '1.3px #F3672A',
            lineHeight: 0.9,
            letterSpacing: '-1.5px',
            fontVariantNumeric: 'tabular-nums',
            transition: 'color 0.25s ease, -webkit-text-stroke 0.25s ease',
          }}
        >
          {numeral}
        </span>

        <span
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: isOpen ? '#F3672A' : '#001D3D',
            letterSpacing: '-0.3px',
            lineHeight: 1.3,
            transition: 'color 0.2s ease',
          }}
        >
          {faq.question}
        </span>

        {/* Plus that rotates to "×" when open */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: `1.5px solid ${
              isOpen ? '#F3672A' : 'rgba(0,29,61,0.25)'
            }`,
            background: isOpen ? '#F3672A' : 'transparent',
            color: isOpen ? 'white' : '#001D3D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease, border-color 0.2s ease',
            justifySelf: 'end',
          }}
        >
          <Plus size={16} strokeWidth={2.2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                paddingLeft: 82,
                paddingRight: 58,
                paddingBottom: 28,
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: 'rgba(0,29,61,0.7)',
                  margin: 0,
                  fontFamily: 'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                }}
              >
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQV2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section
      id="faq"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial watermark — italic ? */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 80,
          right: -30,
          fontSize: 460,
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        ?
      </div>

      <style>{`
        @media (max-width: 880px) {
          .fqv2-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .fqv2-side { position: static !important; top: auto !important; }
        }
      `}</style>
      <div
        className="fqv2-grid"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.15fr',
          gap: 72,
        }}
      >
        {/* ── LEFT — editorial header ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="fqv2-side"
          style={{ position: 'sticky', top: 96, alignSelf: 'flex-start' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 36,
                height: 1,
                background: '#F3672A',
                display: 'inline-block',
              }}
            />
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#F3672A',
              }}
            >
              Asked frequently
            </div>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 5.5vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2px',
              color: '#001D3D',
              margin: '0 0 22px',
              textTransform: 'uppercase',
            }}
          >
            Questions,
            <br />
            <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
              answered.
            </span>
          </h2>

          <p
            style={{
              fontSize: 17,
              color: 'rgba(0,29,61,0.7)',
              lineHeight: 1.65,
              margin: '0 0 28px',
              maxWidth: 380,
              borderLeft: '2px solid #F3672A',
              paddingLeft: 18,
              fontStyle: 'italic',
            }}
          >
            Insurance, financing, hours, kids, emergencies — what our
            front desk hears every day. Don't see yours? Call us — we
            answer in under 60 seconds.
          </p>

          <a
            href="tel:7024560005"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#001D3D',
              color: 'white',
              borderRadius: 999,
              padding: '14px 28px',
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#F3672A'
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 12px 24px rgba(243,103,42,0.3)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#001D3D'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            <Phone size={14} />
            Call (702) 456-0005
          </a>
        </motion.div>

        {/* ── RIGHT — accordion ─────────────────────────── */}
        <div
          style={{
            borderTop: '1px solid rgba(0,29,61,0.14)',
          }}
        >
          {FAQS.map((faq, i) => (
            <FaqRow
              key={faq.question}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQV2
