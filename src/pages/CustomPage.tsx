// ─────────────────────────────────────────────────────────────────────────────
// src/pages/CustomPage.tsx
// Public renderer for admin-created CMS pages (the `pages` table). Resolves the
// current path to a published page and renders it inside the SAME chrome the
// site's core pages use (Shell + gradient hero + CTA strip), so a custom page
// looks native. Falls back to the homepage when no published page matches.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Shell, CTAStrip, usePageMeta } from './CorePages'
import PageBody, { type PageTemplateLike, type PageContentLike } from '../components/shared/PageBody'
import { supabase } from '../lib/supabase'

const ORANGE = '#F3672A'
const NAVY = '#162E7A'

export type FetchedPage = {
  id: string
  slug: string
  title: string
  content: PageContentLike
  meta_title: string | null
  meta_description: string | null
  template: PageTemplateLike & { name?: string; category?: string }
}

type State = { loading: boolean; page: FetchedPage | null }

/** Resolve a pathname to a published CMS page (single-segment slug only). */
export function usePageBySlug(pathname: string): State {
  const slug = pathname.replace(/^\/+|\/+$/g, '')
  const [state, setState] = useState<State>({ loading: true, page: null })
  useEffect(() => {
    let cancelled = false
    if (!slug || slug.includes('/')) {
      setState({ loading: false, page: null })
      return
    }
    setState({ loading: true, page: null })
    ;(async () => {
      const { data } = await supabase
        .from('pages')
        .select('id, slug, title, content, meta_title, meta_description, template:page_templates(*)')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()
      if (cancelled) return
      setState({ loading: false, page: (data as FetchedPage | null) ?? null })
    })()
    return () => {
      cancelled = true
    }
  }, [slug])
  return state
}

export function CustomPage({ page }: { page: FetchedPage }) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const breadcrumbSchema = usePageMeta({
    title: page.meta_title || page.title,
    description: page.meta_description || `${page.title} — Boca Dental and Braces.`,
    url: `${origin}/${page.slug}/`,
    breadcrumb: [{ name: 'Home', url: `${origin}/` }, { name: page.title }],
  })

  // Make sure the title reflects the page even if usePageMeta hasn't run yet.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [page.id])

  return (
    <Shell>
      <section style={{ background: 'linear-gradient(180deg, #F7F9FC 0%, white 65%)', padding: '160px 32px 48px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'rgba(0,29,61,0.55)', marginBottom: 22, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span style={{ color: ORANGE, fontWeight: 700 }}>{page.title}</span>
          </nav>
          <h1 style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', fontWeight: 800, letterSpacing: '-1.2px', color: NAVY, margin: 0, textTransform: 'uppercase' }}>
            {page.title}
          </h1>
          {page.meta_description && (
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(0,29,61,0.75)', maxWidth: 760, margin: '18px 0 0' }}>
              {page.meta_description}
            </p>
          )}
        </div>
      </section>
      <PageBody template={page.template} content={page.content} pageTitle={page.title} />
      <CTAStrip />
      {breadcrumbSchema}
    </Shell>
  )
}
