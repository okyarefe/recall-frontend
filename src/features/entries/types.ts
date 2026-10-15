export type EntryType = 'link' | 'note' | 'file';

export type EntryStatus = 'pending' | 'processing' | 'ready' | 'failed';

// Mirrors the backend Entry entity. Dates arrive as ISO strings in JSON.
export type Entry = {
  id: string;
  userId: string;
  type: EntryType;
  sourceUrl: string | null;
  fileKey: string | null;
  title: string | null;
  content: string | null;
  status: EntryStatus;
  error: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UploadItem =
  | { id: string; file: File; status: 'ready' }
  | { id: string; file: File; status: 'invalid'; error: string }
  | { id: string; file: File; status: 'uploading' }
  | { id: string; file: File; status: 'uploaded'; entry: Entry }
  | { id: string; file: File; status: 'failed'; error: string };
