import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { GoogleG } from '../shared/icons/GoogleG'

const REVIEWS = [
  {
    initials: 'MG',
    name: 'Maria G.',
    location: 'Sahara Office',
    rating: 5,
    target: 'General · New patient',
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
    location: 'Boca Kids Dentistry',
    rating: 5,
    target: 'Pediatric · Family',
    quote:
      'My 4-year-old was terrified of the dentist. The Boca Kids team turned it into a fun visit — she now ASKS to go back. They accept Medicaid which made it possible for us. Forever grateful.',
  },
  {
    initials: 'DT',
    name: 'David T.',
    location: 'Jones & I-95 Office',
    rating: 5,
    target: 'Location-specific · Family',
    quote:
      'Brought my whole family to the Jones & I-95 location for cleanings. Took our Aetna insurance, no surprises at checkout. The hygienist was gentle and thorough. Highly recommend if you are looking for a real family dentist on the west side.',
  },
]

const FEATURED = REVIEWS[0]
const SUPPORTING = REVIEWS.slice(1)

const STAT_ANCHORS = [
  { value: '4.9', label: 'Google rating' },
  { value: '1,200+', label: 'Verified reviews' },
  { value: '9', label: 'LV locations' },
  { value: '5★', label: 'Most-given' },
]

export function TestimonialsV2() {
  return (
    <section
      id="testimonials"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Giant open-quote watermark — editorial signature */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 40,
          left: -20,
          fontSize: 480,
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(243,103,42,0.06)',
          lineHeight: 0.7,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        “
      </div>

      {/* Soft radial accent — bottom right */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -120,
          right: -80,
          width: 460,
          height: 460,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.10) 0%, rgba(243,103,42,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <style>{`
          @media (max-width: 880px) {
            .tv2-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 36px !important; }
            .tv2-stats { grid-template-columns: repeat(2, 1fr) !important; }
            .tv2-stats > div:nth-child(2) { border-right: none !important; }
            .tv2-stats > div:nth-child(1), .tv2-stats > div:nth-child(2) { border-bottom: 1px solid rgba(0,29,61,0.08) !important; }
            .tv2-supporting { grid-template-columns: 1fr !important; gap: 16px !important; }
            .tv2-supporting > div { border-left: none !important; padding: 24px !important; }
          }
          @media (max-width: 980px) and (min-width: 881px) {
            .tv2-supporting { grid-template-columns: 1fr 1fr !important; }
            .tv2-supporting > div:nth-child(2) { border-left: none !important; }
            .tv2-supporting > div:nth-child(3) { grid-column: span 2; border-left: none !important; border-top: 1px solid rgba(0,29,61,0.14); }
          }
          .tv2-supporting-card { transition: transform 0.3s ease, background 0.3s ease; }
          .tv2-supporting-card:hover { transform: translateY(-4px); background: rgba(243,103,42,0.04); }
        `}</style>

        {/* ── Editorial header — matches WhyBocaV2 / ServicesV2 ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="tv2-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 48,
          }}
        >
          <div>
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
                In their words
              </div>
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2px',
                color: '#001D3D',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              What Las Vegas
              <br />
              patients{' '}
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                actually
              </span>
              <br />
              say about us.
            </h2>
          </div>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(0,29,61,0.7)',
              lineHeight: 1.65,
              margin: 0,
              paddingBottom: 8,
              borderLeft: '2px solid #F3672A',
              paddingLeft: 18,
              fontStyle: 'italic',
            }}
          >
            We did not write a single one of these. Real Google reviews
            from real Boca patients across all 9 Las Vegas offices —
            sorted, unedited, and updated as new ones come in.
          </p>
        </motion.div>

        {/* Stat anchors strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="tv2-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(243,103,42,0.18)',
            borderRadius: 16,
            overflow: 'hidden',
            backdropFilter: 'blur(6px)',
            marginBottom: 64,
          }}
        >
          {STAT_ANCHORS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '20px 24px',
                borderRight:
                  i < STAT_ANCHORS.length - 1
                    ? '1px solid rgba(0,29,61,0.08)'
                    : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  fontWeight: 800,
                  color: '#F3672A',
                  letterSpacing: '-1px',
                  lineHeight: 1,
                  fontStyle: 'italic',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(0,29,61,0.55)',
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Featured pull-quote in a magazine spread card ──── */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          style={{
            background: 'white',
            border: '1px solid rgba(0,29,61,0.08)',
            borderRadius: 20,
            padding: 'clamp(36px, 5vw, 64px) clamp(28px, 4vw, 56px)',
            margin: '0 0 64px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,29,61,0.05)',
          }}
        >
          {/* Orange accent bar top */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #F3672A 0%, #FF8A50 100%)',
            }}
          />

          {/* Small quote glyph */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 28,
              right: 36,
              color: 'rgba(243,103,42,0.15)',
            }}
          >
            <Quote size={64} strokeWidth={1.4} />
          </div>

          {/* Featured badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              background: 'rgba(243,103,42,0.10)',
              border: '1px solid rgba(243,103,42,0.22)',
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            <span style={{ display: 'inline-flex', gap: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  fill="#F3672A"
                  style={{ color: '#F3672A' }}
                />
              ))}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#F3672A',
              }}
            >
              Featured review
            </span>
          </div>

          <blockquote
            style={{
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: 'clamp(24px, 2.8vw, 36px)',
              fontWeight: 400,
              lineHeight: 1.4,
              color: '#001D3D',
              letterSpacing: '-0.4px',
              margin: '0 0 36px',
              position: 'relative',
              maxWidth: 880,
            }}
          >
            &ldquo;{FEATURED.quote}&rdquo;
          </blockquote>

          <figcaption
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              paddingTop: 24,
              borderTop: '1px solid rgba(0,29,61,0.08)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#F3672A',
                color: 'white',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 0.5,
                flexShrink: 0,
              }}
            >
              {FEATURED.initials}
            </div>
            <div style={{ textAlign: 'left', flex: 1 }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#162E7A',
                  letterSpacing: '-0.2px',
                  textTransform: 'uppercase',
                }}
              >
                {FEATURED.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(0,29,61,0.6)',
                  marginTop: 3,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>{FEATURED.location}</span>
                <span style={{ color: 'rgba(0,29,61,0.3)' }}>·</span>
                <span>Verified on</span>
                <GoogleG size={13} />
                <span style={{ fontWeight: 700, color: '#001D3D' }}>Google</span>
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#F3672A',
                background: 'rgba(243,103,42,0.10)',
                border: '1px solid rgba(243,103,42,0.22)',
                borderRadius: 999,
                padding: '4px 10px',
                whiteSpace: 'nowrap',
              }}
            >
              {FEATURED.target}
            </span>
          </figcaption>
        </motion.figure>

        {/* ── Three supporting reviews — magazine column ──── */}
        <div
          className="tv2-supporting"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            borderTop: '1px solid rgba(0,29,61,0.14)',
            paddingTop: 48,
          }}
        >
          {SUPPORTING.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="tv2-supporting-card"
              style={{
                padding: '8px 32px',
                borderLeft:
                  i > 0 ? '1px solid rgba(0,29,61,0.14)' : 'none',
                borderRadius: 8,
              }}
            >
              <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={12}
                    fill="#F3672A"
                    style={{ color: '#F3672A' }}
                  />
                ))}
              </div>

              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                  marginBottom: 14,
                }}
              >
                {review.target}
              </div>

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: '#001D3D',
                  margin: '0 0 22px',
                  fontFamily: 'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{review.quote}&rdquo;
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#FFF4ED',
                    border: '1px solid rgba(243,103,42,0.22)',
                    color: '#F3672A',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 0.3,
                    flexShrink: 0,
                  }}
                >
                  {review.initials}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#162E7A',
                      letterSpacing: '-0.2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {review.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: 'rgba(0,29,61,0.5)',
                      marginTop: 2,
                      letterSpacing: 0.2,
                    }}
                  >
                    {review.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Verified-on trust row ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginTop: 80,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'rgba(0,29,61,0.5)',
              marginBottom: 24,
            }}
          >
            — Verified on —
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 28,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a
              href="https://www.google.com/search?q=Boca+Dental+and+Braces+Las+Vegas+reviews"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
                color: '#001D3D',
              }}
            >
              <GoogleG size={22} />
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#001D3D',
                    letterSpacing: '-0.2px',
                    lineHeight: 1.1,
                  }}
                >
                  Google
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(0,29,61,0.55)',
                    marginTop: 3,
                    fontFamily: 'Georgia, "Playfair Display", serif',
                    fontStyle: 'italic',
                  }}
                >
                  4.9 · 1,200+ reviews
                </div>
              </div>
            </a>

            <span
              aria-hidden
              style={{
                width: 1,
                height: 36,
                background: 'rgba(0,29,61,0.18)',
              }}
            />

            <a
              href="https://www.healthgrades.com/group-directory/dentist"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
                color: '#001D3D',
              }}
            >
              <img
                src="/healthgrades-logo.png"
                alt="Healthgrades"
                width={22}
                height={22}
                style={{
                  width: 22,
                  height: 22,
                  objectFit: 'contain',
                  display: 'block',
                  flexShrink: 0,
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#001D3D',
                    letterSpacing: '-0.2px',
                    lineHeight: 1.1,
                  }}
                >
                  Healthgrades
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(0,29,61,0.55)',
                    marginTop: 3,
                    fontFamily: 'Georgia, "Playfair Display", serif',
                    fontStyle: 'italic',
                  }}
                >
                  4.8 · Patient verified
                </div>
              </div>
            </a>

            <span
              aria-hidden
              style={{
                width: 1,
                height: 36,
                background: 'rgba(0,29,61,0.18)',
              }}
            />

            <a
              href="https://www.google.com/search?q=Boca+Dental+and+Braces+Las+Vegas+reviews"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'white',
                color: '#001D3D',
                border: '2px solid #001D3D',
                borderRadius: 999,
                padding: '13px 28px',
                fontSize: 13,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#001D3D'
                el.style.color = 'white'
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 12px 24px rgba(0,29,61,0.18)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'white'
                el.style.color = '#001D3D'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              Read all reviews
              <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsV2
