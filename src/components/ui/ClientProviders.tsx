'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/features/store';
import { SECTION_IDS } from '@/features/constants';


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
