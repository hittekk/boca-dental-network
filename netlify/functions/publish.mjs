// POST /.netlify/functions/publish
// Triggers a fresh Netlify build (re-runs prerender + sitemap so the search-engine
// snapshot reflects the latest backend edits). The build-hook URL is kept server-side
// in the NETLIFY_BUILD_HOOK env var and never exposed to the browser. Only a signed-in
// team member (a row in user_roles, verified via the is_member() RPC) may trigger it.

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export default async (req) => {
  if (req.method !== 'POST') return json(405, { ok: false, error: 'Method not allowed' });

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const ANON = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  const HOOK = process.env.NETLIFY_BUILD_HOOK;

  if (!SUPABASE_URL || !ANON) return json(500, { ok: false, error: 'Server auth not configured' });

  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!token) return json(401, { ok: false, error: 'Not signed in' });

  // Verify the caller is a logged-in team member (is_member() is SECURITY DEFINER
  // and keys off auth.uid() from the JWT, so this works regardless of table RLS).
  let isMember = false;
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/is_member`, {
      method: 'POST',
      headers: { apikey: ANON, Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: '{}',
    });
    if (r.status === 401) return json(401, { ok: false, error: 'Your session expired — sign in again.' });
    if (r.ok) isMember = (await r.json()) === true;
  } catch {
    return json(502, { ok: false, error: 'Could not verify your account. Try again.' });
  }
  if (!isMember) return json(403, { ok: false, error: 'This account is not authorized to publish.' });

  if (!HOOK) return json(503, { ok: false, error: 'not-configured' });

  try {
    const h = await fetch(HOOK, { method: 'POST' });
    if (!h.ok) return json(502, { ok: false, error: `Build trigger failed (${h.status}).` });
  } catch {
    return json(502, { ok: false, error: 'Build trigger failed. Try again.' });
  }
  return json(200, { ok: true });
};
