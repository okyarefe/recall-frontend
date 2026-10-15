import { LayoutDashboard, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';

import { BrandMark } from '@/shared/components/BrandMark';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

const NAV = [{ label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard }];

type SidebarNavProps = {
  // The user menu; the layout provides it so app-shell doesn't depend on auth.
  footer: ReactNode;
  onNavigate?: () => void;
};

export function SidebarNav({ footer, onNavigate }: SidebarNavProps) {
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link to="/dashboard" aria-label="Recall dashboard" className="px-2" onClick={onNavigate}>
        <BrandMark />
      </Link>
      <Button asChild className="w-full">
        <Link to="/upload" onClick={onNavigate}>
          <Plus />
          Upload
        </Link>
      </Button>
      <nav aria-label="Main" className="flex-1">
        <ul className="flex flex-col gap-1">
          {NAV.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-caption font-medium',
                    isActive
                      ? 'bg-primary-soft text-primary'
                      : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                  )
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {footer}
    </div>
  );
}
