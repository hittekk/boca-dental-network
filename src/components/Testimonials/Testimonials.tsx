import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { GoogleG } from '../shared/icons/GoogleG'
import { useLang, t } from '../../lib/lang'
import { useSiteData } from '../../lib/site-data'
import {
  reviewAggregate,
  allReviews,
  googleReviewsUrl,
  initialsOf,
  truncateReview,
} from '../../lib/reviews'

// Reviews are data-driven from the per-clinic `reviews[]` / `rating` /
// `review_count` / `gbp_id` fields, refreshed from Google at build time by
// scripts/fetch-google-reviews.mjs. Nothing here is hardcoded — no-fabrication
// rule. Until real reviews exist the section renders the aggregate (real GMB
// numbers) plus an honest empty state.

type Review = ReturnType<typeof allReviews>[number]

function ReviewCard({ review, index }: { review: Review; index: number }) {
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
        {Array.from({ length: Math.min(5, Math.max(1, Math.round(review.rating))) }).map((_, i) => (
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
        “{truncateReview(review.body)}”
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
          {initialsOf(review.author)}
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
            {review.author}
          </div>
          <div
            style={{
              fontSize: 11,
              color: '#94A3B8',
              marginTop: 2,
            }}
          >
            {review.clinic}
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
  const lang = useLang()
  // Live Supabase locations (real Google data pulled at build time).
  const { locations } = useSiteData()
  const agg = reviewAggregate(locations)
  const reviews = allReviews(locations).slice(0, 4)
  const googleUrl = googleReviewsUrl(locations)

  return (
    <section
      id="testimonials"
      style={{ background: '#F7F7FA', padding: '96px 32px' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
            {t(lang, 'Patient Reviews', 'Reseñas de Pacientes')}
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
            {t(lang, 'What Las Vegas Patients Say About Boca Dental & Braces', 'Lo que Dicen los Pacientes de Las Vegas sobre Boca Dental & Braces')}
          </h2>
        </motion.div>

        {/* Aggregate Rating Callout — single line, above reviews per Treysyde
            spec. Real weighted numbers from the per-clinic Google data; only
            rendered when real data exists. */}
        {agg && (
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
                {t(lang, `${agg.rating} out of 5 stars`, `${agg.rating} de 5 estrellas`)}
              </strong>
            </span>
            <span style={{ color: '#94A3B8' }}>·</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <GoogleG size={15} />
              <span>
                {t(
                  lang,
                  `${agg.count.toLocaleString('en-US')}+ Google reviews across all ${locations.length} Las Vegas locations`,
                  `Más de ${agg.count.toLocaleString('en-US')} reseñas de Google en las ${locations.length} clínicas`,
                )}
              </span>
            </span>
            {googleUrl && (
              <>
                <span style={{ color: '#94A3B8' }}>·</span>
                <a
                  href={googleUrl}
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
                  {t(lang, 'Read all reviews →', 'Ver todas las reseñas →')}
                </a>
              </>
            )}
          </motion.div>
        )}

        {/* Reviews grid — real Google reviews (4 cards per Treysyde spec) OR
            an honest empty state until the first pull lands. */}
        {reviews.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {reviews.map((review, i) => (
              <ReviewCard key={`${review.author}-${i}`} review={review} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: 16,
              padding: '40px 32px',
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ display: 'inline-flex', gap: 3, marginBottom: 14 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="#F3672A" style={{ color: '#F3672A' }} />
              ))}
            </div>
            <p style={{ fontSize: 15, color: '#0F172A', lineHeight: 1.7, margin: '0 0 6px', fontWeight: 700 }}>
              {t(lang, 'Real reviews from real patients.', 'Reseñas reales de pacientes reales.')}
            </p>
            <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, margin: 0 }}>
              {t(
                lang,
                'Verified Google reviews for our Las Vegas clinics will appear here as patients share them.',
                'Las reseñas verificadas de Google de nuestras clínicas aparecerán aquí a medida que los pacientes las compartan.',
              )}
            </p>
          </motion.div>
        )}

        {/* Review source — Google trust card + read-all CTA. Only real numbers;
            "Reviews from Google" attribution required when review content shows. */}
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
            {t(lang, 'Reviews from Google', 'Reseñas de Google')}
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
            {agg && googleUrl && (
              <a
                href={googleUrl}
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
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{agg.rating}</span>
                    <span>· {agg.count.toLocaleString('en-US')}+ {t(lang, 'reviews', 'reseñas')}</span>
                  </div>
                </div>
              </a>
            )}

            <a
              href="/patient-resources/reviews/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'white',
                color: '#162E7A',
                border: '2px solid #162E7A',
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
                ;(e.currentTarget as HTMLElement).style.background = '#162E7A'
                ;(e.currentTarget as HTMLElement).style.color = 'white'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  '0 12px 24px rgba(22,46,122,0.18)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = 'white'
                ;(e.currentTarget as HTMLElement).style.color = '#162E7A'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              {t(lang, 'Read All Reviews', 'Ver Todas las Reseñas')}
              <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
