import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';
import logo from '../../assets/pjoa-logo-transparent.png';
import { useAuth } from '../lib/auth';
import { passwordProblems } from '../lib/permissions';
import { friendlyError, supabase } from '../lib/supabase';
import { Alert, Button, TextInput } from '../components/ui';

function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1E3A5F] via-[#2A1F4E] to-[#5B2C6F] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-2xl">
          <img src={logo} alt="Phyllis J. Outlaw & Associates" className="mx-auto mb-6 h-14 w-auto" />
          <h1 className="text-center text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle ? <p className="mt-1 text-center text-sm text-slate-600">{subtitle}</p> : null}
          <div className="mt-6">{children}</div>
        </div>
        {footer ? <div className="mt-4 text-center text-sm text-white/80">{footer}</div> : null}
      </div>
    </div>
  );
}

export function SetupRequired() {
  return (
    <AuthCard title="Dashboard not connected yet" subtitle="The website works normally; only the admin dashboard needs setting up.">
      <div className="space-y-3 text-sm text-slate-700">
        <p>This build of the site does not know which Supabase project to use. A developer needs to:</p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>Create the Supabase project and run the migrations in <code>supabase/migrations</code>.</li>
          <li>
            Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to the Netlify environment.
          </li>
          <li>Redeploy the site.</li>
        </ol>
        <p>
          Full steps are in <code>docs/DEVELOPER_GUIDE.md</code>.
        </p>
      </div>
    </AuthCard>
  );
}

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (signInError) setError(friendlyError(signInError, 'Could not sign in. Please try again.'));
  };

  return (
    <AuthCard title="Sign in" subtitle="Website Manager for Phyllis J. Outlaw & Associates" footer={<a href="/" className="underline hover:text-white">Back to the website</a>}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        {error ? <Alert tone="danger">{error}</Alert> : null}
        <TextInput label="E-mail" type="email" autoComplete="username" value={email} onChange={setEmail} required autoFocus />
        <TextInput label="Password" type="password" autoComplete="current-password" value={password} onChange={setPassword} required />
        <Button type="submit" variant="primary" size="lg" className="w-full" busy={busy} icon={LockKeyhole} disabled={!email || !password}>
          Sign in
        </Button>
        <p className="text-center text-sm">
          <Link to="/admin/forgot-password" className="font-semibold text-[#1E3A5F] underline">
            Forgot your password?
          </Link>
        </p>
      </form>
    </AuthCard>
  );
}

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/admin/set-password`,
    });
    setBusy(false);
    // Same message whether or not the account exists, so the form cannot be used to discover accounts.
    if (resetError && /rate limit|too many/i.test(resetError.message)) setError(friendlyError(resetError));
    else setSent(true);
  };

  return (
    <AuthCard title="Reset your password" footer={<Link to="/admin/login" className="underline hover:text-white">Back to sign in</Link>}>
      {sent ? (
        <Alert tone="success" title="Check your e-mail">
          If an account exists for that address, a link to set a new password is on its way. The link expires after a short time.
        </Alert>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          {error ? <Alert tone="danger">{error}</Alert> : null}
          <TextInput label="E-mail" type="email" autoComplete="username" value={email} onChange={setEmail} required autoFocus />
          <Button type="submit" variant="primary" size="lg" className="w-full" busy={busy} disabled={!email} icon={KeyRound}>
            Send reset link
          </Button>
        </form>
      )}
    </AuthCard>
  );
}

export function SetPassword() {
  const { user, clearRecovery, reload } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const problems = passwordProblems(password, user?.email ?? '');

  const submit = async (event) => {
    event.preventDefault();
    if (problems.length) return setError(`Your password needs ${problems.join(', ')}.`);
    if (password !== confirm) return setError('The two passwords do not match.');
    setBusy(true);
    setError('');
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) return setError(friendlyError(updateError, updateError.message || 'Could not save the password.'));
    clearRecovery();
    await reload();
    navigate('/admin', { replace: true });
  };

  return (
    <AuthCard title="Choose a password" subtitle={user?.email}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        {error ? <Alert tone="danger">{error}</Alert> : null}
        <TextInput label="New password" type="password" autoComplete="new-password" value={password} onChange={setPassword} required autoFocus help="At least 12 characters with upper- and lower-case letters, a number and a symbol." />
        <TextInput label="Repeat the password" type="password" autoComplete="new-password" value={confirm} onChange={setConfirm} required />
        {password ? (
          <ul className="space-y-1 text-sm">
            {['at least 12 characters', 'upper- and lower-case letters', 'a number', 'a symbol'].map((rule) => (
              <li key={rule} className={problems.includes(rule) ? 'text-slate-500' : 'text-emerald-700'}>
                {problems.includes(rule) ? '○' : '✓'} {rule}
              </li>
            ))}
          </ul>
        ) : null}
        <Button type="submit" variant="primary" size="lg" className="w-full" busy={busy}>
          Save password
        </Button>
      </form>
    </AuthCard>
  );
}

export function MfaVerify() {
  const { reload, signOut } = useAuth();
  const [factorId, setFactorId] = useState(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.mfa.listFactors().then(({ data }) => setFactorId(data?.totp?.find((f) => f.status === 'verified')?.id ?? null));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({ factorId, code: code.replace(/\s/g, '') });
    setBusy(false);
    if (verifyError) return setError(friendlyError(verifyError));
    await reload();
  };

  return (
    <AuthCard title="Two-step verification" subtitle="Enter the 6-digit code from your authenticator app." footer={<button type="button" onClick={signOut} className="underline hover:text-white">Sign out</button>}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        {error ? <Alert tone="danger">{error}</Alert> : null}
        <TextInput label="Code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9 ]*" maxLength={7} value={code} onChange={setCode} required autoFocus />
        <Button type="submit" variant="primary" size="lg" className="w-full" busy={busy} disabled={!factorId || code.replace(/\s/g, '').length !== 6} icon={ShieldCheck}>
          Verify
        </Button>
        <p className="text-center text-sm text-slate-500">Lost your phone? Ask a super administrator to reset two-step verification for you.</p>
      </form>
    </AuthCard>
  );
}

export function NoAccess() {
  const { profile, signOut } = useAuth();
  return (
    <AuthCard title="No dashboard access" subtitle={profile?.email}>
      <div className="space-y-4">
        <Alert tone="warning">
          {profile && !profile.is_active
            ? 'This account has been deactivated.'
            : 'You are signed in, but this account has not been given a role yet.'}{' '}
          Please contact the website administrator.
        </Alert>
        <Button className="w-full" onClick={signOut}>
          Sign out
        </Button>
      </div>
    </AuthCard>
  );
}
