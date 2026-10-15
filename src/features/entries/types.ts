// TODO: Entry — the shape POST /entries/upload returns (fill in from the backend DTO).
export type Entry = {
  id: string;
};

export type UploadItem =
  | { id: string; file: File; status: 'ready' }
  | { id: string; file: File; status: 'invalid'; error: string }
  | { id: string; file: File; status: 'uploading' }
  | { id: string; file: File; status: 'uploaded'; entry: Entry }
  | { id: string; file: File; status: 'failed'; error: string };
