
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Trash2, Binary, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export function Base64EncoderDecoderTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEncode = () => {
    setError(null);
    if (!inputText.trim()) {
      setError('Please enter some text to encode.');
      setOutputText('');
      return;
    }
    try {
      // For UTF-8 characters, a more robust approach is needed for btoa
      const utf8Bytes = new TextEncoder().encode(inputText);
      const base64Encoded = btoa(String.fromCharCode(...Array.from(utf8Bytes)));
      setOutputText(base64Encoded);
    } catch (e) {
      setError('Error during encoding. Ensure input is valid text.');
      setOutputText('');
      console.error(e);
    }
  };

  const handleDecode = () => {
    setError(null);
    if (!inputText.trim()) {
      setError('Please enter a Base64 string to decode.');
      setOutputText('');
      return;
    }
    try {
      const decodedBytes = Uint8Array.from(atob(inputText), c => c.charCodeAt(0));
      const plainText = new TextDecoder().decode(decodedBytes);
      setOutputText(plainText);
    } catch (e) {
      setError('Error during decoding. Ensure input is a valid Base64 string.');
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
    <>
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div>
          <Label htmlFor="inputText-base64" className="mb-4 block font-semibold">Input Text / Base64 String</Label>
          <Textarea
            id="inputText-base64"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text or Base64 string here..."
            rows={8}
            className="font-mono"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleEncode}><Binary className="mr-2" />Encode to Base64</Button>
          <Button onClick={handleDecode}><Binary className="mr-2" />Decode from Base64</Button>
        </div>
        <div>
          <Label htmlFor="outputText-base64" className="mb-4 block font-semibold">Output</Label>
          <Textarea
            id="outputText-base64"
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
      </div>
    </>
  );
}
