# Solstice Group — Build Requirements & History

This document records what was requested and built for the Solstice Group
website, from the first prompt through to the current state. It exists so
anyone picking up this project — a developer, a future AI session, or the
client — can see the reasoning behind decisions without re-reading the full
chat history.

Two repositories make up this project:
- **Frontend**: this repo (Next.js 16 + Tailwind)
- **CMS**: [`solstice-group-cms`](https://github.com/ranapratipalsinh/solstice-group-cms) (Strapi 5)

---

## 1. Initial brief

Build a corporate website for **Solstice Group**, a parent company with four
subsidiaries:

| Subsidiary | Business |
| --- | --- |
| Solbath Global Private Limited | Bath & wellness products |
| Solstice Spices | Spices & food ingredients |
| GTC Solstice Import Export | Import/export trade |
| Solstice Event (GTS Events) | Corporate events & exhibitions |

Requirements:
- A **content-manageable** site — the client's team needed to edit company
  info, team members, gallery photos, certifications, and partner logos
  without a developer, so the decision was to run **Strapi** as a full
  headless CMS rather than hardcoding content.
- Pages: Home, About, Our Companies (+ per-company detail pages), Industries,
  Founder Message, Leadership, Gallery, Certifications & Awards, Partners &
  Clients, Careers (+ application flow), News/Blog, Events, CSR, Contact.
- A working contact form and a careers application flow (resume upload),
  both submitting into Strapi.
- Deploy both the frontend and CMS to Render, each auto-deploying from its
  own GitHub repo.

This foundational build (CMS content types + permissions, the fetcher layer
in `lib/cms/`, all page scaffolding, the contact form, the careers/resume
upload flow, and an editorial-style homepage) shipped as the first commit on
both repos (`ca5fd4c` / `0ca51cd`).

---

## 2. Homepage animation & polish pass

Once the base site was live, the focus shifted to making the homepage feel
premium rather than templated:

- Scroll-triggered fade/slide-in reveals for card grids across every listing
  page (`components/ScrollReveal.tsx`), rather than content just appearing.
- A cinematic crossfade + Ken Burns treatment for the original "Our
  Companies" showcase (later replaced — see §4).
- A full-screen fade transition on route changes (`components/PageTransition.tsx`),
  covering the viewport with the logo while the next page loads in behind it.
- Certification/award logo images were rendering too small and awkwardly
  cropped — fixed by framing them in a consistent white box with
  `object-contain` instead of letting them stretch to fill the card.

## 3. Navigation & content restructuring

Based on client feedback, the navigation was trimmed and reordered several
times as the site's structure settled:
- Removed **News**, **Careers**, **Events**, **Leadership Team**, and
  **CSR/Social Work** from the visible navigation (the underlying pages and
  routes were kept reachable by direct URL rather than deleted, since the
  CMS content behind them still exists).
- Reordered the primary nav to **Home → Our Companies → Industries → About
  → Contact**, with a dropdown under About for Founder Message, Gallery,
  Certifications & Awards, and Partners & Clients.
- The CSR page was later removed entirely (not just unlinked), and its links
  moved into the footer's Quick Links column alongside Team, Founder
  Message, Industries, Gallery, Certifications, and Partners — replacing a
  duplicated row of pill-buttons that had lived on the About page.

## 4. Section-by-section component overhauls

Several sections went through a full redesign, generally in the same
pattern: the client linked a component from **21st.dev** (a directory of
drop-in React/Tailwind components, many sourced from **ui-layouts.com** /
**Motion Primitives**), and it was integrated by fetching the actual
component source (21st.dev's page previews are often incomplete — the CDN-
hosted registry JSON or the upstream GitHub repo has the real code), wiring
real CMS data through it, and adapting it where the demo's assumptions
didn't fit real data (e.g. handling a missing image, or a dynamic-length
list instead of a fixed demo array).

- **Our Companies** (home page + `/companies`): started as a static grid,
  became a GSAP fan-of-cards carousel, and is now the **Linear-card**
  expanding-dialog component (`components/ui/linear-card.tsx`) — clicking a
  card smoothly expands it in place via a shared layout animation into a
  detail view with description, service tags, and a link through to the
  company's own page.
- **Certifications & Awards**: replaced a static grid with an
  **auto-scrolling infinite slider** (`components/ui/infinite-slider.tsx`)
  that pauses on hover.
- **Partners & Clients**: replaced a static grid with a **staggered card
  deck** (`components/ui/stagger-testimonials.tsx`) you cycle through, the
  centered card linking out to the partner's site.
- **Gallery**: replaced a plain grid with a **drag-to-scroll bento layout**
  (`components/ui/bento-gallery.tsx`) with hover reveals and a click-to-
  expand full-size modal.
- **Home page hero**: went from a single static background image to a
  **CMS-configurable auto-advancing slider** (`components/HeroSlider.tsx`,
  backed by a new `heroSlides` media field on the Strapi Home Page single
  type), with left-aligned content over a dark-to-transparent horizontal
  overlay (matching a reference corporate site's hero treatment) instead of
  centered text over a uniform dark overlay.
- **Founder Message**: went through a full redesign into a dark/gold luxury
  spotlight section with a scroll-scrubbed reveal (image opacity/position
  tied directly to scroll progress, not a fixed-length animation), then was
  ultimately recolored to the site's standard green theme so every page
  shares one consistent brand identity rather than a one-off palette.

Every one of these swaps kept (or improved) accessibility and mobile
behavior — several needed dedicated fixes for mobile clipping/overlap after
the initial integration (see §5).

## 5. Bugs found and fixed

Found either from user reports or a proactive full-site audit against the
deployed production site:

- **Mobile fan-carousel clipping** — the GSAP fan-of-cards spread was tuned
  for desktop and clipped past the viewport edge, plus the vertical fan
  offset didn't scale down with the horizontal one, on phone widths. Fixed
  by retuning the responsive multiplier and card sizes per breakpoint.
- **Mobile nav menu not closing on click** — root cause was `PageTransition`
  intercepting every internal link click in the capture phase and calling
  `stopPropagation()`, which silently prevented the click from ever reaching
  React's event system, so no `onClick` handler on any link ever fired
  (including the navbar's own close-menu handler). Fixed by dropping the
  unnecessary `stopPropagation()` — `preventDefault()` alone is enough to
  stop `next/link`'s own navigation.
- **Footer sitting mid-page on short content** (e.g. an empty Gallery) — the
  root layout's wrapper div was missing `flex flex-col`, so `main`'s
  `flex-1` class did nothing; `min-h-screen`'s extra space piled up below
  the footer instead of expanding `main` to push it down. Fixed by adding
  the missing flex classes.
- **Broken-image alt-text overflow** — when a CMS image 404s (see the Render
  ephemeral-storage limitation in the README), the browser's fallback
  alt-text rendering could spill outside its container, most visibly full
  company names overflowing past their circular avatar. Fixed by building
  `components/ImageWithFallback.tsx`, a small client component that swaps to
  a supplied fallback (usually an initials badge matching the existing
  branding) on image load failure, and wiring it into every place a CMS
  image renders.
- Assorted dead-code cleanup passes: an unused CMS fetcher, an unused
  import, a non-functional `lint` script with no ESLint installed, unused
  npm dependencies (`gsap`) left behind after a component was replaced, and
  their supporting CSS.

## 6. Theming and typography

- Site-wide font was changed from Playfair Display to **Inter**.
- The one dark/gold "luxury" treatment on Founder Message was reverted to
  the site's green palette (see §4) so there is exactly one brand palette
  across the whole site — the `solstice` Tailwind color scale, defined once
  and reused everywhere.
- Scroll-triggered reveal animations (`ScrollReveal`) were extended from
  "just grid items" to whole section heading blocks across the home page,
  About, Industries, Companies, Certifications, Partners, and Contact, so
  every section fades/slides into view on scroll rather than only some of
  them — closer to the feel of premium corporate sites like ril.com.

## 7. Where things stand

- Both repos build cleanly (`npm run build`, `tsc --noEmit`) and are deployed
  on Render.
- **Open item**: Render's free-tier ephemeral filesystem means uploaded CMS
  media is lost on every redeploy of the CMS service. This has repeatedly
  caused broken images in production (companies, certifications, partner
  logos, gallery). `ImageWithFallback` makes the failure mode graceful, but
  the underlying fix — moving uploads to Cloudinary/S3, or a paid Render
  persistent disk — hasn't been done yet.
- The Partners page currently has placeholder-looking data in production
  (generic names, a shared test domain) rather than real partner
  information — a content task for the client, not a code issue.
