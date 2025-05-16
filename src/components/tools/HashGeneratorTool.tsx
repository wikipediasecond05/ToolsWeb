
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Trash2, HashIcon as Hash, Loader2 } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

async function generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function HashGeneratorTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateHash = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to hash.');
      setOutputText('');
      return;
    }
    setError(null);
    setIsLoading(true);
    setOutputText('');

    try {
      const hash = await generateHash(inputText, selectedAlgorithm);
      setOutputText(hash);
    } catch (e) {
      console.error('Error generating hash:', e);
      setError('Failed to generate hash. See browser console for details.');
      toast({
        title: 'Error',
        description: 'Failed to generate hash.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
        description: 'Generate a hash first.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: 'Hash Copied!',
        description: `${selectedAlgorithm} hash copied to clipboard.`,
      });
    } catch (err) {
      console.error('Failed to copy hash: ', err);
      toast({
        title: 'Copy Failed',
        description: 'Could not copy hash to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Hash Generator</CardTitle>
        <CardDescription className="text-lg">
          Generate cryptographic hashes from your text input.
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
          <Label htmlFor="inputText-hash" className="font-semibold mb-4 block">Input Text</Label>
          <Textarea
            id="inputText-hash"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to hash..."
            rows={6}
            className="font-mono border-border focus-visible:ring-primary"
            aria-label="Input text for hashing"
          />
        </div>

        <div>
          <Label htmlFor="algorithm-select" className="font-semibold mb-4 block">Select Algorithm</Label>
          <Select value={selectedAlgorithm} onValueChange={(value: string) => setSelectedAlgorithm(value as HashAlgorithm)}>
            <SelectTrigger id="algorithm-select" className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SHA-256">SHA-256</SelectItem>
              <SelectItem value="SHA-384">SHA-384</SelectItem>
              <SelectItem value="SHA-512">SHA-512</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={handleGenerateHash} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Hash className="mr-2 h-4 w-4" />
            )}
            Generate Hash
          </Button>
          <Button variant="outline" onClick={handleClearText} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        {(outputText || isLoading) && (
          <div className="grid gap-2 pt-6 border-t border-border">
            <div className="flex justify-between items-center">
              <Label htmlFor="outputText-hash" className="font-semibold mb-4 block">
                {selectedAlgorithm} Hash Output:
              </Label>
              {outputText && !isLoading && (
                 <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Output
                 </Button>
              )}
            </div>
            {isLoading ? (
                 <div className="flex items-center justify-center h-20">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 </div>
            ) : (
                <Input
                id="outputText-hash"
                value={outputText}
                readOnly
                placeholder="Generated hash will appear here..."
                className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
                aria-label="Generated hash output"
                />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
