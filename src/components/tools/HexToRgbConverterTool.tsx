
'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Palette, Copy, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface RgbOutput {
  r: string;
  g: string;
  b: string;
}

export function HexToRgbConverterTool() {
  const [hexInput, setHexInput] = useState<string>('#FFA500');
  const [rgbOutput, setRgbOutput] = useState<RgbOutput>({ r: '255', g: '165', b: '0' });
  const [colorPreview, setColorPreview] = useState<string>('#FFA500');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConvert = () => {
    setError(null);
    let hex = hexInput.trim();
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }

    if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex)) {
      setError('Invalid HEX code. Use 3 or 6 hex characters (e.g., #F00 or #FF0000).');
      setRgbOutput({ r: '', g: '', b: '' });
      setColorPreview('transparent');
      return;
    }

    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    setRgbOutput({ r: r.toString(), g: g.toString(), b: b.toString() });
    setColorPreview(`#${hex}`);
  };
  
  React.useEffect(() => {
    handleConvert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hexInput]);

  const handleCopy = async () => {
    if (!rgbOutput.r && !rgbOutput.g && !rgbOutput.b) {
      setError('No RGB output to copy.');
      return;
    }
    const rgbString = `rgb(${rgbOutput.r}, ${rgbOutput.g}, ${rgbOutput.b})`;
    try {
      await navigator.clipboard.writeText(rgbString);
      toast({ title: 'Copied!', description: `RGB value (${rgbString}) copied to clipboard.` });
      setError(null);
    } catch (e) {
      setError('Failed to copy RGB values.');
      console.error(e);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">HEX to RGB Converter</CardTitle>
        <CardDescription className="text-lg">Convert hexadecimal color codes to their RGB representation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div>
          <Label htmlFor="hexInput" className="mb-4 block font-semibold">HEX Color Code</Label>
          <Input
            id="hexInput"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            placeholder="#RRGGBB or #RGB"
            className="font-mono"
            maxLength={7}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t">
          <div className="space-y-3">
             <Label className="block font-semibold mb-4">RGB Output</Label>
            <div className="flex items-center gap-2">
                <Input id="rOutput" value={rgbOutput.r} readOnly className="bg-muted/30" placeholder="R" aria-label="Red value" />
                <Input id="gOutput" value={rgbOutput.g} readOnly className="bg-muted/30" placeholder="G" aria-label="Green value" />
                <Input id="bOutput" value={rgbOutput.b} readOnly className="bg-muted/30" placeholder="B" aria-label="Blue value" />
            </div>
            <Button variant="outline" onClick={handleCopy} disabled={!rgbOutput.r} className="w-full">
                <Copy className="mr-2 h-4 w-4" />Copy RGB
            </Button>
          </div>
           <div>
            <Label className="mb-4 block font-semibold">Color Preview</Label>
            <div
              className="w-full h-16 rounded-md border"
              style={{ backgroundColor: colorPreview }}
              aria-label={`Color preview for ${colorPreview}`}
            />
          </div>
        </div>
        <Alert variant="default" className="mt-6">
          <Palette className="h-4 w-4" />
          <AlertDescription>
            Enter a 3 or 6 digit HEX code (e.g., #F00 or #FF0000). RGB values update automatically.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
