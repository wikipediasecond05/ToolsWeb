
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Copy, Trash2, BoxSelect as BoxShadowIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Helper to convert HEX and alpha to RGBA string
const hexToRgba = (hex: string, alpha: number): string => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function CSSBoxShadowGeneratorTool() {
  const [hOffset, setHOffset] = useState<number>(5);
  const [vOffset, setVOffset] = useState<number>(5);
  const [blurRadius, setBlurRadius] = useState<number>(10);
  const [spreadRadius, setSpreadRadius] = useState<number>(0);
  const [shadowColor, setShadowColor] = useState<string>('#000000');
  const [shadowOpacity, setShadowOpacity] = useState<number>(0.5); // 0 to 1
  const [isInset, setIsInset] = useState<boolean>(false);
  
  const [generatedCSS, setGeneratedCSS] = useState<string>('');
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({});

  const { toast } = useToast();

  const generateCSS = useCallback(() => {
    const colorWithOpacity = hexToRgba(shadowColor, shadowOpacity);
    const insetString = isInset ? 'inset ' : '';
    const boxShadowValue = `${insetString}${hOffset}px ${vOffset}px ${blurRadius}px ${spreadRadius}px ${colorWithOpacity}`;
    const cssRule = `box-shadow: ${boxShadowValue};`;
    
    setGeneratedCSS(cssRule);
    setPreviewStyle({ boxShadow: boxShadowValue });
  }, [hOffset, vOffset, blurRadius, spreadRadius, shadowColor, shadowOpacity, isInset]);

  useEffect(() => {
    generateCSS();
  }, [generateCSS]);

  const handleCopyToClipboard = () => {
    if (!generatedCSS) {
      toast({ title: "Nothing to copy", description: "Generate a box shadow first.", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(generatedCSS);
    toast({ title: "Copied!", description: "CSS Box Shadow copied to clipboard." });
  };

  const handleClear = () => {
    setHOffset(5);
    setVOffset(5);
    setBlurRadius(10);
    setSpreadRadius(0);
    setShadowColor('#000000');
    setShadowOpacity(0.5);
    setIsInset(false);
  };
  
  const SliderInput = ({ label, value, onChange, min, max, step = 1, unit = 'px'}: { label: string, value: number, onChange: (val: number) => void, min: number, max: number, step?: number, unit?: string}) => (
    <div>
      <Label className="mb-2 block text-sm">{label} ({value}{unit})</Label>
      <Slider min={min} max={max} step={step} value={[value]} onValueChange={(val) => onChange(val[0])} />
    </div>
  );

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">CSS Box Shadow Generator</CardTitle>
        <CardDescription>Interactively design box shadows and get the CSS code.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-5">
          <SliderInput label="Horizontal Offset" value={hOffset} onChange={setHOffset} min={-50} max={50} />
          <SliderInput label="Vertical Offset" value={vOffset} onChange={setVOffset} min={-50} max={50} />
          <SliderInput label="Blur Radius" value={blurRadius} onChange={setBlurRadius} min={0} max={100} />
          <SliderInput label="Spread Radius" value={spreadRadius} onChange={setSpreadRadius} min={-50} max={50} />
          
          <div>
            <Label htmlFor="shadowColor" className="mb-2 block text-sm">Shadow Color</Label>
            <Input id="shadowColor" type="color" value={shadowColor} onChange={(e) => setShadowColor(e.target.value)} className="w-full h-10 p-1" />
          </div>
          <SliderInput label="Shadow Opacity" value={shadowOpacity} onChange={setShadowOpacity} min={0} max={1} step={0.01} unit="" />

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="isInset" checked={isInset} onCheckedChange={(checked) => setIsInset(checked as boolean)} />
            <Label htmlFor="isInset" className="font-normal cursor-pointer text-sm">Inset Shadow</Label>
          </div>
        </div>

        {/* Preview and Output Column */}
        <div className="space-y-6">
          <div>
            <Label className="mb-2 block font-semibold text-sm">Live Preview</Label>
            <div className="flex items-center justify-center w-full h-60 bg-muted rounded-md p-4">
              <div 
                className="w-3/5 h-3/5 bg-background rounded-md flex items-center justify-center text-sm text-muted-foreground"
                style={previewStyle}
                data-ai-hint="shadow effect"
              >
                Preview Element
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="generatedCSS-shadow" className="font-semibold text-sm">Generated CSS</Label>
              <Button variant="ghost" size="sm" onClick={handleCopyToClipboard} disabled={!generatedCSS}>
                <Copy className="mr-2 h-4 w-4" /> Copy CSS
              </Button>
            </div>
            <Textarea
              id="generatedCSS-shadow"
              value={generatedCSS}
              readOnly
              rows={3}
              className="font-mono text-sm bg-muted/30 border-border focus-visible:ring-primary focus-visible:border-transparent"
              placeholder="box-shadow: ...;"
            />
          </div>
          <Button variant="outline" onClick={handleClear} className="w-full sm:w-auto">
            <Trash2 className="mr-2 h-4 w-4" /> Reset Controls
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
