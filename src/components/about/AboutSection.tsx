'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { TIMELINE_NODES } from '@/features/constants';
import { staggerContainer, fadeInUp } from '@/features/animations/variants';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-wrapper relative">
      {/* Background breathing glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-water/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
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
            — About Me —
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold font-heading"
          >
            The <span className="text-gradient-primary">Story</span> So Far
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-muted max-w-2xl mx-auto"
          >
            Every master was once a beginner. Here&apos;s the journey from
            curiosity to creation — told chapter by chapter.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

          {TIMELINE_NODES.map((node, index) => (
            <TimelineCard
              key={node.id}
              node={node}
              index={index}
              isRight={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  node,
  index,
  isRight,
}: {
  node: (typeof TIMELINE_NODES)[0];
  index: number;
  isRight: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div
      ref={ref}
      className={`relative flex items-start mb-12 md:mb-16 ${
        isRight ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Dot on the line */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-2 border-dark z-10"
      >
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{
          opacity: 0,
          x: isRight ? 60 : -60,
        }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
          isRight ? 'md:mr-auto md:pl-0 md:pr-8' : 'md:ml-auto md:pl-8 md:pr-0'
        }`}
      >
        <div className="glass-card p-6 group hover:glow-primary">
          <span className="text-xs font-mono text-accent/60 tracking-wider">
            {node.year}
          </span>
          <h3 className="mt-2 text-xl font-bold font-heading text-light group-hover:text-primary transition-colors">
            {node.title}
          </h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            {node.description}
          </p>

          {/* Slash accent */}
          <div className="mt-4 w-8 h-[2px] bg-primary/50 group-hover:w-16 transition-all duration-500" />
        </div>
      </motion.div>
    </div>
  );
}
