import { BookOpenCheck, ChartLine, Files, Timer, type LucideIcon } from 'lucide-react';

import { cn } from '@/shared/utils/cn';

const FEATURES: {
  icon: LucideIcon;
  title: string;
  description: string;
  // One of the design's highlight colors per card.
  tone: string;
}[] = [
  {
    icon: BookOpenCheck,
    title: 'Answers you can verify',
    description: 'Every question links to the exact passage in your document, so you can check it.',
    tone: 'bg-primary-soft text-primary',
  },
  {
    icon: Timer,
    title: 'Timed exams',
    description: 'Switch to exam mode: a countdown, no hints, and a score at the end.',
    tone: 'bg-accent text-accent-foreground',
  },
  {
    icon: Files,
    title: 'Your formats',
    description: 'PDF, Word and CSV today. Placeholder: more formats coming.',
    tone: 'bg-chart-4 text-accent-foreground',
  },
  {
    icon: ChartLine,
    title: 'Placeholder feature',
    description: 'Placeholder description for a feature that is not decided yet.',
    tone: 'bg-success-soft text-success',
  },
];

export function FeatureGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {FEATURES.map((feature) => (
        <li
          key={feature.title}
          className="flex gap-5 rounded-card border border-border bg-surface p-6 shadow-card"
        >
          <span
            className={cn('grid size-11 shrink-0 place-items-center rounded-card', feature.tone)}
          >
            <feature.icon className="size-5" />
          </span>
          <div>
            <h3 className="text-heading">{feature.title}</h3>
            <p className="mt-2 text-caption text-muted-foreground">{feature.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
