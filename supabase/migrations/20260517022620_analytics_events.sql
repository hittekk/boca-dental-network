-- =============================================================================
-- ANALYTICS EVENTS — first-party analytics owned by us (no Google account needed)
-- Anyone can INSERT (anon visitors are tracked). Only admin members can SELECT.
-- =============================================================================
create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,                          -- 'page_view' | 'form_submit' | 'phone_click' | 'cta_click' | 'location_view' | 'service_view' | 'transformation_view'
  page_path text,                                    -- '/clinics/russell-eastern'
  page_title text,
  referrer text,
  user_agent text,
  ip_address inet,
  session_id text,                                   -- random id per session, helps dedupe + measure sessions
  variant text,                                      -- 'a' | 'b' | 'c' (homepage variant tracking)
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  metadata jsonb default '{}'::jsonb,                -- { location_slug, service_slug, doctor_slug, form_id, etc. }
  created_at timestamptz not null default now()
);

-- Fast queries by event type + recency (for dashboard top-N + time series)
create index analytics_events_type_date_idx on public.analytics_events(event_type, created_at desc);
create index analytics_events_page_idx on public.analytics_events(page_path, created_at desc);
create index analytics_events_session_idx on public.analytics_events(session_id);
create index analytics_events_created_idx on public.analytics_events(created_at desc);

alter table public.analytics_events enable row level security;

-- Anyone (anon role from public site) can INSERT events
create policy "Anyone can record an analytics event"
  on public.analytics_events for insert
  with check (true);

-- Only authenticated members can read events
create policy "Members can read analytics"
  on public.analytics_events for select
  using (public.is_member());

-- =============================================================================
-- SEED — analytics settings stub in site_settings (admins fill in the IDs)
-- =============================================================================
insert into public.site_settings (key, value) values
  ('analytics', '{
    "ga4_measurement_id": "",
    "gtm_container_id": "",
    "google_ads_conversion_id": "",
    "google_ads_conversion_label": "",
    "meta_pixel_id": "",
    "looker_studio_embed_url": "",
    "track_phone_clicks": true,
    "track_form_submissions": true,
    "track_cta_clicks": true
  }'::jsonb)
on conflict (key) do nothing;
