# Rentopia — Duy Legacy Ventures NYC Real Estate Platform

A production-grade real estate rental platform built for **Duy Legacy Ventures LLC**, a Rentopia affiliate, operating in New York City.

## What It Does

- **Split-screen search experience** — Browse listings in a 2-column card grid while exploring an interactive, draggable NYC map with real-time price-tag markers
- **Property Detail pages** — Tabbed media hero (Photos / 3D Tour / Floorplan / POV Video), transit access display, amenity grid, and a Rent Rewards estimator
- **Rent Rewards calculator** — Estimates annual rewards value based on monthly rent × 12 × a configurable reward rate
- **Favorites & Comparison queue** — Save listings and compare up to 3 side-by-side
- **Tour request form** — Pre-filled `mailto:` links routed to `duylegacyventure@gmail.com`
- **Admin Vault** — Password-protected dashboard to add, edit, and delete listings via a comprehensive form (including lat/long for map placement)
- **Authentication** — Client-side login/signup with admin access for `admin@duylegacyventures.com`

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

## Running Locally

```bash
npm install
npm run dev       # Start dev server at http://localhost:3000
```

For the full Netlify environment (functions, CDN, etc.):
```bash
netlify dev       # Starts at http://localhost:8888
```

## Admin Access

Navigate to `/login` and use:
- **Email:** `admin@duylegacyventures.com`
- **Password:** `DuyLegacy2025!`

This grants access to the Admin Vault at `/admin`.

## Environment Variables

No environment variables are required for core functionality. The Stripe integration (from the original template) requires `STRIPE_SECRET_KEY` if ecommerce features are re-enabled.

## License & Attribution

Duy Legacy Ventures LLC | Rentopia Affiliate | NY Real Estate Salesperson License #10401397996
