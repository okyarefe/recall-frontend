import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { onLoggedOut } from '@/shared/api/client';
import { refresh } from '@/shared/api/tokenStore';
import { login } from './api';
import { AuthContext, type AuthStatus } from './useAuth';

export function AuthProvider({ children }: { children: ReactNode }) {
  // 'loading' until the startup refresh answers, so ProtectedRoute
  // doesn't redirect to /login before we actually know.
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    // App start: the refresh cookie (if any) tells us whether we're logged in.
    // StrictMode runs this effect twice in dev; both calls share one request
    // through refresh()'s in-flight promise.
    refresh()
      .then((token) => setStatus(token ? 'authenticated' : 'unauthenticated'))
      .catch((error: unknown) => {
        // Backend unreachable or 5xx: we can't confirm a session, so treat the
        // user as logged out. The cookie is untouched, so a reload can recover.
        console.error('Startup token refresh failed', error);
        setStatus('unauthenticated');
      });

    // Later: apiFetch calls this when a refresh returns 401 (session is over).
    return onLoggedOut(() => setStatus('unauthenticated'));
  }, []);

  // New object only when status changes, so consumers don't re-render for nothing.
  const value = useMemo(() => ({ status, login }), [status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
