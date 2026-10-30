// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { createDeployHandler } from '../../netlify/functions/admin-deploy.mjs';
import { createUsersHandler } from '../../netlify/functions/admin-users.mjs';
import { createStatusHandler, integrationStatus } from '../../netlify/functions/admin-status.mjs';

const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
const token = (sub, aal = 'aal1') => `${b64({ alg: 'HS256' })}.${b64({ sub, aal })}.signature`;

const people = {
  super: { id: '11111111-1111-4111-8111-111111111111', email: 'super@x.com', role: 'super_admin', is_active: true, factors: [{ status: 'verified' }] },
  owner: { id: '22222222-2222-4222-8222-222222222222', email: 'owner@x.com', role: 'owner', is_active: true, factors: [] },
  editor: { id: '33333333-3333-4333-8333-333333333333', email: 'editor@x.com', role: 'editor', is_active: true, factors: [] },
  gone: { id: '44444444-4444-4444-8444-444444444444', email: 'gone@x.com', role: 'owner', is_active: false, factors: [] },
  mfaOwner: { id: '55555555-5555-4555-8555-555555555555', email: 'o2@x.com', role: 'owner', is_active: true, factors: [{ status: 'verified' }] },
};

function fakeClient() {
  const byId = Object.fromEntries(Object.values(people).map((p) => [p.id, p]));
  const client = {
    calls: [],
    auth: {
      getUser: async (jwt) => {
        if (jwt.endsWith('.forged')) return { data: null, error: new Error('invalid') };
        const { sub } = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString());
        const person = byId[sub];
        return person ? { data: { user: { id: person.id, factors: person.factors } }, error: null } : { data: null, error: new Error('no') };
      },
      admin: {
        listUsers: async () => ({ data: { users: Object.values(people).map((p) => ({ id: p.id, last_sign_in_at: null, factors: p.factors })) } }),
        inviteUserByEmail: vi.fn(async (email) =>
          email === 'taken@x.com' ? { data: null, error: new Error('User already registered') } : { data: { user: { id: '66666666-6666-4666-8666-666666666666' } }, error: null },
        ),
        updateUserById: vi.fn(async () => ({ error: null })),
        mfa: {
          listFactors: vi.fn(async () => ({ data: { factors: [{ id: 'f1' }, { id: 'f2' }] }, error: null })),
          deleteFactor: vi.fn(async () => ({ error: null })),
        },
      },
    },
    from: () => {
      const query = {
        filters: {},
        select: () => query,
        order: async () => ({ data: Object.values(people).map((p) => ({ ...p, full_name: '' })), error: null }),
        eq: (column, value) => {
          query.filters[column] = value;
          return query;
        },
        maybeSingle: async () => ({ data: byId[query.filters.id] ?? null, error: null }),
      };
      return query;
    },
    rpc: vi.fn(async (name, args) => {
      client.calls.push([name, args]);
      return { data: {}, error: null };
    }),
  };
  return client;
}

const request = (method, jwt, body) =>
  new Request('https://pjoutlawlegal.com/admin-api/x', {
    method,
    headers: { ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}), 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

const config = { buildHookUrl: 'https://api.netlify.com/build_hooks/abc', siteUrl: 'https://pjoutlawlegal.com' };

describe('admin authentication (shared)', () => {
  const handler = createStatusHandler({ getConfig: () => config, getClient: fakeClient, env: {} });

  it('requires a token', async () => {
    expect((await handler(request('GET'))).status).toBe(401);
  });

  it('rejects tokens Supabase does not accept', async () => {
    expect((await handler(request('GET', 'a.b.forged'))).status).toBe(401);
  });

  it('rejects deactivated accounts', async () => {
    expect((await handler(request('GET', token(people.gone.id)))).status).toBe(403);
  });

  it('requires MFA for super admins and for anyone who enrolled it', async () => {
    expect((await handler(request('GET', token(people.super.id)))).status).toBe(403);
    expect((await handler(request('GET', token(people.super.id, 'aal2')))).status).toBe(200);
    expect((await handler(request('GET', token(people.mfaOwner.id)))).status).toBe(403);
    expect((await handler(request('GET', token(people.editor.id)))).status).toBe(200);
  });

  it('rejects other HTTP methods', async () => {
    expect((await handler(request('DELETE', token(people.editor.id)))).status).toBe(405);
  });
});

describe('integration status', () => {
  it('reports only booleans', () => {
    const status = integrationStatus({ NETLIFY_BUILD_HOOK_URL: 'secret', GA4_PROPERTY_ID: '1' });
    expect(status).toEqual({ publishing: true, analytics: false, errorMonitoring: false, errorReporting: false, uptime: false });
    expect(JSON.stringify(status)).not.toContain('secret');
  });
});

describe('POST /admin-api/deploy', () => {
  it('lets owners trigger the build hook and audits it', async () => {
    const fetchImpl = vi.fn(async () => new Response('', { status: 200 }));
    const client = fakeClient();
    const handler = createDeployHandler({ getConfig: () => config, getClient: () => client, fetchImpl });
    const res = await handler(request('POST', token(people.owner.id)));
    expect(res.status).toBe(202);
    expect(String(fetchImpl.mock.calls[0][0])).toContain('trigger_title=Content+published+by+owner%40x.com');
    expect(client.calls[0][0]).toBe('write_audit');
  });

  it('refuses editors', async () => {
    const fetchImpl = vi.fn();
    const handler = createDeployHandler({ getConfig: () => config, getClient: fakeClient, fetchImpl });
    expect((await handler(request('POST', token(people.editor.id)))).status).toBe(403);
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it('explains when the build hook is not configured', async () => {
    const handler = createDeployHandler({ getConfig: () => ({ ...config, buildHookUrl: '' }), getClient: fakeClient });
    const res = await handler(request('POST', token(people.owner.id)));
    expect(res.status).toBe(503);
    expect((await res.json()).error).toMatch(/not set up/);
  });
});

describe('/admin-api/users', () => {
  it('is for super admins only', async () => {
    const handler = createUsersHandler({ getConfig: () => config, getClient: fakeClient });
    expect((await handler(request('GET', token(people.owner.id)))).status).toBe(403);
  });

  it('lists users with MFA status', async () => {
    const handler = createUsersHandler({ getConfig: () => config, getClient: fakeClient });
    const res = await handler(request('GET', token(people.super.id, 'aal2')));
    const { users } = await res.json();
    expect(users.find((u) => u.email === 'super@x.com')).toMatchObject({ mfaEnabled: true, isYou: true });
  });

  it('invites with a validated e-mail and role, then grants access via the database', async () => {
    const client = fakeClient();
    const handler = createUsersHandler({ getConfig: () => config, getClient: () => client });
    const bad = await handler(request('POST', token(people.super.id, 'aal2'), { email: 'nope', role: 'owner' }));
    expect(bad.status).toBe(400);
    const badRole = await handler(request('POST', token(people.super.id, 'aal2'), { email: 'a@b.com', role: 'god' }));
    expect(badRole.status).toBe(400);

    const ok = await handler(request('POST', token(people.super.id, 'aal2'), { email: 'New@Example.com', role: 'editor' }));
    expect(ok.status).toBe(201);
    expect(client.auth.admin.inviteUserByEmail).toHaveBeenCalledWith('new@example.com', expect.objectContaining({ redirectTo: 'https://pjoutlawlegal.com/admin/set-password' }));
    expect(client.calls.map(([name]) => name)).toEqual(['set_user_access', 'record_user_invite']);
  });

  it('reports existing accounts clearly', async () => {
    const handler = createUsersHandler({ getConfig: () => config, getClient: fakeClient });
    const res = await handler(request('POST', token(people.super.id, 'aal2'), { email: 'taken@x.com', role: 'editor' }));
    expect(res.status).toBe(409);
  });

  it('bans deactivated accounts from signing in and lifts the ban on reactivation', async () => {
    const client = fakeClient();
    const handler = createUsersHandler({ getConfig: () => config, getClient: () => client });
    await handler(request('PATCH', token(people.super.id, 'aal2'), { userId: people.editor.id, role: 'editor', active: false }));
    expect(client.auth.admin.updateUserById).toHaveBeenLastCalledWith(people.editor.id, { ban_duration: '876000h' });
    await handler(request('PATCH', token(people.super.id, 'aal2'), { userId: people.editor.id, role: 'editor', active: true }));
    expect(client.auth.admin.updateUserById).toHaveBeenLastCalledWith(people.editor.id, { ban_duration: 'none' });
  });

  it('resets a lost authenticator and audits it', async () => {
    const client = fakeClient();
    const handler = createUsersHandler({ getConfig: () => config, getClient: () => client });
    const res = await handler(request('PATCH', token(people.super.id, 'aal2'), { userId: people.owner.id, action: 'reset_mfa' }));
    expect(res.status).toBe(200);
    expect(client.auth.admin.mfa.deleteFactor).toHaveBeenCalledTimes(2);
    expect(client.calls.at(-1)[1]).toMatchObject({ p_action: 'user.mfa_reset', p_actor: people.super.id });
  });

  it('validates PATCH input', async () => {
    const handler = createUsersHandler({ getConfig: () => config, getClient: fakeClient });
    const res = await handler(request('PATCH', token(people.super.id, 'aal2'), { userId: 'x', role: 'editor', active: true }));
    expect(res.status).toBe(400);
  });

  it('maps database errors to fixed messages', async () => {
    const client = fakeClient();
    client.rpc = vi.fn(async () => ({ error: { message: 'duplicate key value violates unique constraint "profiles_pkey" on relation internals' } }));
    const handler = createUsersHandler({ getConfig: () => config, getClient: () => client });
    const res = await handler(request('PATCH', token(people.super.id, 'aal2'), { userId: people.editor.id, role: 'owner', active: true }));
    expect(res.status).toBe(400);
    expect((await res.json()).error).not.toMatch(/constraint|relation/);
  });

  it('does not leak internal error details', async () => {
    const client = fakeClient();
    client.auth.admin.listUsers = async () => {
      throw new Error('connection string postgres://secret');
    };
    const handler = createUsersHandler({ getConfig: () => config, getClient: () => client });
    const res = await handler(request('GET', token(people.super.id, 'aal2')));
    expect(res.status).toBe(500);
    expect(await res.text()).not.toContain('secret');
  });
});
