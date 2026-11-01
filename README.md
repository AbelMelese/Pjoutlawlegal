# Phyllis J. Outlaw & Associates website

Public website for pjoutlawlegal.com (React 19 + Vite + Tailwind, hosted on
Netlify) with a built-in **Website Manager** at `/admin` for editing content,
managing images, publishing with version history, and administering users.

* **Website owner:** see [docs/OWNER_GUIDE.md](docs/OWNER_GUIDE.md)
* **Developers:** see [docs/DEVELOPER_GUIDE.md](docs/DEVELOPER_GUIDE.md)

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173 (admin at /admin)
npm test           # unit, snapshot, database and function tests
npm run lint
npm run build      # fetches published CMS content, builds, writes SEO files
npm run test:e2e   # browser smoke test of the admin against a local stand-in
```

Copy `.env.example` to `.env` for local configuration. The site works without
any configuration; the admin needs Supabase (see the developer guide).

## PayPal configuration

The online-payment page creates and captures orders through the Netlify Edge
Function in `netlify/edge-functions/paypal.js`. Configure these environment
variables in Netlify and make them available to the **Functions** scope:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_SECRET`
- `PAYPAL_API_BASE` (`https://api-m.paypal.com` for live payments or
  `https://api-m.sandbox.paypal.com` for sandbox testing)

After changing an Edge Function environment variable, trigger a new deploy so
the updated value is available at runtime. For local development, place the
same variables in an uncommitted `.env` file and run the site with Netlify Dev,
not Vite alone, so `/api/*` requests reach the Edge Function.
