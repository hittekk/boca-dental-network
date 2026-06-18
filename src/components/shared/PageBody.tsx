// ─────────────────────────────────────────────────────────────────────────────
// src/components/shared/PageBody.tsx
// Generic renderer for a CMS page: takes a page_template's field_schema + the
// page's saved content and renders each section's fields into a clean, readable
// page body. Shared by the public CustomPage and the in-admin preview so what
// you preview is exactly what publishes.
// ─────────────────────────────────────────────────────────────────────────────

const ORANGE = '#F3672A'
const NAVY = '#162E7A'
const DARK_NAVY = '#001D3D'

type Field = { key: string; type: string; label?: string; item_label?: string }
type Section = { id: string; title: string; fields: Field[] }
export type PageTemplateLike = { field_schema?: { sections?: Section[] } }
export type PageContentLike = Record<string, Record<string, unknown>>

const has = (v: unknown) =>
  v !== undefined && v !== null && !(typeof v === 'string' && v.trim() === '') &&
  !(Array.isArray(v) && v.length === 0)

const matches = (key: string, ...needles: string[]) =>
  needles.some((n) => key.toLowerCase().includes(n))

const str = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v))

/** Render one field's value based on its type + a few key-name heuristics. */
function renderField(field: Field, value: unknown, key: string) {
  if (!has(value)) return null

  // Images
  if (field.type === 'image' || matches(field.key, 'image', 'photo')) {
    return (
      <img
        key={key}
        src={str(value)}
        alt={field.label ?? ''}
        style={{ width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 16, margin: '8px 0 20px' }}
      />
    )
  }

  // Rich text (raw HTML from the editor)
  if (field.type === 'richtext') {
    return (
      <div
        key={key}
        style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(0,29,61,0.82)', margin: '0 0 18px' }}
        dangerouslySetInnerHTML={{ __html: str(value) }}
      />
    )
  }

  // Lists (benefits, steps, bullet points…)
  if (field.type === 'list' || Array.isArray(value)) {
    const items = (Array.isArray(value) ? value : [value]).map(str).filter((s) => s.trim())
    if (!items.length) return null
    return (
      <ul key={key} style={{ margin: '0 0 20px', paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, fontSize: 16, lineHeight: 1.6, color: 'rgba(0,29,61,0.82)' }}>
            <span style={{ color: ORANGE, fontWeight: 800, flexShrink: 0 }}>›</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    )
  }

  const text = str(value)

  // Eyebrow / badge / small tag
  if (matches(field.key, 'eyebrow', 'badge', 'tag', 'category')) {
    return (
      <div key={key} style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, margin: '0 0 12px' }}>
        {text}
      </div>
    )
  }

  // Headlines
  if (matches(field.key, 'headline', 'h1', 'title') && !matches(field.key, 'sub')) {
    return (
      <h2 key={key} style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 800, letterSpacing: '-0.6px', color: DARK_NAVY, margin: '0 0 16px', textTransform: 'uppercase' }}>
        {text}
      </h2>
    )
  }

  // Sub-headlines / supporting lines / intros / excerpts / messages
  if (matches(field.key, 'subheadline', 'supporting', 'intro', 'excerpt', 'message', 'subtitle')) {
    return (
      <p key={key} style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(0,29,61,0.7)', margin: '0 0 20px', maxWidth: 760 }}>
        {text}
      </p>
    )
  }

  // Call-to-action buttons (a *_cta_label paired with *_cta_link)
  if (matches(field.key, 'cta_label', 'button') && !matches(field.key, 'link')) return null // handled at section level

  // Trust line / small print
  if (matches(field.key, 'trust', 'last_updated', 'read_time', 'author')) {
    return (
      <p key={key} style={{ fontSize: 13, color: 'rgba(0,29,61,0.5)', margin: '0 0 14px' }}>
        {text}
      </p>
    )
  }

  // Testimonial quote
  if (matches(field.key, 'testimonial_quote', 'quote')) {
    return (
      <blockquote key={key} style={{ borderLeft: `3px solid ${ORANGE}`, paddingLeft: 18, margin: '0 0 12px', fontSize: 19, fontStyle: 'italic', color: DARK_NAVY }}>
        “{text}”
      </blockquote>
    )
  }

  // Default: body paragraph
  return (
    <p key={key} style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(0,29,61,0.82)', margin: '0 0 16px' }}>
      {text}
    </p>
  )
}

/** Find a CTA (label + link) pair within a section's content. */
function ctaPairs(section: Section, c: Record<string, unknown>) {
  const out: { label: string; link: string }[] = []
  for (const f of section.fields) {
    if (matches(f.key, 'cta_label') || (matches(f.key, 'button') && !matches(f.key, 'link'))) {
      const label = str(c?.[f.key])
      if (!label.trim()) continue
      const linkKey = f.key.replace(/label/i, 'link')
      const link = str(c?.[linkKey]) || '/request-consultation/'
      out.push({ label, link })
    }
  }
  return out
}

export default function PageBody({ template, content }: { template: PageTemplateLike; content: PageContentLike }) {
  const sections = template?.field_schema?.sections ?? []
  return (
    <div style={{ background: 'white' }}>
      {sections.map((section) => {
        const c = content?.[section.id] ?? {}
        const ctas = ctaPairs(section, c)
        const body = section.fields.map((f) => renderField(f, c[f.key], `${section.id}-${f.key}`)).filter(Boolean)
        if (!body.length && !ctas.length) return null
        return (
          <section key={section.id} style={{ padding: '40px 32px', borderTop: '1px solid #EEF2F7' }}>
            <div style={{ maxWidth: 880, margin: '0 auto' }}>
              {body}
              {ctas.length > 0 && (
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
                  {ctas.map((cta, i) => (
                    <a
                      key={i}
                      href={cta.link}
                      style={{ background: i === 0 ? ORANGE : 'transparent', color: i === 0 ? 'white' : NAVY, border: i === 0 ? 'none' : `2px solid ${NAVY}`, padding: '13px 26px', borderRadius: 8, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, textDecoration: 'none' }}
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
