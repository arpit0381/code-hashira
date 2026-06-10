'use client';

import { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create 50 particles
    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none opacity-0';
      
      // Randomize color to be ember-like (orange/red/yellow)
      const isRed = Math.random() > 0.5;
      particle.style.backgroundColor = isRed ? '#ef4444' : '#f59e0b'; // red-500 or amber-500
      
      // Randomize size
      const size = Math.random() * 4 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Box shadow for glow
      particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.backgroundColor}`;

      // Initial random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;

      container.appendChild(particle);
      particles.push(particle);

      // Animate using Web Animations API for good performance
      const duration = Math.random() * 5000 + 5000;
      const delay = Math.random() * 5000;

      particle.animate(
        [
          { transform: `translate(0, 0) scale(1)`, opacity: 0 },
          { opacity: Math.random() * 0.5 + 0.3, offset: 0.2 },
          { opacity: Math.random() * 0.5 + 0.3, offset: 0.8 },
          { transform: `translate(${(Math.random() - 0.5) * 100}px, -${Math.random() * 100 + 100}px) scale(0)`, opacity: 0 }
        ],
        {
          duration,
          delay,
          iterations: Infinity,
          easing: 'ease-in-out',
        }
      );
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none"
    />
  );
}
