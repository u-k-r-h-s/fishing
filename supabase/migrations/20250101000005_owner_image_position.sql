-- Lets the admin reposition the focal point of the owner's photo (e.g. a
-- portrait where the face isn't centered) instead of always center-cropping.
-- Stored as a CSS object-position value, e.g. '50% 30%'.
alter table public.owner
  add column if not exists image_position text not null default '50% 50%';
