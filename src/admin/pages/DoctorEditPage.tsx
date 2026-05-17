import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2, Eye, EyeOff, X, Plus } from 'lucide-react';
import { supabase, type DbDoctor } from '../../lib/supabase';
import ImageUpload from '../components/ImageUpload';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

type FormState = Partial<DbDoctor>;

export default function DoctorEditPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<FormState>({
    slug: '',
    name: '',
    title: 'General Dentist',
    bio: '',
    short_bio: '',
    credentials: [],
    specialties: [],
    languages: ['English'],
    is_published: true,
    sort_order: 0,
  });
  const [saved, setSaved] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'doctor', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('doctors').select('*').eq('id', id!).single();
      if (error) throw error;
      return data as DbDoctor;
    },
    enabled: !!id && !isNew,
  });

  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = { ...form };
      delete (payload as { id?: string }).id;
      delete (payload as { created_at?: string }).created_at;
      delete (payload as { updated_at?: string }).updated_at;

      if (isNew) {
        const { data, error } = await supabase.from('doctors').insert(payload).select('id').single();
        if (error) throw error;
        return data.id as string;
      } else {
        const { error } = await supabase.from('doctors').update(payload).eq('id', id!);
        if (error) throw error;
        return id!;
      }
    },
    onSuccess: (newId) => {
      qc.invalidateQueries({ queryKey: ['admin', 'doctors'] });
      qc.invalidateQueries({ queryKey: ['admin', 'doctor', newId] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (isNew) navigate(`/dental-admin/doctors/${newId}`);
    },
  });

  if (!isNew && (isLoading || !data)) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
      </div>
    );
  }

  function update<K extends keyof DbDoctor>(key: K, value: DbDoctor[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link to="/dental-admin/doctors" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          All dentists
        </Link>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-emerald-600 font-semibold animate-pulse">Saved!</span>}
          <button
            onClick={() => save.mutate()}
            disabled={!form.name || save.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
            style={{ background: ORANGE, boxShadow: `0 6px 16px -8px ${ORANGE}` }}
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNew ? 'Create dentist' : 'Save changes'}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
          style={{ background: `${NAVY}10`, color: NAVY }}
        >
          {isNew ? 'New Dentist' : 'Editing Dentist'}
        </div>
        <h1 className="text-3xl font-extrabold" style={{ color: DARK_NAVY }}>
          {form.name || 'New dentist'}
        </h1>
        {form.slug && <p className="text-sm text-slate-500 mt-1 font-mono">/about-us/dentists/{form.slug}</p>}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left column: photos */}
        <div className="col-span-1 space-y-5">
          <Card title="Headshot">
            <ImageUpload
              value={form.headshot_url ?? null}
              onChange={(url) => update('headshot_url', url)}
              folder="doctors/headshots"
              aspectRatio="square"
            />
            <p className="text-[10px] text-slate-400 mt-2">
              Square crop. Used in directories + bio cards.
            </p>
          </Card>

          <Card title="Full photo (optional)">
            <ImageUpload
              value={form.photo_url ?? null}
              onChange={(url) => update('photo_url', url)}
              folder="doctors/photos"
              aspectRatio="tall"
            />
            <p className="text-[10px] text-slate-400 mt-2">
              Portrait photo for the bio page hero.
            </p>
          </Card>
        </div>

        {/* Right column: details */}
        <div className="col-span-2 space-y-5">
          <Card title="Identity">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full name">
                <input type="text" value={form.name ?? ''} onChange={(e) => update('name', e.target.value)} placeholder="Dr. Wyatt Dannels, DDS" className="input-style" />
              </Field>
              <Field label="URL slug">
                <input type="text" value={form.slug ?? ''} onChange={(e) => update('slug', e.target.value)} placeholder="dr-wyatt-dannels" className="input-style font-mono text-xs" />
              </Field>
              <Field label="Title" className="col-span-2">
                <input type="text" value={form.title ?? ''} onChange={(e) => update('title', e.target.value)} placeholder="Lead Dentist & Founder" className="input-style" />
              </Field>
            </div>
          </Card>

          <Card title="Bio">
            <Field label="Short bio (one or two sentences for cards)">
              <textarea value={form.short_bio ?? ''} onChange={(e) => update('short_bio', e.target.value)} rows={2} className="input-style" />
            </Field>
            <div className="mt-4">
              <Field label="Full bio (for the dentist detail page)">
                <textarea value={form.bio ?? ''} onChange={(e) => update('bio', e.target.value)} rows={10} className="input-style font-normal leading-relaxed" placeholder="Background, training, philosophy, patient stories..." />
              </Field>
            </div>
          </Card>

          <Card title="Credentials">
            <div className="space-y-4">
              <Field label="Degrees & certifications">
                <ListEditor
                  value={form.credentials ?? []}
                  onChange={(v) => update('credentials', v)}
                  placeholder="DDS, MAGD, ICOI Fellow"
                />
              </Field>
              <Field label="Specialties">
                <ListEditor
                  value={form.specialties ?? []}
                  onChange={(v) => update('specialties', v)}
                  placeholder="Cosmetic, Implants, Sedation"
                />
              </Field>
              <Field label="Languages">
                <ListEditor
                  value={form.languages ?? []}
                  onChange={(v) => update('languages', v)}
                  placeholder="English, Spanish, Mandarin"
                />
              </Field>
              <div className="grid grid-cols-3 gap-4 pt-3 border-t border-slate-100">
                <Field label="Alma mater">
                  <input type="text" value={form.alma_mater ?? ''} onChange={(e) => update('alma_mater', e.target.value)} placeholder="UNLV School of Dental Medicine" className="input-style" />
                </Field>
                <Field label="Grad year">
                  <input type="number" value={form.graduation_year ?? ''} onChange={(e) => update('graduation_year', e.target.value ? parseInt(e.target.value, 10) : null)} className="input-style" />
                </Field>
                <Field label="Years experience">
                  <input type="number" value={form.years_experience ?? ''} onChange={(e) => update('years_experience', e.target.value ? parseInt(e.target.value, 10) : null)} className="input-style" />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Visibility">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_published ?? true} onChange={(e) => update('is_published', e.target.checked)} className="h-4 w-4 rounded accent-orange-500" />
              <span className="text-sm font-medium flex items-center gap-2">
                {form.is_published ? <Eye className="h-3.5 w-3.5 text-emerald-500" /> : <EyeOff className="h-3.5 w-3.5 text-slate-400" />}
                Published (visible on live site)
              </span>
            </label>
          </Card>
        </div>
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
        .input-style:focus { outline: none; border-color: ${ORANGE}; }
      `}</style>
    </div>
  );
}

function ListEditor({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...value];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder={placeholder}
            className="input-style"
          />
          <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...value, ''])}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors"
      >
        <Plus className="h-3 w-3" />
        Add
      </button>
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
