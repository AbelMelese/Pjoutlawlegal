# Developer guide: Website Manager (CMS + admin dashboard)

This guide covers the content management system and admin dashboard added on
the `feature/admin-cms` branch. The public site is unchanged in look and URLs.

## 1. Architecture

```
            ┌──────────────────────── Netlify ────────────────────────┐
Visitor ──► │  dist/ (static React SPA, pre-rendered <head> per page)  │
            │  /api/*        Edge Function: PayPal (unchanged)         │
Admin   ──► │  /admin/*      same SPA, lazy-loaded admin bundle        │
            │  /admin-api/*  Functions: deploy, users, status          │
            └──────────┬───────────────────────────────▲──────────────┘
                       │ anon key + user JWT (RLS)      │ build hook
                       ▼                                │
            ┌──────── Supabase ────────┐      "Publish" ─┘
            │ Auth (password + TOTP)   │
            │ Postgres + RLS           │◄── build: get_published_content()
            │ Storage bucket "media"   │
            └──────────────────────────┘
```

* **Content model.** Each editable area is one row in `content_entries`
  (`home`, `mediation`, `practiceAreas`, `about`, `contact`, `settings`,
  `seo`) holding a JSON `draft` and `published` document. The defaults
  (the original site copy) live in `src/content/defaults/*.json`.
* **Publishing.** `publish_content()` copies draft → published and stores a
  version; the dashboard then calls `/admin-api/deploy`, which triggers the
  Netlify build hook. `scripts/fetch-content.mjs` runs before `vite build`,
  downloads published content and bakes it into the bundle. The live site
  therefore never depends on Supabase being up, and search engines see the
  content in the built pages.
* **Safety.** If Supabase is configured but the fetch fails, the build fails
  and Netlify keeps the previous deploy. Without Supabase settings the build
  uses the defaults (local dev, forks).
* **Preview.** The admin renders the real page components wrapped in
  `<ContentPreviewProvider>` with the unsaved form state.
* **Why not a third-party CMS?** Chosen with the site owner (Oct 30, 2026):
  Supabase gives auth with MFA, roles enforced in the database, storage and an
  audit log in one free-tier service, without replacing the React site.

## 2. Project structure (new parts)

| Path | Purpose |
| --- | --- |
| `src/content/` | Content layer: defaults, `useContent()`, image resolver, SEO helpers |
| `src/components/RouteSeo.jsx` | Keeps title/description/canonical/OG tags in sync per route |
| `src/admin/` | Admin app (`AdminApp.jsx`), `lib/` (auth, API, schemas, validation, media), `components/`, `pages/` |
| `src/admin/lib/schemas.js` | Form definitions for each content area (add fields here) |
| `netlify/functions/` | `admin-deploy`, `admin-users`, `admin-status` (+ `_lib/admin.mjs`) |
| `supabase/migrations/` | Database schema, RLS policies, functions, storage bucket |
| `scripts/` | `fetch-content.mjs` (prebuild), `postbuild.mjs` (per-page HTML, robots, sitemap) |
| `tests/` | `public/` render snapshots, `db/` RLS tests on PGlite, `functions/`, `admin/`, `e2e/` |

## 3. Local development

```bash
npm install
cp .env.example .env        # fill in VITE_SUPABASE_* to use the admin locally
npm run dev                 # public site + admin UI (no server functions)
npx netlify dev             # also runs /admin-api and the PayPal edge function
```

Without Supabase variables the public site works normally and `/admin`
explains that the dashboard is not connected.

## 4. Supabase setup (one time)

1. Create a project at supabase.com (owned by the account that will own the
   site's services).
2. Apply the migrations, either with the CLI (`supabase link` then
   `supabase db push`) or by pasting each file in `supabase/migrations/` into
   the SQL editor **in filename order**.
3. **Authentication → Providers → Email:** keep e-mail sign-in on; **turn
   OFF "Allow new users to sign up"** (accounts are invitation-only).
4. **Authentication → Multi-Factor:** enable TOTP.
5. **Authentication → Policies / Passwords:** minimum length 12, require
   lower, upper, digits and symbols; enable leaked-password protection if
   your plan offers it; enable "Secure password change".
6. **Authentication → URL configuration:** Site URL
   `https://pjoutlawlegal.com`; add redirect URLs
   `https://pjoutlawlegal.com/admin/set-password` and your Netlify
   deploy-preview pattern (e.g. `https://*--<site-name>.netlify.app/admin/set-password`).
7. **Authentication → SMTP:** configure a real e-mail sender (e.g. Resend,
   Postmark). The built-in sender is rate-limited and meant for testing.
8. Create the first super admin: invite yourself from
   **Authentication → Users → Invite**, accept the e-mail, then in the SQL
   editor run:
   ```sql
   update public.profiles set role = 'super_admin' where email = 'you@example.com';
   ```
   Sign in at `/admin`, then set up two-step verification under **Settings**
   (super admins cannot change anything until they do). Invite everyone else
   from **Users & Permissions**.

## 5. Netlify configuration

Environment variables (see `.env.example`):

| Variable | Scope | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Builds | Public by design; RLS protects data |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Functions | **Secret.** Never expose to the browser |
| `NETLIFY_BUILD_HOOK_URL` | Functions | Create under Build & deploy → Build hooks |
| `PAYPAL_*` | Functions | Unchanged |

`netlify.toml` adds the functions directory, security headers (HSTS,
nosniff, frame-deny, referrer and permissions policies) and
`noindex`/`no-store` for `/admin/*`.

**Verify on the first deploy preview** that `/contact` returns 200 without
redirecting to `/contact/` (pre-rendered pages are written as flat
`contact.html` files for exactly this reason).

## 6. Security model

* All tables use RLS; the browser only has the anon key or a user JWT.
* Roles: `super_admin`, `owner`, `editor`, or none (no access).
  `content_editor_roles()` + policies decide who may edit which kind of
  content; `publish_content`, `restore_content_version` and
  `discard_content_draft` re-check roles inside the function.
* Column privileges stop anyone writing `published` directly.
* MFA: super admins need an `aal2` session to change anything; anyone who has
  enrolled MFA must use it (`mfa_satisfied()`). The Netlify functions apply
  the same rule.
* `audit_log` is written only by triggers/security-definer functions and
  records changed field **names**, never content values.
* User administration (`set_user_access`) is callable only with the service
  role, from `/admin-api/users`, and refuses to remove the last active super
  admin. Deactivation also bans the Auth account.
* Media: bucket allows JPG/PNG/WebP/GIF/AVIF/PDF up to 10 MB (no SVG).
  Large photos are resized client-side to 2400px.
* Image and link fields only accept `https://` or site-relative URLs.

## 7. Adding or changing editable content

1. Add the field to the relevant `src/content/defaults/<area>.json`.
2. Use it in the page via `useContent('<area>')`.
3. Add a field definition in `src/admin/lib/schemas.js`.
4. `npm test`: the schema tests fail if a default field has no form field,
   or if the current content fails validation.

New *kinds* of page need a route, a component and an entry in
`CONTENT_KEYS` (`scripts/lib/content-keys.mjs`), `CONTENT_AREAS`, and
`PagePreview.jsx`.

## 8. Testing

```bash
npm test           # unit, render-snapshot, database (RLS) and function tests
npm run lint
npm run build
npm run test:e2e   # builds against a local Supabase stand-in and drives the admin in Chromium
```

* `tests/public` snapshots lock every public page's HTML. A diff means a
  visible change on the live site.
* `tests/db` runs the real migrations in PGlite (Postgres in WebAssembly)
  with Supabase-like roles and JWT claims, so RLS and grants are exercised.
* `tests/e2e/mock-supabase.mjs` is a **test double**; it does not enforce
  RLS (covered by `tests/db`). `test:e2e` leaves a test build in `dist/`.

## 9. Deployment, backup and rollback

* Work on a branch → pull request → Netlify deploy preview → review → merge.
* **Before the first production deploy:** take a Supabase backup (Database →
  Backups; daily backups are included on paid plans; on the free plan export
  with `supabase db dump`).
* **Rolling back the site:** Netlify → Deploys → pick the previous deploy →
  "Publish deploy". Content rollback: Dashboard → page → History → Restore
  → Publish.
* **Rolling back the CMS entirely:** deploy the previous `main`. The old site
  does not read Supabase, so nothing else is needed. The migrations only add
  objects; they never touch existing data.

## 10. Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| `/admin` says "Dashboard not connected yet" | `VITE_SUPABASE_*` missing at build time |
| Publish says "automatic site updates are not set up" | `NETLIFY_BUILD_HOOK_URL` missing; content is still saved and published |
| Build fails with `[content] Supabase returned HTTP …` | Supabase down or key wrong. The live site keeps the last deploy |
| Invite e-mail never arrives | Configure custom SMTP in Supabase |
| "Server functions are not available here" | Running `vite dev`; use `netlify dev` or a deploy preview |
| Super admin cannot save anything | Two-step verification not set up or not used at sign-in |

## 11. Not built yet (planned)

* Blog/articles (schema + editor + public routes, hidden from nav until approved)
* Analytics dashboard (GA4 Data API via a function; consent banner decision)
* Error monitoring (Sentry SDK with PII scrubbing + issues list via API)
* Uptime/SSL alerts (UptimeRobot or Better Stack)
* Creating brand-new pages from the dashboard (needs a generic page template)
* Contact form: deliberately not added (owner decision); revisit with a
  privacy review before collecting any client information.
