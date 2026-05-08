import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    label: 'Reach out',
    title: 'Tell us what you need.',
    body: 'Online form, phone, or walk-in. Pick a Boca office or let us match you to one near you. Replies in under one business hour.',
    eta: '< 1 hr',
  },
  {
    num: '02',
    label: 'Plan it',
    title: 'We verify and quote.',
    body: 'We confirm your insurance benefits and prepare a transparent treatment plan with cost breakdown — before you sit in the chair.',
    eta: 'Same day',
  },
  {
    num: '03',
    label: 'See us',
    title: 'First visit, no surprises.',
    body: 'Comprehensive exam, 3D imaging where needed, time to discuss everything. New patient or returning, same standard of care.',
    eta: '60–90 min',
  },
  {
    num: '04',
    label: 'Take care of it',
    title: 'Treatment on your terms.',
    body: 'In-house financing, CareCredit, or pay-as-you-go. Same chair, same dentist, every visit until the work is done.',
    eta: 'Your pace',
  },
]

export function StepsV3() {
  return (
    <section
      id="new-patients"
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
          top: 0,
          right: 40,
          fontSize: 'clamp(180px, 22vw, 360px)',
          fontWeight: 800,
          color: 'rgba(10,10,15,0.04)',
          lineHeight: 0.85,
          letterSpacing: '-12px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        04
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
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
            marginBottom: 64,
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
                marginBottom: 24,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 05 ] · How It Works
            </div>
            <h2
              style={{
                fontSize: 'clamp(44px, 5.6vw, 76px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2.2px',
                color: '#0A0A0F',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Four steps from
              <br />
              <span style={{ color: '#F3672A' }}>"hello"</span> to
              <br />
              healthier teeth.
            </h2>
          </div>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(10,10,15,0.7)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 460,
            }}
          >
            No phone trees, no scripted questionnaires, no high-pressure
            upsells. Real people, transparent process, on a timeline you
            actually control.
          </p>
        </motion.div>

        {/* Step cards in a connected row with mono ETAs */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            position: 'relative',
          }}
        >
          {/* Connecting line */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 60,
              left: '12.5%',
              right: '12.5%',
              height: 1,
              background:
                'linear-gradient(90deg, rgba(243,103,42,0.4) 0%, rgba(10,10,15,0.15) 100%)',
              zIndex: 0,
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                background: 'white',
                border: '1px solid rgba(10,10,15,0.08)',
                borderRadius: 16,
                padding: '28px 24px 26px',
                position: 'relative',
                zIndex: 1,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              whileHover={{
                y: -6,
                boxShadow: '0 16px 40px rgba(10,10,15,0.08)',
              }}
            >
              {/* Number badge with eta below */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: i === 0 ? '#F3672A' : 'white',
                    border: i === 0 ? 'none' : '1.5px solid rgba(10,10,15,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    color: i === 0 ? 'white' : '#0A0A0F',
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    boxShadow:
                      i === 0
                        ? '0 8px 20px rgba(243,103,42,0.32)'
                        : '0 1px 3px rgba(10,10,15,0.06)',
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: '#F3672A',
                    background: 'rgba(243,103,42,0.08)',
                    border: '1px solid rgba(243,103,42,0.2)',
                    borderRadius: 999,
                    padding: '4px 10px',
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  {step.eta}
                </div>
              </div>

              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,15,0.4)',
                  marginBottom: 10,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / {step.label}
              </div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#0A0A0F',
                  letterSpacing: '-0.3px',
                  lineHeight: 1.15,
                  marginBottom: 12,
                }}
              >
                {step.title}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(10,10,15,0.65)',
                  lineHeight: 1.6,
                }}
              >
                {step.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StepsV3
