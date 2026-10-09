import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { onLoggedOut } from '@/shared/api/client';
import { logout as endSession, refresh } from '@/shared/api/tokenStore';
import { getMe, login, type AuthUser } from './api';
import { AuthContext, type AuthState } from './useAuth';

const LOGGED_OUT: AuthState = { status: 'unauthenticated', user: null };

// The refresh cookie tells us IF we're logged in, /auth/me tells us WHO.
async function loadSession(): Promise<AuthUser | null> {
  const token = await refresh();
  if (!token) return null;
  return getMe();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // 'loading' until the startup session check answers, so ProtectedRoute
  // doesn't redirect to /login before we actually know.
  const [state, setState] = useState<AuthState>({
    status: 'loading',
    user: null,
  });

  useEffect(() => {
    // StrictMode runs this effect twice in dev: both runs share one refresh
    // request through refresh()'s in-flight promise; /auth/me is a plain read.
    loadSession()
      .then((user) =>
        setState(user ? { status: 'authenticated', user } : LOGGED_OUT),
      )
      .catch((error: unknown) => {
        // Backend unreachable or 5xx: we can't confirm a session, so treat the
        // user as logged out. The cookie is untouched, so a reload can recover.
        console.error('Startup session check failed', error);
        setState(LOGGED_OUT);
      });

    // Later: apiFetch calls this when a refresh returns 401 (session is over).
    return onLoggedOut(() => setState(LOGGED_OUT));
  }, []);

  const logout = useCallback(async () => {
    try {
      await endSession();
    } catch (error: unknown) {
      // Still log out locally: the user asked to leave. Worst case the cookie
      // survived and a reload signs them back in.
      console.error('Logout request failed', error);
    } finally {
      setState(LOGGED_OUT);
    }
  }, []);

  // New object only when state changes, so consumers don't re-render for nothing.
  const value = useMemo(() => ({ ...state, login, logout }), [state, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
