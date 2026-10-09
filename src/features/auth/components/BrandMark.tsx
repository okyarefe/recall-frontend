import { cn } from '@/shared/utils/cn';

export function BrandMark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="grid size-10 place-items-center rounded-xl bg-primary"
      >
        <span className="flex flex-col gap-1">
          <span className="h-1.5 w-5 rounded-full bg-primary-foreground" />
          <span className="h-1.5 w-3 rounded-full bg-primary-foreground/70" />
        </span>
      </span>
      <span className="text-lg font-semibold tracking-tight">Recall</span>
    </div>
  );
}
