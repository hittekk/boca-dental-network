import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Plus, Eye, EyeOff } from 'lucide-react';
import { supabase, type DbService } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function ServicesListPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return (data ?? []) as DbService[];
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
            Services
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            All dental services. Each one becomes a category page on the site.
          </p>
        </div>
        <button
          onClick={() => navigate('/dental-admin/services/new')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98]"
          style={{ background: ORANGE }}
        >
          <Plus className="h-4 w-4" />
          New service
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((svc) => (
            <Link
              to={`/dental-admin/services/${svc.id}`}
              key={svc.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-0.5 hover:border-orange-300 transition-all block"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${NAVY}15`, color: NAVY }}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
                {svc.is_published ? (
                  <Eye className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <EyeOff className="h-3.5 w-3.5 text-slate-300" />
                )}
              </div>
              <h3 className="font-bold text-base mb-1" style={{ color: DARK_NAVY }}>
                {svc.label}
              </h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                {svc.short_description}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: '#F1F5F9', color: '#64748B' }}
                >
                  {svc.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">/{svc.slug}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
