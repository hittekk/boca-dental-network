-- Market marker so the admin (and anyone inspecting the DB) can immediately tell
-- this is the VEGAS backend, never to be confused with the separate Reno project.
insert into public.site_settings (key, value)
values ('market', '{"code":"vegas","label":"VEGAS"}'::jsonb)
on conflict (key) do update set value = excluded.value, updated_at = now();