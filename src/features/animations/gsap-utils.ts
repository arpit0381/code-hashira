'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Stagger-reveal text lines using GSAP + SplitType-style approach
 */
export function animateTextReveal(
  element: HTMLElement,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
    y?: number;
  }
) {
  const { delay = 0, duration = 0.8, stagger = 0.05, y = 60 } = options || {};

  // Split text into spans for each character
  const text = element.textContent || '';
  element.innerHTML = '';
  element.style.overflow = 'hidden';

  const chars = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    element.appendChild(span);
    return span;
  });

  return gsap.fromTo(
    chars,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
    }
  );
}

/**
 * Slash reveal animation — simulates a katana cut across an element
 */
export function animateSlashReveal(
  element: HTMLElement,
  options?: { delay?: number; duration?: number }
) {
  const { delay = 0, duration = 0.8 } = options || {};

  return gsap.fromTo(
    element,
    {
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      opacity: 0,
    },
    {
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      opacity: 1,
      duration,
      delay,
      ease: 'power3.inOut',
    }
  );
}

/**
 * Scroll-triggered fade-in animation
 */
export function createScrollFadeIn(
  element: HTMLElement,
  options?: {
    y?: number;
    x?: number;
    duration?: number;
    start?: string;
  }
) {
  const { y = 50, x = 0, duration = 0.8, start = 'top 80%' } = options || {};

  return gsap.fromTo(
    element,
    { y, x, opacity: 0 },
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * Hook to run GSAP animations with proper cleanup
 */
export function useGsapAnimation(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      callback(gsap.context(() => {}));
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Parallax scroll effect
 */
export function createParallax(
  element: HTMLElement,
  speed: number = 0.5
) {
  return gsap.to(element, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
