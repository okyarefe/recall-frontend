import { Check, FileText, Sparkles } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

const OPTIONS = [
  { label: 'Stores genetic information', correct: false },
  { label: 'Produces energy (ATP)', correct: true },
  { label: 'Builds proteins', correct: false },
];

// Decorative only: the page hides it from screen readers.
// Tells the product story: document in, quiz out, answer traced back to its source.
export function ProductShowcase() {
  return (
    <div className="relative w-full max-w-narrow">
      <div className="rounded-card border border-border bg-surface p-6 shadow-card">
        {/* Left-aligned: the document card overlaps the top-right corner. */}
        <div className="flex items-center gap-3">
          <p className="text-caption text-muted-foreground">Question 3 of 12</p>
          <div className="h-1.5 w-16 overflow-hidden rounded-pill bg-surface-muted">
            <div className="h-full w-1/4 rounded-pill bg-primary" />
          </div>
        </div>

        <p className="mt-3 text-heading">What does the mitochondria do?</p>

        <ul className="mt-4 flex flex-col gap-2">
          {OPTIONS.map((option) => (
            <li
              key={option.label}
              className={cn(
                'flex items-center gap-3 rounded-card border px-4 py-2.5 text-caption',
                option.correct
                  ? 'border-success bg-success-soft'
                  : 'border-border text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'grid size-4 shrink-0 place-items-center rounded-pill border',
                  option.correct ? 'border-success bg-success' : 'border-border',
                )}
              />
              <span className="flex-1">{option.label}</span>
              {option.correct && <Check className="size-4 text-success" />}
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-dashed border-border pt-4">
          <p className="flex items-center gap-2 text-caption text-muted-foreground">
            <FileText className="size-4 shrink-0" />
            <span>
              From <span className="font-medium text-foreground">Biology_ch3.pdf</span> · page 12
            </span>
          </p>
          <blockquote className="mt-3 rounded-card bg-primary-soft px-4 py-3 text-caption text-muted-foreground">
            “…the{' '}
            <mark className="bg-transparent font-medium text-primary">
              mitochondria produces ATP
            </mark>
            , the cell’s main source of energy…”
          </blockquote>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-3 flex items-center sm:-top-5 sm:bottom-auto sm:-left-6 gap-2 rounded-pill bg-accent px-4 py-2 text-caption font-medium text-accent-foreground shadow-float">
        <Sparkles className="size-4" />
        12 questions generated
      </div>

      <div className="absolute -top-16 -right-6 w-40 rotate-6 sm:-right-10 sm:w-52 overflow-hidden rounded-card bg-chart-4 p-4 shadow-float">
        <div className="absolute -right-6 -bottom-6 size-20 rounded-pill bg-hatch text-accent-foreground/15" />
        <div className="relative flex flex-col gap-2 text-accent-foreground">
          <div className="flex items-center gap-2">
            <FileText className="size-4 shrink-0" />
            <span className="truncate text-label">Biology_ch3.pdf</span>
          </div>
          <span className="mt-1 h-1.5 w-full rounded-pill bg-accent-foreground/30" />
          <span className="h-1.5 w-4/5 rounded-pill bg-accent-foreground/30" />
          <span className="h-1.5 w-3/5 rounded-pill bg-accent-foreground/30" />
        </div>
      </div>
    </div>
  );
}
