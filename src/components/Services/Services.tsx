import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'
import { SERVICE_ICON_MAP } from './ServiceIcons'

interface ServiceCardProps {
  service: { slug: string; label: string; desc: string }
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false)
  const Icon = SERVICE_ICON_MAP[service.slug]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#162E7A' : '#F7F7FA',
        border: `1px solid ${hovered ? '#162E7A' : '#E2E8F0'}`,
        borderRadius: 12,
        padding: '24px 20px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: hovered
          ? '0 8px 24px rgba(22,46,122,0.18)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {Icon && (
        <div style={{ marginBottom: 14 }}>
          <Icon size={36} color={hovered ? '#F3672A' : '#162E7A'} />
        </div>
      )}
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '-0.2px',
          color: hovered ? 'white' : '#162E7A',
          marginBottom: 6,
          lineHeight: 1.1,
          transition: 'color 0.2s ease',
        }}
      >
        {service.label}
      </div>
      <div
        style={{
          fontSize: 12,
          color: hovered ? 'rgba(255,255,255,0.6)' : '#64748B',
          lineHeight: 1.6,
          marginBottom: hovered ? 14 : 0,
          transition: 'color 0.2s ease',
        }}
      >
        {service.desc}
      </div>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#F3672A',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          Learn more <ChevronRight size={12} />
        </motion.div>
      )}
    </motion.div>
  )
}

export function Services() {
  return (
    <section id="services" style={{ background: '#ffffff', padding: '96px 32px' }}>
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
            Our Dental Services
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
            Comprehensive Dental Care for Every Stage of Life
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
            From routine cleanings to full-mouth restorations, orthodontics
            to pediatric care, Boca Dental & Braces provides a complete range
            of dental services at 9 Las Vegas locations.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {INITIAL_DATA.services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <a
            href="/services/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 0.4,
              color: '#162E7A',
              textDecoration: 'none',
              borderBottom: '2px solid #F3672A',
              paddingBottom: 4,
              textTransform: 'uppercase',
            }}
          >
            View all dental services at Boca Dental & Braces →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
