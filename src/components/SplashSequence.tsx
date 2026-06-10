'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFrameSequence } from '@/hooks/useFrameSequence';
import { usePortfolioStore } from '@/features/store';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SplashSequence() {
  const setIntroCompleted = usePortfolioStore((s) => s.setIntroCompleted);
  const isCompletingRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const targetVideoTime = useRef(0);
  const videoTickId = useRef<number | null>(null);

  // Total frames in the extracted WebP folder (from scripts/extract-frames.js)
  // Let's assume a standard 240 frames (around 10 seconds of 24fps video)
  const TOTAL_FRAMES = 240;

  // Mount check to avoid SSR/hydration errors
  useEffect(() => {
    setMounted(true);
    return () => {
      if (videoTickId.current) cancelAnimationFrame(videoTickId.current);
    };
  }, []);

  const [loadedPercent, setLoadedPercent] = useState(0);

  // Use the custom frame sequence hook (Temporarily commented out to show only loading bar)
  /*
  const { hasFrames, isPreloading, loadedPercent, isPriorityDone } = useFrameSequence({
    totalFrames: TOTAL_FRAMES,
    basePath: '/frames',
    canvasRef,
    scrollProgress,
  });
  */

  // Disable body scroll and touch scroll on mobile while loading
  useEffect(() => {
    if (!mounted) return;

    if (loadedPercent < 100) {
      document.body.style.overflow = 'hidden';
      const preventDefault = (e: TouchEvent) => {
        if (e.cancelable) e.preventDefault();
      };
      document.addEventListener('touchmove', preventDefault, { passive: false });
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('touchmove', preventDefault);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mounted, loadedPercent]);

  // Dynamic loading labels (Demon Slayer breathing theme)
  const getLoadingLabel = (pct: number) => {
    if (pct < 20) return 'Gathering flame energy... 🔥';
    if (pct < 40) return 'Unsheathing Nichirin blade... ⚔️';
    if (pct < 60) return 'Activating Thunder Breathing... ⚡';
    if (pct < 80) return 'Concentrating breathing pattern... 💨';
    if (pct < 98) return 'Aligning visual focus... 👁️';
    return 'Unlocking Hashira potential... 💎';
  };

  // Simulated Progress Loader & Auto-Transition
  useEffect(() => {
    if (!mounted) return;

    const duration = 1500; // 1.5 seconds loading time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // Calculate random step increment for realistic loading bar feel
      const progress = Math.min((step / steps) * 100, 100);
      setLoadedPercent(Math.round(progress));

      if (progress >= 100) {
        clearInterval(timer);
        
        // Smoothly fade out the splash screen loader container
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            setIntroCompleted(true);
          },
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [mounted, setIntroCompleted]);

  // Commented out scroll trigger and video hooks to keep them preserved
  /*
  useEffect(() => {
    if (!mounted) return;
    ...
  }, [mounted, hasFrames, setIntroCompleted]);
  */

  const isAllLoaded = loadedPercent === 100;

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-dark flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-primary border-solid rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={triggerRef} className="relative w-full z-20">
      {/* Pinned Wrapper Container */}
      <div
        ref={containerRef}
        className="w-full h-screen bg-dark relative overflow-hidden flex flex-col justify-center items-center"
      >
        {/* Loading Overlay */}
        <div className="absolute inset-0 z-50 bg-dark flex flex-col items-center justify-center p-6 text-center">
          {/* Ambient Background Flame Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full glow-circle-primary pointer-events-none" />
          
          {/* Main branding */}
          <div className="relative mb-10 flex flex-col items-center">
            <span className="text-4xl sm:text-6xl font-bold font-heading tracking-widest text-light leading-none">
              ARPIT <span className="text-gradient-primary">BAJPAI</span>
            </span>
            <div className="w-12 h-[2px] bg-accent mt-4 animate-scaleX" />
          </div>

          {/* Progress Container */}
          <div className="w-72 sm:w-96 relative flex flex-col items-center">
            <div className="w-full bg-white/5 border border-white/10 h-2 rounded-full overflow-hidden mb-4 relative">
              <div
                className="h-full bg-gradient-to-r from-primary via-orange-500 to-accent transition-all duration-300 rounded-full"
                style={{ width: `${loadedPercent}%` }}
              />
            </div>
            <span className="text-xs font-mono tracking-widest text-accent uppercase mb-2">
              {loadedPercent}% Charged
            </span>
            <p className="text-sm text-muted/80 h-6 italic transition-all duration-300">
              {getLoadingLabel(loadedPercent)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
