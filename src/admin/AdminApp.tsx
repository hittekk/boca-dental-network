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
import TransformationsListPage from './pages/TransformationsListPage';
import TransformationEditPage from './pages/TransformationEditPage';

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
          <Route path="doctors" element={<DoctorsListPage />} />
          <Route path="leads" element={<LeadsListPage />} />
          <Route path="pages" element={<PagesListPage />} />
          <Route path="pages/new" element={<PageNewPage />} />
          <Route path="pages/:id" element={<PageEditPage />} />
          <Route path="transformations" element={<TransformationsListPage />} />
          <Route path="transformations/:id" element={<TransformationEditPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}
