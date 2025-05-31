
'use client';

import React, { useEffect, useState } from 'react';
import { suggestRelatedTools } from '@/ai/flows/suggest-related-tools';
import type { RelatedToolData } from '@/types'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Wand2, Loader2, Shapes } from 'lucide-react';
import { Icons, type IconName } from '@/components/icons';
import { cn } from '@/lib/utils';

interface RelatedToolsProps {
  currentTool: RelatedToolData;
  allTools: RelatedToolData[];
}

const MAX_RELATED_TOOLS = 5;

export function RelatedTools({ currentTool, allTools }: RelatedToolsProps) {
  const [relatedTools, setRelatedTools] = useState<RelatedToolData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRelatedTools() {
      setIsLoading(true);
      setError(null);
      try {
        const toolNames = allTools.map(t => t.title);
        const result = await suggestRelatedTools({
          currentTool: currentTool.title,
          allTools: toolNames,
        });
        
        const suggestedToolObjects = result.relatedTools
          .filter(name => name !== currentTool.title) 
          .map(name => allTools.find(t => t.title === name))
          .filter(Boolean) as RelatedToolData[]; 
        
        setRelatedTools(suggestedToolObjects.slice(0, MAX_RELATED_TOOLS)); 
      } catch (err) {
        console.error('Error fetching related tools:', err);
        setError('Could not load suggestions at this time.');
      } finally {
        setIsLoading(false);
      }
    }

    if (currentTool && allTools.length > 0) {
      fetchRelatedTools();
    } else {
      setIsLoading(false); 
    }
  }, [currentTool, allTools]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader className='px-6 py-4 border-b border-gray-200 dark:border-gray-800'>
          <CardTitle className="flex items-center gap-3 text-lg mt-0">
            <Shapes className="h-5 w-5 text-primary" />
            <span>Related Tools</span>
          </CardTitle>
        </CardHeader>

        <CardContent className='px-0 pb-0'>
          <div>
           <div className="animate-pulse bg-muted/30 border-gray-200 dark:border-gray-700 py-4 border-b">
            <div className="flex items-center gap-2 px-6">
              <span className="text-left min-h-6 bg-muted/50 rounded w-32 h-4"></span>
            </div>
          </div>

          <div className="animate-pulse bg-muted/30 py-4">
            <div className="flex items-center gap-2 px-6">
              <span className="text-left min-h-6 bg-muted/50 rounded w-32 h-4"></span>
            </div>
          </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
     return (
      <Card>
        <CardHeader className='px-6 py-4 border-b border-gray-200 dark:border-gray-800'>
          <CardTitle className="flex items-center gap-3 text-lg mt-0">
            <Shapes className="h-5 w-5 text-primary" />
            <span>Related Tools</span>
          </CardTitle>
        </CardHeader>

        <CardContent className='px-0 pb-0'>
          <div className='text-muted-foreground px-6 py-4'>
              {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (relatedTools.length === 0) {
    return (
       <Card>
        <CardHeader className='px-6 py-4 border-b border-gray-200 dark:border-gray-800'>
          <CardTitle className="flex items-center gap-3 text-lg mt-0">
            <Shapes className="h-5 w-5 text-primary" />
            <span>Related Tools</span>
          </CardTitle>
        </CardHeader>

        <CardContent className='px-0 pb-0'>
          <div className='text-muted-foreground px-6 py-4'>
            No Related Tools Found
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className='px-6 py-4 border-b border-gray-200 dark:border-gray-800'>
        <CardTitle className="flex items-center gap-3 text-lg mt-0">
          <Shapes className="h-5 w-5 text-primary" />
          <span>Related Tools</span>
        </CardTitle>
      </CardHeader>

      <CardContent className='px-0 pb-0'>
        <div>
          {relatedTools.map((tool, index) => {
            const IconComponent = tool.iconName ? Icons[tool.iconName as keyof typeof Icons] || Icons.Settings2 : Icons.Settings2;
            return (
            <div key={tool.id} className={cn('hover:bg-muted/30 border-muted-200 dark:border-gray-800 py-4', index < relatedTools.length - 1  && 'border-b')}>
              <Link href={tool.path} className="flex items-center gap-2 px-6">
                <IconComponent className="h-4 w-4 text-muted-foreground" />
                <span className="text-left">{tool.title}</span>
              </Link>
            </div>
          )})}
        </div>
      </CardContent>
    </Card>
  );
}
