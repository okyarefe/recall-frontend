import { PageHeader } from '@/features/app-shell';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Dashboard"
        description="Your documents and review questions will show up here."
      />
    </div>
  );
}
