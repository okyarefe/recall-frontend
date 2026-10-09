import { Link, Navigate } from 'react-router';

import { GoogleSignInButton, useAuth } from '@/features/auth';
import { BrandMark } from '@/shared/components/BrandMark';
import { ProductShowcase } from '@/shared/components/ProductShowcase';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { status, login } = useAuth();

  // Don't flash the button while the startup refresh is still answering.
  if (status === 'loading') return null;

  // Already signed in: nothing to do here.
  if (status === 'authenticated') return <Navigate to="/dashboard" replace />;

  return (
    <main className={styles.page}>
      <section className={styles.formSide}>
        <Link to="/" className="self-start">
          <BrandMark />
        </Link>
        <div className={styles.form}>
          <div>
            <h1 className={styles.title}>Welcome back</h1>
            <p className={styles.subtitle}>Sign in to continue to Recall.</p>
          </div>
          <GoogleSignInButton onClick={login} />
          <p className={styles.footnote}>No password needed, just your Google account.</p>
        </div>
      </section>

      <aside className={styles.showcase} aria-hidden="true">
        <div className={styles.showcaseText}>
          <h2 className={styles.showcaseTitle}>Turn your notes into quizzes.</h2>
          <p className={styles.showcaseSubtitle}>
            Upload a document. Recall writes the questions.
          </p>
        </div>
        <ProductShowcase />
      </aside>
    </main>
  );
}
