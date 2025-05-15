import Link from 'next/link';
import { APP_NAME, APP_DOMAIN } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-7xl py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground px-4 sm:px-6 lg:px-8">
        <p>&copy; {currentYear} {APP_NAME}. All rights reserved.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary">Terms of Use</Link>
          {/* <!-- AdSense Placeholder: Footer Link Unit (if applicable) --> */}
        </div>
      </div>
    </footer>
  );
}
