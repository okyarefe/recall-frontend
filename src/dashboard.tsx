import { Outlet } from 'react-router';

import { useAuth, useCurrentUser } from '@/features/auth';

export default function Dashboard() {
  const user = useCurrentUser();
  const { logout } = useAuth();

  return (
    <div>
      Welcome to dashboard :D
      <p className="text-muted-foreground">Signed in as {user.email}</p>
      <button
        type="button"
        onClick={() => void logout()}
        className="rounded-lg border border-border px-3 py-1.5 hover:bg-surface-muted"
      >
        Log out
      </button>
      <Outlet />
    </div>
  );
}
