// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { CONTENT_AREAS } from '../../src/admin/lib/schemas';
import { isSafeUrl, slugify, validateContent } from '../../src/admin/lib/validate';
import { defaultContent } from '../../src/content';
import { CONTENT_KEYS } from '../../scripts/lib/content-keys.mjs';

// Top-level content fields deliberately not editable in the dashboard.
const NOT_EDITABLE = { seo: ['siteUrl'] };

describe('content schemas', () => {
  it('cover exactly the content the site renders', () => {
    expect(CONTENT_AREAS.map((a) => a.key).sort()).toEqual([...CONTENT_KEYS].sort());
  });

  it.each(CONTENT_AREAS.map((a) => [a.key, a]))('%s: every field exists in the defaults and every default field is editable', (key, area) => {
    const schemaFields = area.sections.flatMap((s) => s.fields.map((f) => f.name));
    const defaultFields = Object.keys(defaultContent[key]);
    for (const name of schemaFields) expect(defaultFields, `${key}.${name} missing from defaults`).toContain(name);
    for (const name of defaultFields) {
      if (NOT_EDITABLE[key]?.includes(name)) continue;
      expect(schemaFields, `${key}.${name} has no form field`).toContain(name);
    }
  });

  it.each(CONTENT_AREAS.map((a) => [a.key, a]))('%s: the current live content passes validation', (key, area) => {
    expect(validateContent(area, defaultContent[key])).toEqual({});
  });
});

describe('validation', () => {
  const settings = CONTENT_AREAS.find((a) => a.key === 'settings');

  it('reports problems by field path', () => {
    const errors = validateContent(settings, {
      ...defaultContent.settings,
      email: 'not-an-email',
      phone: '123',
      socialLinks: [{ platform: 'facebook', url: 'javascript:alert(1)' }],
    });
    expect(errors).toMatchObject({
      email: expect.any(String),
      phone: expect.any(String),
      'socialLinks.0.url': expect.stringMatching(/https/),
    });
  });

  it('requires alt text on images', () => {
    const contact = CONTENT_AREAS.find((a) => a.key === 'contact');
    const errors = validateContent(contact, { ...defaultContent.contact, officeImage: { src: 'asset:logo', alt: ' ' } });
    expect(errors.officeImage).toMatch(/screen readers/);
  });

  it('rejects duplicate link names in lists', () => {
    const mediation = CONTENT_AREAS.find((a) => a.key === 'mediation');
    const services = defaultContent.mediation.services.map((s) => ({ ...s, id: 'same' }));
    const errors = validateContent(mediation, { ...defaultContent.mediation, services });
    expect(errors['services.1.id']).toMatch(/different/);
  });

  it('allows only safe link types', () => {
    expect(isSafeUrl('https://example.com')).toBe(true);
    expect(isSafeUrl('/contact')).toBe(true);
    expect(isSafeUrl('mailto:a@b.co')).toBe(true);
    expect(isSafeUrl('#')).toBe(true);
    expect(isSafeUrl('#', { httpsOnly: true })).toBe(false);
    expect(isSafeUrl('//evil.com')).toBe(false);
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeUrl('http://example.com')).toBe(false);
  });

  it('rejects wrong data types that would crash the site (content written outside the dashboard)', () => {
    const home = CONTENT_AREAS.find((a) => a.key === 'home');
    const settings = CONTENT_AREAS.find((a) => a.key === 'settings');
    expect(validateContent(settings, { ...defaultContent.settings, socialLinks: 'oops' }).socialLinks).toMatch(/list/);
    expect(validateContent(home, { ...defaultContent.home, introHeading: { x: 1 } }).introHeading).toMatch(/text/);
    expect(validateContent(home, { ...defaultContent.home, services: ['x'] })['services.0']).toMatch(/format/);
    expect(validateContent(home, { ...defaultContent.home, heroSlides: [{ src: 'javascript:alert(1)', alt: 'x' }] })).not.toEqual({});
  });

  it('rejects protocol-relative links that would leave the site', () => {
    const home = CONTENT_AREAS.find((a) => a.key === 'home');
    const services = [{ ...defaultContent.home.services[0], link: '//evil.example' }];
    expect(validateContent(home, { ...defaultContent.home, services })['services.0.link']).toBeTruthy();
  });

  it('makes readable link names', () => {
    expect(slugify('Child Custody & Visitation Mediation')).toBe('child-custody-and-visitation-mediation');
    expect(slugify('  Ünïcode  Tëst ')).toBe('unicode-test');
  });
});
