import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Loader2, Eye, ExternalLink } from 'lucide-react';
import * as Icons from 'lucide-react';
import { supabase, type DbPage, type DbPageTemplate, type PageContent } from '../../lib/supabase';
import DynamicField from '../components/DynamicField';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

type PageWithTemplate = DbPage & { template: DbPageTemplate };

export default function PageEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [content, setContent] = useState<PageContent>({});
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState<DbPage['status']>('draft');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [saved, setSaved] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'page', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*, template:page_templates(*)')
        .eq('id', id!)
        .single();
      if (error) throw error;
      return data as PageWithTemplate;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setContent(data.content ?? {});
      setTitle(data.title);
      setSlug(data.slug);
      setStatus(data.status);
      setMetaTitle(data.meta_title ?? '');
      setMetaDescription(data.meta_description ?? '');
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async (publish: boolean) => {
      const newStatus = publish ? 'published' : status;
      const { error } = await supabase
        .from('pages')
        .update({
          title,
          slug,
          content,
          status: newStatus,
          meta_title: metaTitle || null,
          meta_description: metaDescription || null,
          published_at: newStatus === 'published' ? new Date().toISOString() : null,
        })
        .eq('id', id!);
      if (error) throw error;
      if (publish) setStatus('published');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'pages'] });
      qc.invalidateQueries({ queryKey: ['admin', 'page', id] });
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

  function updateSection(sectionId: string, fieldKey: string, value: unknown) {
    setContent((c) => ({
      ...c,
      [sectionId]: { ...(c[sectionId] ?? {}), [fieldKey]: value },
    }));
  }

  const TemplateIcon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[data.template?.icon ?? 'FileText'] ?? Icons.FileText;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/dental-admin/pages"
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          All pages
        </Link>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-emerald-600 font-semibold animate-pulse">Saved!</span>}
          {status === 'published' && (
            <a
              href={`/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View live
            </a>
          )}
          <button
            onClick={() => save.mutate(false)}
            disabled={save.isPending}
            className="px-4 py-2 rounded-lg font-semibold text-sm text-slate-700 bg-white border-2 border-slate-200 hover:border-slate-300 disabled:opacity-50 active:scale-[0.98] transition-all"
          >
            {save.isPending ? 'Saving...' : 'Save draft'}
          </button>
          <button
            onClick={() => save.mutate(true)}
            disabled={save.isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
            style={{ background: ORANGE, boxShadow: `0 6px 16px -8px ${ORANGE}` }}
          >
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            {status === 'published' ? 'Update live' : 'Publish'}
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${NAVY}10`, color: NAVY }}
          >
            <TemplateIcon className="h-3 w-3" />
            {data.template?.name ?? 'Template'}
          </span>
          <StatusBadgeLabel status={status} />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-3xl font-extrabold tracking-tight bg-transparent w-full focus:outline-none border-b-2 border-transparent focus:border-orange-500 transition-colors py-1"
          style={{ color: DARK_NAVY }}
        />
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
          <span>boca.datastacklogic.com/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="font-mono px-2 py-0.5 rounded border border-slate-200 focus:outline-none focus:border-orange-500 text-xs"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-5">
        {data.template?.field_schema?.sections?.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: NAVY }}>
              {section.title}
            </h2>
            <div className="space-y-5">
              {section.fields.map((field) => (
                <DynamicField
                  key={field.key}
                  field={field}
                  value={content[section.id]?.[field.key]}
                  onChange={(v) => updateSection(section.id, field.key, v)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* SEO meta */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-sm uppercase tracking-wider mb-5" style={{ color: NAVY }}>
            SEO &amp; sharing
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
                Meta title (browser tab + search results)
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title}
                className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm focus:outline-none focus:border-orange-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">{metaTitle.length} / 60 characters</p>
            </div>
            <div>
              <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider">
                Meta description (search snippet + social previews)
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm focus:outline-none focus:border-orange-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">{metaDescription.length} / 160 characters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadgeLabel({ status }: { status: DbPage['status'] }) {
  const config = {
    published: { bg: '#DCFCE7', color: '#15803D', label: 'Published' },
    draft:     { bg: '#FEF3C7', color: '#B45309', label: 'Draft' },
    archived:  { bg: '#F1F5F9', color: '#64748B', label: 'Archived' },
  }[status];
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
      style={{ background: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}
