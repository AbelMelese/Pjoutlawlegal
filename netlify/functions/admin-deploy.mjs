/**
 * POST /admin-api/deploy
 * Starts a Netlify rebuild so newly published content goes live.
 * Owners and super admins only. The build hook URL is a secret kept in
 * Netlify's environment (NETLIFY_BUILD_HOOK_URL).
 */
import { HttpError, handle, json, readConfig, requireAdmin, serviceClient } from './_lib/admin.mjs';

export function createDeployHandler({ getConfig = () => readConfig(), getClient = serviceClient, fetchImpl = fetch } = {}) {
  return handle(['POST'], async (request) => {
    const config = getConfig();
    const client = getClient(config);
    const { profile } = await requireAdmin(request, client, ['super_admin', 'owner']);

    if (!config.buildHookUrl) {
      throw new HttpError(503, 'Publishing is saved, but automatic site updates are not set up yet (missing build hook).');
    }

    const hook = new URL(config.buildHookUrl);
    hook.searchParams.set('trigger_title', `Content published by ${profile.email}`.slice(0, 120));
    const response = await fetchImpl(hook, { method: 'POST', body: '{}' });
    if (!response.ok) throw new HttpError(502, 'Netlify did not accept the update request. Please try again shortly.');

    await client.rpc('write_audit', {
      p_action: 'site.rebuild_requested',
      p_entity_type: 'site',
      p_entity_id: 'netlify',
      p_summary: 'Requested a website update after publishing',
      p_details: {},
      p_actor: profile.id,
    });

    return json(202, { ok: true, message: 'The live website is updating. Changes usually appear within 1–3 minutes.' });
  });
}

export default createDeployHandler();

export const config = { path: '/admin-api/deploy' };
