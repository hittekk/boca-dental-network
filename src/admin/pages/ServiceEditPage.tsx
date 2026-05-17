import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { supabase, type DbService } from '../../lib/supabase';
import ImageUpload from '../components/ImageUpload';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

const CATEGORIES = [
  'General', 'Cosmetic', 'Restorative', 'Implants', 'Orthodontics',
  'Pediatric', 'Sedation', 'Surgery', 'Periodontal', 'Endodontics',
];

type FormState = Partial<DbService>;

export default function ServiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<FormState>({
    slug: '',
    label: '',
    short_description: '',
    category: 'General',
    show_on_homepage: true,
    is_published: true,
    sort_order: 0,
  });
  const [saved, setSaved] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'service', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('services').select('*').eq('id', id!).single();
      if (error) throw error;
      return data as DbService;
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
        const { data, error } = await supabase.from('services').insert(payload).select('id').single();
        if (error) throw error;
        return data.id as string;
      } else {
        const { error } = await supabase.from('services').update(payload).eq('id', id!);
        if (error) throw error;
        return id!;
      }
    },
    onSuccess: (newId) => {
      qc.invalidateQueries({ queryKey: ['admin', 'services'] });
      qc.invalidateQueries({ queryKey: ['admin', 'service', newId] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      if (isNew) navigate(`/dental-admin/services/${newId}`);
    },
  });

  if (!isNew && (isLoading || !data)) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
      </div>
    );
  }

  function update<K extends keyof DbService>(key: K, value: DbService[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link to="/dental-admin/services" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          All services
        </Link>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-emerald-600 font-semibold animate-pulse">Saved!</span>}
          <button
            onClick={() => save.mutate()}
            disabled={!form.label || save.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
            style={{ background: ORANGE, boxShadow: `0 6px 16px -8px ${ORANGE}` }}
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNew ? 'Create service' : 'Save changes'}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2"
          style={{ background: `${NAVY}10`, color: NAVY }}
        >
          {isNew ? 'New Service' : 'Editing Service'}
        </div>
        <h1 className="text-3xl font-extrabold" style={{ color: DARK_NAVY }}>
          {form.label || 'New service'}
        </h1>
        {form.slug && <p className="text-sm text-slate-500 mt-1 font-mono">/{form.slug}</p>}
      </div>

      <div className="space-y-5">
        <Card title="Basics">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Service name">
              <input type="text" value={form.label ?? ''} onChange={(e) => update('label', e.target.value)} placeholder="Dental Implants" className="input-style" />
            </Field>
            <Field label="URL slug">
              <input type="text" value={form.slug ?? ''} onChange={(e) => update('slug', e.target.value)} placeholder="dental-implants" className="input-style font-mono text-xs" />
            </Field>
            <Field label="Category">
              <select value={form.category ?? ''} onChange={(e) => update('category', e.target.value)} className="input-style">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Sort order">
              <input type="number" value={form.sort_order ?? 0} onChange={(e) => update('sort_order', parseInt(e.target.value, 10) || 0)} className="input-style" />
            </Field>
            <Field label="Short description (shows on homepage card)" className="col-span-2">
              <textarea value={form.short_description ?? ''} onChange={(e) => update('short_description', e.target.value)} rows={2} placeholder="Single tooth, full arch, All-on-4, implant dentures" className="input-style" />
            </Field>
          </div>
        </Card>

        <Card title="Hero image">
          <ImageUpload
            value={form.hero_image_url ?? null}
            onChange={(url) => update('hero_image_url', url)}
            folder="services"
            aspectRatio="wide"
          />
        </Card>

        <Card title="Detail page content">
          <Field label="Body HTML / Markdown (shown on the service detail page)">
            <textarea
              value={form.body_html ?? ''}
              onChange={(e) => update('body_html', e.target.value)}
              rows={12}
              placeholder="Full service description, what to expect, why us, etc."
              className="input-style font-normal leading-relaxed"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              Plain text or HTML for now. Rich-text editor coming next.
            </p>
          </Field>
        </Card>

        <Card title="SEO meta">
          <div className="space-y-4">
            <Field label="Meta title">
              <input type="text" value={form.meta_title ?? ''} onChange={(e) => update('meta_title', e.target.value)} placeholder={form.label} className="input-style" />
            </Field>
            <Field label="Meta description">
              <textarea value={form.meta_description ?? ''} onChange={(e) => update('meta_description', e.target.value)} rows={2} className="input-style" />
            </Field>
          </div>
        </Card>

        <Card title="Visibility">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_published ?? true} onChange={(e) => update('is_published', e.target.checked)} className="h-4 w-4 rounded accent-orange-500" />
              <span className="text-sm font-medium flex items-center gap-2">
                {form.is_published ? <Eye className="h-3.5 w-3.5 text-emerald-500" /> : <EyeOff className="h-3.5 w-3.5 text-slate-400" />}
                Published (visible on live site)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.show_on_homepage ?? true} onChange={(e) => update('show_on_homepage', e.target.checked)} className="h-4 w-4 rounded accent-orange-500" />
              <span className="text-sm font-medium">Show on homepage 3×3 grid</span>
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
        .input-style:focus { outline: none; border-color: ${ORANGE}; }
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
