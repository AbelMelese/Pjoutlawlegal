import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

/**
 * Tracks the Supabase session, the signed-in person's profile (role), and
 * their two-factor level. status is one of:
 *   loading | signed_out | needs_mfa | ready | no_access | recovery
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [aal, setAal] = useState({ currentLevel: null, nextLevel: null });
  const [status, setStatus] = useState('loading');
  const [recovery, setRecovery] = useState(false);

  const refresh = useCallback(async (nextSession) => {
    if (!nextSession) {
      setSession(null);
      setProfile(null);
      setAal({ currentLevel: null, nextLevel: null });
      setStatus('signed_out');
      return;
    }
    setSession(nextSession);
    const [{ data: level }, { data: row }] = await Promise.all([
      supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
      supabase.from('profiles').select('id, email, full_name, role, is_active').eq('id', nextSession.user.id).maybeSingle(),
    ]);
    setAal(level ?? { currentLevel: null, nextLevel: null });
    setProfile(row ?? null);
    if (level?.nextLevel === 'aal2' && level?.currentLevel !== 'aal2') setStatus('needs_mfa');
    else if (!row?.role || !row?.is_active) setStatus('no_access');
    else setStatus('ready');
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => active && refresh(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
      // Defer: Supabase recommends not awaiting other calls inside the callback.
      setTimeout(() => active && refresh(nextSession), 0);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [refresh]);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      role: status === 'ready' ? profile?.role : null,
      aal,
      status,
      recovery,
      clearRecovery: () => setRecovery(false),
      reload: async () => refresh((await supabase.auth.getSession()).data.session),
      signOut: async () => {
        await supabase.auth.signOut();
        await refresh(null);
      },
    }),
    [session, profile, aal, status, recovery, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside <AuthProvider>');
  return value;
}
