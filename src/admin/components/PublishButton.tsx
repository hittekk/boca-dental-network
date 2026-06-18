import { useState } from 'react';
import { Rocket, Loader2, Check, AlertCircle, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';

type Status =
  | { kind: 'idle' }
  | { kind: 'working' }
  | { kind: 'done' }
  | { kind: 'setup' }
  | { kind: 'error'; msg: string };

export default function PublishButton() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function publish() {
    setStatus({ kind: 'working' });
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        setStatus({ kind: 'error', msg: 'You appear to be signed out. Refresh and sign in again.' });
        return;
      }
      const res = await fetch('/.netlify/functions/publish', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus({ kind: 'done' });
        setTimeout(() => setStatus({ kind: 'idle' }), 8000);
      } else if (res.status === 503 || body?.error === 'not-configured') {
        setStatus({ kind: 'setup' });
      } else {
        setStatus({ kind: 'error', msg: body?.error || `Something went wrong (${res.status}).` });
      }
    } catch {
      setStatus({ kind: 'error', msg: 'Network error — check your connection and try again.' });
    }
  }

  const working = status.kind === 'working';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start gap-4 flex-wrap">
        <div className="flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center" style={{ background: `${ORANGE}14` }}>
          <Search className="h-5 w-5" style={{ color: ORANGE }} />
        </div>
        <div className="flex-1 min-w-[220px]">
          <h3 className="font-bold text-sm" style={{ color: NAVY }}>Publish to search engines</h3>
          <p className="text-[13px] text-slate-500 mt-1 leading-relaxed max-w-xl">
            Your edits are already live for visitors browsing the site. Click here to also refresh the{' '}
            <strong>search-engine version</strong> — the page snapshots and sitemap that Google reads. It takes about
            3–4 minutes and runs in the background, so you can keep working.
          </p>
        </div>
        <button
          onClick={publish}
          disabled={working}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white disabled:opacity-60 active:scale-[0.98] transition-all flex-shrink-0"
          style={{ background: ORANGE }}
        >
          {working ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
          {working ? 'Publishing…' : 'Publish now'}
        </button>
      </div>

      {status.kind === 'done' && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2.5">
          <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-emerald-800">
            <strong>Publish started.</strong> The updated pages will be live for Google in roughly 3–4 minutes. No need to
            click again — you can close this or keep editing.
          </p>
        </div>
      )}

      {status.kind === 'setup' && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5">
          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-amber-800">
            Publishing isn’t connected yet. Ask your developer to finish the one-time publish setup, then this button will
            work.
          </p>
        </div>
      )}

      {status.kind === 'error' && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2.5">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-[13px] text-red-800">{status.msg}</p>
        </div>
      )}
    </div>
  );
}
