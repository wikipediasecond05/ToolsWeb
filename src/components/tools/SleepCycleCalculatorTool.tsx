
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Bed, Moon, Info, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CalculationResult {
  time: string; 
  cycles: number;
  duration: string; 
  isRecommended: boolean;
}

export function SleepCycleCalculatorTool() {
  const [calculationMode, setCalculationMode] = useState<'sleepAt' | 'wakeUpAt'>('sleepAt');
  const [bedTimeInput, setBedTimeInput] = useState<string>('22:30');
  const [wakeUpTimeInput, setWakeUpTimeInput] = useState<string>('07:00');
  const [fallAsleepDuration, setFallAsleepDuration] = useState<number>(15);
  
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hr ${minutes} min of sleep`;
  };

  const calculateWakeUpTimes = () => {
    setError(null);
    setResults([]);

    if (!bedTimeInput) {
      setError("Please enter the time you plan to go to bed.");
      return;
    }

    const [hoursStr, minutesStr] = bedTimeInput.split(':');
    if (!hoursStr || !minutesStr || isNaN(parseInt(hoursStr)) || isNaN(parseInt(minutesStr))) {
        setError("Invalid bed time format.");
        return;
    }
    const bedTimeDate = new Date();
    bedTimeDate.setHours(parseInt(hoursStr, 10), parseInt(minutesStr, 10), 0, 0);

    const sleepOnsetMs = bedTimeDate.getTime() + fallAsleepDuration * 60 * 1000;
    
    const calculatedWakeTimes: CalculationResult[] = [];
    const sleepCyclesToCalculate = [4, 5, 6]; 

    sleepCyclesToCalculate.forEach(cycles => {
      const totalSleepMinutes = cycles * 90;
      const wakeUpMs = sleepOnsetMs + totalSleepMinutes * 60 * 1000;
      const wakeUpDate = new Date(wakeUpMs);

      calculatedWakeTimes.push({
        time: formatTime(wakeUpDate),
        cycles: cycles,
        duration: formatDuration(totalSleepMinutes),
        isRecommended: cycles === 5 || cycles === 6,
      });
    });
    setResults(calculatedWakeTimes);
  };
  
  const calculateBedTimes = () => {
    setError(null);
    setResults([]);

    if (!wakeUpTimeInput) {
      setError("Please enter your desired wake-up time.");
      return;
    }

    const [wakeHoursStr, wakeMinutesStr] = wakeUpTimeInput.split(':');
     if (!wakeHoursStr || !wakeMinutesStr || isNaN(parseInt(wakeHoursStr)) || isNaN(parseInt(wakeMinutesStr))) {
        setError("Invalid wake-up time format.");
        return;
    }
    const wakeUpDate = new Date();
    wakeUpDate.setHours(parseInt(wakeHoursStr, 10), parseInt(wakeMinutesStr, 10), 0, 0);
    
    if (wakeUpDate.getTime() < new Date().setHours(0,0,0,0) + 6 * 3600 * 1000) { 
        wakeUpDate.setDate(wakeUpDate.getDate() + 1); 
    }


    const calculatedBedTimes: CalculationResult[] = [];
    const sleepCyclesToCalculate = [6, 5, 4]; 

    sleepCyclesToCalculate.forEach(cycles => {
      const totalSleepMinutes = cycles * 90;
      const fallAsleepTimeMs = wakeUpDate.getTime() - totalSleepMinutes * 60 * 1000;
      const bedTimeMs = fallAsleepTimeMs - fallAsleepDuration * 60 * 1000;
      const bedTime = new Date(bedTimeMs);

      calculatedBedTimes.push({
        time: formatTime(bedTime),
        cycles: cycles,
        duration: formatDuration(totalSleepMinutes),
        isRecommended: cycles === 5 || cycles === 6,
      });
    });
    setResults(calculatedBedTimes);
  }

  useEffect(() => {
    if (calculationMode === 'sleepAt') {
      if (bedTimeInput) calculateWakeUpTimes();
    } else if (calculationMode === 'wakeUpAt') {
      if (wakeUpTimeInput) calculateBedTimes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bedTimeInput, wakeUpTimeInput, fallAsleepDuration, calculationMode]);


  const SleepCycleStage = ({ label, duration, color, widthClass }: {label: string, duration: string, color: string, widthClass: string}) => (
    <div className={`flex flex-col items-center justify-center p-2 text-center ${widthClass} ${color} rounded`}>
        <Moon size={18} className="mb-1 opacity-80"/>
        <p className="text-xs font-medium">{label}</p>
        <p className="text-xs opacity-70">{duration}</p>
    </div>
  );

  const handleTabChange = (value: string) => {
    setCalculationMode(value as 'sleepAt' | 'wakeUpAt');
    setError(null); 
    setResults([]); 
  };

  return (
    <>
        <Tabs value={calculationMode} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sleepAt">I plan to sleep at...</TabsTrigger>
            <TabsTrigger value="wakeUpAt">I want to wake up at...</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sleepAt" className="mt-6 space-y-6">
            <div>
              <Label htmlFor="bedTimeInput" className="mb-4 block font-semibold">What time do you plan to go to bed?</Label>
              <Input
                id="bedTimeInput"
                type="time"
                value={bedTimeInput}
                onChange={(e) => setBedTimeInput(e.target.value)}
                className="w-full md:w-1/2"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                 <Label htmlFor="fallAsleepDurationSleepAt" className="font-semibold">Time it takes to fall asleep</Label>
                 <span className="text-sm text-muted-foreground flex items-center">
                    <Info size={14} className="mr-1"/> Average is 10-20 minutes
                 </span>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="fallAsleepDurationSleepAt"
                  min={0}
                  max={60}
                  step={5}
                  value={[fallAsleepDuration]}
                  onValueChange={(value) => setFallAsleepDuration(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={fallAsleepDuration}
                  onChange={(e) => setFallAsleepDuration(Math.max(0, Math.min(60, parseInt(e.target.value) || 0)))}
                  className="w-20 text-center"
                  min="0"
                  max="60"
                  aria-labelledby="fallAsleepDurationSleepAt"
                />
                <span className="text-muted-foreground">min</span>
              </div>
            </div>

            <Button onClick={calculateWakeUpTimes} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <Clock size={18} className="mr-2" /> Calculate Wake-up Times
            </Button>

            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

            {results.length > 0 && (
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Recommended Wake-up Times</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  <Info size={14} className="inline mr-1 align-text-bottom"/>
                  Aim for 5-6 sleep cycles for optimal rest.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.map((result, index) => (
                    <Card key={index} className={`shadow-md ${result.isRecommended ? 'border-primary ring-1 ring-primary' : ''}`}>
                      <CardHeader className="p-4">
                        {result.isRecommended && <Badge variant="secondary" className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs">Recommended</Badge>}
                        <CardTitle className="text-3xl font-bold text-primary">{result.time}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                        <p>{result.cycles} sleep cycles</p>
                        <p>{result.duration}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="wakeUpAt" className="mt-6 space-y-6">
             <div>
              <Label htmlFor="wakeUpTimeInput" className="mb-4 block font-semibold">What time do you want to wake up?</Label>
              <Input
                id="wakeUpTimeInput"
                type="time"
                value={wakeUpTimeInput}
                onChange={(e) => setWakeUpTimeInput(e.target.value)}
                className="w-full md:w-1/2"
              />
            </div>
             <div>
              <div className="flex items-center justify-between mb-4">
                 <Label htmlFor="fallAsleepDurationWakeUpAt" className="font-semibold">Time it takes to fall asleep</Label>
                 <span className="text-sm text-muted-foreground flex items-center">
                    <Info size={14} className="mr-1"/> Average is 10-20 minutes
                 </span>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="fallAsleepDurationWakeUpAt"
                  min={0}
                  max={60}
                  step={5}
                  value={[fallAsleepDuration]}
                  onValueChange={(value) => setFallAsleepDuration(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={fallAsleepDuration}
                  onChange={(e) => setFallAsleepDuration(Math.max(0, Math.min(60, parseInt(e.target.value) || 0)))}
                  className="w-20 text-center"
                  min="0"
                  max="60"
                  aria-labelledby="fallAsleepDurationWakeUpAt"
                />
                <span className="text-muted-foreground">min</span>
              </div>
            </div>
            <Button onClick={calculateBedTimes} className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <Bed size={18} className="mr-2" /> Calculate Bedtimes
            </Button>
            
            {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4" /><AlertDescription>{error}</AlertDescription></Alert>}

            {results.length > 0 && (
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Recommended Bedtimes</h3>
                 <p className="text-sm text-muted-foreground mb-3">
                  <Info size={14} className="inline mr-1 align-text-bottom"/>
                  To wake up at {formatTime(new Date(`1970-01-01T${wakeUpTimeInput}`))} feeling refreshed.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.map((result, index) => (
                    <Card key={index} className={`shadow-md ${result.isRecommended ? 'border-primary ring-1 ring-primary' : ''}`}>
                      <CardHeader className="p-4">
                        {result.isRecommended && <Badge variant="secondary" className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs">Recommended</Badge>}
                        <CardTitle className="text-3xl font-bold text-primary">{result.time}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                        <p>{result.cycles} sleep cycles</p>
                        <p>{result.duration}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <section className="pt-6 border-t">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Info size={20} className="mr-2 text-primary" /> Understanding Sleep Cycles
          </h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base">
              Sleep cycles are made up of different stages that repeat several times during the night. Each complete cycle lasts
              around 90 minutes. For adults, it's recommended to get 5 to 6 full sleep cycles per night — that's around 7.5 to 9
              hours of sleep. Children and teenagers usually need even more sleep cycles to support their growth and
              development.
            </p>
            <div className="my-6">
                <h4 className="font-semibold text-foreground mb-4 text-center text-base">Typical 90-minute Sleep Cycle Breakdown:</h4>
                <div className="flex flex-col sm:flex-row gap-1 p-2 rounded-lg bg-muted/30 border">
                    <SleepCycleStage label="Light Sleep" duration="5-10 min" color="bg-blue-200 dark:bg-blue-800/50" widthClass="sm:w-1/6" />
                    <SleepCycleStage label="Light Sleep" duration="10-25 min" color="bg-blue-300 dark:bg-blue-700/50" widthClass="sm:w-1/4" />
                    <SleepCycleStage label="Deep Sleep" duration="20-40 min" color="bg-indigo-400 dark:bg-indigo-600/60" widthClass="sm:w-1/3" />
                    <SleepCycleStage label="REM Sleep" duration="10-60 min" color="bg-purple-400 dark:bg-purple-600/60" widthClass="sm:w-1/4" />
                </div>
                 <p className="text-xs text-center mt-2 text-muted-foreground">
                    (Times are approximate and can vary)
                </p>
            </div>
            <p className="text-base">
              For optimal rest, it's best to wake up at the end of a full sleep cycle—rather than in the middle of deep or REM
              sleep. This calculator helps you time your sleep so you align with your natural cycles and wake up feeling
              refreshed, not groggy.
            </p>
          </div>
        </section>
    </>
  );
}
