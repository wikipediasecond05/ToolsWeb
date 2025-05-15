
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Copy, GitCommit, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { suggestCommitMessage, type SuggestCommitMessageInput } from '@/ai/flows/commit-message-writer-flow';

type CommitType = 'feat' | 'fix' | 'chore' | 'docs' | 'style' | 'refactor' | 'perf' | 'test' | 'build' | 'ci' | 'revert';

const commitTypes: CommitType[] = ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'revert'];

export function AiCommitMessageWriterTool() {
  const [changeDescription, setChangeDescription] = useState('');
  const [commitType, setCommitType] = useState<CommitType>('feat');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!changeDescription.trim()) {
      setError('Please describe the changes or provide a code diff.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedMessage('');

    try {
      const input: SuggestCommitMessageInput = {
        changeDescription,
        commitType,
      };
      const result = await suggestCommitMessage(input);
      setGeneratedMessage(result.commitMessage);
    } catch (e: any) {
      console.error('Error generating commit message:', e);
      setError(e.message || 'Failed to generate commit message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!generatedMessage) {
      setError('No message to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedMessage);
      // Consider a small success toast/message if preferred
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy message to clipboard.');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">AI Commit Message Writer</CardTitle>
        <CardDescription>
          Describe your changes or paste a diff, and let AI suggest a conventional commit message.
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
          <Label htmlFor="changeDescription" className="font-semibold mb-2 block">
            Description of Changes / Code Diff
          </Label>
          <Textarea
            id="changeDescription"
            value={changeDescription}
            onChange={(e) => setChangeDescription(e.target.value)}
            placeholder="e.g., Added new user authentication feature using JWT..."
            rows={8}
            className="font-mono text-sm border-border focus-visible:ring-primary focus-visible:border-transparent"
          />
        </div>

        <div>
          <Label htmlFor="commitType" className="font-semibold mb-2 block">Commit Type</Label>
          <Select value={commitType} onValueChange={(value) => setCommitType(value as CommitType)}>
            <SelectTrigger id="commitType" className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {commitTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GitCommit className="mr-2 h-4 w-4" />
          )}
          Generate Message
        </Button>

        {generatedMessage && (
          <div className="space-y-2 pt-4 border-t border-border">
            <div className="flex justify-between items-center">
                <Label htmlFor="generatedMessage" className="font-semibold block">Suggested Commit Message</Label>
                <Button variant="ghost" size="sm" onClick={handleCopyToClipboard}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
            </div>
            <Textarea
              id="generatedMessage"
              value={generatedMessage}
              readOnly
              rows={5}
              className="font-mono text-sm bg-muted/30 border-border focus-visible:ring-primary focus-visible:border-transparent"
            />
          </div>
        )}
         <Alert variant="default" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              AI-generated content can sometimes be inaccurate or incomplete. Always review suggestions.
            </AlertDescription>
          </Alert>
      </CardContent>
    </Card>
  );
}
