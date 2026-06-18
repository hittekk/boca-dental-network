import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Plus, Eye, EyeOff, Search, ExternalLink } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import PublishButton from '../components/PublishButton';
import { SERVICE_CATEGORIES, SERVICE_PAGES } from '../../data/serviceCatalog';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';

type DbRow = { slug: string; label: string; category_slug: string; is_published: boolean; updated_at: string };
type Entry = { slug: string; label: string; category_slug: string; hasDb: boolean; is_published: boolean };

export default function ServicePagesListPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const { data: dbRows, isLoading } = useQuery({
    queryKey: ['admin', 'service_pages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_pages')
        .select('slug, label, category_slug, is_published, updated_at');
      if (error) throw error;
      return (data ?? []) as DbRow[];
    },
  });

  const entries = useMemo<Entry[]>(() => {
    const map = new Map<string, Entry>();
    for (const p of SERVICE_PAGES) {
      map.set(p.slug, { slug: p.slug, label: p.label, category_slug: p.categorySlug, hasDb: false, is_published: true });
    }
    for (const r of dbRows ?? []) {
      map.set(r.slug, { slug: r.slug, label: r.label, category_slug: r.category_slug, hasDb: true, is_published: r.is_published });
    }
    return Array.from(map.values());
  }, [dbRows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return entries;
    return entries.filter((e) => e.label.toLowerCase().includes(needle) || e.slug.includes(needle));
  }, [entries, q]);

  const grouped = useMemo(() => {
    return SERVICE_CATEGORIES.map((c) => ({
      cat: c,
      items: filtered.filter((e) => e.category_slug === c.slug).sort((a, b) => a.label.localeCompare(b.label)),
    })).filter((g) => g.items.length > 0);
  }, [filtered]);

  const dbCount = dbRows?.length ?? 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>Service Pages</h1>
          <p className="text-sm text-slate-500 mt-1">
            Treatment &amp; procedure pages (e.g. Dental Crowns, Root Canals). Click any page to edit its content. Pages
            marked <span className="font-semibold text-emerald-600">Custom</span> have edits saved here; the rest use the
            built-in default copy until you edit them.
          </p>
        </div>
        <button
          onClick={() => navigate('/dental-admin/service-pages/new')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white"
          style={{ background: ORANGE }}
        >
          <Plus className="h-4 w-4" />
          New service page
        </button>
      </div>

      <div className="mb-6">
        <PublishButton />
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search service pages…"
          className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-orange-400"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading…</div>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ cat, items }) => (
            <div key={cat.slug}>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: DARK_NAVY }}>{cat.label}</h2>
                <span className="text-xs text-slate-400">{items.length}</span>
                <a
                  href={`https://bocadentalandbraces.com/${cat.slug}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-slate-500"
                  title="View category on site"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((e) => (
                  <Link
                    key={e.slug}
                    to={`/dental-admin/service-pages/${e.slug}`}
                    className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:-translate-y-0.5 hover:border-orange-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <FileText className="h-4 w-4 text-slate-300 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <div className="font-bold text-sm truncate" style={{ color: DARK_NAVY }}>{e.label}</div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">/{e.slug}</div>
                        </div>
                      </div>
                      {e.hasDb ? (
                        e.is_published ? (
                          <span title="Custom · published" className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 flex-shrink-0">
                            <Eye className="h-3 w-3" />
                          </span>
                        ) : (
                          <span title="Custom · hidden" className="flex items-center gap-1 text-[10px] font-bold text-slate-400 flex-shrink-0">
                            <EyeOff className="h-3 w-3" />
                          </span>
                        )
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded flex-shrink-0">Default</span>
                      )}
                    </div>
                    {e.hasDb && (
                      <div className="mt-2 text-[9px] font-bold uppercase tracking-wider" style={{ color: ORANGE }}>Custom</div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] text-slate-400 mt-8">{dbCount} page(s) customized in the backend · {SERVICE_PAGES.length} total service pages.</p>
    </div>
  );
}
