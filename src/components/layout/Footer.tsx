
import Link from 'next/link';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { Logo } from '@/components/Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/tools', label: 'All Tools' },
    { href: '/categories', label: 'Categories' },
    { href: '/favorites', label: 'Favorites' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ];

  return (
    <footer className="border-t bg-muted text-muted-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 mb-10">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2"> {/* Make first column wider on larger screens */}
            <Logo />
            <p className="mt-4 text-sm leading-relaxed"> {/* Added leading-relaxed */}
              {APP_TAGLINE} NymGram is dedicated to providing high-quality, intuitive utilities to enhance productivity for developers and digital professionals.
            </p>
            {/* Social media icons could go here in future */}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
            <nav aria-label="Quick Links">
              <ul className="space-y-3"> {/* Changed from space-y-2 to space-y-3 */}
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
            <nav aria-label="Legal Links">
              <ul className="space-y-3"> {/* Changed from space-y-2 to space-y-3 */}
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center"> {/* Changed md:text-left to text-center */}
          <p className="text-xs">
            &copy; {currentYear} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
