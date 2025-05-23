
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { DarkModeToggle } from '@/components/theme/DarkModeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Icons } from '@/components/icons';

const navLinks = [
  { href: '/', label: 'Home', icon: Icons.NymLogo },
  { href: '/tools', label: 'Tools', icon: Icons.Settings2 },
  { href: '/categories', label: 'Categories', icon: Icons.Layers3 },
  { href: '/favorites', label: 'Favorites', icon: Icons.Star },
  { href: '/about', label: 'About', icon: Icons.Info },
  { href: '/contact', label: 'Contact', icon: Icons.MessageSquare },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-4">
                <Logo />
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Button key={link.href} variant="ghost" asChild className="justify-start">
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 text-lg transition-colors hover:text-primary"
                        >
                          <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                          {link.label}
                        </Link>
                      </Button>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* <!-- AdSense Placeholder: Header Banner (Non-intrusive) --> */}
    </header>
  );
}
