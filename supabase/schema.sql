-- Core schema for page/subsection media management.
create extension if not exists pgcrypto;

create type public.media_asset_kind as enum ('image', 'video', 'gif');

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  subsection_slug text not null,
  asset_name text not null,
  kind public.media_asset_kind not null,
  storage_bucket text not null default 'site-media',
  storage_path text not null,
  mime_type text,
  alt_text text,
  caption text,
  sort_order integer not null default 0,
  source_url text,
  metadata jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint media_assets_name_uniq unique (page_slug, subsection_slug, asset_name),
  constraint media_assets_path_uniq unique (storage_bucket, storage_path)
);

create index if not exists media_assets_page_subsection_idx
  on public.media_assets (page_slug, subsection_slug, sort_order, created_at);

create index if not exists media_assets_kind_idx
  on public.media_assets (kind);

create index if not exists media_assets_active_idx
  on public.media_assets (is_active);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_media_assets_updated_at on public.media_assets;
create trigger trg_media_assets_updated_at
before update on public.media_assets
for each row
execute function public.set_updated_at();

create or replace function public.build_media_storage_path(
  p_page_slug text,
  p_subsection_slug text,
  p_asset_name text,
  p_file_ext text
)
returns text
language sql
immutable
as $$
  select lower(trim(p_page_slug))
    || '/'
    || lower(trim(p_subsection_slug))
    || '/'
    || lower(regexp_replace(trim(p_asset_name), '\\s+', '-', 'g'))
    || '.'
    || lower(trim(p_file_ext));
$$;

create or replace function public.upsert_media_asset(
  p_page_slug text,
  p_subsection_slug text,
  p_asset_name text,
  p_kind public.media_asset_kind,
  p_file_ext text,
  p_mime_type text default null,
  p_alt_text text default null,
  p_caption text default null,
  p_sort_order integer default 0,
  p_source_url text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns public.media_assets
language plpgsql
security definer
set search_path = public
as $$
declare
  v_record public.media_assets;
  v_storage_path text;
begin
  v_storage_path := public.build_media_storage_path(
    p_page_slug,
    p_subsection_slug,
    p_asset_name,
    p_file_ext
  );

  insert into public.media_assets (
    page_slug,
    subsection_slug,
    asset_name,
    kind,
    storage_path,
    mime_type,
    alt_text,
    caption,
    sort_order,
    source_url,
    metadata
  )
  values (
    lower(trim(p_page_slug)),
    lower(trim(p_subsection_slug)),
    trim(p_asset_name),
    p_kind,
    v_storage_path,
    p_mime_type,
    p_alt_text,
    p_caption,
    p_sort_order,
    p_source_url,
    coalesce(p_metadata, '{}'::jsonb)
  )
  on conflict (page_slug, subsection_slug, asset_name)
  do update set
    kind = excluded.kind,
    storage_path = excluded.storage_path,
    mime_type = excluded.mime_type,
    alt_text = excluded.alt_text,
    caption = excluded.caption,
    sort_order = excluded.sort_order,
    source_url = excluded.source_url,
    metadata = excluded.metadata,
    is_active = true,
    updated_at = now()
  returning * into v_record;

  return v_record;
end;
$$;

alter table public.media_assets enable row level security;

drop policy if exists "Public read media catalog" on public.media_assets;
create policy "Public read media catalog"
  on public.media_assets
  for select
  using (is_active = true);

drop policy if exists "Authenticated manage media catalog" on public.media_assets;
create policy "Authenticated manage media catalog"
  on public.media_assets
  for all
  to authenticated
  using (true)
  with check (true);
