# OceanFresh Fish — Premium Fresh Fish Business Website + Admin CMS

A premium marketing website for a fresh fish business, backed by Supabase and a secure
admin panel. Customers browse the catalogue and contact the business directly via
WhatsApp, phone, or social media — there is no checkout, no customer accounts, no order
management. The site is bilingual (English / Hindi) out of the box, and every piece of
content (fish, offers, videos, reels, owner, FAQs, testimonials, service areas, business
settings, homepage copy) is editable from `/admin` without touching code.

> **This is demo content.** The business name ("OceanFresh Fish"), phone numbers, address,
> social handles, fish names, prices, images, and videos are all placeholders you'll
> replace from the admin panel once it's connected to your own Supabase project.

## Tech Stack

- **Next.js 16** (App Router, React Server Components, Server Actions)
- **React 19** + **TypeScript**
- **Supabase** — Postgres database, Auth, Storage — via `@supabase/supabase-js` +
  `@supabase/ssr`
- **Tailwind CSS v4** (CSS-first theme, see `src/app/globals.css`)
- **GSAP** + **ScrollTrigger** for scroll/entrance animations, the underwater hero, and
  the social phone mockup
- **next/image** for optimized images; plain `<video>` for the video/reel systems

No ORM, no separate CMS product, no heavy admin UI framework — the admin panel is plain
Next.js pages/Server Actions, and the database is governed entirely by Postgres Row Level
Security (RLS).

## Getting Started

```bash
npm install
```

Then **set up Supabase** (see the next section) before running the app — without it,
the public site still builds and renders (with empty content, logged server-side), but
there's nothing to show and the admin panel can't authenticate anyone.

```bash
npm run dev     # after .env.local is set up
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

Open [http://localhost:3000](http://localhost:3000) for the public site (redirects to
`/en` or `/hi`), or [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
for the admin panel.

## Supabase Setup

### 1. Create a project

Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**. Choose
a name, a database password (save it somewhere safe — you won't need it for this app,
but you will if you ever connect another tool directly to Postgres), and a region close
to your users.

### 2. Run the migrations

In the Supabase Dashboard, open **SQL Editor**, and run the four files in
`supabase/migrations/` **in order**:

1. `20250101000001_initial_schema.sql` — every table (`fish`, `offers`, `videos`, `reels`,
   `owner`, `faqs`, `testimonials`, `service_areas`, `business_settings`,
   `homepage_content`, `admin_users`).
2. `20250101000002_rls_policies.sql` — enables Row Level Security everywhere and adds the
   `is_admin()` function every write policy checks.
3. `20250101000003_storage_policies.sql` — creates the storage buckets
   (`fish-images`, `owner-images`, `offer-images`, `video-posters`, `video-uploads`,
   `reel-thumbnails`, `reel-uploads`, `site-assets`) and their public-read/admin-write
   policies.
4. `20250101000004_seed_data.sql` — the current demo content (verbatim from what used to
   be hardcoded in `src/data/*.ts`), so the site looks exactly the same immediately after
   setup.

(If you have the Supabase CLI linked to this project instead — `supabase link` — you can
run `supabase db push` to apply all four at once.)

### 3. Get your API keys

**Project Settings → API.** Copy:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon / publishable key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Put both in a `.env.local` (copy `.env.example`). **Never** copy the `service_role` /
secret key into this project — nothing here needs it, and it must never reach the browser.

### 4. Create your admin login

The CMS deliberately has no self-service "sign up as admin" flow (a public app shouldn't
be able to grant itself admin access). Two steps, both in the Supabase Dashboard:

1. **Authentication → Users → Add user** — create a user with your email + a password.
   Copy the new user's **UID**.
2. **SQL Editor**, run:
   ```sql
   insert into public.admin_users (user_id, email, role, active)
   values ('paste-the-uid-here', 'you@example.com', 'admin', true);
   ```

You can now sign in at `/admin/login`. Repeat step 4 (with a different UID) for any
additional admin.

### 5. (Optional) Local Supabase CLI

`supabase/config.toml` is already set up. If you'd rather develop against a local
Postgres (via Docker) instead of your hosted project: `supabase start`, then point
`.env.local` at the printed local URL/anon key, and run the same four migrations against
it.

## Admin Panel

| Route | What it manages |
| --- | --- |
| `/admin/login` | Email + password sign-in |
| `/admin` | Dashboard — content counts, quick-add links |
| `/admin/fish` | Fish catalogue (bilingual name/description/SEO, price, photo, availability, featured, order) |
| `/admin/offers` | Promotions (bilingual, schedulable by date, banner image) |
| `/admin/videos` | "See the Freshness" videos (upload or external URL, poster) |
| `/admin/reels` | Vertical reels shown in the phone mockup |
| `/admin/owner` | The "Meet the Owner" profile (single record) |
| `/admin/testimonials` | Customer quotes (clearly demo/placeholder — see note below) |
| `/admin/faqs` | FAQ accordion questions & answers |
| `/admin/service-areas` | Areas served (footer + Service Areas section) |
| `/admin/homepage` | Hero copy, freshness promise, process steps, about story, why-choose-us, final CTA |
| `/admin/settings` | Business name, contact info, address, hours, social links, logo/favicon |

Every `/admin/*` route (other than `/admin/login`) redirects to the login page if you're
not signed in (`src/proxy.ts`), and the dashboard layout double-checks the session
server-side. **Neither of those is the real security boundary** — every table has RLS
enabled, and every write policy calls `public.is_admin()`, so even a valid, signed-in,
*non-admin* Supabase user cannot INSERT/UPDATE/DELETE anything; only the `admin_users`
table (populated per the setup steps above) grants that.

> **Testimonials are demo placeholders.** The seeded rows are clearly fictional ("Demo
> Customer A/B/C") — replace them with real, permissioned customer feedback before launch,
> and don't present invented quotes as verified reviews.

## Languages (English / Hindi)

Routes are locale-prefixed: `/en/...` and `/hi/...`. `src/proxy.ts` redirects `/` and any
un-prefixed path to the right locale based on a saved cookie or the browser's
`Accept-Language` header. (The admin panel itself is English-only and lives outside this
routing, at `/admin/...`.)

Two kinds of translated text:

- **Interface chrome** (nav labels, buttons, section eyebrows/headings, accessibility
  strings) — plain UI text that's the same shape for every business. Lives in
  `src/i18n/dictionaries/en.ts` and `src/i18n/dictionaries/hi.ts` (`hi.ts` is type-checked
  against `en.ts`'s shape, so a missing key is a build error, not a silent fallback).
- **Business content** (fish names/descriptions, offer copy, FAQ answers, testimonials,
  about paragraphs, the owner's bio, homepage copy) — edited from `/admin`, stored as
  `_en`/`_hi` column pairs (or `{"en":..., "hi":...}` inside `homepage_content.content`),
  and assembled into `Localized<string>` objects (`{ en, hi }`) by `src/lib/data/*.ts`
  before reaching any component.

Brand names, phone numbers, prices, URLs, and image/video paths are never translated. If
an admin only fills in the English side of a field, the public site falls back to English
for that item rather than showing blank text.

## Content Architecture

```
Supabase (Postgres + Storage)
   ↓
src/lib/data/*.ts   — typed repository functions (getX / adminListX / adminUpsertX / adminDeleteX)
   ↓
Pages (Server Components) — fetch data, pass it down as props
   ↓
UI components — unchanged whether the data came from Supabase or (previously) a static file
```

`src/data/*.ts` still exists — it now holds only **TypeScript type definitions** (`Fish`,
`Offer`, `FAQ`, ...) that `src/lib/data/*.ts` maps Supabase rows into, plus the original
demo arrays for reference (they're no longer imported by any page). This keeps the public
UI components completely unaware of where their data comes from, so the data layer could
be swapped again later without touching a single visual component.

Every `src/lib/data/*.ts` getter catches its own errors and returns an empty/fallback
value instead of throwing — a missing table row, an unreachable database, or unset
Supabase env vars degrade the site to "no content yet" (logged server-side) rather than
crashing a page or the build.

### Media

- **Images** (fish photos, owner portrait, offer banners, video posters, reel thumbnails,
  logo/favicon): uploaded from the admin panel straight to Supabase Storage from the
  browser, authorized by the signed-in admin's own session (RLS on `storage.objects`) —
  see `src/components/admin/ImageUploadField.tsx`.
- **Videos**: `videos.video_url` / `reels.video_url` accept **any URL** — paste a
  YouTube/Vimeo/Cloudflare Stream/CDN link, or upload a short clip (≤50MB) directly via
  the same admin form (`src/components/admin/VideoUploadField.tsx`). Storage is never
  mandatory for video, so a growing library of large files doesn't have to live in (or
  cost) Supabase Storage.

## Project Structure

```
supabase/
  migrations/          Versioned SQL: schema, RLS, storage policies, seed data
  config.toml          Supabase CLI project config

src/
  app/
    [locale]/          Public site routes (En/Hi): home, /fresh-fish, /fresh-fish/[id],
                        /offers, /about, /contact
    admin/
      (auth)/login/    Sign-in page + Server Action
      (dashboard)/     Auth-gated layout (sidebar) + one folder per CMS section,
                        each with page.tsx (list/edit), *Form.tsx (client form),
                        actions.ts (Server Actions calling src/lib/data/*)
    layout.tsx          Root layout — the only <html>/<body> (covers both the public
                        site and /admin); reads the locale from a proxy-set header
    sitemap.ts, robots.ts

  proxy.ts              Locale redirect + Supabase session refresh + /admin auth guard

  lib/
    supabase/           client.ts (browser), server.ts (cookie-based, RSC/Actions),
                        static.ts (cookie-free, for generateStaticParams),
                        middleware.ts (session refresh), database.types.ts, env.ts
    data/               Typed repository functions — the only code that talks to Supabase
    admin/auth.ts       getAdminSession() — is the current user a signed-in, active admin?
    whatsapp.ts, seo.ts, structuredData.ts, utils.ts (all locale-aware)

  i18n/                 locales.ts, dictionaries/{en,hi}.ts, getDictionary.ts, types.ts

  components/
    admin/              Shared CMS UI: sidebar, table, form fields, image/video upload,
                        submit/delete buttons
    layout/, hero/, fish/, video/, social/, offers/, testimonials/, faq/, contact/,
    sections/, animations/, shared/   — public site UI (unchanged by the CMS migration)

  data/                 Type definitions (Fish, Offer, FAQ, ...) + original demo arrays,
                        kept for reference/reseeding — no longer imported by any page
```

## The Hero (`UnderwaterScene`)

The hero background is a layered, code-drawn underwater scene rather than a static photo:
a gradient + CSS-animated caustic light and wave lines, three depth layers of simple SVG
fish driven by GSAP (constant-velocity crossing + independent vertical wobble, looping
off-screen so there's no visible jump-cut), CSS-animated rising bubbles, and a subtle
GSAP `quickTo`-based pointer-parallax on desktop (`pointer: fine` only). Everything here
is ambient/decorative — `prefers-reduced-motion` disables the GSAP fish/parallax
entirely and CSS animations are neutralized globally in `globals.css`.

## SEO

- Per-page, per-locale metadata via the Next.js Metadata API, with a title template so
  every inner page reads `Page Title | {Business Name}`.
- `hreflang` alternates (`en-IN` / `hi-IN` / `x-default`) on every page and every sitemap
  entry.
- Optional `seoTitle` / `seoDescription` overrides (bilingual) per fish, editable from
  `/admin/fish`; sensible localized defaults are generated if left blank.
- JSON-LD structured data (`src/lib/structuredData.ts`): `FoodEstablishment`/
  `LocalBusiness`, `Product` + `Offer` on fish pages, `FAQPage`, and `BreadcrumbList` —
  all built from the real values in `business_settings`/`fish`/`faqs`, never fabricated.
- `sitemap.ts` and `robots.ts` cover both locales and the full (live) fish catalogue.
- Set `NEXT_PUBLIC_SITE_URL` so canonical URLs, sitemap, and structured data point at your
  real domain instead of the placeholder.

## Accessibility & Performance

- Semantic HTML, skip-to-content link, keyboard-accessible accordion/mobile menu/language
  switcher/admin forms, visible focus states, and `prefers-reduced-motion` support.
- Server Components by default; `"use client"` only where interactivity, GSAP, `<video>`
  control, or a Supabase browser upload is required.
- Videos are lazy: nothing loads until the player scrolls near the viewport
  (`IntersectionObserver`), and playback pauses once it scrolls back out — only the
  active social reel ever plays.
- Images are served through `next/image` with responsive `sizes` (Supabase Storage's
  domain is allow-listed in `next.config.ts`).

## Environment Variables

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
NEXT_PUBLIC_SITE_URL=https://www.yourrealdomain.com
```

All three are safe to expose to the browser (see the comments in `.env.example` for why).
**Never** add a `service_role`/secret key or a database password to this project.

## Deployment

1. **Vercel** (simplest): push to a Git repo and import it at [vercel.com/new](https://vercel.com/new).
   Set the three env vars above in the project settings.
2. **Any Node host**: `npm run build` then `npm run start`. The Edge Proxy
   (`src/proxy.ts`) needs a Node/Edge-capable runtime (not a purely static host) since it
   refreshes the Supabase session and guards `/admin` on every request.

Remember to also re-run the Supabase setup steps (migrations, admin user) against your
**production** Supabase project if it's different from the one you developed against.
