'use client';

import { useEffect, useState } from 'react';
import { suggestRelatedTools } from '@/ai/flows/suggest-related-tools';
import type { Tool } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Wand2, Loader2 } from 'lucide-react';
import { Icons } from '@/components/icons';

interface RelatedToolsProps {
  currentTool: Tool;
  allTools: Tool[];
}

export function RelatedTools({ currentTool, allTools }: RelatedToolsProps) {
  const [relatedTools, setRelatedTools] = useState<Tool[]>([]);
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
        
        // Filter out the current tool from suggestions and map names back to Tool objects
        const suggestedToolObjects = result.relatedTools
          .filter(name => name !== currentTool.title)
          .map(name => allTools.find(t => t.title === name))
          .filter(Boolean) as Tool[]; // Filter out undefined results
        
        setRelatedTools(suggestedToolObjects.slice(0, 3)); // Limit to 3 related tools
      } catch (err) {
        console.error('Error fetching related tools:', err);
        setError('Could not load suggestions at this time.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchRelatedTools();
  }, [currentTool, allTools]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            Related Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">Finding recommendations...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
     return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5" />
            Related Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (relatedTools.length === 0) {
    return null; // Don't show the section if no related tools are found or after error
  }

  return (
    <Card className="mt-8 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Wand2 className="h-5 w-5 text-primary" />
          You Might Also Like
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {relatedTools.map(tool => {
            const IconComponent = tool.icon ? Icons[tool.icon as keyof typeof Icons] || Icons.Settings2 : Icons.Settings2;
            return (
            <li key={tool.id}>
              <Button variant="ghost" asChild className="w-full justify-start h-auto py-2 px-3">
                <Link href={tool.path} className="flex items-center gap-3">
                  <IconComponent className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{tool.title}</span>
                </Link>
              </Button>
            </li>
          )})}
        </ul>
        {/* <!-- AdSense Placeholder: In Related Tools Section --> */}
      </CardContent>
    </Card>
  );
}
