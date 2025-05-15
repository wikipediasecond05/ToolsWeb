
'use client';

import React, { useEffect, useState } from 'react';
import { suggestRelatedTools } from '@/ai/flows/suggest-related-tools';
import type { RelatedToolData } from '@/types'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Wand2, Loader2 } from 'lucide-react';
import { Icons, type IconName } from '@/components/icons';

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
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wand2 className="h-5 w-5 text-primary" />
            Related Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-sm text-muted-foreground">Finding recommendations...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
     return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wand2 className="h-5 w-5" />
            Related Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (relatedTools.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Wand2 className="h-5 w-5 text-primary" />
                    Related Tools
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">No related tools found.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wand2 className="h-5 w-5 text-primary" />
          You Might Also Like
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {relatedTools.map(tool => {
            const IconComponent = tool.iconName ? Icons[tool.iconName as keyof typeof Icons] || Icons.Settings2 : Icons.Settings2;
            return (
            <li key={tool.id}>
              <Button variant="ghost" asChild className="w-full justify-start h-auto py-2 px-3 text-sm">
                <Link href={tool.path} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-left">{tool.title}</span>
                </Link>
              </Button>
            </li>
          )})}
        </ul>
      </CardContent>
    </Card>
  );
}
