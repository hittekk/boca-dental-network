import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import AdminLayout from './AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LocationsListPage from './pages/LocationsListPage';
import LocationEditPage from './pages/LocationEditPage';
import ServicesListPage from './pages/ServicesListPage';
import DoctorsListPage from './pages/DoctorsListPage';
import LeadsListPage from './pages/LeadsListPage';
import SettingsPage from './pages/SettingsPage';
import SetupRequiredPage from './pages/SetupRequiredPage';
import PagesListPage from './pages/PagesListPage';
import PageNewPage from './pages/PageNewPage';
import PageEditPage from './pages/PageEditPage';
import BlogListPage from './pages/BlogListPage';
import BlogEditPage from './pages/BlogEditPage';
import TransformationsListPage from './pages/TransformationsListPage';
import TransformationEditPage from './pages/TransformationEditPage';
import ServiceEditPage from './pages/ServiceEditPage';
import DoctorEditPage from './pages/DoctorEditPage';
import OfficeManagersPage from './pages/OfficeManagersPage';
import ServicePagesListPage from './pages/ServicePagesListPage';
import ServicePageEditPage from './pages/ServicePageEditPage';
import UsersPage from './pages/UsersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import DeploysPage from './pages/DeploysPage';
import ApplicationsPage from './pages/ApplicationsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: false },
  },
});

function ProtectedRoute({ session, children }: { session: Session | null; children: React.ReactNode }) {
  if (!session) return <Navigate to="/dental-admin/login" replace />;
  return <>{children}</>;
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) return <SetupRequiredPage />;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-10 w-10 rounded-full border-2 border-orange-500/30 border-t-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="login" element={session ? <Navigate to="/dental-admin" replace /> : <LoginPage />} />
        <Route
          path="*"
          element={
            <ProtectedRoute session={session}>
              <AdminLayout session={session!} />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="locations" element={<LocationsListPage />} />
          <Route path="locations/:id" element={<LocationEditPage />} />
          <Route path="services" element={<ServicesListPage />} />
          <Route path="services/:id" element={<ServiceEditPage />} />
          <Route path="service-pages" element={<ServicePagesListPage />} />
          <Route path="service-pages/new" element={<ServicePageEditPage isNew />} />
          <Route path="service-pages/:slug" element={<ServicePageEditPage />} />
          <Route path="doctors" element={<DoctorsListPage />} />
          <Route path="doctors/:id" element={<DoctorEditPage />} />
          <Route path="office-managers" element={<OfficeManagersPage />} />
          <Route path="leads" element={<LeadsListPage />} />
          <Route path="pages" element={<PagesListPage />} />
          <Route path="pages/new" element={<PageNewPage />} />
          <Route path="pages/:id" element={<PageEditPage />} />
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/new" element={<BlogEditPage isNew />} />
          <Route path="blog/:id" element={<BlogEditPage />} />
          <Route path="transformations" element={<TransformationsListPage />} />
          <Route path="transformations/:id" element={<TransformationEditPage />} />
          <Route path="team" element={<UsersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="deploys" element={<DeploysPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
