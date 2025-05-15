import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { Icons } from '@/components/icons';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-xl font-bold ${className}`}>
      <Icons.NymLogo className="h-7 w-7 text-primary" />
      {!iconOnly && <span className="text-foreground">{APP_NAME}</span>}
    </Link>
  );
}
