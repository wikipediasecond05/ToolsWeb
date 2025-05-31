
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const VIEWBOX_WIDTH = 800;
const VIEWBOX_HEIGHT = 200; // Conceptual height for wave calculations
const NUM_POINTS_CURVE = 100; // Number of line segments to approximate the curve

export function SvgWaveGeneratorTool() {
  const [fillColor, setFillColor] = useState<string>('#f97316'); // Default to theme primary (orange)
  const [opacity, setOpacity] = useState<number>(100); // 0-100 for slider, converted to 0-1
  const [amplitude, setAmplitude] = useState<number>(50); // Controls wave height
  const [complexity, setComplexity] = useState<number>(2); // Number of wave crests
  const [isFlippedVertical, setIsFlippedVertical] = useState<boolean>(false);
  const [isFlippedHorizontal, setIsFlippedHorizontal] = useState<boolean>(false);
  const [generatedSvgPath, setGeneratedSvgPath] = useState<string>('');
  const [fullSvgCode, setFullSvgCode] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const generateWavePath = useCallback(() => {
    const actualAmplitude = Math.max(1, amplitude); // Ensure amplitude is at least 1
    const yOffset = actualAmplitude; // Wave center is 'amplitude' distance from top of its own oscillation space
                                   // The wave will oscillate from 0 to 2 * actualAmplitude vertically if centered at yOffset.
    
    let points = [];
    for (let i = 0; i <= NUM_POINTS_CURVE; i++) {
      const x = (VIEWBOX_WIDTH / NUM_POINTS_CURVE) * i;
      // Sine wave calculation: Math.sin results in -1 to 1.
      // (i / NUM_POINTS_CURVE) gives progress from 0 to 1.
      // * Math.PI * 2 makes one full cycle. * complexity for more cycles.
      let waveVal = Math.sin((i / NUM_POINTS_CURVE) * Math.PI * 2 * complexity) * actualAmplitude;
      if (isFlippedVertical) waveVal = -waveVal;
      
      // Ensure y is within a reasonable part of the viewBox, centered around amplitude
      const y = yOffset + waveVal; 
      points.push([x, y]);
    }

    if (isFlippedHorizontal) {
        // Reverse x-coordinates relative to the viewBox width
        points = points.map(p => [VIEWBOX_WIDTH - p[0], p[1]]).sort((a, b) => a[0] - b[0]);
    }
    
    let d = `M ${points[0][0].toFixed(2)} ${points[0][1].toFixed(2)}`;
    for (let j = 1; j < points.length; j++) {
      d += ` L ${points[j][0].toFixed(2)} ${points[j][1].toFixed(2)}`;
    }
    
    // Close path to form a filled shape extending to the bottom of the viewBox
    d += ` L ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT} L 0 ${VIEWBOX_HEIGHT} Z`;
    
    setGeneratedSvgPath(d);

    const svgOutput = `<svg width="100%" height="100%" viewBox="0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <path d="${d}" fill="${fillColor}" fill-opacity="${opacity / 100}" />
</svg>`;
    setFullSvgCode(svgOutput);

  }, [amplitude, complexity, isFlippedVertical, isFlippedHorizontal, fillColor, opacity]);

  useEffect(() => {
    generateWavePath();
  }, [generateWavePath]);

  const handleRandomize = () => {
    setFillColor('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    setOpacity(Math.floor(Math.random() * 61) + 40); // 40-100%
    setAmplitude(Math.floor(Math.random() * 81) + 20); // 20-100
    setComplexity(Math.floor(Math.random() * 4) + 1); // 1-4 waves
    setIsFlippedVertical(Math.random() < 0.5);
    // setIsFlippedHorizontal(Math.random() < 0.5); // Horizontal flip can be less intuitive for waves
  };

  const handleDownload = () => {
    if (!fullSvgCode) {
        toast({ title: "Error", description: "No SVG generated to download.", variant: "destructive"});
        return;
    }
    const blob = new Blob([fullSvgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wave.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "SVG wave downloaded as wave.svg"});
  };
  
  const handleCopyToClipboard = (text: string, type: string) => {
    if (!text) {
      toast({ title: "Nothing to copy", description: `No ${type} code generated.`, variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${type} code copied to clipboard.` });
  };


  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Shape</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amplitude" className="text-sm mb-4 inline-block">Amplitude (Waviness): {amplitude}</Label>
                  <Slider id="amplitude" min={5} max={VIEWBOX_HEIGHT / 2} step={1} value={[amplitude]} onValueChange={(val) => setAmplitude(val[0])} />
                </div>
                <div>
                  <Label htmlFor="complexity" className="text-sm mb-4 inline-block">Complexity (Waves): {complexity}</Label>
                  <Slider id="complexity" min={1} max={10} step={0.5} value={[complexity]} onValueChange={(val) => setComplexity(val[0])} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Color & Appearance</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Label htmlFor="fillColor" className="text-sm whitespace-nowrap">Fill Color:</Label>
                  <Input id="fillColor" type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="w-16 h-10 p-1 flex-shrink-0" />
                  <Input type="text" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="flex-grow text-sm font-mono" maxLength={7}/>
                </div>
                <div>
                  <Label htmlFor="opacity" className="text-sm inline-block mb-4">Opacity: {opacity}%</Label>
                  <Slider id="opacity" min={0} max={100} step={1} value={[opacity]} onValueChange={(val) => setOpacity(val[0])} />
                </div>
              </CardContent>
            </Card>
          </div>
            
          {/* Actions and Transform Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="text-lg">Transform</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button variant="outline" onClick={() => setIsFlippedVertical(!isFlippedVertical)} className="w-full">
                  <Icons.FlipVertical2 className="mr-2" /> Vertical Flip {isFlippedVertical ? "(On)" : "(Off)"}
                </Button>
                <Button variant="outline" onClick={() => setIsFlippedHorizontal(!isFlippedHorizontal)} className="w-full">
                  <Icons.FlipHorizontal2 className="mr-2" /> Horizontal Flip {isFlippedHorizontal ? "(On)" : "(Off)"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Actions</CardTitle></CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={handleRandomize} className="w-full">
                  <Icons.RefreshCw className="mr-2" /> Randomize
                </Button>
                <Button onClick={handleDownload} className="w-full">
                  <Icons.Download className="mr-2" /> Download SVG
                </Button>
              </CardContent>
            </Card>
             <div>
                <Label htmlFor="svgCodeOutput" className="mb-2 block font-semibold text-sm">Generated SVG Code</Label>
                <Textarea
                    id="svgCodeOutput"
                    value={fullSvgCode}
                    readOnly
                    rows={5}
                    className="font-mono text-xs bg-muted/30 border-border focus-visible:ring-primary"
                    placeholder="SVG code will appear here..."
                />
                <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(fullSvgCode, "SVG")} className="mt-2" disabled={!fullSvgCode}>
                    <Icons.CopyIcon className="mr-2"/> Copy Code
                </Button>
            </div>
          </div>
        </div>
        
        <Separator className='my-6' />

        <div>
          <Label className="mb-3 block text-lg font-semibold text-center">Live Preview</Label>
          <div ref={previewRef} className="w-full h-[200px] border rounded-md shadow-inner bg-muted overflow-hidden" data-ai-hint="abstract wave pattern">
            <svg width="100%" height="100%" viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d={generatedSvgPath} fill={fillColor} fillOpacity={opacity / 100} />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
