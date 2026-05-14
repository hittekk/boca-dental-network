import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Star,
  Smile,
  Sparkles,
  Crown,
  Wrench,
  Activity,
  Baby,
  Moon,
  Stethoscope,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { INITIAL_DATA } from '../../data/initialData'

// Lucide icon per service slug (replaces the older custom-svg map whose keys
// didn't match the real slugs).
const SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  'general-dentistry':     Smile,
  'cosmetic-dentistry':    Sparkles,
  'restorative-dentistry': Crown,
  'dental-implants':       Wrench,
  'orthodontics':          Activity,
  'pediatric-dentistry':   Baby,
  'sedation-dentistry':    Moon,
  'oral-surgery':          Stethoscope,
  'periodontal':           ShieldCheck,
}

// Bento layout — each card has a hand-tuned color scheme + size class.
// Featured card spans 2 cols; rest are single.
// Keyed by the real service slugs from initialData.ts.
// XL tiles at positions 1 (general), 5 (orthodontics), 9 (periodontal) so
// the 9-item bento fills a 4-col grid in 3 clean rows with no straggler.
const TILE_STYLES: Record<
  string,
  { bg: string; fg: string; subFg: string; size: 'xl' | 'md'; eyebrow: string }
> = {
  'general-dentistry': {
    bg: '#001D3D',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.65)',
    size: 'xl',
    eyebrow: 'Most popular',
  },
  'cosmetic-dentistry': {
    bg: '#FFF4ED',
    fg: '#001D3D',
    subFg: 'rgba(0,29,61,0.6)',
    size: 'md',
    eyebrow: 'Cosmetic',
  },
  'restorative-dentistry': {
    bg: '#162E7A',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.7)',
    size: 'md',
    eyebrow: 'Restorative',
  },
  'dental-implants': {
    bg: '#FFF4ED',
    fg: '#001D3D',
    subFg: 'rgba(0,29,61,0.6)',
    size: 'md',
    eyebrow: 'Implants',
  },
  orthodontics: {
    bg: '#F3672A',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.85)',
    size: 'xl',
    eyebrow: 'Boca & Braces',
  },
  'pediatric-dentistry': {
    bg: '#001D3D',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.65)',
    size: 'md',
    eyebrow: 'Boca Kids',
  },
  'sedation-dentistry': {
    bg: '#FFF4ED',
    fg: '#001D3D',
    subFg: 'rgba(0,29,61,0.6)',
    size: 'md',
    eyebrow: 'Comfort care',
  },
  'oral-surgery': {
    bg: '#001D3D',
    fg: 'white',
    subFg: 'rgba(255,255,255,0.65)',
    size: 'md',
    eyebrow: 'Surgery',
  },
  periodontal: {
    bg: '#FFE4D6',
    fg: '#001D3D',
    subFg: 'rgba(0,29,61,0.6)',
    size: 'xl',
    eyebrow: 'Specialty',
  },
}

export function ServicesV2() {
  return (
    <section
      id="services"
      style={{
        background: '#FFFAF6',
        padding: '120px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Editorial backdrop word — "ALL" */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 60,
          right: -50,
          fontSize: 'clamp(180px, 22vw, 320px)',
          fontWeight: 800,
          color: 'rgba(243,103,42,0.05)',
          lineHeight: 0.85,
          letterSpacing: '-12px',
          pointerEvents: 'none',
          userSelect: 'none',
          textTransform: 'uppercase',
        }}
      >
        ALL
      </div>

      {/* Soft radial glow — bottom left */}
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
        style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="srvv2-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 56,
            alignItems: 'flex-end',
            marginBottom: 40,
          }}
        >
          <style>{`
            @media (max-width: 880px) {
              .srvv2-header { grid-template-columns: 1fr !important; gap: 24px !important; }
              .srvv2-stats { grid-template-columns: repeat(2, 1fr) !important; }
              .srvv2-stats > div:nth-child(2) { border-right: none !important; }
              .srvv2-stats > div:nth-child(1), .srvv2-stats > div:nth-child(2) { border-bottom: 1px solid rgba(0,29,61,0.08) !important; }
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
                Everything in one place
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
              From a routine
              <br />
              cleaning to a{' '}
              <span style={{ color: '#F3672A', fontStyle: 'italic' }}>
                full mouth
              </span>{' '}
              rebuild.
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
            Whatever your teeth need this year, we do it under one roof —
            general dentistry, kids, orthodontics, implants, and emergencies all
            staffed at every Boca office.
          </p>
        </motion.div>

        {/* Stat anchors */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="srvv2-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(243,103,42,0.18)',
            borderRadius: 16,
            overflow: 'hidden',
            backdropFilter: 'blur(6px)',
            marginBottom: 48,
          }}
        >
          {[
            { value: '9', label: 'Categories' },
            { value: '40+', label: 'Procedures' },
            { value: '1', label: 'Roof' },
            { value: 'Same-day', label: 'Emergencies' },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              style={{
                padding: '20px 24px',
                borderRight:
                  i < arr.length - 1
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

        {/* Bento grid */}
        <div
          className="srv-v2-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}
        >
          <style>{`
            @media (max-width: 980px) {
              .srv-v2-grid { grid-template-columns: repeat(2, 1fr) !important; }
              .srv-v2-tile { grid-column: span 1 !important; min-height: 220px !important; padding: 24px 22px !important; }
            }
            @media (max-width: 560px) {
              .srv-v2-grid { grid-template-columns: 1fr !important; }
            }
            .srv-v2-tile { transition: transform 0.3s ease, box-shadow 0.3s ease; }
            .srv-v2-tile:hover { transform: translateY(-6px); box-shadow: 0 22px 50px rgba(0,29,61,0.20) !important; }
            .srv-v2-tile:hover .srv-v2-watermark { transform: rotate(-8deg) scale(1.08); opacity: 0.14 !important; }
            .srv-v2-tile:hover .srv-v2-arrow { transform: translate(3px, -3px); }
            .srv-v2-tile:hover .srv-v2-learn { gap: 10px !important; }
          `}</style>
          {INITIAL_DATA.services.map((service, i) => {
            const Icon = SERVICE_ICON_MAP[service.slug]
            const tile = TILE_STYLES[service.slug] ?? TILE_STYLES.general
            const span = tile.size === 'xl' ? 2 : 1
            const isFeatured = tile.eyebrow === 'Most popular'
            const idx = String(i + 1).padStart(2, '0')
            const fgIsWhite = tile.fg === 'white'
            const watermarkColor = fgIsWhite ? 'rgba(255,255,255,0.95)' : '#F3672A'
            return (
              <motion.a
                key={service.slug}
                href={`/${service.slug}/`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className="srv-v2-tile"
                style={{
                  gridColumn: `span ${span}`,
                  // Subtle gradient overlay on top of solid color for depth
                  background:
                    tile.bg === '#FFF4ED' || tile.bg === '#FFE4D6'
                      ? `linear-gradient(160deg, ${tile.bg} 0%, ${tile.bg === '#FFF4ED' ? '#FFE9D8' : '#FFD2B5'} 100%)`
                      : `linear-gradient(160deg, ${tile.bg} 0%, ${tile.bg === '#F3672A' ? '#d95a22' : tile.bg === '#001D3D' ? '#0A2B5C' : '#1F3D9F'} 100%)`,
                  color: tile.fg,
                  borderRadius: 18,
                  padding: tile.size === 'xl' ? '36px 32px 32px' : '26px 24px 24px',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: tile.size === 'xl' ? 280 : 220,
                  border:
                    tile.bg === '#FFF4ED' || tile.bg === '#FFE4D6'
                      ? '1px solid rgba(243,103,42,0.18)'
                      : '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  boxShadow:
                    tile.bg === '#FFF4ED' || tile.bg === '#FFE4D6'
                      ? '0 4px 14px rgba(0,29,61,0.04)'
                      : '0 4px 14px rgba(0,29,61,0.12)',
                }}
              >
                {/* Watermark icon — large faint version in bottom-right */}
                {Icon && (
                  <div
                    aria-hidden
                    className="srv-v2-watermark"
                    style={{
                      position: 'absolute',
                      bottom: tile.size === 'xl' ? -40 : -28,
                      right: tile.size === 'xl' ? -32 : -22,
                      opacity: 0.08,
                      transition: 'all 0.4s ease',
                      pointerEvents: 'none',
                      color: watermarkColor,
                    }}
                  >
                    <Icon
                      size={tile.size === 'xl' ? 240 : 170}
                      strokeWidth={1.4}
                    />
                  </div>
                )}

                {/* Top row: eyebrow + foreground icon */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    {isFeatured && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '3px 8px 3px 6px',
                          background: '#F3672A',
                          color: 'white',
                          borderRadius: 999,
                          fontSize: 9,
                          fontWeight: 800,
                          letterSpacing: 1.2,
                          textTransform: 'uppercase',
                        }}
                      >
                        <Star size={10} fill="white" strokeWidth={0} />
                        Featured
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        color: fgIsWhite ? 'rgba(255,255,255,0.55)' : '#F3672A',
                      }}
                    >
                      {tile.eyebrow}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        color: fgIsWhite ? 'rgba(255,255,255,0.4)' : 'rgba(0,29,61,0.4)',
                        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
                      }}
                    >
                      N° {idx}
                    </span>
                    {Icon && (
                      <div
                        style={{
                          width: tile.size === 'xl' ? 48 : 38,
                          height: tile.size === 'xl' ? 48 : 38,
                          borderRadius: 10,
                          background: fgIsWhite
                            ? 'rgba(255,255,255,0.10)'
                            : 'rgba(243,103,42,0.12)',
                          border: fgIsWhite
                            ? '1px solid rgba(255,255,255,0.15)'
                            : '1px solid rgba(243,103,42,0.22)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: fgIsWhite ? 'white' : '#F3672A',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={tile.size === 'xl' ? 22 : 18} strokeWidth={2} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom block: title + body + learn more */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      fontSize: tile.size === 'xl' ? 'clamp(28px, 3.4vw, 40px)' : 'clamp(20px, 2vw, 26px)',
                      fontWeight: 800,
                      letterSpacing: '-0.6px',
                      lineHeight: 1.05,
                      color: tile.fg,
                      marginBottom: 10,
                      textTransform: 'uppercase',
                    }}
                  >
                    {service.label}
                  </div>
                  <div
                    style={{
                      fontSize: tile.size === 'xl' ? 14 : 12.5,
                      color: tile.subFg,
                      lineHeight: 1.55,
                      marginBottom: 18,
                      maxWidth: tile.size === 'xl' ? 480 : 280,
                    }}
                  >
                    {service.desc}
                  </div>
                  {/* Learn-more row with hairline divider above */}
                  <div
                    className="srv-v2-learn"
                    style={{
                      paddingTop: 12,
                      borderTop: `1px solid ${fgIsWhite ? 'rgba(255,255,255,0.12)' : 'rgba(0,29,61,0.08)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: 1.2,
                      color: '#F3672A',
                      gap: 6,
                      transition: 'gap 0.25s ease',
                    }}
                  >
                    <span>Learn more</span>
                    <span
                      className="srv-v2-arrow"
                      style={{
                        display: 'inline-flex',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesV2
