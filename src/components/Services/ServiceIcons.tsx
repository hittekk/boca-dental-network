// src/components/Services/ServiceIcons.tsx
// Custom SVG icon set for Boca Dental services.
// All icons use currentColor so they inherit the parent text color.
// Consistent style: 24x24 viewBox, 1.5px stroke, round linecaps, no fill.

interface IconProps {
  size?: number
  color?: string
  className?: string
}

// ── General Dentistry — tooth with shine lines ──────────────────────────────
export function IconGeneralDentistry({ size = 40, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M14 8C11 8 8 10.5 8 14C8 17 9 19 10 21C11 23 11.5 28 12.5 30C13 31.5 13.5 32 14.5 32C15.5 32 16 31 16.5 28.5L17.5 24H22.5L23.5 28.5C24 31 24.5 32 25.5 32C26.5 32 27 31.5 27.5 30C28.5 28 29 23 30 21C31 19 32 17 32 14C32 10.5 29 8 26 8C24.5 8 23 8.5 22 9C21.5 9.3 20.5 9.5 20 9.5C19.5 9.5 18.5 9.3 18 9C17 8.5 15.5 8 14 8Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M24 12L25.5 10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26.5 14L28.5 13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25.5 16.5L27 17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Braces & Orthodontics ───────────────────────────────────────────────────
export function IconBraces({ size = 40, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="12" width="7" height="11" rx="3" stroke={color} strokeWidth="1.75" />
      <rect x="16.5" y="11" width="7" height="12" rx="3" stroke={color} strokeWidth="1.75" />
      <rect x="25" y="12" width="7" height="11" rx="3" stroke={color} strokeWidth="1.75" />
      <path d="M8 18.5H15M17 18.5H23.5M25 18.5H32" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <rect x="10" y="16.5" width="3" height="4" rx="0.5" stroke={color} strokeWidth="1.25" />
      <rect x="18.5" y="16.5" width="3" height="4" rx="0.5" stroke={color} strokeWidth="1.25" />
      <rect x="27" y="16.5" width="3" height="4" rx="0.5" stroke={color} strokeWidth="1.25" />
      <path d="M10 23L10.5 27M14 23L13.5 27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.5 23L19 27M23 23L22.5 27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M27 23L27.5 27M31 23L30.5 27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Invisalign ──────────────────────────────────────────────────────────────
export function IconInvisalign({ size = 40, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 22C8 22 8 15 20 15C32 15 32 22 32 22" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 22C8 22 8 26 20 26C32 26 32 22 32 22" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M10 19C10 19 10 16.5 12.5 16.5C15 16.5 15 19 15 19" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M17 18C17 18 17 15.5 20 15.5C23 15.5 23 18 23 18" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M25 19C25 19 25 16.5 27.5 16.5C30 16.5 30 19 30 19" stroke={color} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M34 10L34.8 12L37 12L35.4 13.4L36 15.5L34 14.2L32 15.5L32.6 13.4L31 12L33.2 12L34 10Z" stroke={color} strokeWidth="1" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// ── Dental Implants ─────────────────────────────────────────────────────────
export function IconImplants({ size = 40, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M13 17H27L25.5 8L22 12L20 8L18 12L14.5 8L13 17Z" stroke={color} strokeWidth="1.75" strokeLinejoin="round" />
      <rect x="17" y="17" width="6" height="4" rx="1" stroke={color} strokeWidth="1.75" />
      <rect x="18" y="21" width="4" height="12" rx="1" stroke={color} strokeWidth="1.75" />
      <path d="M17 24H23" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M17 26.5H23" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M17 29H23" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M18 31.5H22" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

// ── Teeth Whitening ─────────────────────────────────────────────────────────
export function IconWhitening({ size = 40, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M14 10C11.5 10 9 12 9 15C9 17.5 10 19.5 11 21C12 22.5 12.5 27 13.5 29C14 30.5 14.5 31 15.5 31C16.5 31 17 30 17.5 27.5L18 24H22L22.5 27.5C23 30 23.5 31 24.5 31C25.5 31 26 30.5 26.5 29C27.5 27 28 22.5 29 21C30 19.5 31 17.5 31 15C31 12 28.5 10 26 10C24.5 10 23 10.5 22 11C21.5 11.3 20.5 11.5 20 11.5C19.5 11.5 18.5 11.3 18 11C17 10.5 15.5 10 14 10Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M20 6V4" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M27 8L28.5 6.5" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M13 8L11.5 6.5" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M31 13L33 12" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
      <path d="M9 13L7 12" stroke={color} strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

// ── Emergency Dental ────────────────────────────────────────────────────────
export function IconEmergency({ size = 40, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M13 9C10.5 9 8 11.2 8 14.5C8 17 9 19 10 20.5C11 22 11.5 27 12.5 29C13 30.5 13.5 31 14.5 31C15.5 31 16 30 16.5 27.5L17 23.5H20"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 9C29.5 9 32 11.2 32 14.5C32 17 31 19 30 20.5C29 22 28.5 27 27.5 29C27 30.5 26.5 31 25.5 31C24.5 31 24 30 23.5 27.5L23 23.5H20"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 11V19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 15H24" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// ── Pediatric / Kids ────────────────────────────────────────────────────────
export function IconKids({ size = 40, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M14 12C11.5 12 9 14 9 17C9 19 10 20.5 11 22C12 23.5 12.5 27 13.5 28.5C14 29.5 14.5 30 15.5 30C16.5 30 17 29 17.5 27L18 24H22L22.5 27C23 29 23.5 30 24.5 30C25.5 30 26 29.5 26.5 28.5C27.5 27 28 23.5 29 22C30 20.5 31 19 31 17C31 14 28.5 12 26 12C24.5 12 23 12.4 22 12.8C21.4 13.1 20.6 13.2 20 13.2C19.4 13.2 18.6 13.1 18 12.8C17 12.4 15.5 12 14 12Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M20 5L21 8H24L21.5 9.8L22.5 13L20 11.2L17.5 13L18.5 9.8L16 8H19L20 5Z"
        stroke={color}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 19C16.5 19 17.5 21 20 21C22.5 21 23.5 19 23.5 19"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

// ── Crowns & Veneers ────────────────────────────────────────────────────────
export function IconCrowns({ size = 40, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M8 28L11 14L17 20L20 10L23 20L29 14L32 28H8Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M8 28H32V31C32 31.5 31.5 32 31 32H9C8.5 32 8 31.5 8 31V28Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="11" r="1.5" stroke={color} strokeWidth="1.25" />
      <circle cx="11" cy="15" r="1.5" stroke={color} strokeWidth="1.25" />
      <circle cx="29" cy="15" r="1.5" stroke={color} strokeWidth="1.25" />
    </svg>
  )
}

// ── Icon map ────────────────────────────────────────────────────────────────
export const SERVICE_ICON_MAP: Record<string, React.FC<IconProps>> = {
  general:    IconGeneralDentistry,
  braces:     IconBraces,
  invisalign: IconInvisalign,
  implants:   IconImplants,
  whitening:  IconWhitening,
  emergency:  IconEmergency,
  kids:       IconKids,
  crowns:     IconCrowns,
}
