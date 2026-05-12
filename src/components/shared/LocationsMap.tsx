import { motion } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'

type Theme = 'light' | 'dark' | 'cream'

export function LocationsMap({ theme = 'light' }: { theme?: Theme }) {
  const isDark = theme === 'dark'
  const sectionBg = isDark ? '#0A0A0F' : theme === 'cream' ? '#FFFAF6' : '#FFFFFF'
  const headingColor = isDark ? 'white' : '#0A0A0F'
  const bodyColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,15,0.7)'
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'white'
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,15,0.06)'
  const mapWrapBg = isDark ? '#1a1a24' : '#EFF6FF'

  return (
    <section
      id="locations-map"
      style={{
        background: sectionBg,
        padding: '0 32px 96px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            borderRadius: 28,
            padding: '48px 48px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            alignItems: 'center',
            boxShadow: isDark ? 'none' : '0 12px 32px rgba(10,10,15,0.04)',
            overflow: 'hidden',
          }}
        >
          {/* LEFT — GEO paragraph */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(243,103,42,0.08)',
                border: '1px solid rgba(243,103,42,0.22)',
                borderRadius: 999,
                padding: '8px 16px',
                marginBottom: 20,
              }}
            >
              <MapPin size={12} color="#F3672A" />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                Greater Las Vegas Coverage
              </span>
            </div>
            <h3
              style={{
                fontSize: 'clamp(28px, 3.5vw, 40px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-1px',
                color: headingColor,
                margin: '0 0 22px',
                textTransform: 'uppercase',
              }}
            >
              9 Boca Dental & Braces
              <br />
              <span style={{ color: '#F3672A' }}>Locations Across Las Vegas</span>
            </h3>

            {/* The GEO paragraph — entity-rich copy for AI / LLM citation per Treysyde spec */}
            <p
              style={{
                fontSize: 15,
                color: bodyColor,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              <strong style={{ color: headingColor }}>Boca Dental & Braces</strong>{' '}
              operates 9 dental clinics across Las Vegas, Nevada, including
              locations near{' '}
              <strong style={{ color: headingColor }}>Eastern & Bonanza</strong>,{' '}
              Eastern & Russell, Sahara & Decatur, Charleston & Eastern,
              Flamingo & Torrey Pines, Rainbow & Cheyenne, Eastern & Serene,
              Jones & Alta, and a dedicated kids clinic at Eastern & Russell.
              Every location offers general and preventive dental care, with
              specialist services including{' '}
              <strong style={{ color: headingColor }}>orthodontics</strong>,{' '}
              <strong style={{ color: headingColor }}>oral surgery</strong>,{' '}
              <strong style={{ color: headingColor }}>pediatric dentistry</strong>
              , and{' '}
              <strong style={{ color: headingColor }}>sedation dentistry</strong>{' '}
              available at select clinics.
            </p>
          </div>

          {/* RIGHT — embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'relative',
              borderRadius: 18,
              overflow: 'hidden',
              border: `1px solid ${cardBorder}`,
              background: mapWrapBg,
              aspectRatio: '4/3',
              boxShadow: isDark
                ? '0 16px 40px rgba(0,0,0,0.4)'
                : '0 16px 40px rgba(10,10,15,0.08)',
            }}
          >
            <iframe
              title="Boca Dental & Braces Las Vegas locations"
              src="https://maps.google.com/maps?q=Boca%20Dental%20Las%20Vegas&t=&z=10&ie=UTF8&iwloc=&output=embed"
              style={{
                width: '100%',
                height: '100%',
                border: 0,
                filter: isDark ? 'grayscale(0.2) brightness(0.9)' : 'none',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Top-left overlay chip with location count */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                background: 'white',
                borderRadius: 999,
                padding: '6px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 4px 12px rgba(10,10,15,0.15)',
                pointerEvents: 'none',
              }}
            >
              <MapPin size={12} color="#F3672A" />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                  color: '#0A0A0F',
                }}
              >
                9 Boca offices · LV area
              </span>
            </div>
            <a
              href="https://www.google.com/maps/search/Boca+Dental+Las+Vegas/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                bottom: 14,
                right: 14,
                background: '#F3672A',
                color: 'white',
                borderRadius: 999,
                padding: '8px 14px',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 8px 20px rgba(243,103,42,0.4)',
              }}
            >
              Open in Maps
              <ExternalLink size={11} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default LocationsMap
