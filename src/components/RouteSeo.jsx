import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContent } from '../content';
import { seoForPath } from '../content/seo';

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!content) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Keeps <title>, description, canonical and Open Graph tags in sync with the
 * current route as visitors navigate. Pre-rendered HTML (scripts/postbuild.mjs)
 * covers crawlers and link previews that do not run JavaScript.
 */
const RouteSeo = () => {
  const { pathname } = useLocation();
  const seo = useContent('seo');

  useEffect(() => {
    const meta = seoForPath(seo, pathname);
    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', meta.canonical);
    setMeta('property', 'og:image', meta.ogImage);
    setMeta('name', 'robots', meta.noindex ? 'noindex' : '');
    setCanonical(meta.canonical);
  }, [seo, pathname]);

  return null;
};

export default RouteSeo;
