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

**CMS** (`cms/` subfolder of this same repo — deployed as its own process/service)
- [Strapi 5](https://strapi.io) (TypeScript)
- SQLite locally, Postgres in production
- Public read access on all content types; contact/job-application submissions
  are write-only from the public role

## Project structure

This is a monorepo: the Next.js frontend lives at the repo root, and the
Strapi CMS lives in `cms/` with its own `package.json`/`node_modules` and
full commit history (merged in via `git subtree`, history preserved). They
deploy as two independent Node processes — merging the repo didn't merge the
deploys.

```
app/                   Next.js App Router pages (one folder per route)
components/            Page-level components (Navbar, Footer, section components)
components/ui/         Lower-level, mostly-drop-in UI primitives
lib/cms/               One typed fetcher module per Strapi content type
lib/strapi.ts          Thin fetch wrapper around the Strapi REST API
lib/utils.ts           `cn()` class-merging helper used by the ui/ primitives
cms/                   Strapi 5 CMS backend (own package.json, own README)
```

Every CMS-backed page is a Server Component with `export const dynamic =
'force-dynamic'`, so content is fetched fresh per request — editing an entry in
Strapi shows up on the next page load, no rebuild needed.

## Getting started

Requires Node.js 18+ and npm. Two projects to run side by side:

### 1. CMS (Strapi)

```bash
cd cms
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

**CMS** (`cms/.env`): standard Strapi env vars
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

Collection types: `Company`, `TeamMember` (categorized `founder` / `director`
/ `leadership` — the founder-message page renders every `founder` entry),
`GalleryItem`, `Certification`, `Partner`, `Industry`, `Region`, `Event`,
`ContactSubmission`.

Single types:
- `HomePage` — hero heading/subheading, desktop *and* mobile hero
  slides/video (mobile falls back to a plain brand-color background if left
  empty, rather than reusing the desktop crop), stats, "Who We Are" copy.
- `AboutPage`, `SiteSettings` (incl. the site logo — falls back to the static
  file in `public/logos/` if left empty), `SiteCopy`.
- `PrivacyPolicy`, `TermsAndConditions`, `CookiePolicy` — each a
  `lastUpdated` string plus a repeatable `sections` component
  (`title`/`description`), so sections can be added, removed, or reordered
  without a code change. The Contact section on each page is the one
  exception: it's hardcoded in the page component so it always pulls the
  live email/address from `SiteSettings` instead of risking going stale.

To add/update content, log into the Strapi admin and use the Content Manager —
no deploy required for content changes, only for code changes.

## Deployment

For client demos, the frontend and CMS each deploy to [Render](https://render.com)
as separate services, both built from this repo with the CMS service's root
directory set to `cms/`.

Production deployment (client-managed) targets Hostinger instead — typically
a VPS running both as independent Node processes (e.g. via PM2), each behind
its own domain/subdomain through a reverse proxy (Nginx). Being one repo
doesn't change that: each app still gets its own `npm install`/build/start
and its own process, just from a shared checkout instead of two.

**Known limitation:** Render's free tier uses an ephemeral filesystem, so
files uploaded through Strapi's Media Library (logos, photos, certificates)
are lost on every redeploy of the CMS service. Until the CMS is moved to a
persistent media store (e.g. Cloudinary, S3, or persistent disk), re-upload
any missing media after a CMS redeploy. The database itself is unaffected —
this only affects uploaded files. (This is Render-specific; a Hostinger VPS
with a normal persistent filesystem does not have this problem.)

## Design notes

- Brand color system: `tailwind.config.ts` defines the `solstice` scale
  (brand green, flat hex per step) and a brand-tinted `slate` scale (also
  flat hex — neutrals/text tinted green instead of Tailwind's default
  blue-gray), reused via ordinary `dark:` utility pairs (`text-slate-600
  dark:text-slate-400`) the same way the rest of Tailwind works. Deliberately
  *not* CSS-variable-driven at the scale level — a step's value must stay
  constant regardless of `.dark`, since some elements pair light/dark
  classes explicitly while others (e.g. text on a flat light-green card)
  intentionally use only the light-mode class in both themes; only the
  shadcn-style `--background`/`--foreground`/etc. tokens in
  `app/globals.css` are genuinely CSS-variable/mode-driven. There is no
  second, unrelated color system anywhere on the site — light mode is
  white/light-green with brand-green accents, dark mode uses the brand
  green itself as the page background (deliberately not black) with
  white/light-mint text.
- `components/CustomCursor.tsx` is a global, reusable custom cursor (a dot
  that tracks the pointer almost instantly plus a ring that trails behind on
  a softer spring, both via `motion` motion values so mouse movement never
  triggers a React re-render). Desktop (fine-pointer) only, detected live via
  `pointerType` so hybrid touch+mouse devices behave correctly either way;
  skipped entirely under `prefers-reduced-motion`.
- Site-wide font is Inter, loaded via `next/font/google` in `app/layout.tsx`
  and exposed as the `font-display`/`font-sans` Tailwind utilities.
- `components/ImageWithFallback.tsx` wraps any CMS-sourced image so a missing
  or broken upload (see the Render limitation above) degrades to a simple
  placeholder instead of a broken-image icon.
