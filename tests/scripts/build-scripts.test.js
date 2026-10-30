// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { validatePublishedPayload } from '../../scripts/lib/content-keys.mjs';
import { applyHead } from '../../scripts/postbuild.mjs';
import { seoForPath } from '../../src/content/seo.js';
import seo from '../../src/content/defaults/seo.json';

describe('validatePublishedPayload', () => {
  it('maps rows to keys and ignores keys the site does not know yet', () => {
    const result = validatePublishedPayload([
      { key: 'settings', data: { phone: '1' } },
      { key: 'future-thing', data: { x: 1 } },
    ]);
    expect(result).toEqual({ settings: { phone: '1' } });
  });

  it('rejects malformed responses so a bad fetch cannot deploy', () => {
    expect(() => validatePublishedPayload({})).toThrow();
    expect(() => validatePublishedPayload([{ data: {} }])).toThrow();
    expect(() => validatePublishedPayload([{ key: 'home', data: [] }])).toThrow();
    expect(() => validatePublishedPayload([{ key: 'home', data: null }])).toThrow();
  });
});

describe('applyHead', () => {
  const template = `<!doctype html><html><head>
  <meta charset="UTF-8" />
  <title>Old</title>
  <meta name="description"
    content="Old description" />
  <meta name="theme-color" content="#0f172a" />
</head><body></body></html>`;

  it('replaces the title and description exactly once and keeps other tags', () => {
    const html = applyHead(template, seoForPath(seo, '/practice-areas'));
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html.match(/name="description"/g)).toHaveLength(1);
    expect(html).toContain('Practice Areas &amp; Case Highlights');
    expect(html).not.toContain('Old description');
    expect(html).toContain('theme-color');
    expect(html).toContain('rel="canonical" href="https://pjoutlawlegal.com/practice-areas"');
  });
});
