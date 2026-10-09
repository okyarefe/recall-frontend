import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { BrandMark } from '@/shared/components/BrandMark';

// Plain anchors: these sections live on the home page, so from /contact the
// link loads / and jumps to the section.
const NAV = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'FAQ', href: '/#faq' },
];

// `action` is the sign-in button; the page provides it so marketing doesn't depend on auth.
export function SiteHeader({ action }: { action: ReactNode }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-(--gutter)">
        <Link to="/" aria-label="Recall home">
          <BrandMark />
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-caption text-muted-foreground">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {action}
      </div>
    </header>
  );
}
