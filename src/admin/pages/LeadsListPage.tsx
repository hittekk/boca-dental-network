import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Inbox, Phone, Mail, Calendar, Trash2, X, MapPin, MessageSquare, StickyNote, Save } from 'lucide-react';
import { supabase, type DbLead } from '../../lib/supabase';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';

const STATUS_OPTIONS = ['new', 'contacted', 'saved', 'closed'] as const;

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  new: { bg: '#FFF1EA', color: ORANGE },
  contacted: { bg: '#EFF6FF', color: '#2563EB' },
  saved: { bg: '#ECFDF5', color: '#059669' },
  closed: { bg: '#F1F5F9', color: '#64748B' },
};

function statusStyle(status: string) {
  return STATUS_STYLE[status] ?? STATUS_STYLE.closed;
}

export default function LeadsListPage() {
  const qc = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  // Clinic labels for the detail panel
  const { data: locations } = useQuery({
    queryKey: ['admin', 'lead-locations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('locations').select('id, label');
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((l) => [l.id, l.label])) as Record<string, string>;
    },
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['admin', 'leads'] });
    qc.invalidateQueries({ queryKey: ['admin', 'recent-leads'] });
    qc.invalidateQueries({ queryKey: ['admin', 'leads-this-week'] });
    qc.invalidateQueries({ queryKey: ['admin', 'stats'] });
  };

  const deleteLead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      setSelectedId(null);
      invalidate();
    },
  });

  const saveLead = useMutation({
    mutationFn: async ({ id, notes, status }: { id: string; notes: string; status: string }) => {
      const patch: Record<string, unknown> = { notes: notes.trim() || null, status };
      // Stamp workflow timestamps the first time a lead reaches that stage.
      const lead = data?.find((l) => l.id === id);
      if (status === 'contacted' && !lead?.contacted_at) patch.contacted_at = new Date().toISOString();
      if (status === 'closed' && !lead?.closed_at) patch.closed_at = new Date().toISOString();
      const { error } = await supabase.from('leads').update(patch).eq('id', id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  const selected = data?.find((l) => l.id === selectedId) ?? null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
          Patient leads
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Every form submission from your site lands here. Click a lead to view details, add notes, and manage its status.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : !data || data.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <Inbox className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">No leads yet</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Patient form submissions will land here in real time.
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
                <tr
                  key={lead.id}
                  onClick={() => setSelectedId(lead.id)}
                  className="hover:bg-slate-50 text-sm cursor-pointer"
                >
                  <td className="px-4 py-3 font-semibold">
                    <span className="inline-flex items-center gap-2">
                      {lead.full_name}
                      {lead.notes && (
                        <StickyNote className="h-3.5 w-3.5 text-amber-500" aria-label="Has notes" />
                      )}
                    </span>
                  </td>
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
                      style={{ background: statusStyle(lead.status).bg, color: statusStyle(lead.status).color }}
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
                      onClick={(e) => {
                        e.stopPropagation();
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

      {selected && (
        <LeadDetailPanel
          lead={selected}
          clinic={selected.preferred_location_id ? locations?.[selected.preferred_location_id] : undefined}
          saving={saveLead.isPending}
          deleting={deleteLead.isPending}
          onSave={(notes, status) => saveLead.mutate({ id: selected.id, notes, status })}
          onDelete={() => {
            if (confirm(`Delete lead "${selected.full_name}"? This can't be undone.`)) deleteLead.mutate(selected.id);
          }}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

function LeadDetailPanel({
  lead,
  clinic,
  saving,
  deleting,
  onSave,
  onDelete,
  onClose,
}: {
  lead: DbLead;
  clinic?: string;
  saving: boolean;
  deleting: boolean;
  onSave: (notes: string, status: string) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const [notes, setNotes] = useState(lead.notes ?? '');
  const [status, setStatus] = useState(lead.status);
  const [savedFlash, setSavedFlash] = useState(false);

  // Re-sync the form when a different lead is opened.
  useEffect(() => {
    setNotes(lead.notes ?? '');
    setStatus(lead.status);
    setSavedFlash(false);
  }, [lead.id, lead.notes, lead.status]);

  const dirty = notes !== (lead.notes ?? '') || status !== lead.status;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      {/* Slide-over */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Lead details</div>
            <h2 className="text-xl font-extrabold" style={{ color: DARK_NAVY }}>{lead.full_name}</h2>
            <div className="text-xs text-slate-400 mt-0.5">
              Submitted {new Date(lead.created_at).toLocaleString()}
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-lg inline-flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Contact */}
          <div className="grid grid-cols-1 gap-2">
            <DetailRow icon={<Phone className="h-3.5 w-3.5" />} label="Phone">
              <a href={`tel:${lead.phone.replace(/\D/g, '')}`} className="font-semibold hover:underline" style={{ color: ORANGE }}>
                {lead.phone}
              </a>
            </DetailRow>
            {lead.email && (
              <DetailRow icon={<Mail className="h-3.5 w-3.5" />} label="Email">
                <a href={`mailto:${lead.email}`} className="font-semibold hover:underline" style={{ color: ORANGE }}>
                  {lead.email}
                </a>
              </DetailRow>
            )}
            {clinic && (
              <DetailRow icon={<MapPin className="h-3.5 w-3.5" />} label="Preferred clinic">{clinic}</DetailRow>
            )}
            {lead.service_interest && (
              <DetailRow icon={<MessageSquare className="h-3.5 w-3.5" />} label="Service interest">{lead.service_interest}</DetailRow>
            )}
            {lead.preferred_contact && (
              <DetailRow icon={<Phone className="h-3.5 w-3.5" />} label="Preferred contact">{lead.preferred_contact}</DetailRow>
            )}
            {lead.insurance && (
              <DetailRow icon={<MessageSquare className="h-3.5 w-3.5" />} label="Insurance">{lead.insurance}</DetailRow>
            )}
            {lead.pain_level != null && (
              <DetailRow icon={<MessageSquare className="h-3.5 w-3.5" />} label="Pain level">{lead.pain_level}/10</DetailRow>
            )}
          </div>

          {/* Message */}
          {lead.message && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Patient message</div>
              <div className="text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 whitespace-pre-wrap">
                {lead.message}
              </div>
            </div>
          )}

          {/* Source */}
          {(lead.source_page || lead.source_form || lead.utm_source) && (
            <div className="text-[11px] text-slate-400">
              Source: {lead.source_form ?? '—'}{lead.source_page ? ` · ${lead.source_page}` : ''}
              {lead.utm_source ? ` · utm: ${lead.utm_source}${lead.utm_medium ? `/${lead.utm_medium}` : ''}${lead.utm_campaign ? ` (${lead.utm_campaign})` : ''}` : ''}
            </div>
          )}

          {/* Status */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Status</div>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-colors"
                  style={
                    status === s
                      ? { background: statusStyle(s).bg, color: statusStyle(s).color, borderColor: statusStyle(s).color }
                      : { background: 'white', color: '#94A3B8', borderColor: '#E2E8F0' }
                  }
                >
                  {s}
                </button>
              ))}
            </div>
            {(lead.contacted_at || lead.closed_at) && (
              <div className="text-[11px] text-slate-400 mt-1.5">
                {lead.contacted_at && <>Contacted {new Date(lead.contacted_at).toLocaleDateString()} </>}
                {lead.closed_at && <>· Closed {new Date(lead.closed_at).toLocaleDateString()}</>}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Notes</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              placeholder="Call outcomes, scheduling details, follow-ups…"
              className="w-full text-sm text-slate-700 bg-white border border-slate-200 rounded-xl p-3 outline-none focus:border-orange-400 resize-y"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 bg-slate-50">
          <button
            onClick={onDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete lead
          </button>
          <button
            onClick={() => {
              onSave(notes, status);
              setSavedFlash(true);
              setTimeout(() => setSavedFlash(false), 2000);
            }}
            disabled={saving || (!dirty && !savedFlash)}
            className="inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-opacity disabled:opacity-50"
            style={{ background: savedFlash && !dirty ? '#059669' : ORANGE }}
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving…' : savedFlash && !dirty ? 'Saved ✓' : 'Save changes'}
          </button>
        </div>
      </div>
    </>
  );
}

function DetailRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <span className="text-slate-400 mt-0.5">{icon}</span>
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 w-28 shrink-0 mt-0.5">{label}</span>
      <span className="text-slate-700">{children}</span>
    </div>
  );
}
