import type { Location, LocationReview } from '../types'

/**
 * Single source of truth for ratings / reviews across the site.
 *
 * Every rating surface (homepage aggregate, TrustBar, CTA badge, reviews page)
 * derives from the per-clinic DB fields, refreshed from Google on each build
 * by scripts/fetch-google-reviews.mjs:
 *   - location.rating         (number, 0 = no rating yet)
 *   - location.review_count   (number, 0 = no reviews yet)
 *   - location.gbp_id         (Google CID for the public listing URL)
 *   - location.reviews[]      (real pulled Google reviews, empty = none yet)
 *
 * Helpers return null / empty when no real data exists so nothing is ever
 * invented — no-fabrication rule.
 */

export interface ReviewAggregate {
  rating: number
  count: number
}

/** Brand-wide aggregate, weighted by each clinic's review_count.
 *  Returns null until at least one clinic has real numbers. */
export function reviewAggregate(locations: Location[]): ReviewAggregate | null {
  const rated = locations.filter((l) => l.review_count > 0 && l.rating > 0)
  const count = rated.reduce((s, l) => s + l.review_count, 0)
  if (count === 0) return null
  const weighted = rated.reduce((s, l) => s + l.rating * l.review_count, 0) / count
  return { rating: Math.round(weighted * 10) / 10, count }
}

/** Every real review across all clinics, tagged with its clinic label. */
export function allReviews(
  locations: Location[],
): (LocationReview & { clinic: string })[] {
  return locations.flatMap((l) =>
    (l.reviews ?? []).map((r) => ({ ...r, clinic: l.label })),
  )
}

/** Public Google listing URL from the first clinic with a CID. gbp_id is a
 *  numeric CID → ?cid=… is the resolvable form. Null until real data exists. */
export function googleReviewsUrl(locations: Location[]): string | null {
  const withGbp = locations.find((l) => l.gbp_id)
  return withGbp ? `https://www.google.com/maps?cid=${withGbp.gbp_id}` : null
}

/** Initials from an author name ("Maria G." -> "MG"). */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/** Truncate a review body for card display — cut at a word boundary. */
export function truncateReview(text: string, max = 320): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trimEnd() + '…'
}
