import type { ReactNode } from 'react';

import { SidebarNav } from './SidebarNav';

export function AppSidebar({ footer }: { footer: ReactNode }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-sidebar shrink-0 border-r border-border bg-surface md:block">
      <SidebarNav footer={footer} />
    </aside>
  );
}
