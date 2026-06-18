import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Inbox, Phone, Mail, Calendar, Trash2 } from 'lucide-react';
import { supabase, type DbLead } from '../../lib/supabase';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';

export default function LeadsListPage() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'leads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as DbLead[];
    },
  });

  const deleteLead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'leads'] });
      qc.invalidateQueries({ queryKey: ['admin', 'recent-leads'] });
      qc.invalidateQueries({ queryKey: ['admin', 'leads-this-week'] });
      qc.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
          Patient leads
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Every form submission from your site lands here.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : !data || data.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <Inbox className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">No leads yet</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Once you wire the consultation form on the site to this database, every patient inquiry will appear here in real time.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Interest</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">When</th>
                <th className="px-4 py-3 text-right sr-only">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 text-sm">
                  <td className="px-4 py-3 font-semibold">{lead.full_name}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="flex items-center gap-1 text-xs">
                      <Phone className="h-3 w-3" />
                      {lead.phone}
                    </div>
                    {lead.email && (
                      <div className="flex items-center gap-1 text-xs mt-0.5 text-slate-500">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">{lead.service_interest ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{
                        background: lead.status === 'new' ? '#FFF1EA' : '#F1F5F9',
                        color: lead.status === 'new' ? ORANGE : '#64748B',
                      }}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(lead.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Delete lead "${lead.full_name}"? This can't be undone.`)) deleteLead.mutate(lead.id);
                      }}
                      disabled={deleteLead.isPending}
                      title="Delete lead"
                      className="h-8 w-8 rounded-lg inline-flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
