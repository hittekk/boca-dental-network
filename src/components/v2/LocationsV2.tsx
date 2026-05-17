import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowUpRight, Star } from 'lucide-react'
import type { Location } from '../../types'
import { useSiteData } from '../../lib/site-data'

function LocationCard({
  location,
  index,
}: {
  location: Location
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const numeral = String(index + 1).padStart(2, '0')

  return (
    <motion.a
      href={`/clinics/${location.slug}/`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 18,
        border: `1px solid ${
          hovered ? 'rgba(243,103,42,0.4)' : 'rgba(0,29,61,0.08)'
        }`,
        padding: '32px 28px 24px',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        transition: 'all 0.25s ease',
        boxShadow: hovered
          ? '0 22px 50px rgba(0,29,61,0.10)'
          : '0 2px 8px rgba(0,29,61,0.03)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      {/* Top orange gradient accent bar */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 3,
          width: hovered ? '100%' : 48,
          background: 'linear-gradient(90deg, #F3672A 0%, #FF8A50 100%)',
          transition: 'width 0.4s ease',
        }}
      />

      {/* Big sans numeral — faint by default, solid on hover */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 18,
          right: 18,
          fontSize: 64,
          fontFamily: 'inherit',
          fontWeight: 800,
          color: hovered ? '#F3672A' : 'rgba(243,103,42,0.18)',
          lineHeight: 0.9,
          letterSpacing: '-2px',
          fontVariantNumeric: 'tabular-nums',
          pointerEvents: 'none',
          userSelect: 'none',
          transition: 'all 0.25s ease',
          transform: hovered ? 'translateX(-2px) scale(1.04)' : 'translateX(0) scale(1)',
        }}
      >
        {numeral}
      </div>

      {/* Kids badge */}
      {location.kids && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            background: '#F3672A',
            color: 'white',
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 1.5,
            padding: '3px 10px',
            borderRadius: 999,
            textTransform: 'uppercase',
            zIndex: 1,
          }}
        >
          Kids
        </div>
      )}

      {/* Clinic name */}
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: '#162E7A',
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
          marginBottom: 6,
          marginTop: location.kids ? 22 : 0,
          position: 'relative',
          zIndex: 1,
          maxWidth: '75%',
          textTransform: 'uppercase',
        }}
      >
        {location.label}
      </div>

      {/* Neighborhood in italic serif */}
      <div
        style={{
          fontSize: 13,
          color: 'rgba(0,29,61,0.55)',
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
          marginBottom: 20,
        }}
      >
        {location.neighborhood}
      </div>

      {/* Info rows */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 9,
          marginBottom: 18,
          paddingBottom: 18,
          borderBottom: '1px solid rgba(0,29,61,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 9,
            fontSize: 13,
            color: 'rgba(0,29,61,0.7)',
            lineHeight: 1.45,
          }}
        >
          <MapPin
            size={13}
            style={{ color: '#F3672A', marginTop: 2, flexShrink: 0 }}
          />
          <span>
            {location.address}, {location.city} {location.zip}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            fontSize: 13,
            color: 'rgba(0,29,61,0.7)',
          }}
        >
          <Phone size={13} style={{ color: '#F3672A', flexShrink: 0 }} />
          <span>{location.phone}</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            fontSize: 13,
            color: 'rgba(0,29,61,0.7)',
          }}
        >
          <Clock size={13} style={{ color: '#F3672A', flexShrink: 0 }} />
          <span>{location.hours}</span>
        </div>
      </div>

      {/* Footer — rating + visit link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            color: 'rgba(0,29,61,0.7)',
          }}
        >
          <Star size={13} fill="#F3672A" style={{ color: '#F3672A' }} />
          <span style={{ fontWeight: 700, color: '#001D3D' }}>
            {location.rating}
          </span>
          <span
            style={{
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontStyle: 'italic',
            }}
          >
            · {location.review_count} reviews
          </span>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: '#F3672A',
            transition: 'transform 0.2s ease',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          }}
        >
          Visit clinic
          <ArrowUpRight size={13} />
        </span>
      </div>
    </motion.a>
  )
}

export function LocationsV2() {
  const siteData = useSiteData()
  const adults = siteData.locations.filter((l) => !l.kids)
  const kids = siteData.locations.filter((l) => l.kids)
  const totalReviews = siteData.locations.reduce(
    (sum, l) => sum + (l.review_count ?? 0),
    0
  )
  const avgRating =
    siteData.locations.reduce((sum, l) => sum + (l.rating ?? 0), 0) /
    Math.max(siteData.locations.length, 1)

  return (
    <section
      id="locations"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial watermark in background — italic "09" */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 40,
          left: -60,
          fontSize: 380,
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        09
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
            .lv2-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 36px !important; }
            .lv2-stats { grid-template-columns: repeat(2, 1fr) !important; }
            .lv2-stats > div:nth-child(2) { border-right: none !important; }
            .lv2-stats > div:nth-child(1), .lv2-stats > div:nth-child(2) { border-bottom: 1px solid rgba(0,29,61,0.08) !important; }
            .lv2-cards { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 980px) and (min-width: 881px) {
            .lv2-cards { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>

        {/* ── Editorial header — matches the rest of V2 ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lv2-header"
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
                The Boca directory
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
              Nine clinics,
              <br />
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                one
              </span>{' '}
              team.
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
            Click any clinic for hours, services, and to book online —
            or keep scrolling for the full Las Vegas map.
          </p>
        </motion.div>

        {/* Stat anchors strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lv2-stats"
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
          {[
            { value: String(siteData.locations.length), label: 'Clinics' },
            { value: String(adults.length), label: 'Dental & Braces' },
            { value: String(kids.length), label: 'Kids clinics' },
            { value: avgRating ? `${avgRating.toFixed(1)}★` : '—', label: 'Avg rating' },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              style={{
                padding: '20px 24px',
                borderRight:
                  i < arr.length - 1
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

        {/* ── Adult clinics group ───────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 14,
            marginBottom: 22,
            paddingBottom: 12,
            borderBottom: '1px solid rgba(0,29,61,0.14)',
          }}
        >
          <span
            style={{
              width: 24,
              height: 1,
              background: '#F3672A',
              display: 'inline-block',
            }}
          />
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#001D3D',
            }}
          >
            Dental & Braces
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(0,29,61,0.5)',
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontStyle: 'italic',
            }}
          >
            {adults.length} clinics
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(0,29,61,0.45)',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            {totalReviews.toLocaleString()}+ reviews
          </div>
        </div>

        <div
          className="lv2-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 56,
          }}
        >
          {adults.map((loc, i) => (
            <LocationCard key={loc.id} location={loc} index={i} />
          ))}
        </div>

        {/* ── Boca Kids group ───────────────────────────── */}
        {kids.length > 0 && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                marginBottom: 22,
                paddingBottom: 12,
                borderBottom: '1px solid rgba(0,29,61,0.14)',
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 1,
                  background: '#F3672A',
                  display: 'inline-block',
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                Boca Kids · Pediatric
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(0,29,61,0.5)',
                  fontFamily: 'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                }}
              >
                {kids.length} clinic{kids.length === 1 ? '' : 's'}
              </div>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(0,29,61,0.45)',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                Ages 1–17
              </div>
            </div>

            <div
              className="lv2-cards"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 20,
              }}
            >
              {kids.map((loc, i) => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  index={adults.length + i}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default LocationsV2
