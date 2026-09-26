-- Free-text weight info per fish (e.g. "800g - 1.2kg", "Approx 1kg each"),
-- shown alongside the per-unit price — distinct from price_unit, which is
-- only the unit the price is quoted in (kg/piece/etc), not the actual
-- weight of the fish being sold.
alter table public.fish
  add column if not exists weight text not null default '';
