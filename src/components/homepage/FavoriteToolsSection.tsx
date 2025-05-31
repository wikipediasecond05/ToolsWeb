
'use client';

import React, { useState, useEffect } from 'react';
import { getAllTools } from '@/lib/toolsData';
import type { Tool, SerializableToolData } from '@/types';
import { ToolCard } from '@/components/tools/ToolCard';
import { Icons } from '@/components/icons';
import { Skeleton } from '@/components/ui/skeleton';

const FAVORITES_KEY = 'NymGram_favorite_tools';

export function FavoriteToolsSection() {
  const [favoriteTools, setFavoriteTools] = useState<SerializableToolData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavoriteIds: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      if (storedFavoriteIds.length > 0) {
        const allToolsData = getAllTools();
        const likedTools = storedFavoriteIds
          .map(id => allToolsData.find(tool => tool.id === id))
          .filter(Boolean) as Tool[];

        const serializableLikedTools: SerializableToolData[] = likedTools.map(tool => {
          const { icon, ...serializableTool } = tool; // Remove the icon function
          return serializableTool;
        });
        setFavoriteTools(serializableLikedTools);
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    // Show skeleton loaders if you expect more than 0 favorites initially
    // For simplicity, we'll just return null during initial client-side load
    // or if localStorage check is very fast. If there are favorites, it will re-render.
    // To show skeletons:
    // if (typeof window !== 'undefined' && JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]').length > 0) {
    //   return (
    //     <section className="py-12 md:py-16">
    //       <div className="flex items-center gap-3 mb-10">
    //         <Icons.Heart className="h-8 w-8 text-primary" />
    //         <h2 className="text-3xl font-bold">Your Favorite Tools</h2>
    //       </div>
    //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    //         {[...Array(JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]').length)].map((_, i) => (
    //            <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
    //         ))}
    //       </div>
    //     </section>
    //   );
    // }
    return null; 
  }

  if (favoriteTools.length === 0) {
    return null; // Don't render the section if there are no favorites
  }

  return (
    <section className="py-12 md:py-16">
      <div className="flex items-center gap-3 mb-10">
        <Icons.Heart className="h-6 w-6 text-primary" fill="currentColor" />
        <h2 className="text-[24px] font-bold">Favorite Tools</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {favoriteTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
