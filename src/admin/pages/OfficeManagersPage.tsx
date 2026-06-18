import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserCog, Plus, Trash2, Eye, EyeOff, Pencil, X, Loader2 } from 'lucide-react';
import { supabase, type DbOfficeManager, type DbLocation } from '../../lib/supabase';
import ImageUpload from '../components/ImageUpload';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

type Draft = {
  id?: string;
  name: string;
  title: string;
  location_id: string | null;
  image_url: string | null;
  is_published: boolean;
  sort_order: number;
};

const EMPTY: Draft = {
  name: '',
  title: 'Office Manager',
  location_id: null,
  image_url: null,
  is_published: true,
  sort_order: 0,
};

export default function OfficeManagersPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Draft | null>(null);

  const { data: managers, isLoading } = useQuery({
    queryKey: ['admin', 'office_managers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('office_managers')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return (data ?? []) as DbOfficeManager[];
    },
  });

  const { data: locations } = useQuery({
    queryKey: ['admin', 'locations-min'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('id, label')
        .order('sort_order');
      if (error) throw error;
      return (data ?? []) as Pick<DbLocation, 'id' | 'label'>[];
    },
  });

  const locName = (id: string | null) =>
    id ? locations?.find((l) => l.id === id)?.label ?? null : null;

  const save = useMutation({
    mutationFn: async (d: Draft) => {
      const payload = {
        name: d.name.trim() || 'Office Manager',
        title: d.title.trim() || null,
        location_id: d.location_id,
        image_url: d.image_url,
        is_published: d.is_published,
        sort_order: d.sort_order,
      };
      if (d.id) {
        const { error } = await supabase.from('office_managers').update(payload).eq('id', d.id);
        if (error) throw error;
      } else {
        const nextSort = (managers?.length ?? 0) * 10;
        const { error } = await supabase
          .from('office_managers')
          .insert({ ...payload, sort_order: nextSort });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'office_managers'] });
      qc.invalidateQueries({ queryKey: ['admin', 'nav-counts'] });
      setEditing(null);
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('office_managers').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'office_managers'] });
      qc.invalidateQueries({ queryKey: ['admin', 'nav-counts'] });
    },
  });

  const togglePublish = useMutation({
    mutationFn: async (m: DbOfficeManager) => {
      const { error } = await supabase
        .from('office_managers')
        .update({ is_published: !m.is_published })
        .eq('id', m.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'office_managers'] }),
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
            Office Managers
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add or remove office managers and their photos. Optionally assign each to a clinic.
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98]"
          style={{ background: ORANGE }}
        >
          <Plus className="h-4 w-4" />
          Add office manager
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : !managers || managers.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">
          <UserCog className="h-8 w-8 mx-auto text-slate-300" />
          <p className="text-sm text-slate-500 mt-3">No office managers yet.</p>
          <button
            onClick={() => setEditing({ ...EMPTY })}
            className="mt-4 text-sm font-semibold"
            style={{ color: ORANGE }}
          >
            Add your first office manager
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {managers.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4"
            >
              {m.image_url ? (
                <img
                  src={m.image_url}
                  alt={m.name}
                  className="h-16 w-16 rounded-full object-cover flex-shrink-0 border border-slate-200"
                />
              ) : (
                <div
                  className="h-16 w-16 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg"
                  style={{ background: `${ORANGE}15`, color: ORANGE }}
                >
                  {m.name.trim()[0]?.toUpperCase() ?? '?'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm" style={{ color: DARK_NAVY }}>
                    {m.name}
                  </h3>
                  <button
                    onClick={() => togglePublish.mutate(m)}
                    title={m.is_published ? 'Published — click to hide' : 'Hidden — click to publish'}
                    className="flex-shrink-0"
                  >
                    {m.is_published ? (
                      <Eye className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <EyeOff className="h-3.5 w-3.5 text-slate-300" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{m.title}</p>
                {locName(m.location_id) && (
                  <p className="text-[11px] text-slate-400 mt-1">{locName(m.location_id)}</p>
                )}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      setEditing({
                        id: m.id,
                        name: m.name,
                        title: m.title ?? '',
                        location_id: m.location_id,
                        image_url: m.image_url,
                        is_published: m.is_published,
                        sort_order: m.sort_order,
                      })
                    }
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${m.name}? This can't be undone.`)) remove.mutate(m.id);
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <EditModal
          draft={editing}
          locations={locations ?? []}
          saving={save.isPending}
          onChange={setEditing}
          onCancel={() => setEditing(null)}
          onSave={() => save.mutate(editing)}
        />
      )}

      <style>{`
        .input-style {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.5rem;
          border: 1.5px solid rgb(226 232 240);
          font-size: 0.875rem;
          color: ${DARK_NAVY};
          background: white;
          transition: border-color 150ms;
        }
        .input-style:focus { outline: none; border-color: ${ORANGE}; }
      `}</style>
    </div>
  );
}

function EditModal({
  draft,
  locations,
  saving,
  onChange,
  onCancel,
  onSave,
}: {
  draft: Draft;
  locations: Pick<DbLocation, 'id' | 'label'>[];
  saving: boolean;
  onChange: (d: Draft) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => onChange({ ...draft, [k]: v });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold" style={{ color: DARK_NAVY }}>
            {draft.id ? 'Edit office manager' : 'Add office manager'}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Photo</label>
            <ImageUpload
              value={draft.image_url}
              onChange={(url) => set('image_url', url)}
              folder="office-managers"
              aspectRatio="square"
              height={160}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Name</label>
            <input
              type="text"
              value={draft.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="First Last"
              className="input-style"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title</label>
            <input
              type="text"
              value={draft.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Office Manager"
              className="input-style"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Clinic <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <select
              value={draft.location_id ?? ''}
              onChange={(e) => set('location_id', e.target.value || null)}
              className="input-style"
            >
              <option value="">— Not assigned —</option>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={draft.is_published}
              onChange={(e) => set('is_published', e.target.checked)}
              className="h-4 w-4 rounded accent-orange-500"
            />
            Published
          </label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving || !draft.name.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-50"
            style={{ background: ORANGE }}
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {draft.id ? 'Save changes' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
