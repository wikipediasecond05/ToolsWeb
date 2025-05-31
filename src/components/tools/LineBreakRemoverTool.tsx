
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Copy, Eraser, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

type SeparatorMode = 'space' | 'none';

export function LineBreakRemoverTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [removeEmptyLines, setRemoveEmptyLines] = useState(false);
  const [trimSpaces, setTrimSpaces] = useState(false);
  const [separator, setSeparator] = useState<SeparatorMode>('space');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleProcessText = () => {
    setError(null);
    if (!inputText.trim() && !inputText) { 
      setOutputText(''); 
      return;
    }

    try {
      let lines = inputText.split(/\r\n|\n|\r/);

      if (trimSpaces) {
        lines = lines.map(line => line.trim());
      }

      if (removeEmptyLines) {
        lines = lines.filter(line => line.length > 0);
      }

      let result = '';
      if (separator === 'none') {
        result = lines.join('');
      } else { 
        result = lines.join(' ');
        result = result.replace(/\s\s+/g, ' ').trim();
      }
      
      setOutputText(result);
    } catch (e) {
      console.error("Error processing text:", e);
      setError("An unexpected error occurred while processing the text.");
      setOutputText('');
    }
  };

  const handleClearText = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleCopyToClipboard = async () => {
    if (!outputText) {
      setError('No output text to copy.');
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
    }
  };

  return (
    <>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-2">
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste your text here..."
            rows={10}
            className="border-border focus-visible:ring-primary"
            aria-label="Input text for line break removal"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="removeEmptyLines" 
              checked={removeEmptyLines}
              onCheckedChange={(checked) => setRemoveEmptyLines(checked as boolean)}
            />
            <Label htmlFor="removeEmptyLines" className="font-normal cursor-pointer mb-0">Remove Empty Lines</Label>
          </div>
          <div className="inline-flex items-center space-x-2">
            <Checkbox 
              id="trimSpaces"
              checked={trimSpaces}
              onCheckedChange={(checked) => setTrimSpaces(checked as boolean)}
            />
            <Label htmlFor="trimSpaces" className="font-normal cursor-pointer mb-0">Trim Leading/Trailing Spaces from Each Line</Label>
          </div>
          <div>
            <Label htmlFor="separator" className="font-semibold mb-4 mt-3 inline-block">Separator for Line Breaks</Label>
            <Select value={separator} onValueChange={(value: string) => setSeparator(value as SeparatorMode)}>
              <SelectTrigger id="separator" className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select separator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="space">Replace with Space</SelectItem>
                <SelectItem value="none">Remove Completely (None)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={handleProcessText} className="w-full sm:w-auto">
            <Eraser className="mr-2 h-4 w-4" /> Remove Line Breaks
          </Button>
          <Button variant="outline" onClick={handleClearText} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Text
          </Button>
        </div>

        {outputText && (
          <div className="grid gap-2 pt-6 border-t border-border">
            <div className="flex justify-between items-center">
              <Label htmlFor="outputText" className="font-semibold mb-4 block">Output Text</Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
            </div>
            <Textarea
              id="outputText"
              value={outputText}
              readOnly
              placeholder="Processed text will appear here..."
              rows={10}
              className="bg-muted/30 border-border"
              aria-label="Output text after line break removal"
            />
          </div>
        )}
    </>
  );
}
