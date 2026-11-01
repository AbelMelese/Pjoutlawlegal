import { bundledAssets } from '../../content/assets';
import { CONTENT_AREAS, SITE_PAGES } from './schemas';

const ROUTES = new Set(SITE_PAGES.map((page) => page.value));
// Old addresses that still redirect somewhere sensible.
const REDIRECTS = new Set(['/legal-services', '/divorce-family-law', '/business-services', '/blog', '/meet-attorneys']);

/** Anchors (#ids) each page renders, from its list items' "id" fields. */
function anchorsByRoute(contentByKey) {
  return {
    '/mediation-services': new Set((contentByKey.mediation?.services ?? []).map((s) => s.id)),
    '/practice-areas': new Set([...(contentByKey.practiceAreas?.areas ?? []).map((a) => a.id), 'business-consulting']),
  };
}

function walk(value, path, visit) {
  if (Array.isArray(value)) value.forEach((item, index) => walk(item, `${path}.${index}`, visit));
  else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) walk(child, path ? `${path}.${key}` : key, visit);
  } else visit(value, path);
}

const LINK_FIELDS = /(^|\.)(link|url|href|termsUrl|privacyUrl)$/i;

/**
 * Check content for links and images that will not work.
 * contentByKey: { home: {...}, settings: {...}, ... } (draft or live)
 * mediaUrls: Set of public URLs in the media library
 * Returns [{ area, path, value, severity: 'error'|'warning', problem }]
 */
export function checkContentLinks(contentByKey, mediaUrls = new Set()) {
  const issues = [];
  const anchors = anchorsByRoute(contentByKey);

  for (const area of CONTENT_AREAS) {
    const doc = contentByKey[area.key];
    if (!doc) continue;
    walk(doc, '', (value, path) => {
      if (typeof value !== 'string' || !value) return;
      const report = (severity, problem) => issues.push({ area: area.title, areaKey: area.key, path, value, severity, problem });

      if (path.endsWith('.src') || path === 'src') {
        if (value.startsWith('asset:')) {
          if (!bundledAssets[value.slice(6)]) report('error', 'Image is missing');
        } else if (/^https:\/\//.test(value)) {
          if (mediaUrls.size && value.includes('/storage/v1/object/public/media/') && !mediaUrls.has(value)) {
            report('error', 'Image was deleted from the media library');
          } else if (!value.includes('/storage/v1/object/public/')) {
            report('warning', 'Image is loaded from another website and could disappear or change without notice');
          }
        } else {
          report('error', 'Image address is not valid');
        }
        return;
      }

      if (!LINK_FIELDS.test(path)) return;
      if (value === '#') return report('warning', 'Placeholder link that goes nowhere');
      if (value.startsWith('/')) {
        const [route, hash] = value.split('#');
        const clean = route.length > 1 ? route.replace(/\/+$/, '') : route;
        if (!ROUTES.has(clean) && !REDIRECTS.has(clean)) return report('error', 'Links to a page that does not exist');
        if (REDIRECTS.has(clean)) return report('warning', 'Links to an old address that redirects; link to the page directly');
        if (hash && anchors[clean] && !anchors[clean].has(hash)) report('error', `Links to a section (#${hash}) that does not exist`);
      }
    });
  }
  return issues;
}
