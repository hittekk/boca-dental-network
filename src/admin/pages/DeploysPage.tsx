import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { History, RotateCcw, ExternalLink, RefreshCw, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';

type Deploy = {
  id: string;
  state: string;
  created_at: string;
  published_at: string | null;
  title: string;
  branch: string | null;
  commit_ref: string | null;
  deploy_time: number | null;
  error: string | null;
  is_live: boolean;
  permalink: string | null;
};

type ListResult = { deploys?: Deploy[]; live?: string | null; site?: string | null; error?: string; message?: string };

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60); if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24); return d === 1 ? 'yesterday' : `${d}d ago`;
}

export default function DeploysPage() {
  const qc = useQueryClient();
  const [notice, setNotice] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const { data, isLoading, isFetching, error } = useQuery<ListResult>({
    queryKey: ['admin', 'deploys'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('netlify-deploys', { body: { action: 'list' } });
      if (error) throw error;
      return data as ListResult;
    },
    refetchInterval: 20000,
  });

  const restore = useMutation({
    mutationFn: async (deployId: string) => {
      const { data, error } = await supabase.functions.invoke('netlify-deploys', { body: { action: 'restore', deployId } });
      if (error) throw error;
      if ((data as { error?: string })?.error) throw new Error((data as { detail?: string }).detail || (data as { error: string }).error);
      return data;
    },
    onSuccess: () => {
      setNotice({ kind: 'ok', text: 'Rolled back. The live site is switching to that version now (give it a few seconds).' });
      setTimeout(() => qc.invalidateQueries({ queryKey: ['admin', 'deploys'] }), 2500);
    },
    onError: (e) => setNotice({ kind: 'err', text: (e as Error)?.message ?? 'Rollback failed.' }),
  });

  const notConfigured = data?.error === 'not_configured';
  const deploys = data?.deploys ?? [];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-2 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2" style={{ color: DARK_NAVY }}>
            <History className="h-7 w-7" style={{ color: ORANGE }} /> Deploys
          </h1>
          <p className="text-sm text-slate-500 mt-1">Every publish is saved as a version. Roll the live site back to any previous one in a click.</p>
        </div>
        <button onClick={() => qc.invalidateQueries({ queryKey: ['admin', 'deploys'] })}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      {notice && (
        <div className={`mt-4 px-4 py-3 rounded-lg text-sm ${notice.kind === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{notice.text}</div>
      )}

      {isLoading ? (
        <div className="mt-8 text-slate-400">Loading deploy history…</div>
      ) : error ? (
        <div className="mt-6 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">Couldn't reach the deploy service: {(error as Error).message}</div>
      ) : notConfigured ? (
        <SetupCard />
      ) : (
        <div className="mt-6 bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="text-left px-5 py-3">Version</th>
                <th className="text-left px-4 py-3">Details</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deploys.map((d) => (
                <tr key={d.id} className={d.is_live ? 'bg-green-50/40' : 'hover:bg-slate-50'}>
                  <td className="px-5 py-3 whitespace-nowrap">
                    <div className="font-semibold" style={{ color: DARK_NAVY }}>{timeAgo(d.created_at)}</div>
                    <div className="text-xs text-slate-400">{new Date(d.created_at).toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-700 line-clamp-1 max-w-md">{d.title}</div>
                    <div className="text-xs text-slate-400 font-mono">{[d.branch, d.commit_ref].filter(Boolean).join(' · ') || '—'}</div>
                  </td>
                  <td className="px-4 py-3"><StateBadge d={d} /></td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      {d.permalink && (
                        <a href={d.permalink} target="_blank" rel="noreferrer" title="Preview this version" className="h-8 w-8 rounded-lg inline-flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100"><ExternalLink className="h-4 w-4" /></a>
                      )}
                      {d.is_live ? (
                        <span className="text-xs font-semibold text-green-700">Current</span>
                      ) : (
                        <button
                          disabled={d.state !== 'ready' || restore.isPending}
                          onClick={() => { if (confirm(`Roll the live site back to this version?\n\n${d.title}\n${new Date(d.created_at).toLocaleString()}`)) restore.mutate(d.id); }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
                          title={d.state !== 'ready' ? 'Only completed builds can be restored' : 'Make this the live version'}>
                          {restore.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />} Restore
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {deploys.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-400">No deploys found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StateBadge({ d }: { d: Deploy }) {
  if (d.is_live) return <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ background: '#DCFCE7', color: '#15803D' }}><CheckCircle2 className="h-3 w-3" /> Live</span>;
  if (d.state === 'ready') return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-100 text-slate-500">Ready</span>;
  if (d.state === 'error') return <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ background: '#FEE2E2', color: '#B91C1C' }}><AlertTriangle className="h-3 w-3" /> Failed</span>;
  return <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded" style={{ background: '#FEF3C7', color: '#B45309' }}><Loader2 className="h-3 w-3 animate-spin" /> {d.state}</span>;
}

function SetupCard() {
  return (
    <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-7">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-5 w-5" style={{ color: ORANGE }} />
        <h2 className="font-bold text-lg" style={{ color: DARK_NAVY }}>One-time setup</h2>
      </div>
      <p className="text-sm text-slate-500 mb-4">Deploy history needs a Netlify token (stored securely on the server — never in the browser). Add it once and this page lights up.</p>
      <ol className="text-sm text-slate-700 space-y-2 list-decimal pl-5">
        <li>In Netlify → <span className="font-semibold">User settings → Applications → Personal access tokens</span>, create a token.</li>
        <li>In Supabase → <span className="font-semibold">Project → Edge Functions → Secrets</span> (or Project Settings → Functions secrets), add a secret named <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs">NETLIFY_TOKEN</code> with that value.</li>
        <li>Come back here and hit <span className="font-semibold">Refresh</span>.</li>
      </ol>
      <p className="text-xs text-slate-400 mt-4">The site is already linked by ID, so the token is the only thing needed. One token covers both Boca sites.</p>
    </div>
  );
}
