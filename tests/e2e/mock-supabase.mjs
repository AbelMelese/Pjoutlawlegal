#!/usr/bin/env node
/**
 * TEST DOUBLE, for local end-to-end testing only. Never deployed.
 *
 * A small in-memory imitation of the parts of the Supabase API the admin
 * uses (auth with TOTP MFA, PostgREST tables/RPCs, storage), plus a static
 * server for dist/ with stand-ins for the /admin-api functions. It does NOT
 * enforce row level security: permissions are covered by tests/db against
 * the real migrations. This exists so the real built admin UI can be clicked
 * through in a browser without a live Supabase project.
 *
 *   node tests/e2e/mock-supabase.mjs   ->  site on :4173, "Supabase" on :54321
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const SITE_PORT = Number(process.env.SITE_PORT || 4173);
const API_PORT = Number(process.env.API_PORT || 54321);
const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const API = `http://localhost:${API_PORT}`;

const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
const now = () => new Date().toISOString();

// ---------------------------------------------------------------- data
const users = new Map();
const addUser = (email, password, role, fullName) => {
  const id = randomUUID();
  users.set(id, { id, email, password, role, full_name: fullName, is_active: true, factors: [], created_at: now(), last_sign_in_at: null });
  return id;
};
addUser('owner@example.com', 'Owner-Password-123!', 'owner', 'Phyllis Owner');
addUser('editor@example.com', 'Editor-Password-123!', 'editor', 'Eddie Editor');
const superId = addUser('super@example.com', 'Super-Password-123!', 'super_admin', 'Sam Super');
users.get(superId).factors.push({ id: randomUUID(), factor_type: 'totp', friendly_name: 'Phone', status: 'verified', created_at: now(), updated_at: now() });

const db = { content_entries: [], content_versions: [], media: [], audit_log: [] };
let versionSeq = 1;
let auditSeq = 1;
const sessions = new Map(); // access token -> { userId, aal }
let deploys = 0;

const audit = (actorId, action, entityType, entityId, summary, details = {}) => {
  db.audit_log.push({ id: auditSeq++, occurred_at: now(), actor_id: actorId, actor_email: users.get(actorId)?.email ?? 'system', action, entity_type: entityType, entity_id: entityId, summary, details });
};
const changedFields = (a = {}, b = {}) => [...new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})])].filter((k) => JSON.stringify(a?.[k]) !== JSON.stringify(b?.[k])).sort();

// ---------------------------------------------------------------- helpers
const send = (res, status, body, headers = {}) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
    'Access-Control-Expose-Headers': 'Content-Range',
    ...headers,
  });
  res.end(body === undefined ? '' : JSON.stringify(body));
};
const readBody = (req) =>
  new Promise((resolve) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
  });
const json = async (req) => {
  const buf = await readBody(req);
  try {
    return JSON.parse(buf.toString() || '{}');
  } catch {
    return {};
  }
};

function issueSession(userId, aal = 'aal1') {
  const user = users.get(userId);
  user.last_sign_in_at = now();
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const access_token = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: userId, aal, amr: [{ method: aal === 'aal2' ? 'totp' : 'password', timestamp: exp - 3600 }], role: 'authenticated', exp, email: user.email, session_id: randomUUID() })}.mock`;
  sessions.set(access_token, { userId, aal });
  return { access_token, token_type: 'bearer', expires_in: 3600, expires_at: exp, refresh_token: randomUUID(), user: publicUser(user) };
}
const publicUser = (u) => ({ id: u.id, aud: 'authenticated', role: 'authenticated', email: u.email, email_confirmed_at: u.created_at, last_sign_in_at: u.last_sign_in_at, app_metadata: {}, user_metadata: { full_name: u.full_name }, factors: u.factors, created_at: u.created_at, updated_at: now() });
const caller = (req) => sessions.get((req.headers.authorization || '').replace('Bearer ', ''));
const profileOf = (id) => {
  const u = users.get(id);
  return u && { id: u.id, email: u.email, full_name: u.full_name, role: u.role, is_active: u.is_active, created_at: u.created_at };
};

/** Apply PostgREST-style filters from the query string. */
function query(rows, params) {
  let out = [...rows];
  for (const [key, raw] of params) {
    if (['select', 'order', 'limit', 'offset', 'columns', 'on_conflict'].includes(key)) continue;
    if (key === 'or') {
      const terms = raw.replace(/^\(|\)$/g, '').split(',').map((t) => t.split('.'));
      out = out.filter((row) => terms.some(([col, , ...rest]) => String(row[col] ?? '').toLowerCase().includes(rest.join('.').replace(/%/g, '').toLowerCase())));
      continue;
    }
    const [op, ...rest] = raw.split('.');
    const value = rest.join('.');
    out = out.filter((row) => {
      const cell = row[key];
      if (op === 'eq') return String(cell) === value;
      if (op === 'lt') return Number(cell) < Number(value);
      if (op === 'like') return new RegExp(`^${value.replace(/[%*]/g, '.*')}$`).test(String(cell));
      return true;
    });
  }
  const order = params.get('order');
  if (order) {
    const [col, dir] = order.split('.');
    out.sort((a, b) => (a[col] < b[col] ? -1 : a[col] > b[col] ? 1 : 0) * (dir === 'desc' ? -1 : 1));
  }
  const limit = params.get('limit');
  if (limit) out = out.slice(0, Number(limit));
  return out;
}

function respondRows(req, res, rows) {
  const wantsObject = (req.headers.accept || '').includes('vnd.pgrst.object');
  if (wantsObject) {
    if (rows.length !== 1) return send(res, 406, { code: 'PGRST116', message: 'JSON object requested, multiple (or no) rows returned', details: `${rows.length} rows` });
    return send(res, 200, rows[0]);
  }
  return send(res, 200, rows);
}

// ---------------------------------------------------------------- "Supabase"
const api = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204);
  const url = new URL(req.url, API);
  const p = url.pathname;
  const who = caller(req);

  // --- auth
  if (p === '/auth/v1/token' && url.searchParams.get('grant_type') === 'password') {
    const { email, password } = await json(req);
    const user = [...users.values()].find((u) => u.email === email && u.password === password);
    if (!user) return send(res, 400, { error: 'invalid_grant', error_description: 'Invalid login credentials', msg: 'Invalid login credentials', code: 'invalid_credentials' });
    return send(res, 200, issueSession(user.id));
  }
  if (p === '/auth/v1/token') return send(res, 400, { error: 'invalid_grant', msg: 'Refresh not supported in mock' });
  if (p === '/auth/v1/user' && req.method === 'GET') return who ? send(res, 200, publicUser(users.get(who.userId))) : send(res, 401, { msg: 'invalid JWT' });
  if (p === '/auth/v1/user' && req.method === 'PUT') {
    const body = await json(req);
    const user = users.get(who.userId);
    if (body.password) user.password = body.password;
    return send(res, 200, publicUser(user));
  }
  if (p === '/auth/v1/logout') return send(res, 204);
  if (p === '/auth/v1/recover') return send(res, 200, {});
  if (p === '/auth/v1/factors' && req.method === 'POST') {
    const user = users.get(who.userId);
    const factor = { id: randomUUID(), factor_type: 'totp', friendly_name: 'Authenticator', status: 'unverified', created_at: now(), updated_at: now() };
    user.factors.push(factor);
    const qr = `data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" fill="#fff"/><rect x="20" y="20" width="40" height="40"/><rect x="100" y="20" width="40" height="40"/><rect x="20" y="100" width="40" height="40"/><rect x="80" y="80" width="20" height="20"/></svg>')}`;
    return send(res, 200, { id: factor.id, type: 'totp', friendly_name: factor.friendly_name, totp: { qr_code: qr, secret: 'JBSWY3DPEHPK3PXP', uri: 'otpauth://totp/mock' } });
  }
  const factorMatch = p.match(/^\/auth\/v1\/factors\/([^/]+)(\/challenge|\/verify)?$/);
  if (factorMatch) {
    const [, factorId, action] = factorMatch;
    const user = users.get(who.userId);
    if (action === '/challenge') return send(res, 200, { id: randomUUID(), type: 'totp', expires_at: Math.floor(Date.now() / 1000) + 300 });
    if (action === '/verify') {
      const { code } = await json(req);
      if (code !== '123456') return send(res, 422, { msg: 'Invalid TOTP code entered', code: 'mfa_verification_failed' });
      const factor = user.factors.find((f) => f.id === factorId);
      factor.status = 'verified';
      return send(res, 200, issueSession(user.id, 'aal2'));
    }
    if (req.method === 'DELETE') {
      user.factors = user.factors.filter((f) => f.id !== factorId);
      return send(res, 200, { id: factorId });
    }
  }

  // --- storage
  const upload = p.match(/^\/storage\/v1\/object\/media\/(.+)$/);
  if (upload && req.method === 'POST') {
    await readBody(req);
    return send(res, 200, { Key: `media/${upload[1]}`, Id: randomUUID() });
  }
  if (p === '/storage/v1/object/media' && req.method === 'DELETE') return send(res, 200, []);
  if (p.startsWith('/storage/v1/object/public/media/')) {
    // Serve a real image so thumbnails render.
    const file = await readFile(path.join(dist, 'assets', (await import('node:fs')).readdirSync(path.join(dist, 'assets')).find((f) => f.startsWith('construction'))));
    res.writeHead(200, { 'Content-Type': 'image/webp', 'Access-Control-Allow-Origin': '*' });
    return res.end(file);
  }

  // --- RPC
  const rpc = p.match(/^\/rest\/v1\/rpc\/(.+)$/);
  if (rpc) {
    const args = await json(req);
    const name = rpc[1];
    if (name === 'get_published_content') return send(res, 200, db.content_entries.filter((e) => e.published).map((e) => ({ key: e.key, data: e.published })));
    if (!who) return send(res, 401, { message: 'JWT required' });
    const me = users.get(who.userId);
    const owners = ['owner', 'super_admin'].includes(me.role) && (me.role !== 'super_admin' || who.aal === 'aal2');
    if (name === 'staff_directory') return send(res, 200, [...users.values()].map((u) => ({ id: u.id, display_name: u.full_name || u.email })));
    if (name === 'update_my_name') {
      me.full_name = args.p_full_name.trim();
      return send(res, 200, profileOf(me.id));
    }
    if (name === 'publish_content') {
      if (!owners) return send(res, 403, { code: '42501', message: 'Only the website owner or a super administrator can publish.' });
      const entry = db.content_entries.find((e) => e.key === args.p_key);
      const first = !entry.published;
      const fields = first ? null : changedFields(entry.published, entry.draft);
      entry.published = structuredClone(entry.draft);
      entry.published_at = now();
      entry.published_by = me.id;
      const version = { id: versionSeq++, entry_key: entry.key, data: structuredClone(entry.draft), note: args.p_note ?? '', created_at: now(), created_by: me.id };
      db.content_versions.push(version);
      audit(me.id, 'content.published', 'content', entry.key, first ? `Published "${entry.title}" from the dashboard for the first time` : `Published "${entry.title}"`, { fields, note: args.p_note ?? '' });
      return send(res, 200, version);
    }
    if (name === 'restore_content_version') {
      const version = db.content_versions.find((v) => v.id === Number(args.p_version_id));
      const entry = db.content_entries.find((e) => e.key === version.entry_key);
      entry.draft = structuredClone(version.data);
      entry.draft_updated_at = now();
      audit(me.id, 'content.version_restored', 'content', entry.key, `Restored a version into the draft of "${entry.title}"`);
      return send(res, 200, entry);
    }
    if (name === 'discard_content_draft') {
      const entry = db.content_entries.find((e) => e.key === args.p_key);
      entry.draft = structuredClone(entry.published);
      return send(res, 200, entry);
    }
    return send(res, 404, { message: `Unknown function ${name}` });
  }

  // --- tables
  const table = p.match(/^\/rest\/v1\/([a-z_]+)$/);
  if (table) {
    const name = table[1];
    if (!who) return send(res, 401, { message: 'JWT required' });
    const me = users.get(who.userId);
    if (name === 'profiles') {
      const rows = query([...users.keys()].map(profileOf), url.searchParams);
      return respondRows(req, res, me.role === 'super_admin' ? rows : rows.filter((r) => r.id === me.id));
    }
    const rows = db[name];
    if (!rows) return send(res, 404, { message: 'unknown table' });
    if (req.method === 'GET') return respondRows(req, res, query(rows, url.searchParams));
    if (req.method === 'POST') {
      const body = await json(req);
      const row =
        name === 'content_entries'
          ? { ...body, published: null, draft_updated_at: now(), draft_updated_by: me.id, published_at: null, published_by: null, created_at: now() }
          : { id: randomUUID(), alt_text: '', folder: 'general', ...body, uploaded_by: me.id, created_at: now(), updated_at: now() };
      if (name === 'content_entries' && me.role === 'editor' && body.kind !== 'page') return send(res, 403, { code: '42501', message: 'new row violates row-level security policy' });
      rows.push(row);
      if (name === 'content_entries') audit(me.id, 'content.created', 'content', row.key, `Created "${row.title}"`);
      if (name === 'media') audit(me.id, 'media.uploaded', 'media', row.id, `Uploaded ${row.file_name}`);
      return respondRows(req, res, [row]);
    }
    if (req.method === 'PATCH') {
      const body = await json(req);
      const matched = query(rows, url.searchParams);
      for (const row of matched) {
        if (name === 'content_entries' && body.draft) {
          audit(me.id, 'content.draft_saved', 'content', row.key, `Saved draft of "${row.title}"`, { fields: changedFields(row.draft, body.draft) });
          row.draft_updated_at = now();
          row.draft_updated_by = me.id;
        }
        Object.assign(row, body, { updated_at: now() });
      }
      return respondRows(req, res, matched);
    }
    if (req.method === 'DELETE') {
      const matched = query(rows, url.searchParams);
      db[name] = rows.filter((row) => !matched.includes(row));
      return respondRows(req, res, matched);
    }
  }
  return send(res, 404, { message: `mock: no route for ${req.method} ${p}` });
});

// ---------------------------------------------------------------- site + /admin-api stand-ins
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.xml': 'application/xml' };

const site = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${SITE_PORT}`);
  if (url.pathname.startsWith('/admin-api/')) {
    const who = caller(req);
    if (!who) return send(res, 401, { error: 'Please sign in again.' });
    if (url.pathname === '/admin-api/status') return send(res, 200, { integrations: { publishing: true, analytics: false, errorMonitoring: false, errorReporting: false, uptime: false } });
    if (url.pathname === '/admin-api/deploy') {
      deploys += 1;
      audit(who.userId, 'site.rebuild_requested', 'site', 'netlify', 'Requested a website update after publishing');
      return send(res, 202, { ok: true, message: 'The live website is updating. Changes usually appear within 1–3 minutes.' });
    }
    if (url.pathname === '/admin-api/users') {
      if (req.method === 'GET') return send(res, 200, { users: [...users.values()].map((u) => ({ id: u.id, email: u.email, fullName: u.full_name, role: u.role, active: u.is_active, lastSignInAt: u.last_sign_in_at, emailConfirmed: true, mfaEnabled: u.factors.some((f) => f.status === 'verified'), isYou: u.id === who.userId })) });
      const body = await json(req);
      if (req.method === 'POST') {
        const id = addUser(body.email, randomUUID(), body.role, body.fullName);
        audit(who.userId, 'user.invited', 'user', id, `Invited ${body.email} as ${body.role}`);
        return send(res, 201, { ok: true, userId: id });
      }
      const user = users.get(body.userId);
      Object.assign(user, { role: body.role ?? user.role, is_active: body.active ?? user.is_active });
      audit(who.userId, 'user.access_changed', 'user', user.id, `Changed access for ${user.email}: ${user.role}, ${user.is_active ? 'active' : 'deactivated'}`);
      return send(res, 200, { ok: true });
    }
  }
  if (url.pathname === '/api/health') return send(res, 200, { status: 'ok' });
  if (url.pathname === '/__mock/state') return send(res, 200, { deploys, entries: db.content_entries.map((e) => e.key), versions: db.content_versions.length });

  const candidates = [url.pathname, `${url.pathname}.html`, '/index.html'];
  for (const candidate of candidates) {
    const file = path.join(dist, decodeURIComponent(candidate));
    if (!file.startsWith(dist)) break;
    try {
      if ((await stat(file)).isFile()) {
        res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
        return res.end(await readFile(file));
      }
    } catch {
      // try next
    }
  }
  res.writeHead(404);
  res.end();
});

api.listen(API_PORT, () => console.log(`[mock] Supabase stand-in on ${API}`));
site.listen(SITE_PORT, () => console.log(`[mock] site on http://localhost:${SITE_PORT}`));
