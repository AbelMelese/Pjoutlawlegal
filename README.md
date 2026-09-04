# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
