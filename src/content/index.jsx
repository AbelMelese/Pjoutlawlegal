/**
 * Content layer for the public site.
 *
 * Every editable section has a default in ./defaults (the original site copy,
 * so the site always works with no CMS at all). At build time
 * scripts/fetch-content.mjs writes the CMS's *published* content to
 * ./published.generated.json, which overrides the defaults. The admin preview
 * wraps pages in <ContentPreviewProvider> to show unpublished drafts.
 */
import { createContext, useContext } from 'react';
import settings from './defaults/settings.json';
import home from './defaults/home.json';
import mediation from './defaults/mediation.json';
import practiceAreas from './defaults/practiceAreas.json';
import about from './defaults/about.json';
import contact from './defaults/contact.json';
import seo from './defaults/seo.json';
import privacy from './defaults/privacy.json';
import terms from './defaults/terms.json';

export const defaultContent = { settings, home, mediation, practiceAreas, about, contact, seo, privacy, terms };

// Optional file: absent in a fresh checkout or when no CMS is configured.
const generated = import.meta.glob('./published.generated.json', { eager: true, import: 'default' });
const published = Object.values(generated)[0] ?? {};

/** Published value wins per top-level field; unknown/removed fields fall back to defaults. */
export function mergeContent(defaults, override) {
  if (!override || typeof override !== 'object' || Array.isArray(override)) return defaults;
  const merged = { ...defaults };
  for (const [field, value] of Object.entries(override)) {
    if (value !== undefined && value !== null) merged[field] = value;
  }
  return merged;
}

export function getPublishedContent(key) {
  return mergeContent(defaultContent[key], published[key]);
}

const PreviewContext = createContext(null);

export function ContentPreviewProvider({ overrides, children }) {
  return <PreviewContext.Provider value={overrides}>{children}</PreviewContext.Provider>;
}

export function useContent(key) {
  const overrides = useContext(PreviewContext);
  if (overrides && overrides[key]) return mergeContent(defaultContent[key], overrides[key]);
  return getPublishedContent(key);
}

/** "(202) 548-2999" -> "tel:+12025482999" */
export function telHref(phone) {
  const digits = String(phone ?? '').replace(/\D/g, '');
  if (!digits) return '';
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`;
}
