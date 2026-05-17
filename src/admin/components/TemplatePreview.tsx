// Visual mockups for the page-creation template picker.
// Each preview renders a stylized, on-brand miniature of the template
// so the user can SEE what they're picking, not just read about it.

const ORANGE = '#F3672A';
const NAVY = '#162E7A';
const DARK_NAVY = '#001D3D';
const CREAM = '#FAF7F2';

type Props = { templateSlug: string };

export default function TemplatePreview({ templateSlug }: Props) {
  return (
    <div className="sticky top-8">
      {/* Browser frame */}
      <div className="rounded-xl overflow-hidden bg-white shadow-2xl border border-slate-200">
        {/* Browser chrome */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <div className="ml-3 flex-1 bg-white rounded h-5 px-2 flex items-center text-[9px] text-slate-400 font-mono">
            bocadentalandbraces.com/your-page
          </div>
        </div>

        {/* Page body */}
        <div className="aspect-[3/4] overflow-hidden">{renderPreview(templateSlug)}</div>
      </div>

      <p className="text-[10px] text-slate-400 mt-3 text-center">
        Layout preview. Real content goes in step 2.
      </p>
    </div>
  );
}

function renderPreview(slug: string) {
  switch (slug) {
    case 'standard':       return <StandardPreview />;
    case 'landing':        return <LandingPreview />;
    case 'legal':          return <LegalPreview />;
    case 'blog_post':      return <BlogPostPreview />;
    case 'thank_you':      return <ThankYouPreview />;
    default:               return <EmptyPreview />;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STANDARD — Hero + body + CTA
// ─────────────────────────────────────────────────────────────────────────────
function StandardPreview() {
  return (
    <div className="h-full flex flex-col bg-white text-slate-900">
      {/* Tiny header bar */}
      <Header />

      {/* Hero */}
      <div className="px-6 py-7 bg-gradient-to-br from-slate-50 to-white">
        <div className="text-[7px] font-bold uppercase tracking-widest mb-1" style={{ color: ORANGE }}>
          Eyebrow tag
        </div>
        <div className="text-base font-extrabold leading-tight mb-2" style={{ color: DARK_NAVY }}>
          Your headline goes here
        </div>
        <Bar w="80%" />
        <Bar w="65%" />
      </div>

      {/* Body */}
      <div className="px-6 py-4 flex-1 space-y-1.5">
        <Bar /><Bar /><Bar w="90%" /><Bar w="92%" />
        <div className="h-2" />
        <Bar /><Bar w="88%" /><Bar w="60%" />
      </div>

      {/* CTA */}
      <div className="px-6 py-5 flex justify-center" style={{ background: '#FFF7F2' }}>
        <div className="px-5 py-2 rounded-md text-[8px] font-bold text-white" style={{ background: ORANGE }}>
          Book Today
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LANDING — Hero + benefits + social proof + final CTA
// ─────────────────────────────────────────────────────────────────────────────
function LandingPreview() {
  return (
    <div className="h-full flex flex-col text-white" style={{ background: DARK_NAVY }}>
      <Header dark />

      {/* Big hero */}
      <div className="px-5 py-6 relative overflow-hidden">
        <div className="absolute -top-4 -right-6 w-16 h-16 rounded-full opacity-30 blur-xl" style={{ background: ORANGE }} />
        <div className="relative">
          <div className="inline-block text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2" style={{ background: 'rgba(243,103,42,0.2)', color: ORANGE }}>
            Limited offer
          </div>
          <div className="text-lg font-extrabold leading-[1.05] mb-2">
            Big bold<br />headline
          </div>
          <Bar w="70%" dark />
          <div className="flex gap-1.5 mt-3">
            <div className="px-3 py-1.5 rounded text-[8px] font-bold text-white" style={{ background: ORANGE }}>Claim Now</div>
            <div className="px-3 py-1.5 rounded text-[8px] font-bold border" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}>Call</div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="px-5 py-4 bg-white text-slate-900 flex-1">
        <div className="text-[8px] font-bold uppercase tracking-widest mb-2" style={{ color: NAVY }}>
          Why this works
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-2 mb-1.5">
            <div className="h-2 w-2 rounded-full mt-0.5 flex-shrink-0" style={{ background: ORANGE }} />
            <Bar w={i === 1 ? '90%' : i === 2 ? '78%' : '82%'} />
          </div>
        ))}
      </div>

      {/* Final CTA strip */}
      <div className="px-5 py-3 flex items-center justify-between" style={{ background: ORANGE }}>
        <div className="text-[9px] font-bold text-white">Ready to start?</div>
        <div className="px-2.5 py-1 rounded text-[8px] font-bold text-white border border-white/30">Book</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEGAL — Title + long text
// ─────────────────────────────────────────────────────────────────────────────
function LegalPreview() {
  return (
    <div className="h-full flex flex-col bg-white text-slate-900">
      <Header />

      <div className="px-6 py-6">
        <div className="text-[7px] font-bold uppercase tracking-widest mb-1" style={{ color: '#64748B' }}>
          Last updated · May 2026
        </div>
        <div className="text-base font-extrabold mb-3" style={{ color: DARK_NAVY }}>
          Privacy Policy
        </div>
      </div>

      <div className="px-6 pb-6 flex-1 space-y-2.5 overflow-hidden">
        <div className="text-[9px] font-bold" style={{ color: DARK_NAVY }}>1. Information we collect</div>
        <div className="space-y-1">
          <Bar /><Bar w="94%" /><Bar w="88%" />
        </div>
        <div className="text-[9px] font-bold pt-1" style={{ color: DARK_NAVY }}>2. How we use it</div>
        <div className="space-y-1">
          <Bar /><Bar w="92%" /><Bar /><Bar w="75%" />
        </div>
        <div className="text-[9px] font-bold pt-1" style={{ color: DARK_NAVY }}>3. Your rights</div>
        <div className="space-y-1">
          <Bar /><Bar w="86%" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG POST — Featured image + meta + body
// ─────────────────────────────────────────────────────────────────────────────
function BlogPostPreview() {
  return (
    <div className="h-full flex flex-col text-slate-900" style={{ background: CREAM }}>
      <Header />

      <div className="px-6 pt-5">
        {/* Category */}
        <div className="text-[7px] font-bold uppercase tracking-widest mb-1.5" style={{ color: ORANGE }}>
          Patient Resources · 5 min read
        </div>
        {/* Title */}
        <div className="text-sm font-extrabold leading-tight mb-2" style={{ color: DARK_NAVY }}>
          How to prepare for your first Invisalign consultation
        </div>
        {/* Author */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="h-3 w-3 rounded-full bg-slate-300" />
          <Bar w="40%" />
        </div>
      </div>

      {/* Featured image */}
      <div className="mx-6 mb-3 aspect-[16/9] rounded-md bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
        <div className="text-[9px] text-slate-400 font-semibold">📷 Featured image</div>
      </div>

      {/* Body */}
      <div className="px-6 pb-6 flex-1 space-y-1.5">
        <Bar /><Bar w="96%" /><Bar w="84%" />
        <div className="h-1.5" />
        <Bar /><Bar w="90%" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// THANK YOU — Confirmation + next steps + return link
// ─────────────────────────────────────────────────────────────────────────────
function ThankYouPreview() {
  return (
    <div className="h-full flex flex-col bg-white text-slate-900">
      <Header />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        {/* Big checkmark */}
        <div className="h-14 w-14 rounded-full flex items-center justify-center mb-4" style={{ background: `${ORANGE}15`, color: ORANGE }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="text-base font-extrabold mb-2" style={{ color: DARK_NAVY }}>
          Thank you!
        </div>
        <div className="space-y-1 mb-4 w-full px-4">
          <Bar w="80%" /><Bar w="60%" />
        </div>

        {/* Next steps */}
        <div className="text-[8px] font-bold uppercase tracking-widest mb-2" style={{ color: NAVY }}>What's next</div>
        <div className="space-y-1.5 w-full">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 px-4">
              <div className="h-3.5 w-3.5 rounded-full flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0" style={{ background: ORANGE }}>
                {i}
              </div>
              <Bar w={i === 1 ? '70%' : i === 2 ? '85%' : '60%'} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 flex justify-center">
        <div className="px-4 py-1.5 rounded text-[8px] font-bold text-white" style={{ background: DARK_NAVY }}>
          ← Back to home
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE — when no template is selected
// ─────────────────────────────────────────────────────────────────────────────
function EmptyPreview() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-slate-50 text-center px-6">
      <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      </div>
      <div className="text-xs font-bold text-slate-500 mb-1">No template selected</div>
      <div className="text-[10px] text-slate-400 max-w-[160px]">
        Click any template card on the left to see a preview here.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────

function Bar({ w = '100%', dark = false }: { w?: string; dark?: boolean }) {
  return (
    <div
      className="rounded-sm h-1.5"
      style={{
        width: w,
        background: dark ? 'rgba(255,255,255,0.18)' : 'rgba(15,23,42,0.12)',
      }}
    />
  );
}

function Header({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className="px-4 py-2.5 flex items-center justify-between border-b"
      style={{
        background: dark ? 'rgba(0,0,0,0.2)' : 'white',
        borderColor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)',
      }}
    >
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded" style={{ background: ORANGE }} />
        <div
          className="text-[8px] font-extrabold uppercase tracking-wider"
          style={{ color: dark ? 'white' : DARK_NAVY }}
        >
          boca
        </div>
      </div>
      <div className="flex gap-2">
        {['Services', 'Locations', 'Book'].map((l) => (
          <div
            key={l}
            className="text-[7px] font-semibold"
            style={{ color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.6)' }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
