import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowUpRight, Star } from 'lucide-react'
import type { Location } from '../../types'
import { INITIAL_DATA } from '../../data/initialData'

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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      style={{
        width: '100%',
        textAlign: 'left',
        background: active ? '#F3672A' : 'rgba(255,255,255,0.03)',
        border: active
          ? '1px solid #F3672A'
          : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14,
        padding: '20px 22px',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '36px 1fr auto',
        gap: 14,
        alignItems: 'center',
        fontFamily: 'inherit',
        transition: 'all 0.18s ease',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.5,
          color: active ? 'white' : 'rgba(255,255,255,0.45)',
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        }}
      >
        / {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 4,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: active ? 'white' : 'white',
              textTransform: 'uppercase',
              letterSpacing: '-0.2px',
              lineHeight: 1.1,
            }}
          >
            {location.label}
          </div>
          {location.kids && (
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
                background: active ? 'rgba(0,0,0,0.25)' : '#F3672A',
                color: 'white',
                borderRadius: 999,
                padding: '2px 8px',
              }}
            >
              Kids
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: 11,
            color: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            letterSpacing: 0.4,
          }}
        >
          {location.neighborhood}
        </div>
      </div>
      <ArrowUpRight
        size={16}
        color={active ? 'white' : 'rgba(255,255,255,0.45)'}
      />
    </motion.button>
  )
}

function LocationDetailCard({ location }: { location: Location }) {
  return (
    <motion.div
      key={location.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        background:
          'linear-gradient(155deg, rgba(243,103,42,0.18) 0%, rgba(22,46,122,0.16) 60%, rgba(255,255,255,0.04) 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: '40px 36px',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Backdrop big number */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -20,
          right: -10,
          fontSize: 280,
          fontWeight: 800,
          color: 'rgba(255,255,255,0.05)',
          lineHeight: 0.85,
          letterSpacing: '-12px',
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
            color: 'rgba(255,255,255,0.5)',
            marginBottom: 14,
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          }}
        >
          / Selected · LOC-{String(location.id).padStart(3, '0')}
        </div>

        <div
          style={{
            fontSize: 'clamp(28px, 3.4vw, 44px)',
            fontWeight: 800,
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '-1.2px',
            lineHeight: 1.05,
            marginBottom: 8,
          }}
        >
          {location.label}
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.65)',
            marginBottom: 32,
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
            gap: 16,
            marginBottom: 32,
          }}
        >
          {[
            {
              icon: <MapPin size={14} />,
              label: 'Address',
              value: `${location.address}, ${location.city} ${location.zip}`,
            },
            {
              icon: <Phone size={14} />,
              label: 'Phone',
              value: location.phone,
            },
            {
              icon: <Clock size={14} />,
              label: 'Hours',
              value: location.hours,
            },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '32px 90px 1fr',
                gap: 12,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(243,103,42,0.16)',
                  border: '1px solid rgba(243,103,42,0.32)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F3672A',
                }}
              >
                {row.icon}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  paddingTop: 8,
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: 'white',
                  lineHeight: 1.5,
                  paddingTop: 6,
                }}
              >
                {row.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Star size={14} fill="#F3672A" style={{ color: '#F3672A' }} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.2px',
              }}
            >
              {location.rating.toFixed(1)}
            </span>
            <span
              style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.55)',
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                letterSpacing: 0.4,
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
              gap: 8,
              background: '#F3672A',
              color: 'white',
              borderRadius: 8,
              padding: '12px 20px',
              fontSize: 12,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#d95a22')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#F3672A')
            }
          >
            View office
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function LocationsV3() {
  const [selected, setSelected] = useState(INITIAL_DATA.locations[0].id)
  const active = INITIAL_DATA.locations.find((l) => l.id === selected)!

  return (
    <section
      id="locations"
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
          style={{ marginBottom: 56 }}
        >
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
            [ 10 ] · The Network
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: 56,
              alignItems: 'flex-end',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(44px, 5.6vw, 76px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2.2px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Ten offices
              <br />
              <span style={{ color: '#F3672A' }}>across</span> the valley.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: 460,
              }}
            >
              From Eastern & Bonanza in the east to Rainbow & Cheyenne in the
              northwest, plus Henderson — every location runs the same Boca
              standard of care.
            </p>
          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: 28,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT — interactive list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {INITIAL_DATA.locations.map((loc, i) => (
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
