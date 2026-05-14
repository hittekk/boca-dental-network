import { motion } from 'framer-motion'
import {
  Phone,
  MapPin,
  Baby,
  Smile,
  HeartHandshake,
  Languages,
  ShieldCheck,
  Brackets,
  Star,
} from 'lucide-react'

const KIDS_TAGS = [
  { label: 'From age 1', icon: Baby },
  { label: 'Kid-friendly offices', icon: Smile },
  { label: 'Medicaid & CHIP', icon: ShieldCheck },
  { label: 'Bilingual staff', icon: Languages },
  { label: 'Preventive care', icon: HeartHandshake },
  { label: 'Pediatric braces', icon: Brackets },
]

const STAT_ANCHORS = [
  { value: '4.9★', label: 'Parent rating' },
  { value: '200+', label: 'Reviews' },
  { value: 'Age 1+', label: 'First visit' },
  { value: 'EN·ES', label: 'Every chair' },
]

export function BocaKidsV2() {
  return (
    <section
      id="boca-kids"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faint editorial watermark — italic "kids" */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          right: -40,
          fontSize: 360,
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        kids
      </div>

      {/* Soft radial accent — bottom left */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: -120,
          left: -80,
          width: 460,
          height: 460,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(243,103,42,0.10) 0%, rgba(243,103,42,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <style>{`
          @media (max-width: 980px) {
            .bkv2-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
            .bkv2-stats { grid-template-columns: repeat(2, 1fr) !important; }
            .bkv2-stats > div:nth-child(2) { border-right: none !important; }
            .bkv2-stats > div:nth-child(1), .bkv2-stats > div:nth-child(2) { border-bottom: 1px solid rgba(0,29,61,0.08) !important; }
            .bkv2-rating-card { right: 0 !important; top: 20 !important; }
            .bkv2-age-card { left: 0 !important; bottom: -16 !important; }
          }
          .bkv2-tag { transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
          .bkv2-tag:hover { transform: translateY(-2px); background: #F3672A !important; color: white !important; border-color: #F3672A !important; }
          .bkv2-tag:hover .bkv2-tag-icon { color: white !important; }
        `}</style>

        <div
          className="bkv2-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* ── Left — editorial content ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
          >
            {/* Eyebrow — orange dash + label */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 1,
                  background: '#F3672A',
                  display: 'inline-block',
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                Boca Kids · Pediatric
              </div>
            </div>

            <h2
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 800,
                color: '#001D3D',
                lineHeight: 0.95,
                letterSpacing: '-2px',
                margin: '0 0 24px',
                textTransform: 'uppercase',
              }}
            >
              Dental care,
              <br />
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                built
              </span>{' '}
              for kids.
            </h2>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: 'rgba(0,29,61,0.7)',
                margin: '0 0 24px',
                maxWidth: 520,
                borderLeft: '2px solid #F3672A',
                paddingLeft: 18,
                fontStyle: 'italic',
              }}
            >
              Boca Kids is our dedicated pediatric practice — designed from
              the ground up to make every child's first dental visit
              comfortable, fun, and fear-free.
            </p>

            {/* Pull-quote from a parent */}
            <blockquote
              style={{
                background: 'white',
                border: '1px solid rgba(0,29,61,0.08)',
                borderRadius: 14,
                padding: '20px 24px',
                margin: '0 0 32px',
                fontSize: 16,
                lineHeight: 1.55,
                color: '#001D3D',
                fontFamily: 'Georgia, "Playfair Display", serif',
                fontStyle: 'italic',
                position: 'relative',
                boxShadow: '0 4px 14px rgba(0,29,61,0.04)',
              }}
            >
              {/* Star row */}
              <div
                style={{
                  display: 'flex',
                  gap: 2,
                  marginBottom: 10,
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    fill="#F3672A"
                    style={{ color: '#F3672A' }}
                  />
                ))}
              </div>
              &ldquo;My 4-year-old was terrified of the dentist. The Boca
              Kids team turned it into a fun visit — she now{' '}
              <em style={{ fontWeight: 700, color: '#F3672A' }}>asks</em> to
              go back.&rdquo;
              <footer
                style={{
                  fontStyle: 'normal',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 11,
                  color: 'rgba(0,29,61,0.55)',
                  marginTop: 12,
                  paddingTop: 10,
                  borderTop: '1px solid rgba(0,29,61,0.06)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: '#FFF4ED',
                    border: '1px solid rgba(243,103,42,0.22)',
                    color: '#F3672A',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontWeight: 800,
                  }}
                >
                  AM
                </span>
                Ana M. · Boca Kids, Russell
              </footer>
            </blockquote>

            {/* Feature pills with lucide icons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 36,
              }}
            >
              {KIDS_TAGS.map((tag, i) => {
                const Icon = tag.icon
                return (
                  <motion.span
                    key={tag.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    className="bkv2-tag"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      background: 'white',
                      border: '1px solid rgba(243,103,42,0.22)',
                      borderRadius: 999,
                      padding: '8px 14px',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#001D3D',
                      letterSpacing: 0.2,
                      cursor: 'default',
                    }}
                  >
                    <Icon
                      size={13}
                      strokeWidth={2.2}
                      className="bkv2-tag-icon"
                      style={{ color: '#F3672A' }}
                    />
                    {tag.label}
                  </motion.span>
                )
              })}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#locations"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#F3672A',
                  color: 'white',
                  borderRadius: 999,
                  padding: '14px 28px',
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 8px 24px rgba(243,103,42,0.22)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#d95a22'
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = '0 12px 28px rgba(243,103,42,0.34)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#F3672A'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 8px 24px rgba(243,103,42,0.22)'
                }}
              >
                <MapPin size={14} />
                Find Boca Kids near you
              </a>
              <a
                href="tel:7023891543"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'transparent',
                  color: '#001D3D',
                  border: '2px solid #001D3D',
                  borderRadius: 999,
                  padding: '12px 26px',
                  fontSize: 13,
                  fontWeight: 800,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#001D3D'
                  el.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'transparent'
                  el.style.color = '#001D3D'
                }}
              >
                <Phone size={14} />
                (702) 389-1543
              </a>
            </div>
          </motion.div>

          {/* ── Right — image + floating editorial callouts ─ */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1.0] }}
            style={{ position: 'relative' }}
          >
            {/* Decorative dashed border behind image — adds editorial frame */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                right: -14,
                bottom: -14,
                border: '2px dashed rgba(243,103,42,0.35)',
                borderRadius: 20,
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(243,103,42,0.18)',
                boxShadow: '0 24px 64px rgba(0,29,61,0.15)',
              }}
            >
              <img
                src="/boca-kids-office.webp"
                alt="A smiling child in a Boca Kids dental chair with a friendly hygienist showing them a mirror"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '35% center',
                  display: 'block',
                }}
              />
            </div>

            {/* Floating Age 1+ badge — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bkv2-age-card"
              style={{
                position: 'absolute',
                bottom: -22,
                left: -22,
                background: 'white',
                borderRadius: 16,
                padding: '18px 22px',
                boxShadow: '0 12px 32px rgba(0,29,61,0.18)',
                textAlign: 'left',
                minWidth: 160,
                border: '1px solid rgba(243,103,42,0.18)',
              }}
            >
              {/* Tiny accent bar at top */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 22,
                  width: 40,
                  height: 3,
                  background:
                    'linear-gradient(90deg, #F3672A 0%, #FF8A50 100%)',
                  borderRadius: '0 0 4px 4px',
                }}
              />

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 6,
                }}
              >
                <Baby size={12} color="#F3672A" />
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: '#F3672A',
                  }}
                >
                  First visit
                </div>
              </div>
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: '#001D3D',
                  lineHeight: 1,
                  letterSpacing: '-0.8px',
                }}
              >
                Age{' '}
                <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                  1+
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(0,29,61,0.55)',
                  marginTop: 6,
                  fontFamily: 'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                }}
              >
                When the first tooth shows up.
              </div>
            </motion.div>

            {/* Floating parent-rating badge — top-right */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="bkv2-rating-card"
              style={{
                position: 'absolute',
                top: 24,
                right: -28,
                background: '#001D3D',
                color: 'white',
                borderRadius: 14,
                padding: '16px 20px',
                boxShadow: '0 12px 32px rgba(0,29,61,0.25)',
                textAlign: 'left',
                minWidth: 160,
                overflow: 'hidden',
              }}
            >
              {/* Tiny accent bar at top */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background:
                    'linear-gradient(90deg, #F3672A 0%, #FF8A50 100%)',
                }}
              />

              <div
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: 6,
                }}
              >
                Parents rate us
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 6,
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 800,
                    letterSpacing: '-1px',
                    fontStyle: 'italic',
                    color: '#F3672A',
                  }}
                >
                  4.9
                </span>
                <span style={{ display: 'inline-flex', gap: 1 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      fill="#F3672A"
                      style={{ color: '#F3672A' }}
                    />
                  ))}
                </span>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.55)',
                  marginTop: 8,
                  fontFamily: 'Georgia, "Playfair Display", serif',
                  fontStyle: 'italic',
                }}
              >
                from 200+ Las Vegas parents
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stat anchors strip beneath */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bkv2-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(243,103,42,0.18)',
            borderRadius: 16,
            overflow: 'hidden',
            backdropFilter: 'blur(6px)',
            marginTop: 80,
          }}
        >
          {STAT_ANCHORS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '20px 24px',
                borderRight:
                  i < STAT_ANCHORS.length - 1
                    ? '1px solid rgba(0,29,61,0.08)'
                    : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(22px, 3vw, 36px)',
                  fontWeight: 800,
                  color: '#F3672A',
                  letterSpacing: '-1px',
                  lineHeight: 1,
                  fontStyle: 'italic',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'rgba(0,29,61,0.55)',
                  marginTop: 6,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default BocaKidsV2
