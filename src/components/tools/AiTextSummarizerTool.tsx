
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Copy, Loader2, ScanLine } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { summarizeText, type SummarizeTextInput } from '@/ai/flows/text-summarizer-flow';

type SummaryLength = 'short' | 'medium' | 'long';

export function AiTextSummarizerTool() {
  const [textToSummarize, setTextToSummarize] = useState('');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!textToSummarize.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedSummary('');

    try {
      const input: SummarizeTextInput = {
        textToSummarize,
        summaryLength,
      };
      const result = await summarizeText(input);
      setGeneratedSummary(result.summary);
    } catch (e: any) {
      console.error('Error summarizing text:', e);
      setError(e.message || 'Failed to summarize text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!generatedSummary) {
      setError('No summary to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedSummary);
      // Consider a success message if preferred
    } catch (err)
 {
      console.error('Failed to copy summary: ', err);
      setError('Failed to copy summary to clipboard.');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">AI Text Summarizer</CardTitle>
        <CardDescription className="text-lg">
          Condense long articles or documents into key points with AI.
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
          <Label htmlFor="textToSummarize" className="font-semibold mb-4 block">
            Text to Summarize
          </Label>
          <Textarea
            id="textToSummarize"
            value={textToSummarize}
            onChange={(e) => setTextToSummarize(e.target.value)}
            placeholder="Paste your long text, article, or document here..."
            rows={12}
            className="border-border focus-visible:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="summaryLength" className="font-semibold mb-4 block">Desired Summary Length</Label>
          <Select value={summaryLength} onValueChange={(value) => setSummaryLength(value as SummaryLength)}>
            <SelectTrigger id="summaryLength" className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (1-2 sentences)</SelectItem>
              <SelectItem value="medium">Medium (3-5 sentences)</SelectItem>
              <SelectItem value="long">Long (Concise paragraph)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ScanLine className="mr-2 h-4 w-4" />
          )}
          Summarize Text
        </Button>

        {generatedSummary && (
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-4">
                <Label htmlFor="generatedSummary" className="font-semibold block">Generated Summary</Label>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
            </div>
            <Textarea
              id="generatedSummary"
              value={generatedSummary}
              readOnly
              rows={8}
              className="bg-muted/30 border-border focus-visible:ring-primary"
            />
          </div>
        )}
        <Alert variant="default" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
             AI summaries are best used as a starting point. Always verify critical information.
            </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
