import { Navigate } from 'react-router';

import { useAuth } from '../useAuth';

export default function LoginPage() {
  const { status, login } = useAuth();

  // Don't flash the button while the startup refresh is still answering.
  if (status === 'loading') return null;

  // Already signed in: nothing to do here.
  if (status === 'authenticated') return <Navigate to="/dashboard" replace />;

  return (
    <main className="grid min-h-screen place-items-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-card border border-border bg-surface p-8">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <button
          type="button"
          onClick={login}
          className="w-full rounded-lg bg-inverse px-4 py-2.5 font-medium text-inverse-foreground hover:opacity-90"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
