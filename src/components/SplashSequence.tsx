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

  // Use the custom frame sequence hook
  const { hasFrames, isPreloading, loadedPercent, isPriorityDone } = useFrameSequence({
    totalFrames: TOTAL_FRAMES,
    basePath: '/frames',
    canvasRef,
    scrollProgress,
  });

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

  // 1. Initialize GSAP ScrollTrigger to track scroll progress and pin container
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // ScrollTrigger to pin the sequence and track progress
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=300%', // Scroll depth (3x viewport height)
        pin: containerRef.current,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          
          // Fallback video scrubbing
          if (hasFrames === false && videoRef.current) {
            const duration = videoRef.current.duration;
            if (duration && !isNaN(duration)) {
              targetVideoTime.current = self.progress * duration;
            }
          }

          // Trigger transition when user reaches the end of the sequence
          if (self.progress >= 0.99 && !isCompletingRef.current) {
            isCompletingRef.current = true;
            
            const tl = gsap.timeline({
              onComplete: () => {
                // Scroll back to the top of the viewport before swapping layouts
                window.scrollTo(0, 0);
                setIntroCompleted(true);
              },
            });

            // 1. Instantly make panels visible (they are opacity 0 by default)
            tl.set('.gsap-slash-panel-top, .gsap-slash-panel-bottom', { opacity: 1 });
            
            // 2. Draw the glowing lightning slash line across the diagonal
            tl.fromTo(
              '.gsap-slash-line',
              { scaleX: 0, opacity: 1 },
              { scaleX: 1.2, duration: 0.25, ease: 'power3.inOut' }
            );

            // 3. Lightning Flash (screen flashes bright white) and screen shakes
            tl.to('.gsap-slash-flash', { opacity: 0.9, duration: 0.08 })
              .to('.gsap-slash-flash', { opacity: 0, duration: 0.18 })
              .to(
                containerRef.current,
                {
                  x: '+=10',
                  y: '-=10',
                  duration: 0.04,
                  repeat: 5,
                  yoyo: true,
                },
                '-=0.2'
              );

            // 4. Split and slide the screen halves apart
            tl.to(
              '.gsap-slash-panel-top',
              {
                x: '-100%',
                y: '-100%',
                duration: 0.8,
                ease: 'power3.inOut',
              },
              '+=0.05'
            );

            tl.to(
              '.gsap-slash-panel-bottom',
              {
                x: '100%',
                y: '100%',
                duration: 0.8,
                ease: 'power3.inOut',
              },
              '-=0.8'
            );

            // Fade out the canvas and the slash line during the split reveal
            tl.to(canvasRef.current, { opacity: 0, duration: 0.3 }, '-=0.8');
            tl.to('.gsap-slash-line', { opacity: 0, duration: 0.4 }, '-=0.6');
          }
        },
      });
    });

    return () => ctx.revert();
  }, [mounted, hasFrames, setIntroCompleted]);

  // 2. Video fallback smooth scrubbing loop (lerped currentTime)
  useEffect(() => {
    if (hasFrames !== false || !mounted) return;

    const smoothScrubVideo = () => {
      const video = videoRef.current;
      if (video && video.duration) {
        const current = video.currentTime;
        const target = targetVideoTime.current;
        
        // Lerp video currentTime to prevent stutter
        const nextTime = current + (target - current) * 0.15;
        
        // Update video if the difference is noticeable
        if (Math.abs(nextTime - current) > 0.005) {
          video.currentTime = nextTime;
        }
      }
      videoTickId.current = requestAnimationFrame(smoothScrubVideo);
    };

    videoTickId.current = requestAnimationFrame(smoothScrubVideo);

    return () => {
      if (videoTickId.current) cancelAnimationFrame(videoTickId.current);
    };
  }, [hasFrames, mounted]);

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
        {/* Loading Overlay (fades out when ready) */}
        {!isAllLoaded && (
          <div className="absolute inset-0 z-50 bg-dark flex flex-col items-center justify-center p-6 text-center">
            {/* Ambient Background Flame Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] animate-pulse pointer-events-none" />
            
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
        )}

        {/* Dynamic Display Mode */}
        {hasFrames === true ? (
          // WebP Frame Sequence Canvas (Active mode)
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block select-none pointer-events-none bg-dark transition-opacity duration-500"
            style={{ opacity: isAllLoaded ? 1 : 0 }}
          />
        ) : (
          // Direct HTML5 Video Scrubber Fallback
          <video
            ref={videoRef}
            src="/anime.mp4"
            preload="auto"
            muted
            playsInline
            className="w-full h-full object-cover block select-none pointer-events-none bg-dark"
            style={{ opacity: 1 }}
          />
        )}

        {/* Ambient Dark Overlay to match design guidelines */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-dark/30 via-transparent to-dark select-none pointer-events-none" />

        {/* Scroll CTA Indicator */}
        {isAllLoaded && (
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 select-none pointer-events-none transition-opacity duration-300"
            style={{ opacity: scrollProgress > 0.8 ? 0 : 1 - scrollProgress * 1.2 }}
          >
            <span className="text-xs font-mono tracking-[0.3em] text-accent/80 uppercase">
              {hasFrames === false ? 'Scrub the Blade ⚔️' : 'Unsheathe the Blade ⚔️'}
            </span>
            <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
            </div>
          </div>
        )}

        {/* Cinematic Lightning Slash Transition Overlay */}
        <div className="absolute inset-0 pointer-events-none z-45 overflow-hidden">
          {/* Top-Left Half Screen */}
          <div
            className="gsap-slash-panel-top absolute top-0 left-0 w-full h-full bg-dark opacity-0"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            }}
          />
          {/* Bottom-Right Half Screen */}
          <div
            className="gsap-slash-panel-bottom absolute top-0 left-0 w-full h-full bg-dark opacity-0"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />
          {/* Glowing Slash Line (Nichirin blade cut) */}
          <div
            className="gsap-slash-line absolute top-1/2 left-0 w-[150%] h-[4px] bg-accent opacity-0 origin-left rotate-[-45deg] -translate-x-1/12 -translate-y-1/2 scale-x-0"
            style={{
              boxShadow: '0 0 20px #00FF9C, 0 0 40px #FFEA00',
              background: 'linear-gradient(to right, #00FF9C, #FFEA00)',
            }}
          />
          {/* Flash Effect */}
          <div className="gsap-slash-flash absolute inset-0 bg-white opacity-0" />
        </div>
      </div>
    </div>
  );
}
