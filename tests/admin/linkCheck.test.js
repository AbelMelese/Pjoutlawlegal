// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { checkContentLinks } from '../../src/admin/lib/linkCheck';
import { defaultContent } from '../../src/content';

describe('content link checker', () => {
  it('finds the real problems in the current site content', () => {
    const issues = checkContentLinks(defaultContent);
    const summary = issues.map((i) => `${i.areaKey}:${i.path}:${i.severity}`);
    // Terms of Use / Privacy Policy are "#" placeholders on the live site today.
    expect(summary).toContain('settings:termsUrl:warning');
    expect(summary).toContain('settings:privacyUrl:warning');
    // The Contact page photo is hot-linked from iStock.
    expect(summary).toContain('contact:officeImage.src:warning');
    expect(issues.filter((i) => i.severity === 'error')).toEqual([]);
  });

  it('flags broken internal links, anchors and images', () => {
    const content = {
      ...defaultContent,
      home: {
        ...defaultContent.home,
        services: [
          { title: 'A', description: 'x', link: '/no-such-page' },
          { title: 'B', description: 'x', link: '/practice-areas#construction' },
          { title: 'C', description: 'x', link: '/mediation-services#nope' },
          { title: 'D', description: 'x', link: '/blog' },
        ],
        heroSlides: [
          { src: 'asset:gone', alt: 'x' },
          { src: 'https://p.supabase.co/storage/v1/object/public/media/deleted.jpg', alt: 'x' },
          { src: 'https://p.supabase.co/storage/v1/object/public/media/kept.jpg', alt: 'x' },
        ],
      },
    };
    const media = new Set(['https://p.supabase.co/storage/v1/object/public/media/kept.jpg']);
    const problems = checkContentLinks(content, media)
      .filter((i) => i.areaKey === 'home')
      .map((i) => [i.path, i.severity, i.problem]);
    expect(problems).toEqual([
      ['heroSlides.0.src', 'error', 'Image is missing'],
      ['heroSlides.1.src', 'error', 'Image was deleted from the media library'],
      ['services.0.link', 'error', 'Links to a page that does not exist'],
      ['services.2.link', 'error', 'Links to a section (#nope) that does not exist'],
      ['services.3.link', 'warning', 'Links to an old address that redirects; link to the page directly'],
    ]);
  });
});
