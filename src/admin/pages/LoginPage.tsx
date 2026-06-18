import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    navigate('/dental-admin');
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: `linear-gradient(135deg, ${DARK_NAVY} 0%, ${NAVY} 100%)`,
      }}
    >
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/boca-logo.png"
            alt="Boca Dental and Braces"
            style={{ height: 56, width: 'auto', display: 'block' }}
          />
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-2xl p-8 shadow-2xl"
          style={{ boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5)' }}
        >
          <h1 className="text-2xl font-bold mb-1" style={{ color: DARK_NAVY }}>
            Sign in
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Welcome back. Manage your locations, services, and leads.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-orange-500 transition-colors text-slate-900"
                required
                autoFocus
                placeholder="frankie@bocadentalandbraces.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-700 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-orange-500 transition-colors text-slate-900"
                required
                minLength={8}
              />
            </div>

            {error && (
              <div className="text-sm px-3 py-2 rounded-lg bg-red-50 text-red-700 border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50"
              style={{ background: ORANGE }}
            >
              {loading ? 'Working...' : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign in
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Access is provisioned by your administrator.
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-white/40">
          Hand-crafted by DataStackLogic
        </div>
      </div>
    </div>
  );
}
