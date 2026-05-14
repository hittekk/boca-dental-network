import { motion } from 'framer-motion'
import { ArrowUpRight, User2, Camera, Star } from 'lucide-react'

interface Provider {
  initials: string
  name: string
  title: string
  years: string
  reviewCount: string
  rating: string
  specialties: string[]
  slug: string
  badge?: string
}

const PROVIDERS: Provider[] = [
  {
    initials: 'WD',
    name: 'Dr. Wyatt Dannels',
    title: 'General Dentist · Founder',
    years: '20',
    reviewCount: '480+',
    rating: '4.9',
    specialties: ['General', 'Family', 'Restorative'],
    slug: 'dr-wyatt-dannels',
    badge: 'Founder',
  },
  {
    initials: 'KL',
    name: 'Dr. Kelcey Loveland',
    title: 'Orthodontist',
    years: '12',
    reviewCount: '320+',
    rating: '4.9',
    specialties: ['Invisalign', 'Braces', 'Teen + Adult'],
    slug: 'dr-kelcey-loveland',
  },
  {
    initials: 'CC',
    name: 'Dr. Charles Calder',
    title: 'Oral & Maxillofacial Surgeon',
    years: '15',
    reviewCount: '210+',
    rating: '4.9',
    specialties: ['Wisdom teeth', 'Extractions', 'Bone grafting'],
    slug: 'dr-charles-calder',
  },
  {
    initials: 'HL',
    name: 'Dr. Harrison Luu',
    title: 'General Dentist',
    years: '8',
    reviewCount: '190+',
    rating: '4.8',
    specialties: ['Family', 'Restorative', 'Multilingual'],
    slug: 'dr-harrison-luu',
  },
]

export function MeetTheTeamV3() {
  return (
    <section
      id="doctors"
      style={{
        background: '#0A0A0F',
        padding: '140px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Backdrop number watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -30,
          right: -20,
          fontSize: 'clamp(220px, 26vw, 420px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.04)',
          lineHeight: 0.85,
          letterSpacing: '-14px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        07
      </div>

      {/* Grid pattern */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 90%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 48,
            paddingBottom: 22,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#F3672A',
                marginBottom: 22,
                fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              }}
            >
              [ 07 ] · The Team
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 4.6vw, 62px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-1.8px',
                color: 'white',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>The people</span>
              <br />
              <span style={{ whiteSpace: 'nowrap' }}>
                behind the{' '}
                <span style={{ color: '#F3672A' }}>chair.</span>
              </span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.65,
              margin: 0,
              maxWidth: 460,
            }}
          >
            14 licensed providers across 9 clinics. General dentists, a
            board-eligible orthodontist, oral surgeons, periodontists, and
            pediatric specialists — all working under one practice.
          </p>
        </motion.div>

        {/* ── Provider registry — full-width horizontal rows ── */}
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          {/* Header bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 80px 1.4fr 1.2fr 1fr 60px',
              gap: 20,
              alignItems: 'center',
              padding: '14px 26px',
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            }}
          >
            <div>/ IDX</div>
            <div>Provider</div>
            <div>Name · Title</div>
            <div>Specialties</div>
            <div>Stats</div>
            <div style={{ textAlign: 'right' }}>Bio</div>
          </div>

          {PROVIDERS.map((p, i) => (
            <motion.a
              key={p.slug}
              href={`/about-us/dentists/${p.slug}/`}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 80px 1.4fr 1.2fr 1fr 60px',
                gap: 20,
                alignItems: 'center',
                padding: '24px 26px',
                textDecoration: 'none',
                color: 'white',
                borderBottom:
                  i < PROVIDERS.length - 1
                    ? '1px solid rgba(255,255,255,0.06)'
                    : 'none',
                transition: 'background 0.25s ease',
                position: 'relative',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(243,103,42,0.05)'
                const arrow = el.querySelector('[data-arrow]') as HTMLElement
                if (arrow) {
                  arrow.style.transform = 'translateX(4px) rotate(-12deg)'
                  arrow.style.background = '#F3672A'
                  arrow.style.borderColor = '#F3672A'
                  arrow.style.color = 'white'
                }
                const num = el.querySelector('[data-idx]') as HTMLElement
                if (num) num.style.color = '#F3672A'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
                const arrow = el.querySelector('[data-arrow]') as HTMLElement
                if (arrow) {
                  arrow.style.transform = 'translateX(0) rotate(0deg)'
                  arrow.style.background = 'transparent'
                  arrow.style.borderColor = 'rgba(255,255,255,0.25)'
                  arrow.style.color = 'white'
                }
                const num = el.querySelector('[data-idx]') as HTMLElement
                if (num) num.style.color = 'rgba(255,255,255,0.4)'
              }}
            >
              {/* Index */}
              <div
                data-idx
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                  transition: 'color 0.25s ease',
                }}
              >
                / {String(i + 1).padStart(2, '0')}
              </div>

              {/* Avatar */}
              <div style={{ position: 'relative', width: 56, height: 56 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle at 35% 25%, rgba(243,103,42,0.18) 0%, rgba(243,103,42,0.04) 100%)',
                    border: '1.5px dashed rgba(243,103,42,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User2 size={22} style={{ color: 'rgba(255,255,255,0.45)' }} />
                </div>
                {/* Camera badge */}
                <div
                  aria-label="Real headshot coming soon"
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#0A0A0F',
                    border: '1.5px solid rgba(243,103,42,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Camera size={9} style={{ color: '#F3672A' }} />
                </div>
                {/* Initials chip */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: -4,
                    left: -4,
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    background: p.badge ? '#F3672A' : '#162E7A',
                    color: 'white',
                    padding: '3px 6px',
                    borderRadius: 4,
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                  }}
                >
                  {p.initials}
                </div>
              </div>

              {/* Name + title */}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      color: 'white',
                      letterSpacing: '-0.3px',
                      lineHeight: 1.1,
                    }}
                  >
                    {p.name}
                  </div>
                  {p.badge && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 800,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        background: '#F3672A',
                        color: 'white',
                        borderRadius: 999,
                        padding: '2px 7px',
                        fontFamily:
                          'ui-monospace, "SF Mono", Menlo, monospace',
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.55)',
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                    letterSpacing: 0.4,
                  }}
                >
                  {p.title}
                </div>
              </div>

              {/* Specialties */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                }}
              >
                {p.specialties.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 999,
                      padding: '4px 9px',
                      color: 'rgba(255,255,255,0.75)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Stats column */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  <Star
                    size={11}
                    fill="#F3672A"
                    style={{ color: '#F3672A', flexShrink: 0 }}
                  />
                  <span style={{ fontWeight: 800, color: 'white' }}>
                    {p.rating}
                  </span>
                  <span
                    style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily:
                        'ui-monospace, "SF Mono", Menlo, monospace',
                      fontSize: 11,
                    }}
                  >
                    · {p.reviewCount}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily:
                      'ui-monospace, "SF Mono", Menlo, monospace',
                    letterSpacing: 0.3,
                  }}
                >
                  {p.years} yrs practicing
                </div>
              </div>

              {/* Arrow */}
              <div
                data-arrow
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: 'transparent',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  justifySelf: 'end',
                  transition: 'all 0.25s ease',
                }}
              >
                <ArrowUpRight size={16} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Footer — meet full team CTA + count ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            marginTop: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
              letterSpacing: 0.4,
            }}
          >
            / SHOWING 4 OF 14 PROVIDERS · ACROSS 9 LV CLINICS
          </div>
          <a
            href="/about-us/dentists/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#F3672A',
              color: 'white',
              borderRadius: 8,
              padding: '14px 26px',
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              boxShadow: '0 12px 28px rgba(243,103,42,0.32)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#d95a22'
              el.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#F3672A'
              el.style.transform = 'translateY(0)'
            }}
          >
            View all 14 providers
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default MeetTheTeamV3
