'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/features/store';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import SkillsSection from '@/components/skills/SkillsSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import AchievementsSection from '@/components/achievements/AchievementsSection';
import CertificationsSection from '@/components/certifications/CertificationsSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import ContactSection from '@/components/contact/ContactSection';
import ClientProviders from '@/components/ui/ClientProviders';

// Dynamically import heavy components (no SSR for Three.js / AI Lab / Splash Sequence)
const SplashSequence = dynamic(
  () => import('@/components/SplashSequence'),
  { ssr: false }
);

const AILabSection = dynamic(
  () => import('@/components/ai-lab/AILabSection'),
  { ssr: false }
);

// Footer
function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <span className="text-xl font-bold font-heading tracking-wider">
              <span className="text-primary">A</span>
              <span className="text-light">RPIT</span>
              <span className="text-muted/40 ml-2 text-sm font-normal">
                BAJPAI
              </span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/arpit-bajpai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-light transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/arpit-bajpai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-light transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/arpit_bajpai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-light transition-colors"
            >
              Twitter
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted/40">
            © {new Date().getFullYear()} Arpit Bajpai. Forged with ⚔️ and code.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const { introCompleted } = usePortfolioStore();

  useEffect(() => {
    if (introCompleted) {
      window.scrollTo(0, 0);
    }
  }, [introCompleted]);

  if (!introCompleted) {
    return (
      <main>
        <SplashSequence />
      </main>
    );
  }

  return (
    <ClientProviders>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
        <CertificationsSection />
        <TestimonialsSection />
        <AILabSection />
        <ContactSection />
      </main>
      <Footer />
    </ClientProviders>
  );
}
