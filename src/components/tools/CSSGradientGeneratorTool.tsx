
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, Copy, Palette, PlusCircle, MinusCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';

interface ColorStop {
  id: string;
  color: string;
  position: number; // Percentage 0-100
}

type GradientType = 'linear' | 'radial';
type RadialShape = 'circle' | 'ellipse';

const initialColorStops: ColorStop[] = [
  { id: 'stop1', color: '#3b82f6', position: 0 },
  { id: 'stop2', color: '#10b981', position: 100 },
];

export function CSSGradientGeneratorTool() {
  const [gradientType, setGradientType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState<number>(90);
  const [radialShape, setRadialShape] = useState<RadialShape>('ellipse');
  const [radialPosition, setRadialPosition] = useState<string>('center center'); // e.g., center, top left
  const [colorStops, setColorStops] = useState<ColorStop[]>(initialColorStops);
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});

  const { toast } = useToast();

  const generateCSS = useCallback(() => {
    const stopsString = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ');

    let gradientValue = '';
    if (gradientType === 'linear') {
      gradientValue = `linear-gradient(${angle}deg, ${stopsString})`;
    } else { // radial
      gradientValue = `radial-gradient(${radialShape} at ${radialPosition}, ${stopsString})`;
    }
    const cssRule = `background-image: ${gradientValue};`;
    
    setGeneratedCSS(cssRule);
    setPreviewStyle({ backgroundImage: gradientValue });
  }, [gradientType, angle, radialShape, radialPosition, colorStops]);

  useEffect(() => {
    generateCSS();
  }, [generateCSS]);

  const handleAddColorStop = () => {
    const lastStop = colorStops[colorStops.length - 1];
    const newPosition = Math.min(100, (lastStop?.position || 0) + 10); // Default new position
    setColorStops([
      ...colorStops,
      { id: `stop${Date.now()}`, color: '#ffffff', position: newPosition },
    ]);
  };

  const handleRemoveColorStop = (id: string) => {
    if (colorStops.length <= 2) {
      toast({ title: "Error", description: "A gradient needs at least two color stops.", variant: "destructive" });
      return;
    }
    setColorStops(colorStops.filter(stop => stop.id !== id));
  };

  const handleColorStopChange = (id: string, field: 'color' | 'position', value: string | number) => {
    setColorStops(
      colorStops.map(stop =>
        stop.id === id
          ? {
              ...stop,
              [field]: field === 'position' ? Math.max(0, Math.min(100, Number(value))) : value,
            }
          : stop
      )
    );
  };

  const handleCopyToClipboard = () => {
    if (!generatedCSS) {
      toast({ title: "Nothing to copy", description: "Generate a gradient first.", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(generatedCSS);
    toast({ title: "Copied!", description: "CSS Gradient copied to clipboard." });
  };

  const handleClear = () => {
    setGradientType('linear');
    setAngle(90);
    setRadialShape('ellipse');
    setRadialPosition('center center');
    setColorStops(initialColorStops);
  }

  const radialPositionOptions = [
    'center center', 'center top', 'center bottom', 
    'left center', 'left top', 'left bottom',
    'right center', 'right top', 'right bottom'
  ];


  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">CSS Gradient Generator</CardTitle>
        <CardDescription>Visually create and customize CSS gradients. Adjust colors, type, and direction, then copy the code.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="gradientType" className="mb-2 block text-sm">Gradient Type</Label>
            <Select value={gradientType} onValueChange={(value) => setGradientType(value as GradientType)}>
              <SelectTrigger id="gradientType"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="radial">Radial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {gradientType === 'linear' && (
            <div>
              <Label htmlFor="angle" className="mb-2 block text-sm">Angle ({angle}°)</Label>
              <Slider id="angle" min={0} max={360} step={1} value={[angle]} onValueChange={(val) => setAngle(val[0])} />
            </div>
          )}

          {gradientType === 'radial' && (
            <>
              <div>
                <Label htmlFor="radialShape" className="mb-2 block text-sm">Radial Shape</Label>
                <Select value={radialShape} onValueChange={(value) => setRadialShape(value as RadialShape)}>
                  <SelectTrigger id="radialShape"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ellipse">Ellipse</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="radialPosition" className="mb-2 block text-sm">Position</Label>
                <Select value={radialPosition} onValueChange={setRadialPosition}>
                  <SelectTrigger id="radialPosition"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {radialPositionOptions.map(pos => <SelectItem key={pos} value={pos}>{pos}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-3">
            <Label className="block font-semibold text-sm">Color Stops</Label>
            {colorStops.map((stop, index) => (
              <div key={stop.id} className="flex items-center gap-2 p-2 border rounded-md">
                <Input
                  type="color"
                  value={stop.color}
                  onChange={(e) => handleColorStopChange(stop.id, 'color', e.target.value)}
                  className="w-12 h-10 p-1"
                  aria-label={`Color for stop ${index + 1}`}
                />
                <Input
                  type="text"
                  value={stop.color}
                  onChange={(e) => handleColorStopChange(stop.id, 'color', e.target.value)}
                  className="flex-1 text-sm"
                  placeholder="Hex Color"
                  aria-label={`Hex color for stop ${index + 1}`}
                />
                <Input
                  type="number"
                  value={stop.position}
                  onChange={(e) => handleColorStopChange(stop.id, 'position', e.target.value)}
                  min="0" max="100" step="1"
                  className="w-20 text-center text-sm"
                  aria-label={`Position for stop ${index + 1}`}
                />
                <span className="text-sm">%</span>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveColorStop(stop.id)} disabled={colorStops.length <= 2}>
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={handleAddColorStop} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Color Stop
            </Button>
          </div>
        </div>

        {/* Preview and Output Column */}
        <div className="space-y-6">
          <div>
            <Label className="mb-2 block font-semibold text-sm">Live Preview</Label>
            <div
              className="w-full h-60 rounded-md border bg-muted"
              style={previewStyle}
              aria-label="Gradient preview"
              data-ai-hint="colorful gradient"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="generatedCSS" className="font-semibold text-sm">Generated CSS</Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} disabled={!generatedCSS}>
                <Copy className="mr-2 h-4 w-4" /> Copy CSS
              </Button>
            </div>
            <Textarea
              id="generatedCSS"
              value={generatedCSS}
              readOnly
              rows={5}
              className="font-mono text-sm bg-muted/30 border-border focus-visible:ring-primary focus-visible:border-transparent"
              placeholder="CSS will appear here..."
            />
          </div>
           <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">
             <Trash2 className="mr-2 h-4 w-4" /> Clear All
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}
