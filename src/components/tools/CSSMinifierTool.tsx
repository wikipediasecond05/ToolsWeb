
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import DynamicMonacoEditor from './editors/DynamicMonacoEditor';

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
          <Label htmlFor="inputText-css-min" className="font-semibold mb-2 block">
            Input CSS
          </Label>
          <div className="border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent">
            <DynamicMonacoEditor
              language="css"
              value={inputText}
              onChange={(value) => {
                setInputText(value || '');
                if (error && (value || '').trim()) setError(null);
              }}
              aria-label="Input CSS for minification"
            />
          </div>
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
              <Label htmlFor="outputText-css-min" className="font-semibold block">
                Minified CSS
              </Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="mr-2 h-4 w-4" /> Copy Output
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <DynamicMonacoEditor
                language="css"
                value={outputText}
                options={{ readOnly: true }}
                aria-label="Minified CSS output"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
