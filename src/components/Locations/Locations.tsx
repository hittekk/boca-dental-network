import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, ChevronRight, Star } from 'lucide-react'
import type { Location } from '../../types'
import { INITIAL_DATA } from '../../data/initialData'

function LocationCard({
  location,
  index,
}: {
  location: Location
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 16,
        border: `1.5px solid ${hovered ? '#F3672A' : '#E2E8F0'}`,
        padding: '20px 20px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: hovered
          ? '0 8px 28px rgba(243,103,42,0.13)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {location.kids && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: '#F3672A',
            color: 'white',
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: 1.5,
            padding: '3px 10px',
            borderRadius: 20,
            textTransform: 'uppercase',
          }}
        >
          Kids
        </div>
      )}

      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: '#162E7A',
          textTransform: 'uppercase',
          letterSpacing: '-0.3px',
          lineHeight: 1,
          marginBottom: 4,
          paddingRight: location.kids ? 48 : 0,
        }}
      >
        {location.label}
      </div>

      <div
        style={{
          fontSize: 11,
          color: '#94A3B8',
          marginBottom: 14,
          letterSpacing: 0.3,
        }}
      >
        {location.neighborhood}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          marginBottom: 14,
        }}
      >
        {[
          {
            icon: <MapPin size={11} />,
            text: `${location.address}, ${location.city} ${location.zip}`,
          },
          { icon: <Phone size={11} />, text: location.phone },
          { icon: <Clock size={11} />, text: location.hours },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 7,
            }}
          >
            <span style={{ color: '#F3672A', marginTop: 1, flexShrink: 0 }}>
              {row.icon}
            </span>
            <span style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>
              {row.text}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #E2E8F0',
          paddingTop: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Star size={12} fill="#F3672A" style={{ color: '#F3672A' }} />
          <span style={{ fontSize: 12, color: '#64748B' }}>
            {location.rating} ({location.review_count} reviews)
          </span>
        </div>
        <span
          style={{
            color: '#F3672A',
            fontSize: 12,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          Details <ChevronRight size={13} />
        </span>
      </div>
    </motion.div>
  )
}

export function Locations() {
  const adults = INITIAL_DATA.locations.filter((l) => !l.kids)
  const kids = INITIAL_DATA.locations.filter((l) => l.kids)

  return (
    <section
      id="locations"
      style={{ background: '#F7F7FA', padding: '96px 32px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
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
            Las Vegas Locations
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#162E7A',
              margin: '0 0 12px',
              letterSpacing: '-0.5px',
            }}
          >
            9 Offices Near You
          </h2>
          <p
            style={{
              fontSize: 15,
              color: '#64748B',
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Click any location to see hours, services, and book an appointment.
          </p>
        </motion.div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#162E7A',
            marginBottom: 16,
          }}
        >
          Dental & Braces — {adults.length} Locations
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16,
            marginBottom: 40,
          }}
        >
          {adults.map((loc, i) => (
            <LocationCard key={loc.id} location={loc} index={i} />
          ))}
        </div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: '#F3672A',
            marginBottom: 16,
          }}
        >
          Boca Kids — Pediatric Dental · {kids.length} Locations
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 16,
          }}
        >
          {kids.map((loc, i) => (
            <LocationCard key={loc.id} location={loc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Locations
