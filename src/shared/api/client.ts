import { env } from '@/config/env';
import { clearAccessToken, getAccessToken, refresh } from './tokenStore';

// Notified when the session is gone (refresh returned 401).
// shared/ can't import features/, so AuthProvider subscribes here instead.
const loggedOutListeners = new Set<() => void>();

/** Subscribe to logout. Returns an unsubscribe function (use it as effect cleanup). */
export function onLoggedOut(listener: () => void): () => void {
  loggedOutListeners.add(listener);
  return () => {
    loggedOutListeners.delete(listener);
  };
}

// The session already died on the backend (refresh got 401): no request to
// make, just drop the token and tell listeners. Not the user-initiated logout().
function handleSessionExpired(): void {
  clearAccessToken();
  loggedOutListeners.forEach((listener) => listener());
}

/**
 * fetch() for the API: adds the Bearer token, and on a 401 refreshes the
 * token and retries once. Returns the Response like fetch does.
 * Throws if the request or the refresh fails at the network/server level.
 */
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const sentToken = getAccessToken();
  const res = await send(path, init, sentToken);
  if (res.status !== 401) return res;

  // Another request refreshed while ours was in flight: reuse its token
  // instead of rotating the refresh token again.
  const currentToken = getAccessToken();
  if (currentToken && currentToken !== sentToken) {
    return send(path, init, currentToken);
  }

  // A throw here (network/5xx) propagates without logging out: state is unknown.
  const newToken = await refresh();
  if (!newToken) {
    handleSessionExpired();
    return res;
  }

  // Retry once only: a second 401 is returned as-is, so we can never loop.
  return send(path, init, newToken);
}

function send(path: string, init: RequestInit, token: string | null): Promise<Response> {
  const headers = new Headers(init.headers);
  if (token) headers.set('Authorization', `Bearer ${token}`);
  return fetch(`${env.API_URL}${path}`, { ...init, headers });
}
