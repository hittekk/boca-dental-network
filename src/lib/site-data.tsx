// ─────────────────────────────────────────────────────────────────────────────
// src/lib/site-data.tsx
// SiteDataProvider — fetches all live content from Supabase and provides it
// in the exact INITIAL_DATA shape that components already consume.
//
// Components that import INITIAL_DATA can be migrated one at a time to call
// useSiteData() instead. Until migrated, they continue to read the static
// fallback. Once migrated, they get live data from the admin.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { InitialData, Location, Service } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { INITIAL_DATA } from '../data/initialData';
import type { AnalyticsConfig } from './analytics';

type Extended = { data: InitialData; analytics: AnalyticsConfig };

const SiteDataContext = createContext<InitialData>(INITIAL_DATA);
const AnalyticsConfigContext = createContext<AnalyticsConfig>({});

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InitialData>(INITIAL_DATA);
  const [analytics, setAnalytics] = useState<AnalyticsConfig>({});

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    (async () => {
      try {
        const [locs, svcs, settings, ann, faqs] = await Promise.all([
          supabase
            .from('locations')
            .select('legacy_id, slug, label, address, city, state, zip, phone, hours, is_kids_clinic, rating, review_count, neighborhood, narrative, gbp_id, languages, id')
            .eq('is_published', true)
            .order('sort_order'),
          supabase
            .from('services')
            .select('slug, label, short_description, category')
            .eq('is_published', true)
            .order('sort_order'),
          supabase.from('site_settings').select('key, value'),
          supabase
            .from('announcements')
            .select('text, link_url, link_label')
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from('location_faqs')
            .select('location_id, question, answer, sort_order')
            .order('sort_order'),
        ]);

        if (cancelled) return;

        const settingsMap = Object.fromEntries((settings.data ?? []).map((s) => [s.key, s.value]));
        const brandSettings = (settingsMap.brand ?? {}) as Partial<InitialData['brand']>;
        const analyticsSettings = (settingsMap.analytics ?? {}) as AnalyticsConfig;

        const faqsByLocation = new Map<string, { question: string; answer: string }[]>();
        (faqs.data ?? []).forEach((f) => {
          const list = faqsByLocation.get(f.location_id) ?? [];
          list.push({ question: f.question, answer: f.answer });
          faqsByLocation.set(f.location_id, list);
        });

        const mappedLocations: Location[] = (locs.data ?? []).map((l: {
          legacy_id: number | null; slug: string; label: string; address: string;
          city: string; state: string; zip: string; phone: string; hours: string;
          is_kids_clinic: boolean; rating: number | null; review_count: number;
          neighborhood: string | null; narrative: string | null; gbp_id: string | null;
          languages: string[] | null; id: string;
        }) => ({
          id: l.legacy_id ?? 0,
          slug: l.slug,
          label: l.label,
          address: l.address,
          city: l.city,
          state: l.state,
          zip: l.zip,
          phone: l.phone,
          hours: l.hours,
          kids: l.is_kids_clinic,
          rating: l.rating ?? 0,
          review_count: l.review_count,
          neighborhood: l.neighborhood ?? '',
          narrative: l.narrative ?? '',
          gbp_id: l.gbp_id ?? '',
          languages: l.languages ?? ['English'],
          faqs: faqsByLocation.get(l.id) ?? [],
        }));

        const mappedServices: Service[] = (svcs.data ?? []).map((s: {
          slug: string; label: string; short_description: string | null; category: string | null;
        }) => ({
          slug: s.slug,
          label: s.label,
          desc: s.short_description ?? '',
          category: s.category ?? '',
        }));

        const newData: InitialData = {
          ...INITIAL_DATA,
          brand: {
            ...INITIAL_DATA.brand,
            ...brandSettings,
          },
          announcement: ann.data
            ? {
                enabled: true,
                text: ann.data.text,
                link: ann.data.link_url ?? '/contact',
                linkLabel: ann.data.link_label ?? 'Book Today',
              }
            : INITIAL_DATA.announcement,
          locations: mappedLocations.length > 0 ? mappedLocations : INITIAL_DATA.locations,
          services: mappedServices.length > 0 ? mappedServices : INITIAL_DATA.services,
          // doctors stays from INITIAL_DATA until we wire that table similarly
          doctors: INITIAL_DATA.doctors,
        };

        setData(newData);
        setAnalytics(analyticsSettings);
      } catch (err) {
        console.warn('[site-data] Supabase fetch failed, using static fallback:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteDataContext.Provider value={data}>
      <AnalyticsConfigContext.Provider value={analytics}>
        {children}
      </AnalyticsConfigContext.Provider>
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): InitialData {
  return useContext(SiteDataContext);
}

export function useAnalyticsConfigFromSettings(): AnalyticsConfig {
  return useContext(AnalyticsConfigContext);
}
