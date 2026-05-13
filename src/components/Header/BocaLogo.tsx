export function BocaLogo() {
  return (
    <a
      href="/"
      aria-label="Boca Dental and Braces — home"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
        textDecoration: 'none',
      }}
    >
      <img
        src="/boca-logo.png"
        alt="Boca Dental and Braces"
        style={{ height: 40, width: 'auto', display: 'block' }}
      />
      <div
        style={{
          paddingLeft: 12,
          borderLeft: '1px solid rgba(255,255,255,0.18)',
          lineHeight: 1,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 1.5,
            lineHeight: 1.1,
            color: 'rgba(255,255,255,0.9)',
            textTransform: 'uppercase',
          }}
        >
          Las Vegas
        </div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: 1.5,
            marginTop: 4,
            color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
          }}
        >
          9 Locations
        </div>
      </div>
    </a>
  )
}

export default BocaLogo
