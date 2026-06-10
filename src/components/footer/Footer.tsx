'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUp, Sparkles, Heart } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '@/features/constants';
import { cn } from '@/features/lib/utils';
import { usePortfolioStore } from '@/features/store';

export default function Footer() {
  const activeSection = usePortfolioStore((s) => s.activeSection);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Demon Slayer / Anime inspired quotes
  const quotes = [
    {
      text: "Feel the rage. The pure, cold fury of not being able to yield.",
      author: "Giyu Tomioka"
    },
    {
      text: "No matter how many people you may lose, you have no choice but to go on living.",
      author: "Tanjiro Kamado"
    },
    {
      text: "Grow strong in your own way. Walk forward. Do not look back.",
      author: "Kyojuro Rengoku"
    },
    {
      text: "If you can only do one thing, hone it to perfection. Hone it to the utmost limit!",
      author: "Jigoro Kuwajima"
    }
  ];

  // Pick a quote deterministically or statically to avoid hydration mismatches
  const quote = quotes[1]; // Tanjiro's inspiring quote

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: SOCIAL_LINKS.github,
      hoverClass: 'hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(0,255,156,0.4)]',
      color: '#00FF9C'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: SOCIAL_LINKS.linkedin,
      hoverClass: 'hover:border-water hover:text-water hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]',
      color: '#3B82F6'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/arpit_bajpai', // Instagram requested by user
      hoverClass: 'hover:border-flame hover:text-flame hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]',
      color: '#F97316'
    },
    {
      name: 'Gmail',
      icon: Mail,
      url: `mailto:${SOCIAL_LINKS.email}`,
      hoverClass: 'hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(214,40,40,0.4)]',
      color: '#D62828'
    }
  ];

  return (
    <footer className="relative bg-dark-card border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Blade Slash Accent Top Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-accent to-water opacity-80" />

      {/* Background glowing rings */}
      <div className="absolute -bottom-24 -right-24 w-[350px] h-[350px] rounded-full glow-circle-primary pointer-events-none opacity-40 z-0" />
      <div className="absolute -top-24 -left-24 w-[350px] h-[350px] rounded-full glow-circle-accent pointer-events-none opacity-20 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-2xl font-bold font-heading tracking-wider flex items-center gap-2">
                <span className="text-primary">A</span>
                <span className="text-light">RPIT</span>
                <span className="text-muted/40 text-sm font-normal uppercase tracking-widest ml-1">BAJPAI</span>
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary uppercase tracking-wider">
                Rank: Tech Hashira ⚔️
              </div>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                Forging premium digital interfaces and robust full-stack software systems. Harnessing frontend fluidity and backend logic into a singular, polished craft.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    id={`social-${social.name.toLowerCase()}`}
                    suppressHydrationWarning
                    className={cn(
                      "w-10 h-10 rounded-lg glass flex items-center justify-center border border-white/10 transition-all duration-300",
                      social.hoverClass
                    )}
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-mono text-light tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <Sparkles size={14} className="text-accent" /> Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {NAV_LINKS.map((link) => (
                <li key={link.sectionId}>
                  <a
                    href={link.href}
                    id={`footer-link-${link.sectionId}`}
                    className={cn(
                      "text-sm tracking-wide transition-colors duration-200 block hover:text-accent py-0.5",
                      activeSection === link.sectionId ? "text-accent font-medium" : "text-muted"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Breathing Styles Column */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-mono text-light tracking-[0.2em] uppercase mb-6">
              Breathing Techniques
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Water Style', desc: 'Fluid UI & Frontend', color: 'bg-water' },
                { name: 'Flame Style', desc: 'Powerful Backend & API', color: 'bg-flame' },
                { name: 'Thunder Style', desc: 'Speed & Execution', color: 'bg-thunder' },
                { name: 'Mist Style', desc: 'Intelligent AI Lab', color: 'bg-mist' },
              ].map((style) => (
                <li key={style.name} className="flex items-center gap-3">
                  <span className={cn("w-2 h-2 rounded-full shrink-0 animate-pulse", style.color)} />
                  <div>
                    <span className="text-xs font-semibold text-light font-mono block">{style.name}</span>
                    <span className="text-[11px] text-muted">{style.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Status Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h4 className="text-sm font-mono text-light tracking-[0.2em] uppercase mb-4">
                Status
              </h4>
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
                </span>
                <span className="text-xs font-mono text-light tracking-wider uppercase">
                  Available for Hire
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-mono text-light tracking-[0.2em] uppercase mb-2">
                Origin
              </h4>
              <span className="text-xs text-muted leading-relaxed block">
                Uttar Pradesh, India
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Quote Card */}
          <div className="text-center md:text-left border-l-2 border-primary/40 pl-4 py-1 max-w-md">
            <p className="text-xs italic text-muted leading-relaxed">
              &ldquo;{quote.text}&rdquo;
            </p>
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest mt-1 block">
              — {quote.author}
            </span>
          </div>

          {/* Copy & Return to top */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              suppressHydrationWarning
              className="p-2.5 rounded-lg glass border border-white/10 text-muted hover:text-accent hover:border-accent/40 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </motion.button>
            <p className="text-[11px] text-muted/50 flex items-center gap-1 font-mono">
              © {new Date().getFullYear()} Arpit Bajpai. Crafted with <Heart size={10} className="text-primary animate-pulse inline" /> and code.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
