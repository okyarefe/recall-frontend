import { Link } from 'react-router';

import { BrandMark } from '@/shared/components/BrandMark';

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-page flex-col gap-6 px-(--gutter) py-10 md:flex-row md:items-center md:justify-between">
        <BrandMark />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-6 text-caption text-muted-foreground">
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
            {/* Placeholders until these pages exist. */}
            <li>
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-caption text-muted-foreground">© 2026 Recall</p>
      </div>
    </footer>
  );
}
