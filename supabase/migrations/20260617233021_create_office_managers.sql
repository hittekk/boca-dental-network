-- Office managers table (the 'media' bucket + storage policies already exist on
-- this project, so only the table is created here).
create table if not exists public.office_managers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text default 'Office Manager',
  location_id uuid references public.locations(id) on delete set null,
  image_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists office_managers_sort_idx
  on public.office_managers (sort_order);

alter table public.office_managers enable row level security;

drop policy if exists "Public can read published office_managers" on public.office_managers;
create policy "Public can read published office_managers"
  on public.office_managers for select
  using (is_published = true);

drop policy if exists "Members manage office_managers" on public.office_managers;
create policy "Members manage office_managers"
  on public.office_managers for all
  using (public.is_member())
  with check (public.is_member());

drop trigger if exists tg_office_managers_set_updated_at on public.office_managers;
create trigger tg_office_managers_set_updated_at
  before update on public.office_managers
  for each row execute function public.set_updated_at();