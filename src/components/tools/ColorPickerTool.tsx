
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const hexToRgbObj = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHslObj = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0; 
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};


export function ColorPickerTool() {
  const [hexColor, setHexColor] = useState<string>('#FFA500'); 
  const [rgbColor, setRgbColor] = useState<string>('');
  const [hslColor, setHslColor] = useState<string>('');
  const { toast } = useToast();

  const updateColorValues = useCallback((newHexColor: string) => {
    setHexColor(newHexColor.toUpperCase());
    const rgbObj = hexToRgbObj(newHexColor);
    if (rgbObj) {
      setRgbColor(`rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`);
      const hslObj = rgbToHslObj(rgbObj.r, rgbObj.g, rgbObj.b);
      setHslColor(`hsl(${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%)`);
    } else {
      setRgbColor('Invalid HEX');
      setHslColor('Invalid HEX');
    }
  }, []);

  useEffect(() => {
    updateColorValues(hexColor);
  }, [hexColor, updateColorValues]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateColorValues(event.target.value);
  };

  const copyToClipboard = async (text: string, format: string) => {
    if (!text || text.startsWith('Invalid')) {
      toast({
        title: 'Error',
        description: `No valid ${format} value to copy.`,
        variant: 'destructive',
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: `${format} value copied to clipboard: ${text}`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: `Failed to copy ${format} value.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Color Picker & Converter</CardTitle>
        <CardDescription>Pick colors and convert between HEX, RGB, and HSL formats.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div>
            <Label htmlFor="color-picker-input" className="mb-2 block text-sm font-medium text-muted-foreground">
              Choose Color:
            </Label>
            <Input
              id="color-picker-input"
              type="color"
              value={hexColor}
              onChange={handleColorChange}
              className="h-20 w-20 sm:h-24 sm:w-24 p-1 border-border cursor-pointer rounded-md shadow-sm"
              aria-label="Color picker input"
            />
          </div>
          <div
            className="h-20 w-full sm:h-24 flex-1 rounded-md border border-border shadow-sm"
            style={{ backgroundColor: hexColor }}
            aria-label={`Selected color preview: ${hexColor}`}
          />
        </div>

        <div className="space-y-4">
          {[
            { label: 'HEX', value: hexColor, format: 'HEX' },
            { label: 'RGB', value: rgbColor, format: 'RGB' },
            { label: 'HSL', value: hslColor, format: 'HSL' },
          ].map(({ label, value, format }) => (
            <div key={label}>
              <Label htmlFor={`${format.toLowerCase()}-value`} className="mb-2 block font-medium">
                {label}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id={`${format.toLowerCase()}-value`}
                  type="text"
                  value={value}
                  readOnly
                  className="bg-muted/30 border-border text-sm"
                  aria-label={`${format} color value`}
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(value, format)}
                  aria-label={`Copy ${format} value`}
                  title={`Copy ${format}`}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
