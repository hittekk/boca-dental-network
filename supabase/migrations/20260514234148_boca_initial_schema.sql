-- =============================================================================
-- Boca Dental Admin — Initial Schema
-- Mirrors INITIAL_DATA structure from boca-dental-network/src/data/initialData.ts
-- Designed to be cloneable for the next dental client (DentalPress Frontend product).
-- =============================================================================

create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- =============================================================================
-- AUTH SCAFFOLDING — profiles + roles
-- =============================================================================
create type public.app_role as enum ('owner', 'admin', 'editor', 'viewer');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email citext unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'editor',
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  -- First user gets owner role
  if (select count(*) from auth.users) = 1 then
    insert into public.user_roles (user_id, role) values (new.id, 'owner');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'editor');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: is user an admin or owner?
create or replace function public.is_admin()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role in ('owner', 'admin')
  );
$$;

-- Helper: is user any authenticated team member?
create or replace function public.is_member()
returns boolean language sql security definer stable set search_path = public as $$
  select exists (
    select 1 from public.user_roles where user_id = auth.uid()
  );
$$;

-- =============================================================================
-- SITE SETTINGS — brand, announcement, hero variants, footer (singleton KV)
-- =============================================================================
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

-- =============================================================================
-- LOCATIONS — 9 LV clinics (mirrors INITIAL_DATA.locations)
-- =============================================================================
create table public.locations (
  id uuid primary key default gen_random_uuid(),
  legacy_id int unique,                              -- maps to old INITIAL_DATA.id
  slug citext unique not null,                       -- 'russell-eastern'
  label text not null,                               -- 'Russell & Eastern'
  address text not null,
  city text not null default 'Las Vegas',
  state text not null default 'NV',
  zip text not null,
  phone text not null,
  hours text not null,                               -- 'Mon–Fri 9am–7pm · Sat 9am–7pm'
  hours_detailed jsonb,                              -- {monday: {open, close}, ...} for structured display
  is_kids_clinic boolean not null default false,
  rating numeric(2,1),                               -- 4.9
  review_count int not null default 0,
  neighborhood text,                                 -- 'Southeast Las Vegas'
  narrative text,                                    -- long form neighborhood description
  gbp_id text,                                       -- Google Business Profile ID
  gbp_review_url text,                               -- direct link to Google reviews
  latitude numeric(10,7),
  longitude numeric(10,7),
  parking_info text,
  languages text[] not null default '{}',            -- ['English','Spanish','Mandarin']
  insurance_notes text,
  same_day_emergency boolean not null default true,
  hero_image_url text,
  exterior_image_url text,
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index locations_slug_idx on public.locations(slug);
create index locations_published_idx on public.locations(is_published, sort_order);

-- =============================================================================
-- LOCATION FAQS — per-location FAQ items
-- =============================================================================
create table public.location_faqs (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index location_faqs_location_idx on public.location_faqs(location_id, sort_order);

-- =============================================================================
-- SERVICES — categories shown on homepage 3x3 + service detail pages
-- =============================================================================
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug citext unique not null,                       -- 'dental-implants'
  label text not null,                               -- 'Dental Implants'
  short_description text,                            -- card description
  category text,                                     -- 'General' | 'Cosmetic' | etc
  parent_service_id uuid references public.services(id) on delete set null,
  icon text,                                         -- lucide-react icon name
  hero_image_url text,
  body_html text,                                    -- service detail page rich content
  process_steps jsonb,                               -- [{title, description}, ...]
  show_on_homepage boolean not null default true,
  is_published boolean not null default true,
  sort_order int not null default 0,
  meta_title text,
  meta_description text,
  schema_jsonld jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index services_slug_idx on public.services(slug);
create index services_homepage_idx on public.services(show_on_homepage, sort_order);

-- =============================================================================
-- SERVICE FAQS — per-service FAQ items
-- =============================================================================
create table public.service_faqs (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- =============================================================================
-- DOCTORS — 14 dentists with bios, credentials
-- =============================================================================
create table public.doctors (
  id uuid primary key default gen_random_uuid(),
  slug citext unique not null,                       -- 'dr-wyatt-dannels'
  name text not null,                                -- 'Dr. Wyatt Dannels, DDS'
  title text,                                        -- 'Lead Dentist & Founder'
  bio text,
  short_bio text,                                    -- card-length
  credentials text[],                                -- ['DDS','MAGD']
  specialties text[],                                -- ['General','Cosmetic']
  languages text[] not null default '{English}',
  alma_mater text,
  graduation_year int,
  years_experience int,
  headshot_url text,
  photo_url text,                                    -- larger photo for bio page
  is_published boolean not null default true,
  sort_order int not null default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index doctors_slug_idx on public.doctors(slug);

-- =============================================================================
-- DOCTOR_LOCATIONS — many-to-many: which doctor works at which clinic
-- =============================================================================
create table public.doctor_locations (
  doctor_id uuid not null references public.doctors(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  is_primary_location boolean not null default false,
  sort_order int not null default 0,
  primary key (doctor_id, location_id)
);
create index doctor_locations_location_idx on public.doctor_locations(location_id);

-- =============================================================================
-- REVIEWS — patient reviews (drives Review schema + S6 location card)
-- =============================================================================
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  location_id uuid references public.locations(id) on delete cascade,
  doctor_id uuid references public.doctors(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  review_text text not null,
  review_date date,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  source text,                                       -- 'google' | 'yelp' | 'submitted'
  source_url text,
  created_at timestamptz not null default now()
);
create index reviews_location_idx on public.reviews(location_id, is_published);
create index reviews_featured_idx on public.reviews(is_featured) where is_featured = true;

-- =============================================================================
-- LEADS — consultation requests + form submissions
-- =============================================================================
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email citext,
  phone text not null,
  preferred_location_id uuid references public.locations(id) on delete set null,
  service_interest text,
  message text,
  pain_level int check (pain_level between 0 and 10),
  insurance text,
  preferred_contact text,                            -- 'phone' | 'email' | 'text'
  source_page text,                                  -- '/contact', '/services/invisalign', etc.
  source_form text,                                  -- 'consultation' | 'contact' | 'callback'
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'new',                -- 'new' | 'contacted' | 'booked' | 'closed'
  notes text,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now(),
  contacted_at timestamptz,
  closed_at timestamptz
);
create index leads_status_idx on public.leads(status, created_at desc);
create index leads_location_idx on public.leads(preferred_location_id);

-- =============================================================================
-- ANNOUNCEMENTS — site-wide banner content (replaces brand.announcement)
-- =============================================================================
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  link_url text,
  link_label text,
  is_active boolean not null default false,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

-- =============================================================================
-- PAGE META — per-page SEO overrides (homepage, about, dynamic location/service)
-- =============================================================================
create table public.page_meta (
  page_key citext primary key,                       -- 'home', 'about', 'location:russell-eastern'
  meta_title text,
  meta_description text,
  og_image_url text,
  canonical_url text,
  schema_jsonld jsonb,
  noindex boolean not null default false,
  updated_at timestamptz not null default now()
);

-- =============================================================================
-- MEDIA — Supabase Storage tracking
-- =============================================================================
create table public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,                        -- 'media/hero-russell.jpg'
  public_url text not null,
  filename text not null,
  mime_type text not null,
  size_bytes bigint not null,
  width int,
  height int,
  alt_text text,
  caption text,
  uploaded_by uuid references public.profiles(id),
  folder text default 'uploads',
  created_at timestamptz not null default now()
);
create index media_folder_idx on public.media(folder, created_at desc);

-- =============================================================================
-- AUDIT LOG — track every admin write (compliance + Frankie can see who did what)
-- =============================================================================
create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  action text not null,                              -- 'location.update', 'lead.contacted'
  resource_type text,
  resource_id uuid,
  changes jsonb,
  ip_address inet,
  created_at timestamptz not null default now()
);
create index audit_log_created_idx on public.audit_log(created_at desc);

-- =============================================================================
-- TRIGGERS
-- =============================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated  before update on public.profiles  for each row execute function public.set_updated_at();
create trigger locations_set_updated before update on public.locations for each row execute function public.set_updated_at();
create trigger services_set_updated  before update on public.services  for each row execute function public.set_updated_at();
create trigger doctors_set_updated   before update on public.doctors   for each row execute function public.set_updated_at();

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
alter table public.profiles          enable row level security;
alter table public.user_roles        enable row level security;
alter table public.site_settings     enable row level security;
alter table public.locations         enable row level security;
alter table public.location_faqs     enable row level security;
alter table public.services          enable row level security;
alter table public.service_faqs      enable row level security;
alter table public.doctors           enable row level security;
alter table public.doctor_locations  enable row level security;
alter table public.reviews           enable row level security;
alter table public.leads             enable row level security;
alter table public.announcements     enable row level security;
alter table public.page_meta         enable row level security;
alter table public.media             enable row level security;
alter table public.audit_log         enable row level security;

-- Public read on published content (so the public Boca site can fetch anonymously)
create policy "Public can read published locations"     on public.locations         for select using (is_published = true);
create policy "Public can read location faqs"           on public.location_faqs     for select using (true);
create policy "Public can read published services"      on public.services          for select using (is_published = true);
create policy "Public can read service faqs"            on public.service_faqs      for select using (true);
create policy "Public can read published doctors"       on public.doctors           for select using (is_published = true);
create policy "Public can read doctor_locations"        on public.doctor_locations  for select using (true);
create policy "Public can read published reviews"       on public.reviews           for select using (is_published = true);
create policy "Public can read site settings"           on public.site_settings     for select using (true);
create policy "Public can read active announcements"    on public.announcements     for select using (is_active = true);
create policy "Public can read page meta"               on public.page_meta         for select using (true);
create policy "Public can read media"                   on public.media             for select using (true);

-- Public can submit leads (form submissions)
create policy "Anyone can submit a lead" on public.leads for insert with check (true);

-- Members can read everything
create policy "Members read profiles"          on public.profiles         for select using (id = auth.uid() or public.is_member());
create policy "Members update own profile"     on public.profiles         for update using (id = auth.uid());
create policy "Members read user_roles"        on public.user_roles       for select using (user_id = auth.uid() or public.is_admin());
create policy "Admins manage user_roles"       on public.user_roles       for all    using (public.is_admin());

create policy "Members read leads"             on public.leads            for select using (public.is_member());
create policy "Members update leads"           on public.leads            for update using (public.is_member());
create policy "Admins delete leads"            on public.leads            for delete using (public.is_admin());

create policy "Members read audit log"         on public.audit_log        for select using (public.is_member());
create policy "Authenticated insert audit log" on public.audit_log        for insert with check (auth.uid() is not null);

-- Members can manage all content
create policy "Members manage site_settings"   on public.site_settings    for all using (public.is_member()) with check (public.is_member());
create policy "Members manage locations"       on public.locations        for all using (public.is_member()) with check (public.is_member());
create policy "Members manage location_faqs"   on public.location_faqs    for all using (public.is_member()) with check (public.is_member());
create policy "Members manage services"        on public.services         for all using (public.is_member()) with check (public.is_member());
create policy "Members manage service_faqs"    on public.service_faqs     for all using (public.is_member()) with check (public.is_member());
create policy "Members manage doctors"         on public.doctors          for all using (public.is_member()) with check (public.is_member());
create policy "Members manage doctor_locations" on public.doctor_locations for all using (public.is_member()) with check (public.is_member());
create policy "Members manage reviews"         on public.reviews          for all using (public.is_member()) with check (public.is_member());
create policy "Members manage announcements"   on public.announcements    for all using (public.is_member()) with check (public.is_member());
create policy "Members manage page_meta"       on public.page_meta        for all using (public.is_member()) with check (public.is_member());
create policy "Members manage media"           on public.media            for all using (public.is_member()) with check (public.is_member());

-- =============================================================================
-- SEED — site_settings with current brand info from INITIAL_DATA
-- =============================================================================
insert into public.site_settings (key, value) values
  ('brand', '{"name":"Boca Dental and Braces","tagline":"Knocking Out the Competition","phone":"(702) 456-0005","domain":"bocadentalandbraces.com","email":"hello@bocadentalandbraces.com","colors":{"orange":"#F3672A","navy":"#162E7A","dark_navy":"#001D3D","black":"#000000"}}'::jsonb),
  ('site', '{"id":"las-vegas","name":"Boca Dental Las Vegas Network","timezone":"America/Los_Angeles"}'::jsonb),
  ('footer', '{"copyright":"Hand-crafted by DataStackLogic","tagline":"Vegas dental, done right."}'::jsonb);

insert into public.announcements (text, link_url, link_label, is_active) values
  ('Now accepting new patients at all 9 Las Vegas locations · Se Habla Español', '/contact', 'Book Today', true);
