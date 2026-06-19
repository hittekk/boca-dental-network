// supabase/functions/invite-user/index.ts
// Admin-only teammate provisioning. Client-side signup is disabled on the project,
// so an owner/admin calls this Edge Function to create a confirmed account with a
// chosen role, using the service-role key (auto-injected into the function env).
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'content-type': 'application/json' } })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json(200, { ok: false, error: 'Method not allowed' })
  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const ANON = Deno.env.get('SUPABASE_ANON_KEY')!

    const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i, '')
    if (!token) return json(200, { ok: false, error: 'Not signed in.' })

    // Verify the caller is an owner or admin (their JWT + RLS).
    const caller = createClient(SUPABASE_URL, ANON, { global: { headers: { Authorization: `Bearer ${token}` } } })
    const { data: ures } = await caller.auth.getUser()
    const callerId = ures?.user?.id
    if (!callerId) return json(200, { ok: false, error: 'Your session expired — sign in again.' })
    const { data: roleRow } = await caller.from('user_roles').select('role').eq('user_id', callerId).maybeSingle()
    if (roleRow?.role !== 'owner' && roleRow?.role !== 'admin') {
      return json(200, { ok: false, error: 'Only owners and admins can invite teammates.' })
    }

    const body = await req.json().catch(() => ({}))
    const email = String(body.email ?? '').trim()
    const password = String(body.password ?? '')
    const full_name = String(body.full_name ?? '').trim()
    const role = ['admin', 'editor', 'viewer'].includes(body.role) ? body.role : 'editor'
    if (!email || password.length < 8) return json(200, { ok: false, error: 'Valid email and 8+ character password required.' })

    const admin = createClient(SUPABASE_URL, SERVICE)
    const { data: created, error: cErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name },
    })
    if (cErr || !created?.user) return json(200, { ok: false, error: cErr?.message ?? 'Could not create the account.' })

    const newId = created.user.id
    await admin.from('user_roles').delete().eq('user_id', newId)
    const { error: rErr } = await admin.from('user_roles').insert({ user_id: newId, role })
    if (rErr) return json(200, { ok: false, error: `Account created but role assignment failed: ${rErr.message}` })

    return json(200, { ok: true, user_id: newId })
  } catch (e) {
    return json(200, { ok: false, error: (e as Error)?.message ?? 'Unexpected error.' })
  }
})
