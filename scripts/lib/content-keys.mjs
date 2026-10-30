/** Content entries the public site knows how to render. */
export const CONTENT_KEYS = ['settings', 'home', 'mediation', 'practiceAreas', 'about', 'contact', 'seo', 'privacy', 'terms'];

/**
 * Validate rows from get_published_content() -> { key: data }.
 * Unknown keys are ignored (e.g. entries added for a future release);
 * malformed data aborts the build.
 */
export function validatePublishedPayload(rows) {
  if (!Array.isArray(rows)) throw new Error('Published content response was not a list.');
  const content = {};
  for (const row of rows) {
    if (!row || typeof row.key !== 'string') throw new Error('Published content row is missing its key.');
    if (!CONTENT_KEYS.includes(row.key)) continue;
    if (!row.data || typeof row.data !== 'object' || Array.isArray(row.data)) {
      throw new Error(`Published content for "${row.key}" is not an object.`);
    }
    content[row.key] = row.data;
  }
  return content;
}
