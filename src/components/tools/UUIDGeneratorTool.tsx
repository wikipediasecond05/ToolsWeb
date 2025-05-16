
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, RefreshCw, Fingerprint } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UUIDGeneratorTool() {
  const [generatedUUID, setGeneratedUUID] = useState('');
  const { toast } = useToast();

  const handleGenerateUUID = () => {
    try {
      const newUuid = crypto.randomUUID();
      setGeneratedUUID(newUuid);
    } catch (e) {
      console.error("Error generating UUID:", e);
      toast({
        title: "Error",
        description: "Failed to generate UUID. Your browser might not support crypto.randomUUID().",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    handleGenerateUUID();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleCopyToClipboard = async () => {
    if (!generatedUUID) {
      toast({
        title: 'Nothing to copy',
        description: 'Generate a UUID first.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedUUID);
      toast({
        title: 'Copied!',
        description: 'UUID copied to clipboard.',
      });
    } catch (err) {
      console.error('Failed to copy UUID: ', err);
      toast({
        title: 'Copy Failed',
        description: 'Could not copy UUID to clipboard.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">UUID Generator (Version 4)</CardTitle>
        <CardDescription className="text-lg">
          Generate universally unique identifiers (UUIDs) with a single click.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="generatedUUIDOutput" className="font-semibold mb-4 block">Generated UUID</Label>
          <div className="flex items-center gap-2">
            <Input
              id="generatedUUIDOutput"
              type="text"
              value={generatedUUID}
              readOnly
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
              aria-label="Generated UUID"
              placeholder="Click generate to get a UUID"
            />
            <Button variant="outline" size="icon" onClick={handleCopyToClipboard} aria-label="Copy UUID" disabled={!generatedUUID}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Button onClick={handleGenerateUUID} className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" /> Generate New UUID
        </Button>

        <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Fingerprint className="mr-2 h-4 w-4 text-primary" />
            <span>Generates Version 4 UUIDs using `crypto.randomUUID()`.</span>
        </div>
      </CardContent>
    </Card>
  );
}
