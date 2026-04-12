-- Storage bucket + policies for website media files.
insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update set public = excluded.public;

-- Public read access for website rendering.
drop policy if exists "Public read site media" on storage.objects;
create policy "Public read site media"
  on storage.objects
  for select
  to public
  using (bucket_id = 'site-media');

-- Authenticated users can upload and manage media objects.
drop policy if exists "Authenticated insert site media" on storage.objects;
create policy "Authenticated insert site media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'site-media');

drop policy if exists "Authenticated update site media" on storage.objects;
create policy "Authenticated update site media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'site-media')
  with check (bucket_id = 'site-media');

drop policy if exists "Authenticated delete site media" on storage.objects;
create policy "Authenticated delete site media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'site-media');
