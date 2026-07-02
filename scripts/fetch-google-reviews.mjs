// ─────────────────────────────────────────────────────────────────────────────
// scripts/fetch-google-reviews.mjs
// Build-time Google reviews pull. Runs before the main build (see package.json
// "build" — chained with `;` so a failure here can NEVER break the deploy).
//
// For each published row in `locations`:
//   1. Resolve the Google Place ID. The stored gbp_id is a numeric CID that
//      the Places API won't accept, so we use the verified CID→Place-ID map
//      below (same IDs committed in src/data/initialData.ts). Unknown CIDs
//      fall back to Places Find Place (name + address), accepted only when
//      the returned address matches the location's street number + zip.
//   2. Place Details → rating, user_ratings_total, reviews (max 5), url.
//   3. Write back through the token-gated `sync_google_reviews` RPC
//      (SECURITY DEFINER, see supabase migration google_reviews_sync_rpc):
//      locations.rating / review_count / gbp_review_url, and replace this
//      location's `source='google'` rows in `reviews` with the fresh set
//      (idempotent — repeat deploys never stack duplicates, and we don't
//      warehouse review content Google no longer returns). The RPC token can
//      ONLY sync reviews — deliberately narrower than a service_role key.
//
// Fail-open policy: any error (missing env, network, API denial) logs a
// warning and exits 0. Reviews are additive; the site must always build.
//
// Env (Netlify): GOOGLE_PLACES_API_KEY (secret), REVIEWS_SYNC_TOKEN (secret),
// SUPABASE_URL, VITE_SUPABASE_ANON_KEY.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

// Verified Google Place IDs, keyed by the numeric CID stored in locations.gbp_id.
// Source of truth: src/data/initialData.ts (pulled from Google Maps directly).
const PLACE_IDS = {
  '12480285319749977301': 'ChIJaVct0mnFyIARdvyPBD0woKs', // russell-eastern
  '713698969307195759':   'ChIJ-bMRw37FyIARUkTRR70_N1I', // boca-kids-dentistry
  '3771727813625151561':  'ChIJkef_gkHDyIARCNVYfbgLbR0', // bonanza-eastern
  '4235426973177644326':  'ChIJua0XAMvByIARJ99Dm6vsyEg', // sahara-decatur
  '2952933383164748156':  'ChIJy56P-znByIARfEWcGsSEiho', // jones-i95
  '7831904157916677811':  'ChIJWTQ5eEnbyIAR0xVpH64lRM4', // charleston-lamb
  '2961798297587834846':  'ChIJCZNPPHrHyIARtmeHq2dMriA', // flamingo-torrey
  '15915592984048706361': 'ChIJ-1sqoc3ryIARY1W_qLSoMh0', // cheyenne-commons
  '4459160964095275325':  'ChIJJaBdhjXPyIAR6JNDkBh-XcU', // beltway-marketplace
}

const BRAND = 'Boca Dental and Braces'

const API_KEY = process.env.GOOGLE_PLACES_API_KEY
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
const SYNC_TOKEN = process.env.REVIEWS_SYNC_TOKEN

function warn(msg) {
  console.warn(`[fetch-google-reviews] WARN: ${msg}`)
}

if (!API_KEY || !SUPABASE_URL || !ANON_KEY || !SYNC_TOKEN) {
  warn(
    'missing env (GOOGLE_PLACES_API_KEY / SUPABASE_URL / VITE_SUPABASE_ANON_KEY / REVIEWS_SYNC_TOKEN) — skipping reviews pull, build continues.',
  )
  process.exit(0)
}

const supabase = createClient(SUPABASE_URL, ANON_KEY)

async function placesGet(path, params) {
  const url = new URL(`https://maps.googleapis.com/maps/api/place/${path}/json`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  url.searchParams.set('key', API_KEY)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Places ${path} HTTP ${res.status}`)
  const json = await res.json()
  if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') {
    throw new Error(`Places ${path} status ${json.status}: ${json.error_message ?? ''}`)
  }
  return json
}

/** Find Place fallback for locations whose CID isn't in PLACE_IDS. Only
 *  accepted when the returned address matches street number AND zip — two
 *  clinics can share a street (e.g. 5642 S Eastern Ste B vs Ste F). */
async function resolvePlaceId(loc) {
  const known = PLACE_IDS[loc.gbp_id]
  if (known) return known

  const query = `${BRAND} ${loc.label} ${loc.address} ${loc.city} ${loc.state} ${loc.zip}`
  const found = await placesGet('findplacefromtext', {
    input: query,
    inputtype: 'textquery',
    fields: 'place_id,name,formatted_address',
  })
  const candidate = found.candidates?.[0]
  if (!candidate) {
    warn(`${loc.label}: Find Place returned no candidates — skipping.`)
    return null
  }
  const streetNo = (loc.address.match(/^\d+/) ?? [])[0]
  const zip5 = (loc.zip ?? '').slice(0, 5)
  const addr = candidate.formatted_address ?? ''
  if (!streetNo || !addr.includes(streetNo) || (zip5 && !addr.includes(zip5))) {
    warn(
      `${loc.label}: Find Place candidate "${candidate.name}" @ "${addr}" does not match ${loc.address} ${loc.zip} — skipping (no wrong-listing data allowed).`,
    )
    return null
  }
  console.log(`[fetch-google-reviews] ${loc.label}: resolved via Find Place → ${candidate.place_id}`)
  return candidate.place_id
}

async function syncLocation(loc) {
  const placeId = await resolvePlaceId(loc)
  if (!placeId) return { label: loc.label, ok: false }

  const details = await placesGet('details', {
    place_id: placeId,
    fields: 'rating,user_ratings_total,reviews,url',
    reviews_sort: 'newest',
  })
  const r = details.result ?? {}

  // Individual reviews — Google returns at most 5; rating-only reviews
  // (no text) are skipped. The RPC replaces this location's google-sourced
  // rows atomically and updates the aggregate fields.
  const seen = new Set()
  const rows = (r.reviews ?? [])
    .filter((rev) => rev.text && rev.text.trim().length > 0)
    .filter((rev) => {
      const k = `${rev.author_name}::${rev.text.trim()}`
      if (seen.has(k)) return false
      seen.add(k)
      return true
    })
    .map((rev) => ({
      author_name: rev.author_name,
      rating: Math.round(rev.rating),
      review_text: rev.text.trim(),
      review_date: rev.time ? new Date(rev.time * 1000).toISOString().slice(0, 10) : null,
      source_url: r.url ?? null,
    }))

  const { data: inserted, error } = await supabase.rpc('sync_google_reviews', {
    p_token: SYNC_TOKEN,
    p_location_id: loc.id,
    p_rating: typeof r.rating === 'number' ? r.rating : null,
    p_review_count: typeof r.user_ratings_total === 'number' ? r.user_ratings_total : null,
    p_review_url: r.url ?? null,
    p_reviews: rows,
  })
  if (error) throw new Error(`sync rpc: ${error.message}`)

  console.log(
    `[fetch-google-reviews] ${loc.label}: rating=${r.rating ?? '—'} count=${r.user_ratings_total ?? '—'} reviews=${inserted ?? rows.length}`,
  )
  return { label: loc.label, ok: true }
}

try {
  const { data: locations, error } = await supabase
    .from('locations')
    .select('id, label, address, city, state, zip, gbp_id')
    .eq('is_published', true)
  if (error) throw new Error(`locations select: ${error.message}`)

  let ok = 0
  for (const loc of locations ?? []) {
    try {
      const res = await syncLocation(loc)
      if (res.ok) ok++
    } catch (e) {
      warn(`${loc.label}: ${e.message} — continuing with remaining locations.`)
    }
  }
  console.log(`[fetch-google-reviews] done — ${ok}/${locations?.length ?? 0} locations synced.`)
} catch (e) {
  warn(`${e.message} — skipping reviews pull, build continues.`)
}
process.exit(0)
