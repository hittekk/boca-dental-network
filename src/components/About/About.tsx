import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const PILLARS = [
  'Experienced, highly-trained dentists',
  'Individualized care for every patient',
  'Affordable treatment options',
  'English and Spanish-speaking staff',
  'Advanced technology and techniques',
  'Most insurance plans accepted',
]

export function About() {
  return (
    <section
      id="about"
      style={{ background: '#ffffff', padding: '96px 32px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* Left — image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: 16,
                background: 'linear-gradient(135deg, #162E7A 0%, #1a3a8f 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📸</div>
                <div style={{ fontSize: 13, letterSpacing: 1 }}>
                  Office / Team Photo
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: '#F3672A',
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: -24,
                right: -24,
                background: '#F3672A',
                borderRadius: 12,
                padding: '20px 24px',
                boxShadow: '0 8px 32px rgba(243,103,42,0.35)',
                textAlign: 'center',
                minWidth: 140,
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1,
                }}
              >
                9
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.85)',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  marginTop: 4,
                }}
              >
                Locations
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.65)',
                  marginTop: 2,
                }}
              >
                Across Las Vegas
              </div>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 12,
              }}
            >
              About Boca Dental
            </div>

            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: '#162E7A',
                lineHeight: 1.05,
                letterSpacing: '-0.5px',
                margin: '0 0 20px',
              }}
            >
              World-Class Care
              <br />
              <span style={{ color: '#F3672A' }}>You Can Afford</span>
            </h2>

            <p
              style={{
                fontSize: 16,
                color: '#64748B',
                lineHeight: 1.75,
                margin: '0 0 28px',
              }}
            >
              At Boca Dental and Braces, we believe everyone deserves
              quality dental care at a price they can afford. Our experienced
              team of dentists and staff are committed to making you feel at
              home — confident you are getting the best treatment possible
              to achieve the smile of your dreams.
            </p>

            <p
              style={{
                fontSize: 16,
                color: '#64748B',
                lineHeight: 1.75,
                margin: '0 0 32px',
              }}
            >
              Serving Las Vegas, Henderson, and Clark County with 9
              convenient locations — so quality dental care is never
              far from home.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px 24px',
                marginBottom: 36,
              }}
            >
              {PILLARS.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    fontSize: 13,
                    color: '#0F172A',
                    fontWeight: 500,
                  }}
                >
                  <CheckCircle
                    size={15}
                    style={{ color: '#F3672A', flexShrink: 0, marginTop: 2 }}
                  />
                  {item}
                </motion.div>
              ))}
            </div>

            <a
              href="#locations"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#162E7A',
                color: 'white',
                borderRadius: 8,
                padding: '12px 28px',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Find a Location Near You
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
