# InvestAssist Landing Page

Standalone Next.js marketing site extracted from the main InvestAssist app.

## What is included

- Public landing page UI
- Hero address and document intake flow
- Pre-auth intake staging API route
- Supabase upload helpers

## Environment variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`: marketing site URL
- `NEXT_PUBLIC_APP_URL`: main app URL used for sign-in, sign-up, and app handoff
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key for `/api/intake/create`
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`: Mapbox token for address autocomplete

## Run locally

```bash
npm install
npm run dev
```

## Separate repo handoff

This folder is intended to be copied into its own repository root. The marketing site stays standalone, while auth and post-signup app flows continue through `NEXT_PUBLIC_APP_URL`.