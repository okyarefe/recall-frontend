import { FileText, Link2, StickyNote, type LucideIcon } from 'lucide-react';

import { formatDate } from '../formatDate';
import type { Entry, EntryType } from '../types';
import { EntryStatusBadge } from './EntryStatusBadge';

const TYPES: Record<EntryType, { label: string; icon: LucideIcon }> = {
  file: { label: 'File', icon: FileText },
  link: { label: 'Link', icon: Link2 },
  note: { label: 'Note', icon: StickyNote },
};

function getTitle(entry: Entry): string {
  return entry.title ?? entry.sourceUrl ?? 'Untitled';
}

export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="flex flex-col divide-y divide-border rounded-card border border-border bg-surface shadow-card">
      {entries.map((entry) => {
        const { label, icon: Icon } = TYPES[entry.type];
        return (
          <li key={entry.id} className="flex items-center gap-4 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-card bg-surface-muted text-muted-foreground">
              <Icon className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-body">{getTitle(entry)}</p>
              <p className="truncate text-caption text-muted-foreground">
                {entry.status === 'failed' && entry.error
                  ? entry.error
                  : `${label} · ${formatDate(entry.createdAt)}`}
              </p>
            </div>
            <EntryStatusBadge status={entry.status} />
          </li>
        );
      })}
    </ul>
  );
}
