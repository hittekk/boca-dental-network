// ─────────────────────────────────────────────────────────────────────────────
// src/lib/analytics.tsx
// First-party analytics + GA4/GTM/Meta Pixel/Google Ads injector.
// All tracker IDs are read from Supabase site_settings.analytics — just paste
// IDs in the admin and the scripts fire automatically.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from './supabase';
import { useAnalyticsConfigFromSettings } from './site-data';

export type AnalyticsConfig = {
  ga4_measurement_id?: string;
  gtm_container_id?: string;
  google_ads_conversion_id?: string;
  google_ads_conversion_label?: string;
  meta_pixel_id?: string;
  looker_studio_embed_url?: string;
  track_phone_clicks?: boolean;
  track_form_submissions?: boolean;
  track_cta_clicks?: boolean;
};

type AnalyticsContextValue = {
  config: AnalyticsConfig;
  track: (eventType: string, metadata?: Record<string, unknown>) => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue>({
  config: {},
  track: () => {},
});

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

// Persist a session id in sessionStorage so we can group events from one visit
function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let sid = sessionStorage.getItem('boca_sid');
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem('boca_sid', sid);
  }
  return sid;
}

function parseUTM(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
    const v = p.get(k);
    if (v) utm[k] = v;
  });
  return utm;
}

// Fire-and-forget first-party event insert.
// NOTE: the postgrest-js query builder is LAZY — the HTTP request is only sent
// when the builder is awaited or `.then()`-chained. A bare `void supabase…insert()`
// builds the query but never sends it, silently dropping every event. We chain
// `.then()` here so the request actually fires, and swallow errors so analytics
// can never break the page.
function recordEvent(row: Record<string, unknown>) {
  if (!isSupabaseConfigured) return;
  supabase
    .from('analytics_events')
    .insert(row)
    .then(
      ({ error }) => {
        if (error && typeof console !== 'undefined') {
          console.debug('[analytics] event insert failed:', error.message);
        }
      },
      () => {
        /* network error — ignore, analytics is non-critical */
      },
    );
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const safeConfig = useAnalyticsConfigFromSettings() ?? {};
  const injectedRef = useRef(false);
  const routerLocation = useLocation();

  // Inject third-party scripts once
  useEffect(() => {
    if (injectedRef.current) return;
    if (typeof document === 'undefined') return;
    injectedRef.current = true;

    const { ga4_measurement_id, gtm_container_id, meta_pixel_id } = safeConfig;

    // ── GTM ───────────────────────────────────────────────────────────
    if (gtm_container_id) {
      const s = document.createElement('script');
      s.async = true;
      s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm_container_id}');`;
      document.head.appendChild(s);

      // noscript fallback
      const ns = document.createElement('noscript');
      ns.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtm_container_id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      document.body.appendChild(ns);
    }

    // ── GA4 (gtag.js) ─────────────────────────────────────────────────
    if (ga4_measurement_id) {
      const s1 = document.createElement('script');
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${ga4_measurement_id}`;
      document.head.appendChild(s1);

      const s2 = document.createElement('script');
      s2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${ga4_measurement_id}', { send_page_view: false }); // we'll send page_view manually on route change
      `;
      document.head.appendChild(s2);
    }

    // ── Meta Pixel ────────────────────────────────────────────────────
    if (meta_pixel_id) {
      const s = document.createElement('script');
      s.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${meta_pixel_id}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(s);
    }
  }, [safeConfig]);

  // Global click delegation — track tel: clicks + any element with data-track
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a, button') as HTMLAnchorElement | HTMLButtonElement | null;
      if (!anchor) return;

      // tel: link → phone_click
      if (anchor.tagName === 'A') {
        const href = (anchor as HTMLAnchorElement).href || '';
        if (href.startsWith('tel:') && safeConfig.track_phone_clicks !== false) {
          track('phone_click', {
            phone: href.replace('tel:', ''),
            label: anchor.textContent?.trim().slice(0, 80),
          });
          return;
        }
      }

      // any element with data-track attribute
      const trackName = anchor.getAttribute('data-track');
      if (trackName) {
        const meta: Record<string, string> = {};
        Array.from(anchor.attributes).forEach((attr) => {
          if (attr.name.startsWith('data-track-') && attr.name !== 'data-track') {
            meta[attr.name.replace('data-track-', '')] = attr.value;
          }
        });
        track(trackName, meta);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeConfig.track_phone_clicks]);

  // Auto track route changes
  useEffect(() => {
    const path = routerLocation.pathname;
    if (!path || path.startsWith('/dental-admin')) return; // don't track admin views

    // GA4 page_view
    if (typeof window !== 'undefined' && window.gtag && safeConfig.ga4_measurement_id) {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: document.title,
        page_location: window.location.href,
      });
    }

    // Meta Pixel PageView (after first one fires on init)
    if (typeof window !== 'undefined' && window.fbq && safeConfig.meta_pixel_id) {
      window.fbq('track', 'PageView');
    }

    // First-party event (always — works without any Google IDs)
    if (isSupabaseConfigured) {
      const utm = parseUTM();
      recordEvent({
        event_type: 'page_view',
        page_path: path,
        page_title: typeof document !== 'undefined' ? document.title : null,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        session_id: getSessionId(),
        variant: new URLSearchParams(window.location.search).get('variant') ?? 'a',
        utm_source: utm.utm_source ?? null,
        utm_medium: utm.utm_medium ?? null,
        utm_campaign: utm.utm_campaign ?? null,
        utm_term: utm.utm_term ?? null,
        utm_content: utm.utm_content ?? null,
      });
    }
  }, [routerLocation.pathname, safeConfig.ga4_measurement_id, safeConfig.meta_pixel_id]);

  // Universal track() function — fires GA + Meta + Google Ads + first-party
  const track = (eventType: string, metadata: Record<string, unknown> = {}) => {
    // GA4 custom event
    if (typeof window !== 'undefined' && window.gtag && safeConfig.ga4_measurement_id) {
      window.gtag('event', eventType, metadata);
    }

    // Meta Pixel (treat form_submit as Lead, phone_click as Contact)
    if (typeof window !== 'undefined' && window.fbq && safeConfig.meta_pixel_id) {
      if (eventType === 'form_submit') window.fbq('track', 'Lead', metadata);
      else if (eventType === 'phone_click') window.fbq('track', 'Contact', metadata);
      else window.fbq('trackCustom', eventType, metadata);
    }

    // Google Ads conversion (only for form_submit)
    if (eventType === 'form_submit' && safeConfig.google_ads_conversion_id && safeConfig.google_ads_conversion_label && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${safeConfig.google_ads_conversion_id}/${safeConfig.google_ads_conversion_label}`,
      });
    }

    // First-party (always)
    if (isSupabaseConfigured) {
      recordEvent({
        event_type: eventType,
        page_path: typeof window !== 'undefined' ? window.location.pathname : null,
        page_title: typeof document !== 'undefined' ? document.title : null,
        session_id: getSessionId(),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        metadata,
      });
    }
  };

  return (
    <AnalyticsContext.Provider value={{ config: safeConfig, track }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useTrack() {
  return useContext(AnalyticsContext).track;
}

export function useAnalyticsConfig() {
  return useContext(AnalyticsContext).config;
}
