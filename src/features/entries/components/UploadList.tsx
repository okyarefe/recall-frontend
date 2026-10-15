import { FileText, X } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';
import { formatFileSize } from '../formatFileSize';
import type { UploadItem } from '../types';

type UploadListProps = {
  items: UploadItem[];
  onRemove: (id: string) => void;
};

export function UploadList({ items, onRemove }: UploadListProps) {
  if (items.length === 0) return null;

  return (
    <ul className="flex flex-col divide-y divide-border rounded-card border border-border bg-surface shadow-card">
      {items.map((item) => {
        const isInvalid = item.status === 'invalid';
        return (
          <li key={item.id} className="flex items-center gap-4 p-4">
            <span
              className={cn(
                'grid size-10 shrink-0 place-items-center rounded-card',
                isInvalid ? 'bg-danger/10 text-danger' : 'bg-surface-muted text-muted-foreground',
              )}
            >
              <FileText className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-body">{item.file.name}</p>
              <p className={cn('text-caption', isInvalid ? 'text-danger' : 'text-muted-foreground')}>
                {item.status === 'invalid' ? item.error : formatFileSize(item.file.size)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${item.file.name}`}
              onClick={() => onRemove(item.id)}
            >
              <X />
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
