
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileLock2, Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export function JWTDecoderTool() {
  const [jwtInput, setJwtInput] = useState('');
  const [decodedHeader, setDecodedHeader] = useState('');
  const [decodedPayload, setDecodedPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const decodeBase64Url = (base64Url: string) => {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) {
      base64 += '='.repeat(4 - padding);
    }
    try {
        return decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    } catch (e) {
        // Fallback for non-UTF8 strings
        return atob(base64);
    }
  };

  const handleDecodeJWT = () => {
    setError(null);
    setDecodedHeader('');
    setDecodedPayload('');
    setSignature('');

    if (!jwtInput.trim()) {
      setError('Please enter a JWT to decode.');
      return;
    }

    const parts = jwtInput.split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT format. A JWT must have three parts separated by dots.');
      return;
    }

    try {
      const headerJsonString = decodeBase64Url(parts[0]);
      const headerObject = JSON.parse(headerJsonString);
      setDecodedHeader(JSON.stringify(headerObject, null, 2));
    } catch (e: any) {
      setError(`Error decoding JWT Header: ${e.message}. Ensure it's valid Base64Url encoded JSON.`);
      return;
    }

    try {
      const payloadJsonString = decodeBase64Url(parts[1]);
      const payloadObject = JSON.parse(payloadJsonString);
      setDecodedPayload(JSON.stringify(payloadObject, null, 2));
    } catch (e: any) {
      setError(`Error decoding JWT Payload: ${e.message}. Ensure it's valid Base64Url encoded JSON.`);
      return;
    }
    
    setSignature(parts[2]);

    toast({
      title: 'JWT Decoded',
      description: 'Header and Payload have been successfully decoded.',
    });
  };

  const handleClear = () => {
    setJwtInput('');
    setDecodedHeader('');
    setDecodedPayload('');
    setSignature('');
    setError(null);
  };

  return (
    <>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <Textarea
            id="jwtInput-decoder"
            value={jwtInput}
            onChange={(e) => setJwtInput(e.target.value)}
            placeholder="Paste your JWT here..."
            rows={6}
            className="font-mono border-border focus-visible:ring-primary"
            aria-label="Input JWT string"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={handleDecodeJWT} className="w-full sm:w-auto">
            <FileLock2 className="mr-2 h-4 w-4" /> Decode JWT
          </Button>
          <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        {(decodedHeader || decodedPayload || signature) && <Separator className="my-6" />}

        {decodedHeader && (
          <div>
            <Label htmlFor="decodedHeader" className="font-semibold mb-4 block">Decoded Header</Label>
            <Textarea
              id="decodedHeader"
              value={decodedHeader}
              readOnly
              rows={5}
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
              aria-label="Decoded JWT Header"
            />
          </div>
        )}

        {decodedPayload && (
          <div className="mt-6">
            <Label htmlFor="decodedPayload" className="font-semibold mb-4 block">Decoded Payload</Label>
            <Textarea
              id="decodedPayload"
              value={decodedPayload}
              readOnly
              rows={10}
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
              aria-label="Decoded JWT Payload"
            />
          </div>
        )}
        
        {signature && (
          <div className="mt-6">
            <Label htmlFor="signature" className="font-semibold mb-4 block">Signature (Not Validated)</Label>
            <Textarea
              id="signature"
              value={signature}
              readOnly
              rows={3}
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
              aria-label="JWT Signature"
            />
          </div>
        )}
         <Alert variant="default" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This tool decodes the JWT for inspection but does NOT validate the signature. 
              For security critical operations, always ensure signature validation is performed on your backend.
            </AlertDescription>
          </Alert>
    </>
  );
}
