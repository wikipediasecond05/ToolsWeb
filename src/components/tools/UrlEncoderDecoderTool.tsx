
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Trash2, Link, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export function UrlEncoderDecoderTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEncode = () => {
    setError(null);
    if (!inputText.trim()) {
      setError('Please enter text or URL to encode.');
      setOutputText('');
      return;
    }
    try {
      setOutputText(encodeURIComponent(inputText));
    } catch (e) {
      setError('Error during URL encoding.');
      setOutputText('');
      console.error(e);
    }
  };

  const handleDecode = () => {
    setError(null);
    if (!inputText.trim()) {
      setError('Please enter an encoded URL string to decode.');
      setOutputText('');
      return;
    }
    try {
      setOutputText(decodeURIComponent(inputText));
    } catch (e) {
      setError('Error during URL decoding. Ensure input is a valid percent-encoded string.');
      setOutputText('');
      console.error(e);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleCopy = async () => {
    if (!outputText) {
      setError('Nothing to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      toast({ title: 'Copied!', description: 'Output copied to clipboard.' });
      setError(null);
    } catch (e) {
      setError('Failed to copy to clipboard.');
      console.error(e);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">URL Encoder/Decoder</CardTitle>
        <CardDescription className="text-lg">
          Encode text for safe inclusion in URLs or decode percent-encoded URLs.
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
          <Label htmlFor="inputText-url" className="mb-2 block font-semibold">Input Text / Encoded URL</Label>
          <Textarea
            id="inputText-url"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text or encoded URL here..."
            rows={8}
            className="font-mono"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleEncode}><Link className="mr-2" />Encode URL</Button>
          <Button onClick={handleDecode}><Link className="mr-2" />Decode URL</Button>
        </div>
        <div>
          <Label htmlFor="outputText-url" className="mb-2 block font-semibold">Output</Label>
          <Textarea
            id="outputText-url"
            value={outputText}
            readOnly
            placeholder="Result will appear here..."
            rows={8}
            className="bg-muted/30 font-mono"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={handleCopy} disabled={!outputText}><Copy className="mr-2" />Copy Output</Button>
          <Button variant="outline" onClick={handleClear}><Trash2 className="mr-2" />Clear All</Button>
        </div>
         <Alert variant="default">
          <Link className="h-4 w-4" />
          <AlertDescription>
            Uses `encodeURIComponent()` for encoding and `decodeURIComponent()` for decoding.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
