// ─────────────────────────────────────────────────────────────────────────────
// src/lib/es-flag.ts
// THE ONE SWITCH. Single source of truth for whether Spanish is cleared for
// public indexing. Kept dependency-free (no React import) so the Node build
// scripts (generate-sitemap.mjs) can read the same constant the runtime does.
//
// While false: /es pages render for review but are noindex, hreflang is not
// published, and the sitemap omits ES. Flip to true ONLY after Frankie +
// Treysyde sign off the clinical Spanish, then rebuild — one change, fully live.
// ─────────────────────────────────────────────────────────────────────────────
export const ES_PUBLIC = true
