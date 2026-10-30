import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import {
  ContentPreviewProvider,
  defaultContent,
  getPublishedContent,
  mergeContent,
  telHref,
} from '../../src/content';
import { resolveImage } from '../../src/content/assets';
import { buildRobots, buildSitemap, headTags, seoForPath } from '../../src/content/seo';
import Contact from '../../src/pages/Contact';
import Footer from '../../src/components/Footer';

describe('content layer', () => {
  it('falls back to defaults when nothing is published', () => {
    expect(getPublishedContent('home')).toEqual(defaultContent.home);
  });

  it('lets published fields override defaults but keeps fields missing from the override', () => {
    const merged = mergeContent({ a: 1, b: 2 }, { b: 3, c: null });
    expect(merged).toEqual({ a: 1, b: 3 });
  });

  it('ignores malformed overrides', () => {
    expect(mergeContent({ a: 1 }, ['x'])).toEqual({ a: 1 });
    expect(mergeContent({ a: 1 }, 'x')).toEqual({ a: 1 });
  });

  it('builds tel: links from formatted numbers', () => {
    expect(telHref('(202) 548-2999')).toBe('tel:+12025482999');
    expect(telHref('+44 20 7946 0958')).toBe('tel:+442079460958');
    expect(telHref('')).toBe('');
  });

  it('shows draft content in preview without touching the published site', () => {
    const draftSettings = { ...defaultContent.settings, phone: '(301) 555-0100' };
    render(
      <MemoryRouter>
        <ContentPreviewProvider overrides={{ settings: draftSettings }}>
          <Footer />
        </ContentPreviewProvider>
      </MemoryRouter>,
    );
    const link = screen.getByText('(301) 555-0100');
    expect(link).toHaveAttribute('href', 'tel:+13015550100');
  });

  it('renders contact details from settings', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );
    expect(screen.getAllByText(defaultContent.settings.email).length).toBeGreaterThan(0);
  });
});

describe('image references', () => {
  it('resolves bundled assets', () => {
    expect(resolveImage('asset:logo')).toBeTruthy();
    expect(resolveImage('asset:does-not-exist')).toBe('');
  });

  it('allows https and site-relative URLs only', () => {
    expect(resolveImage('https://example.supabase.co/storage/v1/object/public/media/a.jpg')).toMatch(/^https:/);
    expect(resolveImage('/images/a.jpg')).toBe('/images/a.jpg');
    expect(resolveImage('javascript:alert(1)')).toBe('');
    expect(resolveImage('data:image/svg+xml;base64,AAAA')).toBe('');
    expect(resolveImage('http://insecure.example/a.jpg')).toBe('');
    expect(resolveImage('//evil.example/a.jpg')).toBe('');
  });

  it('every bundled image referenced by default content exists', () => {
    const refs = JSON.stringify(defaultContent).match(/asset:[a-z0-9-]+/g) ?? [];
    for (const ref of refs) expect(resolveImage(ref), ref).toBeTruthy();
  });
});

describe('seo', () => {
  const seo = defaultContent.seo;

  it('keeps the current site-wide title for pages without their own title', () => {
    expect(seoForPath(seo, '/contact').title).toBe(seo.defaultTitle);
  });

  it('keeps the existing Practice Areas title', () => {
    expect(seoForPath(seo, '/practice-areas/').title).toBe(
      'Practice Areas & Case Highlights | Phyllis J. Outlaw & Associates',
    );
  });

  it('builds canonical URLs and escapes head tags', () => {
    const meta = seoForPath(
      { ...seo, pages: [{ path: '/x', title: 'A "quoted" <b>', description: 'd' }] },
      '/x',
    );
    expect(meta.canonical).toBe('https://pjoutlawlegal.com/x');
    expect(headTags(meta)).toContain('&quot;quoted&quot; &lt;b&gt;');
    expect(headTags(meta)).not.toContain('<b>');
  });

  it('rejects non-https social images', () => {
    expect(seoForPath({ ...seo, defaultOgImage: 'javascript:x' }, '/').ogImage).toBe('');
  });

  it('lists indexable pages in the sitemap and blocks /admin in robots.txt', () => {
    const sitemap = buildSitemap({
      ...seo,
      pages: [...seo.pages, { path: '/hidden', noindex: true }],
    });
    expect(sitemap).toContain('<loc>https://pjoutlawlegal.com/contact</loc>');
    expect(sitemap).not.toContain('/hidden');
    expect(buildRobots(seo)).toContain('Disallow: /admin');
    expect(buildRobots(seo)).toContain('Sitemap: https://pjoutlawlegal.com/sitemap.xml');
  });
});
