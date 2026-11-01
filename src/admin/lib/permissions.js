/**
 * What each role may do, for showing and hiding controls. This MIRRORS the
 * database policies and server functions, which are what actually enforce
 * access. Keep the two in step when changing either.
 */
export const ROLE_LABELS = {
  super_admin: 'Super Administrator',
  owner: 'Website Owner',
  editor: 'Content Editor',
};

export const ROLE_DESCRIPTIONS = {
  super_admin: 'Everything, including users, technical settings and the full activity log. Must use two-factor sign-in.',
  owner: 'Edit and publish all content, business details and SEO; manage media; view traffic and site health.',
  editor: 'Edit page text and upload images as drafts. Cannot publish or change business details.',
};

const ALL = ['super_admin', 'owner', 'editor'];
const OWNERS = ['super_admin', 'owner'];

export const CAPABILITIES = {
  editPages: ALL,
  editSettings: OWNERS,
  editSeo: OWNERS,
  publish: OWNERS,
  restoreVersions: OWNERS,
  uploadMedia: ALL,
  deleteMedia: OWNERS,
  viewActivity: OWNERS,
  viewAnalytics: OWNERS,
  viewHealth: OWNERS,
  manageUsers: ['super_admin'],
};

export function can(role, capability) {
  return Boolean(role && CAPABILITIES[capability]?.includes(role));
}

/** Can this role edit a content entry of this kind (page/settings/seo)? Mirrors content_editor_roles(). */
export function canEditKind(role, kind) {
  return kind === 'page' ? can(role, 'editPages') : can(role, 'editSettings');
}

/** Basic strength rules; Supabase's own password policy is enforced server-side too. */
export function passwordProblems(password, email = '') {
  const problems = [];
  if (password.length < 12) problems.push('at least 12 characters');
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) problems.push('upper- and lower-case letters');
  if (!/\d/.test(password)) problems.push('a number');
  if (!/[^A-Za-z0-9]/.test(password)) problems.push('a symbol');
  const local = email.split('@')[0]?.toLowerCase();
  if (local && local.length > 3 && password.toLowerCase().includes(local)) problems.push('not your e-mail name');
  return problems;
}
