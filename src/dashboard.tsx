import { Outlet } from 'react-router';

import { useAuth, useCurrentUser } from '@/features/auth';
import { Button } from '@/shared/components/ui/button';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const user = useCurrentUser();
  const { logout } = useAuth();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Signed in as {user.email}</p>
        </div>
        <Button variant="outline" onClick={() => void logout()}>
          Log out
        </Button>
      </header>
      <Outlet />
    </div>
  );
}
