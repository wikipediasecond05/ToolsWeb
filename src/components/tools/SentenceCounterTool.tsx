
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';

interface TextStats {
  sentences: number;
  syllables: number;
  words: number;
  characters: number;
  readingTime: string; 
  topKeywords: { keyword: string; count: number }[];
}

const StatDisplayCard = ({ title, value }: { title: string; value: string | number }) => (
  <Card className="text-center shadow-sm flex-1 min-w-[100px]">
    <CardHeader className="p-3 pb-1">
      <CardTitle className="text-2xl font-bold text-primary">{value}</CardTitle>
    </CardHeader>
    <CardContent className="p-3 pt-0">
      <p className="text-xs text-muted-foreground">{title}</p>
    </CardContent>
  </Card>
);

const stopWords = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'should', 'can', 'could', 'may', 'might', 'must',
  'and', 'but', 'or', 'nor', 'for', 'so', 'yet', 'as', 'at', 'by', 'from', 'in', 'into', 'of',
  'on', 'onto', 'to', 'up', 'with', 'it', 'this', 'that', 'these', 'those', 'i', 'you', 'he',
  'she', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our',
  'their', 'what', 'which', 'who', 'whom', 'whose', 'if', 'then', 'else', 'when', 'where',
  'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
  'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'just', 'don',
  'now', 'also', 'get', 'go', 'how', 'made', 'many', 'make', 'new', 'said', 'see', 'use', 'way',
  'well', 'went', 'were', 'what', 'when', 'which', 'who', 'why', 'will'
]);

const countSyllablesInWord = (word: string): number => {
  if (!word) return 0;
  word = word.toLowerCase();
  if (word.length <= 3) return 1; 
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); 
  word = word.replace(/^y/, ''); 
  const vowelMatches = word.match(/[aeiouy]{1,2}/g); 
  if (!vowelMatches) return 1; 

  let syllableCount = vowelMatches.length;

  if (word.endsWith('le') && word.length > 2 && !/[aeiouy]/.test(word.charAt(word.length - 3))) {
    syllableCount++;
  }
  
  return Math.max(1, syllableCount); 
};


export function SentenceCounterTool() {
  const [inputText, setInputText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    sentences: 0,
    syllables: 0,
    words: 0,
    characters: 0,
    readingTime: '0s',
    topKeywords: [],
  });

  useEffect(() => {
    const calculateAllStats = (text: string): TextStats => {
      if (!text.trim()) {
        return { sentences: 0, syllables: 0, words: 0, characters: 0, readingTime: '0s', topKeywords: [] };
      }

      const wordsArray = text.match(/\b[\w'-]+\b/g) || [];
      const wordCount = wordsArray.length;
      
      const characterCount = text.length;
      
      const sentenceArray = text.split(/[.!?]+(?=\s|$)/g).filter(s => s.trim().length > 0);
      const sentenceCount = sentenceArray.length || (text.trim() ? 1 : 0);

      const totalSyllables = wordsArray.reduce((acc, word) => acc + countSyllablesInWord(word), 0);

      const wpm = 200; 
      const readingTimeMinutes = wordCount / wpm;
      const readingTimeSeconds = Math.round(readingTimeMinutes * 60);
      const readingTimeStr = `${readingTimeSeconds}s`;

      const keywordMap: Record<string, number> = {};
      wordsArray.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/['".,!?;:]/g, '');
        if (cleanWord.length > 2 && !stopWords.has(cleanWord) && !/^\d+$/.test(cleanWord)) {
          keywordMap[cleanWord] = (keywordMap[cleanWord] || 0) + 1;
        }
      });
      const sortedKeywords = Object.entries(keywordMap)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 20) 
        .map(([keyword, count]) => ({ keyword, count }));

      return {
        sentences: sentenceCount,
        syllables: totalSyllables,
        words: wordCount,
        characters: characterCount,
        readingTime: readingTimeStr,
        topKeywords: sortedKeywords,
      };
    };

    setStats(calculateAllStats(inputText));
  }, [inputText]);

  const handleClearText = () => {
    setInputText('');
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Sentence Counter & Text Analyzer</CardTitle>
        <CardDescription className="text-lg">
          Get insights into your text including sentences, syllables, reading time, and top keywords.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <StatDisplayCard title="Sentences" value={stats.sentences} />
          <StatDisplayCard title="Syllables" value={stats.syllables} />
          <StatDisplayCard title="Words" value={stats.words} />
          <StatDisplayCard title="Characters" value={stats.characters} />
          <StatDisplayCard title="Reading Time" value={stats.readingTime} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="inputText-sentencecount" className="font-semibold mb-2 block">
            Paste your text here:
          </Label>
          <Textarea
            id="inputText-sentencecount"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text for analysis..."
            rows={12}
            className="border-border focus-visible:ring-primary"
            aria-label="Input text for sentence counting and analysis"
          />
        </div>
        
        {stats.topKeywords.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-semibold mb-3">Top Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {stats.topKeywords.map(({ keyword, count }) => (
                <Badge key={keyword} variant="secondary" className="py-1 px-3">
                  {keyword} <span className="ml-1.5 bg-muted-foreground/20 text-muted-foreground px-1.5 py-0.5 rounded-sm text-xs">{count}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex pt-4 border-t border-border">
          <Button variant="outline" onClick={handleClearText} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Text
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
