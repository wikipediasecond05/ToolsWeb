
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertCircle, Copy, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface CronField {
  label: string;
  value: string;
  placeholder: string;
  name: 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek';
}

const initialCronValues = {
  minute: '*',
  hour: '*',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
};

export function CronjobExpressionGeneratorTool() {
  const [cronValues, setCronValues] = useState(initialCronValues);
  const [generatedExpression, setGeneratedExpression] = useState('');
  const [humanReadableExplanation, setHumanReadableExplanation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const cronFields: CronField[] = [
    { label: 'Minute', value: cronValues.minute, placeholder: '0-59', name: 'minute' },
    { label: 'Hour', value: cronValues.hour, placeholder: '0-23', name: 'hour' },
    { label: 'Day of Month', value: cronValues.dayOfMonth, placeholder: '1-31', name: 'dayOfMonth' },
    { label: 'Month', value: cronValues.month, placeholder: '1-12', name: 'month' },
    { label: 'Day of Week', value: cronValues.dayOfWeek, placeholder: '0-6 (Sun-Sat)', name: 'dayOfWeek' },
  ];

  const handleInputChange = (name: CronField['name'], value: string) => {
    setCronValues(prev => ({ ...prev, [name]: value }));
  };

  const generateExplanation = useCallback(() => {
    let parts: string[] = [];

    const explainPart = (value: string, unit: string, singularUnit: string, range: string, names?: string[]) => {
      if (value === '*') return `every ${singularUnit}`;
      if (value.startsWith('*/')) return `every ${value.substring(2)}${value.substring(2) === '1' ? '' : 'th'} ${singularUnit}`;
      if (value.includes(',')) return `at ${unit}s ${value}`;
      if (value.includes('-')) {
        const [start, end] = value.split('-');
        return `from ${unit} ${names ? names[parseInt(start)-1] : start} through ${names ? names[parseInt(end)-1] : end}`;
      }
      if (/^\d+$/.test(value)) return `at ${unit} ${names ? names[parseInt(value)- (names.length === 7 ? 0 : 1)] : value}`; // Adjust for 0-indexed DOW
      return `on specific ${unit}s (${value})`;
    };
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfWeekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    parts.push(explainPart(cronValues.minute, 'minute', 'minute', '0-59'));
    parts.push(`past ${explainPart(cronValues.hour, 'hour', 'hour', '0-23').replace(/^at hour /, '')}`);
    
    if (cronValues.dayOfMonth !== '*' || cronValues.dayOfWeek !== '*') {
        if (cronValues.dayOfMonth !== '*') {
            parts.push(`on day-of-month ${cronValues.dayOfMonth}`);
        }
        if (cronValues.dayOfWeek !== '*') {
            if (cronValues.dayOfMonth !== '*') parts.push('and');
            parts.push(explainPart(cronValues.dayOfWeek, 'day-of-week', 'day-of-week', '0-6', dayOfWeekNames).replace(/^at day-of-week /, 'on '));
        }
    }
     if (cronValues.month !== '*') {
        parts.push(`in ${explainPart(cronValues.month, 'month', 'month', '1-12', monthNames).replace(/^at month /, '')}`);
    }

    let fullExplanation = parts.join(' ');
    fullExplanation = fullExplanation.replace(/\s+/g, ' ').trim(); // Normalize spaces
    fullExplanation = fullExplanation.charAt(0).toUpperCase() + fullExplanation.slice(1) + '.';
    
    setHumanReadableExplanation(fullExplanation);

  }, [cronValues]);


  useEffect(() => {
    const expression = `${cronValues.minute} ${cronValues.hour} ${cronValues.dayOfMonth} ${cronValues.month} ${cronValues.dayOfWeek}`;
    setGeneratedExpression(expression);
    generateExplanation();
  }, [cronValues, generateExplanation]);

  const applyPreset = (preset: Partial<typeof initialCronValues>) => {
    setCronValues({ ...initialCronValues, ...preset });
    setError(null);
  };

  const commonSchedules = [
    { label: 'Every Minute', values: { minute: '*', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
    { label: 'Hourly (at minute 0)', values: { minute: '0', hour: '*', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
    { label: 'Daily (at midnight)', values: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '*' } },
    { label: 'Weekly (Sunday midnight)', values: { minute: '0', hour: '0', dayOfMonth: '*', month: '*', dayOfWeek: '0' } },
    { label: 'Monthly (1st, midnight)', values: { minute: '0', hour: '0', dayOfMonth: '1', month: '*', dayOfWeek: '*' } },
    { label: 'Yearly (Jan 1st, midnight)', values: { minute: '0', hour: '0', dayOfMonth: '1', month: '1', dayOfWeek: '*' } },
  ];

  const handleCopyToClipboard = async () => {
    if (!generatedExpression) {
      setError('No expression to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedExpression);
      toast({ title: 'Copied!', description: 'Cron expression copied to clipboard.' });
      setError(null);
    } catch (e) {
      setError('Failed to copy expression.');
      console.error(e);
    }
  };
  
  const handleClear = () => {
    setCronValues(initialCronValues);
    setError(null);
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Cronjob Expression Generator</CardTitle>
        <CardDescription className="text-lg">
          Create and understand cron expressions for scheduling tasks.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cronFields.map(field => (
            <div key={field.name}>
              <Label htmlFor={field.name} className="mb-4 block font-semibold">{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="font-mono"
              />
            </div>
          ))}
        </div>
        
        <div>
            <Label htmlFor="generatedExpression" className="mb-4 block font-semibold">Generated Cron Expression</Label>
            <div className="flex items-center gap-2">
                <Input
                    id="generatedExpression"
                    value={generatedExpression}
                    readOnly
                    className="font-mono text-lg bg-muted/30"
                />
                <Button variant="outline" size="icon" onClick={handleCopyToClipboard} disabled={!generatedExpression}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>

        {humanReadableExplanation && (
             <div className="space-y-2">
                <Label className="mb-4 block font-semibold">Explanation</Label>
                <Alert variant="default" className="text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{humanReadableExplanation}</AlertDescription>
                </Alert>
             </div>
        )}
        
        <div className="space-y-3 pt-6 border-t">
            <Label className="block font-semibold mb-4">Common Schedules</Label>
            <div className="flex flex-wrap gap-2">
                {commonSchedules.map(schedule => (
                    <Button key={schedule.label} variant="outline" size="sm" onClick={() => applyPreset(schedule.values)}>
                        {schedule.label}
                    </Button>
                ))}
            </div>
        </div>
         <Button variant="ghost" onClick={handleClear} className="mt-6 text-muted-foreground hover:text-destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Clear All Fields
        </Button>

        <Alert variant="default" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
                <strong>Cron Syntax:</strong> <br/><br/>Minute (0-59) <br/>Hour (0-23)<br/> Day of Month (1-31)<br/> Month (1-12)<br/> Day of Week (0-6, Sun-Sat).
                <br/><br/>Use <code>*</code> for any value <br/> <code>,</code> for lists <br/><code>-</code> for ranges<br/> <code>/</code> for steps.
            </AlertDescription>
        </Alert>

      </CardContent>
    </Card>
  );
}
