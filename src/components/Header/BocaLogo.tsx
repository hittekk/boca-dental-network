export function BocaLogo({ mode = 'white' }: { mode?: 'white' | 'dark' }) {
  const isDarkText = mode === 'dark'
  const logoSrc = isDarkText ? '/boca-logo-color.png' : '/boca-logo.png'
  const primaryText = isDarkText ? 'rgba(0,29,61,0.95)' : 'rgba(255,255,255,0.9)'
  const secondaryText = isDarkText ? 'rgba(0,29,61,0.55)' : 'rgba(255,255,255,0.45)'
  const divider = isDarkText ? 'rgba(0,29,61,0.18)' : 'rgba(255,255,255,0.18)'

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
        src={logoSrc}
        alt="Boca Dental and Braces"
        style={{ height: 40, width: 'auto', display: 'block' }}
      />
      <div
        style={{
          paddingLeft: 12,
          borderLeft: `1px solid ${divider}`,
          lineHeight: 1,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: 1.5,
            lineHeight: 1.1,
            color: primaryText,
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
            color: secondaryText,
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
