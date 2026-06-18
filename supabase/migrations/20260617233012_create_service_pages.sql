-- Rich, editable treatment/service detail pages.
-- Scalar columns = identity + SEO (queryable, list-friendly).
-- content jsonb = the body sections, mirroring the ServiceContent shape the
-- frontend layout already renders (whatIs, signs, candidacy, steps, benefits,
-- comparison, differentiators, providerInline, faqs, cost, related, geo).
create table if not exists public.service_pages (
  id                 uuid primary key default gen_random_uuid(),
  slug               citext not null unique,
  category_slug      text not null,
  label              text not null,
  short_desc         text,
  title_tag          text,
  meta_description   text,
  primary_keyword    text,
  secondary_keywords text[] not null default '{}',
  h1                 text,
  hero_intro         text,
  hero_alt           text,
  hero_image_url     text,
  content            jsonb not null default '{}'::jsonb,
  schema_jsonld      jsonb,
  is_pediatric       boolean not null default false,
  is_published       boolean not null default true,
  sort_order         integer not null default 0,
  created_by         uuid references public.profiles(id),
  updated_by         uuid references public.profiles(id),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists service_pages_category_idx  on public.service_pages (category_slug, sort_order);
create index if not exists service_pages_published_idx on public.service_pages (is_published);

alter table public.service_pages enable row level security;

create policy "Public can read published service_pages"
  on public.service_pages for select
  using (is_published = true);

create policy "Members manage service_pages"
  on public.service_pages for all
  using (is_member()) with check (is_member());

create or replace function public.tg_service_pages_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger service_pages_set_updated_at
  before update on public.service_pages
  for each row execute function public.tg_service_pages_set_updated_at();