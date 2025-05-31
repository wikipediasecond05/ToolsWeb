
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const VIEWBOX_SIZE = 200; // Blobs are often best viewed in a square-ish container

export function SvgBlobGeneratorTool() {
  const [fillColor, setFillColor] = useState<string>('#f97316'); // Default to theme primary (orange)
  const [complexity, setComplexity] = useState<number>(6); // 3-15 points
  const [edges, setEdges] = useState<number>(50); // 0-100, irregularity
  const [seed, setSeed] = useState<number>(() => Math.random());
  const [generatedPathD, setGeneratedPathD] = useState<string>('');
  const [fullSvgCode, setFullSvgCode] = useState<string>('');

  const { toast } = useToast();

  const generateBlobPath = useCallback(() => {
    const numPoints = Math.max(3, Math.floor(complexity));
    const angleStep = (Math.PI * 2) / numPoints;
    const center = VIEWBOX_SIZE / 2;
    const baseRadius = center * 0.8; 

    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep + seed * Math.PI * 2; // Use seed to offset initial angle phase
      const randomFactor = (Math.sin(seed * (i + 1) * 5 + i * Math.PI / 3 + seed) + 1) / 2;
      const radiusVariation = (baseRadius / 2) * (edges / 100) * (randomFactor - 0.5) * 2;
      const radius = baseRadius + radiusVariation;
      
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points.push({ x, y });
    }

    if (points.length < 2) {
        setGeneratedPathD('');
        setFullSvgCode('');
        return;
    }
    
    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    const K = 1/6; // Smoothing factor for Catmull-Rom to Bezier control points

    for (let i = 0; i < numPoints; i++) {
      const P_prev = points[(i - 1 + numPoints) % numPoints];
      const P_current = points[i];
      const P_next = points[(i + 1) % numPoints];
      const P_afterNext = points[(i + 2) % numPoints];

      // Control point 1 for the segment from P_current to P_next
      const cp1x = P_current.x + (P_next.x - P_prev.x) * K;
      const cp1y = P_current.y + (P_next.y - P_prev.y) * K;

      // Control point 2 for the segment from P_current to P_next
      const cp2x = P_next.x - (P_afterNext.x - P_current.x) * K;
      const cp2y = P_next.y - (P_afterNext.y - P_current.y) * K;
      
      d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${P_next.x.toFixed(2)},${P_next.y.toFixed(2)}`;
    }
    d += " Z"; 

    setGeneratedPathD(d);
    const svgOutput = `<svg width="100%" height="100%" viewBox="0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <path d="${d}" fill="${fillColor}" />
</svg>`;
    setFullSvgCode(svgOutput);

  }, [complexity, edges, seed, fillColor]);

  useEffect(() => {
    generateBlobPath();
  }, [generateBlobPath]);

  const handleRandomize = () => {
    setFillColor('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
    setComplexity(Math.floor(Math.random() * 13) + 3); // 3-15
    setEdges(Math.floor(Math.random() * 101)); // 0-100
    setSeed(Math.random()); 
  };

  const handleCopyToClipboard = (text: string) => {
    if (!text) {
      toast({ title: "Nothing to copy", description: "No SVG code generated.", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "SVG code copied to clipboard." });
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
    a.download = 'blob.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "SVG blob downloaded as blob.svg"});
  };

  return (
    <>
      <div>
        <div className="w-full h-64 md:h-80 border rounded-md shadow-inner bg-muted flex items-center justify-center p-4" data-ai-hint="abstract blob shape">
          <svg width="100%" height="100%" viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <path d={generatedPathD} fill={fillColor} />
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          <div className="space-y-5">
             <div className="flex items-center gap-4">
              <Label htmlFor="fillColorBlob" className="text-sm whitespace-nowrap">Fill Color:</Label>
              <Input id="fillColorBlob" type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="w-12 h-10 p-1 flex-shrink-0" />
              <Input type="text" value={fillColor} onChange={(e) => setFillColor(e.target.value)} className="flex-grow text-sm font-mono" maxLength={7}/>
            </div>
            <div>
              <Label htmlFor="complexityBlob" className="text-sm flex items-center gap-2 mb-4">
                <Icons.Shapes className="h-4 w-4" /> Complexity (Lobes): {complexity}
              </Label>
              <Slider id="complexityBlob" min={3} max={15} step={1} value={[complexity]} onValueChange={(val) => setComplexity(val[0])} />
            </div>
            <div>
              <Label htmlFor="edgesBlob" className="text-sm flex items-center gap-2 mb-4">
                <Icons.GitFork className="h-4 w-4 rotate-90" /> Edges (Irregularity): {edges}%
              </Label>
              <Slider id="edgesBlob" min={0} max={100} step={1} value={[edges]} onValueChange={(val) => setEdges(val[0])} />
            </div>
          </div>
          <div className="space-y-3 self-end">
             <Button onClick={handleRandomize} className="w-full">
              <Icons.Dice5 className="mr-2" /> Randomize
            </Button>
            <Button variant="outline" onClick={() => handleCopyToClipboard(fullSvgCode)} className="w-full" disabled={!fullSvgCode}>
              <Icons.CopyIcon className="mr-2" /> Copy SVG Code
            </Button>
            <Button variant="outline" onClick={handleDownload} className="w-full" disabled={!fullSvgCode}>
              <Icons.Download className="mr-2" /> Download SVG
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
