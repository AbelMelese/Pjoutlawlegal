import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, KeyRound, Search, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../lib/auth';
import { can, passwordProblems, ROLE_LABELS } from '../lib/permissions';
import { friendlyError, supabase } from '../lib/supabase';
import { Alert, Badge, Button, Card, ConfirmDialog, PageHeader, TextInput, useToast } from '../components/ui';

export default function Settings() {
  const { role } = useAuth();
  return (
    <div>
      <PageHeader title="Settings" description="Business details shown on the website, and your own account security." />
      {can(role, 'editSettings') ? (
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Link to="/admin/settings/business" className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#C5A03A]">
            <Building2 className="mt-1 text-[#1E3A5F]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-slate-900">Business details</p>
              <p className="text-sm text-slate-500">Business name, phone, fax, e-mail, address, office hours, social media and footer.</p>
            </div>
          </Link>
          <Link to="/admin/seo" className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-[#C5A03A]">
            <Search className="mt-1 text-[#1E3A5F]" aria-hidden="true" />
            <div>
              <p className="font-semibold text-slate-900">Search defaults</p>
              <p className="text-sm text-slate-500">Default page title, description and image for shared links.</p>
            </div>
          </Link>
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileCard />
        <PasswordCard />
        <MfaCard />
      </div>
      <p className="mt-6 text-sm text-slate-500">API keys and other secrets are never shown or edited here. They are kept in the hosting provider’s secure settings.</p>
    </div>
  );
}

function ProfileCard() {
  const { profile, role, reload } = useAuth();
  const toast = useToast();
  const [name, setName] = useState(profile?.full_name ?? '');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    const { error } = await supabase.rpc('update_my_name', { p_full_name: name });
    setBusy(false);
    if (error) return toast(friendlyError(error), 'danger');
    await reload();
    toast('Name saved.');
  };

  return (
    <Card title="Your profile" actions={<UserRound className="text-slate-400" aria-hidden="true" />}>
      <div className="space-y-4">
        <TextInput label="Name" value={name} onChange={setName} maxLength={120} />
        <div className="text-sm text-slate-600">
          <p>
            <span className="font-semibold">E-mail:</span> {profile?.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {ROLE_LABELS[role]}
          </p>
        </div>
        <Button variant="primary" onClick={save} busy={busy} disabled={name === (profile?.full_name ?? '')}>
          Save name
        </Button>
      </div>
    </Card>
  );
}

function PasswordCard() {
  const { user } = useAuth();
  const toast = useToast();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    const problems = passwordProblems(password, user?.email ?? '');
    if (problems.length) return setError(`Your password needs ${problems.join(', ')}.`);
    if (password !== confirm) return setError('The two passwords do not match.');
    setBusy(true);
    setError('');
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      // With "Secure password change" on, Supabase asks recently signed-in users only.
      return setError(/reauthentication|recent/i.test(updateError.message) ? 'For security, please sign out and back in, then change your password.' : friendlyError(updateError, updateError.message));
    }
    setPassword('');
    setConfirm('');
    toast('Password changed.');
  };

  return (
    <Card title="Change password" actions={<KeyRound className="text-slate-400" aria-hidden="true" />}>
      <div className="space-y-4">
        {error ? <Alert tone="danger">{error}</Alert> : null}
        <TextInput label="New password" type="password" autoComplete="new-password" value={password} onChange={setPassword} help="At least 12 characters with upper- and lower-case letters, a number and a symbol." />
        <TextInput label="Repeat new password" type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} />
        <Button variant="primary" onClick={save} busy={busy} disabled={!password}>
          Change password
        </Button>
      </div>
    </Card>
  );
}

function MfaCard() {
  const { role, reload, aal } = useAuth();
  const toast = useToast();
  const [factors, setFactors] = useState(null);
  const [enrolling, setEnrolling] = useState(null); // { id, qr, secret }
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const load = async () => {
    const { data } = await supabase.auth.mfa.listFactors();
    setFactors(data?.all ?? []);
  };

  useEffect(() => {
    let cancelled = false;
    supabase.auth.mfa.listFactors().then(({ data }) => !cancelled && setFactors(data?.all ?? []));
    return () => {
      cancelled = true;
    };
  }, []);

  const verified = factors?.find((factor) => factor.factor_type === 'totp' && factor.status === 'verified');

  const start = async () => {
    setError('');
    setBusy(true);
    // Clear any half-finished setup first, or Supabase rejects a new one.
    for (const factor of factors?.filter((f) => f.status !== 'verified') ?? []) {
      await supabase.auth.mfa.unenroll({ factorId: factor.id });
    }
    const { data, error: enrollError } = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: `Authenticator ${new Date().toISOString().slice(0, 10)}` });
    setBusy(false);
    if (enrollError) return setError(friendlyError(enrollError, enrollError.message));
    setEnrolling({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
  };

  const confirmSetup = async () => {
    setBusy(true);
    setError('');
    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({ factorId: enrolling.id, code: code.replace(/\s/g, '') });
    setBusy(false);
    if (verifyError) return setError(friendlyError(verifyError));
    setEnrolling(null);
    setCode('');
    await load();
    await reload();
    toast('Two-step verification is on.');
  };

  const remove = async () => {
    setBusy(true);
    const { error: removeError } = await supabase.auth.mfa.unenroll({ factorId: verified.id });
    setBusy(false);
    setConfirmRemove(false);
    if (removeError) return toast(friendlyError(removeError, 'Sign out and back in with your code, then try again.'), 'danger');
    await load();
    await reload();
    toast('Two-step verification turned off.', 'warning');
  };

  return (
    <Card title="Two-step verification" actions={verified ? <Badge tone="success">On</Badge> : <Badge tone={role === 'super_admin' ? 'danger' : 'warning'}>Off</Badge>} className="lg:col-span-2">
      <div className="space-y-4 text-sm text-slate-700">
        <p>After your password, you will also enter a 6-digit code from an authenticator app (Google Authenticator, Microsoft Authenticator, 1Password, Authy…).</p>
        {role === 'super_admin' && !verified ? <Alert tone="danger">As a super administrator you must turn this on before you can change anything.</Alert> : null}
        {error ? <Alert tone="danger">{error}</Alert> : null}

        {verified && !enrolling ? (
          <div className="flex flex-wrap items-center gap-3">
            <p className="flex items-center gap-2 font-medium text-emerald-700">
              <ShieldCheck size={18} aria-hidden="true" /> Protected with {verified.friendly_name || 'an authenticator app'}
            </p>
            <Button variant="danger" size="sm" onClick={() => setConfirmRemove(true)} disabled={aal?.currentLevel !== 'aal2'} title={aal?.currentLevel !== 'aal2' ? 'Sign in with your code first' : undefined}>
              Turn off
            </Button>
          </div>
        ) : null}

        {!verified && !enrolling ? (
          <Button variant="primary" icon={ShieldCheck} onClick={start} busy={busy} disabled={factors === null}>
            Set up two-step verification
          </Button>
        ) : null}

        {enrolling ? (
          <div className="grid gap-6 rounded-xl border border-slate-200 p-4 md:grid-cols-[auto_1fr]">
            <img src={enrolling.qr} alt="QR code to scan with your authenticator app" className="h-44 w-44 rounded-lg bg-white p-2 ring-1 ring-slate-200" />
            <div className="space-y-3">
              <ol className="list-decimal space-y-1 pl-5">
                <li>Open your authenticator app and add a new account.</li>
                <li>Scan the QR code, or type this key: <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">{enrolling.secret}</code></li>
                <li>Enter the 6-digit code the app shows.</li>
              </ol>
              <TextInput label="6-digit code" inputMode="numeric" autoComplete="one-time-code" maxLength={7} value={code} onChange={setCode} />
              <div className="flex gap-2">
                <Button variant="primary" onClick={confirmSetup} busy={busy} disabled={code.replace(/\s/g, '').length !== 6}>
                  Turn on
                </Button>
                <Button variant="ghost" onClick={() => setEnrolling(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <ConfirmDialog open={confirmRemove} title="Turn off two-step verification?" confirmLabel="Turn off" tone="danger" busy={busy} onConfirm={remove} onCancel={() => setConfirmRemove(false)}>
        <p>Your account will be protected by your password only.{role === 'super_admin' ? ' As a super administrator you will not be able to change anything until you turn it back on.' : ''}</p>
      </ConfirmDialog>
    </Card>
  );
}
