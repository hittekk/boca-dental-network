# Boca VEGAS — Supabase backend

This folder is the **reproducible backend** for `bocadentalandbraces.com` (the Vegas
product). Running the migrations against a fresh, empty Supabase project rebuilds the
entire schema — tables, RLS policies, helper functions, the auth trigger, the `media`
storage bucket, seed content, and the `market` marker — from scratch.

> **Isolation rule:** This is the **VEGAS** backend. It must never be linked to or share
> credentials with the **Reno** project (`xcbyluaziufeptbmdtme`, repo
> `hittekk/boca-specialty-reno`). The two products are completely separate Supabase
> projects, repos, and Netlify sites. Never put one project's URL/anon key in the other.

## What's here

```
supabase/
  config.toml          Local Supabase CLI config (project_id is a local label only)
  migrations/          11 ordered, idempotent-where-safe SQL migrations
  README.md            This file
```

Migrations (applied in filename order):

| # | File | What it does |
|---|------|--------------|
| 1 | `20260514234148_boca_initial_schema.sql` | Core schema: profiles, roles, locations, services, doctors, leads, reviews, RLS, `is_member`/`is_admin`/`handle_new_user` |
| 2 | `20260515010318_boca_seed_initial_data.sql` | Seed: 9 locations, 9 services, 14 doctors, location FAQs, home page_meta |
| 3 | `20260515055407_pages_templates_transformations.sql` | Pages CMS, page_templates, transformations, `media` storage bucket + policies |
| 4 | `20260517022620_analytics_events.sql` | First-party `analytics_events` table + settings stub |
| 5 | `20260617232954_clean_fabricated_location_stats.sql` | Null out placeholder ratings/review_counts/gbp_ids + Beltway phone |
| 6 | `20260617233002_harden_handle_new_user_no_auto_editor.sql` | Security: only the first signup becomes owner; later signups get **no** role |
| 7 | `20260617233012_create_service_pages.sql` | `service_pages` CMS table (rich treatment pages) |
| 8 | `20260617233021_create_office_managers.sql` | `office_managers` table |
| 9 | `20260617233026_add_locations_gallery.sql` | `locations.gallery` jsonb column |
| 10 | `20260617233035_add_market_marker_vegas.sql` | `site_settings.market = {"code":"vegas","label":"VEGAS"}` |
| 11 | `20260617233851_scrub_landing_template_fake_stat.sql` | Remove fabricated "1,200+ reviews" hint from landing template |

## Install on a brand-new (client) Supabase project

Prereq: [Supabase CLI](https://supabase.com/docs/guides/cli) installed and logged in
(`supabase login`).

1. **Create the project** in the client's own Supabase org (Dashboard → New project).
   Note the **project ref** (the `xxxxxxxx` in `xxxxxxxx.supabase.co`).

2. **Link this repo to that project** (this is the only "swap" you do — no file edits):
   ```bash
   supabase link --project-ref <CLIENT_PROJECT_REF>
   ```

3. **Push all migrations** to rebuild the backend:
   ```bash
   supabase db push
   ```

4. **Grab the client keys** (Dashboard → Project Settings → API) and set them as the
   front-end env vars in Netlify (NOT committed to the repo):
   ```
   VITE_SUPABASE_URL=https://<CLIENT_PROJECT_REF>.supabase.co
   VITE_SUPABASE_ANON_KEY=<client anon/publishable key>
   VITE_MAPBOX_TOKEN=<client mapbox token>
   ```

5. **First admin user:** the very first account created via the admin `/login` signup
   becomes `owner` (migration 6). Every later signup gets **no role** until the owner
   grants one in the Users admin screen. Create the owner account first.

6. (Optional) Verify:
   ```bash
   supabase migration list        # local vs remote should match
   ```

## Notes on fidelity

These SQL files were captured byte-for-byte from the canonical Vegas project
(`supabase_migrations.schema_migrations`) and verified by MD5. They are the source of
truth for the deployed schema; the live project's migration history already matches them.
