
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function JSONFormatterTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFormatValidate = () => {
    setError(null);
    setOutputText('');
    if (!inputText.trim()) {
      setError('Please enter some JSON to format.');
      return;
    }

    try {
      const parsedJson = JSON.parse(inputText);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setOutputText(formattedJson);
      toast({
        title: 'JSON Formatted & Validated',
        description: 'Your JSON is valid and has been formatted.',
      });
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      toast({
        title: 'Invalid JSON',
        description: e.message || 'Please check your JSON syntax.',
        variant: 'destructive',
      });
    }
  };

  const handleClearText = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleCopyToClipboard = async () => {
    if (!outputText) {
      toast({
        title: 'Nothing to copy',
        description: 'Format some JSON first to get an output.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: 'Copied!',
        description: 'Formatted JSON copied to clipboard.',
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        title: 'Copy Failed',
        description: 'Could not copy text to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">JSON Formatter & Validator</CardTitle>
        <CardDescription className="text-lg">
          Paste your JSON below to format it and check for validity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="inputText-json" className="font-semibold mb-4 block">Input JSON</Label>
            <Textarea
              id="inputText-json"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (error && e.target.value.trim()) setError(null);
              }}
              placeholder="Paste your raw JSON here..."
              rows={15}
              className="font-mono border-border focus-visible:ring-primary h-96"
              aria-label="Input JSON"
            />
          </div>
          <div>
            <Label htmlFor="outputText-json" className="font-semibold mb-4 block">Formatted JSON</Label>
            <Textarea
              id="outputText-json"
              value={outputText}
              readOnly
              placeholder="Formatted JSON will appear here..."
              rows={15}
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary h-96"
              aria-label="Formatted JSON Output"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 items-center">
          <Button onClick={handleFormatValidate} className="w-full sm:w-auto">
            <Sparkles className="mr-2 h-4 w-4" /> Format & Validate
          </Button>
          <Button variant="outline" onClick={handleCopyToClipboard} className="w-full sm:w-auto" disabled={!outputText}>
            <Copy className="mr-2 h-4 w-4" /> Copy Output
          </Button>
          <Button variant="outline" onClick={handleClearText} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
