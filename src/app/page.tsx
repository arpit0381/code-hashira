'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/features/store';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navbar/Navbar';
import MusicPlayer from '@/components/ui/MusicPlayer';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import SkillsSection from '@/components/skills/SkillsSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import AchievementsSection from '@/components/achievements/AchievementsSection';
import CertificationsSection from '@/components/certifications/CertificationsSection';
import TestimonialsSection from '@/components/testimonials/TestimonialsSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/footer/Footer';
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
      <MusicPlayer />
    </ClientProviders>
  );
}
