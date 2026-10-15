import { apiFetch } from '@/shared/api/client';

import type { Entry } from './types';

export async function uploadEntry(file: File): Promise<Entry> {
  const body = new FormData();
  body.append('file', file);

  // No Content-Type header: the browser sets multipart/form-data with the boundary.
  const res = await apiFetch('/entries/upload', { method: 'POST', body });
  if (!res.ok) throw new Error(`POST /entries/upload failed with status ${res.status}`);
  return (await res.json()) as Entry;
}
