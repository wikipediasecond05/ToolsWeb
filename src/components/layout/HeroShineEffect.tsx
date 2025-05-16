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
        setMousePosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    };

    const currentRef = containerRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const background = `radial-gradient(1000px circle at ${mousePosition.x || 0}px ${mousePosition.y || 0}px,
        hsla(30, 100%, 50%, 0.2) 0%,
        hsla(30, 100%, 50%, 0.1) 25%,
        hsla(30, 100%, 50%, 0.05) 50%,
        transparent 80%)`;


  return (
    <div
      ref={containerRef}
      className={cn("relative transition-colors duration-300", className)}
      style={{
        background,
      }}
    >
      {children}
    </div>
  );
}
