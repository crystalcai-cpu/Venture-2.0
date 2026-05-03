# AGENTS.md

This document provides a comprehensive overview of the Rentopia NYC Real Estate Platform for AI agents and developers working on this codebase.

## Project Overview

A production-grade NYC rental platform for Duy Legacy Ventures LLC (a Rentopia affiliate). Built on TanStack Start with file-based routing, deployed on Netlify.

## Directory Structure

```
src/
├── components/
│   ├── Header.tsx          # Sticky nav with auth state, favorites badge, compare counter
│   ├── Footer.tsx          # Brand footer with legal license info
│   ├── ListingCard.tsx     # Property card with photo, price, stats, compare checkbox, favorite toggle
│   ├── MapView.tsx         # Leaflet map — MUST use dynamic import (client-only, no SSR)
│   └── CompareBar.tsx      # Fixed bottom bar when 2-3 listings are in compare queue
├── context/
│   └── AppContext.tsx      # Central state: listings, favorites, compareQueue, currentUser
│                           # Also contains login/signup/logout logic (localStorage-based)
├── data/
│   └── listings.ts         # 10 base NYC listings + TypeScript interfaces (Listing, Transit, Media)
├── routes/
│   ├── __root.tsx          # Root layout: AppProvider, Header, Footer, CompareBar wrappers
│   ├── index.tsx           # Hero landing page with neighborhood cards, features, CTA
│   ├── search.tsx          # Split-screen: 55% listings grid + 45% sticky Leaflet map
│   ├── property/
│   │   └── $id.tsx         # Property detail: media tabs, rewards estimator, tour request form
│   ├── login.tsx           # Login form with admin hint
│   ├── signup.tsx          # Signup form with password strength meter
│   └── admin.tsx           # Admin Vault: protected listing CRUD + lead manager
└── styles.css              # Global dark luxury theme (CSS custom properties, Leaflet overrides)
```

## Key Architectural Decisions

### Map (Leaflet)
Leaflet requires `window` and must NOT be imported at module level — it will crash SSR. Always use dynamic import inside `useEffect`:
```typescript
const L = await import('leaflet')
```
The `MapView` component handles this. Never use `react-leaflet`; use vanilla Leaflet only.

The CSS is loaded via a `<link>` tag inside the component from unpkg CDN.

### Authentication
Auth is entirely client-side using `localStorage`. No server sessions exist.
- **Admin credentials**: `admin@duylegacyventures.com` / `DuyLegacy2025!` (hardcoded in `AppContext.tsx`)
- `currentUser.isAdmin === true` grants access to `/admin`
- The admin route guards with `useEffect` + `navigate` (not server-side redirect)

### Data Persistence
Listings are stored in `localStorage` under `rentopia_listings`. On first load, falls back to `baseListings` from `src/data/listings.ts`. Admin edits persist across sessions via localStorage.

For production persistence, migrate to Netlify Blobs using `@netlify/blobs` (already in `package.json`). The `getStore('rentopia-listings')` pattern is ready to use in server functions.

### Route Protection Pattern
Admin routes use this pattern (client-side only):
```typescript
useEffect(() => {
  if (!currentUser?.isAdmin) navigate({ to: '/login' })
}, [currentUser])
if (!currentUser?.isAdmin) return null
```

### CSS Architecture
All styling uses CSS custom properties defined in `:root` in `styles.css`. Key tokens:
- `--bg`, `--surface`, `--card` — dark backgrounds
- `--gold`, `--gold-muted`, `--gold-glow` — metallic gold accent
- `--text`, `--text-secondary`, `--text-muted` — text hierarchy

Map-specific styles (`.price-marker`, `.popup-card`, Leaflet overrides) must be in `styles.css` because they're injected as HTML strings by Leaflet and can't use Tailwind.

### Typography
- **Cormorant Garamond** — Display headings
- **Inter** — Body, UI, forms (default)
- **Space Mono** — Numbers, prices, data

Loaded via Google Fonts link in `__root.tsx` head config.

## Design System

Color palette (CSS variables in styles.css):
- `#050505` — deep background
- `#D4AF37` — metallic gold accent
- `#F0EBE0` — primary text

Utility classes: `.btn-gold`, `.btn-ghost`, `.btn-danger`, `.input-dark`, `.card-dark`, `.badge-*`, `.tab-bar`, `.admin-table`, `.modal-overlay`, `.amenity-pill`

## Conventions

- Inline styles for layout/positioning (predictable with SSR)
- Tailwind utility classes for Tailwind-aligned utilities only
- `Space Mono` for all price/number displays
- TanStack Router `Link` with type-safe `to` props
- Routes use `createFileRoute('/path')({...})` pattern
- Dynamic imports for any browser-only libraries (Leaflet, etc.)

## Adding a New Listing

1. Add to `src/data/listings.ts` `baseListings` array following the `Listing` interface
2. Include valid NYC latitude/longitude for map placement
3. Use Unsplash photo URLs: `https://images.unsplash.com/photo-{ID}?w=1200&q=80`

## Adding a New Route

Create `src/routes/your-route.tsx`:
```typescript
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/your-route')({
  component: YourComponent,
})
```
The router auto-generates from file structure — no manual registration needed.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (React 19, SSR) |
| Routing | TanStack Router v1 (file-based) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Animations | Framer Motion v11 |
| Map | Leaflet (vanilla, client-only dynamic import) |
| Icons | Lucide React |
| State | React Context + localStorage |
| Deployment | Netlify |
