-- =============================================================================
-- Storage bucket for the media library.
-- Public read (images appear on the public website); only staff can upload,
-- only owners/super admins can delete. File types and size are enforced by
-- the bucket itself, in addition to checks in the admin UI and media table.
-- SVG is deliberately not allowed: SVG files can carry scripts.
-- =============================================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'application/pdf']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Staff need to "see" bucket objects for deletes/replacements to match any
-- rows (Postgres applies SELECT policies to DELETE/UPDATE ... WHERE).
-- The bucket is public anyway, so this reveals nothing extra.
create policy "media bucket: staff read" on storage.objects
  for select to authenticated
  using (bucket_id = 'media' and public.is_staff());

create policy "media bucket: staff upload" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.can_write(array['super_admin', 'owner', 'editor']::public.app_role[]));

create policy "media bucket: owners replace" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and public.can_write(array['super_admin', 'owner']::public.app_role[]))
  with check (bucket_id = 'media' and public.can_write(array['super_admin', 'owner']::public.app_role[]));

create policy "media bucket: owners delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and public.can_write(array['super_admin', 'owner']::public.app_role[]));
