import { defaultContent } from '../../content';
import { adminApi } from './api';
import { supabase } from './supabase';

const ENTRY_COLUMNS = 'key, title, kind, draft, published, draft_updated_at, draft_updated_by, published_at, published_by';

export const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * live:      what visitors currently see
 * status:    'original' (never edited; site shows the original copy)
 *            'draft'    (saved but never published)
 *            'changes'  (published, with unpublished edits)
 *            'published'(draft and live are the same)
 */
export function describeEntry(area, row) {
  if (!row) return { status: 'original', draft: defaultContent[area.key], live: defaultContent[area.key], row: null };
  if (!row.published) return { status: 'draft', draft: row.draft, live: defaultContent[area.key], row };
  return { status: deepEqual(row.draft, row.published) ? 'published' : 'changes', draft: row.draft, live: row.published, row };
}

export const STATUS_LABELS = {
  original: { label: 'Original content', tone: 'neutral', help: 'Not edited in the dashboard yet.' },
  draft: { label: 'Draft – not published', tone: 'warning', help: 'Edits are saved but visitors do not see them yet.' },
  changes: { label: 'Unpublished changes', tone: 'warning', help: 'Saved edits are waiting to be published.' },
  published: { label: 'Published', tone: 'success', help: 'Visitors see the latest version.' },
};

export async function listEntries() {
  const { data, error } = await supabase.from('content_entries').select(ENTRY_COLUMNS);
  if (error) throw error;
  return Object.fromEntries(data.map((row) => [row.key, row]));
}

export async function loadEntry(key) {
  const { data, error } = await supabase.from('content_entries').select(ENTRY_COLUMNS).eq('key', key).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveDraft(area, draft, exists) {
  if (!exists) {
    // Store the original copy first, so the history records exactly which
    // fields were edited rather than "everything" on the first save.
    const { error: createError } = await supabase
      .from('content_entries')
      .insert({ key: area.key, title: area.title, kind: area.kind, draft: defaultContent[area.key] });
    if (createError && createError.code !== '23505') throw createError; // 23505: someone else created it first
  }
  const { data, error } = await supabase.from('content_entries').update({ draft }).eq('key', area.key).select(ENTRY_COLUMNS).single();
  if (error) {
    // RLS hides rows the user cannot change, so an update matches nothing.
    if (error.code === 'PGRST116') throw new Error('You do not have permission to change this section.');
    throw error;
  }
  return data;
}

/**
 * Publish = record the version in the database, then ask Netlify to rebuild.
 * The database step is what matters; if the rebuild request fails the content
 * is still published and goes live on the next successful build.
 */
export async function publishEntry(key, note) {
  const { error } = await supabase.rpc('publish_content', { p_key: key, p_note: note ?? '' });
  if (error) throw error;
  try {
    const result = await adminApi('deploy', { method: 'POST' });
    return { deployed: true, message: result.message };
  } catch (deployError) {
    return { deployed: false, message: deployError.message };
  }
}

export async function listVersions(key) {
  const [{ data, error }, names] = await Promise.all([
    supabase.from('content_versions').select('id, created_at, note, created_by, data').eq('entry_key', key).order('created_at', { ascending: false }).limit(50),
    staffNames(),
  ]);
  if (error) throw error;
  return data.map((version) => ({ ...version, author: names[version.created_by] ?? 'Former user' }));
}

export async function restoreVersion(id) {
  const { data, error } = await supabase.rpc('restore_content_version', { p_version_id: id });
  if (error) throw error;
  return data;
}

export async function discardDraft(key) {
  const { data, error } = await supabase.rpc('discard_content_draft', { p_key: key });
  if (error) throw error;
  return data;
}

let namesCache = null;
export async function staffNames() {
  if (namesCache) return namesCache;
  const { data } = await supabase.rpc('staff_directory');
  namesCache = Object.fromEntries((data ?? []).map((row) => [row.id, row.display_name]));
  return namesCache;
}

export async function recentActivity({ limit = 50, before, entityType } = {}) {
  let query = supabase.from('audit_log').select('id, occurred_at, actor_email, action, entity_type, entity_id, summary, details').order('id', { ascending: false }).limit(limit);
  if (before) query = query.lt('id', before);
  if (entityType) query = query.eq('entity_type', entityType);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
