import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

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
      "We recommend a child's first dental visit by age 1, or within 6 months of their first tooth. Boca Kids is built specifically for pediatric care from toddler years through teen years, including braces.",
  },
  {
    cat: 'Hours',
    question: 'When are you open?',
    answer:
      "Most Boca locations are open Monday–Friday 9am–7pm and Saturday 9am–7pm — a few offices have shorter Saturday hours. Closed Sundays. Visit any location page for that office's exact schedule.",
  },
]

const ALL_TAG = 'All'

export function FAQV3() {
  const [activeCat, setActiveCat] = useState<string>(ALL_TAG)

  const categories = useMemo(() => {
    const uniq = Array.from(new Set(FAQS.map((f) => f.cat)))
    return [ALL_TAG, ...uniq]
  }, [])

  const filtered = useMemo(() => {
    if (activeCat === ALL_TAG) return FAQS
    return FAQS.filter((f) => f.cat === activeCat)
  }, [activeCat])

  return (
    <section
      id="faq"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'clip',
      }}
    >
      {/* Grid pattern */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          pointerEvents: 'none',
        }}
      />

      {/* Big ? watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          right: 40,
          fontSize: 'clamp(180px, 22vw, 360px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.05)',
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
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Header — compact 2-col asymmetric ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 36,
            paddingBottom: 22,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 22,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 08 ] · Knowledge Base
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 4.6vw, 62px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-1.8px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>Filter by topic.</span>
              <br />
              <span style={{ whiteSpace: 'nowrap', color: '#F3672A' }}>
                Find an answer.
              </span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 460,
            }}
          >
            Pick a category — or scan all eight. Yours not here? Just call us
            at{' '}
            <a
              href="tel:7024560005"
              style={{
                color: '#F3672A',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              (702) 456-0005
            </a>{' '}
            and someone will pick up.
          </p>
        </motion.div>

        {/* ── Category filter pills ──────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            marginBottom: 32,
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              marginRight: 4,
            }}
          >
            / FILTER:
          </span>
          {categories.map((cat) => {
            const active = activeCat === cat
            const count =
              cat === ALL_TAG
                ? FAQS.length
                : FAQS.filter((f) => f.cat === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  background: active ? '#F3672A' : 'rgba(255,255,255,0.04)',
                  border: active
                    ? '1px solid #F3672A'
                    : '1px solid rgba(255,255,255,0.1)',
                  color: active ? 'white' : 'rgba(255,255,255,0.75)',
                  borderRadius: 999,
                  padding: '7px 14px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    ;(e.currentTarget as HTMLElement).style.borderColor =
                      'rgba(243,103,42,0.4)'
                    ;(e.currentTarget as HTMLElement).style.color = 'white'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    ;(e.currentTarget as HTMLElement).style.borderColor =
                      'rgba(255,255,255,0.1)'
                    ;(e.currentTarget as HTMLElement).style.color =
                      'rgba(255,255,255,0.75)'
                  }
                }}
              >
                {cat}
                <span
                  style={{
                    fontSize: 10,
                    color: active
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(255,255,255,0.4)',
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* ── Result counter ───────────────────────────── */}
        <div
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            marginBottom: 18,
          }}
        >
          / SHOWING {String(filtered.length).padStart(2, '0')} OF{' '}
          {String(FAQS.length).padStart(2, '0')}
          {activeCat !== ALL_TAG && ` · TOPIC: ${activeCat}`}
        </div>

        {/* ── FAQ knowledge-base grid (always expanded) ─ */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 14,
          }}
        >
          {filtered.map((faq, i) => (
            <motion.article
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14,
                padding: '24px 26px 22px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(243,103,42,0.35)'
                el.style.background = 'rgba(243,103,42,0.04)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.08)'
                el.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              {/* Top row — index + category */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  / {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    color: '#F3672A',
                    background: 'rgba(243,103,42,0.12)',
                    border: '1px solid rgba(243,103,42,0.3)',
                    borderRadius: 999,
                    padding: '3px 9px',
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  {faq.cat}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.2px',
                  lineHeight: 1.3,
                  margin: '0 0 12px',
                }}
              >
                {faq.question}
              </h3>

              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.65)',
                  margin: 0,
                }}
              >
                {faq.answer}
              </p>
            </motion.article>
          ))}
        </div>

        {/* ── Footer call-to-action strip ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginTop: 40,
            padding: '24px 28px',
            background:
              'linear-gradient(135deg, rgba(243,103,42,0.12) 0%, rgba(243,103,42,0.02) 100%)',
            border: '1px solid rgba(243,103,42,0.28)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 18,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 6,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              / Still curious?
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.2px',
              }}
            >
              Call us — someone picks up in under 60 seconds.
            </div>
          </div>
          <a
            href="tel:7024560005"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#F3672A',
              color: 'white',
              borderRadius: 8,
              padding: '14px 26px',
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              boxShadow: '0 12px 32px rgba(243,103,42,0.32)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#d95a22'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#F3672A'
              el.style.transform = 'translateY(0)'
            }}
          >
            (702) 456-0005
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQV3
