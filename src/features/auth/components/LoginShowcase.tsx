import { ShieldCheck } from 'lucide-react';

// Bar heights in % of each half, echoing the design's income/expense chart.
const BARS = [
  { up: 45, down: 35 },
  { up: 80, down: 60 },
  { up: 55, down: 75 },
  { up: 90, down: 45 },
  { up: 70, down: 85 },
  { up: 60, down: 30 },
  { up: 85, down: 65 },
];

// Decorative only: the page hides it from screen readers.
export function LoginShowcase() {
  return (
    <div className="relative w-full max-w-narrow">
      <div className="rounded-card border border-border bg-surface p-6 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-caption text-muted-foreground">Weekly activity</p>
          <span className="rounded-pill bg-success-soft px-2 py-0.5 text-label text-success">
            +12%
          </span>
        </div>
        <p className="mt-1 text-display">
          1,284<span className="text-muted-foreground">.50</span>
        </p>

        <div className="relative mt-6 flex h-44 gap-2.5">
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-border" />
          {BARS.map((bar, i) => (
            <div key={i} className="flex flex-1 flex-col">
              <div className="flex h-1/2 items-end pb-1">
                <div
                  className="w-full rounded-pill bg-hatch text-chart-1/40"
                  style={{ height: `${bar.up}%` }}
                />
              </div>
              <div className="flex h-1/2 items-start pt-1">
                <div
                  className="w-full rounded-pill bg-primary"
                  style={{ height: `${bar.down}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute -top-5 -left-6 flex items-center gap-2 rounded-pill bg-accent px-4 py-2 text-caption font-medium text-accent-foreground shadow-float">
        <ShieldCheck className="size-4" />
        Secure Google sign-in
      </div>

      <div className="absolute -right-8 -bottom-12 w-48 rotate-6 overflow-hidden rounded-card bg-chart-4 p-4 shadow-float">
        <div className="absolute -right-6 -bottom-6 size-24 rounded-pill bg-hatch text-accent-foreground/15" />
        <div className="relative flex flex-col gap-2">
          <span className="h-2 w-16 rounded-pill bg-accent-foreground/80" />
          <span className="h-2 w-24 rounded-pill bg-accent-foreground/30" />
          <span className="mt-6 h-3 w-20 rounded-pill bg-accent-foreground/80" />
        </div>
      </div>
    </div>
  );
}
