import { motion } from 'framer-motion'
import { ArrowUpRight, Stethoscope } from 'lucide-react'

type Theme = 'light' | 'dark' | 'cream'

interface Provider {
  initials: string
  name: string
  title: string
  credential: string
  slug: string
  /** Accent color for the avatar gradient */
  accent: string
}

const PROVIDERS: Provider[] = [
  {
    initials: 'KL',
    name: 'Dr. Kelcey Loveland',
    title: 'Orthodontist',
    credential: 'Invisalign + braces · teen and adult ortho',
    slug: 'dr-kelcey-loveland',
    accent: '#F3672A',
  },
  {
    initials: 'CC',
    name: 'Dr. Charles Calder',
    title: 'Oral Surgeon',
    credential: 'Wisdom teeth · extractions · bone grafting',
    slug: 'dr-charles-calder',
    accent: '#162E7A',
  },
  {
    initials: 'WD',
    name: 'Dr. Wyatt Dannels',
    title: 'General Dentist · Founder',
    credential: 'Founded Boca in 2006 · 20 years in practice',
    slug: 'dr-wyatt-dannels',
    accent: '#F3672A',
  },
  {
    initials: 'HL',
    name: 'Dr. Harrison Luu',
    title: 'General Dentist',
    credential: 'Family + restorative · multilingual patient care',
    slug: 'dr-harrison-luu',
    accent: '#162E7A',
  },
]

export function MeetTheTeam({ theme = 'light' }: { theme?: Theme }) {
  const isDark = theme === 'dark'
  const sectionBg = isDark ? '#0A0A0F' : theme === 'cream' ? '#FAFAFA' : '#FAFAFA'
  const headingColor = isDark ? 'white' : '#0A0A0F'
  const bodyColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,15,0.7)'
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'white'
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(10,10,15,0.06)'
  const cardTextColor = isDark ? 'white' : '#0A0A0F'
  const cardSubColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(10,10,15,0.6)'
  const ctaBg = isDark ? '#F3672A' : '#0A0A0F'

  return (
    <section
      id="meet-the-team"
      style={{
        background: sectionBg,
        padding: '96px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'flex-start',
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: isDark ? 'rgba(243,103,42,0.12)' : 'rgba(243,103,42,0.08)',
                border: '1px solid rgba(243,103,42,0.22)',
                borderRadius: 999,
                padding: '8px 16px',
                marginBottom: 22,
              }}
            >
              <Stethoscope size={12} color="#F3672A" />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                Our Team
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-1.6px',
                color: headingColor,
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              Experienced providers.
              <br />
              <span style={{ color: '#F3672A' }}>Compassionate care.</span>
            </h2>
          </div>

          {/* GEO-optimized about paragraph */}
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: bodyColor,
              margin: 0,
            }}
          >
            Boca Dental & Braces is a Las Vegas-based multi-specialty dental
            practice serving patients across 9 clinic locations in the greater
            Las Vegas, Nevada area. Our team includes licensed general
            dentists, a board-eligible orthodontist, oral and maxillofacial
            surgeons, periodontists, and pediatric dental specialists — all
            working under one unified practice to provide comprehensive dental
            care for patients of all ages. We believe access to high-quality
            dental care should not depend on your zip code, schedule, or
            budget.
          </p>
        </motion.div>

        {/* Provider grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {PROVIDERS.map((provider, i) => (
            <motion.a
              key={provider.slug}
              href={`/about-us/dentists/${provider.slug}/`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -6 }}
              style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                borderRadius: 18,
                padding: '32px 28px 26px',
                textDecoration: 'none',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                boxShadow: isDark ? 'none' : '0 2px 8px rgba(10,10,15,0.04)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = isDark
                  ? '0 16px 40px rgba(243,103,42,0.18)'
                  : '0 16px 40px rgba(10,10,15,0.1)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#F3672A'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = isDark
                  ? 'none'
                  : '0 2px 8px rgba(10,10,15,0.04)'
                ;(e.currentTarget as HTMLElement).style.borderColor = cardBorder
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${provider.accent} 0%, ${
                    provider.accent === '#F3672A' ? '#FF8A50' : '#3a52a6'
                  } 100%)`,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  marginBottom: 22,
                  boxShadow: `0 8px 20px ${provider.accent}45`,
                }}
              >
                {provider.initials}
              </div>

              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: cardTextColor,
                  letterSpacing: '-0.3px',
                  lineHeight: 1.15,
                  marginBottom: 6,
                }}
              >
                {provider.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                  marginBottom: 14,
                }}
              >
                {provider.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: cardSubColor,
                  lineHeight: 1.6,
                  marginBottom: 24,
                  minHeight: 60,
                }}
              >
                {provider.credential}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  color: '#F3672A',
                }}
              >
                Read bio
                <ArrowUpRight size={13} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <a
            href="/about-us/dentists/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: ctaBg,
              color: 'white',
              borderRadius: 999,
              padding: '15px 30px',
              fontSize: 13,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#F3672A'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = ctaBg
            }}
          >
            Meet our full team of dental providers
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default MeetTheTeam
