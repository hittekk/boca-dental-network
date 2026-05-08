export function BocaLogo() {
  return (
    <a
      href="/"
      className="flex items-center gap-3 flex-shrink-0 no-underline"
      aria-label="Boca Dental and Braces — home"
    >
      <img
        src="/boca-logo.svg"
        alt="Boca Dental and Braces"
        style={{ height: 36, width: 'auto', display: 'block' }}
      />
      <div
        className="leading-none"
        style={{
          paddingLeft: 12,
          borderLeft: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        <div
          className="text-white/90 uppercase font-semibold"
          style={{ fontSize: 10, letterSpacing: 1.5, lineHeight: 1.1 }}
        >
          Las Vegas
        </div>
        <div
          className="text-white/45 uppercase mt-1 tracking-widest"
          style={{ fontSize: 9, letterSpacing: 1.5 }}
        >
          9 Locations
        </div>
      </div>
    </a>
  );
}

export default BocaLogo;
