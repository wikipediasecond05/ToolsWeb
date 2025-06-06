
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function CSSMinifierTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const minifyCSS = (css: string): string => {
    if (!css.trim()) return '';
    try {
      let minified = css;
      minified = minified.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
      minified = minified.replace(/[\n\t]/g, ' ');
      minified = minified.replace(/\s\s+/g, ' ');
      minified = minified.replace(/\s*([{};:,])\s*/g, '$1');
      minified = minified.replace(/;}/g, '}');
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
      setError('Please enter some CSS to minify.');
      return;
    }
    const minified = minifyCSS(inputText);
    setOutputText(minified);
    if (minified && !error) {
        // Successfully minified
    }
  };

  const handleClearText = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleCopyToClipboard = async () => {
    if (!outputText) {
      setError('There is no minified output to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      setError(null); 
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy text to clipboard.');
    }
  };

  return (
    <>
        {error && (
          <Alert variant={error.includes("Failed to copy") || error.includes("An error occurred") || error.includes("Please enter") || error.includes("There is no") ? "destructive" : "default"}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-2">
          <Textarea
            id="inputText-css-min"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (error && e.target.value.trim()) setError(null);
            }}
            placeholder="Paste your CSS code here..."
            rows={10}
            className="font-mono border-border focus-visible:ring-primary"
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
          <div className="grid gap-2 pt-6 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <Label htmlFor="outputText-css-min" className="font-semibold block">
                Minified CSS
              </Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" /> Copy Output
              </Button>
            </div>
            <Textarea
              id="outputText-css-min"
              value={outputText}
              readOnly
              placeholder="Minified CSS will appear here..."
              rows={10}
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
              aria-label="Minified CSS output"
            />
          </div>
        )}
    </>
  );
}
