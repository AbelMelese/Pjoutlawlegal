#!/usr/bin/env node
/**
 * Prebuild step: download the CMS's *published* content and write it to
 * src/content/published.generated.json so it is baked into the static build.
 *
 * - No Supabase configured (local dev, forks): writes an empty file; the site
 *   uses the defaults in src/content/defaults.
 * - Supabase configured but unreachable or returning bad data: FAILS the build.
 *   Netlify then keeps serving the previous deploy, instead of publishing a site
 *   that silently reverted to the default copy.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { CONTENT_KEYS, validatePublishedPayload } from './lib/content-keys.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const outFile = fileURLToPath(new URL('../src/content/published.generated.json', import.meta.url));

const env = { ...loadEnv(process.env.NODE_ENV === 'production' ? 'production' : 'development', root, 'VITE_'), ...process.env };
const url = env.VITE_SUPABASE_URL;
const anonKey = env.VITE_SUPABASE_ANON_KEY;

async function main() {
  if (!url || !anonKey) {
    console.warn('[content] Supabase is not configured; building with default content.');
    await writeFile(outFile, '{}\n');
    return;
  }

  const response = await fetch(`${url.replace(/\/+$/, '')}/rest/v1/rpc/get_published_content`, {
    method: 'POST',
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}`, 'Content-Type': 'application/json' },
    body: '{}',
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) {
    throw new Error(`Supabase returned HTTP ${response.status} for published content.`);
  }

  const rows = await response.json();
  const content = validatePublishedPayload(rows);
  await writeFile(outFile, `${JSON.stringify(content, null, 2)}\n`);
  const keys = Object.keys(content);
  console.log(`[content] Baked published content for: ${keys.length ? keys.join(', ') : '(nothing published yet)'}`);
}

main().catch((error) => {
  console.error(`[content] ${error.message}`);
  console.error('[content] Build stopped so the live site keeps its current content. Known keys:', CONTENT_KEYS.join(', '));
  process.exit(1);
});
