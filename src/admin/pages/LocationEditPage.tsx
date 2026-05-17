import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Trash2, Loader2 } from 'lucide-react';
import { supabase, type DbLocation } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function LocationEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<Partial<DbLocation>>({});
  const [saved, setSaved] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'location', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id!)
        .single();
      if (error) throw error;
      return data as DbLocation;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async (patch: Partial<DbLocation>) => {
      const { data, error } = await supabase
        .from('locations')
        .update(patch)
        .eq('id', id!)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'locations'] });
      qc.invalidateQueries({ queryKey: ['admin', 'location', id] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  if (isLoading || !data) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
      </div>
    );
  }

  function update<K extends keyof DbLocation>(key: K, value: DbLocation[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSave() {
    const patch = { ...form };
    delete (patch as { id?: string }).id;
    delete (patch as { created_at?: string }).created_at;
    delete (patch as { updated_at?: string }).updated_at;
    save.mutate(patch);
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dental-admin/locations"
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          All locations
        </Link>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-emerald-600 font-semibold animate-pulse">Saved!</span>
          )}
          <button
            onClick={onSave}
            disabled={save.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
            style={{ background: ORANGE }}
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save changes
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
          style={{ background: `${ORANGE}15`, color: ORANGE }}
        >
          Editing location
        </div>
        <h1 className="text-3xl font-extrabold" style={{ color: DARK_NAVY }}>
          {form.label || data.label}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          /clinics/{form.slug || data.slug}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <Card title="Basic info">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Label">
              <input
                type="text"
                value={form.label ?? ''}
                onChange={(e) => update('label', e.target.value)}
                className="input-style"
              />
            </Field>
            <Field label="Slug">
              <input
                type="text"
                value={form.slug ?? ''}
                onChange={(e) => update('slug', e.target.value)}
                className="input-style"
              />
            </Field>
            <Field label="Phone">
              <input
                type="text"
                value={form.phone ?? ''}
                onChange={(e) => update('phone', e.target.value)}
                className="input-style"
              />
            </Field>
            <Field label="Hours">
              <input
                type="text"
                value={form.hours ?? ''}
                onChange={(e) => update('hours', e.target.value)}
                className="input-style"
              />
            </Field>
          </div>
        </Card>

        <Card title="Address">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Street address" className="col-span-2">
              <input
                type="text"
                value={form.address ?? ''}
                onChange={(e) => update('address', e.target.value)}
                className="input-style"
              />
            </Field>
            <Field label="City">
              <input
                type="text"
                value={form.city ?? ''}
                onChange={(e) => update('city', e.target.value)}
                className="input-style"
              />
            </Field>
            <Field label="State">
              <input
                type="text"
                value={form.state ?? ''}
                onChange={(e) => update('state', e.target.value)}
                className="input-style"
              />
            </Field>
            <Field label="ZIP">
              <input
                type="text"
                value={form.zip ?? ''}
                onChange={(e) => update('zip', e.target.value)}
                className="input-style"
              />
            </Field>
            <Field label="Neighborhood">
              <input
                type="text"
                value={form.neighborhood ?? ''}
                onChange={(e) => update('neighborhood', e.target.value)}
                className="input-style"
              />
            </Field>
          </div>
        </Card>

        <Card title="Reviews & rating">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Rating">
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={form.rating ?? ''}
                onChange={(e) => update('rating', e.target.value ? parseFloat(e.target.value) : null)}
                className="input-style"
              />
            </Field>
            <Field label="Review count">
              <input
                type="number"
                value={form.review_count ?? 0}
                onChange={(e) => update('review_count', parseInt(e.target.value, 10))}
                className="input-style"
              />
            </Field>
            <Field label="Google Business Profile ID" className="col-span-2">
              <input
                type="text"
                value={form.gbp_id ?? ''}
                onChange={(e) => update('gbp_id', e.target.value)}
                className="input-style font-mono text-xs"
                placeholder="ChIJ-..."
              />
            </Field>
          </div>
        </Card>

        <Card title="Neighborhood narrative">
          <Field label="Long-form description (shown on location page)">
            <textarea
              value={form.narrative ?? ''}
              onChange={(e) => update('narrative', e.target.value)}
              rows={8}
              className="input-style font-normal leading-relaxed"
              placeholder="What makes this neighborhood special, who comes here, what they get..."
            />
            <p className="text-xs text-slate-400 mt-1">
              {(form.narrative ?? '').length} characters
            </p>
          </Field>
        </Card>

        <Card title="Visibility">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published ?? true}
                onChange={(e) => update('is_published', e.target.checked)}
                className="h-4 w-4 rounded accent-orange-500"
              />
              <span className="text-sm font-medium text-slate-700">Published (visible on live site)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_kids_clinic ?? false}
                onChange={(e) => update('is_kids_clinic', e.target.checked)}
                className="h-4 w-4 rounded accent-orange-500"
              />
              <span className="text-sm font-medium text-slate-700">Pediatric (kids) clinic</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.same_day_emergency ?? true}
                onChange={(e) => update('same_day_emergency', e.target.checked)}
                className="h-4 w-4 rounded accent-orange-500"
              />
              <span className="text-sm font-medium text-slate-700">Same-day emergency appointments</span>
            </label>
          </div>
        </Card>
      </div>

      <style>{`
        .input-style {
          width: 100%;
          padding: 0.625rem 0.875rem;
          border-radius: 0.5rem;
          border: 1.5px solid rgb(226 232 240);
          font-size: 0.875rem;
          color: ${DARK_NAVY};
          transition: border-color 150ms;
        }
        .input-style:focus {
          outline: none;
          border-color: ${ORANGE};
        }
      `}</style>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: NAVY }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  );
}
