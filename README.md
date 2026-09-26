# OceanFresh Fish — Premium Fresh Fish Business Website

A premium, database-free marketing website for a fresh fish business. Customers browse
the catalogue and contact the business directly via WhatsApp, phone, or social media —
there is no checkout, no accounts, and no backend to maintain.

> **This is demo content.** The business name ("OceanFresh Fish"), phone numbers, address,
> social handles, fish names, prices, and images are all placeholders. See
> [Editing Content](#editing-content) below for where to change everything.

## Tech Stack

- **Next.js 16** (App Router, React Server Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first theme, see `src/app/globals.css`)
- **GSAP** + **ScrollTrigger** for scroll/entrance animations
- **next/image** for optimized images

No database, ORM, authentication, payment gateway, or admin backend — all content lives
in plain TypeScript data files under `src/data/`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

## Editing Content

Everything a business owner would need to change lives in `src/data/`. Edit these files
and the whole site updates — no component code needs to change.

| What to change | File |
| --- | --- |
| Business name, tagline, phone, WhatsApp, address, hours, social links | [`src/data/business.ts`](src/data/business.ts) |
| Fish catalogue (name, price, description, availability, featured) | [`src/data/fish.ts`](src/data/fish.ts) |
| Homepage / offers page promotions | [`src/data/offers.ts`](src/data/offers.ts) |
| FAQ accordion questions & answers | [`src/data/faqs.ts`](src/data/faqs.ts) |
| Customer testimonials (demo placeholders — not real reviews) | [`src/data/testimonials.ts`](src/data/testimonials.ts) |
| Areas served (footer + service-areas section) | [`src/data/serviceAreas.ts`](src/data/serviceAreas.ts) |
| Header/footer navigation links | [`src/data/navigation.ts`](src/data/navigation.ts) |
| Hero headline, About page copy, "Why Choose Us" cards | [`src/data/content.ts`](src/data/content.ts) |

### Images

Images live under `public/images/` and are referenced by path from the data files:

```
public/images/
  fish/    → one file per fish (rohu.svg, katla.svg, prawns.svg, ...)
  hero/    → homepage hero image
  about/   → About section image
  offers/  → reserved for future offer banners
```

The current images are **generated SVG placeholders** (gradient + line-art), created by
`scripts/generate-placeholder-images.mjs`, so the site looks finished without relying on
external image URLs. Replace them with real photography whenever you're ready — keep the
same filenames (or update the `image` field in `src/data/fish.ts` / `src/data/content.ts`
if you rename them), and `next/image` will pick them up automatically. JPG, PNG, or WebP
all work.

### Adding or removing a fish

Add a new object to the `fish` array in `src/data/fish.ts` with a unique `id` — this
becomes the URL slug (`/fresh-fish/{id}`). A detail page and catalogue card are generated
automatically; no routing code is needed. Delete an object to remove that fish.

### WhatsApp messages

Message text is generated in `src/lib/whatsapp.ts` from `business.whatsapp` plus the fish
name (or a generic enquiry message on non-product pages). Edit that file to change the
wording.

## Project Structure

```
src/
  app/                 Routes (App Router): home, /fresh-fish, /fresh-fish/[id],
                        /offers, /about, /contact, sitemap.ts, robots.ts
  components/
    layout/            Navbar, MobileMenu, Footer, MobileContactBar
    hero/               Homepage hero
    fish/              FishCard, FishGrid
    offers/            OfferCard, OffersSection
    testimonials/      TestimonialCard, TestimonialsSection
    faq/               FAQAccordion, FAQSection
    contact/           ContactSection
    sections/          About, Why Choose Us, Service Areas, CTA
    animations/        ScrollReveal, ImageReveal (GSAP wrappers)
    shared/            Buttons, icons, JSON-LD, layout primitives
  data/                Editable content (see table above)
  lib/                 whatsapp.ts, seo.ts, structuredData.ts, utils.ts
```

## SEO

- Per-page metadata via the Next.js Metadata API (`generateMetadata` for fish detail
  pages, static `metadata` exports elsewhere), with a title template so every page reads
  `Page Title | OceanFresh Fish`.
- Optional `seoTitle` / `seoDescription` overrides on any fish in `fish.ts`; sensible
  defaults are generated if omitted.
- JSON-LD structured data (`src/lib/structuredData.ts`): `FoodEstablishment`/
  `LocalBusiness`, `Product` + `Offer` on fish pages, `FAQPage`, and `BreadcrumbList` —
  all built from the real values in `business.ts`, never fabricated.
- `sitemap.ts` and `robots.ts` are generated from the fish catalogue automatically.
- Set `NEXT_PUBLIC_SITE_URL` (see below) so canonical URLs, sitemap, and structured data
  point at your real domain instead of the placeholder.

## Accessibility & Performance

- Semantic HTML, skip-to-content link, keyboard-accessible accordion and mobile menu,
  visible focus states, and `prefers-reduced-motion` support (GSAP animations are skipped
  entirely for users who request reduced motion).
- Server Components by default; `"use client"` is only used where interactivity or GSAP
  is required (mobile menu, accordion, animation wrappers).
- Images are served through `next/image` with responsive `sizes`.

## Environment Variables

Create a `.env.local` (optional) to set the production URL used for canonical links,
sitemap, and structured data:

```
NEXT_PUBLIC_SITE_URL=https://www.yourrealdomain.com
```

Without it, the site falls back to a placeholder URL — fine for local development.

## Deployment

This is a standard Next.js app with no server-side database, so it deploys anywhere that
supports Next.js:

1. **Vercel** (simplest): push to a Git repo and import it at [vercel.com/new](https://vercel.com/new).
2. **Any Node host**: `npm run build` then `npm run start`.
3. **Static-friendly hosts**: since there's no dynamic data fetching, the app builds
   almost entirely to static HTML (see the route list printed after `npm run build`).

Remember to set `NEXT_PUBLIC_SITE_URL` on whichever platform you deploy to.
