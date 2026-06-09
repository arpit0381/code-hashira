'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PortfolioState {
  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Intro
  introCompleted: boolean;
  setIntroCompleted: (completed: boolean) => void;

  // Easter eggs
  visitedSections: Set<string>;
  markSectionVisited: (sectionId: string) => void;
  hashiraBadgeUnlocked: boolean;
  setHashiraBadgeUnlocked: (unlocked: boolean) => void;

  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // Konami
  konamiActivated: boolean;
  setKonamiActivated: (activated: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, get) => ({
      // Navigation
      activeSection: 'home',
      setActiveSection: (section) => set({ activeSection: section }),

      // Intro
      introCompleted: false,
      setIntroCompleted: (completed) => set({ introCompleted: completed }),

      // Easter eggs
      visitedSections: new Set<string>(),
      markSectionVisited: (sectionId) => {
        const current = get().visitedSections;
        const updated = new Set(current);
        updated.add(sectionId);
        set({ visitedSections: updated });
      },
      hashiraBadgeUnlocked: false,
      setHashiraBadgeUnlocked: (unlocked) =>
        set({ hashiraBadgeUnlocked: unlocked }),

      // Theme
      theme: 'dark',
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),

      // Konami
      konamiActivated: false,
      setKonamiActivated: (activated) => set({ konamiActivated: activated }),
    }),
    {
      name: 'arpit-portfolio-store',
      partialize: (state) => ({
        visitedSections: Array.from(state.visitedSections),
        hashiraBadgeUnlocked: state.hashiraBadgeUnlocked,
        theme: state.theme,
      }),
      merge: (persisted, current) => {
        const p = persisted as Record<string, unknown>;
        return {
          ...current,
          ...(p || {}),
          introCompleted: false, // Force false on fresh load to bypass localstorage cache
          visitedSections: new Set(
            Array.isArray(p?.visitedSections)
              ? (p.visitedSections as string[])
              : []
          ),
        };
      },
    }
  )
);
