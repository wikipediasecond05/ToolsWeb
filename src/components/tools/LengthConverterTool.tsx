
'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Ruler } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type LengthUnit = 'meters' | 'kilometers' | 'feet' | 'miles' | 'inches';

const conversionFactors: Record<LengthUnit, number> = { // All to meters
  meters: 1,
  kilometers: 1000,
  feet: 0.3048,
  miles: 1609.34,
  inches: 0.0254,
};

export function LengthConverterTool() {
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<LengthUnit>('meters');
  const [toUnit, setToUnit] = useState<LengthUnit>('feet');
  const [outputValue, setOutputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    if (inputValue.trim() === '') {
      setOutputValue('');
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setError('Invalid input value. Please enter a number.');
      setOutputValue('');
      return;
    }
    
    if (numValue < 0) {
        setError('Length cannot be negative.');
        setOutputValue('');
        return;
    }

    try {
      const valueInMeters = numValue * conversionFactors[fromUnit];
      const convertedValue = valueInMeters / conversionFactors[toUnit];
      
      // Smart rounding: more precision for smaller numbers, less for very large ones
      let precision = 4;
      if (Math.abs(convertedValue) > 1000) precision = 2;
      if (Math.abs(convertedValue) < 0.001 && convertedValue !== 0) precision = 6;

      setOutputValue(parseFloat(convertedValue.toFixed(precision)).toString());

    } catch (e) {
      setError('Error during conversion.');
      setOutputValue('');
      console.error(e);
    }
  }, [inputValue, fromUnit, toUnit]);

  const handleSwapUnits = () => {
    const tempFrom = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempFrom);
    // Optionally, set inputValue to outputValue if desired for a direct swap
    // setInputValue(outputValue); 
  };

  const unitOptions: { value: LengthUnit; label: string }[] = [
    { value: 'meters', label: 'Meters (m)' },
    { value: 'kilometers', label: 'Kilometers (km)' },
    { value: 'feet', label: 'Feet (ft)' },
    { value: 'miles', label: 'Miles (mi)' },
    { value: 'inches', label: 'Inches (in)' },
  ];

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Length Converter</CardTitle>
        <CardDescription>
          Convert lengths between various units (meters, kilometers, feet, miles, inches).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="fromUnit" className="mb-2 block font-semibold">From</Label>
            <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as LengthUnit)}>
              <SelectTrigger id="fromUnit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {unitOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-center mt-auto md:mt-6">
             <Ruler onClick={handleSwapUnits} className="h-6 w-6 text-primary cursor-pointer transform transition-transform hover:rotate-90" title="Swap units" />
          </div>

          <div>
            <Label htmlFor="toUnit" className="mb-2 block font-semibold">To</Label>
            <Select value={toUnit} onValueChange={(value) => setToUnit(value as LengthUnit)}>
              <SelectTrigger id="toUnit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                 {unitOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="inputValue" className="mb-2 block font-semibold">Value to Convert</Label>
            <Input
              id="inputValue"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g., 100"
            />
          </div>
          <div>
            <Label htmlFor="outputValue" className="mb-2 block font-semibold">Converted Value</Label>
            <Input
              id="outputValue"
              type="text"
              value={outputValue}
              readOnly
              className="bg-muted/30"
              placeholder="Result"
            />
          </div>
        </div>
         <Alert variant="default">
          <Ruler className="h-4 w-4" />
          <AlertDescription>
            Enter a value and select units to see the conversion. Click the ruler icon to swap units.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
