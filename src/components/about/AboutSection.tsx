'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/features/animations/variants';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-wrapper relative overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.7), rgba(5, 5, 5, 0.95)), url("/about_bg.png")',
          willChange: 'transform, opacity',
        }}
      />

      {/* Dark overlay for extra text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/10 via-dark/40 to-dark pointer-events-none" />

      {/* Background Breathing Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-circle-primary pointer-events-none z-[1]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bio & Breathing Style Summary */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="space-y-6"
            >
              <div className="space-y-2">
                <motion.p
                  variants={fadeInUp}
                  className="text-accent text-sm font-mono tracking-[0.3em] uppercase"
                >
                  — About Me —
                </motion.p>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl font-bold font-heading leading-tight"
                >
                  The <span className="text-gradient-primary">Hashira</span> of Code
                </motion.h2>
              </div>

              <motion.div 
                variants={fadeInUp} 
                className="space-y-4 text-muted text-base sm:text-lg leading-relaxed"
              >
                <p>
                  I am <span className="text-light font-semibold">Arpit Bajpai</span>, a Full Stack Developer and AI & ML Engineer who treats programming as a craft. Currently pursuing a Bachelor of Computer Applications (BCA), I specialize in forging robust, high-performance web systems and embedding cutting-edge machine learning capabilities into production-ready software.
                </p>
                <p>
                  As the founder and lead developer of <span className="text-primary font-semibold">Catalyst Crew</span>, I coordinate teams to create software solutions that solve real-world problems. I thrive under pressure, participate actively in the hackathon circuit, and enjoy building systems that are elegant both inside and out.
                </p>
              </motion.div>

              {/* Breathing styles cards grid */}
              <motion.div 
                variants={fadeInUp} 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
              >
                <div className="glass-card p-4 hover:border-water/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-water animate-pulse" />
                    <h4 className="text-sm font-mono text-light tracking-wide uppercase">Water Style (Frontend)</h4>
                  </div>
                  <p className="text-xs text-muted/80 mt-2 leading-relaxed">
                    Fluid, highly-responsive user experiences using React, Next.js, and TypeScript.
                  </p>
                </div>

                <div className="glass-card p-4 hover:border-flame/30 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-flame animate-pulse" />
                    <h4 className="text-sm font-mono text-light tracking-wide uppercase">Flame Style (Backend)</h4>
                  </div>
                  <p className="text-xs text-muted/80 mt-2 leading-relaxed">
                    Powerful, reliable API logic and storage powered by Node.js, FastAPI, and PostgreSQL.
                  </p>
                </div>

                <div className="glass-card p-4 hover:border-mist/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-mist animate-pulse" />
                    <h4 className="text-sm font-mono text-light tracking-wide uppercase">Mist Style (AI / ML)</h4>
                  </div>
                  <p className="text-xs text-muted/80 mt-2 leading-relaxed">
                    Intelligent integrations, prompt engineering, and custom models powered by Python.
                  </p>
                </div>

                <div className="glass-card p-4 hover:border-thunder/30 hover:shadow-[0_0_15px_rgba(234,179,8,0.15)] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-thunder animate-pulse" />
                    <h4 className="text-sm font-mono text-light tracking-wide uppercase">Thunder Style (Speed)</h4>
                  </div>
                  <p className="text-xs text-muted/80 mt-2 leading-relaxed">
                    Rapid deployment, clean code structure, and lightning-fast developer iteration cycles.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Profile Image */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={isInView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 50 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative w-full max-w-[360px] aspect-square group"
            >
              {/* Outer Decorative Neon Glow Backing */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-primary via-accent to-water opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

              {/* Character Photo Frame Card */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/40 transition-colors duration-500 bg-dark/80 backdrop-blur-sm shadow-2xl">
                <img
                  src="/arpit_profile.png"
                  alt="Arpit Bajpai"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Overlay Vignette and Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                {/* Subtitle / Rank Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                  <div className="glass-card p-3 text-center border-white/5 bg-dark/60 backdrop-blur-md">
                    <p className="text-[10px] font-mono text-accent tracking-[0.2em] uppercase">Rank: Tech Hashira</p>
                    <h4 className="text-sm font-bold text-light font-heading mt-0.5">Arpit Bajpai</h4>
                  </div>
                </div>
              </div>

              {/* Traditional Thematic Corner Accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary/60 group-hover:scale-110 group-hover:border-primary transition-all duration-300" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary/60 group-hover:scale-110 group-hover:border-primary transition-all duration-300" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary/60 group-hover:scale-110 group-hover:border-primary transition-all duration-300" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary/60 group-hover:scale-110 group-hover:border-primary transition-all duration-300" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
