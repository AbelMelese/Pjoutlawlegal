/**
 * /admin-api/users  (super admins only)
 *   GET    list admin users with role, status, MFA and last sign-in
 *   POST   { email, role, fullName }  invite someone by e-mail
 *   PATCH  { userId, role, active }   change role / deactivate / reactivate
 *   PATCH  { userId, action: 'reset_mfa' }  remove a lost authenticator
 *
 * Role changes go through the set_user_access() database function, which
 * re-checks that the actor is a super admin, protects the last super admin,
 * and writes the audit log. Deactivated accounts are also banned in Supabase
 * Auth so they cannot sign in or refresh an existing session.
 */
import { HttpError, handle, json, readConfig, readJson, requireAdmin, serviceClient } from './_lib/admin.mjs';

const ROLES = ['super_admin', 'owner', 'editor'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const BANNED = '876000h'; // ~100 years

// Messages from set_user_access() that are safe and useful to show; anything else is generic.
const KNOWN_ACCESS_ERRORS = [/At least one active super administrator is required/, /Only a super administrator/, /User not found/];
const accessError = (error) =>
  new HttpError(400, KNOWN_ACCESS_ERRORS.find((pattern) => pattern.test(error?.message ?? ''))
    ? error.message
    : 'The change could not be saved. Please refresh and try again.');

export function createUsersHandler({ getConfig = () => readConfig(), getClient = serviceClient } = {}) {
  return handle(['GET', 'POST', 'PATCH'], async (request) => {
    const config = getConfig();
    const client = getClient(config);
    const { profile: actor } = await requireAdmin(request, client, ['super_admin']);

    if (request.method === 'GET') {
      const [{ data: profiles, error }, { data: authData }] = await Promise.all([
        client.from('profiles').select('id, email, full_name, role, is_active, created_at').order('created_at'),
        client.auth.admin.listUsers({ perPage: 200 }),
      ]);
      if (error) throw new HttpError(500, 'Could not load users.');
      const authById = new Map((authData?.users ?? []).map((u) => [u.id, u]));
      const users = profiles.map((p) => {
        const authUser = authById.get(p.id);
        return {
          id: p.id,
          email: p.email,
          fullName: p.full_name,
          role: p.role,
          active: p.is_active,
          createdAt: p.created_at,
          lastSignInAt: authUser?.last_sign_in_at ?? null,
          emailConfirmed: Boolean(authUser?.email_confirmed_at),
          mfaEnabled: (authUser?.factors ?? []).some((f) => f.status === 'verified'),
          isYou: p.id === actor.id,
        };
      });
      return json(200, { users });
    }

    const body = await readJson(request);

    if (request.method === 'POST') {
      const email = String(body.email ?? '').trim().toLowerCase();
      const role = body.role;
      const fullName = String(body.fullName ?? '').trim().slice(0, 120);
      if (!EMAIL.test(email) || email.length > 254) throw new HttpError(400, 'Enter a valid e-mail address.');
      if (!ROLES.includes(role)) throw new HttpError(400, 'Choose a role.');

      const { data, error } = await client.auth.admin.inviteUserByEmail(email, {
        data: { full_name: fullName },
        redirectTo: `${config.siteUrl}/admin/set-password`,
      });
      if (error) {
        const exists = /already|registered|exists/i.test(error.message || '');
        throw new HttpError(exists ? 409 : 502, exists ? 'Someone with that e-mail already has an account.' : 'The invitation e-mail could not be sent.');
      }
      const invitedId = data.user.id;
      const access = await client.rpc('set_user_access', { p_actor: actor.id, p_user: invitedId, p_role: role, p_active: true });
      if (access.error) throw accessError(access.error);
      await client.rpc('record_user_invite', { p_actor: actor.id, p_user: invitedId, p_email: email, p_role: role });
      return json(201, { ok: true, userId: invitedId });
    }

    // PATCH
    const userId = String(body.userId ?? '');

    if (body.action === 'reset_mfa') {
      if (!UUID.test(userId)) throw new HttpError(400, 'Unknown user.');
      const { data: factorData, error: listError } = await client.auth.admin.mfa.listFactors({ userId });
      if (listError) throw new HttpError(502, 'Could not read this person\u2019s two-step verification settings.');
      for (const factor of factorData?.factors ?? []) {
        const { error: deleteError } = await client.auth.admin.mfa.deleteFactor({ userId, id: factor.id });
        if (deleteError) throw new HttpError(502, 'Could not reset two-step verification. Please try again.');
      }
      await client.rpc('write_audit', {
        p_action: 'user.mfa_reset',
        p_entity_type: 'user',
        p_entity_id: userId,
        p_summary: 'Reset two-step verification for a user',
        p_details: { factors_removed: (factorData?.factors ?? []).length },
        p_actor: actor.id,
      });
      return json(200, { ok: true });
    }

    const role = body.role === null ? null : body.role;
    const active = body.active;
    if (!UUID.test(userId)) throw new HttpError(400, 'Unknown user.');
    if (role !== null && !ROLES.includes(role)) throw new HttpError(400, 'Choose a valid role.');
    if (typeof active !== 'boolean') throw new HttpError(400, 'Choose whether the account is active.');

    const result = await client.rpc('set_user_access', { p_actor: actor.id, p_user: userId, p_role: role, p_active: active });
    if (result.error) throw accessError(result.error);

    const ban = await client.auth.admin.updateUserById(userId, { ban_duration: active ? 'none' : BANNED });
    if (ban.error) throw new HttpError(502, 'Access was updated, but the sign-in block could not be changed. Please try again.');

    return json(200, { ok: true });
  });
}

export default createUsersHandler();

export const config = { path: '/admin-api/users' };
