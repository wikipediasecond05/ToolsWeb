
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Trash2, CaseSensitive } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type CaseType =
  | 'uppercase'
  | 'lowercase'
  | 'titlecase'
  | 'sentencecase'
  | 'camelcase'
  | 'pascalcase'
  | 'snakecase'
  | 'kebabcase';

export function TextCaseConverterTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const toTitleCase = (str: string): string => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const toSentenceCase = (str: string): string => {
    const sentences = str.toLowerCase().split(/([.?!])\s+/);
    return sentences.map((sentence, index) => {
      if (index % 2 === 1) return sentence + ' '; // Add back the punctuation and space
      if (sentence.trim().length > 0) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      return sentence;
    }).join('').trim();
  };
  
  const toCamelCase = (str: string): string => {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
  };

  const toPascalCase = (str: string): string => {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  };

  const toSnakeCase = (str: string): string => {
    return str.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  };

  const toKebabCase = (str: string): string => {
    return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };


  const handleConvert = (caseType: CaseType) => {
    setError(null);
    if (!inputText.trim()) {
      setError('Please enter some text to convert.');
      setOutputText('');
      return;
    }
    let result = '';
    switch (caseType) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'titlecase':
        result = toTitleCase(inputText);
        break;
      case 'sentencecase':
        result = toSentenceCase(inputText);
        break;
      case 'camelcase':
        result = toCamelCase(inputText);
        break;
      case 'pascalcase':
        result = toPascalCase(inputText);
        break;
      case 'snakecase':
        result = toSnakeCase(inputText);
        break;
      case 'kebabcase':
        result = toKebabCase(inputText);
        break;
      default:
        setError('Invalid case type selected.');
        return;
    }
    setOutputText(result);
  };

  const handleClearText = () => {
    setInputText('');
    setOutputText('');
    setError(null);
  };

  const handleCopyToClipboard = async () => {
    if (!outputText) {
      setError('There is no output text to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: 'Copied!',
        description: 'Converted text copied to clipboard.',
      });
      setError(null);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy text to clipboard.');
    }
  };

  const caseButtons: { label: string; caseType: CaseType }[] = [
    { label: 'UPPERCASE', caseType: 'uppercase' },
    { label: 'lowercase', caseType: 'lowercase' },
    { label: 'Title Case', caseType: 'titlecase' },
    { label: 'Sentence case', caseType: 'sentencecase' },
    { label: 'camelCase', caseType: 'camelcase' },
    { label: 'PascalCase', caseType: 'pascalcase' },
    { label: 'snake_case', caseType: 'snakecase' },
    { label: 'kebab-case', caseType: 'kebabcase' },
  ];

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Text Case Converter</CardTitle>
        <CardDescription>
          Convert your text to various standard case formats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="inputText-case" className="font-semibold mb-2 block">Input Text</Label>
            <Textarea
              id="inputText-case"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (error && e.target.value.trim()) setError(null);
              }}
              placeholder="Paste your text here..."
              rows={10}
              className="text-sm border-border focus-visible:ring-primary focus-visible:border-transparent"
              aria-label="Input text for case conversion"
            />
          </div>
          <div>
            <Label htmlFor="outputText-case" className="font-semibold mb-2 block">Output Text</Label>
            <Textarea
              id="outputText-case"
              value={outputText}
              readOnly
              placeholder="Converted text will appear here..."
              rows={10}
              className="text-sm bg-muted/30 border-border focus-visible:ring-primary focus-visible:border-transparent font-mono"
              aria-label="Converted text output"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="font-semibold mb-2 block">Choose Conversion Type:</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {caseButtons.map(({ label, caseType }) => (
              <Button
                key={caseType}
                variant="outline"
                onClick={() => handleConvert(caseType)}
                className="w-full justify-start text-left"
              >
                <CaseSensitive className="mr-2 h-4 w-4 opacity-70" />
                {label}
              </Button>
            ))}
          </div>
        </div>
        

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleCopyToClipboard} disabled={!outputText} className="w-full sm:w-auto">
            <Copy className="mr-2 h-4 w-4" /> Copy Output
          </Button>
          <Button variant="outline" onClick={handleClearText} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
