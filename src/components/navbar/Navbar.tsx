'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '@/features/constants';
import { usePortfolioStore } from '@/features/store';
import { cn } from '@/features/lib/utils';
import { navbarVariants } from '@/features/animations/variants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const activeSection = usePortfolioStore((s) => s.activeSection);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;

    setScrollProgress(progress);
    setScrolled(currentScrollY > 50);

    // Auto-hide on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
        <motion.div
          className="h-full bg-accent"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Floating Capsule Navbar */}
      <motion.nav
        variants={navbarVariants}
        animate={hidden ? 'hidden' : 'visible'}
        className={cn(
          'fixed left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-max md:min-w-[700px] max-w-[98%] rounded-full border transition-all duration-500',
          scrolled
            ? 'top-4 py-2 px-5 md:px-8 bg-dark-card/90 border-accent/20 shadow-[0_0_20px_rgba(0,255,156,0.1)] backdrop-blur-md'
            : 'top-6 py-3 md:py-4 px-6 md:px-10 bg-dark-card/40 border-white/10 backdrop-blur-md'
        )}
      >
        <div className="flex items-center justify-between w-full gap-4 lg:gap-8">
          {/* Logo with Kanji Badge */}
          <a href="#home" className="relative group flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold font-heading tracking-wider flex items-center">
              <span className="text-primary font-black">A</span>
              <span className="text-light">RPIT</span>
            </span>
            {/* Calligraphic Hashira badge */}
            <span className="hidden sm:inline-block text-[10px] bg-primary/10 border border-primary/20 text-primary px-1.5 py-0.5 rounded font-mono font-bold select-none">
              柱 (Hashira)
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-300" />
          </a>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-1 justify-center shrink-0">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.sectionId}
                  href={link.href}
                  className={cn(
                    'relative px-2 xl:px-3 py-2 text-[13px] xl:text-sm font-medium tracking-wide transition-all duration-300 rounded-full group overflow-hidden whitespace-nowrap',
                    isActive ? 'text-accent' : 'text-muted hover:text-light'
                  )}
                >
                  {/* Subtle slash background hover effect */}
                  <span className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 skew-x-[-20deg] scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-center" />
                  
                  {/* Calligraphic brackets appearing on hover/active */}
                  <span className="transition-all duration-300 opacity-0 group-hover:opacity-100 mr-0.5 group-hover:mr-1">【</span>
                  {link.label}
                  <span className="transition-all duration-300 opacity-0 group-hover:opacity-100 ml-0.5 group-hover:ml-1">】</span>

                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute inset-0 border border-accent/30 bg-accent/[0.03] rounded-full z-[-1]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA Action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href="#contact"
              className="relative group overflow-hidden px-4 xl:px-5 py-2 text-[13px] xl:text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-dim shadow-[0_0_15px_rgba(0,255,156,0.15)] hover:shadow-[0_0_25px_rgba(0,255,156,0.3)] transition-all duration-300 whitespace-nowrap"
            >
              <span className="relative z-10">Hire Me</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            suppressHydrationWarning
            className="lg:hidden relative z-50 p-2 text-light hover:text-accent transition-colors ml-auto"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-45"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 w-[290px] h-full bg-dark-card border-l border-white/5 z-50 p-8 pt-24 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="border-b border-white/5 pb-4 mb-4">
                  <span className="text-xs font-mono text-muted tracking-widest uppercase flex items-center gap-1.5">
                    <Sparkles size={12} className="text-accent" /> Breathing Styles
                  </span>
                </div>
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.sectionId}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'px-4 py-3 text-lg font-medium rounded-xl transition-all duration-200 flex items-center justify-between',
                      activeSection === link.sectionId
                        ? 'text-accent bg-accent/5 border border-accent/20'
                        : 'text-muted hover:text-light hover:bg-white/5'
                    )}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.sectionId && (
                      <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded font-mono font-bold">
                        ON
                      </span>
                    )}
                  </motion.a>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5">
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-5 py-3 text-sm font-semibold text-dark bg-accent rounded-xl hover:bg-accent-dim shadow-[0_0_15px_rgba(0,255,156,0.15)] transition-all duration-300"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
