import { motion } from 'framer-motion'
import { KIDS_FEATURE_ICONS } from './KidsIcons'

const KIDS_FEATURES = [
  'Pediatric dental care from age 1',
  'Kid-friendly offices built for comfort',
  'Medicaid and CHIP accepted',
  'Bilingual staff — hablamos español',
  'Preventive care, fillings, and extractions',
  'Orthodontics and braces for kids and teens',
]

export function BocaKids() {
  return (
    <section
      id="boca-kids"
      style={{ background: '#ffffff', padding: '96px 32px' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}>
          {/* Left — content */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 20,
              background: '#FFF4F0',
              border: '1px solid rgba(243,103,42,0.2)',
              borderRadius: 20,
              padding: '6px 16px',
            }}>
              <span style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
              }}>
                Boca Kids Dental & Braces
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#162E7A',
              lineHeight: 1.05,
              letterSpacing: '-0.5px',
              margin: '0 0 20px',
            }}>
              Dental Care Built
              <br />
              <span style={{ color: '#F3672A' }}>For Kids</span>
            </h2>

            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.75, margin: '0 0 28px' }}>
              Boca Kids is our dedicated pediatric practice — designed from the ground up to make every child's dental visit comfortable, fun, and fear-free.
            </p>
            <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.75, margin: '0 0 32px' }}>
              Our pediatric team specializes in treating children from their very first tooth through their teenage years, including braces and orthodontic care.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {KIDS_FEATURES.map((feature, i) => {
                const Icon = KIDS_FEATURE_ICONS[i]
                return (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: 14,
                      color: '#0F172A',
                      fontWeight: 500,
                    }}
                  >
                    {Icon && (
                      <div style={{
                        width: 36, height: 36,
                        background: '#FFF4F0',
                        border: '1px solid rgba(243,103,42,0.15)',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={20} color="#F3672A" />
                      </div>
                    )}
                    {feature}
                  </motion.div>
                )
              })}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#locations"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: '#F3672A',
                  color: 'white',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#d95a22')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#F3672A')}
              >
                Find Boca Kids Near You
              </a>
              <a
                href="tel:7023891543"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'transparent',
                  color: '#162E7A',
                  border: '2px solid #162E7A',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = '#162E7A'
                  ;(e.currentTarget as HTMLElement).style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.color = '#162E7A'
                }}
              >
                (702) 389-1543
              </a>
            </div>
          </motion.div>

          {/* Right — image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #FFF4F0 0%, #FFE4D6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(243,103,42,0.15)',
            }}>
              <div style={{ textAlign: 'center', color: 'rgba(243,103,42,0.5)' }}>
                <svg width="64" height="64" viewBox="0 0 40 40" fill="none">
                  <path d="M15 11C12 11 9.5 13.5 9.5 16.5C9.5 19 10.5 20.5 11.5 22C12.5 23.5 13 27 14 28.5C14.5 29.5 15 30 16 30C17 30 17.5 29 18 27L18.5 24H21.5L22 27C22.5 29 23 30 24 30C25 30 25.5 29.5 26 28.5C27 27 27.5 23.5 28.5 22C29.5 20.5 30.5 19 30.5 16.5C30.5 13.5 28 11 25 11C23.5 11 22.5 11.5 21.5 12C21 12.3 20.5 12.4 20 12.4C19.5 12.4 19 12.3 18.5 12C17.5 11.5 16.5 11 15 11Z" stroke="rgba(243,103,42,0.5)" strokeWidth="1.75" strokeLinejoin="round"/>
                  <path d="M16.5 18.5C16.5 18.5 17.5 20.5 20 20.5C22.5 20.5 23.5 18.5 23.5 18.5" stroke="rgba(243,103,42,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="17.5" cy="16.5" r="1" fill="rgba(243,103,42,0.5)"/>
                  <circle cx="22.5" cy="16.5" r="1" fill="rgba(243,103,42,0.5)"/>
                </svg>
                <div style={{ fontSize: 12, marginTop: 10, letterSpacing: 1 }}>
                  Boca Kids Office Photo
                </div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: 4, background: '#F3672A',
              }} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                position: 'absolute',
                bottom: -20, left: -20,
                background: '#162E7A',
                borderRadius: 12,
                padding: '16px 20px',
                boxShadow: '0 8px 32px rgba(22,46,122,0.25)',
                textAlign: 'center',
                minWidth: 130,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 800, color: 'white', lineHeight: 1 }}>
                Age 1+
              </div>
              <div style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.6)',
                textTransform: 'uppercase',
                letterSpacing: 1.5, marginTop: 4,
              }}>
                First Visit
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BocaKids
