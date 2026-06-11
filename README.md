# Landing Page

Standalone copy of the `/` marketing site from the main app.

Included:
- Landing route UI
- Upload block UI only
- Landing components, design tokens, CSS, and public assets

Required environment variables are listed in `.env.example`.

Run locally:

```bash
pnpm install
pnpm dev
```

Notes:
- The upload block is visual only in this standalone copy. It no longer stages files or calls backend upload APIs.
- The sign-in/sign-up links are preserved. A simple placeholder `/auth` page is included in this copy, not the full product auth system.
