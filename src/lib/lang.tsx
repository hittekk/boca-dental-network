// ─────────────────────────────────────────────────────────────────────────────
// src/lib/lang.tsx
// Language context — 'en' | 'es'
// Usage: const lang = useLang(); then inline t(en, es) helper per component.
// ─────────────────────────────────────────────────────────────────────────────
import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'en' | 'es'

export const LangContext = createContext<Lang>('en')

export function useLang(): Lang {
  return useContext(LangContext)
}

/** Inline translation helper — returns es string when lang==='es'. */
export function t(lang: Lang, en: string, es: string): string {
  return lang === 'es' ? es : en
}

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}
