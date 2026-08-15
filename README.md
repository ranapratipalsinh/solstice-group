# Solstice Group

Corporate website for **Solstice Group** — a parent company with subsidiaries in
import/export, bath & wellness products, spices, and event management. Built as
a Next.js frontend backed by a Strapi headless CMS, so the marketing/business
team can edit content (companies, team, gallery, certifications, partners,
homepage hero, etc.) without touching code.

Live site: https://solstice-group.onrender.com

## Tech stack

**Frontend** (this repo)
- [Next.js 16](https://nextjs.org) (App Router, Server Components)
- TypeScript
- Tailwind CSS
- [Motion](https://motion.dev) (the `framer-motion` successor) for animation
- A handful of drop-in UI primitives adapted from [21st.dev](https://21st.dev) /
  [ui-layouts.com](https://ui-layouts.com) / [motion-primitives.com](https://motion-primitives.com)
  (infinite slider, linear expanding cards, bento gallery, staggered deck)

**CMS** ([`solstice-group-cms`](https://github.com/ranapratipalsinh/solstice-group-cms), separate repo/deploy)
- [Strapi 5](https://strapi.io) (TypeScript)
- SQLite locally, Postgres in production
- Public read access on all content types; contact/job-application submissions
  are write-only from the public role

## Project structure

```
app/                   Next.js App Router pages (one folder per route)
components/            Page-level components (Navbar, Footer, section components)
components/ui/         Lower-level, mostly-drop-in UI primitives
lib/cms/               One typed fetcher module per Strapi content type
lib/strapi.ts          Thin fetch wrapper around the Strapi REST API
lib/utils.ts           `cn()` class-merging helper used by the ui/ primitives
```

Every CMS-backed page is a Server Component with `export const dynamic =
'force-dynamic'`, so content is fetched fresh per request — editing an entry in
Strapi shows up on the next page load, no rebuild needed.

## Getting started

Requires Node.js 18+ and npm. Two projects to run side by side:

### 1. CMS (Strapi)

```bash
cd solstice-group-cms
npm install
npm run develop
```

Starts on `http://localhost:1337`. First run will prompt you to create an
admin account at `http://localhost:1337/admin`. Local dev uses SQLite, so no
database setup is required.

### 2. Frontend (Next.js)

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

Starts on `http://localhost:3000`.

### Environment variables

**Frontend** (`.env.local`):

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_STRAPI_URL` | Base URL of the Strapi API, e.g. `http://localhost:1337` locally |
| `STRAPI_API_TOKEN` | Server-side API token (Strapi admin → Settings → API Tokens) used for the contact form and job application submissions. Never exposed to the browser. |

**CMS** (`solstice-group-cms/.env`): standard Strapi env vars
(`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`,
`TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`, plus `DATABASE_*` for your database).
Strapi generates these for you on `strapi new`; in production point
`DATABASE_CLIENT` at Postgres rather than SQLite.

## Scripts

```bash
npm run dev      # start the Next.js dev server
npm run build    # production build (also used as the CI/deploy sanity check)
npm run start    # run a production build locally
```

## Content model (Strapi)

Collection types: `Company`, `TeamMember`, `JobOpening`, `JobApplication`,
`BlogPost`, `GalleryItem`, `Certification`, `Partner`, `Industry`, `Region`,
`Event`, `ContactSubmission`.

Single types: `HomePage` (hero heading/subheading, hero slider images, stats),
`AboutPage`, `SiteSettings`.

To add/update content, log into the Strapi admin and use the Content Manager —
no deploy required for content changes, only for code changes.

## Deployment

Both the frontend and the CMS deploy to [Render](https://render.com) as
separate services, each connected to its own GitHub repo for auto-deploy on
push to `main`.

**Known limitation:** Render's free tier uses an ephemeral filesystem, so
files uploaded through Strapi's Media Library (logos, photos, certificates)
are lost on every redeploy of the CMS service. Until the CMS is moved to a
persistent media store (e.g. Cloudinary, S3, or a Render paid persistent
disk), re-upload any missing media after a CMS redeploy. The database itself
(Postgres) is unaffected — this only affects uploaded files.

## Design notes

- Brand color is defined once as the `solstice` Tailwind color scale
  (`tailwind.config.ts`) and reused everywhere — there is no second color
  system anywhere on the site.
- Site-wide font is Inter, loaded via `next/font/google` in `app/layout.tsx`
  and exposed as the `font-display`/`font-sans` Tailwind utilities.
- `components/ImageWithFallback.tsx` wraps any CMS-sourced image so a missing
  or broken upload (see the Render limitation above) degrades to a simple
  placeholder instead of a broken-image icon.
