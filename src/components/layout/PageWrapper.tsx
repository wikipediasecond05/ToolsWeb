
import type React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main className={`container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 ${className || ''}`}>
      {children}
    </main>
  );
}
