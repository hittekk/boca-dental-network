// ─────────────────────────────────────────────────────────────────────────────
// src/data/doctorLocations.ts
// CANONICAL provider ↔ location mapping (source: "Boca Bible" tab 2, June 2026).
// Single source of truth used by:
//   • LocationPage  → which providers practice at a clinic (re-exported there)
//   • dentistContent → each dentist's worksAt[] (derived inverse)
// Keep this in sync with the DB doctor_locations table (admin view).
//
// Display order within each location: lead/general dentists first, then
// orthodontist, oral surgeon, hygienist. Per the Bible, Dr. Dannels (owner)
// is listed at Cheyenne Commons only — not network-wide.
// ─────────────────────────────────────────────────────────────────────────────

export const DOCTORS_BY_LOCATION: Record<string, string[]> = {
  'bonanza-eastern':     ['dr-justin-wall', 'dr-kelcey-loveland', 'minh-nguyen'],
  'russell-eastern':     ['dr-harrison-luu', 'dr-sana-fahim', 'dr-kelcey-loveland', 'dr-charles-calder'],
  'sahara-decatur':      ['dr-harrison-luu', 'dr-johnson-fong', 'dr-kelcey-loveland'],
  'charleston-lamb':     ['dr-michael-st-laurent', 'dr-sana-fahim', 'dr-kelcey-loveland', 'minh-nguyen'],
  'flamingo-torrey':     ['dr-bredan-marlin', 'dr-charles-calder'],
  'cheyenne-commons':    ['dr-james-yun', 'dr-wyatt-dannels', 'minh-nguyen'],
  'beltway-marketplace': ['dr-kathy-gonzalez', 'dr-kelcey-loveland'],
  'jones-i95':           ['dr-farhan-hossain', 'dr-cole-thompson', 'dr-james-yun', 'dr-kelcey-loveland'],
  'boca-kids-dentistry': ['dr-farhan-hossain'],
}

export function doctorsForLocation(slug: string): string[] {
  return DOCTORS_BY_LOCATION[slug] ?? []
}

// Inverse: doctor slug → location slugs they practice at (for dentist profiles).
const _byDoctor: Record<string, string[]> = {}
for (const [loc, docs] of Object.entries(DOCTORS_BY_LOCATION)) {
  for (const d of docs) (_byDoctor[d] ??= []).push(loc)
}
export const LOCATIONS_BY_DOCTOR: Record<string, string[]> = _byDoctor

export function locationsForDoctor(slug: string): string[] {
  return LOCATIONS_BY_DOCTOR[slug] ?? []
}

// Precise [lng, lat] per location (source: Boca Bible tab 1) for single-pin maps.
export const COORDS_BY_LOCATION: Record<string, [number, number]> = {
  'bonanza-eastern':     [-115.114842653358, 36.172317645466514],
  'russell-eastern':     [-115.11847673558218, 36.08721870953749],
  'sahara-decatur':      [-115.20633570674653, 36.14586957911895],
  'charleston-lamb':     [-115.08222899510304, 36.15884017723794],
  'flamingo-torrey':     [-115.23807223373261, 36.11505221506447],
  'cheyenne-commons':    [-115.24488767791085, 36.21774848792044],
  'beltway-marketplace': [-115.11778832393867, 36.02236022745326],
  'jones-i95':           [-115.22245962208913, 36.17587475735733],
  'boca-kids-dentistry': [-115.11795419749872, 36.0872333967273],
}
