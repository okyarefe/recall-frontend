import { Link } from 'react-router';

import { PageHeader } from '@/features/app-shell';
import { EntriesMessage, EntryList, useEntries } from '@/features/entries';
import { Button } from '@/shared/components/ui/button';
import styles from './LibraryPage.module.css';

export default function LibraryPage() {
  const result = useEntries();

  return (
    <div className={styles.page}>
      <PageHeader title="Library" description="Everything you've uploaded." />

      {result.status === 'loading' && (
        <p role="status" className={styles.status}>
          Loading your documents…
        </p>
      )}

      {result.status === 'error' && (
        <EntriesMessage
          title="Couldn't load your documents"
          description="Check your connection and try again."
          action={
            <Button variant="outline" onClick={result.retry}>
              Try again
            </Button>
          }
        />
      )}

      {result.status === 'success' && result.entries.length === 0 && (
        <EntriesMessage
          title="No documents yet"
          description="Upload a document and Recall will write questions from it."
          action={
            <Button asChild>
              <Link to="/upload">Upload</Link>
            </Button>
          }
        />
      )}

      {result.status === 'success' && result.entries.length > 0 && (
        <EntryList entries={result.entries} />
      )}
    </div>
  );
}
