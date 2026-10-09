import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/features/auth';

// Layout route: every route nested inside it in routes.ts requires login.
export default function ProtectedLayout() {
  const { status } = useAuth();

  // Startup refresh hasn't answered yet: wait instead of redirecting too early.
  if (status === 'loading') {
    return (
      <div role="status" className="grid min-h-screen place-items-center text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (status === 'unauthenticated') return <Navigate to="/login" replace />;

  // Authenticated: render the matched child route.
  return <Outlet />;
}
