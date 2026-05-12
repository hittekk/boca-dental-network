import { motion } from 'framer-motion'
import { MapPin, Clock, CheckCircle, CreditCard, Award, Users } from 'lucide-react'

// Treysyde spec — Section 4 differentiator cards (2×3)
const REASONS = [
  {
    icon: MapPin,
    title: '9 Locations Across Las Vegas',
    body: 'From Bonanza to Serene, we are close to where you live, work, and raise your family. No long drives, no waiting weeks for an appointment.',
  },
  {
    icon: Clock,
    title: 'Evening & Weekend Hours',
    body: 'We work around your schedule — not the other way around. Appointments available Monday through Saturday, including early morning and evening slots.',
  },
  {
    icon: CheckCircle,
    title: 'Most Insurance Accepted',
    body: 'Boca Dental & Braces accepts most major PPO dental insurance plans. Our front desk team verifies your benefits before your appointment so there are no surprises.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Financing Options',
    body: 'Treatment shouldn\'t wait because of cost. We offer CareCredit financing and in-house payment plans to make dental care accessible for every budget.',
  },
  {
    icon: Award,
    title: 'Experienced, Caring Providers',
    body: 'Our team includes general dentists, a board-eligible orthodontist, oral surgeons, periodontists, and pediatric specialists — all under one practice umbrella.',
  },
  {
    icon: Users,
    title: 'Bilingual Staff',
    body: 'We serve Las Vegas\' full community. Spanish-speaking staff are available at multiple locations to ensure every patient feels understood and at ease.',
  },
]

export function WhyBoca() {
  return (
    <section
      id="why-boca"
      style={{
        background: '#001D3D',
        padding: '96px 32px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: '#F3672A',
            marginBottom: 10,
          }}>
            Why Boca
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 12px',
            letterSpacing: '-0.5px',
          }}>
            Why Las Vegas Chooses Boca Dental & Braces
          </h2>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            We built Boca Dental around one idea — that every Las Vegas
            family deserves world-class dental care at a price they
            can actually afford.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {REASONS.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: '28px 24px',
                }}
              >
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(243,103,42,0.12)',
                  border: '1px solid rgba(243,103,42,0.25)',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <Icon size={22} color="#F3672A" />
                </div>
                <div style={{
                  fontSize: 17, fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'white',
                  marginBottom: 10,
                  letterSpacing: '-0.2px',
                  lineHeight: 1.1,
                }}>
                  {reason.title}
                </div>
                <div style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.7,
                }}>
                  {reason.body}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: 56,
            padding: '32px 40px',
            background: 'rgba(243,103,42,0.08)',
            border: '1px solid rgba(243,103,42,0.2)',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{
              fontSize: 20, fontWeight: 800,
              textTransform: 'uppercase',
              color: 'white', letterSpacing: '-0.3px',
            }}>
              Ready to experience the Boca difference?
            </div>
            <div style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 4,
            }}>
              New patients welcome at all 9 Las Vegas locations.
            </div>
          </div>
          <a
            href="#locations"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#F3672A',
              color: 'white',
              borderRadius: 8,
              padding: '13px 28px',
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#d95a22')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = '#F3672A')
            }
          >
            Book Appointment
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyBoca
