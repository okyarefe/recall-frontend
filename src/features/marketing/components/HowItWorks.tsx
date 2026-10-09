import { GraduationCap, Sparkles, Upload, type LucideIcon } from 'lucide-react';

const STEPS: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Upload,
    title: 'Upload',
    description: 'Add a PDF, Word document or CSV: lecture notes, a textbook chapter, a glossary.',
  },
  {
    icon: Sparkles,
    title: 'Generate',
    description: 'Recall reads it and writes questions that only your material can answer.',
  },
  {
    icon: GraduationCap,
    title: 'Practise',
    description: 'Take a quick quiz or a timed exam, then check each answer against its source.',
  },
];

export function HowItWorks() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {STEPS.map((step, i) => (
        <li
          key={step.title}
          className="rounded-card border border-border bg-surface p-6 shadow-card"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-pill bg-primary-soft text-primary">
              <step.icon className="size-5" />
            </span>
            <span className="text-label text-muted-foreground">Step {i + 1}</span>
          </div>
          <h3 className="mt-6 text-heading">{step.title}</h3>
          <p className="mt-2 text-caption text-muted-foreground">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
