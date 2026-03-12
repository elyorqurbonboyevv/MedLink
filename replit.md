# Healthcare App (Lovable → Replit Migration)

## Overview
A React + Vite + TypeScript healthcare application featuring patient and doctor dashboards, appointment booking, AI symptom triage, messaging, and health tracking.

## Architecture
- **Frontend**: React 18, TypeScript, Vite (port 5000)
- **Styling**: Tailwind CSS, shadcn/ui component library
- **Routing**: React Router DOM v6
- **State/Data**: TanStack React Query
- **Backend**: Supabase (auth + database)
- **Animations**: Framer Motion

## Key Pages
- `/` — Patient home / dashboard
- `/search` — Search for doctors
- `/doctor/:id` — Doctor profile
- `/book/:id` — Book appointment
- `/appointments` — Upcoming appointments
- `/health` — Health tracking
- `/messages` — Messaging
- `/account` — Account/profile (custom feature)
- `/triage` — AI symptom checker
- `/dashboard/*` — Doctor dashboard (overview, schedule, patients, triage reports, settings)

## Environment Variables
- `VITE_SUPABASE_URL` — Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Your Supabase anonymous public key

## Running the App
```
npm run dev
```
Runs on port 5000.

## Migration Notes
- Migrated from Lovable to Replit
- Removed `lovable-tagger` plugin from Vite config (Lovable-specific)
- Configured Vite to bind to `0.0.0.0` on port 5000 for Replit compatibility
