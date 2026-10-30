#!/usr/bin/env node
/**
 * Browser smoke test of the built admin against the Supabase stand-in.
 *   npm run test:e2e        (builds with mock settings, starts the stand-in, runs this)
 * Screenshots go to tests/e2e/screenshots/ (git-ignored).
 */
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

// Resolves a project install of playwright, or a global one.
const { chromium } = createRequire(import.meta.url)('playwright');

const BASE = process.env.E2E_BASE || 'http://localhost:4173';
const shots = fileURLToPath(new URL('./screenshots/', import.meta.url));
await mkdir(shots, { recursive: true });

const browser = await chromium.launch();
const failures = [];
const consoleErrors = [];

async function step(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failures.push(name);
    console.log(`  ✗ ${name}\n      ${error.message.split('\n')[0]}`);
  }
}

async function newPage(viewport = { width: 1366, height: 900 }) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  page.on('console', (msg) => msg.type() === 'error' && consoleErrors.push(`${page.url()}: ${msg.text()}`));
  page.on('pageerror', (err) => consoleErrors.push(`${page.url()}: ${err.message}`));
  return page;
}

async function signIn(page, email, password) {
  await page.goto(`${BASE}/admin`);
  await page.getByLabel('E-mail').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}

console.log('Owner journey');
const page = await newPage();

await step('unauthenticated /admin shows the sign-in page', async () => {
  await page.goto(`${BASE}/admin/pages`);
  await page.getByRole('heading', { name: 'Sign in' }).waitFor();
  assert.match(page.url(), /\/admin\/login$/);
  await page.screenshot({ path: `${shots}01-login.png` });
});

await step('wrong password shows a clear error', async () => {
  await page.getByLabel('E-mail').fill('owner@example.com');
  await page.getByLabel('Password').fill('wrong');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByText('That e-mail and password do not match.').waitFor();
});

await step('owner signs in and sees the overview', async () => {
  await signIn(page, 'owner@example.com', 'Owner-Password-123!');
  await page.getByRole('heading', { name: 'Welcome, Phyllis' }).waitFor();
  await page.getByText('Turn on two-step verification').waitFor();
  await page.screenshot({ path: `${shots}02-overview.png`, fullPage: true });
});

await step('owner menu hides super-admin-only sections', async () => {
  const nav = page.getByRole('navigation', { name: 'Dashboard' });
  assert.equal(await nav.getByRole('link', { name: 'Users & Permissions' }).count(), 0);
  assert.equal(await nav.getByRole('link', { name: 'Activity History' }).count(), 1);
});

await step('business details: invalid input is blocked with field errors', async () => {
  await page.goto(`${BASE}/admin/settings/business`);
  await page.getByRole('heading', { name: 'Business details' }).waitFor();
  await page.getByLabel(/^E-mail\b/).fill('not-an-email');
  await page.getByRole('button', { name: 'Save draft' }).click();
  await page.getByText('Enter a valid e-mail address.').waitFor();
  await page.screenshot({ path: `${shots}03-validation.png` });
});

await step('business details: save draft, preview shows the new phone', async () => {
  await page.getByLabel(/^E-mail\b/).fill('lawfirm@pjoutlawlegal.com');
  await page.getByLabel(/^Phone\b/).fill('(202) 555-0199');
  await page.getByRole('button', { name: 'Save draft' }).click();
  await page.getByText('Draft saved.').first().waitFor();
  await page.getByText('Draft – not published').waitFor();
  await page.getByRole('tab', { name: 'Preview' }).click();
  await page.locator('.public-preview').getByText('(202) 555-0199').first().waitFor();
  await page.screenshot({ path: `${shots}04-preview.png` });
});

await step('publish with a note triggers a site update', async () => {
  await page.getByRole('button', { name: 'Publish' }).click();
  await page.getByLabel('What changed? (optional)').fill('New main phone number');
  await page.getByRole('button', { name: 'Publish to the website' }).click();
  await page.getByText('The live website is updating.').waitFor();
  await page.getByText('Published', { exact: true }).waitFor();
  const state = await (await fetch(`${BASE}/__mock/state`)).json();
  assert.equal(state.deploys, 1);
});

await step('history lists the version; activity shows the change in words', async () => {
  await page.getByRole('button', { name: 'History' }).click();
  await page.getByText('“New main phone number”').waitFor();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.goto(`${BASE}/admin/activity`);
  await page.getByText('Published "Business details" from the dashboard for the first time').waitFor();
  await page.getByText('Changed: Phone').first().waitFor();
  await page.screenshot({ path: `${shots}05-activity.png` });
});

await step('home page editor: lists, reordering and unsaved-edit guard', async () => {
  await page.goto(`${BASE}/admin/pages/home`);
  await page.getByRole('heading', { name: 'Home page' }).waitFor();
  await page.getByRole('button', { name: 'Mediation Services' }).first().waitFor();
  await page.getByRole('button', { name: 'Move Terrance Howell down' }).click();
  await page.getByText('Unsaved edits', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Undo unsaved edits' }).click();
  assert.equal(await page.getByText('Unsaved edits', { exact: true }).count(), 0);
  await page.screenshot({ path: `${shots}06-home-editor.png`, fullPage: true });
});

await step('media library: upload, describe, and usage-aware delete', async () => {
  await page.goto(`${BASE}/admin/media`);
  await page.getByText('No files uploaded yet').waitFor();
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  await page.locator('input[type=file]').setInputFiles({ name: 'Office Front.png', mimeType: 'image/png', buffer: png });
  await page.getByRole('dialog').getByText('Office Front.png').first().waitFor();
  await page.getByLabel('Description (alt text)').fill('Front entrance of the H Street office');
  await page.getByRole('button', { name: 'Save details' }).click();
  await page.getByText('Details saved.').waitFor();
  await page.getByText('Not used on any page').waitFor();
  await page.screenshot({ path: `${shots}07-media.png` });
  await page.getByRole('button', { name: 'Close' }).last().click();
});

await step('rejects unsupported file types before upload', async () => {
  await page.locator('input[type=file]').setInputFiles({ name: 'evil.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') });
  await page.getByText(/only JPG, PNG, WebP, GIF, AVIF images and PDF/).waitFor();
});

await step('website health runs real checks', async () => {
  await page.goto(`${BASE}/admin/health`);
  await page.getByText('Home page answered in').waitFor();
  await page.getByText('Placeholder link that goes nowhere').first().waitFor();
  await page.screenshot({ path: `${shots}08-health.png`, fullPage: true });
});

await step('analytics shows an honest not-connected state, no numbers', async () => {
  await page.goto(`${BASE}/admin/analytics`);
  await page.getByText('Not connected', { exact: true }).waitFor();
  await page.screenshot({ path: `${shots}09-analytics.png` });
});

await step('public site picks up published content after a rebuild', async () => {
  // Simulate the Netlify rebuild: re-run the content fetch against the stand-in.
  const res = await fetch('http://localhost:54321/rest/v1/rpc/get_published_content', { method: 'POST', headers: { apikey: 'mock' }, body: '{}' });
  const rows = await res.json();
  assert.equal(rows.find((r) => r.key === 'settings').data.phone, '(202) 555-0199');
});

console.log('Editor journey');
const editorPage = await newPage({ width: 390, height: 844 });
await step('editor on a phone: limited menu and no Publish button', async () => {
  await signIn(editorPage, 'editor@example.com', 'Editor-Password-123!');
  await editorPage.getByRole('heading', { name: 'Welcome, Eddie' }).waitFor();
  await editorPage.getByRole('button', { name: 'Open menu' }).click();
  const nav = editorPage.getByRole('navigation', { name: 'Dashboard' });
  assert.equal(await nav.getByRole('link', { name: 'SEO Management' }).count(), 0);
  assert.equal(await nav.getByRole('link', { name: 'Users & Permissions' }).count(), 0);
  await editorPage.screenshot({ path: `${shots}10-editor-mobile-menu.png` });
  await nav.getByRole('link', { name: 'Pages' }).click();
  await editorPage.getByRole('link', { name: 'About the Principal' }).click();
  await editorPage.getByRole('button', { name: 'Save draft' }).waitFor();
  assert.equal(await editorPage.getByRole('button', { name: 'Publish' }).count(), 0);
  await editorPage.screenshot({ path: `${shots}11-editor-mobile-page.png`, fullPage: true });
});

await step('editor cannot change business details', async () => {
  await editorPage.goto(`${BASE}/admin/settings/business`);
  await editorPage.getByText('only the website owner or a super administrator can change it').waitFor();
  assert.equal(await editorPage.getByRole('button', { name: 'Save draft' }).count(), 0);
});

await step('editor cannot open owner-only screens by URL', async () => {
  await editorPage.goto(`${BASE}/admin/activity`);
  await editorPage.waitForURL(`${BASE}/admin`);
});

console.log('Super admin journey');
const superPage = await newPage();
await step('super admin must pass two-step verification', async () => {
  await signIn(superPage, 'super@example.com', 'Super-Password-123!');
  await superPage.getByRole('heading', { name: 'Two-step verification' }).waitFor();
  await superPage.getByLabel('Code').fill('000000');
  await superPage.getByRole('button', { name: 'Verify' }).click();
  await superPage.getByText('That code did not work.').waitFor();
  await superPage.getByLabel('Code').fill('123456');
  await superPage.getByRole('button', { name: 'Verify' }).click();
  await superPage.getByRole('heading', { name: 'Welcome, Sam' }).waitFor();
});

await step('users: invite and change role', async () => {
  await superPage.goto(`${BASE}/admin/users`);
  await superPage.getByText('owner@example.com').waitFor();
  await superPage.getByRole('button', { name: 'Invite someone' }).click();
  await superPage.getByLabel('E-mail').fill('new.editor@example.com');
  await superPage.getByRole('button', { name: 'Send invitation' }).click();
  await superPage.getByText('Invitation sent.').waitFor();
  await superPage.getByRole('cell', { name: /new\.editor@example\.com/ }).first().waitFor();
  await superPage.screenshot({ path: `${shots}12-users.png`, fullPage: true });
});

await step('SEO editor shows search previews', async () => {
  await superPage.goto(`${BASE}/admin/seo`);
  await superPage.getByRole('heading', { name: 'Search & sharing (SEO)' }).waitFor();
  await superPage.getByRole('tab', { name: 'Preview' }).click();
  await superPage.getByText('https://pjoutlawlegal.com/practice-areas').waitFor();
  await superPage.screenshot({ path: `${shots}13-seo-preview.png` });
});

console.log('Public site');
for (const [name, viewport] of [
  ['desktop', { width: 1440, height: 900 }],
  ['tablet', { width: 820, height: 1180 }],
  ['mobile', { width: 390, height: 844 }],
]) {
  const pub = await newPage(viewport);
  await step(`public pages render (${name})`, async () => {
    for (const path of ['/', '/mediation-services', '/practice-areas', '/about-phyllis-j-outlaw', '/contact', '/online-payment']) {
      await pub.goto(`${BASE}${path}`);
      await pub.locator('footer').last().waitFor();
    }
    await pub.goto(`${BASE}/contact`);
    await pub.waitForTimeout(400);
    await pub.screenshot({ path: `${shots}20-public-contact-${name}.png`, fullPage: true });
    assert.equal(await pub.title(), 'Phyllis J Outlaw Mediation Service | Divorce, Family & Business Mediation');
    await pub.goto(`${BASE}/practice-areas`);
    assert.equal(await pub.title(), 'Practice Areas & Case Highlights | Phyllis J. Outlaw & Associates');
  });
}

await browser.close();

const relevantErrors = consoleErrors.filter((line) => !/Failed to load resource|ERR_|paypal|grainy-gradients|fonts\.g|istockphoto/i.test(line));
if (relevantErrors.length) {
  console.log('\nConsole errors:');
  for (const line of [...new Set(relevantErrors)].slice(0, 20)) console.log(`  ${line}`);
}
console.log(failures.length ? `\n${failures.length} step(s) failed` : '\nAll steps passed');
process.exit(failures.length || relevantErrors.length ? 1 : 0);
