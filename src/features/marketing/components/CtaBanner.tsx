import type { ReactNode } from 'react';

export function CtaBanner({ action }: { action: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-panel bg-primary px-8 py-16 text-center text-primary-foreground">
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 size-48 rounded-pill bg-hatch text-primary-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-12 -left-8 size-40 rounded-pill bg-hatch text-primary-foreground/20"
      />
      <div className="relative mx-auto flex max-w-narrow flex-col items-center gap-6">
        <h2 className="text-display">Ready to study smarter?</h2>
        <p className="opacity-80">Placeholder supporting line for the final call to action.</p>
        {action}
      </div>
    </div>
  );
}
