import { useEffect, useState } from 'react';

import { getEntries } from '../api';
import type { Entry } from '../types';

type EntriesState =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; entries: Entry[] };

export function useEntries() {
  const [state, setState] = useState<EntriesState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getEntries(controller.signal)
      .then((entries) => {
        // TEMP debug: remove before committing.
        entries.forEach((entry) => console.log(entry.title, entry.content?.slice(0, 100)));
        setState({ status: 'success', entries });
      })
      .catch((error: unknown) => {
        // Cancelled because the page went away: not a real failure.
        if (controller.signal.aborted) return;
        setState({
          status: 'error',
          error:
            error instanceof Error
              ? error
              : new Error('Could not load entries'),
        });
      });

    return () => controller.abort();
  }, [attempt]);

  function retry(): void {
    setState({ status: 'loading' });
    setAttempt((n) => n + 1);
  }

  return { ...state, retry };
}
