import { cn } from '@/shared/utils/cn';
import type { EntryStatus } from '../types';

const BADGES: Record<EntryStatus, { label: string; className: string }> = {
  pending: { label: 'Queued', className: 'bg-surface-muted text-muted-foreground' },
  processing: { label: 'Processing', className: 'bg-primary-soft text-primary' },
  ready: { label: 'Ready', className: 'bg-success-soft text-success' },
  failed: { label: 'Failed', className: 'bg-danger/10 text-danger' },
};

export function EntryStatusBadge({ status }: { status: EntryStatus }) {
  const badge = BADGES[status];
  return (
    <span className={cn('shrink-0 rounded-pill px-2.5 py-0.5 text-label', badge.className)}>
      {badge.label}
    </span>
  );
}
