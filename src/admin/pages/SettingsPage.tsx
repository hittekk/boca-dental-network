import { useQuery } from '@tanstack/react-query';
import { Globe, Phone, AtSign } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function SettingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((row: { key: string; value: unknown }) => [row.key, row.value]));
    },
  });

  const brand = (data?.brand as { name?: string; tagline?: string; phone?: string; domain?: string; email?: string }) ?? {};

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2" style={{ color: DARK_NAVY }}>
        Site settings
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Brand info, contact details, and global site configuration.
      </p>

      {isLoading ? (
        <div className="text-center py-12 text-slate-400">Loading...</div>
      ) : (
        <div className="space-y-4">
          <Card title="Brand">
            <Row icon={Globe} label="Site name" value={brand.name ?? '—'} />
            <Row icon={Globe} label="Tagline" value={brand.tagline ?? '—'} />
            <Row icon={Phone} label="Main phone" value={brand.phone ?? '—'} />
            <Row icon={Globe} label="Domain" value={brand.domain ?? '—'} />
            <Row icon={AtSign} label="Email" value={brand.email ?? '—'} />
          </Card>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-6">
        Settings editor coming next. For now, view-only.
      </p>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="font-bold text-sm uppercase tracking-wider mb-4" style={{ color: NAVY }}>
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-slate-100 last:border-b-0">
      <Icon className="h-4 w-4 text-slate-400" />
      <span className="text-xs text-slate-500 w-32">{label}</span>
      <span className="text-sm font-medium" style={{ color: DARK_NAVY }}>{value}</span>
    </div>
  );
}
