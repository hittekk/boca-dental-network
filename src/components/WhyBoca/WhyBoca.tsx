import { motion } from 'framer-motion'
import { CheckCircle, Zap, Shield, Users, Clock, CreditCard } from 'lucide-react'

const REASONS = [
  {
    icon: CheckCircle,
    title: '30+ Insurance Plans',
    body: 'We work with Delta Dental, MetLife, Cigna, Aetna, and more. We verify your benefits before your first visit — no surprises at checkout.',
  },
  {
    icon: Zap,
    title: 'Same-Day Emergencies',
    body: 'Toothache or broken crown? Most Boca locations offer same-day emergency appointments. Call us and we will get you in.',
  },
  {
    icon: Shield,
    title: 'Medicaid & CHIP Welcome',
    body: 'All 9 locations accept Nevada Medicaid and CHIP for qualifying patients — including full pediatric dental coverage.',
  },
  {
    icon: Users,
    title: 'Bilingual Staff',
    body: 'Spanish-speaking team members at every location. Hablamos español en todas nuestras oficinas para servirle mejor.',
  },
  {
    icon: Clock,
    title: 'Extended Hours',
    body: 'Open Monday through Saturday at most locations — early mornings and evenings available so dental care fits your schedule.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Financing',
    body: 'We offer in-house payment plans and work with CareCredit, Sunbit, and other financing partners so cost is never a barrier.',
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
            Why Choose Boca
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'white',
            margin: '0 0 12px',
            letterSpacing: '-0.5px',
          }}>
            The Boca Difference
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
