import { useQuery } from '@tanstack/react-query';

import { getEntries } from '../api';
import type { Entry } from '../types';

export const entriesQueryKey = ['entries'] as const;

type EntriesResult = { retry: () => void } & (
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; entries: Entry[] }
);

export function useEntries(): EntriesResult {
  const query = useQuery({
    queryKey: entriesQueryKey,
    queryFn: ({ signal }) => getEntries(signal),
  });

  const retry = () => void query.refetch();

  // Same shape as before React Query, so pages don't change.
  if (query.status === 'pending') return { status: 'loading', retry };
  if (query.status === 'error') return { status: 'error', error: query.error, retry };
  return { status: 'success', entries: query.data, retry };
}
