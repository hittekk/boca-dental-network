import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    initials: 'MG',
    name: 'Maria G.',
    location: 'Sahara office',
    quote:
      'Dr. Velasco took the time to explain my options. The whole staff hablan español — felt like home.',
    accent: '#F3672A',
  },
  {
    initials: 'JR',
    name: 'James R.',
    location: 'Eastern & Russell',
    quote:
      'Same-day emergency slot when my crown popped off. Honest pricing, no upsell. Boca patient for life.',
    accent: '#3B82F6',
  },
  {
    initials: 'SL',
    name: 'Sofia L.',
    location: 'Flamingo & Torrey',
    quote:
      'Started Invisalign 8 months ago and my smile is already transformed. Financing made it affordable.',
    accent: '#F3672A',
  },
  {
    initials: 'DT',
    name: 'David T.',
    location: 'Jones & Alta',
    quote:
      'Brought my whole family. Took our Aetna with no surprises. The hygienist was gentle and thorough.',
    accent: '#3B82F6',
  },
  {
    initials: 'AM',
    name: 'Ana M.',
    location: 'Boca Kids — Russell',
    quote:
      'My 4-year-old was terrified. The Boca Kids team turned it into a fun visit — she now ASKS to go back.',
    accent: '#F3672A',
  },
  {
    initials: 'RK',
    name: 'Robert K.',
    location: 'Eastern & Bonanza',
    quote:
      'Two implants quoted thousands less than the other place. Walked me through every step.',
    accent: '#3B82F6',
  },
]

export function TestimonialsV4() {
  return (
    <section
      id="testimonials"
      style={{
        background: '#FAFAFA',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.14) 0%, transparent 60%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 56,
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 720 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'white',
                border: '1px solid rgba(243,103,42,0.18)',
                borderRadius: 999,
                padding: '8px 16px',
                marginBottom: 24,
                boxShadow: '0 4px 12px rgba(243,103,42,0.06)',
              }}
            >
              <Star size={11} fill="#F3672A" style={{ color: '#F3672A' }} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                1,200+ Five-Star Reviews
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
              The patients
              <br />
              keep{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                coming back.
              </span>
            </h2>
          </motion.div>

          {/* Aggregate score chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              background: 'white',
              border: '1px solid rgba(10,10,15,0.06)',
              borderRadius: 22,
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              boxShadow: '0 12px 32px rgba(10,10,15,0.06)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 800,
                  background:
                    'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1.5px',
                  lineHeight: 0.9,
                }}
              >
                4.9
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill="#F3672A" style={{ color: '#F3672A' }} />
                ))}
              </div>
            </div>
            <div
              style={{
                width: 1,
                alignSelf: 'stretch',
                background: 'rgba(10,10,15,0.08)',
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#0A0A0F',
                  letterSpacing: '-0.3px',
                  lineHeight: 1,
                }}
              >
                Verified · Google
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(10,10,15,0.55)',
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                across 9 offices
              </div>
            </div>
          </motion.div>
        </div>

        {/* Review grid */}
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
              whileHover={{ y: -6 }}
              style={{
                background: 'white',
                border: '1px solid rgba(10,10,15,0.05)',
                borderRadius: 22,
                padding: '32px 30px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(10,10,15,0.04)',
                transition: 'box-shadow 0.25s ease',
                cursor: 'default',
              }}
            >
              {/* Color top accent bar */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: `linear-gradient(90deg, ${review.accent} 0%, ${review.accent}88 100%)`,
                }}
              />

              <Quote
                size={26}
                color={review.accent}
                style={{
                  marginBottom: 20,
                  marginTop: 8,
                  transform: 'rotate(180deg)',
                  opacity: 0.85,
                }}
              />

              <div
                style={{
                  fontSize: 15,
                  color: '#0A0A0F',
                  lineHeight: 1.65,
                  marginBottom: 26,
                  fontWeight: 500,
                }}
              >
                "{review.quote}"
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  paddingTop: 22,
                  borderTop: '1px solid rgba(10,10,15,0.06)',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${review.accent} 0%, ${
                      review.accent === '#F3672A' ? '#FF8A50' : '#60A5FA'
                    } 100%)`,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 0.4,
                    flexShrink: 0,
                    boxShadow: `0 6px 14px ${review.accent}45`,
                  }}
                >
                  {review.initials}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: '#0A0A0F',
                      letterSpacing: '-0.2px',
                      lineHeight: 1.2,
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(10,10,15,0.55)',
                      marginTop: 2,
                      fontWeight: 600,
                    }}
                  >
                    {review.location}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 1 }}>
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star
                      key={k}
                      size={11}
                      fill={review.accent}
                      style={{ color: review.accent }}
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

export default TestimonialsV4
