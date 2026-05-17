import { useQuery } from '@tanstack/react-query';
import { Users, Plus, Eye, EyeOff } from 'lucide-react';
import { supabase, type DbDoctor } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function DoctorsListPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'doctors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return (data ?? []) as DbDoctor[];
    },
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
            Dentists
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            All Boca dentists. Each gets a bio page on the site.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98]"
          style={{ background: ORANGE }}
        >
          <Plus className="h-4 w-4" />
          New dentist
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-start gap-4"
            >
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                style={{ background: `${ORANGE}15`, color: ORANGE }}
              >
                {doc.name.split(' ').slice(-2)[0]?.[0] ?? doc.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-sm" style={{ color: DARK_NAVY }}>
                    {doc.name}
                  </h3>
                  {doc.is_published ? (
                    <Eye className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{doc.title}</p>
                {doc.short_bio && (
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">{doc.short_bio}</p>
                )}
                <div className="text-[10px] text-slate-400 mt-2 font-mono">/{doc.slug}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
