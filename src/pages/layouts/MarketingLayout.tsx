import { Outlet } from 'react-router';

import { AuthCta } from '@/features/auth';
import { SiteFooter, SiteHeader } from '@/features/marketing';
import styles from './MarketingLayout.module.css';

export default function MarketingLayout() {
  return (
    <div className={styles.shell}>
      <SiteHeader action={<AuthCta label="Sign in" />} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
