import { env } from '@/config/env';
import { apiFetch } from '@/shared/api/client';

// Shape of GET /auth/me (backend selects only safe fields).
export type AuthUser = {
  id: string;
  email: string;
};

// Full-page navigation, not fetch: the browser itself has to go to Google's
// login page. Our app unloads here; after login the backend sets the refresh
// cookie and redirects back, and AuthProvider's startup refresh() logs us in.
export function login(): void {
  window.location.assign(`${env.API_URL}/auth/google`);
}

// Resolves to null on 401 (e.g. the user was deleted while the token was still valid).
export async function getMe(): Promise<AuthUser | null> {
  const res = await apiFetch('/auth/me');
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`GET /auth/me failed with status ${res.status}`);
  return (await res.json()) as AuthUser;
}

// TODO: logout() once the backend has a logout endpoint. It should call it
// with credentials: 'include' (so the backend can revoke the refresh token and
// clear the cookie), then clearAccessToken() and set status to 'unauthenticated'.
