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
  const numberLabel = String(index + 1).padStart(2, '0')

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
        position: 'relative',
        background: hovered ? '#162E7A' : '#F7F7FA',
        border: `1px solid ${hovered ? '#162E7A' : '#E2E8F0'}`,
        borderRadius: 16,
        padding: '28px 26px',
        cursor: 'pointer',
        textDecoration: 'none',
        overflow: 'hidden',
        transition:
          'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
        boxShadow: hovered
          ? '0 16px 36px rgba(22,46,122,0.22)'
          : '0 1px 4px rgba(0,0,0,0.04)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 220,
      }}
    >
      {/* Watermark — oversized service icon faded into bottom-right corner */}
      {Icon && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: -36,
            right: -28,
            opacity: hovered ? 0.12 : 0.07,
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            transform: hovered ? 'rotate(-6deg)' : 'rotate(0deg)',
            pointerEvents: 'none',
          }}
        >
          <Icon size={180} color={hovered ? '#F3672A' : '#162E7A'} />
        </div>
      )}

      {/* Top row: foreground icon + mono index */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {Icon && (
          <Icon size={34} color={hovered ? '#F3672A' : '#162E7A'} />
        )}
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.5,
            color: hovered ? 'rgba(255,255,255,0.45)' : 'rgba(22,46,122,0.4)',
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            transition: 'color 0.25s ease',
          }}
        >
          / {numberLabel}
        </div>
      </div>

      <div
        style={{
          fontSize: 16,
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '-0.3px',
          color: hovered ? 'white' : '#162E7A',
          marginBottom: 8,
          lineHeight: 1.15,
          transition: 'color 0.25s ease',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {service.label}
      </div>

      <div
        style={{
          fontSize: 13,
          color: hovered ? 'rgba(255,255,255,0.7)' : '#64748B',
          lineHeight: 1.6,
          marginBottom: 18,
          transition: 'color 0.25s ease',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {service.desc}
      </div>

      {/* Bottom row: explore link + hairline accent */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: 14,
          borderTop: `1px solid ${
            hovered ? 'rgba(255,255,255,0.12)' : 'rgba(22,46,122,0.08)'
          }`,
          transition: 'border-color 0.25s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            color: hovered ? 'white' : '#162E7A',
            transition: 'color 0.25s ease',
          }}
        >
          Learn more
        </span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: hovered ? '#F3672A' : 'rgba(243,103,42,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hovered ? 'white' : '#F3672A',
            transition: 'all 0.25s ease',
          }}
        >
          <ChevronRight size={14} />
        </div>
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
              fontSize: 'clamp(22px, 3.2vw, 34px)',
              fontWeight: 800,
              textTransform: 'uppercase',
              color: '#162E7A',
              margin: '0 0 14px',
              letterSpacing: '-1px',
              lineHeight: 1.15,
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

        {/* 3×3 grid per Treysyde spec */}
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

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <a
            href="/services/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 0.5,
              color: '#162E7A',
              background: 'white',
              textDecoration: 'none',
              border: '2px solid #162E7A',
              borderRadius: 999,
              padding: '13px 28px',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#162E7A'
              ;(e.currentTarget as HTMLElement).style.color = 'white'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow =
                '0 12px 24px rgba(22,46,122,0.18)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'white'
              ;(e.currentTarget as HTMLElement).style.color = '#162E7A'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            View All Dental Services
            <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
