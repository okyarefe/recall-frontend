import { Outlet } from 'react-router';

import { AppSidebar, MobileHeader } from '@/features/app-shell';
import { UserMenu } from '@/features/auth';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const userMenu = <UserMenu />;

  return (
    <div className={styles.shell}>
      <AppSidebar footer={userMenu} />
      <div className={styles.column}>
        <MobileHeader footer={userMenu} />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
