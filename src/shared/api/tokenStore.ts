import { env } from '@/config/env';

// In memory only: never persisted, so injected scripts can't read it from storage.
// Lost on reload by design; the httpOnly refresh cookie restores it via refresh().
let accessToken: string | null = null;

// The refresh currently in progress, shared by every concurrent caller.
let inFlight: Promise<string | null> | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function clearAccessToken(): void {
  accessToken = null;
}

/**
 * Gets a new access token using the refresh cookie.
 * Resolves to the token, or null if the user isn't logged in (401).
 * Throws on network/server errors (login state unknown).
 *
 * Refresh tokens are single-use: concurrent calls share one request,
 * and a Web Lock makes refreshes take turns across browser tabs.
 */
export function refresh(): Promise<string | null> {
  if (!inFlight) {
    // Never put an `await` between the check above and this assignment:
    // other callers would pass the check too and send the same refresh token twice.
    inFlight = withCrossTabLock(requestNewToken).finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
}

/**
 * Ends the session on the backend (revokes the refresh token, clears the cookie)
 * and forgets the access token. Waits for a running refresh and takes the same
 * lock, so a rotation can't leave a fresh, unrevoked token behind.
 */
export async function logout(): Promise<void> {
  try {
    await inFlight?.catch(() => {});
    const res = await withCrossTabLock(() =>
      fetch(`${env.API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // send the cookie, and accept the Set-Cookie that deletes it
      }),
    );
    if (!res.ok) {
      throw new Error(`Logout failed with status ${res.status}`);
    }
  } finally {
    // The access token is a JWT: the backend can't revoke it, so drop it here.
    accessToken = null;
  }
}

async function requestNewToken(): Promise<string | null> {
  const res = await fetch(`${env.API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // send the httpOnly refresh_token cookie
  });

  if (res.status === 401) {
    accessToken = null;
    return null;
  }
  if (!res.ok) {
    throw new Error(`Token refresh failed with status ${res.status}`);
  }

  const body = (await res.json()) as { accessToken: string };
  accessToken = body.accessToken;
  return accessToken;
}

async function withCrossTabLock<T>(fn: () => Promise<T>): Promise<T> {
  if (typeof navigator !== 'undefined' && navigator.locks) {
    // `await` unwraps the Promise<Promise<T>> that LockManager's typings produce.
    return await navigator.locks.request('auth-refresh', fn);
  }
  return fn();
}
