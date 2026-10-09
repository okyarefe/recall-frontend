import { FileText } from 'lucide-react';
import type { ReactNode } from 'react';

import { ProductShowcase } from '@/shared/components/ProductShowcase';
import { Button } from '@/shared/components/ui/button';

export function Hero({ action }: { action: ReactNode }) {
  return (
    <div className="grid items-center gap-16 lg:grid-cols-2">
      {/* Stacked (below lg): centered like the rest of the page. Side by side: left-aligned. */}
      <div className="flex flex-col items-center gap-8 text-center lg:items-start lg:text-left">
        <p className="flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 text-label text-muted-foreground">
          <FileText className="size-3.5 text-primary" />
          Works with PDF, Word and CSV
        </p>
        <div>
          <h1 className="text-display lg:text-hero">Turn your notes into quizzes.</h1>
          <p className="mx-auto mt-5 max-w-narrow text-body text-muted-foreground lg:mx-0">
            Upload your study material and Recall writes questions from it, with every
            answer linked back to the page it came from.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
          {action}
          <Button asChild variant="outline" size="lg" className="h-12 rounded-pill px-6 text-body">
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>
      </div>

      {/* Decorative: the copy beside it already says what it shows. */}
      <div
        aria-hidden="true"
        className="flex justify-center rounded-panel bg-primary-soft px-6 pt-24 pb-12 sm:px-10"
      >
        <ProductShowcase />
      </div>
    </div>
  );
}
