import type { ReactNode } from 'react';

type EntriesMessageProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

// Shared box for the list's empty and error states.
export function EntriesMessage({ title, description, action }: EntriesMessageProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border border-border bg-surface p-10 text-center shadow-card">
      <div>
        <p className="text-heading">{title}</p>
        <p className="mt-1 text-caption text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
