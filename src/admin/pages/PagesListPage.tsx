import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText, Plus, Eye, EyeOff, Search, MoreVertical, Trash2, Edit3, ExternalLink, Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { supabase, type DbPage, type DbPageTemplate } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

type PageWithTemplate = DbPage & { template?: { slug: string; name: string; icon: string | null } | null };

export default function PagesListPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('*, template:page_templates(slug, name, icon)')
        .order('updated_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as PageWithTemplate[];
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('pages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'pages'] }),
  });

  const filtered = (data ?? []).filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
            Pages
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add new pages to your site. Pick a template, fill in the fields, hit publish.
          </p>
        </div>
        <button
          onClick={() => navigate('/dental-admin/pages/new')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98] shadow-lg"
          style={{ background: ORANGE, boxShadow: `0 8px 20px -8px ${ORANGE}` }}
        >
          <Plus className="h-4 w-4" />
          New page
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pages by title or slug..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-orange-500"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <EmptyState onClick={() => navigate('/dental-admin/pages/new')} hasPages={(data ?? []).length > 0} />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Page</th>
                <th className="px-4 py-3">Template</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50 group">
                  <td className="px-4 py-3">
                    <Link to={`/dental-admin/pages/${page.id}`} className="block">
                      <div className="font-semibold text-sm" style={{ color: DARK_NAVY }}>
                        {page.title}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">/{page.slug}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                      style={{ background: `${NAVY}10`, color: NAVY }}
                    >
                      {page.template?.name ?? 'Unknown'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={page.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === page.id ? null : page.id)}
                      className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-700 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {menuOpen === page.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
                        <div className="absolute right-2 top-full mt-1 z-20 bg-white rounded-lg border border-slate-200 shadow-lg overflow-hidden w-44">
                          <Link
                            to={`/dental-admin/pages/${page.id}`}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            Edit
                          </Link>
                          {page.status === 'published' && (
                            <a
                              href={`/${page.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50 transition-colors"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              View live
                            </a>
                          )}
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${page.title}"? This can't be undone.`)) {
                                remove.mutate(page.id);
                                setMenuOpen(null);
                              }
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
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

function StatusBadge({ status }: { status: DbPage['status'] }) {
  const config = {
    published: { bg: '#DCFCE7', color: '#15803D', label: 'Published', icon: Eye },
    draft:     { bg: '#FEF3C7', color: '#B45309', label: 'Draft',     icon: EyeOff },
    archived:  { bg: '#F1F5F9', color: '#64748B', label: 'Archived',  icon: EyeOff },
  }[status];
  const Icon = config.icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
      style={{ background: config.bg, color: config.color }}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function EmptyState({ onClick, hasPages }: { onClick: () => void; hasPages: boolean }) {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
      <div
        className="h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ background: `${ORANGE}15` }}
      >
        {hasPages ? <Search className="h-7 w-7" style={{ color: ORANGE }} /> : <FileText className="h-7 w-7" style={{ color: ORANGE }} />}
      </div>
      <h3 className="font-bold text-lg mb-1" style={{ color: DARK_NAVY }}>
        {hasPages ? 'No matches' : 'No pages yet'}
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
        {hasPages
          ? "No pages match your search. Try a different term."
          : "Add custom pages on top of your existing site. Pick a template, fill the fields, publish."}
      </p>
      {!hasPages && (
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style={{ background: ORANGE }}
        >
          <Sparkles className="h-4 w-4" />
          Create your first page
        </button>
      )}
    </div>
  );
}
