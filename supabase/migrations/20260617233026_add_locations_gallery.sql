alter table public.locations
  add column if not exists gallery jsonb not null default '[]'::jsonb;
comment on column public.locations.gallery is 'Ordered array of office photo URLs (strings); first is treated as primary/hero fallback.';