# Boca Dental & Braces — Website

Multi-location dental practice website for **Boca Dental & Braces**, serving 9 clinic locations across the greater Las Vegas, Nevada area.

## Stack

- **React 18** + **TypeScript** + **Vite**
- **Framer Motion** for all animations
- **Tailwind CSS** + inline styles
- **lucide-react** + custom SVG iconography
- Site architecture follows the **Treysyde 10-section homepage spec** (May 2025)

## Local development

```bash
npm install
npm run dev          # Vite dev server on http://localhost:8080
npm run build        # Production build to /dist
npm run preview      # Preview the production build locally
```

## Architecture

- **Public frontend** lives in `src/components/` — sectioned per spec
- **Shared components** in `src/components/shared/` — `TrustBar`, `AudienceRouting`, `MeetTheTeam`, `LocationsMap`, `HomepageSchema`, `MobileStickyCTA`
- **Mock data** in `src/data/initialData.ts` — simulates `window.INITIAL_DATA` injected by PHP in production
- **Four visual variants** (A: Modern Clinic · B: Warm Editorial · C: Super Modern · D: Futuristic Light) switchable via `?variant=` URL parameter

## Deployment

Production target is a custom WordPress plugin (DentalPress Frontend) on Flywheel hosting that wraps this React app and injects `window.INITIAL_DATA` via PHP `wp_head`. Preview environment ships to Netlify.

## Brand

- Primary Orange: `#F3672A`
- Navy: `#162E7A`
- Dark Navy: `#001D3D`
- Typography: Open Sans (400 / 600 / 700 / 800)

Built by **[DataStackLogic](https://datastacklogic.com)**.
