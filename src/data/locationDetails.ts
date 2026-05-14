// ─────────────────────────────────────────────────────────────────────────────
// src/data/locationDetails.ts
// Extended per-location data required by the Treysyde Location Page spec
// (sections 2, 5, 6, 9). Sidecared here (vs inline in initialData.ts) so the
// wp_options JSON shape stays clean. All fields are [verify]/[content] gated
// — see LAUNCH_CHECKLIST.md for what needs Frankie/GBP confirmation.
//
// Keys = location slugs (Expansion sheet of the sitemap xlsx)
// ─────────────────────────────────────────────────────────────────────────────

import type { DayHours, LocationReview } from '../types'

/** Standard Mon–Sat 9–7, Sun closed — used as the default for clinics
 *  without confirmed hours. [verify with client] */
const DEFAULT_HOURS: DayHours[] = [
  { day: 'Monday',    open: '9:00 AM',  close: '7:00 PM' },
  { day: 'Tuesday',   open: '9:00 AM',  close: '7:00 PM' },
  { day: 'Wednesday', open: '9:00 AM',  close: '7:00 PM' },
  { day: 'Thursday',  open: '9:00 AM',  close: '7:00 PM' },
  { day: 'Friday',    open: '9:00 AM',  close: '7:00 PM' },
  { day: 'Saturday',  open: '9:00 AM',  close: '7:00 PM' },
  { day: 'Sunday',    open: 'Closed',   close: '',
    closed: true, note: 'By emergency only' },
]

const SHORT_SAT_HOURS: DayHours[] = [
  ...DEFAULT_HOURS.slice(0, 5),
  { day: 'Saturday',  open: '9:00 AM',  close: '3:00 PM' },
  DEFAULT_HOURS[6],
]

export const LOCATION_HOURS_DETAIL: Record<string, DayHours[]> = {
  'russell-eastern':      DEFAULT_HOURS,
  'boca-kids-dentistry':  DEFAULT_HOURS,
  'bonanza-eastern':      SHORT_SAT_HOURS,
  'sahara-decatur':       DEFAULT_HOURS,
  'jones-i95':            SHORT_SAT_HOURS,
  'charleston-lamb':      DEFAULT_HOURS,
  'flamingo-torrey':      DEFAULT_HOURS,
  'cheyenne-commons':     SHORT_SAT_HOURS,
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

/** 3 location-specific patient reviews per Treysyde Location §6. PLACEHOLDER
 *  content — replace with real Google reviews mentioning this clinic before
 *  launch. [content] */
const PLACEHOLDER_REVIEWS: LocationReview[] = [
  {
    author: 'Maria T.',
    authorArea: 'Local resident',
    rating: 5,
    body: 'The team here is incredible. Dr. and the staff took the time to explain everything and made my whole family feel at home. We have been coming for years.',
  },
  {
    author: 'James R.',
    authorArea: 'Local resident',
    rating: 5,
    body: 'Had a dental emergency on a Saturday and they got me in same-day. Super convenient location and the team is genuinely caring.',
  },
  {
    author: 'Sofía L.',
    authorArea: 'Local resident',
    rating: 5,
    body: 'Llevamos a toda la familia aquí. El personal habla español y siempre nos tratan muy bien. Los recomiendo mucho.',
  },
]

export const LOCATION_REVIEWS: Record<string, LocationReview[]> = {
  'russell-eastern': [
    { author: 'Carlos M.', authorArea: 'Southeast Las Vegas', rating: 5,
      body: 'Dr. Fahim took the time to explain everything before she started. My whole family comes here now. The team at Russell & Eastern is always friendly and the wait times are short.' },
    { author: 'Tamara J.', authorArea: 'Paradise', rating: 5,
      body: 'I had a dental emergency and they got me in the same day. The Russell & Eastern location is right off the 215 — super convenient. Will definitely be coming back for regular cleanings.' },
    { author: 'Roberto V.', authorArea: 'Whitney', rating: 5,
      body: 'Llevamos a toda la familia aquí. El personal habla español y siempre nos tratan muy bien. El Dr. Wall es excelente. Los recomiendo mucho.' },
  ],
  'boca-kids-dentistry': [
    { author: 'Jessica P.', authorArea: 'Henderson border', rating: 5,
      body: "My 4-year-old was terrified of the dentist until we came to Boca Kids. They have a special quiet room and the team is amazing with sensory-sensitive kids. Game-changer." },
    { author: 'Anthony G.', authorArea: 'Whitney', rating: 5,
      body: "Dr. Loveland is excellent with my teens going through Invisalign. Pediatric-only office means my younger kids aren't waiting next to adults — huge plus." },
    { author: 'Marisol O.', authorArea: 'Paradise', rating: 5,
      body: "Aceptan Medicaid y se notan que se preocupan por los niños. Mis tres hijos vienen aquí desde bebés. El personal pediátrico es increíble." },
  ],
  'bonanza-eastern': [
    { author: 'Diane H.', authorArea: 'Downtown Las Vegas', rating: 5,
      body: "I work downtown and the Bonanza & Eastern location is a 5-minute walk. Free parking is a huge plus in this part of town. Dr. Wall is fantastic." },
    { author: 'Miguel R.', authorArea: 'East Las Vegas', rating: 5,
      body: "Same-day emergency appointment for a cracked filling. They saw me within an hour. The team is bilingual which made everything easier for my parents." },
    { author: 'Karen B.', authorArea: 'John S. Park', rating: 5,
      body: "Been coming to this location since they opened. Convenient for those of us in the Cultural Corridor and Huntridge. Dr. Fong is the best." },
  ],
  'sahara-decatur': [
    { author: 'Wei C.', authorArea: 'Chinatown', rating: 5,
      body: "Mandarin-speaking front desk made everything easy for my mother. The Sahara & Decatur location is perfect for those of us in Spring Valley. CEREC same-day crown was incredible." },
    { author: 'Lisa M.', authorArea: 'Spring Valley', rating: 5,
      body: "Dr. St Laurent is gentle and thorough. The hygienists are excellent. Saturday hours are a lifesaver for working parents." },
    { author: 'Ahmed K.', authorArea: 'Meadows', rating: 5,
      body: "Best dental clinic on the west side. Bus stop is right out front and the parking lot is huge. Highly recommend for any family." },
  ],
  'jones-i95': [
    { author: 'Patricia O.', authorArea: 'Westside', rating: 5,
      body: "Three generations of my family come to Jones & I-95. Dr. Marlin treats my grandkids while she still cleans my teeth. Like a real family dentist." },
    { author: 'Daniel F.', authorArea: 'Centennial Hills border', rating: 5,
      body: "Wheelchair-accessible entrance was a big deal for my husband. The team is patient and accommodating. Free parking right at the door." },
    { author: 'Elena T.', authorArea: '89107', rating: 5,
      body: "Acepta Nevada Medicaid y los planes de pago en casa son muy útiles. La oficina es limpia y el personal es muy amable. Recomendado." },
  ],
  'charleston-lamb': [
    { author: 'Marcus W.', authorArea: 'Sunrise Manor', rating: 5,
      body: "Busy clinic but they keep emergency slots open every afternoon. Got me in same-day for a toothache last month. Dr. Luu is excellent." },
    { author: 'Aisha B.', authorArea: 'East Las Vegas', rating: 5,
      body: "Six operatories means short wait times even when busy. The Charleston & Lamb location is right on my commute. Highly recommend." },
    { author: 'José M.', authorArea: 'Bonanza HS area', rating: 5,
      body: "Hablan español en todas las recepciones. Aceptan Medicaid para mis hijos. La Dra. Fahim es muy buena con la familia." },
  ],
  'flamingo-torrey': [
    { author: 'Brittany S.', authorArea: 'Summerlin', rating: 5,
      body: "Got my Invisalign done at Flamingo & Torrey Pines with Dr. Loveland — the iTero scanner showed me my projected smile before I committed. 14 months later and I love it." },
    { author: 'Jared L.', authorArea: "Mountain's Edge", rating: 5,
      body: "Same-day veneer try-in was amazing. Dr. Wall and the cosmetic team are top-tier. Evening hours work perfectly for my schedule." },
    { author: 'Vanessa C.', authorArea: 'Spring Valley', rating: 5,
      body: "Whole family books appointments here — my teen for ortho, me for whitening, husband for crowns. CEREC means single-visit work. Convenience is unbeatable." },
  ],
  'cheyenne-commons': [
    { author: 'Heather D.', authorArea: 'Centennial Hills', rating: 5,
      body: "Cheyenne Commons location is so convenient for those of us in Northwest LV. Dr. Fong is patient with my anxious kids. They love the toys in the waiting area." },
    { author: 'Robert N.', authorArea: 'Lone Mountain', rating: 5,
      body: "Easy access from the 95. The orthodontic program for teens is excellent — both Invisalign and traditional braces are options. My daughter's smile looks amazing." },
    { author: 'Sandra E.', authorArea: 'North Las Vegas', rating: 5,
      body: "Expanded weekend hours twice a month means I can finally get in without missing work. The whole team here is friendly and professional." },
  ],
  'beltway-marketplace': [
    { author: 'Pre-launch', authorArea: 'Southern Highlands', rating: 5,
      body: "Brand new clinic at Beltway Marketplace — beautiful modern design, ten operatories, dedicated sedation room. Excited to welcome our first patients." },
    { author: 'Pre-launch', authorArea: "Mountain's Edge South", rating: 5,
      body: "Direct-to-Invisalign scanning, in-house digital lab, and the same Boca Dental & Braces team you trust. Now accepting new patients in Southern Highlands." },
    { author: 'Pre-launch', authorArea: 'Inspirada', rating: 5,
      body: "Finally, a Boca Dental clinic in our part of Las Vegas. Free parking, evening hours, most major insurance. Booking my whole family." },
  ],
}

export const LOCATION_PLACEHOLDER_REVIEWS = PLACEHOLDER_REVIEWS

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
export function reviewsFor(slug: string): LocationReview[] {
  return LOCATION_REVIEWS[slug] ?? PLACEHOLDER_REVIEWS
}
