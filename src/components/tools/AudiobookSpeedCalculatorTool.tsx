
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formatDuration = (totalSeconds: number): string => {
  if (isNaN(totalSeconds) || totalSeconds < 0) {
    return '0s';
  }
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  
  return parts.join(' ') || '0s';
};


export function AudiobookSpeedCalculatorTool() {
  const [originalHours, setOriginalHours] = useState<string>('');
  const [originalMinutes, setOriginalMinutes] = useState<string>('');
  const [originalSeconds, setOriginalSeconds] = useState<string>('');
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1');
  
  const [listeningTimeFormatted, setListeningTimeFormatted] = useState<string>('0s');
  const [timeSavedFormatted, setTimeSavedFormatted] = useState<string>('0s');
  const [error, setError] = useState<string | null>(null);

  const presetSpeeds = [0.5, 0.75, 1, 1.5, 2];

  useEffect(() => {
    setError(null);

    const h = parseInt(originalHours) || 0;
    const m = parseInt(originalMinutes) || 0;
    const s = parseInt(originalSeconds) || 0;
    const speed = parseFloat(playbackSpeed);

    if (h < 0 || m < 0 || s < 0) {
      setError('Duration values must be non-negative.');
      setListeningTimeFormatted('0s');
      setTimeSavedFormatted('0s');
      return;
    }

    if (isNaN(speed) || speed <= 0) {
      if (playbackSpeed.trim() !== '' && playbackSpeed !== '0') {
         setError('Playback speed must be a positive number.');
      }
      setListeningTimeFormatted(formatDuration(h * 3600 + m * 60 + s)); // Show original time
      setTimeSavedFormatted('0s');
      return;
    }
    
    const originalTotalSeconds = h * 3600 + m * 60 + s;
    if (originalTotalSeconds === 0 && (originalHours || originalMinutes || originalSeconds)) {
        setListeningTimeFormatted('0s');
        setTimeSavedFormatted('0s');
        return;
    }

    const newTotalSeconds = originalTotalSeconds / speed;
    const timeSavedSeconds = originalTotalSeconds - newTotalSeconds;

    setListeningTimeFormatted(formatDuration(newTotalSeconds));
    setTimeSavedFormatted(formatDuration(timeSavedSeconds));

  }, [originalHours, originalMinutes, originalSeconds, playbackSpeed]);

  const handlePresetSpeedClick = (speedValue: number) => {
    setPlaybackSpeed(speedValue.toString());
  };
  
  const formula = useMemo(() => {
    return "New Listening Time = Original Duration / Playback Speed\nTime Saved = Original Duration - New Listening Time";
  }, []);

  const calculationSteps = useMemo(() => {
    const h = parseInt(originalHours) || 0;
    const m = parseInt(originalMinutes) || 0;
    const s = parseInt(originalSeconds) || 0;
    const speed = parseFloat(playbackSpeed);

    if (isNaN(speed) || speed <= 0 || h < 0 || m < 0 || s < 0) {
      return "Enter valid duration and speed to see steps.";
    }
    
    const originalTotalSeconds = h * 3600 + m * 60 + s;
    const newTotalSeconds = originalTotalSeconds / speed;

    return [
      `1. Original Duration: ${h}h ${m}m ${s}s = ${originalTotalSeconds.toFixed(0)} seconds`,
      `2. Playback Speed: ${speed}x`,
      `3. New Listening Time (seconds): ${originalTotalSeconds.toFixed(0)}s / ${speed} = ${newTotalSeconds.toFixed(2)}s`,
      `4. Formatted Listening Time: ${formatDuration(newTotalSeconds)}`,
      `5. Time Saved: ${originalTotalSeconds.toFixed(0)}s - ${newTotalSeconds.toFixed(2)}s = ${(originalTotalSeconds - newTotalSeconds).toFixed(2)}s (${formatDuration(originalTotalSeconds - newTotalSeconds)})`
    ].join('\n');
  }, [originalHours, originalMinutes, originalSeconds, playbackSpeed]);


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Audiobook Speed Calculator</CardTitle>
        <CardDescription>
          Calculate new listening time and time saved for your audiobooks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-4">
            <div>
              <Label className="font-semibold mb-2 block">Original Audiobook Duration</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={originalHours}
                  onChange={(e) => setOriginalHours(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full border-border focus-visible:ring-primary focus-visible:border-transparent"
                  aria-label="Original hours"
                /> <span className="text-muted-foreground">hrs</span>
                <Input
                  type="number"
                  value={originalMinutes}
                  onChange={(e) => setOriginalMinutes(e.target.value)}
                  placeholder="0"
                  min="0"
                  max="59"
                  className="w-full border-border focus-visible:ring-primary focus-visible:border-transparent"
                  aria-label="Original minutes"
                /> <span className="text-muted-foreground">min</span>
                <Input
                  type="number"
                  value={originalSeconds}
                  onChange={(e) => setOriginalSeconds(e.target.value)}
                  placeholder="0"
                  min="0"
                  max="59"
                  className="w-full border-border focus-visible:ring-primary focus-visible:border-transparent"
                  aria-label="Original seconds"
                /> <span className="text-muted-foreground">sec</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="playbackSpeed" className="font-semibold mb-2 block">Listening Speed</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="playbackSpeed"
                  type="number"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(e.target.value)}
                  placeholder="1.0"
                  step="0.01"
                  min="0.1"
                  className="w-full border-border focus-visible:ring-primary focus-visible:border-transparent"
                />
                <span className="text-muted-foreground">x speed</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {presetSpeeds.map(speedValue => (
                  <Button
                    key={speedValue}
                    variant={playbackSpeed === speedValue.toString() ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePresetSpeedClick(speedValue)}
                    className="px-3"
                  >
                    {speedValue}x
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Outputs */}
          <div className="space-y-4">
            <Tabs defaultValue="solution" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="solution">Solution</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
              </TabsList>
              <TabsContent value="solution" className="mt-4 p-4 border rounded-md min-h-[180px] flex flex-col items-center justify-center bg-muted/30">
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary">{listeningTimeFormatted}</p>
                  <p className="text-sm text-muted-foreground mt-1">Listening Time</p>
                </div>
                <div className="text-center mt-4">
                  {parseFloat(timeSavedFormatted) === 0 && parseFloat(playbackSpeed) === 1 ? (
                     <p className="text-base text-foreground">Adjust speed to save time.</p>
                  ) : parseFloat(timeSavedFormatted) >= 0 ? (
                    <p className="text-base text-foreground">
                        You will save <span className="font-semibold text-accent">{timeSavedFormatted}</span>
                    </p>
                  ) : (
                     <p className="text-base text-foreground">
                        This will take an extra <span className="font-semibold text-destructive">{formatDuration(Math.abs(parseFloat(timeSavedFormatted)))}</span>
                    </p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="steps" className="mt-4 p-4 border rounded-md min-h-[180px]">
                 <h4 className="font-semibold mb-2">Formula Used:</h4>
                 <p className="text-sm font-mono bg-muted/50 p-2 rounded whitespace-pre-wrap">{formula}</p>
                 <h4 className="font-semibold mb-2 mt-3">Calculation:</h4>
                 <p className="text-sm font-mono bg-muted/50 p-2 rounded whitespace-pre-wrap">{calculationSteps}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
