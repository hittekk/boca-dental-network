// ─────────────────────────────────────────────────────────────────────────────
// src/lib/lang.tsx
// Language context — 'en' | 'es' — with a persistent, site-wide toggle.
// useLang() reads the current language; useSetLang() flips it. The choice is
// stored in localStorage so it persists across navigation AND reloads — a
// patient who switches to Spanish stays in Spanish across the whole site.
// Usage: const lang = useLang(); then inline t(lang, en, es) per component.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'en' | 'es'

const STORAGE_KEY = 'boca-lang'

export const LangContext = createContext<Lang>('en')
const SetLangContext = createContext<(l: Lang) => void>(() => {})

export function useLang(): Lang {
  return useContext(LangContext)
}

/** Setter to flip the site language (persists to localStorage). */
export function useSetLang(): (l: Lang) => void {
  return useContext(SetLangContext)
}

/** Inline translation helper — returns es string when lang==='es'. */
export function t(lang: Lang, en: string, es: string): string {
  return lang === 'es' ? es : en
}

function readStored(): Lang {
  if (typeof window === 'undefined') return 'en'
  const s = window.localStorage.getItem(STORAGE_KEY)
  return s === 'es' || s === 'en' ? s : 'en'
}

/**
 * Root language provider. Stateful + persistent by default; pass `lang` to force
 * a fixed language for a subtree (e.g. the dedicated Spanish landing page).
 */
export function LangProvider({ lang: forced, children }: { lang?: Lang; children: ReactNode }) {
  const [stored, setStored] = useState<Lang>(readStored)
  const setLang = useCallback((l: Lang) => {
    setStored(l)
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, l)
  }, [])
  const effective = forced ?? stored
  return (
    <SetLangContext.Provider value={setLang}>
      <LangContext.Provider value={effective}>{children}</LangContext.Provider>
    </SetLangContext.Provider>
  )
}
