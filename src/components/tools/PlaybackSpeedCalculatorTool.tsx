
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


export function PlaybackSpeedCalculatorTool() {
  const [originalHours, setOriginalHours] = useState<string>('');
  const [originalMinutes, setOriginalMinutes] = useState<string>('');
  const [originalSeconds, setOriginalSeconds] = useState<string>('');
  const [playbackSpeed, setPlaybackSpeed] = useState<string>('1');
  
  const [estimatedTimeFormatted, setEstimatedTimeFormatted] = useState<string>('0s');
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
      setEstimatedTimeFormatted('0s');
      setTimeSavedFormatted('0s');
      return;
    }

    if (isNaN(speed) || speed <= 0) {
      if (playbackSpeed.trim() !== '' && playbackSpeed !== '0') { 
         setError('Playback speed must be a positive number.');
      }
      setEstimatedTimeFormatted(formatDuration(h * 3600 + m * 60 + s)); 
      setTimeSavedFormatted('0s');
      return;
    }
    
    const originalTotalSeconds = h * 3600 + m * 60 + s;
    if (originalTotalSeconds === 0 && (originalHours || originalMinutes || originalSeconds)) { 
        setEstimatedTimeFormatted('0s');
        setTimeSavedFormatted('0s');
        return;
    }


    const newTotalSeconds = originalTotalSeconds / speed;
    const timeSavedSeconds = originalTotalSeconds - newTotalSeconds;

    setEstimatedTimeFormatted(formatDuration(newTotalSeconds));
    setTimeSavedFormatted(formatDuration(timeSavedSeconds));

  }, [originalHours, originalMinutes, originalSeconds, playbackSpeed]);

  const handlePresetSpeedClick = (speed: number) => {
    setPlaybackSpeed(speed.toString());
  };
  
  const formula = useMemo(() => {
    return "New Duration = Original Duration / Playback Speed\nTime Saved = Original Duration - New Duration";
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
      `3. New Total Seconds: ${originalTotalSeconds.toFixed(0)}s / ${speed} = ${newTotalSeconds.toFixed(2)}s`,
      `4. Estimated Time: ${formatDuration(newTotalSeconds)}`,
      `5. Time Saved: ${originalTotalSeconds.toFixed(0)}s - ${newTotalSeconds.toFixed(2)}s = ${(originalTotalSeconds - newTotalSeconds).toFixed(2)}s (${formatDuration(originalTotalSeconds - newTotalSeconds)})`
    ].join('\n');
  }, [originalHours, originalMinutes, originalSeconds, playbackSpeed]);


  return (
    <>
        {error && (
            <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            <div>
              <Label className="font-semibold mb-4 block">Original Duration</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={originalHours}
                  onChange={(e) => setOriginalHours(e.target.value)}
                  placeholder="0"
                  min="0"
                  className="w-full border-border focus-visible:ring-primary"
                  aria-label="Original hours"
                /> <span className="text-muted-foreground">hrs</span>
                <Input
                  type="number"
                  value={originalMinutes}
                  onChange={(e) => setOriginalMinutes(e.target.value)}
                  placeholder="0"
                  min="0"
                  max="59"
                  className="w-full border-border focus-visible:ring-primary"
                  aria-label="Original minutes"
                /> <span className="text-muted-foreground">min</span>
                <Input
                  type="number"
                  value={originalSeconds}
                  onChange={(e) => setOriginalSeconds(e.target.value)}
                  placeholder="0"
                  min="0"
                  max="59"
                  className="w-full border-border focus-visible:ring-primary"
                  aria-label="Original seconds"
                /> <span className="text-muted-foreground">sec</span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="playbackSpeed" className="font-semibold mb-4 block">Playback Speed</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="playbackSpeed"
                  type="number"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(e.target.value)}
                  placeholder="1.0"
                  step="0.01"
                  min="0.1"
                  className="w-full border-border focus-visible:ring-primary"
                />
                <span className="text-muted-foreground">x speed</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {presetSpeeds.map(speed => (
                  <Button
                    key={speed}
                    variant={playbackSpeed === speed.toString() ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePresetSpeedClick(speed)}
                    className="px-3"
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Outputs */}
          <div className="rounded-md bg-muted p-1 text-muted-foreground" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-primary">{estimatedTimeFormatted}</p>
              <p className="text-sm text-muted-foreground mt-1">Estimated Time</p>
            </div>
            <div className="text-center mt-4">
                <p className="text-base text-foreground">
                    You will save <span className="font-semibold text-accent">{timeSavedFormatted}</span>
                </p>
            </div>            
          </div>
        </div>
    </>
  );
}
