
'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Copy, Image as ImageIcon, Loader2, Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateImageAltText, type GenerateImageAltTextInput } from '@/ai/flows/image-alt-text-generator-flow';
import { useToast } from '@/hooks/use-toast';

export function AiImageAltTextGeneratorTool() {
  const [imageDataUri, setImageDataUri] = useState('');
  const [generatedAltText, setGeneratedAltText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Invalid file type. Please upload an image (PNG, JPG, GIF, etc.).');
        setPreviewSrc(null);
        setImageDataUri('');
        setFileName(null);
        toast({
          title: 'Invalid File Type',
          description: 'Please upload an image file.',
          variant: 'destructive',
        });
        return;
      }
      // Limit file size (e.g., 5MB)
      if (file.size > 5 * 1024 * 1024) {
         setError('File is too large. Please upload an image smaller than 5MB.');
         setPreviewSrc(null);
         setImageDataUri('');
         setFileName(null);
         toast({
            title: 'File Too Large',
            description: 'Please upload an image smaller than 5MB.',
            variant: 'destructive',
         });
         return;
      }

      setError(null);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageDataUri(result);
        setPreviewSrc(result);
        setGeneratedAltText(''); // Clear previous alt text
      };
      reader.onerror = () => {
        setError('Failed to read the image file. Please try again.');
        setPreviewSrc(null);
        setImageDataUri('');
        setFileName(null);
        toast({
          title: 'Error Reading File',
          description: 'Could not read the selected image file.',
          variant: 'destructive',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!imageDataUri) {
      setError('Please upload an image first.');
      toast({
        title: 'No Image',
        description: 'Please upload an image before generating alt text.',
        variant: 'destructive',
      });
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedAltText('');

    try {
      const input: GenerateImageAltTextInput = { imageDataUri };
      const result = await generateImageAltText(input);
      setGeneratedAltText(result.altText);
    } catch (e: any) {
      console.error('Error generating alt text:', e);
      setError(e.message || 'Failed to generate alt text. Please try again.');
      toast({
        title: 'Generation Failed',
        description: e.message || 'An error occurred while generating alt text.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!generatedAltText) {
      setError('No alt text to copy.');
      toast({
        title: 'Nothing to Copy',
        description: 'Generate alt text first.',
        variant: 'destructive',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedAltText);
      toast({
        title: 'Copied!',
        description: 'Alt text copied to clipboard.',
      });
    } catch (err) {
      console.error('Failed to copy alt text: ', err);
      setError('Failed to copy alt text to clipboard.');
      toast({
        title: 'Copy Failed',
        description: 'Could not copy alt text.',
        variant: 'destructive',
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">AI Image Alt Text Generator</CardTitle>
        <CardDescription>
          Upload an image to generate descriptive alt text for accessibility and SEO.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-3">
          <Label htmlFor="imageUpload" className="font-semibold mb-1 block">
            Upload Image
          </Label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <Button variant="outline" onClick={triggerFileInput}>
            <Upload className="mr-2 h-4 w-4" /> Choose Image
          </Button>
          {fileName && <p className="text-sm text-muted-foreground">Selected file: {fileName}</p>}
        </div>
        
        {previewSrc && (
          <div className="mt-4 p-2 border rounded-md flex justify-center items-center bg-muted/30 max-h-60 overflow-hidden">
            <img 
              src={previewSrc} 
              alt="Uploaded image preview" 
              className="max-w-full max-h-52 object-contain rounded"
              data-ai-hint="user uploaded image"
            />
          </div>
        )}

        <Button onClick={handleSubmit} disabled={isLoading || !imageDataUri} className="w-full sm:w-auto">
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
            <textarea
              id="generatedAltText"
              value={generatedAltText}
              readOnly
              rows={3}
              className="w-full text-sm bg-muted/30 border-border rounded-md p-2 focus-visible:ring-primary focus-visible:border-transparent"
              aria-label="Generated alt text"
            />
          </div>
        )}
         <Alert variant="default" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              AI-generated alt text is a helpful start. Always review for accuracy and context. Max file size: 5MB.
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
