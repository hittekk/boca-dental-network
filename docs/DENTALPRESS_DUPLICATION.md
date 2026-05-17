# DentalPress Frontend — Duplication Playbook

How to spin up a new dental client on the same admin + frontend pattern that powers Boca Dental.

**Target time: 2-4 hours per new client** (once you've done it twice).

---

## 0. Prerequisites
- GitHub access (`hittekk` org)
- Supabase access (HITTEKK org)
- Netlify access
- Client's GoDaddy / registrar credentials (or just DNS access)
- Client's brand assets: logo (light + dark), brand colors, fonts

---

## 1. Clone the repo template

```bash
cd ~/Desktop
gh repo clone hittekk/boca-dental-network new-client-dental
cd new-client-dental
git remote remove origin
gh repo create hittekk/new-client-dental --private
git remote add origin git@github.com:hittekk/new-client-dental.git
git branch -M main
# Don't push yet — first wire it to a new DB
```

---

## 2. Create a new Supabase project

```
Name:    [Client Name] Dental Admin
Region:  us-west-1 (or closest to client)
Plan:    Pro org (extra project add-on, $10/mo)
```

Once it boots:
1. **Copy the schema** from this repo's `supabase/migrations/` (or copy from Boca via dashboard SQL editor)
2. **Apply the schema** to the new project
3. **Apply storage bucket setup** (creates `media` bucket)
4. **Seed page_templates** (5 starter templates: Standard, Landing, Legal, Blog Post, Thank You)

Reference Boca project ID: `cyajtdbiinrqihvsmhbh`

---

## 3. Update the new repo for the new client

### `.env`
```
VITE_SUPABASE_URL=https://[new-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[new-anon-key]
VITE_MAPBOX_TOKEN=[same or new mapbox token]
```

### Brand swap
- Replace `public/boca-logo.png` and `public/boca-logo-color.png` with the client's logo
- Update brand colors in `src/admin/AdminLayout.tsx` + `src/admin/pages/LoginPage.tsx`:
  - `ORANGE` → client's primary
  - `NAVY` → client's secondary
  - `DARK_NAVY` → client's deep/background
- Update `src/data/initialData.ts` brand object (name, tagline, phone, domain)
- Update `index.html` title + meta
- Update `boca` admin label in sidebar (`AdminLayout.tsx`) to client's brand

### Visual identity decisions
- Keep DentalPress as the admin product label, OR rebrand per client
- Footer "Hand-crafted by DataStackLogic" — keep or replace per client agreement

---

## 4. Seed the new client's data

Two paths:

**A. Manual seed in admin** (best for small clients)
- Sign in
- Add each location, service, doctor via the UI

**B. Bulk SQL insert** (faster for clients with many locations)
- Edit `src/data/initialData.ts` with the new client's locations/services/doctors
- Write a migration SQL that mirrors Boca's seed migration but with the new client's content
- Apply via Supabase MCP `apply_migration`

---

## 5. Create the client's owner account

```sql
-- Run via Supabase SQL Editor
do $$
declare new_user_id uuid := gen_random_uuid();
begin
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, email_change,
    email_change_token_new, recovery_token
  ) values (
    '00000000-0000-0000-0000-000000000000', new_user_id,
    'authenticated', 'authenticated',
    'CLIENT_EMAIL@here.com',
    crypt('GENERATED_PASSWORD', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"full_name":"Client Owner Name"}'::jsonb,
    now(), now(), '', '', '', ''
  );

  insert into auth.identities (
    id, user_id, identity_data, provider, provider_id,
    last_sign_in_at, created_at, updated_at
  ) values (
    gen_random_uuid(), new_user_id,
    jsonb_build_object('sub', new_user_id::text,
      'email', 'CLIENT_EMAIL@here.com', 'email_verified', true),
    'email', 'CLIENT_EMAIL@here.com',
    now(), now(), now()
  );
end $$;
```

First user automatically gets `owner` role (via `handle_new_user()` trigger). Send the credentials to the client securely.

---

## 6. Test locally

```bash
npm install
npm run dev
# Sign in at http://localhost:8080/dental-admin/login
# Verify: dashboard loads, content shows live, edit-save works
```

---

## 7. Deploy to Netlify

1. Create new Netlify site, link to the new GitHub repo
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_MAPBOX_TOKEN`
3. Trigger first deploy — should succeed if env vars are set
4. Note: prerender uses Puppeteer locally; Netlify build runs no-op `echo` and uploads pre-built `dist/`. See `LAUNCH_CHECKLIST.md` for the deploy command pattern.

---

## 8. DNS + go live

1. Point client's domain (or subdomain) at the Netlify site
2. Let's Encrypt provisions cert automatically
3. Smoke-test the live URL
4. Hand off admin credentials to the client

---

## Per-client cost

| Item | Cost |
|------|------|
| Supabase project | $10/mo |
| Netlify (free tier usually fine) | $0/mo |
| Mapbox (shared token, free tier) | $0 |
| **Total monthly** | **~$10/mo** |

Sold to client at $249/mo retainer = **24x markup**.

---

## What stays the same vs. what changes per client

### Stays (don't re-customize unless needed):
- `/dental-admin` module structure (admin pages, layout, auth)
- Database schema (locations, services, doctors, leads, forms, etc.)
- SiteDataProvider pattern
- Component variants A/B/C (Modern Clinic / Warm Editorial / Super Modern)
- Prerender pipeline + Netlify deploy flow
- Page templates (Standard, Landing, Legal, Blog Post, Thank You)

### Changes per client:
- Logo files (`public/boca-logo*.png`)
- Brand colors in admin (ORANGE / NAVY / DARK_NAVY constants)
- Site title + meta in `index.html`
- Initial data seed (locations, services, doctors)
- Domain / Netlify site

---

## Reference commit history (Boca, 2026-05-15..17)

| Commit | What |
|--------|------|
| `61f0eb8` | Full admin module |
| `22ff05c` | SiteDataProvider + Locations wired |
| `66c2943` | Brand + ConsultationForm wired |
| `747da52` | SmileTransformations wired |
| `3d2c6b9` | Service + Doctor edit pages |
| `56ca2cf` | LocationPage detail wired |

Use this as the gold-standard template — every future dental client should follow this exact structure.
