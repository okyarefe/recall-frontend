import { createContext, useContext } from 'react';

import type { AuthUser } from './api';

// A user exists only when authenticated, so TypeScript narrows `user` by `status`.
export type AuthState =
  | { status: 'loading'; user: null }
  | { status: 'unauthenticated'; user: null }
  | { status: 'authenticated'; user: AuthUser };

export type AuthStatus = AuthState['status'];

export type AuthContextValue = AuthState & {
  login: () => void;
  logout: () => Promise<void>;
};

// Default is null: calling useAuth() outside <AuthProvider> is a bug,
// so it should fail loudly instead of returning a fake status.
export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

// For components behind ProtectedRoute, where a user is guaranteed.
export function useCurrentUser(): AuthUser {
  const auth = useAuth();
  if (auth.status !== 'authenticated') {
    throw new Error('useCurrentUser must be used behind ProtectedRoute');
  }
  return auth.user;
}
