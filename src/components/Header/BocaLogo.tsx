export function BocaLogo() {
  return (
    <a href="/" className="flex items-center gap-2 flex-shrink-0 no-underline">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: '#F3672A' }}
      >
        <span className="text-white font-extrabold text-xl leading-none">B</span>
      </div>
      <div className="leading-none">
        <div className="text-white font-extrabold text-lg tracking-wide leading-none">
          <span style={{ color: '#F3672A' }}>BOCA</span> DENTAL · BRACES
        </div>
        <div
          className="text-white/40 uppercase mt-0.5 tracking-widest"
          style={{ fontSize: 9 }}
        >
          Las Vegas · 9 Locations
        </div>
      </div>
    </a>
  );
}

export default BocaLogo;
