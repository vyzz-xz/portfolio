'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  className?: string;
  textColor?: string;
  strokeColor?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  minFontSize?: number;
}

export default function TextPressure({
  text = 'MUHAMAD HAFIZ',
  fontFamily = 'Red Hat Text',
  className = '',
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  minFontSize = 24,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [spans, setSpans] = useState<HTMLSpanElement[]>([]);
  
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const cursorRef = useRef({ x: -9999, y: -9999 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  // Init Spans
  useEffect(() => {
    if (titleRef.current) {
      const children = Array.from(titleRef.current.querySelectorAll('span'));
      setSpans(children);
    }
  }, [text]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    cursorRef.current.x = e.clientX;
    cursorRef.current.y = e.clientY;
  };

  const handleMouseLeave = () => {
    cursorRef.current.x = -9999;
    cursorRef.current.y = -9999;
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && titleRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const characterCount = text.length || 1; 
        
        const calculatedSize = (parentWidth / characterCount) * 1.0;
        const newFontSize = Math.max(minFontSize, calculatedSize);
        
        setFontSize(newFontSize);
        setScaleY(1);
        setLineHeight(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [minFontSize, text]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 10;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 10;

      if (titleRef.current && containerRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2.5;

        spans.forEach((span) => {
          const rect = span.getBoundingClientRect();
          const charCenter = rect.left + rect.width / 2;
          const dist = Math.abs(mouseRef.current.x - charCenter);
          const distY = Math.abs(mouseRef.current.y - (rect.top + rect.height / 2));
          
          if (distY > 100) {
             span.style.opacity = '1';
             span.style.fontWeight = '300'; 
             span.style.transform = `scaleX(1) skewX(0deg)`;
             return; 
          }

          const distanceFactor = Math.max(0, 1 - dist / maxDist);

          const targetWeight = weight ? 300 + (distanceFactor * 500) : 700;
          const targetScaleX = width ? 1 + (distanceFactor * 0.5) : 1;
          const targetSlant = italic ? (distanceFactor * 15) : 0;

          span.style.opacity = alpha ? (0.5 + distanceFactor * 0.5).toString() : '1';
          span.style.fontWeight = targetWeight.toString();
          span.style.transform = `scaleX(${targetScaleX}) skewX(-${targetSlant}deg)`;
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [spans, alpha, italic, weight, width]);

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full ${className}`}
    >
      <h1
        ref={titleRef}
        className={`flex ${flex ? 'justify-between' : ''} items-center w-full h-full whitespace-nowrap`}
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          fontWeight: 300,
          lineHeight,
          transform: `scaleY(${scaleY})`,
          color: stroke ? 'transparent' : textColor,
          WebkitTextStroke: stroke ? `2px ${strokeColor}` : 'none',
          userSelect: 'none',
          cursor: 'default'
        }}
      >
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block transition-transform will-change-transform"
            style={{
                display: 'inline-block',
                transformOrigin: 'center bottom'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
}