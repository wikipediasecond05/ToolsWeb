
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Copy, Trash2, Eye, Code } from 'lucide-react';
import { Icons } from '@/components/icons'; 
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

// Basic Markdown to HTML conversion function
const basicMarkdownToHtml = (md: string): string => {
  let html = md;

  // Headings (h1-h6)
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/gim, '<strong>$1</strong>');

  // Italic (*text* or _text_)
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  html = html.replace(/_(.*?)_/gim, '<em>$1</em>');
  
  // Strikethrough (~~text~~)
  html = html.replace(/~~(.*?)~~/gim, '<del>$1</del>');

  // Blockquotes (> text)
  html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Links ([text](url))
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images (![alt](url))
  html = html.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />');

  // Fenced code blocks (```lang\ncode\n``` or ```\ncode\n```)
  html = html.replace(/```(\w*)\n([\s\S]*?)\n```/gim, (match, lang, code) => {
    const languageClass = lang ? `language-${lang}` : '';
    const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre><code class="${languageClass}">${escapedCode.trim()}</code></pre>`;
  });

  // Inline code (`code`)
  html = html.replace(/`(.*?)`/gim, '<code>$1</code>');

  // Unordered lists (*, -, +) - basic implementation
  html = html.replace(/^\s*[\*\-\+] (.*)/gim, '<ul>\n<li>$1</li>\n</ul>');
  html = html.replace(/<\/ul>\n<ul>/gim, ''); // Merge adjacent lists

  // Ordered lists (1.) - basic implementation
  html = html.replace(/^\s*\d+\. (.*)/gim, '<ol>\n<li>$1</li>\n</ol>');
  html = html.replace(/<\/ol>\n<ol>/gim, ''); // Merge adjacent lists

  // Paragraphs (split by double newlines, then wrap single newlines in <p>)
  html = html.split(/\n\s*\n/).map(paragraph => {
    if (!paragraph.match(/<\/?(h[1-6]|ul|ol|li|blockquote|pre|code|a|img|strong|em|del)/i) && paragraph.trim() !== '') {
      return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
    }
    return paragraph;
  }).join('\n');
  
  html = html.replace(/\n{2,}/g, '\n');

  return html.trim();
};

export function MarkdownToHTMLTool() {
  const [markdownInput, setMarkdownInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (markdownInput) {
      handleConvert();
    } else {
      setHtmlOutput('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdownInput]);


  const handleConvert = () => {
    setError(null);
    try {
      const convertedHtml = basicMarkdownToHtml(markdownInput);
      setHtmlOutput(convertedHtml);
    } catch (e: any) {
      console.error('Error converting Markdown to HTML:', e);
      setError(`An error occurred during conversion: ${e.message || 'Unknown error'}`);
      setHtmlOutput('');
    }
  };

  const handleClear = () => {
    setMarkdownInput('');
    setHtmlOutput('');
    setError(null);
  };

  const handleCopyHtml = async () => {
    if (!htmlOutput) {
      setError('No HTML output to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(htmlOutput);
      setError(null); 
    } catch (err) {
      console.error('Failed to copy HTML output:', err);
      setError('Failed to copy HTML to clipboard.');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Markdown to HTML Converter</CardTitle>
        <CardDescription className="text-lg">
          Write Markdown on the left and see the HTML output and live preview.
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
            <Label htmlFor="markdownInput-md-html" className="font-semibold mb-4 block">
              <Icons.Text className="mr-2 h-5 w-5 inline-block align-middle" /> Markdown Input
            </Label>
            <Textarea
              id="markdownInput-md-html"
              value={markdownInput}
              onChange={(e) => setMarkdownInput(e.target.value)}
              placeholder="Type or paste your Markdown here..."
              rows={15}
              className="font-mono border-border focus-visible:ring-primary h-96"
              aria-label="Markdown input"
            />
          </div>
          <div>
            <Label htmlFor="htmlOutput-md-html" className="font-semibold mb-4 block">
               <Icons.Code className="mr-2 h-5 w-5 inline-block align-middle" /> HTML Output
            </Label>
            <Textarea
              id="htmlOutput-md-html"
              value={htmlOutput}
              readOnly
              placeholder="HTML output will appear here..."
              rows={15}
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary h-96"
              aria-label="HTML output"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 items-center">
          <Button variant="outline" onClick={handleCopyHtml} className="w-full sm:w-auto" disabled={!htmlOutput}>
            <Copy className="mr-2 h-4 w-4" /> Copy HTML
          </Button>
          <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
        
        <Separator className="my-6" />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Eye className="mr-2 h-5 w-5 text-primary align-middle" />
            Live Preview
          </h3>
          {htmlOutput ? (
            <div
              className="prose dark:prose-invert max-w-none p-4 border rounded-md bg-background min-h-[100px]"
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          ) : (
            <div className="p-4 border rounded-md bg-muted/30 text-muted-foreground min-h-[100px] flex items-center justify-center">
              <p>Preview will appear here once you start typing Markdown.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
