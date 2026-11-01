/**
 * Shared helpers for the admin Netlify Functions.
 *
 * Every admin endpoint:
 *   1. requires a Supabase access token (Authorization: Bearer ...),
 *   2. validates it with Supabase Auth (never trusts the token's contents alone),
 *   3. loads the caller's role from the database with the service role,
 *   4. applies the same MFA rule as the database (see the migration header).
 * The service role key exists only in Netlify's environment, never in the browser.
 */
import { createClient } from '@supabase/supabase-js';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function readConfig(env = process.env) {
  return {
    supabaseUrl: env.SUPABASE_URL || env.VITE_SUPABASE_URL || '',
    serviceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY || '',
    siteUrl: (env.URL || env.SITE_URL || 'https://pjoutlawlegal.com').replace(/\/+$/, ''),
    buildHookUrl: env.NETLIFY_BUILD_HOOK_URL || '',
  };
}

export function serviceClient(config) {
  if (!config.supabaseUrl || !config.serviceRoleKey) {
    throw new HttpError(503, 'The admin backend is not configured yet (Supabase URL or service role key is missing).');
  }
  return createClient(config.supabaseUrl, config.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });

function decodeJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
  } catch {
    return {};
  }
}

/**
 * Returns { user, profile, aal } for a signed-in, active admin whose role is in
 * `roles`, or throws HttpError(401/403).
 */
export async function requireAdmin(request, client, roles) {
  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) throw new HttpError(401, 'Please sign in again.');

  // Supabase verifies the signature and expiry; a forged token fails here.
  const { data: userData, error: userError } = await client.auth.getUser(token);
  if (userError || !userData?.user) throw new HttpError(401, 'Your session has expired. Please sign in again.');
  const user = userData.user;

  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('id, email, role, is_active')
    .eq('id', user.id)
    .maybeSingle();
  if (profileError) throw new HttpError(500, 'Could not check your permissions.');
  if (!profile || !profile.is_active || !roles.includes(profile.role)) {
    throw new HttpError(403, 'You do not have permission to do this.');
  }

  const aal = decodeJwtPayload(token).aal || 'aal1';
  const hasVerifiedFactor = (user.factors || []).some((factor) => factor.status === 'verified');
  if (aal !== 'aal2' && (profile.role === 'super_admin' || hasVerifiedFactor)) {
    throw new HttpError(403, 'Please complete two-factor verification first.');
  }

  return { user, profile, aal };
}

/** Wrap a handler with method checks and uniform, non-leaky error responses. */
export function handle(methods, fn) {
  return async (request, context) => {
    if (!methods.includes(request.method)) {
      return json(405, { error: 'Method not allowed.' }, { Allow: methods.join(', ') });
    }
    try {
      return await fn(request, context);
    } catch (error) {
      if (error instanceof HttpError) return json(error.status, { error: error.message });
      console.error('[admin-api] unexpected error', error?.message);
      return json(500, { error: 'Something went wrong on the server. Please try again.' });
    }
  };
}

export async function readJson(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error();
    return body;
  } catch {
    throw new HttpError(400, 'The request was not valid JSON.');
  }
}
