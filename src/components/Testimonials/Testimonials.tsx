import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { GoogleG } from '../shared/icons/GoogleG'

// 4 cards covering: (1) general/family/new-patient · (2) ortho-cosmetic ·
// (3) pediatric/family · (4) location-specific · per Treysyde spec.
const REVIEWS = [
  {
    initials: 'MG',
    name: 'Maria G.',
    location: 'Sahara Office',
    rating: 5,
    target: 'General · New patient experience',
    quote:
      'The whole team at Boca Sahara made me feel so welcome. Hablan español perfecto and they explained every option with my insurance. Best dental experience I have ever had in Las Vegas.',
  },
  {
    initials: 'SL',
    name: 'Sofia L.',
    location: 'Flamingo Office',
    rating: 5,
    target: 'Orthodontic · Cosmetic',
    quote:
      'Started Invisalign here 8 months ago and my smile is already transformed. The financing through Sunbit made it actually affordable. Front desk is amazing and patient with all my questions.',
  },
  {
    initials: 'AM',
    name: 'Ana M.',
    location: 'Boca Kids — Russell',
    rating: 5,
    target: 'Pediatric · Family',
    quote:
      'My 4-year-old was terrified of the dentist. The Boca Kids team turned it into a fun visit — she now ASKS to go back. They accept Medicaid which made it possible for us. Forever grateful.',
  },
  {
    initials: 'DT',
    name: 'David T.',
    location: 'Jones & Alta Office',
    rating: 5,
    target: 'Location-specific · Family',
    quote:
      'Brought my whole family to the Jones location for cleanings. Took our Aetna insurance, no surprises at checkout. The hygienist was gentle and thorough. Highly recommend if you are looking for a real family dentist on the west side.',
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
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 10,
            fontWeight: 700,
            color: '#94A3B8',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
          }}
        >
          <GoogleG size={11} />
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
        {/* Centered header — H2 + intro (Treysyde Section 5) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            maxWidth: 720,
            margin: '0 auto 24px',
          }}
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
        </motion.div>

        {/* Aggregate Rating Callout — single line, above reviews per Treysyde spec */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
            marginBottom: 48,
            fontSize: 15,
            color: '#0F172A',
          }}
        >
          <span
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                fill="#F3672A"
                style={{ color: '#F3672A' }}
              />
            ))}
            <strong
              style={{
                fontWeight: 800,
                color: '#162E7A',
                marginLeft: 4,
              }}
            >
              4.9 out of 5 stars
            </strong>
          </span>
          <span style={{ color: '#94A3B8' }}>·</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <GoogleG size={15} />
            <span>1,200+ Google reviews across all 9 Las Vegas locations</span>
          </span>
          <span style={{ color: '#94A3B8' }}>·</span>
          <a
            href="https://www.google.com/search?q=Boca+Dental+and+Braces+Las+Vegas+reviews"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#F3672A',
              fontWeight: 800,
              textDecoration: 'none',
              borderBottom: '1.5px solid #F3672A',
              paddingBottom: 1,
            }}
          >
            Read all reviews →
          </a>
        </motion.div>

        {/* Reviews grid — 4 cards per Treysyde spec, auto-wraps on mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
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
              <GoogleG size={28} />
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
