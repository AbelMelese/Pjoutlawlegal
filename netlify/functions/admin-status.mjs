/**
 * GET /admin-api/status
 * Tells the dashboard which optional services are configured, so it can show
 * real data or an honest "not set up yet" message. Returns booleans only;
 * never secret values.
 */
import { handle, json, readConfig, requireAdmin, serviceClient } from './_lib/admin.mjs';

export function integrationStatus(env = process.env) {
  return {
    publishing: Boolean(env.NETLIFY_BUILD_HOOK_URL),
    analytics: Boolean(env.GA4_PROPERTY_ID && env.GA4_CLIENT_EMAIL && env.GA4_PRIVATE_KEY),
    errorMonitoring: Boolean(env.SENTRY_AUTH_TOKEN && env.SENTRY_ORG && env.SENTRY_PROJECT),
    errorReporting: Boolean(env.VITE_SENTRY_DSN),
    uptime: Boolean(env.UPTIMEROBOT_API_KEY),
  };
}

export function createStatusHandler({ getConfig = () => readConfig(), getClient = serviceClient, env = process.env } = {}) {
  return handle(['GET'], async (request) => {
    const config = getConfig();
    const client = getClient(config);
    await requireAdmin(request, client, ['super_admin', 'owner', 'editor']);
    return json(200, { integrations: integrationStatus(env), deployContext: env.CONTEXT || 'unknown' });
  });
}

export default createStatusHandler();

export const config = { path: '/admin-api/status' };
