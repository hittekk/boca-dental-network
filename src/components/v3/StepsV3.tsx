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
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image — office at night, heavily faded for atmosphere */}
      <img
        aria-hidden
        src="/boca-modern-office.webp"
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.18,
          pointerEvents: 'none',
          userSelect: 'none',
          filter: 'saturate(0.7) brightness(0.6)',
        }}
      />

      {/* Dark gradient overlay — readability + cinematic mood */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.6) 40%, rgba(10,10,15,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          pointerEvents: 'none',
        }}
      />

      {/* Giant 04 watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 20,
          right: 40,
          fontSize: 'clamp(180px, 22vw, 360px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.04)',
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
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="steps-v3-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 64,
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              .steps-v3-header { grid-template-columns: 1fr !important; gap: 24px !important; align-items: flex-start !important; margin-bottom: 40px !important; }
              .steps-v3-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 560px) {
              .steps-v3-grid { grid-template-columns: 1fr !important; }
              .steps-v3-line { display: none !important; }
            }
          `}</style>
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
                fontSize: 'clamp(28px, 4.6vw, 62px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-1.2px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Four steps from{' '}
              <span style={{ color: '#F3672A' }}>"hello"</span>
              <br />
              to healthier teeth.
            </h2>
          </div>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.7)',
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
          className="steps-v3-grid"
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
            className="steps-v3-line"
            style={{
              position: 'absolute',
              top: 60,
              left: '12.5%',
              right: '12.5%',
              height: 1,
              background:
                'linear-gradient(90deg, rgba(243,103,42,0.6) 0%, rgba(255,255,255,0.15) 100%)',
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
                background: 'rgba(10,10,15,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: 16,
                padding: '28px 24px 26px',
                position: 'relative',
                zIndex: 1,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              whileHover={{
                y: -6,
                boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
              }}
            >
              {/* Number badge with eta */}
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
                    background: i === 0 ? '#F3672A' : 'rgba(255,255,255,0.05)',
                    border:
                      i === 0
                        ? 'none'
                        : '1.5px solid rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    color: 'white',
                    fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                    boxShadow:
                      i === 0
                        ? '0 8px 20px rgba(243,103,42,0.4)'
                        : 'none',
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
                    background: 'rgba(243,103,42,0.12)',
                    border: '1px solid rgba(243,103,42,0.3)',
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
                  color: 'rgba(255,255,255,0.45)',
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
                  color: 'white',
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
                  color: 'rgba(255,255,255,0.6)',
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
