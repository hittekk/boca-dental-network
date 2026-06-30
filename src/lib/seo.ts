// ─────────────────────────────────────────────────────────────────────────────
// src/lib/seo.ts
// Bilingual SEO plumbing shared by every page. Centralizes the things that must
// be right for indexable /es/ pages: the <html lang> attribute, the hreflang
// alternate pair (en ↔ es + x-default), and the per-language canonical.
//
// Pages pass their *English* logical path (no /es prefix, always leading slash,
// e.g. "/cosmetic/teeth-whitening/"). useLangSeo sets <html lang> + alternates
// and returns the canonical URL for the CURRENT language.
//
// ── THE ONE SWITCH ───────────────────────────────────────────────────────────
// ES_PUBLIC gates whether Spanish is *advertised to search engines*. While it is
// false, every /es page renders fully (for human review) but emits
// robots="noindex,follow", no hreflang is published, and the sitemap omits ES.
// Machine-drafted clinical Spanish must NOT be indexed until Frankie + Treysyde
// sign off. After sign-off: set ES_PUBLIC = true (and rebuild) — hreflang turns
// on, the ES noindex drops, and the sitemap script emits the ES twins. One flip.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import type { Lang } from './lang'
export { ES_PUBLIC } from './es-flag'
import { ES_PUBLIC } from './es-flag'

export const DOMAIN = 'https://bocadentalandbraces.com'

/** Absolute URL for a site-relative path. */
export function abs(path: string): string {
  return `${DOMAIN}${path}`
}

/** Map an English logical path to its /es twin. "/" → "/es". */
export function esPath(enPath: string): string {
  if (enPath === '/' || enPath === '') return '/es'
  return `/es${enPath.startsWith('/') ? enPath : `/${enPath}`}`
}

/** Strip a leading /es back to the English path. "/es/x/" → "/x/", "/es" → "/". */
export function stripEs(path: string): string {
  if (path === '/es' || path === '/es/') return '/'
  return path.startsWith('/es/') ? path.slice(3) : path
}

/**
 * Localize an href for the current language. In Spanish, internal absolute paths
 * ("/services/", "/clinics/...") get an /es prefix so navigation stays inside
 * the Spanish tree. External, tel:, mailto:, hash, and already-/es links pass
 * through untouched.
 */
export function localizeHref(href: string, lang: Lang): string {
  if (lang !== 'es' || !href) return href
  if (!href.startsWith('/')) return href
  if (href === '/es' || href.startsWith('/es/')) return href
  return href === '/' ? '/es' : `/es${href}`
}

function upsertAlternate(hreflang: string, href: string) {
  let el = document.head.querySelector(
    `link[rel="alternate"][hreflang="${hreflang}"]`,
  ) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeAlternates() {
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.parentNode?.removeChild(el))
}

/** Add or remove the staging noindex on a Spanish page based on ES_PUBLIC. */
function setEsRobots(noindex: boolean) {
  // Operate on the single robots meta shipped in index.html rather than adding a
  // second (conflicting) tag. Mark it when we force noindex so we can restore it.
  let el = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', 'robots')
    document.head.appendChild(el)
  }
  if (noindex) {
    el.setAttribute('content', 'noindex,follow')
    el.setAttribute('data-es-stage', '1')
  } else {
    el.setAttribute('content', 'index, follow')
    el.removeAttribute('data-es-stage')
  }
}

/**
 * Sets <html lang>, the en/es/x-default hreflang alternates (only when Spanish
 * is public), the staging noindex (only while it is not), and returns the
 * canonical URL for the current language. x-default points at the English page.
 */
export function useLangSeo(lang: Lang, enPath: string): string {
  const enUrl = abs(enPath)
  const esUrl = abs(esPath(enPath))
  const canonical = lang === 'es' ? esUrl : enUrl
  useEffect(() => {
    document.documentElement.lang = lang
    if (ES_PUBLIC) {
      upsertAlternate('en', enUrl)
      upsertAlternate('es', esUrl)
      upsertAlternate('x-default', enUrl)
      setEsRobots(false)
    } else {
      // Pre-sign-off staging: don't advertise ES to Google at all.
      removeAlternates()
      setEsRobots(lang === 'es')
    }
  }, [lang, enUrl, esUrl])
  return canonical
}
