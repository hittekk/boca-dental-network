import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    initials: 'MG',
    name: 'Maria G.',
    location: 'Sahara Location',
    rating: 5,
    quote:
      'The whole team at Boca Sahara made me feel so welcome. Hablan español perfecto and they explained every option with my insurance. Best dental experience I have ever had in Las Vegas.',
  },
  {
    initials: 'JR',
    name: 'James R.',
    location: 'Russell Location',
    rating: 5,
    quote:
      'Got a same-day emergency appointment when my crown popped off. Dr. and his team had me fixed up in under an hour. Honest pricing, no upsell. I am a Boca patient for life.',
  },
  {
    initials: 'SL',
    name: 'Sofia L.',
    location: 'Flamingo Location',
    rating: 5,
    quote:
      'Started Invisalign here 8 months ago and my smile is already transformed. The financing through Sunbit made it actually affordable. Front desk is amazing and patient with all my questions.',
  },
  {
    initials: 'DT',
    name: 'David T.',
    location: 'Jones Location',
    rating: 5,
    quote:
      'Brought my whole family here for cleanings. Took our Aetna insurance, no surprises at checkout. The hygienist was gentle and thorough. Highly recommend if you are looking for a real family dentist.',
  },
  {
    initials: 'AM',
    name: 'Ana M.',
    location: 'Boca Kids — Henderson',
    rating: 5,
    quote:
      'My 4-year-old was terrified of the dentist. The Boca Kids team turned it into a fun visit — she now ASKS to go back. They accept Medicaid which made it possible for us. Forever grateful.',
  },
  {
    initials: 'RK',
    name: 'Robert K.',
    location: 'Bonanza Location',
    rating: 5,
    quote:
      'Needed two implants and the price quoted at Boca was thousands less than the other place I checked. Dr. walked me through every step and the in-house payment plan made it manageable.',
  },
]

function ReviewCard({
  review,
  index,
}: {
  review: (typeof REVIEWS)[0]
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: 16,
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star
            key={i}
            size={15}
            fill="#F3672A"
            style={{ color: '#F3672A' }}
          />
        ))}
      </div>

      <div
        style={{
          fontSize: 14,
          color: '#0F172A',
          lineHeight: 1.7,
          marginBottom: 22,
          flex: 1,
        }}
      >
        “{review.quote}”
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingTop: 16,
          borderTop: '1px solid #E2E8F0',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#162E7A',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 0.3,
            flexShrink: 0,
          }}
        >
          {review.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#162E7A',
              lineHeight: 1.2,
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: '#94A3B8',
              marginTop: 2,
            }}
          >
            {review.location}
          </div>
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}
        >
          Google
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{ background: '#F7F7FA', padding: '96px 32px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 32,
            marginBottom: 48,
            flexWrap: 'wrap',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: 540 }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 10,
              }}
            >
              Patient Reviews
            </div>
            <h2
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#162E7A',
                margin: '0 0 12px',
                letterSpacing: '-0.5px',
                lineHeight: 1.05,
              }}
            >
              What Our Patients Say
            </h2>
            <p
              style={{
                fontSize: 15,
                color: '#64748B',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Real stories from real Las Vegas families across all 9
              Boca locations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: 16,
              padding: '20px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: '#F3672A',
                  lineHeight: 1,
                }}
              >
                4.9
              </div>
              <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
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
                background: '#E2E8F0',
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#162E7A',
                  lineHeight: 1,
                  letterSpacing: '-0.3px',
                }}
              >
                1,200+
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginTop: 4,
                }}
              >
                Verified Reviews
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <a
            href="https://www.google.com/search?q=Boca+Dental+and+Braces+Las+Vegas+reviews"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: '#162E7A',
              border: '2px solid #162E7A',
              borderRadius: 8,
              padding: '13px 32px',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#162E7A'
              ;(e.currentTarget as HTMLElement).style.color = 'white'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLElement).style.color = '#162E7A'
            }}
          >
            Leave Us a Review
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
