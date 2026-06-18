-- =============================================================================
-- PAGE TEMPLATES — pre-configured templates the editor adapts to
-- =============================================================================
create table public.page_templates (
  id uuid primary key default gen_random_uuid(),
  slug citext unique not null,
  name text not null,
  description text,
  thumbnail_url text,
  category text,                                     -- 'core' | 'landing' | 'transactional' | 'content'
  icon text,                                         -- lucide icon name
  field_schema jsonb not null,                       -- defines editable fields for this template
  default_content jsonb default '{}'::jsonb,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- =============================================================================
-- PAGES — custom pages users can add (on top of the system pages)
-- =============================================================================
create type public.page_status as enum ('draft', 'published', 'archived');

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug citext unique not null,
  title text not null,
  template_id uuid references public.page_templates(id) on delete restrict,
  content jsonb not null default '{}'::jsonb,
  status public.page_status not null default 'draft',
  meta_title text,
  meta_description text,
  og_image_url text,
  show_in_nav boolean not null default false,
  nav_order int not null default 0,
  parent_page_id uuid references public.pages(id) on delete set null,
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index pages_slug_idx on public.pages(slug);
create index pages_status_idx on public.pages(status);
create index pages_nav_idx on public.pages(show_in_nav, nav_order) where show_in_nav = true;

create trigger pages_set_updated before update on public.pages for each row execute function public.set_updated_at();

-- =============================================================================
-- TRANSFORMATIONS — before/after photo gallery
-- =============================================================================
create table public.transformations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  treatment_type text,                               -- 'veneers' | 'invisalign' | 'crowns' | 'whitening' | 'implants' | 'general'
  before_image_url text not null,
  after_image_url text not null,
  patient_first_name text,
  patient_age_range text,
  treatment_duration text,
  doctor_id uuid references public.doctors(id) on delete set null,
  location_id uuid references public.locations(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  consent_obtained boolean not null default false,
  sort_order int not null default 0,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index transformations_published_idx on public.transformations(is_published, sort_order);
create index transformations_featured_idx on public.transformations(is_featured) where is_featured = true;

-- =============================================================================
-- RLS for new tables
-- =============================================================================
alter table public.page_templates  enable row level security;
alter table public.pages           enable row level security;
alter table public.transformations enable row level security;

-- Public read on published / active
create policy "Public can read active templates" on public.page_templates for select using (is_active = true);
create policy "Public can read published pages"  on public.pages for select using (status = 'published');
create policy "Public can read published transformations" on public.transformations for select using (is_published = true);

-- Members manage everything
create policy "Members manage page_templates"  on public.page_templates  for all using (public.is_member()) with check (public.is_member());
create policy "Members manage pages"           on public.pages           for all using (public.is_member()) with check (public.is_member());
create policy "Members manage transformations" on public.transformations for all using (public.is_member()) with check (public.is_member());

-- =============================================================================
-- STORAGE BUCKET — public media for images
-- =============================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif','image/svg+xml'])
on conflict (id) do nothing;

create policy "Public can read media files"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Members can upload media files"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.uid() is not null);

create policy "Members can update own media files"
  on storage.objects for update
  using (bucket_id = 'media' and auth.uid() = owner);

create policy "Members can delete own media files"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.uid() = owner);

-- =============================================================================
-- SEED — page templates
-- =============================================================================
insert into public.page_templates (slug, name, description, category, icon, field_schema, default_content, sort_order) values

('standard', 'Standard Page',
 'Hero + rich content + CTA. Best for About, Contact, info pages.',
 'core', 'FileText',
 '{"sections":[
   {"id":"hero","title":"Hero","fields":[
     {"key":"eyebrow","type":"text","label":"Eyebrow tag","placeholder":"What we''re about"},
     {"key":"headline","type":"text","label":"Headline","required":true},
     {"key":"subheadline","type":"textarea","label":"Subheadline"},
     {"key":"image","type":"image","label":"Background image"}
   ]},
   {"id":"body","title":"Body","fields":[
     {"key":"content","type":"richtext","label":"Page content","required":true}
   ]},
   {"id":"cta","title":"Call to action","fields":[
     {"key":"cta_label","type":"text","label":"Button text","placeholder":"Book Today"},
     {"key":"cta_link","type":"text","label":"Button link","placeholder":"/contact"}
   ]}
 ]}'::jsonb,
 '{"hero":{"headline":"New page"},"cta":{"cta_label":"Book Today","cta_link":"/contact"}}'::jsonb,
 1),

('landing', 'Landing Page',
 'High-conversion page for ad campaigns and promos. Hero + benefits + social proof + CTA.',
 'landing', 'Megaphone',
 '{"sections":[
   {"id":"hero","title":"Hero","fields":[
     {"key":"eyebrow","type":"text","label":"Top badge","placeholder":"Limited-time offer"},
     {"key":"headline","type":"text","label":"Hero headline","required":true},
     {"key":"subheadline","type":"textarea","label":"Supporting line"},
     {"key":"image","type":"image","label":"Hero image"},
     {"key":"primary_cta_label","type":"text","label":"Primary CTA button"},
     {"key":"primary_cta_link","type":"text","label":"Primary CTA link"},
     {"key":"phone_cta","type":"text","label":"Click-to-call number"}
   ]},
   {"id":"benefits","title":"Benefits","fields":[
     {"key":"benefits_headline","type":"text","label":"Benefits section headline"},
     {"key":"benefits","type":"list","label":"Benefits (one per line)","item_label":"Benefit"}
   ]},
   {"id":"social_proof","title":"Social proof","fields":[
     {"key":"trust_line","type":"text","label":"Trust line","placeholder":"4.9 stars · 1,200+ reviews"},
     {"key":"testimonial_quote","type":"textarea","label":"Featured testimonial"},
     {"key":"testimonial_author","type":"text","label":"Testimonial author"}
   ]},
   {"id":"final_cta","title":"Final CTA","fields":[
     {"key":"final_headline","type":"text","label":"Closing headline"},
     {"key":"final_cta_label","type":"text","label":"Closing button text"},
     {"key":"final_cta_link","type":"text","label":"Closing button link"}
   ]}
 ]}'::jsonb,
 '{"hero":{"headline":"Get a brighter smile in 2 visits","primary_cta_label":"Claim Now","primary_cta_link":"/contact"}}'::jsonb,
 2),

('legal', 'Legal Page',
 'Long-form text. Best for Privacy Policy, HIPAA, Terms, Accessibility.',
 'core', 'Scale',
 '{"sections":[
   {"id":"header","title":"Header","fields":[
     {"key":"page_title","type":"text","label":"Page title","required":true},
     {"key":"last_updated","type":"text","label":"Last updated","placeholder":"May 2026"}
   ]},
   {"id":"body","title":"Body","fields":[
     {"key":"content","type":"richtext","label":"Legal text","required":true}
   ]}
 ]}'::jsonb,
 '{}'::jsonb,
 3),

('blog_post', 'Blog Post',
 'Article with featured image, body, and metadata. For patient resources / SEO content.',
 'content', 'Newspaper',
 '{"sections":[
   {"id":"meta","title":"Article meta","fields":[
     {"key":"featured_image","type":"image","label":"Featured image"},
     {"key":"category","type":"text","label":"Category","placeholder":"Patient Resources"},
     {"key":"author","type":"text","label":"Author"},
     {"key":"read_time","type":"text","label":"Read time","placeholder":"5 min read"}
   ]},
   {"id":"summary","title":"Summary","fields":[
     {"key":"excerpt","type":"textarea","label":"Excerpt (shows in lists + meta description)","required":true}
   ]},
   {"id":"body","title":"Body","fields":[
     {"key":"content","type":"richtext","label":"Article body","required":true}
   ]}
 ]}'::jsonb,
 '{}'::jsonb,
 4),

('thank_you', 'Thank You Page',
 'Post-form confirmation. Best for after consultation requests, contact form, etc.',
 'transactional', 'CheckCircle2',
 '{"sections":[
   {"id":"confirmation","title":"Confirmation","fields":[
     {"key":"headline","type":"text","label":"Headline","required":true},
     {"key":"message","type":"textarea","label":"Message"}
   ]},
   {"id":"next_steps","title":"Next steps","fields":[
     {"key":"steps_headline","type":"text","label":"Next steps headline","placeholder":"What happens next"},
     {"key":"steps","type":"list","label":"Next steps (one per line)","item_label":"Step"}
   ]},
   {"id":"return","title":"Return link","fields":[
     {"key":"return_label","type":"text","label":"Button text","placeholder":"Back to home"},
     {"key":"return_link","type":"text","label":"Button link","placeholder":"/"}
   ]}
 ]}'::jsonb,
 '{"confirmation":{"headline":"Thank you!","message":"Your request has been received. Our team will reach out within one business day."}}'::jsonb,
 5);
