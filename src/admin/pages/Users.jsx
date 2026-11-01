import { useCallback, useEffect, useState } from 'react';
import { KeyRound, ShieldCheck, ShieldOff, UserPlus } from 'lucide-react';
import { adminApi } from '../lib/api';
import { ROLE_DESCRIPTIONS, ROLE_LABELS } from '../lib/permissions';
import { Alert, Badge, Button, Card, ConfirmDialog, Modal, PageHeader, Spinner, TextInput, inputClass, timeAgo, useToast } from '../components/ui';

const ROLES = ['owner', 'editor', 'super_admin'];

export default function Users() {
  const toast = useToast();
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [pending, setPending] = useState(null); // { user, change, title, body }
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setUsers((await adminApi('users')).users);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const apply = async () => {
    setBusy(true);
    try {
      await adminApi('users', { method: 'PATCH', body: { userId: pending.user.id, ...pending.change } });
      toast('Saved.');
      setPending(null);
      await load();
    } catch (err) {
      toast(err.message, 'danger');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Users & Permissions"
        description="Who can sign in to this dashboard and what they can do. Permissions are enforced by the server, not just hidden in the menu."
        actions={
          <Button variant="primary" icon={UserPlus} onClick={() => setInviteOpen(true)}>
            Invite someone
          </Button>
        }
      />

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        {['super_admin', 'owner', 'editor'].map((role) => (
          <div key={role} className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="font-semibold text-slate-900">{ROLE_LABELS[role]}</p>
            <p className="mt-1 text-slate-600">{ROLE_DESCRIPTIONS[role]}</p>
          </div>
        ))}
      </div>

      {error ? <Alert tone="danger">{error}</Alert> : null}
      {!users && !error ? <Spinner /> : null}
      {users ? (
        <Card padded={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Person</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Two-step</th>
                  <th className="px-5 py-3 font-semibold">Last sign-in</th>
                  <th className="px-5 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className={user.active ? '' : 'bg-slate-50 text-slate-500'}>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-slate-900">
                        {user.fullName || user.email} {user.isYou ? <Badge>You</Badge> : null}
                      </p>
                      <p className="text-slate-500">{user.email}</p>
                      {!user.emailConfirmed ? <p className="text-xs text-amber-700">Invitation not accepted yet</p> : null}
                    </td>
                    <td className="px-5 py-3">
                      <select
                        className={`${inputClass()} w-auto`}
                        value={user.role ?? ''}
                        aria-label={`Role for ${user.email}`}
                        onChange={(event) =>
                          setPending({
                            user,
                            change: { role: event.target.value || null, active: user.active },
                            title: 'Change role?',
                            body: `${user.email} will become: ${ROLE_LABELS[event.target.value] ?? 'No access'}.`,
                          })
                        }
                      >
                        <option value="">No access</option>
                        {ROLES.map((role) => (
                          <option key={role} value={role}>
                            {ROLE_LABELS[role]}
                          </option>
                        ))}
                      </select>
                      {!user.active ? <p className="mt-1 text-xs font-semibold text-red-700">Deactivated</p> : null}
                    </td>
                    <td className="px-5 py-3">{user.mfaEnabled ? <Badge tone="success"><ShieldCheck size={12} /> On</Badge> : <Badge tone={user.role === 'super_admin' ? 'danger' : 'neutral'}>Off</Badge>}</td>
                    <td className="px-5 py-3">{user.lastSignInAt ? timeAgo(user.lastSignInAt) : 'Never'}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        {user.mfaEnabled && !user.isYou ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            icon={KeyRound}
                            onClick={() => setPending({ user, change: { action: 'reset_mfa' }, title: 'Reset two-step verification?', body: `Use this if ${user.email} lost their phone. They will set it up again at next sign-in.` })}
                          >
                            Reset 2-step
                          </Button>
                        ) : null}
                        {!user.isYou ? (
                          <Button
                            size="sm"
                            variant={user.active ? 'danger' : 'secondary'}
                            icon={user.active ? ShieldOff : ShieldCheck}
                            onClick={() =>
                              setPending({
                                user,
                                change: { role: user.role, active: !user.active },
                                title: user.active ? 'Deactivate this account?' : 'Reactivate this account?',
                                body: user.active ? `${user.email} will be signed out and blocked from signing in. Their past activity stays in the history.` : `${user.email} will be able to sign in again with their previous role.`,
                              })
                            }
                          >
                            {user.active ? 'Deactivate' : 'Reactivate'}
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      <ConfirmDialog open={Boolean(pending)} title={pending?.title} busy={busy} onConfirm={apply} onCancel={() => setPending(null)} tone={pending?.change?.active === false ? 'danger' : 'primary'}>
        <p>{pending?.body}</p>
      </ConfirmDialog>

      <InviteModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvited={async () => {
          setInviteOpen(false);
          toast('Invitation sent. They will receive an e-mail to choose a password.');
          await load();
        }}
      />
    </div>
  );
}

function InviteModal({ open, onClose, onInvited }) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('editor');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError('');
    try {
      await adminApi('users', { method: 'POST', body: { email, fullName, role } });
      setEmail('');
      setFullName('');
      setRole('editor');
      await onInvited();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invite someone"
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" busy={busy} onClick={submit} disabled={!email}>
            Send invitation
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error ? <Alert tone="danger">{error}</Alert> : null}
        <TextInput label="E-mail" type="email" value={email} onChange={setEmail} required autoFocus />
        <TextInput label="Name" value={fullName} onChange={setFullName} maxLength={120} />
        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold text-slate-800">Role</legend>
          {['editor', 'owner', 'super_admin'].map((value) => (
            <label key={value} className={`flex cursor-pointer gap-3 rounded-lg border p-3 ${role === value ? 'border-[#1E3A5F] bg-[#1E3A5F]/5' : 'border-slate-200'}`}>
              <input type="radio" name="role" value={value} checked={role === value} onChange={() => setRole(value)} className="mt-1" />
              <span className="text-sm">
                <span className="font-semibold text-slate-900">{ROLE_LABELS[value]}</span>
                <span className="block text-slate-600">{ROLE_DESCRIPTIONS[value]}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </div>
    </Modal>
  );
}
