// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { checkContentLinks } from '../../src/admin/lib/linkCheck';
import { defaultContent } from '../../src/content';

describe('content link checker', () => {
  it('finds no problems in the current site content', () => {
    // Previously: "#" Terms/Privacy links and a photo hot-linked from iStock.
    expect(checkContentLinks(defaultContent)).toEqual([]);
  });

  it('still flags placeholder links and images from other websites', () => {
    const content = {
      ...defaultContent,
      settings: { ...defaultContent.settings, termsUrl: '#' },
      contact: { ...defaultContent.contact, officeImage: { src: 'https://media.istockphoto.com/x.jpg', alt: 'x' } },
    };
    const summary = checkContentLinks(content).map((i) => `${i.areaKey}:${i.path}:${i.severity}`);
    expect(summary).toEqual(['contact:officeImage.src:warning', 'settings:termsUrl:warning']);
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
