import { useEffect } from 'react'
import type { Location } from '../../types'

/**
 * LocationPageMeta
 * Sets per-page meta tags mandated by CLAUDE4 §SEO requirements:
 *   - Unique <title> ≤55 chars
 *   - Unique meta description 150–160 chars
 *   - Canonical URL
 *   - Open Graph (og:title, og:description, og:url, og:type, og:image)
 *   - Twitter card
 *
 * Production target: this content is also emitted from PHP wp_head.
 * Today (mockup), it's set via DOM useEffect so the SPA can show different
 * meta tags per route. No react-helmet dependency.
 */
const DOMAIN = 'https://bocadentalandbraces.com'
const OG_IMAGE = `${DOMAIN}/boca-logo-color.png`

function buildMeta(location: Location) {
  const url = `${DOMAIN}/clinics/${location.slug}/`
  // Per Treysyde Location spec: "Dentist Near [Intersection] | Boca Dental & Braces Las Vegas"
  const title = location.kids
    ? `Pediatric Dentist Near ${location.label} | Boca Dental & Braces Las Vegas`
    : `Dentist Near ${location.label} | Boca Dental & Braces Las Vegas`

  // Per spec: "Boca Dental & Braces at [Intersection] offers comprehensive dental care
  //           for families in [neighborhood] — new patients welcome."
  const desc = location.kids
    ? `Boca Kids Dentistry at ${location.label} offers pediatric dental care for families in ${location.neighborhood}, Las Vegas — Nevada Medicaid + CHIP accepted, new patients welcome.`
    : `Boca Dental & Braces at ${location.label} offers comprehensive dental care for families in ${location.neighborhood}, Las Vegas — new patients welcome, most insurance accepted.`

  return { url, title, desc }
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector(
    `meta[${attr}="${name}"]`,
  ) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

export function LocationPageMeta({ location }: { location: Location }) {
  useEffect(() => {
    const { url, title, desc } = buildMeta(location)
    const prevTitle = document.title
    document.title = title

    const created: HTMLElement[] = []
    const stamps: { el: HTMLElement; prev: string | null; attr: string }[] = []

    const remember = (el: HTMLElement, attr: string) => {
      const prev = el.getAttribute(attr)
      stamps.push({ el, prev, attr })
    }

    const metas: [string, string, 'name' | 'property'][] = [
      ['description', desc, 'name'],
      ['og:title', title, 'property'],
      ['og:description', desc, 'property'],
      ['og:url', url, 'property'],
      ['og:type', 'business.business', 'property'],
      ['og:image', OG_IMAGE, 'property'],
      ['og:site_name', 'Boca Dental & Braces', 'property'],
      ['og:locale', 'en_US', 'property'],
      ['twitter:card', 'summary_large_image', 'name'],
      ['twitter:title', title, 'name'],
      ['twitter:description', desc, 'name'],
      ['twitter:image', OG_IMAGE, 'name'],
    ]
    metas.forEach(([key, val, attr]) => {
      const el = setMeta(key, val, attr)
      remember(el, 'content')
    })

    const canonical = setLink('canonical', url)
    remember(canonical, 'href')

    return () => {
      document.title = prevTitle
      stamps.forEach(({ el, prev, attr }) => {
        if (prev === null) el.removeAttribute(attr)
        else el.setAttribute(attr, prev)
      })
      created.forEach((el) => el.remove())
    }
  }, [location])

  return null
}

export default LocationPageMeta
