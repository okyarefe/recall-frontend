import { Outlet } from 'react-router';

import { useCurrentUser } from '@/features/auth';

export default function Dashboard() {
  const user = useCurrentUser();

  return (
    <div>
      Welcome to dashboard :D
      <p className="text-muted-foreground">Signed in as {user.email}</p>
      <Outlet />
    </div>
  );
}
