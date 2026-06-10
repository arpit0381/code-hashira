'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/features/store';
import { SECTION_IDS } from '@/features/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}


export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {

  const { setActiveSection, markSectionVisited } = usePortfolioStore();

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
              markSectionVisited(sectionId);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [setActiveSection, markSectionVisited]);

  // GSAP Smooth scroll click interceptor
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.substring(1);
        const el = document.getElementById(id || 'home');
        if (el) {
          e.preventDefault();
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: el, offsetY: 80 },
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // 'D' key toggle theme
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'd' &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.metaKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        usePortfolioStore.getState().toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <>{children}</>;
}
