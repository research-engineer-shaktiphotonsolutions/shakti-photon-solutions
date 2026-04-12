# Supabase Media Setup

This project is now prepared for media management by page, subsection, and simple asset name.

## What You Get

- Media table supports `image`, `video`, and `gif`.
- Strong naming model: `page_slug + subsection_slug + asset_name` is unique.
- Upload path convention is deterministic, so editors only need naming inputs:
  - `site-media/{page_slug}/{subsection_slug}/{asset-name}.{ext}`
- Existing local assets can be seeded to Supabase metadata using generated SQL.

## 1. Run Schema SQL

Run these files in Supabase SQL editor in order:

1. `supabase/schema.sql`
2. `supabase/storage-policies.sql`

## 2. Generate Seed SQL From Current Asset CSV

From project root:

```bash
node scripts/build-supabase-seed.mjs
```

This generates:

- `supabase/seed-media.sql`

Run `supabase/seed-media.sql` in Supabase SQL editor to preload the catalog.

## 3. Upload Files to Storage Bucket

Use bucket `site-media` and upload into folders by page/subsection:

- `home/general/...`
- `electrolyzers/stacks/...`
- `fuelcells/hero/...`
- `team/founders/...`

If you use the `upsert_media_asset` function, `storage_path` is auto-built from:

- `page_slug`
- `subsection_slug`
- `asset_name`
- `file_ext`

## 4. Example: Upsert by Name

```sql
select public.upsert_media_asset(
  'team',
  'founders',
  'sravani',
  'image',
  'jpg',
  'image/jpeg',
  'Sravani founder profile',
  'Founder portrait',
  1,
  null,
  '{"source":"manual-upload"}'::jsonb
);
```

## 5. Query Assets by Page/Subsection

```sql
select *
from public.media_assets
where page_slug = 'team'
  and subsection_slug = 'founders'
  and is_active = true
order by sort_order, created_at;
```

## Notes

- Current frontend still uses local static paths in `src/App.tsx`.
- Supabase storage/catalog is prepared; wiring runtime fetch can be added next.
- For maintainability, keep subsection names stable (`hero`, `gallery`, `founders`, etc.).
