-- =============================================================================
-- Website CMS core: staff profiles & roles, content with drafts/publishing and
-- version history, media library metadata, and an audit log.
--
-- Security model
--   * Every table has row level security. The browser only ever holds the
--     public "anon" key or a signed-in user's JWT; all permission checks live
--     here, in the database, so hiding a button is never the only protection.
--   * Roles: super_admin > owner > editor. A signed-in user with no role (or
--     a deactivated one) can read and change nothing.
--   * Publishing, restoring versions and audit writes go through SECURITY
--     DEFINER functions that check the caller's role themselves; the tables do
--     not grant those columns directly.
--   * Two-factor: super admins must be signed in with MFA (aal2) to change
--     anything; anyone else who has enrolled MFA must use it too.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Roles and profiles
-- ---------------------------------------------------------------------------
create type public.app_role as enum ('super_admin', 'owner', 'editor');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text not null default '' check (char_length(full_name) <= 120),
  role public.app_role,                      -- null: no admin access
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.profiles.role is
  'Admin role. Null means the account exists but has no dashboard access. Changed only via set_user_access().';

-- Every new auth user gets a profile with NO role. Access is granted
-- explicitly by a super admin (or, for the very first admin, in SQL).
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    left(coalesce(new.raw_user_meta_data ->> 'full_name', ''), 120)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep the profile e-mail in step with the auth account.
create function public.handle_user_email_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles set email = coalesce(new.email, ''), updated_at = now() where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_email_changed
  after update of email on auth.users
  for each row execute function public.handle_user_email_change();

-- ---------------------------------------------------------------------------
-- Permission helpers (used by policies and functions)
-- ---------------------------------------------------------------------------
create function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select p.role from public.profiles p where p.id = auth.uid() and p.is_active;
$$;

create function public.has_role(allowed public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_app_role() = any (allowed), false);
$$;

-- True when the session meets the two-factor rules described at the top.
create function public.mfa_satisfied()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2'
    or (
      public.current_app_role() is distinct from 'super_admin'
      and not exists (
        select 1 from auth.mfa_factors f where f.user_id = auth.uid() and f.status = 'verified'
      )
    );
$$;

-- Staff who may change anything at all.
create function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_role(array['super_admin', 'owner', 'editor']::public.app_role[]);
$$;

create function public.can_write(allowed public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.has_role(allowed) and public.mfa_satisfied();
$$;

-- ---------------------------------------------------------------------------
-- Audit log
-- ---------------------------------------------------------------------------
create table public.audit_log (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  actor_id uuid references public.profiles (id) on delete set null,
  actor_email text not null default '',
  action text not null,
  entity_type text not null,
  entity_id text,
  summary text not null,
  details jsonb not null default '{}'::jsonb
);

create index audit_log_occurred_at_idx on public.audit_log (occurred_at desc);
create index audit_log_entity_idx on public.audit_log (entity_type, entity_id);

-- Internal: only callable from other SECURITY DEFINER functions/triggers.
create function public.write_audit(
  p_action text,
  p_entity_type text,
  p_entity_id text,
  p_summary text,
  p_details jsonb default '{}'::jsonb,
  p_actor uuid default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_actor uuid := coalesce(p_actor, auth.uid());
  v_email text;
begin
  select email into v_email from public.profiles where id = v_actor;
  insert into public.audit_log (actor_id, actor_email, action, entity_type, entity_id, summary, details)
  values (v_actor, coalesce(v_email, 'system'), p_action, p_entity_type, p_entity_id, p_summary, coalesce(p_details, '{}'::jsonb));
end;
$$;

-- Top-level fields whose values differ (names only, never the content itself).
create function public.changed_fields(old_doc jsonb, new_doc jsonb)
returns text[]
language sql
immutable
set search_path = ''
as $$
  select coalesce(array_agg(k order by k), '{}')
  from (
    select key as k from jsonb_object_keys(coalesce(old_doc, '{}'::jsonb) || coalesce(new_doc, '{}'::jsonb)) as key
  ) keys
  where (old_doc -> k) is distinct from (new_doc -> k);
$$;

-- ---------------------------------------------------------------------------
-- Content: one row per editable area of the site (page, settings, SEO)
-- ---------------------------------------------------------------------------
create table public.content_entries (
  key text primary key check (key ~ '^[a-zA-Z][a-zA-Z0-9_-]{1,63}$'),
  title text not null check (char_length(title) between 1 and 120),
  kind text not null default 'page' check (kind in ('page', 'settings', 'seo')),
  draft jsonb not null check (jsonb_typeof(draft) = 'object' and octet_length(draft::text) <= 500000),
  published jsonb check (published is null or jsonb_typeof(published) = 'object'),
  draft_updated_at timestamptz not null default now(),
  draft_updated_by uuid references public.profiles (id) on delete set null,
  published_at timestamptz,
  published_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

comment on table public.content_entries is
  'Editable site content. "draft" is what editors work on; "published" is what the public site is built from.';

create table public.content_versions (
  id bigint generated always as identity primary key,
  entry_key text not null references public.content_entries (key) on delete cascade,
  data jsonb not null,
  note text not null default '' check (char_length(note) <= 500),
  created_at timestamptz not null default now(),
  created_by uuid references public.profiles (id) on delete set null
);

create index content_versions_entry_idx on public.content_versions (entry_key, created_at desc);

-- Who may edit which kind of entry.
create function public.content_editor_roles(p_kind text)
returns public.app_role[]
language sql
immutable
set search_path = ''
as $$
  select case
    when p_kind = 'page' then array['super_admin', 'owner', 'editor']::public.app_role[]
    else array['super_admin', 'owner']::public.app_role[]
  end;
$$;

-- Stamp who/when on every draft change and audit it.
create function public.content_entries_before_write()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' or new.draft is distinct from old.draft or new.title is distinct from old.title then
    new.draft_updated_at := now();
    new.draft_updated_by := auth.uid();
  end if;
  return new;
end;
$$;

create trigger content_entries_stamp
  before insert or update on public.content_entries
  for each row execute function public.content_entries_before_write();

create function public.content_entries_audit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    perform public.write_audit('content.created', 'content', new.key, format('Created "%s"', new.title));
  elsif tg_op = 'DELETE' then
    perform public.write_audit('content.deleted', 'content', old.key, format('Deleted "%s"', old.title));
    return old;
  elsif new.draft is distinct from old.draft then
    perform public.write_audit(
      'content.draft_saved', 'content', new.key,
      format('Saved draft of "%s"', new.title),
      jsonb_build_object('fields', to_jsonb(public.changed_fields(old.draft, new.draft)))
    );
  end if;
  return new;
end;
$$;

create trigger content_entries_audit
  after insert or update or delete on public.content_entries
  for each row execute function public.content_entries_audit();

-- Publish the current draft: copies it to "published", records a version.
create function public.publish_content(p_key text, p_note text default '')
returns public.content_versions
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_entry public.content_entries;
  v_version public.content_versions;
begin
  if not public.can_write(array['super_admin', 'owner']::public.app_role[]) then
    raise exception 'Only the website owner or a super administrator can publish.' using errcode = '42501';
  end if;

  select * into v_entry from public.content_entries where key = p_key for update;
  if not found then
    raise exception 'Content "%" does not exist.', p_key using errcode = 'P0002';
  end if;

  update public.content_entries
     set published = v_entry.draft, published_at = now(), published_by = auth.uid()
   where key = p_key;

  insert into public.content_versions (entry_key, data, note, created_by)
  values (p_key, v_entry.draft, left(coalesce(p_note, ''), 500), auth.uid())
  returning * into v_version;

  perform public.write_audit(
    'content.published', 'content', p_key,
    case when v_entry.published is null
      then format('Published "%s" from the dashboard for the first time', v_entry.title)
      else format('Published "%s"', v_entry.title)
    end,
    jsonb_build_object(
      'version_id', v_version.id,
      -- First publish: there is no earlier dashboard version to compare with.
      'fields', case when v_entry.published is null then null else to_jsonb(public.changed_fields(v_entry.published, v_entry.draft)) end,
      'note', left(coalesce(p_note, ''), 500)
    )
  );
  return v_version;
end;
$$;

-- Copy an earlier published version back into the draft (publish separately).
create function public.restore_content_version(p_version_id bigint)
returns public.content_entries
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_version public.content_versions;
  v_entry public.content_entries;
begin
  if not public.can_write(array['super_admin', 'owner']::public.app_role[]) then
    raise exception 'Only the website owner or a super administrator can restore versions.' using errcode = '42501';
  end if;

  select * into v_version from public.content_versions where id = p_version_id;
  if not found then
    raise exception 'Version % does not exist.', p_version_id using errcode = 'P0002';
  end if;

  update public.content_entries set draft = v_version.data where key = v_version.entry_key
  returning * into v_entry;

  perform public.write_audit(
    'content.version_restored', 'content', v_version.entry_key,
    format('Restored version from %s into the draft of "%s"', to_char(v_version.created_at at time zone 'America/New_York', 'Mon DD, YYYY HH12:MI AM'), v_entry.title),
    jsonb_build_object('version_id', p_version_id)
  );
  return v_entry;
end;
$$;

-- Discard unpublished changes: draft goes back to what is live.
create function public.discard_content_draft(p_key text)
returns public.content_entries
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_entry public.content_entries;
begin
  select * into v_entry from public.content_entries where key = p_key;
  if not found then
    raise exception 'Content "%" does not exist.', p_key using errcode = 'P0002';
  end if;
  if not public.can_write(public.content_editor_roles(v_entry.kind)) then
    raise exception 'You do not have permission to change "%".', v_entry.title using errcode = '42501';
  end if;
  if v_entry.published is null then
    raise exception '"%" has never been published, so there is nothing to go back to.', v_entry.title using errcode = '22023';
  end if;
  update public.content_entries set draft = v_entry.published where key = p_key returning * into v_entry;
  return v_entry;
end;
$$;

-- What the public build reads (anon key). Only published data, nothing else.
create function public.get_published_content()
returns table (key text, data jsonb)
language sql
stable
security definer
set search_path = ''
as $$
  select e.key, e.published from public.content_entries e where e.published is not null order by e.key;
$$;

-- ---------------------------------------------------------------------------
-- Media library (files live in the "media" storage bucket)
-- ---------------------------------------------------------------------------
create table public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique check (storage_path ~ '^[a-z0-9][a-z0-9/._-]{0,250}$'),
  public_url text not null check (public_url ~ '^https://'),
  file_name text not null check (char_length(file_name) between 1 and 200),
  mime_type text not null check (mime_type in ('image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'application/pdf')),
  size_bytes integer not null check (size_bytes between 1 and 10485760),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  alt_text text not null default '' check (char_length(alt_text) <= 300),
  folder text not null default 'general' check (folder ~ '^[a-z0-9-]{1,40}$'),
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index media_created_at_idx on public.media (created_at desc);

create function public.media_audit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    perform public.write_audit('media.uploaded', 'media', new.id::text, format('Uploaded %s', new.file_name));
  elsif tg_op = 'DELETE' then
    perform public.write_audit('media.deleted', 'media', old.id::text, format('Deleted %s', old.file_name));
    return old;
  elsif new.alt_text is distinct from old.alt_text or new.folder is distinct from old.folder then
    perform public.write_audit('media.updated', 'media', new.id::text, format('Updated details of %s', new.file_name));
  end if;
  return new;
end;
$$;

create function public.media_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.uploaded_by := auth.uid();
  end if;
  new.updated_at := now();
  return new;
end;
$$;

create trigger media_stamp before insert or update on public.media
  for each row execute function public.media_before_write();
create trigger media_audit after insert or update or delete on public.media
  for each row execute function public.media_audit();

-- ---------------------------------------------------------------------------
-- User administration (called by the admin-users Netlify Function with the
-- service role key, after it has verified the caller is a super admin).
-- ---------------------------------------------------------------------------
create function public.set_user_access(
  p_actor uuid,
  p_user uuid,
  p_role public.app_role,
  p_active boolean
)
returns public.profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_before public.profiles;
  v_after public.profiles;
  v_actor_role public.app_role;
begin
  select role into v_actor_role from public.profiles where id = p_actor and is_active;
  if v_actor_role is distinct from 'super_admin' then
    raise exception 'Only a super administrator can change user access.' using errcode = '42501';
  end if;

  select * into v_before from public.profiles where id = p_user for update;
  if not found then
    raise exception 'User not found.' using errcode = 'P0002';
  end if;

  -- Never allow the last active super admin to be demoted or deactivated.
  if v_before.role = 'super_admin' and v_before.is_active
     and (p_role is distinct from 'super_admin' or not p_active)
     and (select count(*) from public.profiles where role = 'super_admin' and is_active) <= 1 then
    raise exception 'At least one active super administrator is required.' using errcode = '23514';
  end if;

  update public.profiles set role = p_role, is_active = p_active, updated_at = now()
   where id = p_user returning * into v_after;

  perform public.write_audit(
    'user.access_changed', 'user', p_user::text,
    format('Changed access for %s: %s, %s',
      v_after.email,
      coalesce(v_after.role::text, 'no role'),
      case when v_after.is_active then 'active' else 'deactivated' end),
    jsonb_build_object(
      'before', jsonb_build_object('role', v_before.role, 'active', v_before.is_active),
      'after', jsonb_build_object('role', v_after.role, 'active', v_after.is_active)
    ),
    p_actor
  );
  return v_after;
end;
$$;

create function public.record_user_invite(p_actor uuid, p_user uuid, p_email text, p_role public.app_role)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform public.write_audit('user.invited', 'user', p_user::text, format('Invited %s as %s', p_email, p_role), '{}'::jsonb, p_actor);
end;
$$;

-- Users may change their own display name, nothing else about their profile.
create function public.update_my_name(p_full_name text)
returns public.profiles
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'Not signed in.' using errcode = '42501';
  end if;
  update public.profiles set full_name = left(trim(coalesce(p_full_name, '')), 120), updated_at = now()
   where id = auth.uid() returning * into v_profile;
  return v_profile;
end;
$$;

-- Display names for "who changed this" in history views. Staff only; returns
-- names and e-mails of people with dashboard access, nothing else.
create function public.staff_directory()
returns table (id uuid, display_name text)
language sql
stable
security definer
set search_path = ''
as $$
  select p.id, coalesce(nullif(p.full_name, ''), p.email)
  from public.profiles p
  where public.is_staff() and p.role is not null;
$$;

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.content_entries enable row level security;
alter table public.content_versions enable row level security;
alter table public.media enable row level security;
alter table public.audit_log enable row level security;

-- profiles: see yourself; super admins see everyone. No direct writes.
create policy "profiles: read own" on public.profiles
  for select to authenticated using (id = auth.uid());
create policy "profiles: super admins read all" on public.profiles
  for select to authenticated using (public.has_role(array['super_admin']::public.app_role[]));

-- content_entries
create policy "content: staff read" on public.content_entries
  for select to authenticated using (public.is_staff());
create policy "content: create" on public.content_entries
  for insert to authenticated with check (public.can_write(public.content_editor_roles(kind)));
create policy "content: edit drafts" on public.content_entries
  for update to authenticated
  using (public.can_write(public.content_editor_roles(kind)))
  with check (public.can_write(public.content_editor_roles(kind)));
create policy "content: super admins delete" on public.content_entries
  for delete to authenticated using (public.can_write(array['super_admin']::public.app_role[]));

-- content_versions: read-only history for staff.
create policy "versions: staff read" on public.content_versions
  for select to authenticated using (public.is_staff());

-- media
create policy "media: staff read" on public.media
  for select to authenticated using (public.is_staff());
create policy "media: staff upload" on public.media
  for insert to authenticated with check (public.can_write(array['super_admin', 'owner', 'editor']::public.app_role[]));
create policy "media: staff edit details" on public.media
  for update to authenticated
  using (public.can_write(array['super_admin', 'owner', 'editor']::public.app_role[]))
  with check (public.can_write(array['super_admin', 'owner', 'editor']::public.app_role[]));
create policy "media: owners delete" on public.media
  for delete to authenticated using (public.can_write(array['super_admin', 'owner']::public.app_role[]));

-- audit_log: super admins see everything; owners see content & media history.
create policy "audit: super admins read" on public.audit_log
  for select to authenticated using (public.has_role(array['super_admin']::public.app_role[]));
create policy "audit: owners read content history" on public.audit_log
  for select to authenticated
  using (public.has_role(array['owner']::public.app_role[]) and entity_type in ('content', 'media'));

-- ---------------------------------------------------------------------------
-- Grants. Supabase grants broad table privileges to anon/authenticated by
-- default; replace them with exactly what the policies above expect.
-- ---------------------------------------------------------------------------
revoke all on public.profiles, public.content_entries, public.content_versions, public.media, public.audit_log
  from anon, authenticated;

grant select on public.profiles to authenticated;

grant select, delete on public.content_entries to authenticated;
grant insert (key, title, kind, draft) on public.content_entries to authenticated;
grant update (title, draft) on public.content_entries to authenticated;

grant select on public.content_versions to authenticated;

grant select, delete on public.media to authenticated;
grant insert (storage_path, public_url, file_name, mime_type, size_bytes, width, height, alt_text, folder) on public.media to authenticated;
grant update (alt_text, folder) on public.media to authenticated;

grant select on public.audit_log to authenticated;

-- Functions: lock everything down, then open what clients may call.
revoke execute on all functions in schema public from public, anon, authenticated;

grant execute on function public.get_published_content() to anon, authenticated;
grant execute on function
  public.current_app_role(),
  public.has_role(public.app_role[]),
  public.mfa_satisfied(),
  public.is_staff(),
  public.can_write(public.app_role[]),
  public.content_editor_roles(text),
  public.publish_content(text, text),
  public.restore_content_version(bigint),
  public.discard_content_draft(text),
  public.update_my_name(text),
  public.staff_directory()
to authenticated;
-- set_user_access / record_user_invite / write_audit: service role only.
grant execute on function
  public.set_user_access(uuid, uuid, public.app_role, boolean),
  public.record_user_invite(uuid, uuid, text, public.app_role),
  public.write_audit(text, text, text, text, jsonb, uuid)
to service_role;
