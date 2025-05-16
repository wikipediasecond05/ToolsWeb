
'use client';

import React, { useState, useEffect } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ToolCard } from '@/components/tools/ToolCard';
import { getAllTools } from '@/lib/toolsData'; // Assuming getToolById exists
import type { Tool } from '@/types';
import { Icons } from '@/components/icons';

const FAVORITES_KEY = 'NymGram_favorite_tools';

export default function FavoritesPage() {
  const [favoriteTools, setFavoriteTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedFavoriteIds: string[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    if (storedFavoriteIds.length > 0) {
      const allTools = getAllTools(); // Fetch all tools once
      const tools = storedFavoriteIds
        .map(id => allTools.find(tool => tool.id === id))
        .filter(Boolean) as Tool[]; // Filter out undefined if a tool was removed
      setFavoriteTools(tools);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <Icons.Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your favorite tools...</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Your Favorite Tools</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Here's your personal collection of pinned tools for quick access.
        </p>
      </div>

      {favoriteTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Icons.Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Favorites Yet!</h2>
          <p className="text-muted-foreground">
            Click the heart icon on any tool card to add it to your favorites.
          </p>
        </div>
      )}
    </PageWrapper>
  );
}
