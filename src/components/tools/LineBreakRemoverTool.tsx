
'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Sparkles, Copy } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';


type RemovalMode = 'remove' | 'replaceWithSpace';

export function LineBreakRemoverTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [mode, setMode] = useState<RemovalMode>('remove');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleProcessText = () => {
    setError(null);
    if (!inputText.trim()) {
      setError('Input text cannot be empty.');
      setOutputText('');
      return;
    }
    try {
      let result = '';
      if (mode === 'remove') {
        result = inputText.replace(/(\r\n|\n|\r)/gm, '');
      } else {
        // Replace one or more newlines with a single space, then normalize multiple spaces to one, then trim.
        result = inputText.replace(/(\r\n|\n|\r)+/gm, ' ').replace(/\s\s+/g, ' ').trim();
      }
      setOutputText(result);
    } catch (e) {
      console.error("Error processing text:", e);
      setError("An unexpected error occurred while processing the text.");
      setOutputText('');
    }
  };

  const handleCopyToClipboard = async () => {
    if (!outputText) {
      setError('No output text to copy.');
      toast({
        title: "Error",
        description: "No output text to copy.",
        variant: "destructive",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Output text copied to clipboard.",
      });
      setError(null); 
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy text to clipboard.');
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        {/* Title is already rendered by the page layout, so we can omit it here or make it more specific */}
        {/* <CardTitle className="text-2xl flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Line Break Remover
        </CardTitle> */}
        <CardDescription>
          Paste your text into the input area below. Choose whether to completely remove line breaks or replace them with a single space, then click "Process Text".
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
          <Label htmlFor="inputText" className="font-semibold">Input Text</Label>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here..."
            rows={8}
            className="text-sm border-border focus:ring-primary"
            aria-label="Input text for line break removal"
          />
        </div>

        <div className="space-y-3">
          <Label className="font-semibold">Processing Mode</Label>
          <RadioGroup value={mode} onValueChange={(value: string) => setMode(value as RemovalMode)} className="flex flex-col sm:flex-row gap-x-6 gap-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="remove" id="mode-remove" aria-label="Completely remove line breaks"/>
              <Label htmlFor="mode-remove" className="font-normal cursor-pointer">Completely remove line breaks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="replaceWithSpace" id="mode-replace" aria-label="Replace line breaks with a single space"/>
              <Label htmlFor="mode-replace" className="font-normal cursor-pointer">Replace line breaks with a single space</Label>
            </div>
          </RadioGroup>
        </div>

        <Button onClick={handleProcessText} className="w-full sm:w-auto">
          <Sparkles className="mr-2 h-4 w-4" /> Process Text
        </Button>

        {outputText && (
          <div className="grid gap-2 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <Label htmlFor="outputText" className="font-semibold">Output Text</Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
              </Button>
            </div>
            <Textarea
              id="outputText"
              value={outputText}
              readOnly
              placeholder="Processed text will appear here..."
              rows={8}
              className="text-sm bg-muted/30 border-border"
              aria-label="Output text after line break removal"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
