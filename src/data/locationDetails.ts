// ─────────────────────────────────────────────────────────────────────────────
// src/data/locationDetails.ts
// Extended per-location data required by the Treysyde Location Page spec
// (sections 2, 5, 6, 9). Sidecared here (vs inline in initialData.ts) so the
// wp_options JSON shape stays clean. All fields are [verify]/[content] gated
// — see LAUNCH_CHECKLIST.md for what needs Frankie/GBP confirmation.
//
// Keys = location slugs (Expansion sheet of the sitemap xlsx)
// ─────────────────────────────────────────────────────────────────────────────

import type { DayHours } from '../types'

/** Standard Mon–Sat 9–7, Sun closed — used as the default for clinics
 *  without confirmed hours. [verify with client] */
const DEFAULT_HOURS: DayHours[] = [
  { day: 'Monday',    open: '9:00 AM',  close: '5:00 PM' },
  { day: 'Tuesday',   open: '9:00 AM',  close: '5:00 PM' },
  { day: 'Wednesday', open: '9:00 AM',  close: '5:00 PM' },
  { day: 'Thursday',  open: '9:00 AM',  close: '5:00 PM' },
  { day: 'Friday',    open: '9:00 AM',  close: '5:00 PM' },
  { day: 'Saturday',  open: '9:00 AM',  close: '5:00 PM' },
  { day: 'Sunday',    open: 'Closed',   close: '',
    closed: true, note: 'By emergency only' },
]


export const LOCATION_HOURS_DETAIL: Record<string, DayHours[]> = {
  'russell-eastern':      DEFAULT_HOURS,
  'boca-kids-dentistry':  DEFAULT_HOURS,
  'bonanza-eastern':      DEFAULT_HOURS,
  'sahara-decatur':       DEFAULT_HOURS,
  'jones-i95':            DEFAULT_HOURS,
  'charleston-lamb':      DEFAULT_HOURS,
  'flamingo-torrey':      DEFAULT_HOURS,
  'cheyenne-commons':     DEFAULT_HOURS,
  'beltway-marketplace':  DEFAULT_HOURS,
}

export const LOCATION_LANGUAGES: Record<string, string[]> = {
  'russell-eastern':      ['English', 'Spanish'],
  'boca-kids-dentistry':  ['English', 'Spanish'],
  'bonanza-eastern':      ['English', 'Spanish', 'Tagalog', 'Mandarin'],
  'sahara-decatur':       ['English', 'Spanish', 'Mandarin', 'Cantonese'],
  'jones-i95':            ['English', 'Spanish'],
  'charleston-lamb':      ['English', 'Spanish'],
  'flamingo-torrey':      ['English', 'Spanish'],
  'cheyenne-commons':     ['English', 'Spanish'],
  'beltway-marketplace':  ['English', 'Spanish'],
}

export const LOCATION_PARKING: Record<string, string> = {
  'russell-eastern':      'Free on-site parking',
  'boca-kids-dentistry':  'Free on-site parking · separate kids entrance',
  'bonanza-eastern':      'Free covered parking · 14 dedicated spaces',
  'sahara-decatur':       'Free plaza parking · RTC bus stop out front',
  'jones-i95':            'Free on-site parking · wheelchair accessible',
  'charleston-lamb':      'Free parking lot',
  'flamingo-torrey':      'Free parking · validated garage adjacent',
  'cheyenne-commons':     'Free Cheyenne Commons plaza parking',
  'beltway-marketplace':  'Free new-construction parking lot',
}

/** Service slugs explicitly NOT available at this clinic. Drives Section 5
 *  availability callout. [verify with client] */
export const LOCATION_SERVICES_UNAVAILABLE: Record<string, string[]> = {
  'russell-eastern':      ['oral-surgery'],
  'boca-kids-dentistry':  ['cosmetic-dentistry', 'dental-implants', 'oral-surgery', 'periodontal'],
  'bonanza-eastern':      ['oral-surgery', 'sedation-dentistry'],
  'sahara-decatur':       ['oral-surgery'],
  'jones-i95':            ['oral-surgery', 'sedation-dentistry'],
  'charleston-lamb':      ['oral-surgery'],
  'flamingo-torrey':      [], // Flamingo is the all-services flagship
  'cheyenne-commons':     ['oral-surgery', 'sedation-dentistry'],
  'beltway-marketplace':  ['oral-surgery'],
}

// Location review content is REAL Google data only, pulled into Supabase at
// build time by scripts/fetch-google-reviews.mjs and rendered from
// location.reviews — no static/placeholder review content (no-fabrication).

export function hoursDetailFor(slug: string): DayHours[] {
  return LOCATION_HOURS_DETAIL[slug] ?? DEFAULT_HOURS
}
export function languagesFor(slug: string): string[] {
  return LOCATION_LANGUAGES[slug] ?? ['English']
}
export function parkingFor(slug: string): string {
  return LOCATION_PARKING[slug] ?? 'On-site parking available'
}
export function servicesUnavailableFor(slug: string): string[] {
  return LOCATION_SERVICES_UNAVAILABLE[slug] ?? []
}
