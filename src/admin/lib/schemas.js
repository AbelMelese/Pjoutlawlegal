/**
 * Editable content areas and their form fields. Field names match the JSON in
 * src/content/defaults/*.json; anything visual (colours, layout) stays in code.
 *
 * Field types: text, textarea, url, link, email, phone, image, images, list,
 * strings, group, checkbox, select, slug.
 */

export const SITE_PAGES = [
  { value: '/', label: 'Home' },
  { value: '/mediation-services', label: 'Mediation Services' },
  { value: '/practice-areas', label: 'Practice Areas & Case Highlights' },
  { value: '/about-phyllis-j-outlaw', label: 'About the Principal' },
  { value: '/online-payment', label: 'Online Payment' },
  { value: '/contact', label: 'Contact Us' },
];

const heading = (name, label, help) => ({ name, label, type: 'text', maxLength: 120, required: true, help });
const quoteFields = (attributionName = 'attribution', attributionLabel = 'Name and location') => [
  { name: 'quote', label: 'Quote', type: 'textarea', maxLength: 1200, required: true },
  { name: attributionName, label: attributionLabel, type: 'text', maxLength: 160, required: true },
];

export const CONTENT_AREAS = [
  {
    key: 'home',
    title: 'Home page',
    kind: 'page',
    route: '/',
    summary: 'Slideshow, service cards and client testimonials.',
    sections: [
      {
        title: 'Slideshow',
        fields: [
          { name: 'heroSlides', label: 'Slides', type: 'images', help: 'Shown in order, changing every 4 seconds. Use wide images (about 1920 × 800).', min: 1, max: 8 },
        ],
      },
      {
        title: 'Services',
        fields: [
          heading('introHeading', 'Section heading'),
          {
            name: 'services',
            label: 'Service cards',
            type: 'list',
            itemLabel: 'Service',
            titleField: 'title',
            min: 1,
            max: 8,
            help: 'The card titles also appear as the three labels above the cards.',
            fields: [
              { name: 'title', label: 'Title', type: 'text', maxLength: 80, required: true },
              { name: 'description', label: 'Description', type: 'textarea', maxLength: 1200, required: true },
              { name: 'link', label: '"Learn More" goes to', type: 'link', required: true },
            ],
          },
        ],
      },
      {
        title: 'Testimonials',
        fields: [
          heading('testimonialsHeading', 'Heading (first part)'),
          heading('testimonialsHeadingAccent', 'Heading (gold part)'),
          {
            name: 'testimonials',
            label: 'Testimonials',
            type: 'list',
            itemLabel: 'Testimonial',
            titleField: 'author',
            min: 1,
            max: 12,
            help: 'Only publish testimonials you have the client’s permission to use.',
            fields: [
              { name: 'quote', label: 'Quote', type: 'textarea', maxLength: 1200, required: true },
              { name: 'author', label: 'Client name', type: 'text', maxLength: 80, required: true },
              { name: 'role', label: 'Location', type: 'text', maxLength: 80 },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'mediation',
    title: 'Mediation Services',
    kind: 'page',
    route: '/mediation-services',
    summary: 'Mediation services, the seven-step process, benefits and reviews.',
    sections: [
      { title: 'Banner', fields: [{ name: 'heroImage', label: 'Banner image', type: 'image', required: true }] },
      {
        title: 'Services',
        fields: [
          {
            name: 'services',
            label: 'Mediation services',
            type: 'list',
            itemLabel: 'Service',
            titleField: 'title',
            min: 1,
            max: 10,
            fields: [
              { name: 'title', label: 'Title', type: 'text', maxLength: 100, required: true },
              { name: 'subtitle', label: 'Tagline', type: 'text', maxLength: 100 },
              { name: 'description', label: 'Description', type: 'textarea', maxLength: 1500, required: true },
              { name: 'benefits', label: 'Bullet points', type: 'strings', itemLabel: 'Bullet', max: 12, maxLength: 160 },
              { name: 'image', label: 'Photo', type: 'image' },
              { name: 'id', label: 'Link name', type: 'slug', from: 'title', help: 'Used in links such as /mediation-services#family. Changing it breaks existing links.' },
            ],
          },
          { name: 'ctaLabel', label: 'Button text under each service', type: 'text', maxLength: 60, required: true },
        ],
      },
      {
        title: 'How mediation works',
        fields: [
          { name: 'stepsEyebrow', label: 'Small label', type: 'text', maxLength: 60 },
          heading('stepsHeading', 'Heading (first part)'),
          heading('stepsHeadingAccent', 'Heading (highlighted part)'),
          {
            name: 'steps',
            label: 'Steps',
            type: 'list',
            itemLabel: 'Step',
            titleField: 'title',
            min: 1,
            max: 12,
            fields: [
              { name: 'title', label: 'Step title', type: 'text', maxLength: 80, required: true },
              { name: 'description', label: 'Description', type: 'textarea', maxLength: 600, required: true },
            ],
          },
        ],
      },
      {
        title: 'Why choose mediation',
        fields: [
          { name: 'benefitsEyebrow', label: 'Small label', type: 'text', maxLength: 60 },
          heading('benefitsHeading', 'Heading (first part)'),
          heading('benefitsHeadingAccent', 'Heading (highlighted part)'),
          { name: 'benefitsImage', label: 'Photo', type: 'image' },
          {
            name: 'benefits',
            label: 'Benefits',
            type: 'list',
            itemLabel: 'Benefit',
            titleField: 'title',
            max: 12,
            fields: [
              { name: 'title', label: 'Title', type: 'text', maxLength: 60, required: true },
              { name: 'description', label: 'Description', type: 'textarea', maxLength: 300, required: true },
            ],
          },
        ],
      },
      {
        title: 'Reviews',
        fields: [
          { name: 'reviewsEyebrow', label: 'Small label', type: 'text', maxLength: 60 },
          heading('reviewsHeading', 'Heading (first part)'),
          heading('reviewsHeadingAccent', 'Heading (highlighted part)'),
          { name: 'reviews', label: 'Reviews', type: 'list', itemLabel: 'Review', titleField: 'attribution', max: 12, fields: quoteFields() },
        ],
      },
    ],
  },
  {
    key: 'practiceAreas',
    title: 'Practice Areas & Case Highlights',
    kind: 'page',
    route: '/practice-areas',
    summary: 'Practice areas with case highlights, business consulting and testimonials.',
    sections: [
      {
        title: 'Introduction',
        fields: [
          { name: 'eyebrow', label: 'Small label above the title', type: 'text', maxLength: 80 },
          heading('title', 'Page title'),
          { name: 'introduction', label: 'Introduction', type: 'textarea', maxLength: 2000, required: true },
        ],
      },
      {
        title: 'Practice areas',
        fields: [
          {
            name: 'areas',
            label: 'Practice areas',
            type: 'list',
            itemLabel: 'Practice area',
            titleField: 'title',
            min: 1,
            max: 12,
            help: 'Describe only work the firm actually does and results it actually obtained.',
            fields: [
              { name: 'title', label: 'Title', type: 'text', maxLength: 120, required: true },
              { name: 'description', label: 'Description', type: 'textarea', maxLength: 2000, required: true },
              { name: 'caseHighlight', label: 'Case highlight', type: 'textarea', maxLength: 2000 },
              { name: 'image', label: 'Photo', type: 'image', required: true },
              { name: 'id', label: 'Link name', type: 'slug', from: 'title', help: 'Used in links such as /practice-areas#construction. Changing it breaks existing links.' },
            ],
          },
          { name: 'caseHighlightLabel', label: 'Label above each case highlight', type: 'text', maxLength: 40, required: true },
          { name: 'consultation', label: 'Call-to-action text (calls the office phone number)', type: 'text', maxLength: 120, required: true },
        ],
      },
      {
        title: 'Featured testimonial',
        help: 'Shown after the second practice area.',
        fields: [
          {
            name: 'testimonial',
            type: 'group',
            fields: [{ name: 'title', label: 'Label', type: 'text', maxLength: 60, required: true }, ...quoteFields()],
          },
        ],
      },
      {
        title: 'Business consulting',
        fields: [
          {
            name: 'businessConsulting',
            type: 'group',
            fields: [
              heading('title', 'Heading'),
              { name: 'description', label: 'Description', type: 'textarea', maxLength: 2000, required: true },
              heading('benefitsTitle', 'Benefits heading'),
              { name: 'benefits', label: 'Benefits', type: 'strings', itemLabel: 'Benefit', max: 15, maxLength: 160 },
              heading('testimonialsTitle', 'Testimonials heading'),
              { name: 'testimonials', label: 'Testimonials', type: 'list', itemLabel: 'Testimonial', titleField: 'attribution', max: 8, fields: quoteFields() },
            ],
          },
        ],
      },
      { title: 'Closing button', fields: [{ name: 'ctaLabel', label: 'Button text (goes to Contact Us)', type: 'text', maxLength: 60, required: true }] },
    ],
  },
  {
    key: 'about',
    title: 'About the Principal',
    kind: 'page',
    route: '/about-phyllis-j-outlaw',
    summary: 'Biography, credentials and media appearances.',
    sections: [
      { title: 'Banner', fields: [{ name: 'heroImage', label: 'Banner image', type: 'image', required: true }] },
      {
        title: 'Biography',
        fields: [
          { name: 'portrait', label: 'Portrait', type: 'image', required: true },
          { name: 'name', label: 'Name', type: 'text', maxLength: 80, required: true },
          { name: 'role', label: 'Title', type: 'text', maxLength: 80, required: true },
          { name: 'bio', label: 'Biography', type: 'textarea', maxLength: 4000, required: true },
        ],
      },
      {
        title: 'Credentials',
        help: 'Admissions, bar memberships, certificates and education must be accurate and current.',
        fields: [
          {
            name: 'highlights',
            label: 'Credential cards',
            type: 'list',
            itemLabel: 'Card',
            titleField: 'title',
            max: 12,
            fields: [
              { name: 'title', label: 'Card title', type: 'text', maxLength: 60, required: true },
              { name: 'items', label: 'Lines', type: 'strings', itemLabel: 'Line', max: 12, maxLength: 200 },
            ],
          },
        ],
      },
      {
        title: 'Media appearances',
        fields: [
          heading('mediaHeading', 'Heading'),
          { name: 'mediaText', label: 'Text', type: 'textarea', maxLength: 600 },
          { name: 'mediaLogos', label: 'Logo strip image', type: 'image' },
        ],
      },
    ],
  },
  {
    key: 'contact',
    title: 'Contact Us',
    kind: 'page',
    route: '/contact',
    summary: 'Contact page text. Phone, e-mail, hours and address come from Business details.',
    sections: [
      { title: 'Banner', fields: [{ name: 'heroImage', label: 'Banner image', type: 'image', required: true }] },
      {
        title: 'Contact card',
        help: 'Phone, fax, e-mail and office hours are edited in Business details.',
        fields: [
          heading('heading', 'Heading'),
          { name: 'callButtonLabel', label: 'Call button text', type: 'text', maxLength: 40, required: true },
        ],
      },
      {
        title: 'Office location',
        fields: [
          heading('officeHeading', 'Heading (first line)'),
          heading('officeHeadingAccent', 'Heading (highlighted line)'),
          { name: 'officeText', label: 'Text', type: 'textarea', maxLength: 2000, required: true },
          { name: 'officeImage', label: 'Photo', type: 'image' },
        ],
      },
    ],
  },
  {
    key: 'settings',
    title: 'Business details',
    kind: 'settings',
    route: '/contact',
    summary: 'Name, phone, fax, e-mail, address, office hours, social links and footer.',
    sections: [
      {
        title: 'Business',
        fields: [
          { name: 'businessName', label: 'Business name', type: 'text', maxLength: 100, required: true },
          { name: 'footerTagline', label: 'Footer description', type: 'textarea', maxLength: 300 },
          { name: 'copyright', label: 'Copyright line', type: 'text', maxLength: 120, required: true },
        ],
      },
      {
        title: 'Contact details',
        help: 'Used in the header, footer, Contact page and call buttons across the site.',
        fields: [
          { name: 'headerCallout', label: 'Text beside the phone number in the header', type: 'text', maxLength: 40 },
          { name: 'phone', label: 'Phone', type: 'phone', required: true },
          { name: 'fax', label: 'Fax', type: 'phone' },
          { name: 'email', label: 'E-mail', type: 'email', required: true },
        ],
      },
      {
        title: 'Office',
        fields: [
          { name: 'addressLine1', label: 'Street address', type: 'text', maxLength: 120, required: true },
          { name: 'addressLine2', label: 'City, state and ZIP', type: 'text', maxLength: 120, required: true },
          { name: 'officeHoursDays', label: 'Office days', type: 'text', maxLength: 60 },
          { name: 'officeHoursTime', label: 'Office hours', type: 'text', maxLength: 60 },
        ],
      },
      {
        title: 'Social media and legal links',
        fields: [
          {
            name: 'socialLinks',
            label: 'Social media links',
            type: 'list',
            itemLabel: 'Link',
            titleField: 'platform',
            max: 4,
            fields: [
              {
                name: 'platform',
                label: 'Platform',
                type: 'select',
                required: true,
                options: [
                  { value: 'facebook', label: 'Facebook' },
                  { value: 'youtube', label: 'YouTube' },
                  { value: 'twitter', label: 'X (Twitter)' },
                  { value: 'linkedin', label: 'LinkedIn' },
                ],
              },
              { name: 'url', label: 'Profile address', type: 'url', required: true, httpsOnly: true },
            ],
          },
          { name: 'termsUrl', label: 'Terms of Use link', type: 'url', help: 'Currently "#" (goes nowhere). Add the page address when one exists.' },
          { name: 'privacyUrl', label: 'Privacy Policy link', type: 'url', help: 'Currently "#" (goes nowhere). Add the page address when one exists.' },
        ],
      },
    ],
  },
  {
    key: 'seo',
    title: 'Search & sharing (SEO)',
    kind: 'seo',
    route: '/',
    summary: 'Page titles and descriptions shown in Google and in shared links.',
    sections: [
      {
        title: 'Defaults',
        help: 'Used for any page that does not have its own title or description.',
        fields: [
          { name: 'defaultTitle', label: 'Default page title', type: 'text', maxLength: 120, recommended: 60, required: true },
          { name: 'titleSuffix', label: 'Added after page titles', type: 'text', maxLength: 60 },
          { name: 'defaultDescription', label: 'Default description', type: 'textarea', maxLength: 320, recommended: 160, required: true },
          { name: 'defaultOgImage', label: 'Default image for shared links', type: 'url', httpsOnly: true, help: 'Full https:// address of an image, e.g. from the Media Library (1200 × 630 works best).' },
        ],
      },
      {
        title: 'Individual pages',
        fields: [
          {
            name: 'pages',
            label: 'Pages',
            type: 'list',
            fixed: true,
            titleField: 'label',
            fields: [
              { name: 'title', label: 'Page title', type: 'text', maxLength: 120, recommended: 55, help: 'Leave empty to use the default title.' },
              { name: 'description', label: 'Description', type: 'textarea', maxLength: 320, recommended: 160, help: 'Leave empty to use the default description.' },
              { name: 'ogImage', label: 'Image for shared links', type: 'url', httpsOnly: true },
              { name: 'noindex', label: 'Hide this page from search engines', type: 'checkbox' },
            ],
          },
        ],
      },
    ],
  },
];

export const AREA_BY_KEY = Object.fromEntries(CONTENT_AREAS.map((area) => [area.key, area]));

/** Dashboard address of the editor for a content area. */
export function editorPath(key) {
  if (key === 'seo') return '/admin/seo';
  if (key === 'settings') return '/admin/settings/business';
  return `/admin/pages/${key}`;
}
export const PAGE_AREAS = CONTENT_AREAS.filter((area) => area.kind === 'page');

/** Where each "service" lives, for the Services shortcut screen. */
export const SERVICE_LISTS = [
  { area: 'mediation', field: 'services', label: 'Mediation services', description: 'The services listed on the Mediation Services page.' },
  { area: 'practiceAreas', field: 'areas', label: 'Practice areas', description: 'Practice areas and case highlights.' },
  { area: 'home', field: 'services', label: 'Home page service cards', description: 'The three summary cards on the Home page.' },
];
