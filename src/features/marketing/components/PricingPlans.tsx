import { Check } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

// Placeholder plans: pricing is not decided yet.
const PLANS = [
  { name: 'Starter', features: 3, featured: false },
  { name: 'Pro', features: 4, featured: true },
  { name: 'Team', features: 3, featured: false },
];

// muted-foreground is tuned for surface, not inverse: fade the text there instead.
function secondaryText(featured: boolean): string {
  return featured ? 'opacity-70' : 'text-muted-foreground';
}

export function PricingPlans() {
  return (
    <ul className="grid items-start gap-4 md:grid-cols-3">
      {PLANS.map((plan) => (
        <li
          key={plan.name}
          className={cn(
            'flex flex-col gap-6 rounded-card border p-6',
            plan.featured
              ? 'border-inverse bg-inverse text-inverse-foreground shadow-float'
              : 'border-border bg-surface shadow-card',
          )}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-heading">{plan.name}</h3>
            {plan.featured && (
              <span className="rounded-pill bg-accent px-2.5 py-0.5 text-label text-accent-foreground">
                Most popular
              </span>
            )}
          </div>
          <div>
            <p className="text-display">
              $—<span className={cn('text-caption', secondaryText(plan.featured))}> / month</span>
            </p>
            <p className={cn('mt-2 text-caption', secondaryText(plan.featured))}>
              Placeholder plan description.
            </p>
          </div>
          <ul className="flex flex-col gap-3 text-caption">
            {Array.from({ length: plan.features }, (_, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className={cn('size-4', plan.featured ? 'text-accent' : 'text-primary')} />
                Placeholder feature
              </li>
            ))}
          </ul>
          <Button
            asChild
            variant={plan.featured ? 'secondary' : 'outline'}
            className="rounded-pill"
          >
            <Link to="/login">Get started</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
