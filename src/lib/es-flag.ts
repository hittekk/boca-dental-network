// ─────────────────────────────────────────────────────────────────────────────
// src/lib/es-flag.ts
// THE ONE SWITCH. Single source of truth for whether Spanish is cleared for
// public indexing. Kept dependency-free (no React import) so the Node build
// scripts (generate-sitemap.mjs) can read the same constant the runtime does.
//
// When true: /es pages are indexable, hreflang is published, and the sitemap
// includes ES. When false: /es renders but is noindex and omitted from sitemap.
// Per owner decision (2026-07): Spanish is cleared for public indexing without
// a separate clinical-content review gate. Currently PUBLIC.
// ─────────────────────────────────────────────────────────────────────────────
export const ES_PUBLIC = true
