
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

type SeparatorType = 'dash' | 'underscore';

const stopWords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it', 
  'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these', 
  'they', 'this', 'to', 'was', 'were', 'will', 'with', 'i', 'me', 'my', 'myself', 'we', 'our', 
  'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 
  'himself', 'she', 'her', 'hers', 'herself', 'its', 'itself', 'them', 'what', 'which', 'who', 
  'whom', 'am', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 
  'because', 'until', 'while', 'about', 'against', 'between', 'through', 'during', 'before', 
  'after', 'above', 'below', 'up', 'down', 'out', 'over', 'under', 'again', 'further', 'once', 
  'here', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 
  'some', 'nor', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'just', 
  'don', 'should', 'now'
]);

export function URLSlugGeneratorTool() {
  const [inputText, setInputText] = useState<string>('');
  const [separator, setSeparator] = useState<SeparatorType>('dash');
  const [isLowercase, setIsLowercase] = useState<boolean>(true);
  const [removeSpecialChars, setRemoveSpecialChars] = useState<boolean>(true);
  const [removeStopWords, setRemoveStopWords] = useState<boolean>(false);
  const [removeNumbers, setRemoveNumbers] = useState<boolean>(false);
  const [generatedSlug, setGeneratedSlug] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const generateSlug = () => {
      setError(null);
      if (!inputText.trim()) {
        setGeneratedSlug('');
        return;
      }

      let slug = inputText;

      if (isLowercase) {
        slug = slug.toLowerCase();
      }

      if (removeSpecialChars) {
        slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        slug = slug.replace(/[^a-z0-9\s-]/gi, ''); 
      }
      
      if (removeNumbers) {
        slug = slug.replace(/[0-9]/g, '');
      }

      if (removeStopWords) {
        const words = slug.split(/\s+/);
        slug = words.filter(word => !stopWords.has(word.toLowerCase())).join(' ');
      }

      const sepChar = separator === 'dash' ? '-' : '_';
      slug = slug.replace(/\s+/g, sepChar); 
      if (removeSpecialChars) { 
         slug = slug.replace(new RegExp(`[^a-z0-9${sepChar}]`, 'gi'), '');
      }
      slug = slug.replace(new RegExp(`${sepChar}+`, 'g'), sepChar); 

      slug = slug.replace(new RegExp(`^${sepChar}+|${sepChar}+$`, 'g'), '');

      setGeneratedSlug(slug);
    };

    generateSlug();
  }, [inputText, separator, isLowercase, removeSpecialChars, removeStopWords, removeNumbers]);

  const handleCopyToClipboard = async () => {
    if (!generatedSlug) {
      setError('No slug to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedSlug);
      toast({ title: 'Copied!', description: 'Slug copied to clipboard.' });
      setError(null);
    } catch (e) {
      setError('Failed to copy slug.');
      console.error(e);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">URL Slug Generator</CardTitle>
        <CardDescription className="text-lg">
          Create SEO-friendly URL slugs from text like article titles or blog post names.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor="inputTextSlug" className="mb-2 block font-semibold">
            Input Text (e.g., Article Title, Blog Post Title etc.)
          </Label>
          <Input
            id="inputTextSlug"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to convert to slug..."
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label className="mb-2 block font-semibold">Separator</Label>
            <RadioGroup
              value={separator}
              onValueChange={(value) => setSeparator(value as SeparatorType)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dash" id="sep-dash" />
                <Label htmlFor="sep-dash" className="font-normal mb-0">Dash (-)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="underscore" id="sep-underscore" />
                <Label htmlFor="sep-underscore" className="font-normal mb-0">Underscore (_)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isLowercase"
                checked={isLowercase}
                onCheckedChange={(checked) => setIsLowercase(checked as boolean)}
              />
              <Label htmlFor="isLowercase" className="font-normal cursor-pointer mb-0">
                Lowercase
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="removeSpecialChars"
                checked={removeSpecialChars}
                onCheckedChange={(checked) => setRemoveSpecialChars(checked as boolean)}
              />
              <Label htmlFor="removeSpecialChars" className="font-normal cursor-pointer mb-0">
                Remove Special Characters
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="removeStopWords"
                checked={removeStopWords}
                onCheckedChange={(checked) => setRemoveStopWords(checked as boolean)}
              />
              <Label htmlFor="removeStopWords" className="font-normal cursor-pointer mb-0">
                Remove Stop Words (English Only)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="removeNumbers"
                checked={removeNumbers}
                onCheckedChange={(checked) => setRemoveNumbers(checked as boolean)}
              />
              <Label htmlFor="removeNumbers" className="font-normal cursor-pointer mb-0">
                Remove Numbers
              </Label>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="generatedSlugOutput" className="mb-2 block font-semibold">
            Generated Slug
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="generatedSlugOutput"
              value={generatedSlug}
              readOnly
              placeholder="url-slug-will-appear-here"
              className="font-mono bg-muted/30"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyToClipboard}
              disabled={!generatedSlug}
              aria-label="Copy slug"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Alert variant="default">
            <LinkIcon className="h-4 w-4" />
            <AlertDescription>
                Slugs are generated in real-time as you type or change options. Dashes (-) are generally preferred for SEO.
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
