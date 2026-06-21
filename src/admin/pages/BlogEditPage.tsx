import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Upload, Loader2 } from 'lucide-react';
import { supabase, uploadMedia } from '../../lib/supabase';
import RichTextEditor from '../components/RichTextEditor';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ISO → value for <input type="datetime-local"> in the browser's local time.
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const CATEGORY_SUGGESTIONS = ['Dental Tips', 'Kids Dentistry', 'Orthodontics', 'Cosmetic Dentistry', 'Oral Health', 'Practice News'];

export default function BlogEditPage({ isNew = false }: { isNew?: boolean }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const editingId = isNew ? null : id ?? null;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [publishAt, setPublishAt] = useState(''); // datetime-local value
  const [cover, setCover] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const { data: existing } = useQuery({
    queryKey: ['admin', 'blog_post', editingId],
    queryFn: async () => {
      const { data, error } = await supabase.from('blog_posts').select('*').eq('id', editingId).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!editingId,
  });

  useEffect(() => {
    if (existing) {
      setTitle(existing.title ?? '');
      setSlug(existing.slug ?? '');
      setSlugTouched(true);
      setExcerpt(existing.excerpt ?? '');
      setAuthor(existing.author ?? '');
      setCategory(existing.category ?? '');
      setMetaTitle(existing.meta_title ?? '');
      setMetaDescription(existing.meta_description ?? '');
      setPublishAt(existing.published_at ? toLocalInput(existing.published_at) : '');
      setCover(existing.cover_image_url ?? '');
      setContent(existing.content ?? '');
      setStatus((existing.status as 'draft' | 'published') ?? 'draft');
    }
  }, [existing]);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try { setCover(await uploadMedia(file, 'blog')); } catch { setError('Image upload failed.'); } finally { setUploading(false); }
  }

  async function save() {
    setError('');
    if (!title.trim()) { setError('Add a title.'); return; }
    if (!effectiveSlug) { setError('Add a slug.'); return; }
    setSaving(true);
    // Publish/schedule timing: an explicit date wins; otherwise publishing now
    // stamps now; a future date schedules it (RLS keeps it hidden until then).
    let publishedAtValue: string | null = existing?.published_at ?? null;
    if (publishAt) publishedAtValue = new Date(publishAt).toISOString();
    else if (status === 'published' && !publishedAtValue) publishedAtValue = new Date().toISOString();
    const row: Record<string, unknown> = {
      title: title.trim(), slug: effectiveSlug, excerpt: excerpt || null, author: author || null,
      category: category || null, meta_title: metaTitle || null, meta_description: metaDescription || null,
      cover_image_url: cover || null, content, status, published_at: publishedAtValue,
      updated_at: new Date().toISOString(),
    };
    try {
      if (editingId) {
        const { error } = await supabase.from('blog_posts').update(row).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(row);
        if (error) throw error;
      }
      qc.invalidateQueries({ queryKey: ['admin', 'blog_posts'] });
      navigate('/dental-admin/blog');
    } catch (e) {
      setError((e as Error)?.message ?? 'Could not save.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button onClick={() => navigate('/dental-admin/blog')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-5">
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </button>
      <h1 className="text-3xl font-extrabold tracking-tight mb-6" style={{ color: DARK_NAVY }}>{editingId ? 'Edit post' : 'New post'}</h1>

      {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

      <div className="space-y-5">
        <Field label="Title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="5 tips for a healthier smile"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500" />
        </Field>

        <Field label="URL slug" hint={`/blog/${effectiveSlug || '…'}`}>
          <input value={effectiveSlug} onChange={(e) => { setSlugTouched(true); setSlug(slugify(e.target.value)); }}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-mono focus:outline-none focus:border-orange-500" />
        </Field>

        <Field label="Excerpt" hint="Short summary shown on the blog index card.">
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500" />
        </Field>

        <Field label="Author (optional)">
          <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Boca Dental and Braces"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500" />
        </Field>

        <Field label="Category" hint="Groups posts on the blog (e.g. Dental Tips, Kids Dentistry).">
          <input value={category} onChange={(e) => setCategory(e.target.value)} list="blog-categories" placeholder="Dental Tips"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500" />
          <datalist id="blog-categories">{CATEGORY_SUGGESTIONS.map((c) => <option key={c} value={c} />)}</datalist>
        </Field>

        <Field label="Cover image">
          <div className="flex items-center gap-4">
            {cover ? <img src={cover} alt="" className="h-16 w-28 object-cover rounded-lg border border-slate-200" /> : <div className="h-16 w-28 rounded-lg bg-slate-100 border border-dashed border-slate-300" />}
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm cursor-pointer hover:bg-slate-50">
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} {cover ? 'Replace' : 'Upload'}
              <input type="file" accept="image/*" hidden onChange={onCover} />
            </label>
            {cover && <button onClick={() => setCover('')} className="text-xs text-slate-400 hover:text-red-600">Remove</button>}
          </div>
        </Field>

        <Field label="Content">
          <RichTextEditor value={content} onChange={setContent} placeholder="Write your post…" />
        </Field>

        <Field label="SEO title" hint={`${(metaTitle || title).length} chars · aim for 50–60. Falls back to the post title.`}>
          <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={title || 'Search-engine title'}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500" />
        </Field>

        <Field label="SEO description" hint={`${(metaDescription || excerpt).length} chars · aim for 150–160. Falls back to the excerpt.`}>
          <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} placeholder={excerpt || 'Search-engine description'}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500" />
        </Field>

        <div className="flex flex-wrap gap-6">
          <Field label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500">
              <option value="draft">Draft (not on the site)</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Publish date & time" hint="Leave blank to publish now. Set a future time to schedule — it goes live automatically.">
            <input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-500" />
          </Field>
        </div>
        {status === 'published' && publishAt && new Date(publishAt) > new Date() && (
          <div className="px-4 py-2.5 rounded-lg bg-blue-50 text-blue-700 text-sm">
            📅 Scheduled — this post will appear automatically on {new Date(publishAt).toLocaleString()}.
          </div>
        )}

        <div className="pt-2">
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white disabled:opacity-50" style={{ background: ORANGE }}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save post
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">{label}</label>
      {children}
      {hint && <div className="text-xs text-slate-400 mt-1 font-mono">{hint}</div>}
    </div>
  );
}
