import { ChevronsUpDown, LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useAuth, useCurrentUser } from '../useAuth';

export function UserMenu() {
  const user = useCurrentUser();
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-md p-2 text-left outline-none hover:bg-surface-muted focus-visible:ring-[3px] focus-visible:ring-ring/50">
        <span
          aria-hidden="true"
          className="grid size-8 shrink-0 place-items-center rounded-pill bg-primary-soft text-label text-primary"
        >
          {user.email.charAt(0).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1 truncate text-caption">{user.email}</span>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-(--radix-dropdown-menu-trigger-width)">
        <DropdownMenuItem onSelect={() => void logout()}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
