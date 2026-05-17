import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowUpRight, Star } from 'lucide-react'
import type { Location } from '../../types'
import { useSiteData } from '../../lib/site-data'

function LocationRow({
  location,
  index,
  active,
  onSelect,
}: {
  location: Location
  index: number
  active: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={onSelect}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
      style={{
        width: '100%',
        textAlign: 'left',
        background: active
          ? 'rgba(243,103,42,0.1)'
          : 'transparent',
        border: 'none',
        borderLeft: `3px solid ${active ? '#F3672A' : 'transparent'}`,
        padding: '14px 18px',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '40px 1fr auto',
        gap: 14,
        alignItems: 'center',
        fontFamily: 'inherit',
        transition: 'all 0.2s ease',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.5,
          color: active ? '#F3672A' : 'rgba(255,255,255,0.35)',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          transition: 'color 0.2s ease',
        }}
      >
        / {String(index + 1).padStart(2, '0')}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 3,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '-0.1px',
              lineHeight: 1.1,
            }}
          >
            {location.label}
          </div>
          {location.kids && (
            <div
              style={{
                fontSize: 8,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
                background: '#F3672A',
                color: 'white',
                borderRadius: 999,
                padding: '2px 7px',
              }}
            >
              Kids
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: 0.3,
          }}
        >
          {location.neighborhood}
        </div>
      </div>
      <ArrowUpRight
        size={14}
        style={{
          color: active ? '#F3672A' : 'rgba(255,255,255,0.3)',
          transform: active ? 'translateX(2px)' : 'translateX(0)',
          transition: 'all 0.2s ease',
        }}
      />
    </motion.button>
  )
}

function LocationDetailCard({ location }: { location: Location }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        style={{
          background:
            'linear-gradient(155deg, rgba(243,103,42,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 18,
          padding: '28px 28px 24px',
          position: 'relative',
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Subtle backdrop number — smaller than before */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -10,
            right: 14,
            fontSize: 120,
            fontWeight: 800,
            color: 'rgba(255,255,255,0.05)',
            lineHeight: 0.85,
            letterSpacing: '-6px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          {String(location.id).padStart(2, '0')}
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: 10,
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            / Selected · LOC-{String(location.id).padStart(3, '0')}
          </div>

          <div
            style={{
              fontSize: 'clamp(22px, 2.4vw, 30px)',
              fontWeight: 800,
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '-0.7px',
              lineHeight: 1.1,
              marginBottom: 6,
            }}
          >
            {location.label}
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 22,
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              letterSpacing: 0.4,
            }}
          >
            {location.neighborhood} · {location.city}, {location.state}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 22,
            }}
          >
            {[
              {
                icon: <MapPin size={13} />,
                label: 'Address',
                value: `${location.address}, ${location.city} ${location.zip}`,
              },
              {
                icon: <Phone size={13} />,
                label: 'Phone',
                value: location.phone,
              },
              {
                icon: <Clock size={13} />,
                label: 'Hours',
                value: location.hours,
              },
            ].map((row) => (
              <div
                key={row.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '26px 1fr',
                  gap: 12,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 7,
                    background: 'rgba(243,103,42,0.14)',
                    border: '1px solid rgba(243,103,42,0.28)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F3672A',
                  }}
                >
                  {row.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 1.4,
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily:
                        'ui-monospace, "SF Mono", Menlo, monospace',
                      marginBottom: 2,
                    }}
                  >
                    {row.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'white',
                      lineHeight: 1.45,
                    }}
                  >
                    {row.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 18,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <Star size={12} fill="#F3672A" style={{ color: '#F3672A' }} />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'white',
                }}
              >
                {location.rating.toFixed(1)}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                  letterSpacing: 0.3,
                }}
              >
                · {location.review_count} reviews
              </span>
            </div>
            <a
              href={`/clinics/${location.slug}/`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#F3672A',
                color: 'white',
                borderRadius: 8,
                padding: '9px 16px',
                fontSize: 11,
                fontWeight: 800,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#d95a22'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = '#F3672A'
                el.style.transform = 'translateY(0)'
              }}
            >
              View office
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export function LocationsV3() {
  const siteData = useSiteData()
  const firstId = siteData.locations[0]?.id ?? 0
  const [selected, setSelected] = useState(firstId)
  const active = siteData.locations.find((l) => l.id === selected) ?? siteData.locations[0]
  const totalCount = siteData.locations.length

  return (
    <section
      id="locations"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        // `clip` clips the decorative grid overlay but — unlike `hidden` —
        // doesn't establish a scroll container, so `position: sticky` on the
        // detail card still works as the user scrolls through the list.
        overflow: 'clip',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)',
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
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 48,
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
                marginBottom: 22,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 10 ] · The Network
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-1.6px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Offices{' '}
              <span style={{ color: '#F3672A' }}>across</span> the valley.
            </h2>
          </div>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 440,
            }}
          >
            From Bonanza & Eastern in the southeast to Cheyenne Commons in the
            northwest, plus our Beltway Marketplace clinic in the south — every
            location runs the same Boca standard of care.{' '}
            <span
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 700,
              }}
            >
              Hover any office.
            </span>
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — interactive list (tighter, line-based) */}
          <div
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {/* Header strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr auto',
                gap: 14,
                alignItems: 'center',
                padding: '12px 18px',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                / IDX
              </div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                Location · Neighborhood
              </div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily:
                    'ui-monospace, "SF Mono", Menlo, monospace',
                }}
              >
                {totalCount} TOTAL
              </div>
            </div>

            {siteData.locations.map((loc, i) => (
              <LocationRow
                key={loc.id}
                location={loc}
                index={i}
                active={selected === loc.id}
                onSelect={() => setSelected(loc.id)}
              />
            ))}
          </div>

          {/* RIGHT — selected detail */}
          <div style={{ position: 'sticky', top: 110 }}>
            <LocationDetailCard location={active} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationsV3
