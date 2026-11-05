#!/usr/bin/env node
/**
 * Postbuild step, run after `vite build`:
 *  - writes dist/robots.txt and dist/sitemap.xml from the SEO content
 *  - writes dist/<route>.html for each public page with that page's
 *    <title>, description, canonical and Open Graph tags, so search engines
 *    and link previews see correct metadata without running JavaScript.
 *    Netlify serves these files before the SPA fallback redirect applies.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { buildRobots, buildSitemap, headTags, normalizePath, seoForPath } from '../src/content/seo.js';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const readJson = async (relative) =>
  JSON.parse(await readFile(fileURLToPath(new URL(relative, import.meta.url)), 'utf8'));

export function applyHead(html, meta) {
  const stripped = html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, '')
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/?>/i, '');
  return stripped.replace('</head>', `  ${headTags(meta)}\n</head>`);
}

async function main() {
  const defaults = await readJson('../src/content/defaults/seo.json');
  const generatedPath = fileURLToPath(new URL('../src/content/published.generated.json', import.meta.url));
  const published = existsSync(generatedPath) ? JSON.parse(await readFile(generatedPath, 'utf8')) : {};
  const seo = { ...defaults, ...(published.seo ?? {}) };
  // The Privacy Policy and Terms of Use pages are taken down; skip them even if published SEO still lists them.
  const RETIRED = new Set(['/privacy-policy', '/terms-of-use']);
  seo.pages = (seo.pages ?? []).filter((page) => !RETIRED.has(normalizePath(page.path)));

  const template = await readFile(path.join(dist, 'index.html'), 'utf8');

  for (const page of seo.pages ?? []) {
    const route = normalizePath(page.path);
    const meta = seoForPath(seo, route);
    // Flat files (contact.html), not folders (contact/index.html): Netlify serves
    // /contact from contact.html with no redirect, but 301-redirects /contact to
    // /contact/ when only a folder index exists, which would change every URL.
    const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, applyHead(template, meta));
  }

  await writeFile(path.join(dist, 'robots.txt'), buildRobots(seo));
  await writeFile(path.join(dist, 'sitemap.xml'), buildSitemap(seo));
  console.log(`[postbuild] Wrote metadata for ${(seo.pages ?? []).length} pages, robots.txt and sitemap.xml`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`[postbuild] ${error.message}`);
    process.exit(1);
  });
}
