import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Globe, Phone, AtSign, Save, Loader2, BarChart3, Shield, ExternalLink, Check, Info,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

type BrandSettings = {
  name?: string;
  tagline?: string;
  phone?: string;
  domain?: string;
  email?: string;
};

type AnalyticsSettings = {
  ga4_measurement_id?: string;
  gtm_container_id?: string;
  google_ads_conversion_id?: string;
  google_ads_conversion_label?: string;
  meta_pixel_id?: string;
  looker_studio_embed_url?: string;
  track_phone_clicks?: boolean;
  track_form_submissions?: boolean;
  track_cta_clicks?: boolean;
};

export default function SettingsPage() {
  const qc = useQueryClient();
  const [brand, setBrand] = useState<BrandSettings>({});
  const [analytics, setAnalytics] = useState<AnalyticsSettings>({});
  const [saved, setSaved] = useState<string | null>(null);

  const settings = useQuery({
    queryKey: ['admin', 'all-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('key, value');
      if (error) throw error;
      return Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
    },
  });

  useEffect(() => {
    if (settings.data) {
      setBrand((settings.data.brand as BrandSettings) ?? {});
      setAnalytics((settings.data.analytics as AnalyticsSettings) ?? {});
    }
  }, [settings.data]);

  const saveBrand = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('site_settings').upsert({ key: 'brand', value: brand });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'all-settings'] });
      setSaved('brand');
      setTimeout(() => setSaved(null), 2000);
    },
  });

  const saveAnalytics = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('site_settings').upsert({ key: 'analytics', value: analytics });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'all-settings'] });
      qc.invalidateQueries({ queryKey: ['admin', 'analytics-settings'] });
      setSaved('analytics');
      setTimeout(() => setSaved(null), 2000);
    },
  });

  if (settings.isLoading) {
    return <div className="p-8 text-slate-400 text-sm">Loading settings...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: DARK_NAVY }}>
          Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Brand info and tracking. Everything saves to Supabase and the live site picks it up after the next rebuild.
        </p>
      </div>

      <div className="space-y-6">
        {/* Brand */}
        <Card
          title="Brand"
          icon={Globe}
          saved={saved === 'brand'}
          onSave={() => saveBrand.mutate()}
          saving={saveBrand.isPending}
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Site name">
              <Input value={brand.name ?? ''} onChange={(v) => setBrand({ ...brand, name: v })} placeholder="Boca Dental and Braces" />
            </Field>
            <Field label="Tagline">
              <Input value={brand.tagline ?? ''} onChange={(v) => setBrand({ ...brand, tagline: v })} placeholder="Knocking Out the Competition" />
            </Field>
            <Field label="Main phone" icon={Phone}>
              <Input value={brand.phone ?? ''} onChange={(v) => setBrand({ ...brand, phone: v })} placeholder="(702) 456-0005" />
            </Field>
            <Field label="Email" icon={AtSign}>
              <Input value={brand.email ?? ''} onChange={(v) => setBrand({ ...brand, email: v })} placeholder="hello@bocadentalandbraces.com" />
            </Field>
            <Field label="Domain" className="col-span-2">
              <Input value={brand.domain ?? ''} onChange={(v) => setBrand({ ...brand, domain: v })} placeholder="bocadentalandbraces.com" />
            </Field>
          </div>
        </Card>

        {/* Analytics & Tracking */}
        <Card
          title="Tracking & Analytics"
          icon={BarChart3}
          saved={saved === 'analytics'}
          onSave={() => saveAnalytics.mutate()}
          saving={saveAnalytics.isPending}
        >
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-5 flex items-start gap-2.5">
            <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <span className="font-bold">Plug-and-play.</span> Paste your IDs below, hit Save, then rebuild the site. All tracking scripts inject automatically — no code changes needed.
            </div>
          </div>

          <div className="space-y-5">
            <TrackerBlock
              label="Google Analytics 4 (GA4)"
              description="Measurement ID. Page views and conversions fire automatically."
              status={!!analytics.ga4_measurement_id}
              externalLink={analytics.ga4_measurement_id ? `https://analytics.google.com/analytics/web/#/p${analytics.ga4_measurement_id.replace('G-', '')}` : null}
              externalLabel="Open GA4"
            >
              <Input
                value={analytics.ga4_measurement_id ?? ''}
                onChange={(v) => setAnalytics({ ...analytics, ga4_measurement_id: v })}
                placeholder="G-XXXXXXXXXX"
                mono
              />
            </TrackerBlock>

            <TrackerBlock
              label="Google Tag Manager (GTM)"
              description="Container ID. Manage tags + triggers in the GTM UI."
              status={!!analytics.gtm_container_id}
              externalLink={analytics.gtm_container_id ? 'https://tagmanager.google.com' : null}
              externalLabel="Open GTM"
            >
              <Input
                value={analytics.gtm_container_id ?? ''}
                onChange={(v) => setAnalytics({ ...analytics, gtm_container_id: v })}
                placeholder="GTM-XXXXXXX"
                mono
              />
            </TrackerBlock>

            <TrackerBlock
              label="Google Ads conversion"
              description="Conversion ID + label. Form submissions fire as conversions."
              status={!!analytics.google_ads_conversion_id}
              externalLink={null}
            >
              <div className="grid grid-cols-2 gap-3">
                <Input
                  value={analytics.google_ads_conversion_id ?? ''}
                  onChange={(v) => setAnalytics({ ...analytics, google_ads_conversion_id: v })}
                  placeholder="AW-XXXXXXXXX"
                  mono
                />
                <Input
                  value={analytics.google_ads_conversion_label ?? ''}
                  onChange={(v) => setAnalytics({ ...analytics, google_ads_conversion_label: v })}
                  placeholder="conversion_label"
                  mono
                />
              </div>
            </TrackerBlock>

            <TrackerBlock
              label="Meta Pixel (Facebook + Instagram)"
              description="Pixel ID. PageView + Lead events fire automatically."
              status={!!analytics.meta_pixel_id}
              externalLink={analytics.meta_pixel_id ? 'https://business.facebook.com/events_manager2' : null}
              externalLabel="Open Events Manager"
            >
              <Input
                value={analytics.meta_pixel_id ?? ''}
                onChange={(v) => setAnalytics({ ...analytics, meta_pixel_id: v })}
                placeholder="1234567890123456"
                mono
              />
            </TrackerBlock>

            <TrackerBlock
              label="Looker Studio dashboard embed"
              description="Optional. Paste an embed URL to view a Looker Studio dashboard inside the admin Analytics page."
              status={!!analytics.looker_studio_embed_url}
              externalLink={null}
            >
              <Input
                value={analytics.looker_studio_embed_url ?? ''}
                onChange={(v) => setAnalytics({ ...analytics, looker_studio_embed_url: v })}
                placeholder="https://lookerstudio.google.com/embed/reporting/..."
                mono
              />
            </TrackerBlock>

            {/* Event toggles */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-[11px] font-bold mb-3 text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="h-3 w-3" />
                What to track
              </div>
              <div className="space-y-2">
                <Toggle
                  label="Track form submissions as conversions"
                  checked={analytics.track_form_submissions !== false}
                  onChange={(v) => setAnalytics({ ...analytics, track_form_submissions: v })}
                />
                <Toggle
                  label="Track phone-number clicks (tel: links)"
                  checked={analytics.track_phone_clicks !== false}
                  onChange={(v) => setAnalytics({ ...analytics, track_phone_clicks: v })}
                />
                <Toggle
                  label="Track CTA button clicks (elements with data-track)"
                  checked={analytics.track_cta_clicks !== false}
                  onChange={(v) => setAnalytics({ ...analytics, track_cta_clicks: v })}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function Card({
  title, icon: Icon, saved, onSave, saving, children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  saved: boolean;
  onSave: () => void;
  saving: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <h2 className="font-bold text-base flex items-center gap-2.5" style={{ color: DARK_NAVY }}>
          <Icon className="h-5 w-5" style={{ color: NAVY }} />
          {title}
        </h2>
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          )}
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white disabled:opacity-50 active:scale-[0.98] transition-all"
            style={{ background: ORANGE, boxShadow: `0 6px 16px -8px ${ORANGE}` }}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, icon: Icon, children, className = '' }: { label: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[11px] font-bold mb-1.5 text-slate-600 uppercase tracking-wider flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, mono }: { value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-3.5 py-2.5 rounded-lg border-2 border-slate-200 text-sm focus:outline-none focus:border-orange-500 transition-colors ${mono ? 'font-mono text-xs' : ''}`}
    />
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 rounded accent-orange-500" />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

function TrackerBlock({
  label, description, status, externalLink, externalLabel = 'Open', children,
}: {
  label: string;
  description: string;
  status: boolean;
  externalLink: string | null;
  externalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-slate-200 rounded-xl p-4">
      <div className="flex items-start justify-between mb-2.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-sm" style={{ color: DARK_NAVY }}>{label}</h3>
            <span
              className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
              style={{
                background: status ? '#DCFCE7' : '#F1F5F9',
                color: status ? '#15803D' : '#94A3B8',
              }}
            >
              {status ? 'Active' : 'Off'}
            </span>
          </div>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-orange-600 transition-colors flex-shrink-0"
          >
            {externalLabel} <ExternalLink className="h-2.5 w-2.5" />
          </a>
        )}
      </div>
      {children}
    </div>
  );
}
