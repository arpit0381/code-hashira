'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import HeroCTA from '@/components/hero/HeroCTA';

const HeroScene = dynamic(() => import('@/features/three/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-dark" />
  ),
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP entry animation timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // 0. Background Image zoom reveal
      tl.fromTo(
        '.gsap-hero-bg',
        { scale: 1.15, filter: 'blur(5px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power2.out' },
        0
      );

      // 1. Title Slash Reveal (clip-path polygon)
      tl.fromTo(
        '.gsap-hero-title',
        {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          opacity: 0,
          y: 40,
        },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.inOut',
        }
      );

      // 2. Accent bar reveal
      tl.fromTo(
        '.gsap-hero-bar',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.6'
      );

      // 3. Roles Stagger (Slide Up & Fade In)
      tl.fromTo(
        '.gsap-hero-role',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // 4. Tagline Fade In
      tl.fromTo(
        '.gsap-hero-tagline',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      );

      // 5. CTA Fade In
      tl.fromTo(
        '.gsap-hero-cta',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' },
        '-=0.4'
      );

      // 6. Scroll Indicator Fade In
      tl.fromTo(
        '.gsap-hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* Background Image Container */}
      <div 
        className="gsap-hero-bg absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.45), rgba(5, 5, 5, 0.85)), url("/demon_slayer_bg.png")',
        }}
      />

      {/* Three.js Background Scene */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <HeroScene />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-dark/20 via-dark/10 to-dark pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Decorative top line */}
        <div className="gsap-hero-bar w-16 h-[2px] bg-accent mb-8 origin-left" />

        {/* Name */}
        <h1 className="gsap-hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight leading-none">
          <span className="text-light">ARPIT </span>
          <span className="text-gradient-primary">BAJPAI</span>
        </h1>

        {/* Roles */}
        <div className="mt-6 space-y-2">
          {[
            'FULL STACK DEVELOPER',
            'AI & ML ENGINEER',
            'BUILDING THE FUTURE WITH CODE',
          ].map((line, i) => (
            <p
              key={line}
              className={`gsap-hero-role ${
                i === 2
                  ? 'text-sm sm:text-base text-accent/80 font-mono tracking-widest mt-4'
                  : 'text-lg sm:text-xl md:text-2xl text-muted font-medium tracking-[0.2em]'
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Tagline */}
        <p className="gsap-hero-tagline mt-8 text-base sm:text-lg text-muted/60 max-w-lg italic">
          &ldquo;Cutting Through Complexity with Code &amp; Intelligence.&rdquo;
        </p>

        {/* CTA Buttons */}
        <div className="gsap-hero-cta">
          <HeroCTA />
        </div>

        {/* Scroll indicator */}
        <div className="gsap-hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted/40 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 border border-muted/20 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-accent rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
