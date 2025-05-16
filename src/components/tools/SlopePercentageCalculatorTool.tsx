
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type AngleUnit = 'deg' | 'rad';
type InputMethod = 'riseRun' | 'angle' | 'none';

export function SlopePercentageCalculatorTool() {
  const [rise, setRise] = useState<string>('');
  const [run, setRun] = useState<string>('');
  const [angle, setAngle] = useState<string>('');
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('deg');
  
  const [slopePercentage, setSlopePercentage] = useState<number | null>(null);
  const [calculatedAngleDisplay, setCalculatedAngleDisplay] = useState<string>(''); 

  const [error, setError] = useState<string | null>(null);
  const [activeInputMethod, setActiveInputMethod] = useState<InputMethod>('none');

  const handleRiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRise(e.target.value);
    setActiveInputMethod('riseRun');
  };

  const handleRunChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRun(e.target.value);
    setActiveInputMethod('riseRun');
  };

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAngle(e.target.value);
    setActiveInputMethod('angle');
  };

  useEffect(() => {
    setError(null);
    setSlopePercentage(null);

    if (activeInputMethod === 'riseRun') {
      const numRise = parseFloat(rise);
      const numRun = parseFloat(run);

      if (isNaN(numRise) || isNaN(numRun)) {
        if (rise.trim() !== '' || run.trim() !== '') {
           if ((rise && isNaN(numRise)) || (run && isNaN(numRun))) setError("Rise and Run must be numbers.");
        }
        return;
      }

      if (numRun === 0) {
        setError('Run cannot be zero for slope calculation.');
        setSlopePercentage(Infinity); 
        setCalculatedAngleDisplay('90° / 1.5708 rad (Vertical)');
        return;
      }
      
      const slope = numRise / numRun;
      setSlopePercentage(slope * 100);
      
      const angleInRadians = Math.atan(slope);
      const angleInDegrees = angleInRadians * (180 / Math.PI);
      setCalculatedAngleDisplay(`${angleInDegrees.toFixed(2)}° / ${angleInRadians.toFixed(4)} rad`);
      
      if (angleUnit === 'deg') {
        setAngle(angleInDegrees.toFixed(2));
      } else {
        setAngle(angleInRadians.toFixed(4));
      }

    } else if (activeInputMethod === 'angle') {
      const numAngle = parseFloat(angle);
      if (isNaN(numAngle)) {
         if (angle.trim() !== '') setError("Angle must be a number.");
        return;
      }

      let angleInRadians = numAngle;
      if (angleUnit === 'deg') {
        angleInRadians = numAngle * (Math.PI / 180);
      }

      if (Math.abs(Math.cos(angleInRadians)) < 1e-9) { 
        setError('Slope is vertical (undefined/infinite) at +/-90 degrees.');
        setSlopePercentage(Infinity);
        setCalculatedAngleDisplay(`${numAngle}° / ${angleInRadians.toFixed(4)} rad (Vertical)`);
        return;
      }
      
      const slope = Math.tan(angleInRadians);
      setSlopePercentage(slope * 100);
      
      setCalculatedAngleDisplay(`${angleUnit === 'deg' ? numAngle.toFixed(2) : (numAngle * 180 / Math.PI).toFixed(2)}° / ${angleUnit === 'rad' ? numAngle.toFixed(4) : (numAngle * Math.PI / 180).toFixed(4)} rad`);

    }
  }, [rise, run, angle, angleUnit, activeInputMethod]);


  const formula = useMemo(() => {
    if (activeInputMethod === 'riseRun') return "Slope % = (Rise / Run) * 100";
    if (activeInputMethod === 'angle') {
      if (angleUnit === 'deg') return "Slope % = tan(Angle_degrees * π/180) * 100";
      return "Slope % = tan(Angle_radians) * 100";
    }
    return "Enter values to see the formula.";
  }, [activeInputMethod, angleUnit]);

  const TriangleDiagram = () => (
    <svg viewBox="0 0 200 150" className="w-full max-w-xs mx-auto mt-4 h-auto">
      <polygon points="10,130 190,130 10,10" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
      <text x="100" y="145" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10">Run (b)</text>
      <text x="5" y="70" writingMode="vertical-rl" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10">Rise (a)</text>
      <text x="80" y="60" transform="rotate(-35 100 60)" fill="hsl(var(--foreground))" fontSize="10">Slope</text>
      <line x1="10" y1="10" x2="10" y2="130" stroke="hsl(var(--primary))" strokeWidth="2" />
    </svg>
  );

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Slope Percentage Calculator</CardTitle>
        <CardDescription className="text-lg">
          Calculate slope from Rise/Run or Angle of Inclination.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-lg text-muted-foreground italic">a</span>
                <Label htmlFor="rise" className="font-semibold mb-4">Rise</Label>
              </div>
              <Input
                id="rise"
                type="number"
                value={rise}
                onChange={handleRiseChange}
                placeholder="e.g., 10"
                className="border-border focus-visible:ring-primary"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-lg text-muted-foreground italic">b</span>
                <Label htmlFor="run" className="font-semibold mb-4">Run</Label>
              </div>
              <Input
                id="run"
                type="number"
                value={run}
                onChange={handleRunChange}
                placeholder="e.g., 100"
                className="border-border focus-visible:ring-primary"
              />
            </div>
            <div className="text-center my-4">
              <span className="text-muted-foreground">Or</span>
            </div>
            <div>
              <Label htmlFor="angle" className="font-semibold mb-4 block">Angle of Inclination</Label>
              <div className="flex gap-2">
                <Input
                  id="angle"
                  type="number"
                  value={angle}
                  onChange={handleAngleChange}
                  placeholder="e.g., 5.71 (for deg)"
                  className="flex-grow border-border focus-visible:ring-primary"
                />
                <Button
                  variant={angleUnit === 'deg' ? "default" : "outline"}
                  onClick={() => { setAngleUnit('deg'); setActiveInputMethod('angle'); }}
                  className="px-3"
                >
                  deg
                </Button>
                 <Button
                  variant={angleUnit === 'rad' ? "default" : "outline"}
                  onClick={() => { setAngleUnit('rad'); setActiveInputMethod('angle'); }}
                  className="px-3"
                >
                  rad
                </Button>
              </div>
               {activeInputMethod === 'riseRun' && calculatedAngleDisplay && (
                <p className="text-xs text-muted-foreground mt-1">Calculated Angle: {calculatedAngleDisplay}</p>
              )}
            </div>
          </div>

          {/* Right Column: Outputs */}
          <div className="space-y-6">
            <Tabs defaultValue="solution" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="solution">Solution</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
              </TabsList>
              <TabsContent value="solution" className="mt-4 p-4 border rounded-md min-h-[200px] flex flex-col items-center justify-center bg-muted/30 space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Slope Percentage</p>
                  <p className="text-5xl font-bold text-primary">
                    {error && slopePercentage === Infinity ? 'Vertical' : slopePercentage !== null ? `${slopePercentage.toFixed(2)}%` : '0.00%'}
                  </p>
                </div>
                <TriangleDiagram />
              </TabsContent>
              <TabsContent value="steps" className="mt-4 p-4 border rounded-md min-h-[200px] space-y-3">
                 <h4 className="font-semibold mb-2">Formula Used:</h4>
                 <p className="text-sm font-mono bg-muted/50 p-2 rounded">{formula}</p>
                 {error && <p className="text-destructive mt-2 text-sm">{error}</p>}
                 {activeInputMethod === 'riseRun' && rise && run && parseFloat(run) !== 0 && !isNaN(parseFloat(rise)) && !isNaN(parseFloat(run)) && (
                    <div className="mt-4 space-y-1 text-sm">
                        <p>1. Calculate slope: <code className="bg-muted/50 p-1 rounded">{rise} / {run} = {(parseFloat(rise)/parseFloat(run)).toFixed(4)}</code></p>
                        <p>2. Slope Percentage: <code className="bg-muted/50 p-1 rounded">{(parseFloat(rise)/parseFloat(run)).toFixed(4)} * 100 = {slopePercentage?.toFixed(2)}%</code></p>
                    </div>
                 )}
                 {activeInputMethod === 'angle' && angle && !isNaN(parseFloat(angle)) && (
                    <div className="mt-4 space-y-1 text-sm">
                        <p>1. Angle: <code className="bg-muted/50 p-1 rounded">{angle} {angleUnit}</code></p>
                        {angleUnit === 'deg' && <p>2. Convert to Radians: <code className="bg-muted/50 p-1 rounded">{angle}° * π/180 = {(parseFloat(angle) * Math.PI / 180).toFixed(4)} rad</code></p>}
                        <p>{angleUnit === 'deg' ? '3.' : '2.'} Slope: <code className="bg-muted/50 p-1 rounded">tan({angleUnit === 'deg' ? (parseFloat(angle) * Math.PI / 180).toFixed(4) : parseFloat(angle).toFixed(4)}) = {Math.tan(angleUnit === 'deg' ? parseFloat(angle) * Math.PI / 180 : parseFloat(angle)).toFixed(4)}</code></p>
                        <p>{angleUnit === 'deg' ? '4.' : '3.'} Slope Percentage: <code className="bg-muted/50 p-1 rounded">{Math.tan(angleUnit === 'deg' ? parseFloat(angle) * Math.PI / 180 : parseFloat(angle)).toFixed(4)} * 100 = {slopePercentage?.toFixed(2)}%</code></p>
                    </div>
                 )}
              </TabsContent>
            </Tabs>
             {error && activeInputMethod !== 'none' && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
