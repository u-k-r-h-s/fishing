-- ============================================================
-- OceanFresh Fish — Initial schema
-- ============================================================
-- Creates every application table used by the public website
-- and the admin CMS, plus the admin_users table used to gate
-- write access (see 20250101000002_rls_policies.sql).
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- updated_at trigger helper
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------
-- admin_users — authorization source of truth (see is_admin()
-- in the RLS migration). Rows are created manually by the
-- project owner after a user signs up; the CMS never lets
-- itself grant admin access.
-- ------------------------------------------------------------
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'admin' check (role in ('admin')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- business_settings — single editable row of business-wide
-- contact/identity info (there is intentionally no UI to add a
-- second row; the app always reads the most recently updated one).
-- ------------------------------------------------------------
create table if not exists public.business_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'OceanFresh Fish',
  tagline_en text not null default '',
  tagline_hi text not null default '',
  description_en text not null default '',
  description_hi text not null default '',
  phone text not null default '',
  whatsapp_number text not null default '',
  email text not null default '',
  address text not null default '',
  city text not null default '',
  state text not null default '',
  postal_code text not null default '',
  country text not null default '',
  currency_symbol text not null default '₹',
  opening_hours jsonb not null default '[]'::jsonb, -- [{ "days": "Mon-Sat", "hours": "6am-8pm" }]
  google_maps_url text not null default '',
  instagram_url text not null default '',
  facebook_url text not null default '',
  youtube_url text not null default '',
  other_social_links jsonb not null default '[]'::jsonb, -- [{ "label": "...", "url": "..." }]
  logo_url text not null default '',
  favicon_url text not null default '',
  default_language text not null default 'en' check (default_language in ('en', 'hi')),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.business_settings
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- fish — the product catalogue
-- ------------------------------------------------------------
create table if not exists public.fish (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_hi text not null default '',
  short_description_en text not null default '',
  short_description_hi text not null default '',
  description_en text not null default '',
  description_hi text not null default '',
  freshness_note_en text not null default '',
  freshness_note_hi text not null default '',
  price numeric(10, 2) not null default 0,
  price_unit text not null default 'kg',
  image_url text not null default '',
  gallery jsonb not null default '[]'::jsonb, -- string[] of image urls
  availability boolean not null default true,
  featured boolean not null default false,
  display_order integer not null default 0,
  seo_title_en text not null default '',
  seo_title_hi text not null default '',
  seo_description_en text not null default '',
  seo_description_hi text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists fish_display_order_idx on public.fish (display_order);
create index if not exists fish_featured_idx on public.fish (featured) where featured = true;

create trigger set_updated_at before update on public.fish
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- offers — homepage / /offers promotions
-- ------------------------------------------------------------
create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_hi text not null default '',
  description_en text not null default '',
  description_hi text not null default '',
  discount_text_en text not null default '', -- e.g. "This Weekend" badge text
  discount_text_hi text not null default '',
  image_url text not null default '',
  start_date date,
  end_date date,
  active boolean not null default true,
  featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists offers_display_order_idx on public.offers (display_order);

create trigger set_updated_at before update on public.offers
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- videos — "See the Freshness" storytelling section
-- ------------------------------------------------------------
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_hi text not null default '',
  description_en text not null default '',
  description_hi text not null default '',
  video_url text not null,
  poster_url text not null default '',
  video_type text not null default 'uploaded' check (video_type in ('uploaded', 'external')),
  active boolean not null default true,
  featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists videos_display_order_idx on public.videos (display_order);

create trigger set_updated_at before update on public.videos
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- reels — "Follow the Freshness" phone-mockup social section
-- ------------------------------------------------------------
create table if not exists public.reels (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_hi text not null default '',
  caption_en text not null default '',
  caption_hi text not null default '',
  video_url text not null,
  thumbnail_url text not null default '',
  platform text not null default 'instagram' check (platform in ('instagram', 'facebook', 'youtube')),
  social_url text not null default '',
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists reels_display_order_idx on public.reels (display_order);

create trigger set_updated_at before update on public.reels
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- owner — "Meet the People Behind the Catch" section
-- ------------------------------------------------------------
create table if not exists public.owner (
  id uuid primary key default gen_random_uuid(),
  name_en text not null default '',
  name_hi text not null default '',
  role_en text not null default '',
  role_hi text not null default '',
  bio_en text not null default '',
  bio_hi text not null default '',
  image_url text not null default '',
  instagram_url text not null default '',
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.owner
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- faqs
-- ------------------------------------------------------------
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question_en text not null,
  question_hi text not null default '',
  answer_en text not null default '',
  answer_hi text not null default '',
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists faqs_display_order_idx on public.faqs (display_order);

create trigger set_updated_at before update on public.faqs
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- testimonials
-- ------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  role_en text not null default '',
  role_hi text not null default '',
  content_en text not null default '',
  content_hi text not null default '',
  rating smallint not null default 5 check (rating between 1 and 5),
  image_url text not null default '',
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_display_order_idx on public.testimonials (display_order);

create trigger set_updated_at before update on public.testimonials
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- service_areas
-- ------------------------------------------------------------
create table if not exists public.service_areas (
  id uuid primary key default gen_random_uuid(),
  name_en text not null,
  name_hi text not null default '',
  description_en text not null default '',
  description_hi text not null default '',
  active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_areas_display_order_idx on public.service_areas (display_order);

create trigger set_updated_at before update on public.service_areas
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- homepage_content — flexible bilingual copy blocks for
-- sections that aren't a repeatable catalogue (hero, freshness
-- promise, process steps, about, why-choose-us, final CTA).
-- Each row is one named section; `content` holds that section's
-- fields as JSON, e.g.:
--   section_key = 'hero'
--   content = {
--     "eyebrow": {"en": "...", "hi": "..."},
--     "headline_line1": {"en": "...", "hi": "..."},
--     "headline_line2": {"en": "...", "hi": "..."},
--     "subheading": {"en": "...", "hi": "..."},
--     "cta_primary_label": {"en": "...", "hi": "..."},
--     "cta_secondary_label": {"en": "...", "hi": "..."}
--   }
-- See 20250101000004_seed_data.sql for the full shape of every
-- section, and src/lib/data/homepage.ts for the TypeScript types
-- that validate/read it.
-- ------------------------------------------------------------
create table if not exists public.homepage_content (
  id uuid primary key default gen_random_uuid(),
  section_key text not null unique,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.homepage_content
  for each row execute function public.set_updated_at();
