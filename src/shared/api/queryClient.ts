import { QueryClient } from '@tanstack/react-query';

import { ApiError } from './apiError';

function shouldRetry(failureCount: number, error: Error): boolean {
  // A 4xx won't fix itself on retry, and apiFetch has already handled 401
  // (refresh + retry once). Retrying would only refresh again with a dead cookie.
  if (error instanceof ApiError && error.status < 500) return false;
  return failureCount < 2;
}

// One client for the whole app. It lives here, not in a component, so code
// outside React (logout, session expiry) can clear it.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
    },
  },
});
