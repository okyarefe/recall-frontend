import { useState, type ChangeEvent, type DragEvent } from 'react';
import { Upload } from 'lucide-react';

import { cn } from '@/shared/utils/cn';
import { ACCEPT_ATTRIBUTE, ACCEPTED_FILES_HINT } from '../uploadRules';

type FileDropzoneProps = {
  onFiles: (files: File[]) => void;
};

export function FileDropzone({ onFiles }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onFiles(Array.from(event.target.files ?? []));
    // Reset, so picking the same file again (e.g. after removing it) fires change.
    event.target.value = '';
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>): void {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>): void {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>): void {
    event.preventDefault();
    setIsDragging(false);
    onFiles(Array.from(event.dataTransfer.files));
  }

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex cursor-pointer flex-col items-center gap-3 rounded-card border-2 border-dashed border-border bg-surface p-10 text-center transition-colors hover:bg-surface-muted',
        'has-[:focus-visible]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50',
        isDragging && 'border-primary bg-primary-soft hover:bg-primary-soft',
      )}
    >
      <span className="grid size-11 place-items-center rounded-card bg-primary-soft text-primary">
        <Upload className="size-5" />
      </span>
      <span className="text-heading">
        Drop files here or <span className="text-primary">browse</span>
      </span>
      <span className="text-caption text-muted-foreground">
        {ACCEPTED_FILES_HINT}
      </span>
      <input
        type="file"
        multiple
        accept={ACCEPT_ATTRIBUTE}
        onChange={handleChange}
        className="sr-only"
      />
    </label>
  );
}
