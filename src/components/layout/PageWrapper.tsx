import type React from 'react';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main className={`container py-8 md:py-12 ${className || ''}`}>
      {children}
    </main>
  );
}
