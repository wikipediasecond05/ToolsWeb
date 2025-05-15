
'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type TempUnit = 'celsius' | 'fahrenheit' | 'kelvin';

export function TemperatureConverterTool() {
  const [celsius, setCelsius] = useState<string>('');
  const [fahrenheit, setFahrenheit] = useState<string>('');
  const [kelvin, setKelvin] = useState<string>('');
  const [lastChanged, setLastChanged] = useState<TempUnit | null>(null);
  const [error, setError] = useState<string | null>(null);

  const roundToTwoDecimals = (num: number): number => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  useEffect(() => {
    setError(null);
    if (lastChanged === null) return;

    const C = parseFloat(celsius);
    const F = parseFloat(fahrenheit);
    const K = parseFloat(kelvin);

    try {
      if (lastChanged === 'celsius') {
        if (isNaN(C)) { if (celsius !== '') setError('Invalid Celsius value'); return; }
        setFahrenheit(roundToTwoDecimals((C * 9/5) + 32).toString());
        setKelvin(roundToTwoDecimals(C + 273.15).toString());
      } else if (lastChanged === 'fahrenheit') {
        if (isNaN(F)) { if (fahrenheit !== '') setError('Invalid Fahrenheit value'); return; }
        setCelsius(roundToTwoDecimals((F - 32) * 5/9).toString());
        setKelvin(roundToTwoDecimals((F - 32) * 5/9 + 273.15).toString());
      } else if (lastChanged === 'kelvin') {
        if (isNaN(K)) { if (kelvin !== '') setError('Invalid Kelvin value'); return; }
        if (K < 0) { setError('Kelvin cannot be less than 0.'); return; }
        setCelsius(roundToTwoDecimals(K - 273.15).toString());
        setFahrenheit(roundToTwoDecimals((K - 273.15) * 9/5 + 32).toString());
      }
    } catch (e) {
      setError('Error during conversion. Please check input values.');
      console.error(e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celsius, fahrenheit, kelvin, lastChanged]);

  const handleInputChange = (value: string, unit: TempUnit) => {
    setLastChanged(unit);
    if (unit === 'celsius') setCelsius(value);
    else if (unit === 'fahrenheit') setFahrenheit(value);
    else if (unit === 'kelvin') setKelvin(value);

    if (value === '') { // Clear other fields if one is cleared
        if (unit !== 'celsius') setCelsius('');
        if (unit !== 'fahrenheit') setFahrenheit('');
        if (unit !== 'kelvin') setKelvin('');
        setError(null);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Temperature Converter</CardTitle>
        <CardDescription>
          Convert temperatures between Celsius (°C), Fahrenheit (°F), and Kelvin (K).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="celsius" className="mb-2 block font-semibold">Celsius (°C)</Label>
            <Input
              id="celsius"
              type="number"
              value={celsius}
              onChange={(e) => handleInputChange(e.target.value, 'celsius')}
              placeholder="e.g., 0"
            />
          </div>
          <div>
            <Label htmlFor="fahrenheit" className="mb-2 block font-semibold">Fahrenheit (°F)</Label>
            <Input
              id="fahrenheit"
              type="number"
              value={fahrenheit}
              onChange={(e) => handleInputChange(e.target.value, 'fahrenheit')}
              placeholder="e.g., 32"
            />
          </div>
          <div>
            <Label htmlFor="kelvin" className="mb-2 block font-semibold">Kelvin (K)</Label>
            <Input
              id="kelvin"
              type="number"
              value={kelvin}
              onChange={(e) => handleInputChange(e.target.value, 'kelvin')}
              placeholder="e.g., 273.15"
            />
          </div>
        </div>
        <Alert variant="default">
          <Thermometer className="h-4 w-4" />
          <AlertDescription>
            Enter a value in any field to see its conversion in the other units. Kelvin cannot be negative.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
