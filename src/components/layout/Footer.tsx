
import Link from 'next/link';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { Logo } from '@/components/Logo';

export function Footer() {
  const quickLinks = [
    { href: '/tools', label: 'All Tools' },
    { href: '/categories', label: 'Categories' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/contact', label: 'Contact' },
  ];

  const legalLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ];

  return (
    <footer className="border-t bg-muted text-muted-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:justify-between gap-x-6 gap-y-10"> {/* Changed gap-x-8 to gap-x-6 */}
          {/* Left Section: Brand Info */}
          <div className="md:w-2/5 lg:w-1/3">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed">
              {APP_TAGLINE} NymGram is dedicated to providing high-quality, intuitive utilities to enhance productivity for developers and digital professionals.
            </p>
            {/* Social media icons could go here in future */}
          </div>

          {/* Right Section: Links (grouped) */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 md:justify-end">
            {/* Quick Links Column */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
              <nav aria-label="Quick Links">
                <ul className="space-y-2">
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

            {/* Legal Links Column */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
              <nav aria-label="Legal Links">
                <ul className="space-y-2">
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
        </div>
      </div>
    </footer>
  );
}
