import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when the site was built with Supabase settings. */
export const isConfigured = Boolean(url && anonKey);

// The anon key is designed to be public: every table is protected by row
// level security, so it grants nothing beyond what the policies allow.
export const supabase = isConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce' },
    })
  : null;

/** Turn Supabase/PostgREST errors into sentences an owner can act on. */
export function friendlyError(error, fallback = 'Something went wrong. Please try again.') {
  if (!error) return fallback;
  const message = error.message || String(error);
  if (/Failed to fetch|NetworkError|network/i.test(message)) return 'Could not reach the server. Check your internet connection and try again.';
  if (/JWT expired|invalid JWT|refresh token/i.test(message)) return 'Your session has expired. Please sign in again.';
  if (/permission denied|row-level security|42501/i.test(message) || error.code === '42501') {
    return /Only|permission to/.test(message) ? message : 'You do not have permission to do that.';
  }
  if (error.code === 'P0002' || error.code === '22023' || error.code === '23514') return message;
  if (/Invalid login credentials/i.test(message)) return 'That e-mail and password do not match.';
  if (/Email not confirmed/i.test(message)) return 'Please confirm your e-mail address first (check your inbox).';
  if (/rate limit|too many/i.test(message)) return 'Too many attempts. Please wait a few minutes and try again.';
  if (/Invalid TOTP|invalid code|expired/i.test(message)) return 'That code did not work. Enter the current 6-digit code from your authenticator app.';
  return fallback;
}
