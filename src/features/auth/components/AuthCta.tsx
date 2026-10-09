import { Link } from 'react-router';

import { Button } from '@/shared/components/ui/button';
import { useAuth } from '../useAuth';

// Signed-in visitors skip the login page and go straight to their dashboard.
export function AuthCta({
  label,
  size = 'default',
}: {
  label: string;
  size?: 'default' | 'lg';
}) {
  const { status } = useAuth();
  const signedIn = status === 'authenticated';

  return (
    <Button
      asChild
      variant="inverse"
      size={size}
      className={size === 'lg' ? 'h-12 rounded-pill px-6 text-body' : 'rounded-pill'}
    >
      <Link to={signedIn ? '/dashboard' : '/login'}>
        {signedIn ? 'Go to dashboard' : label}
      </Link>
    </Button>
  );
}
