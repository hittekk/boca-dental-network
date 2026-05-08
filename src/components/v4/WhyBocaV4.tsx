import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Shield, Users, Clock, CreditCard } from 'lucide-react'

const REASONS = [
  {
    icon: CheckCircle2,
    title: 'Insurance + Medicaid',
    body: '30+ PPO plans plus Nevada Medicaid + CHIP across all 9 offices.',
    color: '#F3672A',
  },
  {
    icon: Zap,
    title: 'Same-day care',
    body: 'Most offices keep emergency slots open every business day.',
    color: '#3B82F6',
  },
  {
    icon: Shield,
    title: 'Honest pricing',
    body: 'Quoted before treatment. Always. No surprise invoices.',
    color: '#F3672A',
  },
  {
    icon: Users,
    title: 'Bilingual team',
    body: 'Hablamos español at every front desk and chairside.',
    color: '#3B82F6',
  },
  {
    icon: Clock,
    title: 'Late + Saturday',
    body: 'Open until 7pm most days. Saturdays at every location.',
    color: '#F3672A',
  },
  {
    icon: CreditCard,
    title: 'Built-in financing',
    body: 'In-house plans with $0 down. Plus CareCredit, Sunbit, Alphaeon.',
    color: '#3B82F6',
  },
]

export function WhyBocaV4() {
  return (
    <section
      id="why-boca"
      style={{
        background: '#FFFFFF',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 64px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.18)',
              borderRadius: 999,
              padding: '8px 16px',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#3B82F6',
              }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#3B82F6',
              }}
            >
              Why Boca · Six Differences
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(40px, 5.4vw, 72px)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-2.2px',
              color: '#0A0A0F',
              margin: '0 0 20px',
              textTransform: 'uppercase',
            }}
          >
            Built for everyone
            <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg, #F3672A 0%, #FF8A50 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              who lives here.
            </span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: 'rgba(10,10,15,0.65)',
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            The short version of what makes Boca different. The long version is
            twenty years of word-of-mouth from Las Vegas families.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {REASONS.map((reason, i) => {
            const Icon = reason.icon
            const lightBg = `${reason.color}10`
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 24px 48px ${reason.color}20, 0 8px 16px rgba(10,10,15,0.04)`,
                }}
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,10,15,0.05)',
                  borderRadius: 22,
                  padding: '32px 28px',
                  boxShadow: '0 4px 12px rgba(10,10,15,0.03)',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: lightBg,
                    border: `1px solid ${reason.color}26`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 22,
                  }}
                >
                  <Icon size={24} color={reason.color} />
                </div>
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: '#0A0A0F',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.4px',
                    marginBottom: 12,
                    lineHeight: 1.15,
                  }}
                >
                  {reason.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(10,10,15,0.6)',
                    lineHeight: 1.65,
                  }}
                >
                  {reason.body}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyBocaV4
