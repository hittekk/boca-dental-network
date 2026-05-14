// ─────────────────────────────────────────────────────────────────────────────
// src/types/index.ts
// Global TypeScript interfaces for DentalPress Frontend
// All shapes mirror the wp_options JSON injected as window.INITIAL_DATA
// ─────────────────────────────────────────────────────────────────────────────

/** A single FAQ item — powers FAQPage JSON-LD schema per location */
export interface FAQ {
  question: string;
  answer: string;
}

/** Day-by-day hours for a location — drives Section 2 table + LocalBusiness `openingHoursSpecification` schema */
export interface DayHours {
  /** "Monday" through "Sunday" */
  day:    'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  /** "8:00 AM" or "Closed" */
  open:   string;
  /** "5:00 PM" or "" when closed */
  close:  string;
  /** True for the row corresponding to today (set at render time) */
  closed?: boolean;
  /** Optional note ("by emergency only", etc.) */
  note?:  string;
}

/** A single location-specific review — drives Section 6 cards + Review JSON-LD */
export interface LocationReview {
  /** First name + last initial only (anonymization standard from Treysyde spec) */
  author:       string;
  /** Neighborhood/area the reviewer is from (e.g. "Sunrise Manor", "Henderson, NV") */
  authorArea?:  string;
  rating:       number;
  body:         string;
  /** Optional date string (ISO or short form) */
  date?:        string;
}

/** A single service offered across locations */
export interface Service {
  slug: string;
  label: string;
  desc: string;
  /** Sitemap category — General, Cosmetic, Restorative, Implants, etc. */
  category?: string;
}

/** A single location — mirrors wp_options location JSON structure */
export interface Location {
  id: number;
  slug: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  /** Short summary string ("Mon–Fri 9am–7pm · Sat 9am–7pm") — display fallback */
  hours: string;
  /** Structured day-by-day hours for the spec-required Section 2 table + LocalBusiness schema. 7 entries (Mon–Sun). [verify with client] */
  hoursDetail?: DayHours[];
  /** Languages spoken at this clinic (default ["English"]) */
  languages?: string[];
  /** Parking note ("Free on-site parking", "Garage with validation", etc.) */
  parking?: string;
  /** Service slugs explicitly NOT available at this clinic — used for the Section 5 availability callout */
  servicesUnavailable?: string[];
  /** 3 location-specific reviews per Treysyde Location §6. [content] populate from real Google reviews before launch. */
  reviews?: LocationReview[];
  /** True = Boca Kids pediatric location */
  kids: boolean;
  rating: number;
  review_count: number;
  neighborhood: string;
  /** 100–150 word unique narrative for this clinic's neighborhood — critical for local SEO (duplicate copy is the #1 local-SEO killer per LAUNCH_CHECKLIST). */
  narrative: string;
  /** Google Business Profile Place ID — required for schema GBP alignment */
  gbp_id: string;
  faqs: FAQ[];
}

/** A single dentist — gets its own /about-us/dentists/[slug]/ page with Person + Physician schema (E-E-A-T) */
export interface Doctor {
  slug: string;
  name: string;
  title: string;
  bio: string;
  /** Optional headshot URL — uploaded via admin */
  photo?: string;
  /** Slugs of locations this doctor practices at — empty array OK during mocking */
  locations: string[];
}

/**
 * Announcement bar data — stored in wp_options, editable from React admin.
 * When enabled is false the bar does not render at all.
 */
export interface Announcement {
  enabled: boolean;
  text: string;
  link?: string;
  linkLabel?: string;
}

/** Top-level brand data */
export interface Brand {
  name: string;
  tagline: string;
  phone: string;
  domain: string;
}

/** Root shape of window.INITIAL_DATA — PHP injects this on every page load */
export interface InitialData {
  site: string;
  brand: Brand;
  announcement: Announcement;
  locations: Location[];
  services: Service[];
  doctors: Doctor[];
}

/** Single navigation link */
export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}
