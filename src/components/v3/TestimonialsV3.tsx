import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const REVIEWS = [
  {
    initials: 'MG',
    name: 'Maria G.',
    location: 'Sahara office',
    rating: 5,
    quote:
      'Dr. Velasco took the time to actually explain my options. The whole staff hablan español and it made the visit feel like home.',
  },
  {
    initials: 'JR',
    name: 'James R.',
    location: 'Eastern & Russell',
    rating: 5,
    quote:
      'Got a same-day emergency slot when my crown popped off. Honest pricing, no upsell. I am a Boca patient for life now.',
  },
  {
    initials: 'SL',
    name: 'Sofia L.',
    location: 'Flamingo & Torrey',
    rating: 5,
    quote:
      'Started Invisalign 8 months ago and my smile is already transformed. The financing made it actually affordable.',
  },
  {
    initials: 'DT',
    name: 'David T.',
    location: 'Jones & Alta',
    rating: 5,
    quote:
      'Brought my whole family. Took our Aetna with no surprises at checkout. The hygienist was gentle and thorough.',
  },
  {
    initials: 'AM',
    name: 'Ana M.',
    location: 'Boca Kids — Eastern & Russell',
    rating: 5,
    quote:
      'My 4-year-old was terrified. The Boca Kids team turned it into a fun visit — she now ASKS to go back. Forever grateful.',
  },
  {
    initials: 'RK',
    name: 'Robert K.',
    location: 'Eastern & Bonanza',
    rating: 5,
    quote:
      'Two implants quoted thousands less than the other place I checked. Dr. walked me through every step.',
  },
]

export function TestimonialsV3() {
  return (
    <section
      id="testimonials"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -60,
          left: '-15%',
          width: 700,
          height: 700,
          background:
            'radial-gradient(circle, rgba(243,103,42,0.12) 0%, transparent 60%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

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
            gridTemplateColumns: '1fr auto',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 64,
            flexWrap: 'wrap',
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
              [ 07 ] · From Real Patients
            </div>
            <h2
              style={{
                fontSize: 'clamp(44px, 5.6vw, 76px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2.2px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
                maxWidth: 760,
              }}
            >
              Two thousand
              <br />
              <span style={{ color: '#F3672A' }}>five-star</span> reviews
              <br />
              and counting.
            </h2>
          </div>

          {/* Aggregate score block */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 18,
              padding: '24px 32px',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 800,
                  color: '#F3672A',
                  letterSpacing: '-1.5px',
                  lineHeight: 0.9,
                }}
              >
                4.9
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 8 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill="#F3672A"
                    style={{ color: '#F3672A' }}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                width: 1,
                alignSelf: 'stretch',
                background: 'rgba(255,255,255,0.1)',
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.3px',
                  lineHeight: 1,
                }}
              >
                1,200+
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginTop: 4,
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                Verified · Google
              </div>
            </div>
          </div>
        </motion.div>

        {/* Magazine card grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {REVIEWS.map((review, i) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 18,
                padding: '32px 30px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                position: 'relative',
                transition: 'background 0.25s ease, border-color 0.25s ease',
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <Quote
                size={22}
                color="#F3672A"
                style={{
                  marginBottom: 18,
                  transform: 'rotate(180deg)',
                  opacity: 0.85,
                }}
              />

              <div
                style={{
                  fontSize: 16,
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: 28,
                  letterSpacing: '-0.1px',
                }}
              >
                {review.quote}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  paddingTop: 22,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, #F3672A 0%, #d95a22 100%)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 0.4,
                    flexShrink: 0,
                  }}
                >
                  {review.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: 'white',
                      letterSpacing: '-0.1px',
                      lineHeight: 1.2,
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,0.45)',
                      marginTop: 3,
                      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    {review.location}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 1 }}>
                  {Array.from({ length: review.rating }).map((_, k) => (
                    <Star
                      key={k}
                      size={11}
                      fill="#F3672A"
                      style={{ color: '#F3672A' }}
                    />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsV3
