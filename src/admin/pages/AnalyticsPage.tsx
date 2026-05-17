import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  TrendingUp, Eye, MessageSquare, Phone, MousePointer, Users, ExternalLink, BarChart3, Activity,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

type Range = '24h' | '7d' | '30d' | '90d';

const RANGE_LABELS: Record<Range, string> = {
  '24h': 'Last 24 hours',
  '7d':  'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

function rangeToHours(range: Range): number {
  return { '24h': 24, '7d': 24 * 7, '30d': 24 * 30, '90d': 24 * 90 }[range];
}

type EventRow = {
  event_type: string;
  page_path: string | null;
  page_title: string | null;
  session_id: string | null;
  utm_source: string | null;
  referrer: string | null;
  created_at: string;
};

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>('30d');

  // Analytics config to know if external trackers are set up + Looker Studio URL
  const settingsQ = useQuery({
    queryKey: ['admin', 'analytics-settings'],
    queryFn: async () => {
      const { data } = await supabase.from('site_settings').select('value').eq('key', 'analytics').maybeSingle();
      return (data?.value ?? {}) as {
        ga4_measurement_id?: string;
        gtm_container_id?: string;
        meta_pixel_id?: string;
        google_ads_conversion_id?: string;
        looker_studio_embed_url?: string;
      };
    },
  });

  const since = new Date(Date.now() - rangeToHours(range) * 60 * 60 * 1000).toISOString();

  const eventsQ = useQuery({
    queryKey: ['admin', 'analytics-events', range],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('event_type, page_path, page_title, session_id, utm_source, referrer, created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(5000);
      if (error) throw error;
      return (data ?? []) as EventRow[];
    },
  });

  const events = eventsQ.data ?? [];

  // Compute aggregates
  const pageViews = events.filter((e) => e.event_type === 'page_view');
  const formSubmits = events.filter((e) => e.event_type === 'form_submit');
  const phoneClicks = events.filter((e) => e.event_type === 'phone_click');
  const sessions = new Set(events.map((e) => e.session_id).filter(Boolean));

  const topPages = topByKey(pageViews, (e) => e.page_path ?? '/').slice(0, 8);
  const topSources = topByKey(
    pageViews,
    (e) => e.utm_source || prettyReferrer(e.referrer) || 'Direct',
  ).slice(0, 6);

  // Time series buckets — last N days (or hours for 24h)
  const buckets = bucketByTime(pageViews, range);

  const ga = settingsQ.data ?? {};
  const ga4Url = ga.ga4_measurement_id
    ? `https://analytics.google.com/analytics/web/#/p${ga.ga4_measurement_id.replace('G-', '')}/reports/dashboard`
    : null;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
            Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            First-party visitor data from your site. Always on, no Google account required.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {ga4Url && (
            <a
              href={ga4Url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-600 border-2 border-slate-200 hover:border-slate-300 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open in Google Analytics
            </a>
          )}
          <div className="flex bg-white rounded-lg border border-slate-200 p-0.5">
            {(['24h', '7d', '30d', '90d'] as Range[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                  range === r ? 'text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
                style={range === r ? { background: ORANGE } : undefined}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tracker status pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TrackerPill label="First-party" active />
        <TrackerPill label="GA4" active={!!ga.ga4_measurement_id} />
        <TrackerPill label="GTM" active={!!ga.gtm_container_id} />
        <TrackerPill label="Meta Pixel" active={!!ga.meta_pixel_id} />
        <TrackerPill label="Google Ads" active={!!ga.google_ads_conversion_id} />
      </div>

      {eventsQ.isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading...</div>
      ) : (
        <>
          {/* Headline stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatCard label="Page views" value={pageViews.length} icon={Eye} accent={ORANGE} sub={RANGE_LABELS[range]} />
            <StatCard label="Sessions" value={sessions.size} icon={Users} accent={NAVY} sub="Unique visitors" />
            <StatCard label="Form submits" value={formSubmits.length} icon={MessageSquare} accent="#10B981" sub="Conversions" />
            <StatCard label="Phone clicks" value={phoneClicks.length} icon={Phone} accent="#F59E0B" sub="Click-to-call" />
          </div>

          {/* Time series + Top pages side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: NAVY }}>
                <BarChart3 className="h-4 w-4" />
                Page views over time
              </h2>
              <TimeSeriesChart buckets={buckets} range={range} />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: NAVY }}>
                <Activity className="h-4 w-4" />
                Top pages
              </h2>
              <HorizontalBars items={topPages} accent={ORANGE} emptyLabel="No traffic yet" />
            </div>
          </div>

          {/* Traffic sources + Recent activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: NAVY }}>
                <TrendingUp className="h-4 w-4" />
                Traffic sources
              </h2>
              <HorizontalBars items={topSources} accent={NAVY} emptyLabel="No referrers yet" />
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: NAVY }}>
                <MousePointer className="h-4 w-4" />
                Recent activity
              </h2>
              <RecentActivity events={events.slice(0, 12)} />
            </div>
          </div>

          {/* Looker Studio embed */}
          {ga.looker_studio_embed_url && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
              <h2 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: NAVY }}>
                <ExternalLink className="h-4 w-4" />
                Google Analytics dashboard
              </h2>
              <iframe
                src={ga.looker_studio_embed_url}
                className="w-full rounded-lg border border-slate-200"
                style={{ height: 640 }}
                title="Looker Studio dashboard"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function StatCard({
  label, value, icon: Icon, accent, sub,
}: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; accent: string; sub: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}15`, color: accent }}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-3xl font-extrabold tabular-nums" style={{ color: DARK_NAVY }}>
        {value.toLocaleString()}
      </div>
      <div className="text-xs text-slate-500 font-semibold mt-1">{label}</div>
      <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
    </div>
  );
}

function TrackerPill({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${active ? '' : 'opacity-50'}`}
      style={{ background: active ? `${ORANGE}15` : '#F1F5F9', color: active ? ORANGE : '#94A3B8' }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: active ? ORANGE : '#CBD5E1' }} />
      {label} {active ? 'on' : 'off'}
    </span>
  );
}

function HorizontalBars({ items, accent, emptyLabel }: { items: { key: string; count: number }[]; accent: string; emptyLabel: string }) {
  if (items.length === 0) {
    return <div className="text-xs text-slate-400 py-6 text-center">{emptyLabel}</div>;
  }
  const max = Math.max(...items.map((i) => i.count));
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={item.key}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="truncate font-medium text-slate-700">{item.key}</span>
            <span className="font-bold tabular-nums ml-2" style={{ color: DARK_NAVY }}>{item.count}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ background: accent, width: `${(item.count / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TimeSeriesChart({ buckets, range }: { buckets: { label: string; count: number }[]; range: Range }) {
  if (buckets.length === 0 || buckets.every((b) => b.count === 0)) {
    return <div className="text-xs text-slate-400 py-12 text-center">No traffic in this range yet.</div>;
  }
  const max = Math.max(1, ...buckets.map((b) => b.count));
  return (
    <div className="flex items-end gap-1 h-48">
      {buckets.map((b) => (
        <div key={b.label} className="flex-1 flex flex-col items-center gap-1.5 group">
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t transition-all group-hover:opacity-80"
              style={{
                background: `linear-gradient(180deg, ${ORANGE} 0%, ${ORANGE}99 100%)`,
                height: `${(b.count / max) * 100}%`,
                minHeight: b.count > 0 ? 4 : 0,
              }}
              title={`${b.label}: ${b.count} views`}
            />
          </div>
          <div className="text-[8px] text-slate-400 font-mono" style={{ writingMode: range === '24h' ? 'horizontal-tb' : undefined }}>
            {b.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentActivity({ events }: { events: EventRow[] }) {
  if (events.length === 0) {
    return <div className="text-xs text-slate-400 py-6 text-center">No events recorded yet.</div>;
  }
  return (
    <div className="space-y-2 max-h-80 overflow-y-auto">
      {events.map((e, i) => (
        <div key={i} className="flex items-start gap-2.5 py-1.5 border-b border-slate-50 last:border-b-0">
          <div
            className="h-6 w-6 rounded-md flex items-center justify-center flex-shrink-0 text-[8px] font-bold uppercase tracking-wider"
            style={getEventStyle(e.event_type)}
          >
            {eventInitial(e.event_type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: DARK_NAVY }}>
              {prettyEventName(e.event_type)}
            </div>
            <div className="text-[10px] text-slate-500 truncate">{e.page_path ?? '—'}</div>
          </div>
          <div className="text-[10px] text-slate-400 flex-shrink-0">{relativeTime(e.created_at)}</div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function topByKey<T>(items: T[], keyFn: (item: T) => string): { key: string; count: number }[] {
  const map = new Map<string, number>();
  items.forEach((item) => {
    const k = keyFn(item);
    map.set(k, (map.get(k) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}

function bucketByTime(items: EventRow[], range: Range): { label: string; count: number }[] {
  const now = Date.now();
  const isHourly = range === '24h';
  const isWeekly = range === '7d';
  const buckets = isHourly ? 24 : isWeekly ? 7 : range === '30d' ? 30 : 12; // 90d → 12 weekly buckets
  const intervalMs = isHourly ? 60 * 60 * 1000 : isWeekly || range === '30d' ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

  const arr: { label: string; count: number; start: number }[] = [];
  for (let i = buckets - 1; i >= 0; i--) {
    const start = now - (i + 1) * intervalMs;
    const end = now - i * intervalMs;
    const d = new Date(end);
    const label = isHourly
      ? `${d.getHours()}h`
      : isWeekly || range === '30d'
        ? `${d.getMonth() + 1}/${d.getDate()}`
        : `W${Math.ceil((d.getMonth() * 4 + d.getDate() / 7))}`;
    arr.push({ label, count: 0, start });
  }

  items.forEach((it) => {
    const t = new Date(it.created_at).getTime();
    const bucket = arr.findIndex((b) => t >= b.start && t < b.start + intervalMs);
    if (bucket !== -1) arr[bucket].count++;
  });

  return arr.map(({ label, count }) => ({ label, count }));
}

function prettyReferrer(ref: string | null): string | null {
  if (!ref) return null;
  try {
    return new URL(ref).hostname.replace('www.', '');
  } catch {
    return null;
  }
}

function getEventStyle(type: string): React.CSSProperties {
  const map: Record<string, { bg: string; color: string }> = {
    page_view:           { bg: `${ORANGE}15`,    color: ORANGE },
    form_submit:         { bg: '#DCFCE7',        color: '#15803D' },
    phone_click:         { bg: '#FEF3C7',        color: '#B45309' },
    cta_click:           { bg: `${NAVY}15`,      color: NAVY },
    location_view:       { bg: '#DBEAFE',        color: '#0369A1' },
    service_view:        { bg: '#F3E8FF',        color: '#6B21A8' },
    transformation_view: { bg: '#FCE7F3',        color: '#9D174D' },
  };
  return map[type] ?? { bg: '#F1F5F9', color: '#64748B' };
}

function eventInitial(type: string): string {
  const map: Record<string, string> = {
    page_view: 'PV', form_submit: 'FS', phone_click: 'PC', cta_click: 'CT',
    location_view: 'LV', service_view: 'SV', transformation_view: 'TV',
  };
  return map[type] ?? type[0]?.toUpperCase() ?? '?';
}

function prettyEventName(type: string): string {
  return type.split('_').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' ');
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h`;
  const day = Math.floor(hr / 24);
  return `${day}d`;
}
