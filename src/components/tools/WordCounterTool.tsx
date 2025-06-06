
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface TextStats {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
}

export function WordCounterTool() {
  const [inputText, setInputText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    words: 0,
    charactersWithSpaces: 0,
    charactersWithoutSpaces: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const calculateStats = (text: string): TextStats => {
      if (!text.trim()) {
        return { words: 0, charactersWithSpaces: 0, charactersWithoutSpaces: 0, sentences: 0, paragraphs: 0 };
      }

      const words = text.match(/\b\w+\b/g)?.length || 0;
      const charactersWithSpaces = text.length;
      const charactersWithoutSpaces = text.replace(/\s/g, '').length;
      
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || (text.trim() ? 1 : 0);
      
      const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0);

      return { words, charactersWithSpaces, charactersWithoutSpaces, sentences, paragraphs };
    };

    setStats(calculateStats(inputText));
  }, [inputText]);

  const handleClearText = () => {
    setInputText('');
  };

  const StatDisplayCard = ({ title, value }: { title: string; value: number | string }) => (
    <Card className="text-center shadow">
      <CardHeader className="p-3 pb-1">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-2xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );

  return (
    <>
        <div className="grid gap-2">
          <Textarea
            id="inputText-wordcount"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste or type your text here..."
            rows={12}
            className="border-border focus-visible:ring-primary"
            aria-label="Input text for counting"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <StatDisplayCard title="Words" value={stats.words} />
          <StatDisplayCard title="Characters (incl. spaces)" value={stats.charactersWithSpaces} />
          <StatDisplayCard title="Characters (excl. spaces)" value={stats.charactersWithoutSpaces} />
          <StatDisplayCard title="Sentences" value={stats.sentences} />
          <StatDisplayCard title="Paragraphs" value={stats.paragraphs} />
        </div>

        <div className="flex pt-6 border-t border-border">
          <Button variant="outline" onClick={handleClearText} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Text
          </Button>
        </div>
    </>
  );
}
