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

/** A single service offered across locations */
export interface Service {
  slug: string;
  label: string;
  desc: string;
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
  hours: string;
  /** True = Boca Kids pediatric location */
  kids: boolean;
  rating: number;
  review_count: number;
  neighborhood: string;
  /** Google Business Profile Place ID — required for schema GBP alignment */
  gbp_id: string;
  faqs: FAQ[];
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
}

/** Single navigation link */
export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}
