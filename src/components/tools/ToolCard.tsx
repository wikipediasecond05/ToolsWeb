
'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import Link from 'next/link';
import type { Tool } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Icons, IconName } from '@/components/icons';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: Tool;
}

const FAVORITES_KEY = 'NymGram_favorite_tools';

export function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = tool.iconName ? Icons[tool.iconName as IconName] || Icons.Settings2 : Icons.Settings2;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Ensure localStorage is accessed only on the client
    if (typeof window !== 'undefined') {
      const storedFavorites: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      setIsFavorite(storedFavorites.includes(tool.id));
    }
  }, [tool.id]);

  const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop event from bubbling to the Link

    if (typeof window !== 'undefined') {
      let storedFavorites: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      if (isFavorite) {
        storedFavorites = storedFavorites.filter(id => id !== tool.id);
      } else {
        if (!storedFavorites.includes(tool.id)) {
          storedFavorites.push(tool.id);
        }
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(storedFavorites));
      setIsFavorite(!isFavorite);
    }
  };

  const HeartIcon = isFavorite ? Icons.Heart : () => (
    <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  );


  return (
    <Link href={tool.path} className="block group h-full no-underline">
      <Card className="h-full flex flex-col justify-between hover:shadow-xl transition-all duration-200 ease-in-out hover:border-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800/50 hover:bg-white/50 border rounded-lg overflow-hidden">
        <CardHeader className="flex flex-col p-6 pb-4">
          {IconComponent && <IconComponent className="h-10 w-10 text-primary mb-4" />}
          <CardTitle className="text-[19px] font-semibold mb-3 group-hover:text-primary transition-colors">{tool.title}</CardTitle>
          <CardDescription className="text-[16px] text-muted-foreground line-clamp-2 leading-relaxed h-[50px]">
            {tool.description}
          </CardDescription>
        </CardHeader>
        <div className="flex-grow" /> {/* Pushes footer to bottom */}
        <CardFooter className="flex justify-between items-center p-4">
          <span className="text-primary flex items-center gap-1 text-sm font-medium no-underline">
            Open <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </span>
          <button
            onClick={handleToggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={cn(
              "p-1.5 rounded-full hover:bg-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-transparent",
              isFavorite ? "text-red-500" : "text-muted-foreground hover:text-red-500"
            )}
          >
            <HeartIcon
              className={cn("h-4 w-4", isFavorite && "fill-current")}
            />
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
}
