import React, { useRef, useEffect } from 'react';

interface CustomCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  parallaxOn?: boolean;
  hoverDuration?: number;
  cursorColor?: string;
  cursorColorOnTarget?: string;
  sizeMultiplier?: number; // For making it 80% smaller (0.2 = 20% of original size)
}

export default function CustomCursor({
  spinDuration = 2,
  hideDefaultCursor = true,
  parallaxOn = true,
  hoverDuration = 0.2,
  cursorColor = 'var(--green)', // Green CLI color from CSS
  cursorColorOnTarget = 'var(--white)', // White for hover
  sizeMultiplier = 0.2, // 80% smaller = 20% of original size
}: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    return () => {
      if (hideDefaultCursor) {
        document.body.style.cursor = '';
      }
    };
  }, [hideDefaultCursor]);

  // Create cursor element
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.backgroundColor = cursorColor;
    cursor.style.transition = `transform ${spinDuration}s, background-color ${hoverDuration}s`;
    cursor.style.transform = `scale(${sizeMultiplier})`; // Make 80% smaller

    document.body.appendChild(cursor);

    return () => {
      document.body.removeChild(cursor);
    };
  }, [cursorColor, hoverDuration, spinDuration, sizeMultiplier]);

  // Update cursor position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle hover effects on target elements
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('cursor-target')) {
        if (cursorRef.current) {
          cursorRef.current.style.backgroundColor = cursorColorOnTarget;
          cursorRef.current.style.transform = `translate(-50%, -50%) scale(${sizeMultiplier * 1.5})`; // Slightly larger on hover
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('cursor-target')) {
        if (cursorRef.current) {
          cursorRef.current.style.backgroundColor = cursorColor;
          cursorRef.current.style.transform = `translate(-50%, -50%) scale(${sizeMultiplier})`;
        }
      }
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorColor, cursorColorOnTarget, hoverDuration, sizeMultiplier]);

  return (
    <div ref={cursorRef} style={{ position: 'absolute', pointerEvents: 'none' }} />
  );
}