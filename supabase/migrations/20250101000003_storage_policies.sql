-- ============================================================
-- OceanFresh Fish — Storage buckets & policies
-- ============================================================
-- All buckets are public-READ (these are marketing images/videos
-- meant to be shown on the public site) but admin-only write.
-- Large video files are NOT required to live here — `videos.video_url`
-- and `reels.video_url` accept any external URL (YouTube, Vimeo,
-- Cloudflare Stream, a CDN, ...); `video-uploads`/`reel-uploads`
-- only exist for the "upload a file directly" path in the admin UI.
-- ============================================================

insert into storage.buckets (id, name, public)
values
  ('fish-images', 'fish-images', true),
  ('owner-images', 'owner-images', true),
  ('offer-images', 'offer-images', true),
  ('video-posters', 'video-posters', true),
  ('video-uploads', 'video-uploads', true),
  ('reel-thumbnails', 'reel-thumbnails', true),
  ('reel-uploads', 'reel-uploads', true),
  ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Public read access to every bucket above.
create policy "public_read_site_media" on storage.objects
  for select
  to anon, authenticated
  using (
    bucket_id in (
      'fish-images', 'owner-images', 'offer-images', 'video-posters',
      'video-uploads', 'reel-thumbnails', 'reel-uploads', 'site-assets'
    )
  );

-- Admin-only write access (insert/update/delete) to every bucket above.
create policy "admin_write_site_media" on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id in (
      'fish-images', 'owner-images', 'offer-images', 'video-posters',
      'video-uploads', 'reel-thumbnails', 'reel-uploads', 'site-assets'
    )
    and public.is_admin()
  );

create policy "admin_update_site_media" on storage.objects
  for update
  to authenticated
  using (
    bucket_id in (
      'fish-images', 'owner-images', 'offer-images', 'video-posters',
      'video-uploads', 'reel-thumbnails', 'reel-uploads', 'site-assets'
    )
    and public.is_admin()
  )
  with check (
    bucket_id in (
      'fish-images', 'owner-images', 'offer-images', 'video-posters',
      'video-uploads', 'reel-thumbnails', 'reel-uploads', 'site-assets'
    )
    and public.is_admin()
  );

create policy "admin_delete_site_media" on storage.objects
  for delete
  to authenticated
  using (
    bucket_id in (
      'fish-images', 'owner-images', 'offer-images', 'video-posters',
      'video-uploads', 'reel-thumbnails', 'reel-uploads', 'site-assets'
    )
    and public.is_admin()
  );
