import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Briefcase, FileText, Download, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';

type Application = {
  id: string;
  first_name: string;
  last_name: string;
  comments: string | null;
  resume_path: string | null;
  resume_name: string | null;
  status: string;
  created_at: string;
};

export default function ApplicationsPage() {
  const qc = useQueryClient();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [err, setErr] = useState('');

  const { data: apps, isLoading } = useQuery({
    queryKey: ['admin', 'career_applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('career_applications')
        .select('id, first_name, last_name, comments, resume_path, resume_name, status, created_at')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Application[];
    },
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('career_applications').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'career_applications'] }),
  });

  async function downloadResume(a: Application) {
    if (!a.resume_path) return;
    setErr('');
    setDownloading(a.id);
    try {
      const { data, error } = await supabase.storage.from('resumes').createSignedUrl(a.resume_path, 120);
      if (error || !data) throw error ?? new Error('no url');
      window.open(data.signedUrl, '_blank', 'noopener');
    } catch {
      setErr('Could not open that resume. Try again.');
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2" style={{ color: DARK_NAVY }}>
          <Briefcase className="h-7 w-7" style={{ color: ORANGE }} /> Applications
        </h1>
        <p className="text-sm text-slate-500 mt-1">Resumes submitted through the Careers page.</p>
      </div>

      {err && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">{err}</div>}

      {isLoading ? (
        <div className="text-slate-400 py-16 text-center">Loading…</div>
      ) : (apps ?? []).length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <div className="h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${ORANGE}15` }}>
            <Briefcase className="h-7 w-7" style={{ color: ORANGE }} />
          </div>
          <h3 className="font-bold text-lg mb-1" style={{ color: DARK_NAVY }}>No applications yet</h3>
          <p className="text-sm text-slate-500">New submissions from the Careers page will show up here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {(apps ?? []).map((a) => (
            <div key={a.id} className="bg-white border border-slate-200 rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-base" style={{ color: DARK_NAVY }}>{a.first_name} {a.last_name}</span>
                  {a.status === 'reviewed' && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: '#DCFCE7', color: '#15803D' }}><CheckCircle2 className="h-3 w-3" /> Reviewed</span>
                  )}
                  {a.status === 'new' && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>New</span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{new Date(a.created_at).toLocaleString()}</div>
                {a.comments && <p className="text-sm text-slate-600 mt-2 whitespace-pre-wrap">{a.comments}</p>}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {a.resume_path ? (
                  <button onClick={() => downloadResume(a)} disabled={downloading === a.id}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50" style={{ background: ORANGE }}>
                    {downloading === a.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} Resume
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-slate-400"><FileText className="h-4 w-4" /> No file</span>
                )}
                <button onClick={() => setStatus.mutate({ id: a.id, status: a.status === 'reviewed' ? 'new' : 'reviewed' })}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800">
                  {a.status === 'reviewed' ? 'Mark new' : 'Mark reviewed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
