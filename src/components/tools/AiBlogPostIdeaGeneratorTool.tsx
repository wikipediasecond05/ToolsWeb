
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Lightbulb, Loader2, Copy } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateBlogPostIdeas, type GenerateBlogPostIdeasInput } from '@/ai/flows/blog-post-idea-generator-flow';

export function AiBlogPostIdeaGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or keyword.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedIdeas([]);

    try {
      const input: GenerateBlogPostIdeasInput = {
        topic,
        targetAudience: targetAudience.trim() || undefined,
      };
      const result = await generateBlogPostIdeas(input);
      setGeneratedIdeas(result.ideas);
    } catch (e: any) {
      console.error('Error generating blog post ideas:', e);
      setError(e.message || 'Failed to generate ideas. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (generatedIdeas.length === 0) {
      setError('No ideas to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedIdeas.join('\n\n'));
    } catch (err) {
      console.error('Failed to copy ideas: ', err);
      setError('Failed to copy ideas to clipboard.');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">AI Blog Post Idea Generator</CardTitle>
        <CardDescription className="text-lg">
          Spark your creativity with AI-powered blog post suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-2">
          <Label htmlFor="topic" className="font-semibold mb-2 block">
            Main Topic / Keyword
          </Label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Next.js, AI in Marketing, Sustainable Living"
            className="border-border focus-visible:ring-primary"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="targetAudience" className="font-semibold mb-2 block">
            Target Audience (Optional)
          </Label>
          <Input
            id="targetAudience"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="e.g., Beginners, Developers, Small Business Owners"
            className="border-border focus-visible:ring-primary"
          />
        </div>

        <Button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          Generate Ideas
        </Button>

        {generatedIdeas.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Suggested Blog Post Ideas:</h3>
                 <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy All
                </Button>
            </div>
            <ul className="list-disc list-inside space-y-2 pl-4 bg-muted/30 p-4 rounded-md">
              {generatedIdeas.map((idea, index) => (
                <li key={index} className="text-sm">{idea}</li>
              ))}
            </ul>
          </div>
        )}
        <Alert variant="default" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              AI suggestions are a starting point. Refine and add your unique perspective!
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
