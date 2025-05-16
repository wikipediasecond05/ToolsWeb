
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Copy, Trash2 } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast';

interface BorderRadiusValues {
  all: number;
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

const initialRadii: BorderRadiusValues = {
  all: 10,
  topLeft: 10,
  topRight: 10,
  bottomRight: 10,
  bottomLeft: 10,
};

export function CSSBorderRadiusGeneratorTool() {
  const [radii, setRadii] = useState<BorderRadiusValues>(initialRadii);
  const [unit, setUnit] = useState<'px' | '%'>('px');
  const [generatedCSS, setGeneratedCSS] = useState<string>('');
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});

  const { toast } = useToast();

  const generateCSS = useCallback(() => {
    const { topLeft, topRight, bottomRight, bottomLeft } = radii;
    const cssValue = `${topLeft}${unit} ${topRight}${unit} ${bottomRight}${unit} ${bottomLeft}${unit}`;
    const cssRule = `border-radius: ${cssValue};`;
    setGeneratedCSS(cssRule);
    setPreviewStyle({ 
      borderRadius: cssValue
    });
  }, [radii, unit]);

  useEffect(() => {
    generateCSS();
  }, [generateCSS]);

  const handleRadiusChange = (corner: keyof BorderRadiusValues, value: number) => {
    const newRadii = { ...radii, [corner]: value };
    if (corner === 'all') {
      newRadii.topLeft = value;
      newRadii.topRight = value;
      newRadii.bottomRight = value;
      newRadii.bottomLeft = value;
    }
    setRadii(newRadii);
  };

  const handleCopyToClipboard = () => {
    if (!generatedCSS) {
      toast({ title: "Nothing to copy", description: "Generate a border radius first.", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(generatedCSS);
    toast({ title: "Copied!", description: "CSS Border Radius copied to clipboard." });
  };
  
  const handleClear = () => {
    setRadii(initialRadii);
    setUnit('px');
  }

  const RadiusControl = ({ label, corner, value }: { label: string, corner: keyof BorderRadiusValues, value: number}) => (
    <div>
      <Label htmlFor={`radius-${corner}`} className="mb-4 block font-semibold">{label} ({value}{unit})</Label>
      <Slider
        id={`radius-${corner}`}
        min={0}
        max={unit === 'px' ? 150 : 50} 
        step={1}
        value={[value]}
        onValueChange={(val) => handleRadiusChange(corner, val[0])}
      />
    </div>
  );

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">CSS Border Radius Generator</CardTitle>
        <CardDescription className="text-lg">Interactively create rounded corners for your elements.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Label className="font-semibold mb-0 mr-2">Unit:</Label> 
            <Button variant={unit === 'px' ? 'default' : 'outline'} onClick={() => setUnit('px')} size="sm">px</Button>
            <Button variant={unit === '%' ? 'default' : 'outline'} onClick={() => setUnit('%')} size="sm">%</Button>
          </div>

          <RadiusControl label="All Corners" corner="all" value={radii.all} />
          <RadiusControl label="Top Left" corner="topLeft" value={radii.topLeft} />
          <RadiusControl label="Top Right" corner="topRight" value={radii.topRight} />
          <RadiusControl label="Bottom Right" corner="bottomRight" value={radii.bottomRight} />
          <RadiusControl label="Bottom Left" corner="bottomLeft" value={radii.bottomLeft} />
        </div>

        {/* Preview and Output Column */}
        <div className="space-y-6">
          <div>
            <Label className="mb-4 block font-semibold">Live Preview</Label>
            <div className="flex items-center justify-center w-full h-60 bg-muted p-4 rounded-md">
              <div 
                className="w-4/5 h-4/5 bg-primary flex items-center justify-center text-primary-foreground"
                style={previewStyle}
                data-ai-hint="rounded shape"
              >
                Preview
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <Label htmlFor="generatedCSS-radius" className="font-semibold">Generated CSS</Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} disabled={!generatedCSS}>
                <Copy className="mr-2 h-4 w-4" /> Copy CSS
              </Button>
            </div>
            <Textarea
              id="generatedCSS-radius"
              value={generatedCSS}
              readOnly
              rows={3}
              className="font-mono bg-muted/30 border-border focus-visible:ring-primary"
              placeholder="border-radius: ...;"
            />
          </div>
          <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Reset Values
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
