import { motion } from 'framer-motion'
import { ArrowUpRight, Camera, User2 } from 'lucide-react'

interface Provider {
  initials: string
  name: string
  title: string
  credential: string
  slug: string
}

const PROVIDERS: Provider[] = [
  {
    initials: 'KL',
    name: 'Dr. Kelcey Loveland',
    title: 'Orthodontist',
    credential: 'Invisalign and braces for teens and adults across all 9 clinics.',
    slug: 'dr-kelcey-loveland',
  },
  {
    initials: 'CC',
    name: 'Dr. Chad Calder',
    title: 'Oral Surgeon',
    credential: 'Wisdom teeth, extractions, and bone grafting — patient comfort first.',
    slug: 'dr-charles-calder',
  },
  {
    initials: 'WD',
    name: 'Dr. Wyatt Dannels',
    title: 'General Dentist · Founder',
    credential: 'Founder of Boca Dental & Braces. Family dentistry across the Las Vegas Valley.',
    slug: 'dr-wyatt-dannels',
  },
  {
    initials: 'HL',
    name: 'Dr. Harrison Luu',
    title: 'General Dentist',
    credential: 'Family and restorative care — multilingual patient experience.',
    slug: 'dr-harrison-luu',
  },
]

export function MeetTheTeamV2() {
  return (
    <section
      id="about"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          left: -40,
          fontSize: 440,
          fontFamily: 'Georgia, "Playfair Display", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        team
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ── Editorial 2-column header ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mtv2-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 56,
          }}
        >
          <style>{`
            @media (max-width: 880px) {
              .mtv2-header { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 36px !important; }
            }
          `}</style>
          <div>
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
                The Boca team
              </div>
            </div>
            <h2
              style={{
                fontSize: 'clamp(40px, 5.5vw, 72px)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-2px',
                color: '#001D3D',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Experienced
              <br />
              providers.{' '}
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                compassionate
              </span>{' '}
              care.
            </h2>
          </div>

          <p
            style={{
              fontSize: 17,
              color: 'rgba(0,29,61,0.7)',
              lineHeight: 1.65,
              margin: 0,
              paddingBottom: 8,
              borderLeft: '2px solid #F3672A',
              paddingLeft: 18,
              fontStyle: 'italic',
            }}
          >
            <strong style={{ color: '#001D3D', fontWeight: 700 }}>
              Boca Dental &amp; Braces
            </strong>{' '}
            is a Las Vegas multi-specialty practice with 9 clinic locations.
            Our team includes general dentists, a board-eligible orthodontist,
            oral surgeons, periodontists, and pediatric specialists — all
            under one practice.
          </p>
        </motion.div>

        {/* ── Provider cards — magazine "contributors" ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18,
            marginBottom: 56,
          }}
        >
          {PROVIDERS.map((p, i) => {
            const numeral = String(i + 1).padStart(2, '0')
            return (
              <motion.a
                key={p.slug}
                href={`/about-us/dentists/${p.slug}/`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                style={{
                  background: 'white',
                  border: '1px solid rgba(0,29,61,0.08)',
                  borderRadius: 20,
                  padding: '32px 26px 28px',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: 380,
                  transition: 'all 0.25s ease',
                  boxShadow: '0 2px 8px rgba(0,29,61,0.04)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(-6px)'
                  el.style.boxShadow = '0 24px 48px rgba(0,29,61,0.12)'
                  el.style.borderColor = 'rgba(243,103,42,0.35)'
                  const arrow = el.querySelector(
                    '[data-arrow]',
                  ) as HTMLElement
                  if (arrow) {
                    arrow.style.transform = 'translateX(4px) rotate(-12deg)'
                    arrow.style.color = '#F3672A'
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 2px 8px rgba(0,29,61,0.04)'
                  el.style.borderColor = 'rgba(0,29,61,0.08)'
                  const arrow = el.querySelector(
                    '[data-arrow]',
                  ) as HTMLElement
                  if (arrow) {
                    arrow.style.transform = 'translateX(0) rotate(0deg)'
                    arrow.style.color = '#001D3D'
                  }
                }}
              >
                {/* Italic serif numeral in the top-right corner */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 22,
                    fontSize: 32,
                    fontFamily: 'Georgia, "Playfair Display", serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    color: 'rgba(243,103,42,0.4)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {numeral}
                </div>

                {/* Portrait placeholder — soft peach circle */}
                <div
                  style={{
                    position: 'relative',
                    width: 110,
                    height: 110,
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background:
                        'radial-gradient(circle at 35% 25%, #FFE4D6 0%, #FFCBA4 100%)',
                      border: '2px dashed rgba(243,103,42,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <User2
                      size={42}
                      style={{ color: 'rgba(0,29,61,0.4)' }}
                    />
                  </div>
                  {/* Camera icon = "real photo coming" */}
                  <div
                    aria-label="Real headshot coming soon"
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      right: 2,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'white',
                      border: '1.5px solid rgba(243,103,42,0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Camera size={14} style={{ color: '#F3672A' }} />
                  </div>
                  {/* Initials chip */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: -4,
                      left: -4,
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: '#001D3D',
                      color: 'white',
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {p.initials}
                  </div>
                </div>

                {/* Name */}
                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: '#001D3D',
                    letterSpacing: '-0.4px',
                    lineHeight: 1.15,
                    marginBottom: 6,
                  }}
                >
                  {p.name}
                </div>

                {/* Title in italic Georgia */}
                <div
                  style={{
                    fontSize: 13,
                    color: '#F3672A',
                    fontFamily: 'Georgia, "Playfair Display", serif',
                    fontStyle: 'italic',
                    fontWeight: 500,
                    marginBottom: 16,
                    letterSpacing: 0.1,
                  }}
                >
                  {p.title}
                </div>

                {/* Credential — magazine subhead */}
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: 'rgba(0,29,61,0.65)',
                    margin: '0 0 22px',
                    flexGrow: 1,
                  }}
                >
                  {p.credential}
                </p>

                {/* Footer read-bio link */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 14,
                    borderTop: '1px solid rgba(0,29,61,0.08)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                      color: '#001D3D',
                    }}
                  >
                    Read bio
                  </span>
                  <span
                    data-arrow
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      border: '1.5px solid rgba(0,29,61,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#001D3D',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* ── Full team CTA ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/about-us/dentists/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'white',
              color: '#001D3D',
              border: '2px solid #001D3D',
              borderRadius: 999,
              padding: '13px 28px',
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
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 12px 24px rgba(0,29,61,0.18)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'white'
              el.style.color = '#001D3D'
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            Meet our full team
            <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
          </a>
          <span
            style={{
              fontSize: 13,
              color: 'rgba(0,29,61,0.5)',
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontStyle: 'italic',
            }}
          >
            14 providers across 9 Las Vegas clinics
          </span>
        </motion.div>
      </div>
    </section>
  )
}

export default MeetTheTeamV2
