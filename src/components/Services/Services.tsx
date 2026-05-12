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
    <motion.a
      href={`/services/${service.slug}/`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#162E7A' : '#F7F7FA',
        border: `1px solid ${hovered ? '#162E7A' : '#E2E8F0'}`,
        borderRadius: 12,
        padding: '24px 22px',
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        boxShadow: hovered
          ? '0 12px 32px rgba(22,46,122,0.2)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        // Fixed-height layout so hover never shifts the grid
        display: 'flex',
        flexDirection: 'column',
        minHeight: 200,
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
          marginBottom: 8,
          lineHeight: 1.15,
          transition: 'color 0.2s ease',
        }}
      >
        {service.label}
      </div>
      <div
        style={{
          fontSize: 12,
          color: hovered ? 'rgba(255,255,255,0.65)' : '#64748B',
          lineHeight: 1.6,
          marginBottom: 14,
          transition: 'color 0.2s ease',
          flex: 1,
        }}
      >
        {service.desc}
      </div>
      {/* Always rendered — fades in on hover so the card layout never shifts */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          color: '#F3672A',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-4px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        Explore <ChevronRight size={13} />
      </div>
    </motion.a>
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

        {/* 3×3 grid per Treysyde spec — 9 services fill evenly with no orphan tile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
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
