-- Remove fabricated review/rating/GBP data. Ratings and review counts must be
-- real (from Google data) or honestly empty. Placeholder GBP IDs and the
-- placeholder Beltway phone are cleared until real values are supplied.
update public.locations set rating = null, review_count = 0, gbp_id = null;
update public.locations set phone = '' where slug = 'beltway-marketplace';