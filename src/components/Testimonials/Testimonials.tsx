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
              What Las Vegas Patients Say About Boca Dental & Braces
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

        {/* Review source logos — multi-platform credibility per Treysyde S5 spec */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          style={{
            marginTop: 56,
            padding: '32px 0 0',
            borderTop: '1px solid #E2E8F0',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: '#94A3B8',
              textAlign: 'center',
              marginBottom: 22,
            }}
          >
            Verified on platforms our patients trust
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://www.google.com/search?q=Boca+Dental+and+Braces+Las+Vegas+reviews"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: 14,
                padding: '14px 22px',
                textDecoration: 'none',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 8px 20px rgba(0,0,0,0.08)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 1px 4px rgba(0,0,0,0.04)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Google G logomark */}
              <svg width="28" height="28" viewBox="0 0 48 48" aria-hidden>
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.94 11.94 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '-0.2px',
                    lineHeight: 1.1,
                  }}
                >
                  Google
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 4,
                    fontSize: 11,
                    color: '#64748B',
                  }}
                >
                  <span style={{ display: 'flex', gap: 1 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        fill="#F3672A"
                        style={{ color: '#F3672A' }}
                      />
                    ))}
                  </span>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>4.9</span>
                  <span>· 1,200+ reviews</span>
                </div>
              </div>
            </a>

            <a
              href="https://www.healthgrades.com/group-directory/dentist"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                background: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: 14,
                padding: '14px 22px',
                textDecoration: 'none',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 8px 20px rgba(0,0,0,0.08)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 1px 4px rgba(0,0,0,0.04)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Healthgrades brandmark */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                }}
              >
                H
              </div>
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '-0.2px',
                    lineHeight: 1.1,
                  }}
                >
                  Healthgrades
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 4,
                    fontSize: 11,
                    color: '#64748B',
                  }}
                >
                  <span style={{ display: 'flex', gap: 1 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        fill="#F3672A"
                        style={{ color: '#F3672A' }}
                      />
                    ))}
                  </span>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>4.8</span>
                  <span>· Patient verified</span>
                </div>
              </div>
            </a>

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
                borderRadius: 999,
                padding: '12px 24px',
                fontSize: 13,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                transition: 'all 0.2s ease',
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
              Read All Reviews →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
