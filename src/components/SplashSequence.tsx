'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { usePortfolioStore } from '@/features/store';

export default function SplashSequence() {
  const setIntroCompleted = usePortfolioStore((s) => s.setIntroCompleted);
  const containerRef = useRef<HTMLDivElement>(null);
  const slashLineRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const tsubaRef = useRef<SVGSVGElement>(null);
  
  const [loadedPercent, setLoadedPercent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const getLoadingLabel = (pct: number) => {
    if (pct < 15) return 'Gathering Solar Energy... ☀️';
    if (pct < 35) return 'Forging Nichirin Steel... ⚔️';
    if (pct < 55) return 'Chambering Thunder Breath... ⚡';
    if (pct < 75) return 'Concentrating breathing pattern... 💨';
    if (pct < 90) return 'Forming Hinokami Kagura... 🔥';
    return 'Total Concentration breathing... 💎';
  };

  useEffect(() => {
    if (!mounted) return;

    const duration = 2000; // 2 seconds
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min((step / steps) * 100, 100);
      setLoadedPercent(Math.round(progress));

      if (progress >= 100) {
        clearInterval(timer);
        playSlashSequence();
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [mounted]);

  const playSlashSequence = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIntroCompleted(true);
      }
    });

    // 1. Initial slight delay at 100% charged
    tl.to('.loading-ui', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    });

    // 2. White hot flash + Katana Slash Line drawing
    tl.fromTo(
      slashLineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power4.inOut' }
    );

    tl.to(slashLineRef.current, {
      boxShadow: '0 0 40px 10px #ffffff, 0 0 80px 20px #00ff9c',
      duration: 0.1,
    });

    // 3. Screen cut slide open (anime sword style)
    tl.to(
      topLeftRef.current,
      {
        xPercent: -100,
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      },
      '+=0.1'
    );

    tl.to(
      bottomRightRef.current,
      {
        xPercent: 100,
        yPercent: 100,
        duration: 0.8,
        ease: 'power4.inOut',
      },
      '<' // Sync with the previous top-left slide
    );

    // 4. Fade/Scale out slash line
    tl.to(
      slashLineRef.current,
      {
        opacity: 0,
        scaleY: 0,
        duration: 0.4,
        ease: 'power2.in',
      },
      '-=0.5'
    );
  };

  // SVG Circumference calculation for progress
  const r = 80;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (loadedPercent / 100) * circumference;

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-dark flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-primary border-solid rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-[100] overflow-hidden select-none pointer-events-none">
      
      {/* Top Left Half Screen */}
      <div
        ref={topLeftRef}
        className="absolute inset-0 bg-dark pointer-events-auto"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          willChange: 'transform',
        }}
      />

      {/* Bottom Right Half Screen */}
      <div
        ref={bottomRightRef}
        className="absolute inset-0 bg-dark pointer-events-auto"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          willChange: 'transform',
        }}
      />

      {/* Overlay UI Container */}
      <div className="loading-ui absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-auto z-10">
        
        {/* Glow behind Tsuba */}
        <div className="absolute w-[400px] h-[400px] rounded-full glow-circle-primary opacity-60 pointer-events-none" />

        {/* Circular Tsuba (Katana Guard) Progress */}
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" ref={tsubaRef}>
            {/* Background Track Tsuba Circle */}
            <circle
              cx="96"
              cy="96"
              r={r}
              className="stroke-white/5 fill-none"
              strokeWidth="4"
            />
            {/* Inner Tsuba Details */}
            <circle
              cx="96"
              cy="96"
              r={r - 10}
              className="stroke-white/5 fill-none"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Progress Glowing Tsuba Guard */}
            <circle
              cx="96"
              cy="96"
              r={r}
              className="stroke-primary fill-none transition-all duration-300"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 8px #d62828)',
              }}
            />
          </svg>
          
          {/* Central Logo / Initials */}
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black font-heading tracking-widest text-light">
              AB
            </span>
            <span className="text-[10px] font-mono text-accent/80 tracking-widest uppercase mt-1">
              {loadedPercent}%
            </span>
          </div>
        </div>

        {/* Brand Text */}
        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-widest text-light leading-none">
            ARPIT <span className="text-gradient-primary">BAJPAI</span>
          </h2>
          <p className="text-xs font-mono text-muted/60 tracking-[0.2em] uppercase mt-2">
            — Code Hashira —
          </p>
        </div>

        {/* Status Text */}
        <div className="h-6">
          <p className="text-sm font-mono text-accent tracking-wider italic transition-all duration-300">
            {getLoadingLabel(loadedPercent)}
          </p>
        </div>
      </div>

      {/* Diagonal Katana Slash Line */}
      <div
        ref={slashLineRef}
        className="absolute w-[150%] h-[3px] bg-white pointer-events-none z-[60] opacity-0"
        style={{
          top: '50%',
          left: '-25%',
          transform: 'rotate(-45deg) scaleX(0)',
          transformOrigin: 'center',
          boxShadow: '0 0 20px 5px #ffffff, 0 0 40px 10px #d62828',
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
}
