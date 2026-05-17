import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  MapPin, Sparkles, Users, Inbox, TrendingUp, ArrowUpRight, Activity, Plus,
  FileText, Images, Zap, Star, Phone, Calendar, ChevronRight, MessageSquare,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function DashboardPage() {
  const currentUser = useQuery({
    queryKey: ['admin', 'current-user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { firstName: 'there', email: '' };
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();
      const fullName = (profile?.full_name as string | undefined) || user.email?.split('@')[0] || 'there';
      // Capitalize first character (handles "robert" from email local part)
      const firstName = fullName.split(/[\s.]+/)[0] || 'there';
      const cleaned = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      return { firstName: cleaned, email: user.email ?? '' };
    },
  });

  const stats = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const [loc, svc, doc, lead, page, xform, review] = await Promise.all([
        supabase.from('locations').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('doctors').select('id', { count: 'exact', head: true }),
        supabase.from('leads').select('id', { count: 'exact', head: true }),
        supabase.from('pages').select('id', { count: 'exact', head: true }),
        supabase.from('transformations').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
      ]);
      return {
        locations: loc.count ?? 0,
        services: svc.count ?? 0,
        doctors: doc.count ?? 0,
        leads: lead.count ?? 0,
        pages: page.count ?? 0,
        transformations: xform.count ?? 0,
        reviews: review.count ?? 0,
      };
    },
  });

  const leadsThisWeek = useQuery({
    queryKey: ['admin', 'leads-this-week'],
    queryFn: async () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo);
      return count ?? 0;
    },
  });

  const topRated = useQuery({
    queryKey: ['admin', 'top-locations'],
    queryFn: async () => {
      const { data } = await supabase
        .from('locations')
        .select('id, label, neighborhood, rating, review_count')
        .order('rating', { ascending: false })
        .order('review_count', { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });

  const recentLeads = useQuery({
    queryKey: ['admin', 'recent-leads'],
    queryFn: async () => {
      const { data } = await supabase
        .from('leads')
        .select('id, full_name, phone, service_interest, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  const greeting = getGreeting();

  return (
    <div className="min-h-full" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, white 400px)' }}>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Premium hero band */}
        <div
          className="relative rounded-3xl p-8 mb-8 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${DARK_NAVY} 0%, ${NAVY} 100%)`,
          }}
        >
          {/* Ambient orbs */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30 blur-3xl"
            style={{ background: ORANGE }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ background: '#3B82F6' }}
          />

          <div className="relative flex items-start justify-between">
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}
              >
                <Activity className="h-3 w-3" style={{ color: ORANGE }} />
                Live · Boca Dental Network
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                {greeting}, {currentUser.data?.firstName ?? 'there'}.
              </h1>
              <p className="text-white/60 max-w-xl text-base">
                Your network is healthy. {leadsThisWeek.data ?? 0} new patient leads this week across {stats.data?.locations ?? 0} locations.
              </p>
            </div>

            {/* Big metric */}
            <div className="text-right">
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">
                Total leads · all time
              </div>
              <div className="text-5xl font-extrabold text-white tabular-nums">
                {stats.data?.leads ?? '—'}
              </div>
              {leadsThisWeek.data !== undefined && leadsThisWeek.data > 0 && (
                <div className="flex items-center justify-end gap-1 mt-2 text-xs font-bold" style={{ color: ORANGE }}>
                  <TrendingUp className="h-3 w-3" />
                  +{leadsThisWeek.data} this week
                </div>
              )}
            </div>
          </div>

          {/* Quick stats strip */}
          <div className="relative grid grid-cols-4 gap-3 mt-8">
            <MiniStat label="Locations" value={stats.data?.locations} icon={MapPin} accent={ORANGE} />
            <MiniStat label="Services" value={stats.data?.services} icon={Sparkles} accent="#3B82F6" />
            <MiniStat label="Dentists" value={stats.data?.doctors} icon={Users} accent="#10B981" />
            <MiniStat label="Reviews" value={stats.data?.reviews} icon={Star} accent="#F59E0B" />
          </div>
        </div>

        {/* Quick actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: NAVY }}>
              Quick actions
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickAction to="/dental-admin/pages/new" icon={FileText} label="New page" sublabel="Pick a template" accent={ORANGE} />
            <QuickAction to="/dental-admin/transformations/new" icon={Images} label="Add transformation" sublabel="Before & after photos" accent={NAVY} />
            <QuickAction to="/dental-admin/leads" icon={Inbox} label="Review leads" sublabel="Patient inquiries" accent="#10B981" />
            <QuickAction to="/dental-admin/locations" icon={MapPin} label="Edit locations" sublabel="Update clinic info" accent="#F59E0B" />
          </div>
        </div>

        {/* Two-column: Recent leads + Top performing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent leads */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: DARK_NAVY }}>
                  <MessageSquare className="h-5 w-5" style={{ color: ORANGE }} />
                  Recent leads
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Newest patient inquiries from your forms</p>
              </div>
              <Link
                to="/dental-admin/leads"
                className="text-xs font-bold flex items-center gap-1 hover:underline px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: ORANGE }}
              >
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {recentLeads.isLoading ? (
              <div className="p-12 text-center text-sm text-slate-400">Loading...</div>
            ) : !recentLeads.data?.length ? (
              <div className="p-12 text-center">
                <div
                  className="h-12 w-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: '#F1F5F9' }}
                >
                  <Inbox className="h-5 w-5 text-slate-400" />
                </div>
                <p className="text-sm font-semibold text-slate-700">No leads yet</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  Patient form submissions will land here in real time.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentLeads.data.map((lead) => (
                  <div
                    key={lead.id}
                    className="px-6 py-4 hover:bg-slate-50 transition-colors flex items-center gap-4"
                  >
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm"
                      style={{ background: `${ORANGE}15`, color: ORANGE }}
                    >
                      {lead.full_name[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{lead.full_name}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </span>
                        {lead.service_interest && (
                          <>
                            <span>·</span>
                            <span>{lead.service_interest}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded"
                      style={{
                        background: lead.status === 'new' ? '#FFF1EA' : '#F1F5F9',
                        color: lead.status === 'new' ? ORANGE : '#64748B',
                      }}
                    >
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top performing locations */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100">
              <h2 className="font-bold text-lg flex items-center gap-2" style={{ color: DARK_NAVY }}>
                <Star className="h-5 w-5" style={{ color: '#F59E0B' }} />
                Top rated
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Highest patient ratings</p>
            </div>
            {topRated.isLoading ? (
              <div className="p-8 text-center text-sm text-slate-400">Loading...</div>
            ) : (
              <div className="p-3 space-y-1">
                {topRated.data?.map((loc, i) => (
                  <Link
                    key={loc.id}
                    to={`/dental-admin/locations/${loc.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center font-extrabold text-xs flex-shrink-0"
                      style={{
                        background: i === 0 ? ORANGE : `${NAVY}10`,
                        color: i === 0 ? 'white' : NAVY,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate" style={{ color: DARK_NAVY }}>
                        {loc.label}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{loc.neighborhood}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-xs font-bold" style={{ color: '#F59E0B' }}>
                        <Star className="h-3 w-3 fill-current" />
                        {loc.rating?.toFixed(1)}
                      </div>
                      <div className="text-[10px] text-slate-400">{loc.review_count} reviews</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label, value, icon: Icon, accent,
}: { label: string; value: number | undefined; icon: React.ComponentType<{ className?: string }>; accent: string }) {
  return (
    <div
      className="rounded-xl p-3 backdrop-blur-md"
      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="h-6 w-6 rounded-md flex items-center justify-center"
          style={{ background: `${accent}30`, color: accent }}
        >
          <Icon className="h-3 w-3" />
        </div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">{label}</div>
      </div>
      <div className="text-2xl font-extrabold text-white tabular-nums">{value ?? '—'}</div>
    </div>
  );
}

function QuickAction({
  to, icon: Icon, label, sublabel, accent,
}: { to: string; icon: React.ComponentType<{ className?: string }>; label: string; sublabel: string; accent: string }) {
  return (
    <Link
      to={to}
      className="group bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:-translate-y-0.5 hover:border-orange-200 transition-all flex items-start gap-3"
    >
      <div
        className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
        style={{ background: `${accent}15`, color: accent }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm flex items-center gap-1" style={{ color: DARK_NAVY }}>
          {label}
          <ArrowUpRight className="h-3 w-3 text-slate-300 group-hover:text-orange-500 transition-colors" />
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5 truncate">{sublabel}</div>
      </div>
    </Link>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
