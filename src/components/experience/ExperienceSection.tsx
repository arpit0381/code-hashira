'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCES } from '@/features/constants';
import { staggerContainer, fadeInUp } from '@/features/animations/variants';
import type { Experience } from '@/features/types';

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-wrapper relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-flame/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-accent text-sm font-mono tracking-[0.3em] uppercase mb-3"
          >
            — Experience —
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold font-heading"
          >
            Battle <span className="text-gradient-fire">Chronicles</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-muted max-w-2xl mx-auto"
          >
            Every mission has shaped the warrior. From startups to hackathons,
            each experience forged stronger skills and deeper wisdom.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-flame/30 to-transparent" />

          {EXPERIENCES.map((exp, index) => (
            <ExperienceCard key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative flex items-start mb-12 ml-4 md:ml-8">
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute -left-4 md:-left-8 translate-x-[-50%] w-4 h-4 rounded-full bg-flame border-2 border-dark z-10"
      >
        <div className="absolute inset-0 rounded-full bg-flame animate-ping opacity-20" />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="ml-8 w-full"
      >
        <div className="glass-card p-6 border-l-2 border-l-flame/40 hover:border-l-flame transition-colors group">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold font-heading text-light group-hover:text-flame transition-colors">
                {experience.company}
              </h3>
              <p className="text-sm text-accent/80 font-medium">
                {experience.role}
              </p>
            </div>
            <span className="text-xs font-mono text-muted mt-1 sm:mt-0">
              {experience.period}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed mb-4">
            {experience.description}
          </p>

          {/* Contributions */}
          <ul className="space-y-2 mb-4">
            {experience.contributions.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted/80">
                <span className="text-flame mt-1 text-xs">▸</span>
                {c}
              </li>
            ))}
          </ul>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono text-light/60 bg-white/5 rounded-md border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
