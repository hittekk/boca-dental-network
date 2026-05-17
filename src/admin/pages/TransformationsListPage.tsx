import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
  Images, Plus, Star, Eye, EyeOff, Search, Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { supabase, type DbTransformation } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function TransformationsListPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'transformations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transformations')
        .select('*')
        .order('sort_order')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as DbTransformation[];
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('transformations').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'transformations'] }),
  });

  const filtered = (data ?? []).filter(
    (t) =>
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.treatment_type ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
            Smile Transformations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Before/after photo gallery. These appear in the SmileTransformations section on the live site.
          </p>
        </div>
        <button
          onClick={() => navigate('/dental-admin/transformations/new')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98] shadow-lg"
          style={{ background: ORANGE, boxShadow: `0 8px 20px -8px ${ORANGE}` }}
        >
          <Plus className="h-4 w-4" />
          Add transformation
        </button>
      </div>

      <div className="mb-4 relative max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or treatment..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-orange-500"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <div
            className="h-16 w-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: `${ORANGE}15` }}
          >
            <Images className="h-7 w-7" style={{ color: ORANGE }} />
          </div>
          <h3 className="font-bold text-lg mb-1" style={{ color: DARK_NAVY }}>
            No transformations yet
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
            Add real before/after photos. Patient consent required. These will display on the live site's Smile Transformations section.
          </p>
          <button
            onClick={() => navigate('/dental-admin/transformations/new')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
            style={{ background: ORANGE }}
          >
            <Plus className="h-4 w-4" />
            Add your first transformation
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {/* Before / After paired images */}
              <Link to={`/dental-admin/transformations/${t.id}`} className="block relative">
                <div className="grid grid-cols-2 gap-px bg-slate-100">
                  <div className="relative aspect-[3/4] bg-slate-100">
                    <img src={t.before_image_url} alt="Before" className="w-full h-full object-cover" />
                    <span
                      className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}
                    >
                      Before
                    </span>
                  </div>
                  <div className="relative aspect-[3/4] bg-slate-100">
                    <img src={t.after_image_url} alt="After" className="w-full h-full object-cover" />
                    <span
                      className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{ background: ORANGE, color: 'white' }}
                    >
                      After
                    </span>
                  </div>
                </div>
                {t.is_featured && (
                  <div
                    className="absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: ORANGE }}
                  >
                    <Star className="h-3.5 w-3.5 text-white fill-white" />
                  </div>
                )}
              </Link>
              <div className="p-4">
                <Link to={`/dental-admin/transformations/${t.id}`} className="block">
                  <h3 className="font-bold text-sm mb-1" style={{ color: DARK_NAVY }}>
                    {t.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    {t.treatment_type && <span>{t.treatment_type}</span>}
                    {t.treatment_duration && <><span>·</span><span>{t.treatment_duration}</span></>}
                  </div>
                </Link>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs">
                    {t.is_published ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600">
                        <Eye className="h-3 w-3" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <EyeOff className="h-3 w-3" />
                        Hidden
                      </span>
                    )}
                    {!t.consent_obtained && (
                      <span className="text-[10px] font-bold text-amber-600 px-1.5 py-0.5 rounded bg-amber-50">
                        No consent
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Delete "${t.title}"? Image files stay in storage.`)) {
                        remove.mutate(t.id);
                      }
                    }}
                    className="text-slate-300 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
