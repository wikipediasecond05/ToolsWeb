
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Copy, Image as ImageIcon, Loader2 } from 'lucide-react'; // Renamed Image to ImageIcon
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateImageAltText, type GenerateImageAltTextInput } from '@/ai/flows/image-alt-text-generator-flow';

export function AiImageAltTextGeneratorTool() {
  const [imageDataUri, setImageDataUri] = useState('');
  const [generatedAltText, setGeneratedAltText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!imageDataUri.trim()) {
      setError('Please paste an image Data URI.');
      return;
    }
    if (!imageDataUri.startsWith('data:image/')) {
      setError('Invalid Data URI format. It should start with "data:image/...".');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedAltText('');
    setPreviewSrc(imageDataUri); // Show preview on submit

    try {
      const input: GenerateImageAltTextInput = { imageDataUri };
      const result = await generateImageAltText(input);
      setGeneratedAltText(result.altText);
    } catch (e: any) {
      console.error('Error generating alt text:', e);
      setError(e.message || 'Failed to generate alt text. Please try again.');
      setPreviewSrc(null); // Clear preview on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageDataUriChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newUri = e.target.value;
    setImageDataUri(newUri);
    if (newUri.startsWith('data:image/') && newUri.length > 50) { // Basic check for preview
      setPreviewSrc(newUri);
    } else {
      setPreviewSrc(null);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!generatedAltText) {
      setError('No alt text to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedAltText);
    } catch (err) {
      console.error('Failed to copy alt text: ', err);
      setError('Failed to copy alt text to clipboard.');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">AI Image Alt Text Generator</CardTitle>
        <CardDescription>
          Paste an image Data URI to generate descriptive alt text for accessibility and SEO.
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
          <Label htmlFor="imageDataUri" className="font-semibold mb-2 block">
            Image Data URI
          </Label>
          <Textarea
            id="imageDataUri"
            value={imageDataUri}
            onChange={handleImageDataUriChange}
            placeholder="Paste your Base64 encoded image Data URI here (e.g., data:image/png;base64,iVBORw0KGgo...)"
            rows={6}
            className="font-mono text-sm border-border focus-visible:ring-primary focus-visible:border-transparent"
          />
           <p className="text-xs text-muted-foreground mt-1">
            Tip: You can use an online "Image to Base64" converter to get the Data URI.
          </p>
        </div>
        
        {previewSrc && (
          <div className="mt-4 p-2 border rounded-md flex justify-center items-center bg-muted/30 max-h-60 overflow-hidden">
            <img 
              src={previewSrc} 
              alt="Pasted image preview" 
              className="max-w-full max-h-52 object-contain rounded" 
              data-ai-hint="user uploaded image"
            />
          </div>
        )}


        <Button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImageIcon className="mr-2 h-4 w-4" />
          )}
          Generate Alt Text
        </Button>

        {generatedAltText && (
          <div className="space-y-2 pt-4 border-t border-border">
             <div className="flex justify-between items-center">
                <Label htmlFor="generatedAltText" className="font-semibold block">Generated Alt Text</Label>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
            </div>
            <Textarea
              id="generatedAltText"
              value={generatedAltText}
              readOnly
              rows={3}
              className="text-sm bg-muted/30 border-border focus-visible:ring-primary focus-visible:border-transparent"
            />
          </div>
        )}
         <Alert variant="default" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              AI-generated alt text is a helpful start. Always review for accuracy and context.
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
