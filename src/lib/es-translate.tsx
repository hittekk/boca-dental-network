// ─────────────────────────────────────────────────────────────────────────────
// src/lib/es-translate.tsx
// Site-wide Spanish layer. When the language is 'es', <AutoTranslate/> walks the
// rendered DOM and replaces English text (and key attributes + page meta) using
// the ES dictionary, with graceful fallback (anything not in the dictionary
// stays English). This covers static copy, data-driven content, AND DB content
// without wiring every component. Switching back to 'en' restores the original.
//
// Per-component t(lang, en, es) calls still work — their output is already
// Spanish in 'es' mode, so it is simply skipped here (not an English key).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from './lang'
import { ES } from './es-dict'

// Remember each node's original English so we can restore on switch-back.
const originalText = new WeakMap<Node, string>()
const originalAttr = new WeakMap<Element, Record<string, string>>()

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'])
const ATTRS = ['placeholder', 'alt', 'aria-label', 'title']

// Translate a captured term (e.g. a service name) via the dictionary, trying the
// term as-is and Title-Cased, falling back to the original.
function term(t: string): string {
  const titled = t.replace(/\b\w/g, (c) => c.toUpperCase())
  return ES[t] || ES[titled] || t
}

// Patterns for sentences that interpolate a service name into a single text node
// (so an exact-match entry per service would not scale). Tried only when there
// is no exact dictionary hit.
const PATTERNS: Array<[RegExp, (m: RegExpMatchArray) => string]> = [
  [/^What Is (.+)\?$/, (m) => `¿Qué es ${term(m[1])}?`],
  [/^Is (.+) right for you\?$/, (m) => `¿Es ${term(m[1])} adecuado para ti?`],
  [/^Benefits of (.+)$/, (m) => `Beneficios de ${term(m[1])}`],
  [/^Making (.+) Affordable$/, (m) => `Hacer accesible ${term(m[1])}`],
  [/^Does insurance cover (.+)\?$/, (m) => `¿El seguro cubre ${term(m[1])}?`],
  [/^How long does (.+) take\?$/, (m) => `¿Cuánto tiempo toma ${term(m[1])}?`],
  [/^Is (.+) painful\?$/, (m) => `¿Es doloroso ${term(m[1])}?`],
  [/^(.+) in Las Vegas$/, (m) => `${term(m[1])} en Las Vegas`],
  [/^(.+) in Reno$/, (m) => `${term(m[1])} en Reno`],
]

function patternTranslate(key: string): string | null {
  for (const [re, fn] of PATTERNS) {
    const m = key.match(re)
    if (m) return fn(m)
  }
  return null
}

function translateTextNodes(root: HTMLElement, toEs: boolean) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  while (walker.nextNode()) nodes.push(walker.currentNode as Text)

  for (const n of nodes) {
    const parent = n.parentElement
    if (!parent || SKIP_TAGS.has(parent.tagName) || parent.isContentEditable) continue
    const raw = n.nodeValue ?? ''
    const key = raw.trim()
    if (!key) continue

    if (toEs) {
      const es = ES[key] ?? patternTranslate(key)
      if (es && es !== key) {
        if (!originalText.has(n)) originalText.set(n, raw)
        const next = raw.replace(key, es)
        if (n.nodeValue !== next) n.nodeValue = next
      }
    } else if (originalText.has(n)) {
      n.nodeValue = originalText.get(n)!
      originalText.delete(n)
    }
  }
}

function translateAttrs(root: HTMLElement, toEs: boolean) {
  const sel = ATTRS.map((a) => `[${a}]`).join(',')
  root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
    for (const a of ATTRS) {
      const cur = el.getAttribute(a)
      if (cur == null) continue
      const key = cur.trim()
      if (!key) continue
      if (toEs) {
        const es = ES[key]
        if (es && es !== key) {
          const saved = originalAttr.get(el) ?? {}
          if (!(a in saved)) { saved[a] = cur; originalAttr.set(el, saved) }
          if (el.getAttribute(a) !== es) el.setAttribute(a, es)
        }
      } else {
        const saved = originalAttr.get(el)
        if (saved && a in saved) { el.setAttribute(a, saved[a]); delete saved[a] }
      }
    }
  })
}

function translateMeta(toEs: boolean) {
  if (!toEs) return // usePageMeta resets title/description per page on 'en'
  const desc = document.querySelector('meta[name="description"]')
  if (desc) {
    const c = desc.getAttribute('content')?.trim()
    if (c && ES[c]) desc.setAttribute('content', ES[c])
  }
  document.documentElement.lang = 'es'
}

function apply(toEs: boolean) {
  const root = document.getElementById('root') ?? document.body
  if (!root) return
  translateTextNodes(root, toEs)
  translateAttrs(root, toEs)
  translateMeta(toEs)
  if (!toEs) document.documentElement.lang = 'en'
}

export function AutoTranslate() {
  const lang = useLang()
  const { pathname } = useLocation()

  useEffect(() => {
    const toEs = lang === 'es'
    // Run synchronously after the DOM commit (no rAF race with StrictMode), plus
    // a couple of follow-ups to catch late async content (DB, lazy sections).
    apply(toEs)
    const t1 = window.setTimeout(() => apply(toEs), 60)
    const t2 = window.setTimeout(() => apply(toEs), 400)
    if (!toEs) return () => { window.clearTimeout(t1); window.clearTimeout(t2) }

    // Re-apply when React re-renders. Idempotent: already-Spanish text is not a
    // dictionary key, so re-runs are no-ops (no loop). Observer is paused while
    // we write to avoid churn.
    const root = document.getElementById('root') ?? document.body
    let scheduled = false
    const obs = new MutationObserver(() => {
      if (scheduled) return
      scheduled = true
      window.setTimeout(() => {
        scheduled = false
        obs.disconnect()
        apply(true)
        obs.observe(root, { subtree: true, childList: true, characterData: true })
      }, 40)
    })
    obs.observe(root, { subtree: true, childList: true, characterData: true })
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      obs.disconnect()
    }
  }, [lang, pathname])

  return null
}
