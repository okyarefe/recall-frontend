import { Menu } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';

import { BrandMark } from '@/shared/components/BrandMark';
import { Button } from '@/shared/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { SidebarNav } from './SidebarNav';

export function MobileHeader({ footer }: { footer: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-surface px-(--gutter) md:hidden">
      <Link to="/dashboard" aria-label="Recall dashboard">
        <BrandMark />
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-sidebar gap-0 bg-surface">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          {/* Navigating doesn't unmount the drawer, so close it by hand. */}
          <SidebarNav footer={footer} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
