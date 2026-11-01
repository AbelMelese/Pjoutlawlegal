/**
 * Validate a content document against its schema. Returns a map of
 * "path" -> message, e.g. { "services.1.title": "Required" }.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function slugify(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

export function isSafeUrl(value, { httpsOnly = false } = {}) {
  if (value === '#') return !httpsOnly;
  if (/^https:\/\//i.test(value)) {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
  if (httpsOnly) return false;
  return /^\/(?!\/)/.test(value) || /^mailto:[^\s@]+@[^\s@]+$/i.test(value) || /^tel:\+?[0-9]{6,15}$/.test(value);
}

const isSafeImageSrc = (src) => /^asset:[a-z0-9-]+$/.test(src) || /^\/(?!\/)/.test(src) || isSafeUrl(src, { httpsOnly: true });

const isEmpty = (value) => value === undefined || value === null || (typeof value === 'string' && value.trim() === '');

function checkField(field, value, path, errors) {
  const fail = (message) => {
    errors[path] = message;
  };

  const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
  // Wrong data types (possible if content is written outside the dashboard) would crash the site.
  if (['list', 'strings', 'images'].includes(field.type) && value !== undefined && value !== null && !Array.isArray(value)) return fail('This must be a list.');
  if (['group', 'image'].includes(field.type) && value !== undefined && value !== null && !isObject(value)) return fail('This has the wrong format.');
  if (field.type === 'checkbox' && value !== undefined && typeof value !== 'boolean') return fail('This must be on or off.');
  if (!['list', 'strings', 'images', 'group', 'image', 'checkbox'].includes(field.type) && value !== undefined && value !== null && typeof value !== 'string') return fail('This must be text.');

  if (field.type === 'group') {
    for (const child of field.fields) checkField(child, value?.[child.name], `${path}.${child.name}`, errors);
    return;
  }
  if (field.type === 'list') {
    const items = Array.isArray(value) ? value : [];
    if (field.min && items.length < field.min) fail(`Add at least ${field.min}.`);
    if (field.max && items.length > field.max) fail(`No more than ${field.max}.`);
    items.forEach((item, index) => {
      if (!isObject(item)) {
        errors[`${path}.${index}`] = 'This item has the wrong format.';
        return;
      }
      for (const child of field.fields) checkField(child, item?.[child.name], `${path}.${index}.${child.name}`, errors);
    });
    if (field.fields.some((child) => child.type === 'slug')) {
      const slugField = field.fields.find((child) => child.type === 'slug');
      const seen = new Set();
      items.forEach((item, index) => {
        const slug = item?.[slugField.name];
        if (slug && seen.has(slug)) errors[`${path}.${index}.${slugField.name}`] = 'Each link name must be different.';
        seen.add(slug);
      });
    }
    return;
  }
  if (field.type === 'images') {
    const items = Array.isArray(value) ? value : [];
    if (field.min && items.length < field.min) fail(`Add at least ${field.min} image${field.min > 1 ? 's' : ''}.`);
    if (field.max && items.length > field.max) fail(`No more than ${field.max} images.`);
    items.forEach((image, index) => {
      if (!isObject(image) || typeof image.src !== 'string') errors[`${path}.${index}`] = 'This image has the wrong format.';
      else if (!image.src) errors[`${path}.${index}`] = 'Choose an image.';
      else if (!isSafeImageSrc(image.src)) errors[`${path}.${index}`] = 'Choose an image from the media library.';
      else if (!image.alt?.trim()) errors[`${path}.${index}`] = 'Describe this image for people using screen readers.';
    });
    return;
  }
  if (field.type === 'strings') {
    const items = Array.isArray(value) ? value : [];
    if (field.max && items.length > field.max) fail(`No more than ${field.max}.`);
    items.forEach((item, index) => {
      if (typeof item !== 'string') errors[`${path}.${index}`] = 'This must be text.';
      else if (isEmpty(item)) errors[`${path}.${index}`] = 'Fill in or remove this line.';
      else if (field.maxLength && item.length > field.maxLength) errors[`${path}.${index}`] = `Keep this under ${field.maxLength} characters.`;
    });
    return;
  }
  if (field.type === 'image') {
    if (value?.src !== undefined && typeof value.src !== 'string') return fail('This image has the wrong format.');
    if (value?.src && !isSafeImageSrc(value.src)) return fail('Choose an image from the media library.');
    if (field.required && !value?.src) fail('Choose an image.');
    else if (value?.src && !value.alt?.trim()) fail('Describe this image for people using screen readers.');
    return;
  }
  if (field.type === 'checkbox') return;

  if (isEmpty(value)) {
    if (field.required) fail('This is required.');
    return;
  }
  const text = String(value);
  if (field.maxLength && text.length > field.maxLength) return fail(`Keep this under ${field.maxLength} characters (now ${text.length}).`);
  if (field.type === 'email' && !EMAIL.test(text)) return fail('Enter a valid e-mail address.');
  if (field.type === 'phone' && text.replace(/\D/g, '').length < 10) return fail('Enter a full phone number, e.g. (202) 548-2999.');
  if (field.type === 'url' && !isSafeUrl(text, field)) {
    return fail(field.httpsOnly ? 'Enter a full address starting with https://' : 'Enter a full https:// address, or a page path such as /contact.');
  }
  if (field.type === 'link' && !isSafeUrl(text)) return fail('Choose a page.');
  if (field.type === 'slug' && !SLUG.test(text)) return fail('Use lower-case letters, numbers and dashes only.');
  if (field.type === 'select' && !field.options.some((option) => option.value === text)) fail('Choose an option.');
}

export function validateContent(area, doc) {
  const errors = {};
  for (const section of area.sections) {
    for (const field of section.fields) checkField(field, doc?.[field.name], field.name, errors);
  }
  return errors;
}
