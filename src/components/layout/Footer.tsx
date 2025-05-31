
import Link from 'next/link';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';
import { Logo } from '@/components/Logo';
import { getAllTools, getPopularSlugs } from '@/lib/toolsData';
import type { Tool } from '@/types';

export function Footer() {
  const quickLinks = [
    { href: '/tools', label: 'All Tools' },
    { href: '/categories', label: 'Categories' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/contact', label: 'Contact' },
  ];

  const popularToolSlugs = getPopularSlugs().slice(0, 4); 
  const allTools = getAllTools();
  const popularTools: Tool[] = popularToolSlugs
    .map(slugObj => allTools.find(tool => tool.path === slugObj.slug))
    .filter(Boolean) as Tool[];

  const legalLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
  ];

  return (
    <footer className="border-t bg-white dark:bg-muted text-muted-foreground">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-x-6 gap-y-10 text-center lg:text-left">
          {/* Left Section: Brand Info */}
          <div className="lg:w-1/3 max-w-[400px] w-full lg:mx-0 mx-auto flex flex-col items-center lg:items-start">
            <Logo />
            <p className="mt-4 text-[15px] leading-relaxed">
              {APP_TAGLINE} {APP_NAME} is dedicated to providing high-quality, intuitive utilities to enhance productivity for developers and digital professionals.
            </p>
          </div>

          {/* Right Section: Links (grouped) */}
          <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-end gap-8 sm:gap-[100px] items-center sm:items-start w-full lg:w-auto">
            {/* Quick Links Column */}
            <div className="w-full sm:w-auto">
              <h3 className="text-[15px] font-semibold text-foreground mb-4">Quick Links</h3>
              <nav aria-label="Quick Links">
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            {/* Popular Tools Column */}
            {popularTools.length > 0 && (
              <div className="w-full sm:w-auto">
                <h3 className="text-[15px] font-semibold text-foreground mb-4">Popular Tools</h3>
                <nav aria-label="Popular Tools">
                  <ul className="space-y-2">
                    {popularTools.map((tool) => (
                      <li key={tool.id}>
                        <Link
                          href={tool.path}
                          className="text-[15px] hover:text-primary transition-colors"
                        >
                          {tool.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            {/* Legal Links Column */}
            <div className="w-full sm:w-auto">
              <h3 className="text-[15px] font-semibold text-foreground mb-4">Legal</h3>
              <nav aria-label="Legal Links">
                <ul className="space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] hover:text-primary transition-colors"
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
