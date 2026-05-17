import { AlertCircle } from 'lucide-react';

const ORANGE = '#F3672A';
const DARK_NAVY = '#001D3D';

export default function SetupRequiredPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: DARK_NAVY }}
    >
      <div className="bg-white rounded-2xl p-8 max-w-lg shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center"
            style={{ background: `${ORANGE}15`, color: ORANGE }}
          >
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg" style={{ color: DARK_NAVY }}>
              Supabase not configured
            </h1>
            <p className="text-xs text-slate-500">Add your Supabase credentials to .env</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          The Boca admin needs a Supabase URL + anon key to load. Add these to your <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">.env</code> file:
        </p>

        <div className="bg-slate-900 text-slate-300 p-4 rounded-lg font-mono text-xs space-y-1 mb-4">
          <div><span style={{ color: ORANGE }}>VITE_SUPABASE_URL</span>=https://[project].supabase.co</div>
          <div><span style={{ color: ORANGE }}>VITE_SUPABASE_ANON_KEY</span>=eyJhbGc...</div>
        </div>

        <p className="text-xs text-slate-500">
          Then restart the dev server. The admin will boot automatically.
        </p>
      </div>
    </div>
  );
}
