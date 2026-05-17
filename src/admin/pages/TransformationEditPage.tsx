import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2, ArrowRight } from 'lucide-react';
import { supabase, type DbTransformation, type DbDoctor, type DbLocation, type DbService } from '../../lib/supabase';
import ImageUpload from '../components/ImageUpload';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

const TREATMENT_TYPES = [
  'veneers',
  'invisalign',
  'crowns',
  'whitening',
  'implants',
  'general',
  'restorative',
  'orthodontics',
];

type FormState = Partial<DbTransformation>;

export default function TransformationEditPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    treatment_type: 'veneers',
    before_image_url: '',
    after_image_url: '',
    patient_first_name: '',
    patient_age_range: '',
    treatment_duration: '',
    is_featured: false,
    is_published: true,
    consent_obtained: false,
  });
  const [saved, setSaved] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'transformation', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transformations')
        .select('*')
        .eq('id', id!)
        .single();
      if (error) throw error;
      return data as DbTransformation;
    },
    enabled: !!id && !isNew,
  });

  const { data: meta } = useQuery({
    queryKey: ['admin', 'transformation-meta'],
    queryFn: async () => {
      const [docs, locs, svcs] = await Promise.all([
        supabase.from('doctors').select('id, name').order('sort_order'),
        supabase.from('locations').select('id, label').order('sort_order'),
        supabase.from('services').select('id, label').order('sort_order'),
      ]);
      return {
        doctors: (docs.data ?? []) as Pick<DbDoctor, 'id' | 'name'>[],
        locations: (locs.data ?? []) as Pick<DbLocation, 'id' | 'label'>[],
        services: (svcs.data ?? []) as Pick<DbService, 'id' | 'label'>[],
      };
    },
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = { ...form };
      delete (payload as { id?: string }).id;
      delete (payload as { created_at?: string }).created_at;
      delete (payload as { updated_at?: string }).updated_at;

      if (isNew) {
        const { data, error } = await supabase
          .from('transformations')
          .insert(payload)
          .select('id')
          .single();
        if (error) throw error;
        return data.id as string;
      } else {
        const { error } = await supabase
          .from('transformations')
          .update(payload)
          .eq('id', id!);
        if (error) throw error;
        return id!;
      }
    },
    onSuccess: (newId) => {
      qc.invalidateQueries({ queryKey: ['admin', 'transformations'] });
      qc.invalidateQueries({ queryKey: ['admin', 'transformation', newId] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (isNew) navigate(`/dental-admin/transformations/${newId}`);
    },
  });

  if (!isNew && (isLoading || !data)) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
      </div>
    );
  }

  function update<K extends keyof DbTransformation>(key: K, value: DbTransformation[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const canSave = !!form.title && !!form.before_image_url && !!form.after_image_url;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dental-admin/transformations"
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          All transformations
        </Link>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-emerald-600 font-semibold animate-pulse">Saved!</span>}
          <button
            onClick={() => save.mutate()}
            disabled={!canSave || save.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
            style={{ background: ORANGE, boxShadow: `0 6px 16px -8px ${ORANGE}` }}
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNew ? 'Create' : 'Save changes'}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
          style={{ background: `${ORANGE}15`, color: ORANGE }}
        >
          {isNew ? 'New Transformation' : 'Editing Transformation'}
        </div>
        <h1 className="text-3xl font-extrabold" style={{ color: DARK_NAVY }}>
          {form.title || 'New transformation'}
        </h1>
      </div>

      <div className="space-y-5">
        {/* Before / After image pair */}
        <Card title="Before & After">
          <div className="grid grid-cols-2 gap-6 items-center">
            <ImageUpload
              label="Before"
              value={form.before_image_url ?? null}
              onChange={(url) => update('before_image_url', url ?? '')}
              folder="transformations/before"
              aspectRatio="tall"
            />
            <div className="relative">
              <ImageUpload
                label="After"
                value={form.after_image_url ?? null}
                onChange={(url) => update('after_image_url', url ?? '')}
                folder="transformations/after"
                aspectRatio="tall"
              />
              <div
                className="absolute -left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white border-2 flex items-center justify-center shadow-lg z-10"
                style={{ borderColor: ORANGE, color: ORANGE }}
              >
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            Tip: use consistent angle, lighting, and crop for the strongest before/after effect.
          </p>
        </Card>

        <Card title="Story">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title" className="col-span-2">
              <input
                type="text"
                value={form.title ?? ''}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Veneers transformation - James, 32"
                className="input-style"
              />
            </Field>
            <Field label="Description" className="col-span-2">
              <textarea
                value={form.description ?? ''}
                onChange={(e) => update('description', e.target.value)}
                rows={3}
                placeholder="Brief story behind the transformation. What did the patient want? What did we do?"
                className="input-style"
              />
            </Field>
            <Field label="Treatment type">
              <select
                value={form.treatment_type ?? ''}
                onChange={(e) => update('treatment_type', e.target.value)}
                className="input-style"
              >
                {TREATMENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Duration">
              <input
                type="text"
                value={form.treatment_duration ?? ''}
                onChange={(e) => update('treatment_duration', e.target.value)}
                placeholder="8 weeks"
                className="input-style"
              />
            </Field>
            <Field label="Patient first name (optional)">
              <input
                type="text"
                value={form.patient_first_name ?? ''}
                onChange={(e) => update('patient_first_name', e.target.value)}
                placeholder="James"
                className="input-style"
              />
            </Field>
            <Field label="Patient age range (optional)">
              <input
                type="text"
                value={form.patient_age_range ?? ''}
                onChange={(e) => update('patient_age_range', e.target.value)}
                placeholder="30-40"
                className="input-style"
              />
            </Field>
          </div>
        </Card>

        <Card title="Connections (optional)">
          <div className="grid grid-cols-3 gap-4">
            <Field label="Doctor">
              <select
                value={form.doctor_id ?? ''}
                onChange={(e) => update('doctor_id', e.target.value || null)}
                className="input-style"
              >
                <option value="">— None —</option>
                {meta?.doctors?.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Location">
              <select
                value={form.location_id ?? ''}
                onChange={(e) => update('location_id', e.target.value || null)}
                className="input-style"
              >
                <option value="">— None —</option>
                {meta?.locations?.map((l) => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Service">
              <select
                value={form.service_id ?? ''}
                onChange={(e) => update('service_id', e.target.value || null)}
                className="input-style"
              >
                <option value="">— None —</option>
                {meta?.services?.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </Field>
          </div>
        </Card>

        <Card title="Visibility & consent">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_published ?? true}
                onChange={(e) => update('is_published', e.target.checked)}
                className="h-4 w-4 rounded accent-orange-500"
              />
              <span className="text-sm font-medium">Published (visible on live site)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_featured ?? false}
                onChange={(e) => update('is_featured', e.target.checked)}
                className="h-4 w-4 rounded accent-orange-500"
              />
              <span className="text-sm font-medium">Featured (highlighted at top of gallery)</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-slate-100">
              <input
                type="checkbox"
                checked={form.consent_obtained ?? false}
                onChange={(e) => update('consent_obtained', e.target.checked)}
                className="h-4 w-4 rounded accent-orange-500 mt-0.5"
              />
              <div>
                <div className="text-sm font-bold" style={{ color: DARK_NAVY }}>Patient consent obtained</div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Required: confirm the patient signed a release allowing public display of these photos. HIPAA compliance.
                </p>
              </div>
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
          background: white;
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
      <h2 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: NAVY }}>{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
