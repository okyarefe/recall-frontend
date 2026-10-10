import { useState } from 'react';

import type { UploadItem } from '../types';
import { validateFile } from '../uploadRules';

function isSameFile(a: File, b: File): boolean {
  return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;
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

  const readyCount = items.filter((item) => item.status === 'ready').length;

  return { items, readyCount, addFiles, removeFile };
}
