
# 00 — Design System Setup

Foundation-only step. No UI components built. After this, the project is ready for prompt 01 (Header / Nav).

## 1. Google Fonts — `index.html`

Add to `<head>` (above the existing title/meta):

- `preconnect` to `fonts.googleapis.com`
- `preconnect` to `fonts.gstatic.com` with `crossorigin`
- Stylesheet link for `Barlow Condensed` (700, 800, 900) + `Barlow` (400, 600, 700) with `display=swap`

## 2. `tailwind.config.ts`

Extend the existing config (keep current shadcn tokens intact — they're used by `src/components/ui/*`):

- `fontFamily`: add `display: ['Barlow Condensed', 'sans-serif']` and `body: ['Barlow', 'sans-serif']`
- `colors`: add brand tokens mapped to CSS vars with `<alpha-value>` syntax — `orange`, `orange-hover`, `navy`, `navy-dark`, `navy-light`, `off-white`, `light-gray`, `text-primary`, `text-secondary`, `text-muted`. (Keep existing `border`, `background`, `primary`, etc. — do not overwrite shadcn tokens. The `border` brand token from the spec collides with the existing shadcn `border`; resolve by keeping shadcn's `border` and exposing the brand border as `border-gray` to avoid breaking every shadcn component.)
- `borderRadius`: add `card: '16px'`, `btn: '8px'`, `pill: '20px'`, `input: '8px'` alongside existing `lg/md/sm`

## 3. `src/index.css`

Inside the existing `:root` block, append the brand HSL tokens (space-separated triplets, no `hsl()` wrapper) per spec:

- Brand: `--color-orange`, `--color-orange-hover`, `--color-navy`, `--color-navy-dark`, `--color-navy-light`
- Neutrals: `--color-white`, `--color-off-white`, `--color-light-gray`, `--color-border`
- Text: `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- Glass nav: `--glass-bg`, `--glass-blur`, `--glass-border`, `--glass-shadow` (these stay as raw values, not HSL — they're composite)

Keep all existing shadcn tokens (`--background`, `--primary`, etc.) untouched.

Replace the `body` rule and add `h1–h4` rule per spec (Barlow body, Barlow Condensed uppercase headings, antialiased, 1.7 line-height).

## 4. Framer Motion

Install `framer-motion` via `bun add framer-motion`. No other animation libs.

## 5. `src/data/initialData.ts`

Create new file exporting `INITIAL_DATA` exactly as specified: `site`, `brand`, 9 `locations` (Russell, Russell — Kids, Bonanza, Sahara, Jones, Charleston, Flamingo, Cheyenne & Rainbow, Eastern & Serene), and 8 `services`. Include a TypeScript `Location`, `Service`, and `InitialData` interface so downstream components get typed props. Add a JSDoc note that this mock simulates `window.INITIAL_DATA` injected by PHP in production.

## Technical notes

- `border` token collision: spec wants brand `border` color, but shadcn `border-border` utility is used everywhere in `src/components/ui/*`. Solution: keep shadcn `border` mapped to `--border`, add the brand border as `--color-border` exposed in Tailwind as `border-gray` (matches the spec name "Border Gray"). Components that need the brand border use `border-border-gray`.
- All brand colors use the `hsl(var(--token) / <alpha-value>)` pattern so `bg-orange/20`, `text-navy/80`, etc. work.
- `Index.tsx` placeholder is left alone — UI work begins in prompt 01.

## Confirmation checklist (will be reported after build)

- Google Fonts wired in `index.html`
- `tailwind.config.ts` extended with brand colors, font families, radius tokens
- `index.css` has brand `:root` tokens + base typography (Barlow / Barlow Condensed)
- `framer-motion` installed
- `src/data/initialData.ts` created with full typed `INITIAL_DATA`
- No components built
