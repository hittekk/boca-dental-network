// ─────────────────────────────────────────────────────────────────────────────
// src/lib/site-data.tsx
// SiteDataProvider — fetches all live content from Supabase and provides it
// in the exact INITIAL_DATA shape that components already consume.
//
// Components that import INITIAL_DATA can be migrated one at a time to call
// useSiteData() instead. Until migrated, they continue to read the static
// fallback. Once migrated, they get live data from the admin.
//
// Service-page content (the rich treatment pages) is provided separately via
// useServicePages(), merging DB rows over the static SERVICE_CONTENT fallback.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { InitialData, Location, Service, Doctor, Manager, LocationReview } from '../types';
import { supabase, isSupabaseConfigured } from './supabase';
import { INITIAL_DATA } from '../data/initialData';
import { locationsForDoctor } from '../data/doctorLocations';
import type { AnalyticsConfig } from './analytics';
import type { ServicePageEntry } from '../data/serviceCatalog';
import { SERVICE_CONTENT, type ServiceContent } from '../data/serviceContent';

const SiteDataContext = createContext<InitialData>(INITIAL_DATA);
const AnalyticsConfigContext = createContext<AnalyticsConfig>({});
const BlogEnabledContext = createContext<boolean | undefined>(undefined);

export type ServicePagesValue = {
  /** Full per-page content keyed by service slug (DB merged over static fallback). */
  content: Record<string, ServiceContent>;
  /** Spanish twin of `content`. Field-by-field EN fallback so partial translations never blank a page. */
  contentEs: Record<string, ServiceContent>;
  /** DB-managed service pages as catalog entries (for category-hub listings + new pages). */
  entries: ServicePageEntry[];
};
const DEFAULT_SERVICE_PAGES: ServicePagesValue = { content: SERVICE_CONTENT, contentEs: SERVICE_CONTENT, entries: [] };
const ServicePagesContext = createContext<ServicePagesValue>(DEFAULT_SERVICE_PAGES);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InitialData>(INITIAL_DATA);
  const [analytics, setAnalytics] = useState<AnalyticsConfig>({});
  const [blogEnabled, setBlogEnabled] = useState<boolean | undefined>(undefined);
  const [servicePages, setServicePages] = useState<ServicePagesValue>(DEFAULT_SERVICE_PAGES);

  useEffect(() => {
    if (!isSupabaseConfigured) { setBlogEnabled(false); return; }
    let cancelled = false;

    (async () => {
      try {
        const [locs, svcs, settings, ann, faqs, reviews, pages, docs, docLocs, oms] = await Promise.all([
          supabase
            .from('locations')
            .select('legacy_id, slug, label, address, city, state, zip, phone, hours, is_kids_clinic, rating, review_count, neighborhood, narrative, gbp_id, languages, gallery, id')
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
          supabase
            .from('reviews')
            .select('location_id, author_name, rating, review_text, review_date, is_featured')
            .eq('is_published', true)
            .order('is_featured', { ascending: false }),
          supabase
            .from('service_pages')
            .select('slug, category_slug, label, short_desc, title_tag, meta_description, primary_keyword, secondary_keywords, h1, hero_intro, hero_alt, content, title_tag_es, meta_description_es, h1_es, hero_intro_es, hero_alt_es, label_es, content_es')
            .eq('is_published', true)
            .order('sort_order'),
          supabase
            .from('doctors')
            .select('id, slug, name, title, bio, headshot_url, photo_url')
            .eq('is_published', true)
            .order('sort_order'),
          supabase
            .from('doctor_locations')
            .select('doctor_id, location_id, is_primary_location, sort_order'),
          supabase
            .from('office_managers')
            .select('id, name, title, location_id, image_url, sort_order')
            .eq('is_published', true)
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

        // location uuid -> real reviews (featured first)
        const reviewsByLocation = new Map<string, LocationReview[]>();
        (reviews.data ?? []).forEach((r: {
          location_id: string | null; author_name: string; rating: number;
          review_text: string; review_date: string | null;
        }) => {
          if (!r.location_id) return;
          const list = reviewsByLocation.get(r.location_id) ?? [];
          list.push({
            author: r.author_name,
            rating: r.rating,
            body: r.review_text,
            date: r.review_date ?? undefined,
          });
          reviewsByLocation.set(r.location_id, list);
        });

        const mappedLocations: Location[] = (locs.data ?? []).map((l: {
          legacy_id: number | null; slug: string; label: string; address: string;
          city: string; state: string; zip: string; phone: string; hours: string;
          is_kids_clinic: boolean; rating: number | null; review_count: number;
          neighborhood: string | null; narrative: string | null; gbp_id: string | null;
          languages: string[] | null; gallery: string[] | null; id: string;
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
          // DB gallery/heroImage aren't populated yet — fall back to the static
          // clinic photos (files live in /public/locations/<slug>/).
          gallery: Array.isArray(l.gallery) && l.gallery.length > 0
            ? l.gallery
            : INITIAL_DATA.locations.find((s) => s.slug === l.slug)?.gallery,
          heroImage: INITIAL_DATA.locations.find((s) => s.slug === l.slug)?.heroImage,
          reviews: reviewsByLocation.get(l.id) ?? [],
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

        // location uuid -> slug, for resolving doctor_locations / office_managers
        const locIdToSlug = new Map<string, string>(
          (locs.data ?? []).map((l: { id: string; slug: string }) => [l.id, l.slug]),
        );

        // doctor_id -> ordered clinic links (primary first, then sort_order)
        const linksByDoctor = new Map<string, { slug: string; primary: boolean; sort: number }[]>();
        (docLocs.data ?? []).forEach((dl: {
          doctor_id: string; location_id: string; is_primary_location: boolean | null; sort_order: number | null;
        }) => {
          const slug = locIdToSlug.get(dl.location_id);
          if (!slug) return;
          const arr = linksByDoctor.get(dl.doctor_id) ?? [];
          arr.push({ slug, primary: !!dl.is_primary_location, sort: dl.sort_order ?? 0 });
          linksByDoctor.set(dl.doctor_id, arr);
        });

        // Static doctors are the fallback source for the rich bios/photos that
        // aren't stored in the DB. Overlay DB (admin-editable) fields on top so
        // admin changes go live, while keeping static bio/photo when DB is blank.
        const staticDoctorBySlug = new Map(INITIAL_DATA.doctors.map((d) => [d.slug, d]));
        const mappedDoctors: Doctor[] = (docs.data ?? []).map((d: {
          id: string; slug: string; name: string; title: string | null; bio: string | null;
          headshot_url: string | null; photo_url: string | null;
        }) => {
          const links = (linksByDoctor.get(d.id) ?? []).sort(
            (a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0) || a.sort - b.sort,
          );
          const s = staticDoctorBySlug.get(d.slug);
          const dbBio = (d.bio ?? '').trim();
          return {
            slug: d.slug,
            name: d.name || s?.name || '',
            title: d.title ?? s?.title ?? '',
            bio: dbBio || s?.bio || '',
            photo: d.headshot_url ?? d.photo_url ?? s?.photo,
            familyPhoto: s?.familyPhoto,
            // DB doctor_locations win; fall back to the canonical static map.
            locations: links.length ? links.map((x) => x.slug) : locationsForDoctor(d.slug),
          };
        });

        const mappedManagers: Manager[] = (oms.data ?? []).map((m: {
          id: string; name: string; title: string | null; location_id: string | null; image_url: string | null;
        }) => ({
          slug: m.id,
          name: m.name,
          title: m.title ?? 'Office Manager',
          photo: m.image_url ?? undefined,
          locationSlug: m.location_id ? locIdToSlug.get(m.location_id) ?? '' : '',
        }));

        const dbServiceContent: Record<string, ServiceContent> = {};
        const dbServiceContentEs: Record<string, ServiceContent> = {};
        const dbServiceEntries: ServicePageEntry[] = [];
        (pages.data ?? []).forEach((p: {
          slug: string; category_slug: string; label: string; short_desc: string | null;
          title_tag: string | null; meta_description: string | null; primary_keyword: string | null;
          secondary_keywords: string[] | null; h1: string | null; hero_intro: string | null;
          hero_alt: string | null; content: Record<string, unknown> | null;
          title_tag_es: string | null; meta_description_es: string | null; h1_es: string | null;
          hero_intro_es: string | null; hero_alt_es: string | null; label_es: string | null;
          content_es: Record<string, unknown> | null;
        }) => {
          const en = {
            categorySlug: p.category_slug,
            slug: p.slug,
            label: p.label,
            titleTag: p.title_tag ?? '',
            metaDesc: p.meta_description ?? '',
            primaryKeyword: p.primary_keyword ?? '',
            secondaryKeywords: p.secondary_keywords ?? [],
            h1: p.h1 ?? p.label,
            heroIntro: p.hero_intro ?? '',
            heroAlt: p.hero_alt ?? '',
            ...(p.content ?? {}),
          } as unknown as ServiceContent;
          dbServiceContent[p.slug] = en;
          // ES twin: start from EN, overlay any present ES flat field + ES content keys.
          // Field-by-field fallback keeps partial translations from blanking the page.
          const esFlat: Record<string, unknown> = {};
          if (p.label_es) esFlat.label = p.label_es;
          if (p.title_tag_es) esFlat.titleTag = p.title_tag_es;
          if (p.meta_description_es) esFlat.metaDesc = p.meta_description_es;
          if (p.h1_es) esFlat.h1 = p.h1_es;
          if (p.hero_intro_es) esFlat.heroIntro = p.hero_intro_es;
          if (p.hero_alt_es) esFlat.heroAlt = p.hero_alt_es;
          dbServiceContentEs[p.slug] = {
            ...(en as unknown as Record<string, unknown>),
            ...esFlat,
            ...(p.content_es ?? {}),
          } as unknown as ServiceContent;
          dbServiceEntries.push({
            slug: p.slug,
            label: p.label,
            categorySlug: p.category_slug,
            desc: p.short_desc ?? '',
          });
        });

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
          doctors: mappedDoctors.length > 0 ? mappedDoctors : INITIAL_DATA.doctors,
          managers: mappedManagers.length > 0 ? mappedManagers : INITIAL_DATA.managers,
        };

        setData(newData);
        setAnalytics(analyticsSettings);
        setBlogEnabled(!!(settingsMap.blog as { enabled?: boolean } | undefined)?.enabled);
        setServicePages({
          content: { ...SERVICE_CONTENT, ...dbServiceContent },
          contentEs: { ...SERVICE_CONTENT, ...dbServiceContentEs },
          entries: dbServiceEntries,
        });
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
        <BlogEnabledContext.Provider value={blogEnabled}>
          <ServicePagesContext.Provider value={servicePages}>
            {children}
          </ServicePagesContext.Provider>
        </BlogEnabledContext.Provider>
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

/** Whether the blog section is on. `undefined` while the setting is still loading. */
export function useBlogEnabled(): boolean | undefined {
  return useContext(BlogEnabledContext);
}

export function useServicePages(): ServicePagesValue {
  return useContext(ServicePagesContext);
}

// ── Doctor helpers ───────────────────────────────────────────────────────────
// All read the merged siteData.doctors (DB overlaid on static fallback), so the
// admin is the live source of truth for the roster + per-location assignments.
export function useDoctors(): Doctor[] {
  return useContext(SiteDataContext).doctors;
}
export function useDoctorBySlug(slug: string | undefined): Doctor | undefined {
  const doctors = useDoctors();
  return slug ? doctors.find((d) => d.slug === slug) : undefined;
}
export function useDoctorsForLocation(slug: string): Doctor[] {
  return useDoctors().filter((d) => d.locations?.includes(slug));
}
