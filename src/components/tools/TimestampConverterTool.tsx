
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, AlertCircle, Clock, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

type TimestampUnit = 'seconds' | 'milliseconds';

export function TimestampConverterTool() {
  const [unixTimestampInput, setUnixTimestampInput] = useState<string>('');
  const [humanDateInput, setHumanDateInput] = useState<string>('');
  
  const [convertedDate, setConvertedDate] = useState<string>('');
  const [convertedDateLocal, setConvertedDateLocal] = useState<string>('');
  const [convertedTimestamp, setConvertedTimestamp] = useState<string>('');
  
  const [timestampUnit, setTimestampUnit] = useState<TimestampUnit>('seconds');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const initialHumanDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    setHumanDateInput(initialHumanDate);
    
    const initialTimestampSeconds = Math.floor(now.getTime() / 1000).toString();
    setUnixTimestampInput(initialTimestampSeconds);
    
    // Initial conversions based on current time
    handleConvertToDate(initialTimestampSeconds, 'seconds');
    handleConvertToTimestamp(initialHumanDate);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleConvertToDate = (tsInput?: string, unit?: TimestampUnit) => {
    setError(null);
    setConvertedDate('');
    setConvertedDateLocal('');
    
    const currentTs = tsInput ?? unixTimestampInput;
    const currentUnit = unit ?? timestampUnit;

    if (!currentTs.trim()) {
      setError('Please enter a Unix timestamp.');
      return;
    }
    const tsNumber = parseInt(currentTs, 10);
    if (isNaN(tsNumber)) {
      setError('Invalid timestamp. Please enter numbers only.');
      return;
    }

    try {
      const date = new Date(currentUnit === 'milliseconds' ? tsNumber : tsNumber * 1000);
      if (isNaN(date.getTime())) {
        setError('Invalid timestamp value, results in an invalid date.');
        return;
      }
      
      setConvertedDate(date.toUTCString());
      setConvertedDateLocal(date.toLocaleString());
    } catch (e) {
      setError('Error converting timestamp to date.');
      console.error(e);
    }
  };

  const handleConvertToTimestamp = (dateInput?: string) => {
    setError(null);
    setConvertedTimestamp('');
    const currentHumanDate = dateInput ?? humanDateInput;

    if (!currentHumanDate.trim()) {
      setError('Please enter a date and time.');
      return;
    }

    try {
      const date = new Date(currentHumanDate);
      if (isNaN(date.getTime())) {
        setError('Invalid date format. Please use a recognizable date/time string or the picker.');
        return;
      }
      const tsInSeconds = Math.floor(date.getTime() / 1000);
      setConvertedTimestamp(tsInSeconds.toString());
    } catch (e) {
      setError('Error converting date to timestamp.');
      console.error(e);
    }
  };

  const handleCopyToClipboard = async (text: string, fieldName: string) => {
    if (!text) {
      setError(`No ${fieldName} to copy.`);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: `${fieldName} copied to clipboard.`,
      });
      setError(null);
    } catch (err) {
      setError(`Failed to copy ${fieldName}.`);
    }
  };

  return (
    <>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6 p-4 border rounded-md shadow-sm">
          <h3 className="text-lg font-semibold flex items-center"><Clock className="mr-2 h-5 w-5 text-primary"/> Unix Timestamp to Date</h3>
          <div>
            <Label htmlFor="unixTimestampInput" className="mb-4 block font-semibold">Unix Timestamp</Label>
            <Input
              id="unixTimestampInput"
              type="text" 
              pattern="[0-9]*"
              value={unixTimestampInput}
              onChange={(e) => setUnixTimestampInput(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="e.g., 1678886400"
            />
          </div>
          <div>
            <Label className="mb-4 block font-semibold">Timestamp Unit</Label>
            <RadioGroup defaultValue="seconds" value={timestampUnit} onValueChange={(value: string) => setTimestampUnit(value as TimestampUnit)} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="seconds" id="ts-seconds" />
                <Label htmlFor="ts-seconds" className="font-normal mb-0">Seconds</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="milliseconds" id="ts-milliseconds" />
                <Label htmlFor="ts-milliseconds" className="font-normal mb-0">Milliseconds</Label>
              </div>
            </RadioGroup>
          </div>
          <Button onClick={() => handleConvertToDate()} className="w-full sm:w-auto">Convert to Date</Button>
          {convertedDate && (
            <>
              <div className="mt-4">
                <Label htmlFor="convertedDateOutput" className="mb-4 block font-semibold">Converted Date (Local)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="convertedDateOutput"
                    value={convertedDateLocal}
                    readOnly
                    className="bg-muted/30"
                  />
                  <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(convertedDate, 'Date')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="convertedDateOutput" className="mb-4 block font-semibold">Converted Date (UTC)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="convertedDateOutput"
                    value={convertedDate}
                    readOnly
                    className="bg-muted/30"
                  />
                  <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(convertedDate, 'Date')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-6 p-4 border rounded-md shadow-sm">
          <h3 className="text-lg font-semibold flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-primary"/>Date to Unix Timestamp</h3>
          <div>
            <Label htmlFor="humanDateInput" className="mb-4 block font-semibold">Human-Readable Date & Time</Label>
            <Input
              id="humanDateInput"
              type="datetime-local"
              value={humanDateInput}
              onChange={(e) => setHumanDateInput(e.target.value)}
            />
          </div>
          <Button onClick={() => handleConvertToTimestamp()} className="w-full sm:w-auto">Convert to Timestamp (Seconds)</Button>
          {convertedTimestamp && (
            <div className="mt-4">
              <Label htmlFor="convertedTimestampOutput" className="mb-4 block font-semibold">Converted Unix Timestamp (Seconds)</Label>
               <div className="flex items-center gap-2">
                <Input
                  id="convertedTimestampOutput"
                  value={convertedTimestamp}
                  readOnly
                  className="bg-muted/30"
                />
                 <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(convertedTimestamp, 'Timestamp')}>
                    <Copy className="h-4 w-4" />
                 </Button>
               </div>
            </div>
          )}
        </div>
        <Alert variant="default" className="mt-6">
          <Clock className="h-4 w-4" />
          <AlertDescription>
            Dates are displayed in your local timezone. Unix timestamps are based on UTC.
          </AlertDescription>
        </Alert>
    </>
  );
}
