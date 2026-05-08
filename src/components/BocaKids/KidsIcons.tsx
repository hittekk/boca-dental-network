// src/components/BocaKids/KidsIcons.tsx
// Minimal placeholder icon set for the Boca Kids feature list.
// Replace with the final pasted KidsIcons.tsx when available.

interface IconProps {
  size?: number
  color?: string
  className?: string
}

function base(path: React.ReactNode) {
  return ({ size = 24, color = 'currentColor', className }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {path}
    </svg>
  )
}

const IconAge = base(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)
const IconHouse = base(<><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>)
const IconShield = base(<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />)
const IconChat = base(<><path d="M4 5h16v11H8l-4 4V5z" /><path d="M8 10h8M8 13h5" /></>)
const IconTooth = base(<path d="M8 3c-2 0-4 2-4 5 0 3 2 4 2 7l1 5c0 1 1 1 1 0l1-5h2l1 5c0 1 1 1 1 0l1-5c0-3 2-4 2-7 0-3-2-5-4-5-1 0-2 1-2 1s-1-1-2-1z" />)
const IconBraces = base(<><rect x="4" y="9" width="4" height="6" rx="1" /><rect x="10" y="9" width="4" height="6" rx="1" /><rect x="16" y="9" width="4" height="6" rx="1" /><path d="M4 12h16" /></>)

export const KIDS_FEATURE_ICONS: React.FC<IconProps>[] = [
  IconAge,
  IconHouse,
  IconShield,
  IconChat,
  IconTooth,
  IconBraces,
]
