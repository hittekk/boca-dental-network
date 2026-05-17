import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Star, Plus, Search, Edit3, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { supabase, type DbLocation } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function LocationsListPage() {
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data ?? []) as DbLocation[];
    },
  });

  const filtered = (data ?? []).filter(
    (l) =>
      !search ||
      l.label.toLowerCase().includes(search.toLowerCase()) ||
      l.neighborhood?.toLowerCase().includes(search.toLowerCase()) ||
      l.zip.includes(search)
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
            Locations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            All Boca Dental clinics across Las Vegas. Edit any location to update content on the live site.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98]"
          style={{ background: ORANGE }}
        >
          <Plus className="h-4 w-4" />
          New location
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, neighborhood, or ZIP..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* List */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
          <MapPin className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No locations match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((loc) => (
            <LocationCard key={loc.id} location={loc} />
          ))}
        </div>
      )}
    </div>
  );
}

function LocationCard({ location }: { location: DbLocation }) {
  return (
    <Link
      to={`/dental-admin/locations/${location.id}`}
      className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-orange-300 hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${ORANGE}15`, color: ORANGE }}
          >
            <MapPin className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-base truncate" style={{ color: DARK_NAVY }}>
              {location.label}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {location.neighborhood} · {location.zip}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {location.is_kids_clinic && (
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{ background: NAVY, color: 'white' }}
            >
              Kids
            </span>
          )}
          {location.is_published ? (
            <Eye className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <EyeOff className="h-3.5 w-3.5 text-slate-300" />
          )}
        </div>
      </div>

      <div className="text-xs text-slate-600 mb-3 leading-relaxed">{location.address}</div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {location.phone}
          </span>
          {location.rating && (
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
              {location.rating} ({location.review_count})
            </span>
          )}
        </div>
        <Edit3 className="h-3.5 w-3.5 text-slate-300 group-hover:text-orange-500 transition-colors" />
      </div>
    </Link>
  );
}
