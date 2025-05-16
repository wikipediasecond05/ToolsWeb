
'use client';

import React, { useState, FormEvent, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons, IconName } from '@/components/icons';
import { getAllTools } from '@/lib/toolsData';
import type { Tool } from '@/types';

export function HomepageSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();
  const allTools = useRef<Tool[]>([]);
  const searchContainerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Ref for the input element

  useEffect(() => {
    allTools.current = getAllTools();
  }, []);

  const performSearch = useCallback((term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    const lowerCaseTerm = term.toLowerCase();
    const filteredTools = allTools.current.filter(tool =>
      tool.title.toLowerCase().includes(lowerCaseTerm) ||
      tool.description.toLowerCase().includes(lowerCaseTerm) ||
      (tool.keywords && tool.keywords.some(kw => kw.toLowerCase().includes(lowerCaseTerm)))
    ).slice(0, 5); 
    setSearchResults(filteredTools);
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      performSearch(searchTerm);
    }, 200); 

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, performSearch]);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/tools?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsInputFocused(false); 
      inputRef.current?.blur(); // Blur input on submit
    }
  };
  
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    // Delay blur to allow click on search results
    setTimeout(() => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(document.activeElement)) {
            setIsInputFocused(false);
        }
    }, 150); // A small delay
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard shortcut for '/'
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/') {
        // Prevent focusing if already typing in an input, textarea, or contenteditable
        const targetElement = event.target as HTMLElement;
        if (
          targetElement.tagName === 'INPUT' ||
          targetElement.tagName === 'TEXTAREA' ||
          targetElement.isContentEditable
        ) {
          return;
        }
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <form ref={searchContainerRef} onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef} // Assign ref to the input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Search for tools..."
          className="w-full h-14 pl-12 pr-16 rounded-full text-lg shadow-lg border-border focus-visible:ring-primary/80 focus-visible:border-transparent"
          aria-label="Search for tools"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded-md border bg-muted px-2 font-mono text-sm font-medium text-muted-foreground opacity-100">
            <Icons.Slash className="h-4 w-4" />
          </kbd>
        </div>
      </div>
      {isInputFocused && searchResults.length > 0 && searchTerm.trim() !== '' && (
        <div className="absolute mt-2 w-full bg-background border border-border rounded-md shadow-xl z-50 max-h-[60vh] overflow-y-auto p-2">
          <ul className="pb-1"> 
            {searchResults.map((tool) => {
              const IconComponent = tool.iconName ? Icons[tool.iconName as IconName] || Icons.Settings2 : Icons.Settings2;
              return (
                <li key={tool.id}>
                  <Link
                    href={tool.path}
                    className="flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-md transition-colors text-sm text-left" 
                    onClick={() => {
                      setIsInputFocused(false);
                      setSearchTerm(''); // Optionally clear search term on click
                    }} 
                  >
                    <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-grow overflow-hidden">
                      <span className="text-foreground block truncate font-medium">{tool.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1 block truncate">{tool.description}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </form>
  );
}
