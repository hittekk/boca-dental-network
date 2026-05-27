import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronsLeftRight } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

/**
 * SmileTransformations — Treysyde homepage spec §7
 *
 * Phase-2 placeholder structure. When Frankie sends real before/after pairs,
 * swap each pair's `before`/`after` URLs in. Spec rules enforced in code:
 *   - 6-8 pairs (we ship 6)
 *   - Service mix: Invisalign, veneers, whitening, implants, smile makeover, pediatric
 *   - Caption format: "Service — duration/scope" only. No patient names. No clinic location.
 *   - Alt-text format: "[Service] before and after at Boca Dental Las Vegas."
 *   - NEVER use stock B&A photos — the placeholder UI clearly signals "image goes here".
 *
 * Theme prop adapts colors to each homepage variant (a/b/c).
 */

const ORANGE = '#F3672A'
const NAVY = '#001D3D'

type Theme = 'light' | 'cream' | 'dark'

interface Pair {
  service: string
  caption: string
  duration: string
  before?: string
  after?: string
}

// Fallback set when no transformations are in the database yet — keeps the
// section looking populated even with empty admin state.
const DEFAULT_PAIRS: Pair[] = [
  { service: 'Invisalign', caption: 'Invisalign', duration: '18 months' },
  { service: 'Veneers', caption: 'Veneers', duration: '6 teeth' },
  { service: 'Teeth whitening', caption: 'Whitening', duration: 'In-office' },
  { service: 'Dental implants', caption: 'Implant', duration: 'Single tooth' },
  { service: 'Smile makeover', caption: 'Smile makeover', duration: 'Veneers + whitening' },
  { service: 'Pediatric dentistry', caption: 'Pediatric', duration: 'Full preventive course' },
]

const TREATMENT_LABELS: Record<string, { service: string; caption: string }> = {
  invisalign:     { service: 'Invisalign',           caption: 'Invisalign' },
  veneers:        { service: 'Veneers',              caption: 'Veneers' },
  whitening:      { service: 'Teeth whitening',      caption: 'Whitening' },
  implants:       { service: 'Dental implants',      caption: 'Implant' },
  crowns:         { service: 'Crowns',               caption: 'Crown' },
  general:        { service: 'General dentistry',    caption: 'Restoration' },
  restorative:    { service: 'Restorative',          caption: 'Restorative' },
  orthodontics:   { service: 'Orthodontics',         caption: 'Ortho' },
}

function useTransformations(): Pair[] {
  const [pairs, setPairs] = useState<Pair[]>(DEFAULT_PAIRS)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let cancelled = false

    ;(async () => {
      try {
        const { data } = await supabase
          .from('transformations')
          .select('title, treatment_type, treatment_duration, before_image_url, after_image_url, is_featured, sort_order')
          .eq('is_published', true)
          .order('is_featured', { ascending: false })
          .order('sort_order', { ascending: true })
          .limit(6)

        if (cancelled || !data || data.length === 0) return

        const mapped: Pair[] = data.map((t) => {
          const labels = TREATMENT_LABELS[t.treatment_type ?? 'general'] ?? {
            service: t.title,
            caption: t.title,
          }
          return {
            service:  labels.service,
            caption:  labels.caption,
            duration: t.treatment_duration ?? '',
            before:   t.before_image_url ?? undefined,
            after:    t.after_image_url ?? undefined,
          }
        })

        // Pad with defaults if fewer than 6 in DB, so the grid stays full
        while (mapped.length < 6) {
          mapped.push(DEFAULT_PAIRS[mapped.length])
        }

        setPairs(mapped)
      } catch (err) {
        console.warn('[SmileTransformations] fetch failed:', err)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return pairs
}

export function SmileTransformations({ theme = 'light' }: { theme?: Theme }) {
  const PAIRS = useTransformations()
  const palette = (() => {
    // H2 typography per theme — mirrors the H2 scale used by the variant's
    // other section headlines so this section visually belongs to the page.
    //   light  → matches Variant A (Services/WhyBoca/Testimonials)
    //   cream  → matches Variant B (WhyBocaV2/MeetTheTeamV2/TestimonialsV2)
    //   dark   → matches Variant C (WhyBocaV3/ServicesV3)
    if (theme === 'dark')
      return {
        bg: '#0A0A0F',
        text: 'white',
        textMuted: 'rgba(255,255,255,0.7)',
        textFaint: 'rgba(255,255,255,0.45)',
        eyebrow: ORANGE,
        cardBg:
          'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
        cardBorder: 'rgba(255,255,255,0.1)',
        slotBg:
          'linear-gradient(160deg, rgba(243,103,42,0.16) 0%, rgba(243,103,42,0.04) 60%, rgba(10,10,15,0.4) 100%)',
        slotBorder: 'rgba(243,103,42,0.2)',
        slotText: 'rgba(255,255,255,0.5)',
        accentSerif: false,
        h2Size:          'clamp(40px, 4.6vw, 62px)',
        h2LineHeight:    0.95,
        h2LetterSpacing: '-1.6px',
      }
    if (theme === 'cream')
      return {
        bg: '#FFFAF6',
        text: '#001D3D',
        textMuted: 'rgba(0,29,61,0.7)',
        textFaint: 'rgba(0,29,61,0.5)',
        eyebrow: ORANGE,
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(0,29,61,0.08)',
        slotBg:
          'linear-gradient(160deg, #F8E8DE 0%, #F0E0D2 60%, #F3672A11 100%)',
        slotBorder: 'rgba(243,103,42,0.15)',
        slotText: 'rgba(0,29,61,0.45)',
        accentSerif: true,
        h2Size:          'clamp(40px, 5.5vw, 72px)',
        h2LineHeight:    0.95,
        h2LetterSpacing: '-2px',
      }
    return {
      bg: '#FFFFFF',
      text: NAVY,
      textMuted: 'rgba(0,29,61,0.7)',
      textFaint: 'rgba(0,29,61,0.5)',
      eyebrow: ORANGE,
      cardBg: '#FFFFFF',
      cardBorder: 'rgba(0,29,61,0.08)',
      slotBg:
        'linear-gradient(160deg, #FFF2EA 0%, #FFE5D3 60%, rgba(243,103,42,0.08) 100%)',
      slotBorder: 'rgba(243,103,42,0.18)',
      slotText: 'rgba(0,29,61,0.45)',
      accentSerif: false,
      h2Size:          'clamp(28px, 4vw, 44px)',
      h2LineHeight:    1.15,
      h2LetterSpacing: '-1px',
    }
  })()

  return (
    <section
      style={{
        background: palette.bg,
        padding: '96px 32px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        {/* Eyebrow + H2 + subhead */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 56, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: palette.eyebrow,
              marginBottom: 16,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Sparkles size={13} color={palette.eyebrow} />
            Smile transformations
          </div>
          <h2
            style={{
              fontSize:      palette.h2Size,
              fontWeight:    800,
              lineHeight:    palette.h2LineHeight,
              letterSpacing: palette.h2LetterSpacing,
              color:         palette.text,
              margin:        '0 0 18px',
              textTransform: 'uppercase',
            }}
          >
            Real results from real{' '}
            <span style={{ color: palette.eyebrow, fontStyle: theme === 'cream' ? 'italic' : 'normal' }}>
              Boca Dental &amp; Braces
            </span>{' '}
            patients.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: palette.textMuted,
              margin: 0,
              fontStyle: theme === 'cream' ? 'italic' : 'normal',
              fontFamily: theme === 'cream' ? 'Georgia, "Playfair Display", serif' : 'inherit',
              textWrap: 'balance' as React.CSSProperties['textWrap'],
              maxWidth: 680,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Cosmetic, orthodontic, restorative, and pediatric results from the
            same chairs our patients sit in every day.
          </p>
        </motion.div>

        {/* Grid of 6 before/after pairs */}
        <div
          className="smile-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            marginBottom: 56,
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              .smile-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
            }
            @media (max-width: 560px) {
              .smile-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {PAIRS.map((pair, i) => {
            const alt = `${pair.service} before and after at Boca Dental Las Vegas.`
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                style={{
                  background: palette.cardBg,
                  border: `1px solid ${palette.cardBorder}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Interactive before/after comparison slider */}
                <BeforeAfterSlider
                  before={pair.before}
                  after={pair.after}
                  alt={alt}
                  palette={palette}
                />

                {/* Caption row */}
                <div
                  style={{
                    padding: '14px 18px 16px',
                    borderTop: `1px solid ${palette.cardBorder}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: palette.text,
                        letterSpacing: '-0.2px',
                        lineHeight: 1.2,
                      }}
                    >
                      {pair.caption}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: palette.textFaint,
                        marginTop: 2,
                      }}
                    >
                      {pair.duration}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: palette.eyebrow,
                      background:
                        theme === 'dark'
                          ? 'rgba(243,103,42,0.12)'
                          : theme === 'cream'
                            ? 'rgba(243,103,42,0.10)'
                            : 'rgba(243,103,42,0.10)',
                      border: `1px solid rgba(243,103,42,0.25)`,
                      borderRadius: 999,
                      padding: '3px 9px',
                      fontFamily:
                        'ui-monospace, "SF Mono", Menlo, monospace',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Boca
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Section CTA — per Treysyde spec */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <p
            style={{
              fontSize: 17,
              color: palette.textMuted,
              margin: 0,
              maxWidth: 600,
              lineHeight: 1.5,
              fontStyle: theme === 'cream' ? 'italic' : 'normal',
              fontFamily: theme === 'cream' ? 'Georgia, "Playfair Display", serif' : 'inherit',
            }}
          >
            Ready for your own transformation? Book a free consultation at any
            of our 9 Las Vegas locations.
          </p>
          <a
            href="/request-consultation"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: ORANGE,
              color: 'white',
              borderRadius: 8,
              padding: '14px 28px',
              fontSize: 14,
              fontWeight: 800,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              boxShadow: '0 14px 32px rgba(243,103,42,0.32)',
              transition: 'transform 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = '#d95a22'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = ORANGE
            }}
          >
            Book Now
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function BeforeAfterSlider({
  before,
  after,
  alt,
  palette,
}: {
  before?: string
  after?: string
  alt: string
  palette: {
    slotBg: string
    slotBorder: string
    slotText: string
    eyebrow: string
  }
}) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const setFromClientX = (clientX: number) => {
    const node = containerRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, pct)))
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = e.currentTarget
    try {
      target.setPointerCapture(e.pointerId)
    } catch {
      // Some browsers throw if pointer is no longer active; safe to ignore.
    }
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 0 && e.pointerType === 'mouse') return
    setFromClientX(e.clientX)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Safe to ignore
    }
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-label={alt}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4))
        if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4))
      }}
      style={{
        position: 'relative',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        cursor: 'ew-resize',
        userSelect: 'none',
        touchAction: 'none',
        background: '#0A0A0F',
      }}
    >
      {/* AFTER (full layer underneath) */}
      <SlotImage src={after} alt={alt} palette={palette} />

      {/* BEFORE (clipped to left X%) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      >
        <SlotImage src={before} alt={alt} palette={palette} />
      </div>

      {/* Corner labels */}
      <CornerLabel position="left" palette={palette}>
        Before
      </CornerLabel>
      <CornerLabel position="right" palette={palette}>
        After
      </CornerLabel>

      {/* Vertical divider + drag handle */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: 'white',
          transform: 'translateX(-1px)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.18), 0 0 20px rgba(0,0,0,0.45)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: palette.eyebrow,
            boxShadow:
              '0 4px 10px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06) inset',
          }}
        >
          <ChevronsLeftRight size={16} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  )
}

function SlotImage({
  src,
  alt,
  palette,
}: {
  src?: string
  alt: string
  palette: { slotBg: string; slotText: string }
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    )
  }
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: palette.slotBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: palette.slotText,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        pointerEvents: 'none',
      }}
    >
      Photo coming soon
    </div>
  )
}

function CornerLabel({
  position,
  palette,
  children,
}: {
  position: 'left' | 'right'
  palette: { eyebrow: string }
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        [position]: 10,
        background: palette.eyebrow,
        color: 'white',
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        padding: '3px 9px',
        borderRadius: 4,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {children}
    </div>
  )
}

export default SmileTransformations
