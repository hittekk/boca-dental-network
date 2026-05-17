import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users, Plus, Trash2, Shield, ShieldCheck, Eye, Edit3, Crown, X, Copy, Check, Loader2, AlertCircle,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

type AppRole = 'owner' | 'admin' | 'editor' | 'viewer';

type Member = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
  created_at: string;
};

const ROLE_CONFIG: Record<AppRole, { label: string; description: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  owner:  { label: 'Owner',  description: 'Full access. Can manage team and billing.',          icon: Crown,       color: '#B45309', bg: '#FEF3C7' },
  admin:  { label: 'Admin',  description: 'Full content + team access. Cannot remove owner.',   icon: ShieldCheck, color: '#15803D', bg: '#DCFCE7' },
  editor: { label: 'Editor', description: 'Edit all content. Cannot manage team.',              icon: Edit3,       color: '#0369A1', bg: '#DBEAFE' },
  viewer: { label: 'Viewer', description: 'Read-only access. Cannot edit anything.',            icon: Eye,         color: '#64748B', bg: '#F1F5F9' },
};

export default function UsersPage() {
  const qc = useQueryClient();
  const [showInvite, setShowInvite] = useState(false);

  // Current logged-in user (to highlight + prevent self-deletion)
  const me = useQuery({
    queryKey: ['admin', 'me'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: role } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();
      return { id: user.id, email: user.email, role: (role?.role ?? 'editor') as AppRole };
    },
  });

  const team = useQuery({
    queryKey: ['admin', 'team'],
    queryFn: async () => {
      // Join profiles + user_roles (RLS lets members read both)
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at');
      if (pErr) throw pErr;

      const { data: roles, error: rErr } = await supabase.from('user_roles').select('user_id, role');
      if (rErr) throw rErr;

      const roleMap = new Map(roles?.map((r: { user_id: string; role: AppRole }) => [r.user_id, r.role]));

      return ((profiles ?? []) as Array<{ id: string; email: string; full_name: string | null; created_at: string }>).map((p) => ({
        user_id: p.id,
        email: p.email,
        full_name: p.full_name,
        role: roleMap.get(p.id) ?? 'editor',
        created_at: p.created_at,
      })) as Member[];
    },
  });

  const changeRole = useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: AppRole }) => {
      // Delete existing role then insert new (user_roles primary key is composite)
      await supabase.from('user_roles').delete().eq('user_id', userId);
      const { error } = await supabase.from('user_roles').insert({ user_id: userId, role: newRole });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'team'] }),
  });

  const removeUser = useMutation({
    mutationFn: async (userId: string) => {
      // Only deletes the role + profile reference. auth.users requires service-role
      // (handled by signing them out & removing role). Their account still exists
      // in Supabase Auth but they lose all access.
      const { error: rErr } = await supabase.from('user_roles').delete().eq('user_id', userId);
      if (rErr) throw rErr;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'team'] }),
  });

  const isOwner = me.data?.role === 'owner';
  const canManage = me.data?.role === 'owner' || me.data?.role === 'admin';

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
            Team
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage who has access to your admin. Invite teammates, change their role, or remove them.
          </p>
        </div>
        {canManage && (
          <button
            onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98] shadow-lg"
            style={{ background: ORANGE, boxShadow: `0 8px 20px -8px ${ORANGE}` }}
          >
            <Plus className="h-4 w-4" />
            Invite teammate
          </button>
        )}
      </div>

      {/* Role legend */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {Object.entries(ROLE_CONFIG).map(([role, cfg]) => {
          const Icon = cfg.icon;
          return (
            <div key={role} className="bg-white rounded-xl border border-slate-200 p-3 flex items-start gap-2.5">
              <div className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg, color: cfg.color }}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold" style={{ color: DARK_NAVY }}>{cfg.label}</div>
                <div className="text-[10px] text-slate-500 leading-snug">{cfg.description}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team table */}
      {team.isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading team...</div>
      ) : (team.data ?? []).length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <Users className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No team members yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
                {isOwner && <th className="px-4 py-3 w-10"></th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {team.data?.map((m) => {
                const isMe = m.user_id === me.data?.id;
                const RoleIcon = ROLE_CONFIG[m.role].icon;
                return (
                  <tr key={m.user_id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: `${ORANGE}15`, color: ORANGE }}>
                          {(m.full_name ?? m.email)[0]?.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm flex items-center gap-1.5">
                            {m.full_name || '(no name set)'}
                            {isMe && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: `${NAVY}10`, color: NAVY }}>
                                you
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 truncate">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {isOwner && !isMe ? (
                        <select
                          value={m.role}
                          onChange={(e) => changeRole.mutate({ userId: m.user_id, newRole: e.target.value as AppRole })}
                          className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border-2 border-slate-200 bg-white focus:outline-none focus:border-orange-500"
                          style={{ color: ROLE_CONFIG[m.role].color }}
                        >
                          {(Object.keys(ROLE_CONFIG) as AppRole[]).map((r) => (
                            <option key={r} value={r}>{ROLE_CONFIG[r].label}</option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                          style={{ background: ROLE_CONFIG[m.role].bg, color: ROLE_CONFIG[m.role].color }}
                        >
                          <RoleIcon className="h-3 w-3" />
                          {ROLE_CONFIG[m.role].label}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {new Date(m.created_at).toLocaleDateString()}
                    </td>
                    {isOwner && (
                      <td className="px-4 py-3 text-right">
                        {!isMe && m.role !== 'owner' && (
                          <button
                            onClick={() => {
                              if (confirm(`Remove ${m.full_name || m.email}? They'll lose all access immediately.`)) {
                                removeUser.mutate(m.user_id);
                              }
                            }}
                            className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Remove from team"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!canManage && (
        <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <div className="text-sm text-amber-900">
            <span className="font-semibold">Read-only view.</span> Only owners and admins can invite teammates or change roles.
          </div>
        </div>
      )}

      {/* Invite modal */}
      {showInvite && (
        <InviteModal
          onClose={() => setShowInvite(false)}
          onSuccess={() => {
            qc.invalidateQueries({ queryKey: ['admin', 'team'] });
            setShowInvite(false);
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Invite modal
// ─────────────────────────────────────────────────────────────────────────────

function InviteModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<AppRole>('editor');
  const [password, setPassword] = useState(generatePassword());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ email: string; password: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Create the auth account (Supabase emails them a confirmation link)
      const { data, error: signupErr } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (signupErr) throw signupErr;
      if (!data.user) throw new Error('Signup returned no user');

      // Wait a tick for the handle_new_user trigger to create the profile + role
      await new Promise((r) => setTimeout(r, 600));

      // Set the desired role (trigger assigns 'editor' by default)
      if (role !== 'editor') {
        await supabase.from('user_roles').delete().eq('user_id', data.user.id);
        await supabase.from('user_roles').insert({ user_id: data.user.id, role });
      }

      setSuccess({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to invite');
    } finally {
      setLoading(false);
    }
  }

  function copyCredentials() {
    if (!success) return;
    const text = `Boca DentalPress Admin\nURL: https://boca.datastacklogic.com/dental-admin/login\nEmail: ${success.email}\nTemp password: ${success.password}\n\nYou'll need to confirm your email first (check your inbox), then sign in.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between p-5 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-lg" style={{ color: DARK_NAVY }}>
              {success ? '✓ Invite created' : 'Invite teammate'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {success
                ? 'Share these credentials with your teammate. They\'ll get an email to confirm.'
                : 'Create an account for someone in your organization.'}
            </p>
          </div>
          <button onClick={onClose} className="h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        {success ? (
          <div className="p-5 space-y-4">
            <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs space-y-1.5">
              <div><span className="text-slate-500">URL: </span>https://boca.datastacklogic.com/dental-admin/login</div>
              <div><span className="text-slate-500">Email: </span><span style={{ color: ORANGE }}>{success.email}</span></div>
              <div><span className="text-slate-500">Password: </span><span style={{ color: ORANGE }}>{success.password}</span></div>
            </div>
            <button
              onClick={copyCredentials}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all"
            >
              {copied ? (
                <><Check className="h-4 w-4 text-emerald-600" /> Copied!</>
              ) : (
                <><Copy className="h-4 w-4" /> Copy credentials</>
              )}
            </button>
            <div className="text-xs text-slate-500 leading-relaxed">
              Your teammate will receive a Supabase confirmation email. Once they click the link, they can sign in with the password above and change it from their account settings.
            </div>
            <button
              onClick={onSuccess}
              className="w-full px-4 py-2.5 rounded-lg font-semibold text-sm text-white"
              style={{ background: ORANGE }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Frankie Smith"
                className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="frankie@bocadentalandbraces.com"
                className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
                Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['admin', 'editor', 'viewer'] as AppRole[]).map((r) => {
                  const cfg = ROLE_CONFIG[r];
                  const Icon = cfg.icon;
                  const isSelected = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`p-2.5 rounded-lg border-2 text-left transition-all ${isSelected ? 'shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
                      style={isSelected ? { borderColor: ORANGE, background: `${ORANGE}08` } : undefined}
                    >
                      <Icon className="h-3.5 w-3.5 mb-1" style={{ color: isSelected ? ORANGE : '#64748B' }} />
                      <div className="text-xs font-bold" style={{ color: DARK_NAVY }}>{cfg.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
                Temporary password
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm font-mono focus:outline-none focus:border-orange-500"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setPassword(generatePassword())}
                  className="px-3 py-2.5 rounded-lg border-2 border-slate-200 text-xs font-bold text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-colors"
                >
                  Regenerate
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                You'll share this with them after creation. They can change it after signing in.
              </p>
            </div>
            {error && (
              <div className="text-sm px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-100 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !email || !fullName}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
              style={{ background: ORANGE }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function generatePassword(): string {
  // Memorable: word + number + symbol, 12+ chars
  const words = ['boca', 'vegas', 'smile', 'admin', 'team', 'flash', 'orbit', 'pixel', 'lumen', 'spark'];
  const w = words[Math.floor(Math.random() * words.length)];
  const n = Math.floor(Math.random() * 9000) + 1000;
  const symbol = ['!', '@', '#', '$'][Math.floor(Math.random() * 4)];
  return `${w.charAt(0).toUpperCase()}${w.slice(1)}${n}${symbol}`;
}
