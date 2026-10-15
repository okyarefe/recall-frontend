import { Link, Outlet } from 'react-router';

import { useAuth, useCurrentUser } from '@/features/auth';
import { Button } from '@/shared/components/ui/button';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const user = useCurrentUser();
  const { logout } = useAuth();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Signed in as {user.email}</p>
        </div>
        <div className={styles.actions}>
          <Button asChild>
            <Link to="/dashboard/upload">Upload</Link>
          </Button>
          <Button variant="outline" onClick={() => void logout()}>
            Log out
          </Button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
