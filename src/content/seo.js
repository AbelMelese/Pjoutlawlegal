/**
 * SEO helpers shared by the browser (RouteSeo) and the build scripts
 * (scripts/postbuild.mjs). Plain JS with no JSX/Vite features so Node can import it.
 */

export function normalizePath(path) {
  if (!path || path === '/') return '/';
  return `/${String(path).replace(/^\/+|\/+$/g, '')}`;
}

/** Resolve the effective head tags for a route from the SEO content. */
export function seoForPath(seo, path) {
  const route = normalizePath(path);
  const page = (seo.pages ?? []).find((entry) => normalizePath(entry.path) === route);
  const siteUrl = String(seo.siteUrl || '').replace(/\/+$/, '');
  const title = page?.title ? `${page.title}${seo.titleSuffix ?? ''}` : seo.defaultTitle;
  const description = page?.description || seo.defaultDescription || '';
  const ogImage = page?.ogImage || seo.defaultOgImage || '';
  return {
    path: route,
    title,
    description,
    canonical: siteUrl ? `${siteUrl}${route === '/' ? '/' : route}` : '',
    ogImage: /^https:\/\//i.test(ogImage) ? ogImage : '',
    noindex: Boolean(page?.noindex),
    known: Boolean(page),
  };
}

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const escapeHtml = escapeXml;

export function buildSitemap(seo, extraPaths = []) {
  const siteUrl = String(seo.siteUrl || '').replace(/\/+$/, '');
  const paths = [
    ...(seo.pages ?? []).filter((page) => !page.noindex).map((page) => normalizePath(page.path)),
    ...extraPaths.map(normalizePath),
  ];
  const unique = [...new Set(paths)];
  const urls = unique
    .map((path) => `  <url><loc>${escapeXml(`${siteUrl}${path}`)}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildRobots(seo) {
  const siteUrl = String(seo.siteUrl || '').replace(/\/+$/, '');
  return `User-agent: *\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
}

/** Head tags (as an HTML string) injected into each pre-rendered route's index.html. */
export function headTags(meta) {
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
  ];
  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`);
    tags.push(`<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`);
  }
  if (meta.ogImage) tags.push(`<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`);
  if (meta.noindex) tags.push('<meta name="robots" content="noindex" />');
  return tags.join('\n  ');
}
