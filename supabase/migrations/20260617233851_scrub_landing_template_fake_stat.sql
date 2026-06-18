-- Remove the fabricated "4.9 stars · 1,200+ reviews" placeholder hint from the
-- landing page template so no fake review stat can be seeded onto a real page.
-- Replaced with an instruction to use real data.
update public.page_templates
set field_schema = replace(
      field_schema::text,
      '4.9 stars · 1,200+ reviews',
      'e.g. your real Google rating + review count'
    )::jsonb
where slug = 'landing';