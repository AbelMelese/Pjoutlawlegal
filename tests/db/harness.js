/**
 * Runs the real Supabase migrations against PGlite (Postgres compiled to
 * WebAssembly) with a minimal stand-in for the parts of Supabase they rely on:
 * the anon/authenticated/service_role roles, auth.users, auth.mfa_factors,
 * auth.uid()/auth.jwt(), storage buckets/objects, and Supabase's default grants.
 *
 * Queries run as a specific role with a specific JWT, exactly like PostgREST
 * does, so row level security and grants are genuinely exercised.
 */
import { PGlite } from '@electric-sql/pglite';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const migrationsDir = fileURLToPath(new URL('../../supabase/migrations/', import.meta.url));

const SUPABASE_STUB = `
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;

create schema auth;
create schema storage;
grant usage on schema public, auth, storage to anon, authenticated, service_role;

create table auth.users (
  id uuid primary key default gen_random_uuid(),
  email text,
  raw_user_meta_data jsonb not null default '{}'::jsonb,
  raw_app_meta_data jsonb not null default '{}'::jsonb
);
create table auth.mfa_factors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null
);

create function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb
$$;
create function auth.uid() returns uuid language sql stable as $$
  select nullif(auth.jwt() ->> 'sub', '')::uuid
$$;
grant execute on function auth.jwt(), auth.uid() to anon, authenticated, service_role;

create table storage.buckets (
  id text primary key,
  name text not null,
  public boolean not null default false,
  file_size_limit bigint,
  allowed_mime_types text[]
);
create table storage.objects (
  id uuid primary key default gen_random_uuid(),
  bucket_id text references storage.buckets (id),
  name text not null,
  owner uuid
);
alter table storage.objects enable row level security;
grant select, insert, update, delete on storage.objects to anon, authenticated, service_role;
grant select on storage.buckets to anon, authenticated, service_role;

-- Supabase's default privileges for objects created in public.
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
`;

export async function createDatabase() {
  const db = new PGlite();
  await db.exec(SUPABASE_STUB);
  const files = (await readdir(migrationsDir)).filter((f) => f.endsWith('.sql')).sort();
  for (const file of files) {
    const sql = await readFile(path.join(migrationsDir, file), 'utf8');
    try {
      await db.exec(sql);
    } catch (error) {
      throw new Error(`Migration ${file} failed: ${error.message}`);
    }
  }
  return new TestDb(db);
}

class TestDb {
  constructor(db) {
    this.db = db;
  }

  /** Run as the database owner (like the Supabase SQL editor). */
  async asAdmin(fn) {
    await this.db.exec(`reset role; select set_config('request.jwt.claims', '', false);`);
    return fn(this.db);
  }

  async #as(role, claims, fn) {
    await this.db.exec('reset role');
    await this.db.query(`select set_config('request.jwt.claims', $1, false)`, [claims ? JSON.stringify(claims) : '']);
    await this.db.exec(`set role ${role}`);
    try {
      return await fn(this.db);
    } finally {
      await this.db.exec('reset role');
    }
  }

  asAnon(fn) {
    return this.#as('anon', { role: 'anon' }, fn);
  }

  asService(fn) {
    return this.#as('service_role', { role: 'service_role' }, fn);
  }

  asUser(user, fn, { aal = 'aal1' } = {}) {
    return this.#as('authenticated', { sub: user.id, role: 'authenticated', aal }, fn);
  }

  /** Create an auth user (the trigger creates the profile) and optionally give it a role. */
  async createUser(email, role = null, { active = true, mfa = false } = {}) {
    return this.asAdmin(async (db) => {
      const { rows } = await db.query('insert into auth.users (email) values ($1) returning id', [email]);
      const id = rows[0].id;
      await db.query('update public.profiles set role = $2, is_active = $3 where id = $1', [id, role, active]);
      if (mfa) await db.query(`insert into auth.mfa_factors (user_id, status) values ($1, 'verified')`, [id]);
      return { id, email };
    });
  }
}

export async function expectDenied(promise, pattern = /permission denied|row-level security|violates|only|not exist|required|42501/i) {
  try {
    await promise;
  } catch (error) {
    if (!pattern.test(error.message)) throw new Error(`Denied with an unexpected error: ${error.message}`);
    return error;
  }
  throw new Error('Expected the database to refuse this, but it succeeded.');
}
