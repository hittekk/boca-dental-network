// ─────────────────────────────────────────────────────────────────────────────
// src/lib/lang-link.tsx
// Drop-in replacement for react-router's <Link>. In the /es subtree it prefixes
// internal absolute string targets with /es (via localizeHref) so client-side
// navigation stays inside the Spanish tree; external/hash/tel targets and Path
// objects pass through untouched. In English it is a transparent <Link>.
// ─────────────────────────────────────────────────────────────────────────────
import { Link } from 'react-router-dom'
import type { ComponentProps } from 'react'
import { useLang } from './lang'
import { localizeHref } from './seo'

export function LangLink({ to, ...rest }: ComponentProps<typeof Link>) {
  const lang = useLang()
  const next = typeof to === 'string' ? localizeHref(to, lang) : to
  return <Link to={next} {...rest} />
}

export default LangLink
