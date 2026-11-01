// @vitest-environment node
import { beforeAll, describe, expect, it } from 'vitest';
import { createDatabase, expectDenied } from './harness.js';

let t;
let superAdmin, owner, editor, noRole, inactive, ownerWithMfa;

const homeDraft = { introHeading: 'Hello', testimonials: [{ quote: 'Private client words', author: 'A' }] };

beforeAll(async () => {
  t = await createDatabase();
  superAdmin = await t.createUser('super@example.com', 'super_admin');
  owner = await t.createUser('owner@example.com', 'owner');
  editor = await t.createUser('editor@example.com', 'editor');
  noRole = await t.createUser('visitor@example.com');
  inactive = await t.createUser('former@example.com', 'owner', { active: false });
  ownerWithMfa = await t.createUser('owner2@example.com', 'owner', { mfa: true });
}, 60000);

const insertEntry = (db, key, kind, draft, title = key) =>
  db.query('insert into public.content_entries (key, title, kind, draft) values ($1, $2, $3, $4) returning *', [
    key,
    title,
    kind,
    JSON.stringify(draft),
  ]);

describe('profiles', () => {
  it('gives every new account a profile with no access', async () => {
    const { rows } = await t.asAdmin((db) => db.query('select role, is_active from public.profiles where id = $1', [noRole.id]));
    expect(rows[0]).toEqual({ role: null, is_active: true });
  });

  it('lets people read only their own profile, and super admins read all', async () => {
    const own = await t.asUser(editor, (db) => db.query('select email from public.profiles'));
    expect(own.rows.map((r) => r.email)).toEqual(['editor@example.com']);
    const all = await t.asUser(superAdmin, (db) => db.query('select email from public.profiles'), { aal: 'aal2' });
    expect(all.rows.length).toBe(6);
  });

  it('never lets a user change their own role', async () => {
    await expectDenied(t.asUser(editor, (db) => db.query(`update public.profiles set role = 'super_admin' where id = $1`, [editor.id])));
  });

  it('shows staff names to staff only', async () => {
    const asEditor = await t.asUser(editor, (db) => db.query('select display_name from public.staff_directory() order by 1'));
    expect(asEditor.rows.map((r) => r.display_name)).toContain('owner@example.com');
    expect(asEditor.rows.map((r) => r.display_name)).not.toContain('visitor@example.com');
    const asNobody = await t.asUser(noRole, (db) => db.query('select * from public.staff_directory()'));
    expect(asNobody.rows).toEqual([]);
  });

  it('lets users change their display name only through update_my_name', async () => {
    const { rows } = await t.asUser(editor, (db) => db.query(`select full_name, role from public.update_my_name('  Ed Itor  ')`));
    expect(rows[0]).toEqual({ full_name: 'Ed Itor', role: 'editor' });
  });
});

describe('content permissions', () => {
  it('lets editors create and edit page drafts', async () => {
    await t.asUser(editor, (db) => insertEntry(db, 'home', 'page', homeDraft, 'Home page'));
    const { rows } = await t.asUser(editor, (db) =>
      db.query(`update public.content_entries set draft = $1 where key = 'home' returning draft_updated_by`, [
        JSON.stringify({ ...homeDraft, introHeading: 'Welcome' }),
      ]),
    );
    expect(rows[0].draft_updated_by).toBe(editor.id);
  });

  it('keeps editors away from business settings and SEO', async () => {
    await expectDenied(t.asUser(editor, (db) => insertEntry(db, 'settings', 'settings', { phone: '1' })));
    await t.asUser(owner, (db) => insertEntry(db, 'settings', 'settings', { phone: '(202) 548-2999' }, 'Business settings'));
    const res = await t.asUser(editor, (db) =>
      db.query(`update public.content_entries set draft = '{"phone":"x"}' where key = 'settings' returning key`),
    );
    expect(res.rows).toEqual([]); // RLS hides the row from the update
  });

  it('derives who may edit from the key: editors cannot claim settings or SEO as a "page"', async () => {
    // Security review finding: before this check an editor could create these rows first.
    for (const key of ['seo']) {
      await expectDenied(t.asUser(editor, (db) => insertEntry(db, key, 'page', { defaultTitle: 'x' })), /check constraint/);
    }
    await expectDenied(t.asUser(owner, (db) => insertEntry(db, 'contact', 'settings', {})), /check constraint/);
  });

  it('only allows the sections the site renders', async () => {
    await expectDenied(t.asUser(editor, (db) => insertEntry(db, 'fakepage', 'page', {})), /check constraint/);
  });

  it('does not let anyone rename a section (titles appear in the history)', async () => {
    await expectDenied(t.asUser(owner, (db) => db.query(`update public.content_entries set title = 'Deleted by super admin' where key = 'home'`)));
  });

  it('does not let anyone write "published" directly; only publish_content can', async () => {
    await expectDenied(t.asUser(owner, (db) => db.query(`update public.content_entries set published = '{}' where key = 'home'`)));
  });

  it('does not let editors publish', async () => {
    await expectDenied(t.asUser(editor, (db) => db.query(`select public.publish_content('home', 'try')`)), /Only the website owner/);
  });

  it('gives accounts without a role, and deactivated accounts, nothing', async () => {
    for (const user of [noRole, inactive]) {
      const { rows } = await t.asUser(user, (db) => db.query('select key from public.content_entries'));
      expect(rows).toEqual([]);
      await expectDenied(t.asUser(user, (db) => insertEntry(db, 'about', 'page', {})));
      await expectDenied(t.asUser(user, (db) => db.query(`select public.publish_content('home')`)));
    }
  });

  it('rejects malformed content', async () => {
    await expectDenied(t.asUser(owner, (db) => insertEntry(db, 'bad key!', 'page', {})), /check constraint/);
    await expectDenied(
      t.asUser(owner, (db) => db.query(`insert into public.content_entries (key, title, kind, draft) values ('contact', 'x', 'page', '[]')`)),
      /check constraint/,
    );
  });
});

describe('publishing, history and restore', () => {
  it('publishes the draft, records a version, and exposes only published data publicly', async () => {
    const before = await t.asAnon((db) => db.query('select * from public.get_published_content()'));
    expect(before.rows).toEqual([]);

    const { rows } = await t.asUser(owner, (db) => db.query(`select * from public.publish_content('home', 'First publish')`));
    expect(rows[0]).toMatchObject({ entry_key: 'home', note: 'First publish', created_by: owner.id });

    await t.asUser(editor, (db) =>
      db.query(`update public.content_entries set draft = jsonb_set(draft, '{introHeading}', '"Unpublished edit"') where key = 'home'`),
    );
    const pub = await t.asAnon((db) => db.query('select * from public.get_published_content()'));
    expect(pub.rows).toEqual([{ key: 'home', data: { ...homeDraft, introHeading: 'Welcome' } }]);
  });

  it('never lets the public read drafts or history tables', async () => {
    await expectDenied(t.asAnon((db) => db.query('select * from public.content_entries')));
    await expectDenied(t.asAnon((db) => db.query('select * from public.content_versions')));
    await expectDenied(t.asAnon((db) => db.query(`select public.publish_content('home')`)));
  });

  it('restores an old version into the draft and discards drafts back to the live copy', async () => {
    const { rows: versions } = await t.asUser(owner, (db) =>
      db.query(`select id from public.content_versions where entry_key = 'home' order by id`),
    );
    const restored = await t.asUser(owner, (db) => db.query('select draft from public.restore_content_version($1)', [versions[0].id]));
    expect(restored.rows[0].draft.introHeading).toBe('Welcome');

    await t.asUser(editor, (db) => db.query(`update public.content_entries set draft = '{"introHeading":"oops"}' where key = 'home'`));
    const discarded = await t.asUser(editor, (db) => db.query(`select draft from public.discard_content_draft('home')`));
    expect(discarded.rows[0].draft.introHeading).toBe('Welcome');
  });

  it('only lets owners and super admins restore', async () => {
    await expectDenied(t.asUser(editor, (db) => db.query('select public.restore_content_version(1)')), /Only the website owner/);
  });
});

describe('two-factor authentication', () => {
  it('requires super admins to be signed in with MFA before changing anything', async () => {
    await expectDenied(t.asUser(superAdmin, (db) => insertEntry(db, 'about', 'page', {})));
    await expectDenied(t.asUser(superAdmin, (db) => db.query(`select public.publish_content('home')`)), /Only the website owner/);
    await t.asUser(superAdmin, (db) => insertEntry(db, 'about', 'page', { name: 'x' }), { aal: 'aal2' });
  });

  it('requires MFA from anyone who has enrolled it', async () => {
    await expectDenied(t.asUser(ownerWithMfa, (db) => db.query(`select public.publish_content('home')`)));
    await t.asUser(ownerWithMfa, (db) => db.query(`select public.publish_content('home')`), { aal: 'aal2' });
  });

  it('still lets super admins read while they set up MFA', async () => {
    const { rows } = await t.asUser(superAdmin, (db) => db.query('select key from public.content_entries order by key'));
    expect(rows.length).toBeGreaterThan(0);
  });
});

describe('audit log', () => {
  it('records who did what, with field names but not the content itself', async () => {
    const { rows } = await t.asUser(
      superAdmin,
      (db) => db.query(`select action, actor_email, summary, details from public.audit_log where entity_id = 'home' order by id`),
      { aal: 'aal2' },
    );
    const actions = rows.map((r) => r.action);
    expect(actions).toEqual(expect.arrayContaining(['content.created', 'content.draft_saved', 'content.published', 'content.version_restored']));
    const firstPublish = rows.find((r) => r.action === 'content.published');
    expect(firstPublish.summary).toMatch(/for the first time/);
    expect(firstPublish.details.fields).toBeNull();
    const saved = rows.find((r) => r.action === 'content.draft_saved');
    expect(saved.actor_email).toBe('editor@example.com');
    expect(saved.details.fields).toEqual(['introHeading']);
    expect(JSON.stringify(rows)).not.toContain('Private client words');
  });

  it('limits who can read it', async () => {
    const asEditor = await t.asUser(editor, (db) => db.query('select count(*)::int as n from public.audit_log'));
    expect(asEditor.rows[0].n).toBe(0);
    const asOwner = await t.asUser(owner, (db) => db.query('select distinct entity_type from public.audit_log'));
    expect(asOwner.rows.map((r) => r.entity_type).every((type) => ['content', 'media'].includes(type))).toBe(true);
  });

  it('cannot be written or edited from the browser', async () => {
    await expectDenied(
      t.asUser(superAdmin, (db) => db.query(`insert into public.audit_log (action, entity_type, summary) values ('x', 'x', 'fake')`), { aal: 'aal2' }),
    );
    await expectDenied(t.asUser(superAdmin, (db) => db.query(`delete from public.audit_log`), { aal: 'aal2' }));
    await expectDenied(t.asUser(superAdmin, (db) => db.query(`select public.write_audit('x', 'x', 'x', 'fake')`), { aal: 'aal2' }));
  });
});

describe('user administration', () => {
  it('is not callable from the browser at all', async () => {
    await expectDenied(
      t.asUser(superAdmin, (db) => db.query(`select public.set_user_access($1, $2, 'owner', true)`, [superAdmin.id, noRole.id]), { aal: 'aal2' }),
    );
  });

  it('lets the server grant access when the acting user is a super admin, and audits it', async () => {
    const { rows } = await t.asService((db) =>
      db.query(`select role, is_active from public.set_user_access($1, $2, 'editor', true)`, [superAdmin.id, noRole.id]),
    );
    expect(rows[0]).toEqual({ role: 'editor', is_active: true });
    const audit = await t.asAdmin((db) => db.query(`select actor_email, summary from public.audit_log where action = 'user.access_changed'`));
    expect(audit.rows[0]).toEqual({ actor_email: 'super@example.com', summary: 'Changed access for visitor@example.com: editor, active' });
  });

  it('refuses when the acting user is not a super admin', async () => {
    await expectDenied(
      t.asService((db) => db.query(`select public.set_user_access($1, $2, 'super_admin', true)`, [owner.id, owner.id])),
      /Only a super administrator/,
    );
  });

  it('never removes the last active super admin', async () => {
    await expectDenied(
      t.asService((db) => db.query(`select public.set_user_access($1, $1, 'owner', true)`, [superAdmin.id])),
      /At least one active super administrator/,
    );
  });
});

describe('media library', () => {
  const media = (overrides = {}) => ({
    storage_path: 'general/2026/photo.jpg',
    public_url: 'https://project.supabase.co/storage/v1/object/public/media/general/2026/photo.jpg',
    file_name: 'photo.jpg',
    mime_type: 'image/jpeg',
    size_bytes: 1000,
    ...overrides,
  });
  const insertMedia = (db, row) =>
    db.query(
      'insert into public.media (storage_path, public_url, file_name, mime_type, size_bytes) values ($1,$2,$3,$4,$5) returning id, uploaded_by',
      [row.storage_path, row.public_url, row.file_name, row.mime_type, row.size_bytes],
    );

  it('lets staff upload and records the uploader', async () => {
    const { rows } = await t.asUser(editor, (db) => insertMedia(db, media()));
    expect(rows[0].uploaded_by).toBe(editor.id);
  });

  it('rejects unsafe file types, oversized files and non-https URLs', async () => {
    await expectDenied(t.asUser(editor, (db) => insertMedia(db, media({ storage_path: 'a/x.svg', mime_type: 'image/svg+xml' }))), /check constraint/);
    await expectDenied(t.asUser(editor, (db) => insertMedia(db, media({ storage_path: 'a/big.jpg', size_bytes: 20000000 }))), /check constraint/);
    await expectDenied(t.asUser(editor, (db) => insertMedia(db, media({ storage_path: 'a/h.jpg', public_url: 'http://x/h.jpg' }))), /check constraint/);
    // Security review: rows pointing at other websites or escaping folders.
    await expectDenied(t.asUser(editor, (db) => insertMedia(db, media({ storage_path: 'a/t.png', public_url: 'https://evil.example/track.png' }))), /check constraint/);
    await expectDenied(
      t.asUser(editor, (db) => insertMedia(db, media({ storage_path: 'general/../pages/x.png', public_url: 'https://p.supabase.co/storage/v1/object/public/media/general/../pages/x.png' }))),
      /check constraint/,
    );
  });

  it('only lets owners and super admins delete files', async () => {
    const deleted = await t.asUser(editor, (db) => db.query('delete from public.media returning id'));
    expect(deleted.rows).toEqual([]);
    const ownerDelete = await t.asUser(owner, (db) => db.query('delete from public.media returning id'));
    expect(ownerDelete.rows.length).toBe(1);
  });

  it('protects the storage bucket the same way', async () => {
    await t.asUser(editor, (db) => db.query(`insert into storage.objects (bucket_id, name) values ('media', 'general/a.jpg')`));
    await expectDenied(t.asAnon((db) => db.query(`insert into storage.objects (bucket_id, name) values ('media', 'general/b.jpg')`)));
    const stranger = await t.createUser('stranger@example.com');
    await expectDenied(t.asUser(stranger, (db) => db.query(`insert into storage.objects (bucket_id, name) values ('media', 'general/c.jpg')`)));
    await expectDenied(t.asUser(inactive, (db) => db.query(`insert into storage.objects (bucket_id, name) values ('media', 'general/d.jpg')`)));
    // Security review: deletes used to match nothing (no SELECT policy), leaving files public.
    const removed = await t.asUser(owner, (db) => db.query(`delete from storage.objects where bucket_id = 'media' and name = 'general/a.jpg' returning name`));
    expect(removed.rows).toEqual([{ name: 'general/a.jpg' }]);
    const bucket = await t.asAdmin((db) => db.query(`select public, file_size_limit, allowed_mime_types from storage.buckets where id = 'media'`));
    expect(bucket.rows[0].allowed_mime_types).not.toContain('image/svg+xml');
  });
});
