// ─────────────────────────────────────────────────────────────────────────────
// src/pages/BlogPage.tsx
// Public blog — index (/blog) + post (/blog/:slug). Content is managed entirely
// from the admin (blog_posts table). The whole section is gated by the
// `blog` site setting (admin → Blog → on/off): when off, these routes redirect
// home and no "Blog" nav link is shown.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Shell, CTAStrip, usePageMeta } from './CorePages'
import { supabase } from '../lib/supabase'
import { useBlogEnabled } from '../lib/site-data'

const ORANGE = '#F3672A'
const NAVY = '#162E7A'
const DARK = '#001D3D'

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  cover_image_url: string | null
  author: string | null
  category: string | null
  meta_title?: string | null
  meta_description?: string | null
  published_at: string | null
  updated_at?: string | null
}

function fmtDate(d: string | null): string {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) } catch { return '' }
}

function usePublishedPosts() {
  const [state, setState] = useState<{ loading: boolean; posts: BlogPost[] }>({ loading: true, posts: [] })
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, cover_image_url, author, category, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
      if (!cancelled) setState({ loading: false, posts: (data as BlogPost[]) ?? [] })
    })()
    return () => { cancelled = true }
  }, [])
  return state
}

function usePostBySlug(slug: string | undefined) {
  const [state, setState] = useState<{ loading: boolean; post: BlogPost | null }>({ loading: true, post: null })
  useEffect(() => {
    let cancelled = false
    if (!slug) { setState({ loading: false, post: null }); return }
    setState({ loading: true, post: null })
    ;(async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, content, cover_image_url, author, category, meta_title, meta_description, published_at, updated_at')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle()
      if (!cancelled) setState({ loading: false, post: (data as BlogPost | null) ?? null })
    })()
    return () => { cancelled = true }
  }, [slug])
  return state
}

function setMetaTag(name: string, content: string, attr: 'name' | 'property') {
  if (typeof document === 'undefined') return
  let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}

function useRelatedPosts(category: string | null | undefined, excludeSlug: string | undefined) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  useEffect(() => {
    let cancelled = false
    if (!category) { setPosts([]); return }
    ;(async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, cover_image_url, author, category, published_at')
        .eq('status', 'published').eq('category', category).neq('slug', excludeSlug ?? '')
        .order('published_at', { ascending: false }).limit(3)
      if (!cancelled) setPosts((data as BlogPost[]) ?? [])
    })()
    return () => { cancelled = true }
  }, [category, excludeSlug])
  return posts
}

export function BlogIndexPage() {
  const blogEnabled = useBlogEnabled()
  const { loading, posts } = usePublishedPosts()
  const [activeCat, setActiveCat] = useState<string | null>(null)
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean) as string[])]
  const visible = activeCat ? posts.filter((p) => p.category === activeCat) : posts
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const schema = usePageMeta({
    title: 'Blog | Boca Dental and Braces',
    description: 'News, tips, and updates from Boca Dental and Braces.',
    url: `${origin}/blog/`,
    breadcrumb: [{ name: 'Home', url: `${origin}/` }, { name: 'Blog' }],
  })
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [])
  if (blogEnabled === undefined) return null
  if (!blogEnabled) return <Navigate to="/" replace />

  return (
    <Shell>
      <section style={{ background: 'linear-gradient(180deg, #F7F9FC 0%, white 65%)', padding: '160px 32px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: ORANGE, marginBottom: 14 }}>Our Blog</div>
          <h1 style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', fontWeight: 800, letterSpacing: '-1.2px', color: NAVY, margin: 0, textTransform: 'uppercase' }}>
            News &amp; Tips
          </h1>
        </div>
      </section>
      <section style={{ background: 'white', padding: '24px 32px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {categories.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {[null, ...categories].map((c) => {
                const on = activeCat === c
                return (
                  <button key={c ?? 'all'} type="button" onClick={() => setActiveCat(c)}
                    style={{ cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, padding: '7px 14px', borderRadius: 999, border: `1px solid ${on ? ORANGE : 'rgba(0,29,61,0.15)'}`, background: on ? ORANGE : 'white', color: on ? 'white' : 'rgba(0,29,61,0.6)' }}>
                    {c ?? 'All'}
                  </button>
                )
              })}
            </div>
          )}
          {loading ? (
            <p style={{ color: 'rgba(0,29,61,0.5)' }}>Loading…</p>
          ) : visible.length === 0 ? (
            <p style={{ color: 'rgba(0,29,61,0.6)', fontSize: 16 }}>No posts yet — check back soon.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {visible.map((p) => (
                <Link key={p.id} to={`/blog/${p.slug}/`} style={{ textDecoration: 'none', color: DARK, background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 6px 18px rgba(0,29,61,0.04)' }}>
                  {p.cover_image_url ? (
                    <div style={{ aspectRatio: '16 / 9', overflow: 'hidden' }}>
                      <img src={p.cover_image_url} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ aspectRatio: '16 / 9', background: 'linear-gradient(135deg, rgba(243,103,42,0.18), rgba(22,46,122,0.12))' }} />
                  )}
                  <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    {(p.category || p.published_at) && <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'rgba(0,29,61,0.45)' }}>{[p.category, fmtDate(p.published_at)].filter(Boolean).join(' · ')}</div>}
                    <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.3px', lineHeight: 1.25 }}>{p.title}</div>
                    {p.excerpt && <p style={{ fontSize: 14, color: 'rgba(0,29,61,0.65)', lineHeight: 1.6, margin: 0 }}>{p.excerpt}</p>}
                    <span style={{ marginTop: 'auto', paddingTop: 10, fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, color: ORANGE }}>Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTAStrip />
      {schema}
    </Shell>
  )
}

export function BlogPostPage() {
  const blogEnabled = useBlogEnabled()
  const { slug } = useParams<{ slug: string }>()
  const { loading, post } = usePostBySlug(slug)
  const related = useRelatedPosts(post?.category, slug)
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const metaDesc = post?.meta_description || post?.excerpt || 'Boca Dental and Braces blog.'
  const schema = usePageMeta({
    title: post ? `${post.meta_title || post.title} | Boca Dental and Braces` : 'Blog | Boca Dental and Braces',
    description: metaDesc,
    url: `${origin}/blog/${slug}/`,
    breadcrumb: [{ name: 'Home', url: `${origin}/` }, { name: 'Blog', url: `${origin}/blog/` }, { name: post?.title ?? 'Post' }],
  })
  // Article-specific OG/Twitter tags (playbook: og:image, article:* times, card)
  useEffect(() => {
    if (!post) return
    setMetaTag('og:type', 'article', 'property')
    setMetaTag('twitter:card', 'summary_large_image', 'name')
    if (post.cover_image_url) { setMetaTag('og:image', post.cover_image_url, 'property'); setMetaTag('twitter:image', post.cover_image_url, 'name') }
    if (post.published_at) setMetaTag('article:published_time', post.published_at, 'property')
    if (post.updated_at || post.published_at) setMetaTag('article:modified_time', (post.updated_at || post.published_at) as string, 'property')
    if (post.author) setMetaTag('article:author', post.author, 'property')
  }, [post])
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [slug])
  if (blogEnabled === undefined) return null
  if (!blogEnabled) return <Navigate to="/" replace />

  // BlogPosting JSON-LD — fully dynamic from the post (DSL blog playbook).
  const blogLd = post ? {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: post.title, description: metaDesc,
    ...(post.cover_image_url ? { image: post.cover_image_url } : {}),
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    ...(post.updated_at || post.published_at ? { dateModified: post.updated_at || post.published_at } : {}),
    author: { '@type': 'Person', name: post.author || 'Boca Dental and Braces' },
    publisher: { '@type': 'Organization', name: 'Boca Dental and Braces', logo: { '@type': 'ImageObject', url: `${origin}/boca-logo-color.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${origin}/blog/${post.slug}/` },
    ...(post.category ? { articleSection: post.category } : {}),
  } : null

  return (
    <Shell>
      <section style={{ background: 'linear-gradient(180deg, #F7F9FC 0%, white 70%)', padding: '160px 32px 32px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <nav style={{ fontSize: 12, fontFamily: 'ui-monospace, Menlo, monospace', color: 'rgba(0,29,61,0.55)', marginBottom: 22, display: 'flex', gap: 8 }}>
            <Link to="/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link to="/blog/" style={{ color: 'rgba(0,29,61,0.55)', textDecoration: 'none' }}>Blog</Link>
          </nav>
          {loading ? (
            <p style={{ color: 'rgba(0,29,61,0.5)' }}>Loading…</p>
          ) : !post ? (
            <div style={{ padding: '40px 0 80px' }}>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: NAVY, margin: '0 0 12px' }}>Post not found</h1>
              <Link to="/blog/" style={{ color: ORANGE, fontWeight: 800 }}>← Back to the blog</Link>
            </div>
          ) : (
            <>
              {(post.category || post.published_at || post.author) && <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.2, color: ORANGE, marginBottom: 10 }}>{[post.category, fmtDate(post.published_at), post.author].filter(Boolean).join(' · ')}</div>}
              <h1 style={{ fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 800, letterSpacing: '-1px', color: NAVY, margin: 0, lineHeight: 1.1 }}>{post.title}</h1>
            </>
          )}
        </div>
      </section>
      {!loading && post && (
        <article style={{ background: 'white', padding: '8px 32px 72px' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            {post.cover_image_url && (
              <img src={post.cover_image_url} alt={post.title} style={{ width: '100%', borderRadius: 16, margin: '8px 0 32px', display: 'block' }} />
            )}
            <div
              className="blog-prose"
              style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(0,29,61,0.85)' }}
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
            <style>{`
              .blog-prose h2{ font-size:26px; font-weight:800; color:${NAVY}; margin:36px 0 14px; letter-spacing:-0.5px; }
              .blog-prose h3{ font-size:20px; font-weight:800; color:${NAVY}; margin:28px 0 10px; }
              .blog-prose p{ margin:0 0 18px; }
              .blog-prose ul,.blog-prose ol{ margin:0 0 18px; padding-left:24px; }
              .blog-prose li{ margin:0 0 8px; }
              .blog-prose a{ color:${ORANGE}; font-weight:600; }
              .blog-prose img{ max-width:100%; height:auto; border-radius:12px; margin:18px 0; }
            `}</style>
          </div>
        </article>
      )}
      {!loading && post && related.length > 0 && (
        <section style={{ background: '#F7F9FC', padding: '56px 32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: ORANGE, marginBottom: 18 }}>Related posts</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}/`} style={{ textDecoration: 'none', color: DARK, background: 'white', border: '1px solid rgba(0,29,61,0.08)', borderRadius: 14, padding: '18px 20px' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.3, marginBottom: 6 }}>{r.title}</div>
                  {r.excerpt && <p style={{ fontSize: 13, color: 'rgba(0,29,61,0.6)', margin: 0, lineHeight: 1.5 }}>{r.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {blogLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogLd) }} />}
      <CTAStrip />
      {schema}
    </Shell>
  )
}
