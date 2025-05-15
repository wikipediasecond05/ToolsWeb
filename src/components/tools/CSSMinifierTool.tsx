
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, Zap } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast'; // No longer using toast
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function CSSMinifierTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  // const { toast } = useToast(); // No longer using toast

  const minifyCSS = (css: string): string => {
    if (!css.trim()) return '';
    try {
      let minified = css;
      // Remove comments
      minified = minified.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
      // Remove newlines and tabs
      minified = minified.replace(/[\n\t]/g, ' ');
      // Remove multiple spaces
      minified = minified.replace(/\s\s+/g, ' ');
      // Remove spaces around selectors, properties, values, etc.
      minified = minified.replace(/\s*([{};:,])\s*/g, '$1');
      // Remove trailing semicolons in blocks
      minified = minified.replace(/;}/g, '}');
      // Remove leading/trailing whitespace
      minified = minified.trim();
      return minified;
    } catch (e) {
      console.error("Error minifying CSS:", e);
      setError("An error occurred during minification. Please check your CSS syntax.");
      return '';
    }
  };

  const handleMinify = () => {
    setError(null);
    if (!inputText.trim()) {
      setOutputText('');
      // toast({ // Removed toast
      //   title: 'Input Required',
      //   description: 'Please enter some CSS to minify.',
      //   variant: 'default',
      // });
      setError('Please enter some CSS to minify.'); // Set an error instead
      return;
    }
    const minified = minifyCSS(inputText);
    setOutputText(minified);
    if (minified && !error) {
        // toast({ // Removed toast
        //     title: "CSS Minified!",
        //     description: "Your CSS has been successfully minified.",
        // });
    }
  };

  const handleClearText = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleCopyToClipboard = async () => {
    if (!outputText) {
      // toast({ // Removed toast
      //   title: 'Nothing to Copy',
      //   description: 'There is no minified output to copy.',
      //   variant: 'default',
      // });
      setError('There is no minified output to copy.'); // Set an error instead
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      // toast({ // Removed toast
      //   title: 'Copied!',
      //   description: 'Minified CSS copied to clipboard.',
      // });
      setError(null); // Clear previous errors if copy is successful
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // toast({ // Removed toast
      //   title: 'Error',
      //   description: 'Failed to copy text to clipboard.',
      //   variant: 'destructive',
      // });
      setError('Failed to copy text to clipboard.'); // Set an error instead
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">CSS Minifier</CardTitle>
        <CardDescription>
          Paste your CSS code below to compress it for faster loading.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant={error.includes("Failed to copy") || error.includes("An error occurred") ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-2">
          <Label htmlFor="inputText" className="font-semibold mb-2 block">
            Input CSS
          </Label>
          <Textarea
            id="inputText"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (error && e.target.value.trim()) setError(null); // Clear "Input Required" error when user types
            }}
            placeholder="Paste your CSS code here..."
            rows={12}
            className="text-sm border-border focus-visible:ring-primary focus-visible:border-transparent"
            aria-label="Input CSS for minification"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={handleMinify} className="w-full sm:w-auto">
            <Zap className="mr-2 h-4 w-4" /> Minify CSS
          </Button>
          <Button variant="outline" onClick={handleClearText} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        {outputText && (
          <div className="grid gap-2 pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="outputText" className="font-semibold block">
                Minified CSS
              </Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" /> Copy Output
              </Button>
            </div>
            <Textarea
              id="outputText"
              value={outputText}
              readOnly
              placeholder="Minified CSS will appear here..."
              rows={12}
              className="text-sm bg-muted/30 border-border"
              aria-label="Minified CSS output"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
