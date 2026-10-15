import { useState } from 'react';

import { uploadEntry } from '../api';
import type { UploadItem } from '../types';
import { validateFile } from '../uploadRules';

function isSameFile(a: File, b: File): boolean {
  return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
}

function canUpload(item: UploadItem): boolean {
  return item.status === 'ready' || item.status === 'failed';
}

export function useFileUploads() {
  const [items, setItems] = useState<UploadItem[]>([]);

  function addFiles(files: File[]): void {
    setItems((current) => {
      const newFiles = files.filter(
        (file) => !current.some((item) => isSameFile(item.file, file)),
      );
      const newItems = newFiles.map((file): UploadItem => {
        const id = crypto.randomUUID();
        const error = validateFile(file);
        return error ? { id, file, status: 'invalid', error } : { id, file, status: 'ready' };
      });
      return [...current, ...newItems];
    });
  }

  function removeFile(id: string): void {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function updateItem(id: string, next: UploadItem): void {
    setItems((current) => current.map((item) => (item.id === id ? next : item)));
  }

  async function uploadAll(): Promise<void> {
    // One at a time: each upload spends credits, so the backend sees them in order.
    for (const { id, file } of items.filter(canUpload)) {
      updateItem(id, { id, file, status: 'uploading' });
      try {
        const entry = await uploadEntry(file);
        updateItem(id, { id, file, status: 'uploaded', entry });
      } catch {
        updateItem(id, { id, file, status: 'failed', error: 'Upload failed. Try again.' });
      }
    }
  }

  const uploadableCount = items.filter(canUpload).length;
  const isUploading = items.some((item) => item.status === 'uploading');

  return { items, uploadableCount, isUploading, addFiles, removeFile, uploadAll };
}
