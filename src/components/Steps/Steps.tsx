import { motion } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Book Your Appointment',
    body: 'Call any Boca location or book online. Most locations offer same-day and next-day appointments for new patients.',
  },
  {
    number: '02',
    title: 'Complete Your Forms',
    body: 'Download and complete your new patient forms before your visit to save time. We accept most insurance plans.',
  },
  {
    number: '03',
    title: 'Your First Visit',
    body: 'Meet your dentist, get a full exam and X-rays, and discuss your treatment options — no pressure, no surprises.',
  },
  {
    number: '04',
    title: 'Your Treatment Plan',
    body: 'We build a personalized treatment plan around your needs and budget. Financing options available if needed.',
  },
]

export function Steps() {
  return (
    <section
      id="new-patients"
      style={{ background: '#F7F7FA', padding: '96px 32px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: '#F3672A',
            marginBottom: 10,
          }}>
            New Patients
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: '#162E7A',
            margin: '0 0 12px',
            letterSpacing: '-0.5px',
          }}>
            Getting Started Is Easy
          </h2>
          <p style={{
            fontSize: 15, color: '#64748B',
            maxWidth: 440, margin: '0 auto', lineHeight: 1.65,
          }}>
            From your first call to your first appointment —
            here is what to expect when you choose Boca Dental.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          position: 'relative',
        }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            top: 36,
            left: '12.5%',
            right: '12.5%',
            height: 2,
            background: 'linear-gradient(90deg, #F3672A, #162E7A)',
            zIndex: 0,
          }} />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 20px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Step number circle */}
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: i === 0 ? '#F3672A' : 'white',
                border: `2px solid ${i === 0 ? '#F3672A' : '#E2E8F0'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                boxShadow: i === 0
                  ? '0 8px 24px rgba(243,103,42,0.35)'
                  : '0 2px 12px rgba(0,0,0,0.06)',
                flexShrink: 0,
              }}>
                <span style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: i === 0 ? 'white' : '#162E7A',
                  letterSpacing: '-0.5px',
                }}>
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div style={{
                fontSize: 16,
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#162E7A',
                marginBottom: 10,
                letterSpacing: '-0.2px',
                lineHeight: 1.15,
              }}>
                {step.title}
              </div>
              <div style={{
                fontSize: 13,
                color: '#64748B',
                lineHeight: 1.65,
              }}>
                {step.body}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA below steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: 64 }}
        >
          <a
            href="tel:7024560005"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#F3672A',
              color: 'white',
              borderRadius: 8,
              padding: '14px 36px',
              fontSize: 15,
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
            Call to Book — (702) 456-0005
          </a>
          <div style={{
            marginTop: 12,
            fontSize: 12,
            color: '#94A3B8',
          }}>
            Or book online at any location page
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Steps
