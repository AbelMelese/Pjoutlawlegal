import { supabase } from './supabase';

/** Call an admin Netlify Function with the signed-in user's access token. */
export async function adminApi(path, { method = 'GET', body } = {}) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  let response;
  try {
    response = await fetch(`/admin-api/${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw Object.assign(new Error('Could not reach the server. Check your internet connection and try again.'), { status: 0 });
  }
  let payload = {};
  try {
    payload = await response.json();
  } catch {
    // Non-JSON (e.g. local `vite dev` without Netlify Functions running).
    if (response.status === 404) {
      throw Object.assign(new Error('Server functions are not available here. Run the site with `netlify dev` or use a deployed preview.'), { status: 404 });
    }
  }
  if (!response.ok) {
    throw Object.assign(new Error(payload.error || `The server returned an error (${response.status}).`), { status: response.status });
  }
  return payload;
}
