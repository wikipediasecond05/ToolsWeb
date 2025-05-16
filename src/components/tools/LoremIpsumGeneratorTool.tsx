
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Trash2, BookText, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const loremIpsumSource = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";

type GenerationType = 'paragraphs' | 'sentences' | 'words';

export function LoremIpsumGeneratorTool() {
  const [generatedText, setGeneratedText] = useState('');
  const [quantity, setQuantity] = useState<number>(5);
  const [generationType, setGenerationType] = useState<GenerationType>('paragraphs');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateLoremIpsum = () => {
    setError(null);
    if (quantity <= 0) {
      setError('Please enter a quantity greater than 0.');
      setGeneratedText('');
      return;
    }

    let result = '';
    const wordsArray = loremIpsumSource.split(/\s+/);
    const sentencesArray = loremIpsumSource.split(/(?<=[.?!])\s+/);

    switch (generationType) {
      case 'words':
        for (let i = 0; i < quantity; i++) {
          result += wordsArray[i % wordsArray.length] + (i === quantity - 1 ? '' : ' ');
        }
        break;
      case 'sentences':
        for (let i = 0; i < quantity; i++) {
          result += sentencesArray[i % sentencesArray.length] + (i === quantity - 1 ? '' : ' ');
        }
        break;
      case 'paragraphs':
        for (let i = 0; i < quantity; i++) {
          // Generate a paragraph with a random number of sentences (e.g., 3-7)
          const numSentences = Math.floor(Math.random() * 5) + 3;
          let paragraph = '';
          for (let j = 0; j < numSentences; j++) {
            paragraph += sentencesArray[(i * numSentences + j) % sentencesArray.length] + ' ';
          }
          result += paragraph.trim() + (i === quantity - 1 ? '' : '\n\n');
        }
        break;
    }
    setGeneratedText(result.trim());
  };

  const handleClearText = () => {
    setGeneratedText('');
    setError(null);
  };

  const handleCopyToClipboard = async () => {
    if (!generatedText) {
      setError('Nothing to copy. Generate some text first.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        title: 'Copied!',
        description: 'Lorem Ipsum text copied to clipboard.',
      });
      setError(null);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy text to clipboard.');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Lorem Ipsum Generator</CardTitle>
        <CardDescription className="text-lg">
          Generate placeholder text for your projects.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="generationType" className="font-semibold mb-2 block">Type</Label>
            <Select value={generationType} onValueChange={(value) => setGenerationType(value as GenerationType)}>
              <SelectTrigger id="generationType" className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paragraphs">Paragraphs</SelectItem>
                <SelectItem value="sentences">Sentences</SelectItem>
                <SelectItem value="words">Words</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity" className="font-semibold mb-2 block">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              min="1"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={generateLoremIpsum} className="w-full sm:w-auto">
            <BookText className="mr-2 h-4 w-4" /> Generate
          </Button>
        </div>

        {generatedText && (
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="outputText-lorem" className="font-semibold block">Generated Text</Label>
               <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleClearText}>
                    <Trash2 className="mr-2 h-4 w-4" /> Clear
                </Button>
               </div>
            </div>
            <Textarea
              id="outputText-lorem"
              value={generatedText}
              readOnly
              rows={15}
              className="bg-muted/30 border-border focus-visible:ring-primary"
              aria-label="Generated Lorem Ipsum text"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
