// ─────────────────────────────────────────────────────────────────────────────
// src/pages/CustomPage.tsx
// Public renderer for admin-created CMS pages (the `pages` table). Resolves the
// current path to a published page, renders it inside the site chrome using the
// shared <PageBody>. If no published page matches, the caller falls back to the
// homepage (preserving the previous catch-all behaviour).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer/Footer'
import PageBody, { type PageTemplateLike, type PageContentLike } from '../components/shared/PageBody'
import { useSiteData } from '../lib/site-data'
import { supabase } from '../lib/supabase'

const DARK_NAVY = '#001D3D'
const NAVY = '#162E7A'

export type FetchedPage = {
  id: string
  slug: string
  title: string
  content: PageContentLike
  meta_title: string | null
  meta_description: string | null
  template: PageTemplateLike & { name?: string }
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

function setMeta(name: string, content: string, attr: 'name' | 'property') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function CustomPage({ page }: { page: FetchedPage }) {
  const siteData = useSiteData()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    document.title = page.meta_title || page.title
    if (page.meta_description) {
      setMeta('description', page.meta_description, 'name')
      setMeta('og:description', page.meta_description, 'property')
    }
    setMeta('og:title', page.meta_title || page.title, 'property')
  }, [page])

  return (
    <div style={{ background: 'white', color: NAVY }}>
      <Header brand={siteData.brand} announcement={siteData.announcement} />
      <section style={{ background: 'linear-gradient(180deg, #F7F9FC 0%, white 70%)', padding: '160px 32px 24px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 4.4vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-1.2px',
              color: DARK_NAVY,
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            {page.title}
          </h1>
        </div>
      </section>
      <PageBody template={page.template} content={page.content} />
      <Footer />
    </div>
  )
}
