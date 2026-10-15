import { Check, FileText, LoaderCircle, X } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';
import { formatFileSize } from '../formatFileSize';
import type { UploadItem } from '../types';

type UploadListProps = {
  items: UploadItem[];
  onRemove: (id: string) => void;
};

function getCaption(item: UploadItem): string {
  switch (item.status) {
    case 'invalid':
    case 'failed':
      return item.error;
    case 'uploading':
      return 'Uploading…';
    case 'uploaded':
      return 'Uploaded';
    case 'ready':
      return formatFileSize(item.file.size);
  }
}

export function UploadList({ items, onRemove }: UploadListProps) {
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-col divide-y divide-border rounded-card border border-border bg-surface shadow-card">
      {items.map((item) => {
        const isError = item.status === 'invalid' || item.status === 'failed';
        const isUploaded = item.status === 'uploaded';
        return (
          <li key={item.id} className="flex items-center gap-4 p-4">
            <span
              className={cn(
                'grid size-10 shrink-0 place-items-center rounded-card',
                isError && 'bg-danger/10 text-danger',
                isUploaded && 'bg-success-soft text-success',
                !isError && !isUploaded && 'bg-surface-muted text-muted-foreground',
              )}
            >
              {item.status === 'uploading' ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : isUploaded ? (
                <Check className="size-5" />
              ) : (
                <FileText className="size-5" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-body">{item.file.name}</p>
              <p
                className={cn(
                  'text-caption',
                  isError && 'text-danger',
                  isUploaded && 'text-success',
                  !isError && !isUploaded && 'text-muted-foreground',
                )}
              >
                {getCaption(item)}
              </p>
            </div>
            {item.status !== 'uploading' && (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${item.file.name}`}
                onClick={() => onRemove(item.id)}
              >
                <X />
              </Button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
