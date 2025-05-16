
'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Palette, Copy, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export function RgbToHexConverterTool() {
  const [rValue, setRValue] = useState<string>('255');
  const [gValue, setGValue] = useState<string>('165');
  const [bValue, setBValue] = useState<string>('0');
  const [hexOutput, setHexOutput] = useState<string>('#FFA500');
  const [colorPreview, setColorPreview] = useState<string>('rgb(255, 165, 0)');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const componentToHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const handleConvert = () => {
    setError(null);
    const r = parseInt(rValue);
    const g = parseInt(gValue);
    const b = parseInt(bValue);

    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      setError('RGB values must be numbers between 0 and 255.');
      setHexOutput('');
      setColorPreview('transparent');
      return;
    }
    const hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    setHexOutput(hex.toUpperCase());
    setColorPreview(`rgb(${r}, ${g}, ${b})`);
  };
  
  React.useEffect(() => {
    handleConvert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rValue, gValue, bValue]);


  const handleCopy = async () => {
    if (!hexOutput) {
      setError('No HEX output to copy.');
      return;
    }
    try {
      await navigator.clipboard.writeText(hexOutput);
      toast({ title: 'Copied!', description: 'HEX code copied to clipboard.' });
      setError(null);
    } catch (e) {
      setError('Failed to copy HEX code.');
      console.error(e);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">RGB to HEX Converter</CardTitle>
        <CardDescription className="text-lg">Convert RGB color values to their hexadecimal representation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="rValue" className="mb-2 block font-semibold">Red (0-255)</Label>
            <Input id="rValue" type="number" value={rValue} onChange={(e) => setRValue(e.target.value)} min="0" max="255" placeholder="R" />
          </div>
          <div>
            <Label htmlFor="gValue" className="mb-2 block font-semibold">Green (0-255)</Label>
            <Input id="gValue" type="number" value={gValue} onChange={(e) => setGValue(e.target.value)} min="0" max="255" placeholder="G" />
          </div>
          <div>
            <Label htmlFor="bValue" className="mb-2 block font-semibold">Blue (0-255)</Label>
            <Input id="bValue" type="number" value={bValue} onChange={(e) => setBValue(e.target.value)} min="0" max="255" placeholder="B" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-4 border-t">
          <div>
            <Label htmlFor="hexOutput" className="mb-2 block font-semibold">HEX Output</Label>
            <div className="flex items-center gap-2">
              <Input id="hexOutput" value={hexOutput} readOnly className="bg-muted/30 font-mono" />
              <Button variant="outline" size="icon" onClick={handleCopy} disabled={!hexOutput} aria-label="Copy HEX code">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label className="mb-2 block font-semibold">Color Preview</Label>
            <div
              className="w-full h-16 rounded-md border"
              style={{ backgroundColor: colorPreview }}
              aria-label={`Color preview for ${colorPreview}`}
            />
          </div>
        </div>
         <Alert variant="default">
          <Palette className="h-4 w-4" />
          <AlertDescription>
            Enter RGB values (0-255). HEX code and preview update automatically.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
