
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface HeroShineEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroShineEffect({ children, className }: HeroShineEffectProps) {
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
      }
    };

    const currentRef = containerRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const primaryHsl = "var(--primary)"; // Use the HSL values directly from globals.css

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)} // Removed overflow-hidden
      style={
        {
          '--mouse-x': mousePosition.x !== null ? `${mousePosition.x}px` : '50%',
          '--mouse-y': mousePosition.y !== null ? `${mousePosition.y}px` : '50%',
          background: mousePosition.x !== null 
            ? `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), hsla(${primaryHsl}, 0.15), transparent 40%)`
            : undefined,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
