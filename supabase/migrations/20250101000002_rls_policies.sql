-- ============================================================
-- OceanFresh Fish — Row Level Security
-- ============================================================
-- Every application table enforces access at the database
-- level — the /admin routes being auth-gated in Next.js is a
-- UX convenience, not the security boundary. Anonymous/public
-- callers (the "anon" key, used by the public website) can only
-- SELECT rows that are meant to be public; only rows belonging
-- to an active admin_users entry can write anything.
-- ============================================================

-- ------------------------------------------------------------
-- is_admin() — SECURITY DEFINER so it can read admin_users
-- regardless of that table's own RLS policy (which otherwise
-- would only let a user read their own row and would make this
-- check recursive). This is the single source of truth for
-- "is the current session an active admin" — every write policy
-- below calls it instead of re-deriving admin status itself.
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
      and active = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ============================================================
-- admin_users
-- ============================================================
-- Deliberately no INSERT/UPDATE/DELETE policy for any role,
-- including admins: granting admin access is a decision the
-- project owner makes directly in the Supabase Dashboard /
-- SQL editor (see README), not something the CMS can do to
-- itself. A logged-in user may only check their own row (the
-- app uses this to decide whether to show the admin UI at all).
-- ============================================================
alter table public.admin_users enable row level security;

create policy "admin_users_select_self" on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid());

-- ============================================================
-- business_settings
-- ============================================================
alter table public.business_settings enable row level security;

create policy "business_settings_public_read" on public.business_settings
  for select
  to anon, authenticated
  using (true);

create policy "business_settings_admin_write" on public.business_settings
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- fish
-- ============================================================
alter table public.fish enable row level security;

create policy "fish_public_read" on public.fish
  for select
  to anon, authenticated
  using (availability = true or public.is_admin());

create policy "fish_admin_write" on public.fish
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- offers
-- ============================================================
alter table public.offers enable row level security;

create policy "offers_public_read" on public.offers
  for select
  to anon, authenticated
  using (active = true or public.is_admin());

create policy "offers_admin_write" on public.offers
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- videos
-- ============================================================
alter table public.videos enable row level security;

create policy "videos_public_read" on public.videos
  for select
  to anon, authenticated
  using (active = true or public.is_admin());

create policy "videos_admin_write" on public.videos
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- reels
-- ============================================================
alter table public.reels enable row level security;

create policy "reels_public_read" on public.reels
  for select
  to anon, authenticated
  using (active = true or public.is_admin());

create policy "reels_admin_write" on public.reels
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- owner
-- ============================================================
alter table public.owner enable row level security;

create policy "owner_public_read" on public.owner
  for select
  to anon, authenticated
  using (active = true or public.is_admin());

create policy "owner_admin_write" on public.owner
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- faqs
-- ============================================================
alter table public.faqs enable row level security;

create policy "faqs_public_read" on public.faqs
  for select
  to anon, authenticated
  using (active = true or public.is_admin());

create policy "faqs_admin_write" on public.faqs
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- testimonials
-- ============================================================
alter table public.testimonials enable row level security;

create policy "testimonials_public_read" on public.testimonials
  for select
  to anon, authenticated
  using (active = true or public.is_admin());

create policy "testimonials_admin_write" on public.testimonials
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- service_areas
-- ============================================================
alter table public.service_areas enable row level security;

create policy "service_areas_public_read" on public.service_areas
  for select
  to anon, authenticated
  using (active = true or public.is_admin());

create policy "service_areas_admin_write" on public.service_areas
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- homepage_content
-- ============================================================
alter table public.homepage_content enable row level security;

create policy "homepage_content_public_read" on public.homepage_content
  for select
  to anon, authenticated
  using (true);

create policy "homepage_content_admin_write" on public.homepage_content
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
