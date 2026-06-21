import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import {
  LayoutDashboard,
  MapPin,
  Sparkles,
  Users,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  FileText,
  Newspaper,
  FileStack,
  UserCog,
  Images,
  BarChart3,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function AdminLayout({ session }: { session: Session }) {
  const navigate = useNavigate();
  const email = session.user?.email ?? '';

  const { data: counts } = useQuery({
    queryKey: ['admin', 'nav-counts'],
    queryFn: async () => {
      const [loc, svc, doc, om] = await Promise.all([
        supabase.from('locations').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('doctors').select('id', { count: 'exact', head: true }),
        supabase.from('office_managers').select('id', { count: 'exact', head: true }),
      ]);
      return {
        locations: loc.count ?? 0,
        services: svc.count ?? 0,
        doctors: doc.count ?? 0,
        office_managers: om.count ?? 0,
      };
    },
  });

  // Market marker (site_settings.key='market') — confirms which backend this admin
  // is connected to so VEGAS and Reno can never be edited by mistake.
  const { data: market } = useQuery({
    queryKey: ['admin', 'market'],
    queryFn: async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'market')
        .maybeSingle();
      return (data?.value as { code?: string; label?: string } | undefined) ?? null;
    },
    staleTime: Infinity,
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate('/dental-admin/login');
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col text-white"
        style={{ background: DARK_NAVY }}
      >
        {/* Brand */}
        <div className="h-20 px-5 flex items-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/boca-logo.png"
              alt="Boca Dental and Braces"
              style={{ height: 36, width: 'auto', display: 'block' }}
            />
            <div
              style={{
                paddingLeft: 12,
                borderLeft: '1px solid rgba(255,255,255,0.18)',
                lineHeight: 1,
              }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/90 leading-none">
                Admin
              </div>
              {market?.label && (
                <span
                  className="inline-block mt-1.5 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded leading-none"
                  style={{ background: ORANGE, color: 'white' }}
                  title={`Connected to the ${market.label} backend`}
                >
                  {market.label}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <NavItem to="/dental-admin" icon={LayoutDashboard} label="Dashboard" end />
          <SectionLabel>Content</SectionLabel>
          <NavItem to="/dental-admin/pages" icon={FileText} label="Pages" />
          <NavItem to="/dental-admin/blog" icon={Newspaper} label="Blog" />
          <NavItem to="/dental-admin/locations" icon={MapPin} label="Locations" badge={counts?.locations} />
          <NavItem to="/dental-admin/services" icon={Sparkles} label="Services" badge={counts?.services} />
          <NavItem to="/dental-admin/service-pages" icon={FileStack} label="Service Pages" />
          <NavItem to="/dental-admin/doctors" icon={Users} label="Dentists" badge={counts?.doctors} />
          <NavItem to="/dental-admin/office-managers" icon={UserCog} label="Office Managers" badge={counts?.office_managers} />
          <NavItem to="/dental-admin/transformations" icon={Images} label="Transformations" />
          <SectionLabel>Engagement</SectionLabel>
          <NavItem to="/dental-admin/leads" icon={Inbox} label="Leads" />
          <NavItem to="/dental-admin/analytics" icon={BarChart3} label="Analytics" />
          <SectionLabel>Site</SectionLabel>
          <NavItem to="/dental-admin/team" icon={Users} label="Team" />
          <NavItem to="/dental-admin/settings" icon={Settings} label="Settings" />
        </nav>

        {/* Live site link */}
        <div className="px-3 pb-2">
          <a
            href="https://boca.datastacklogic.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View live site
          </a>
        </div>

        {/* User */}
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 py-2">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: ORANGE, color: 'white' }}
            >
              {email[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate text-white">{email}</div>
              <div className="text-[10px] text-white/50">Signed in</div>
            </div>
            <button
              onClick={signOut}
              className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NavItem({
  to,
  icon: Icon,
  label,
  end,
  badge,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  end?: boolean;
  badge?: string | number;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          isActive
            ? 'bg-white/10 text-white'
            : 'text-white/70 hover:text-white hover:bg-white/5'
        }`
      }
      style={({ isActive }) =>
        isActive
          ? { boxShadow: `inset 3px 0 0 ${ORANGE}` }
          : undefined
      }
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1">{label}</span>
      {badge != null && (
        <span
          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
          style={{ background: NAVY, color: 'white' }}
        >
          {badge}
        </span>
      )}
    </NavLink>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pt-4 pb-1.5 text-[10px] uppercase tracking-wider text-white/40 font-bold">
      {children}
    </div>
  );
}
