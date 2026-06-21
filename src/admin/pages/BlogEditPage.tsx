import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase, uploadMedia } from '../../lib/supabase';
import RichTextEditor from '../components/RichTextEditor';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';
const SITE = 'https://bocadentalandbraces.com';
const MAX_IMG_BYTES = 5 * 1024 * 1024;

const CATEGORIES = [
  'Dental Tips',
  'Kids Dentistry',
  'Orthodontics',
  'Cosmetic Dentistry',
  'Oral Health',
  'Preventive Care',
  'Dental Implants',
  'Emergency Dentistry',
  'Practice News',
];

type FaqItem = { question: string; answer: string };

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ISO → value for <input type="datetime-local"> in the browser's local time.
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

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
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [publishAt, setPublishAt] = useState(''); // datetime-local value
  const [cover, setCover] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imgDims, setImgDims] = useState<{ w: number; h: number } | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [noindex, setNoindex] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');

  const fileRef = useRef<HTMLInputElement>(null);

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
      setCategory(existing.category ?? CATEGORIES[0]);
      setMetaTitle(existing.meta_title ?? '');
      setMetaDescription(existing.meta_description ?? '');
      setPublishAt(existing.published_at ? toLocalInput(existing.published_at) : '');
      setCover(existing.cover_image_url ?? '');
      setImageAlt(existing.image_alt ?? '');
      setTags(Array.isArray(existing.tags) ? existing.tags : []);
      setFaqItems(Array.isArray(existing.faq_items) ? (existing.faq_items as FaqItem[]) : []);
      setContent(existing.content ?? '');
      setStatus((existing.status as 'draft' | 'published') ?? 'draft');
      setNoindex(!!existing.noindex);
    }
  }, [existing]);

  const effectiveSlug = slugTouched ? slug : slugify(title);

  async function handleFile(file: File) {
    if (!file) return;
    if (file.size > MAX_IMG_BYTES) { setError('Image too large — max 5MB.'); return; }
    if (!/^image\/(webp|jpeg|jpg|png)$/.test(file.type)) { setError('Use WebP, JPG, or PNG.'); return; }
    setError('');
    setUploading(true);
    try {
      const url = await uploadMedia(file, 'blog');
      setCover(url);
      const img = new Image();
      img.onload = () => setImgDims({ w: img.naturalWidth, h: img.naturalHeight });
      img.src = url;
    } catch {
      setError('Image upload failed.');
    } finally {
      setUploading(false);
    }
  }

  function addTag() {
    const t = tagInput.trim().replace(/,$/, '');
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagInput('');
  }

  async function save(nextStatus?: 'draft' | 'published') {
    setError('');
    const useStatus = nextStatus ?? status;
    if (!title.trim()) { setError('Add a title.'); return; }
    if (!effectiveSlug) { setError('Add a slug.'); return; }
    setSaving(true);
    setStatus(useStatus);
    // Publish/schedule timing: an explicit date wins; otherwise publishing now
    // stamps now; a future date schedules it (RLS keeps it hidden until then).
    let publishedAtValue: string | null = existing?.published_at ?? null;
    if (publishAt) publishedAtValue = new Date(publishAt).toISOString();
    else if (useStatus === 'published' && !publishedAtValue) publishedAtValue = new Date().toISOString();
    const row: Record<string, unknown> = {
      title: title.trim(), slug: effectiveSlug, excerpt: excerpt || null, author: author || null,
      category: category || null, meta_title: metaTitle || null, meta_description: metaDescription || null,
      cover_image_url: cover || null, image_alt: imageAlt || null, tags, faq_items: faqItems,
      noindex, canonical_url: `${SITE}/blog/${effectiveSlug}/`,
      content, status: useStatus, published_at: publishedAtValue, updated_at: new Date().toISOString(),
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

  async function deletePost() {
    if (!editingId) return;
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    const { error } = await supabase.from('blog_posts').delete().eq('id', editingId);
    if (error) { setError(error.message); return; }
    qc.invalidateQueries({ queryKey: ['admin', 'blog_posts'] });
    navigate('/dental-admin/blog');
  }

  const scheduled = status === 'published' && publishAt && new Date(publishAt) > new Date();
  const metaTitleLen = (metaTitle || title).length;
  const metaDescLen = (metaDescription || excerpt).length;
  const metaTitleOver = metaTitleLen > 60;
  const metaDescBad = metaDescLen > 0 && (metaDescLen < 140 || metaDescLen > 165);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Link to="/dental-admin/blog" className="text-sm font-semibold text-slate-500 hover:text-slate-800">← Back to posts</Link>
        <span className="text-slate-300">/</span>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>{editingId ? 'Edit Post' : 'New Post'}</h1>
      </div>

      {error && <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* LEFT — content */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
          <Field label="Post title (reader-facing, can be punchy)">
            <input className="bi" value={title} maxLength={200}
              onChange={(e) => { setTitle(e.target.value); if (!slugTouched) setSlug(slugify(e.target.value)); }} />
          </Field>

          <Field label="SEO title (≤60 chars — Google result)" counter={<span className={metaTitleOver ? 'text-red-600 font-semibold' : 'text-slate-400'}>{metaTitleLen}/60</span>}>
            <input className="bi" value={metaTitle} maxLength={120} placeholder={title || 'Search-engine title'} onChange={(e) => setMetaTitle(e.target.value)} />
          </Field>

          <Field label="URL slug">
            <input className="bi font-mono" value={effectiveSlug} maxLength={80}
              onChange={(e) => { setSlugTouched(true); setSlug(e.target.value.toLowerCase()); }}
              onBlur={() => setSlug(slugify(effectiveSlug))} />
            <p className="text-xs text-slate-400 mt-1.5">Preview: bocadentalandbraces.com/blog/<span className="text-slate-700">{effectiveSlug || 'your-slug'}</span></p>
          </Field>

          <Field label="SEO / excerpt description (150–160 chars)" counter={<span className={metaDescBad ? 'text-red-600 font-semibold' : 'text-slate-400'}>{metaDescLen} chars</span>}>
            <textarea className="bi min-h-[70px]" value={metaDescription || excerpt} maxLength={300}
              onChange={(e) => { setMetaDescription(e.target.value); setExcerpt(e.target.value); }} />
            <p className="text-xs text-slate-400 mt-1">Used as the search snippet and the blog-card summary.</p>
          </Field>

          <Field label="Featured image">
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) handleFile(f); }}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${dragOver ? 'border-orange-500 bg-orange-50' : 'border-slate-300 hover:border-orange-400'}`}
            >
              {cover ? (
                <div className="space-y-3">
                  <img src={cover} alt="Featured" className="max-h-56 mx-auto rounded border border-slate-200"
                    onLoad={(e) => setImgDims({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })} />
                  <p className="text-xs text-slate-400">{imgDims ? `${imgDims.w}×${imgDims.h}` : 'Loaded'} · target 1200×630</p>
                  <button type="button" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }} className="text-sm font-semibold" style={{ color: ORANGE }}>Replace image</button>
                </div>
              ) : (
                <div className="text-sm text-slate-500">
                  {uploading ? 'Uploading…' : (<><p className="font-semibold mb-1" style={{ color: DARK_NAVY }}>Drop image here or click to browse</p><p>WebP, JPG, PNG · Max 5MB · 1200×630 recommended</p></>)}
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/webp,image/jpeg,image/png" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }} />
            </div>
          </Field>

          <Field label="Image alt text (descriptive + keyword)">
            <input className="bi" value={imageAlt} maxLength={200} onChange={(e) => setImageAlt(e.target.value)} />
          </Field>

          <Field label="Post body">
            <RichTextEditor value={content} onChange={setContent} placeholder="Write your post…" />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Category">
              <select className="bi" value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Author (optional)">
              <input className="bi" value={author} placeholder="Boca Dental and Braces" onChange={(e) => setAuthor(e.target.value)} />
            </Field>
          </div>

          <Field label="Tags">
            <div className="flex flex-wrap gap-2 p-2 border border-slate-200 rounded-lg min-h-[44px] bg-white">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-1 rounded">
                  {t}
                  <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="text-slate-400 hover:text-red-600" aria-label={`Remove ${t}`}>×</button>
                </span>
              ))}
              <input className="flex-1 min-w-[140px] outline-none text-sm" value={tagInput} placeholder="Type and press Enter…"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); }
                  else if (e.key === 'Backspace' && !tagInput && tags.length) setTags(tags.slice(0, -1));
                }}
                onBlur={addTag} />
            </div>
          </Field>

          <Field label="FAQ items (optional — adds FAQPage schema + an on-page FAQ)">
            <div className="space-y-3">
              {faqItems.map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">FAQ #{idx + 1}</span>
                    <button type="button" onClick={() => setFaqItems(faqItems.filter((_, i) => i !== idx))} className="text-xs text-red-600 hover:underline">Remove</button>
                  </div>
                  <input className="bi" placeholder="Question" value={item.question}
                    onChange={(e) => { const next = [...faqItems]; next[idx] = { ...next[idx], question: e.target.value }; setFaqItems(next); }} />
                  <textarea className="bi min-h-[70px]" placeholder="Answer" value={item.answer}
                    onChange={(e) => { const next = [...faqItems]; next[idx] = { ...next[idx], answer: e.target.value }; setFaqItems(next); }} />
                </div>
              ))}
              <button type="button" onClick={() => setFaqItems([...faqItems, { question: '', answer: '' }])} className="text-sm font-semibold" style={{ color: ORANGE }}>+ Add FAQ</button>
            </div>
          </Field>
        </div>

        {/* RIGHT — publish panel */}
        <aside className="lg:sticky lg:top-6 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold" style={{ color: DARK_NAVY }}>Publish</h3>

          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Status</span>
            <div className="flex rounded-lg border border-slate-200 overflow-hidden">
              <button type="button" onClick={() => setStatus('draft')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${status === 'draft' ? 'bg-slate-200 text-slate-800' : 'bg-white text-slate-400'}`}>Draft</button>
              <button type="button" onClick={() => setStatus('published')} className={`flex-1 py-2 text-sm font-semibold transition-colors ${status === 'published' ? 'bg-green-100 text-green-700' : 'bg-white text-slate-400'}`}>Published</button>
            </div>
          </div>

          <Field label="Publish date & time">
            <input type="datetime-local" className="bi" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
            <p className="text-xs text-slate-400 mt-1">Leave blank to publish now. A future time schedules it — it goes live automatically.</p>
          </Field>

          {scheduled && (
            <div className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs">📅 Scheduled for {new Date(publishAt).toLocaleString()}.</div>
          )}

          <label className="flex items-start gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={noindex} onChange={(e) => setNoindex(e.target.checked)} className="mt-0.5" />
            <span style={{ color: DARK_NAVY }}>Hide from search engines (noindex)</span>
          </label>

          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Canonical URL</span>
            <p className="text-xs break-all bg-slate-50 px-2.5 py-2 rounded border border-slate-200" style={{ color: DARK_NAVY }}>{SITE}/blog/{effectiveSlug || 'your-slug'}/</p>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200">
            <button type="button" disabled={saving} onClick={() => save('published')} className="w-full font-semibold text-white py-2.5 rounded-md transition-colors disabled:opacity-60" style={{ background: ORANGE }}>{saving ? 'Saving…' : 'Publish'}</button>
            <button type="button" disabled={saving} onClick={() => save('draft')} className="w-full font-semibold border border-slate-200 py-2.5 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-60" style={{ color: DARK_NAVY }}>Save Draft</button>
            {editingId && (
              <button type="button" onClick={deletePost} className="w-full font-semibold border border-red-200 text-red-700 py-2.5 rounded-md hover:bg-red-50 transition-colors">Delete Post</button>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .bi { width:100%; border:1px solid #e2e8f0; border-radius:8px; padding:10px 12px; font-size:14px; background:white; color:#0f172a; font-family:inherit; }
        .bi:focus { outline:none; border-color:${ORANGE}; box-shadow:0 0 0 3px rgba(243,103,42,0.15); }
      `}</style>
    </div>
  );
}

function Field({ label, counter, children }: { label: string; counter?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-end justify-between mb-1.5 gap-2">
        <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</span>
        {counter && <span className="text-[11px]">{counter}</span>}
      </div>
      {children}
    </label>
  );
}
