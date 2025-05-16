
'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export function HomepageSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Start typing to search tools..."
          className="w-full h-14 pl-12 pr-16 rounded-full text-lg shadow-lg border-border focus-visible:ring-primary/80"
          aria-label="Search for tools"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded-md border bg-muted px-2 font-mono text-sm font-medium text-muted-foreground opacity-100">
            <Icons.Slash className="h-4 w-4" />
          </kbd>
        </div>
      </div>
    </form>
  );
}
