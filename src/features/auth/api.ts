import { env } from '@/config/env';

// Full-page navigation, not fetch: the browser itself has to go to Google's
// login page. Our app unloads here; after login the backend sets the refresh
// cookie and redirects back, and AuthProvider's startup refresh() logs us in.
export function login(): void {
  window.location.assign(`${env.API_URL}/auth/google`);
}

// TODO: logout() once the backend has a logout endpoint. It should call it
// with credentials: 'include' (so the backend can revoke the refresh token and
// clear the cookie), then clearAccessToken() and set status to 'unauthenticated'.
