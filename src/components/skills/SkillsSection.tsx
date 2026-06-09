'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BREATHING_SKILLS } from '@/features/constants';
import { staggerContainer, fadeInUp } from '@/features/animations/variants';
import type { BreathingSkillGroup } from '@/features/types';

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-wrapper relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

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
            — Skills —
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold font-heading"
          >
            Demon Slayer <span className="text-gradient-fire">Skill Tree</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-muted max-w-2xl mx-auto"
          >
            Every breathing technique represents a domain of mastery.
            Each form has been trained through real-world projects and challenges.
          </motion.p>
        </motion.div>

        {/* Skill Cards Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BREATHING_SKILLS.map((group) => (
            <motion.div key={group.style} variants={fadeInUp}>
              <BreathingCard group={group} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BreathingCard({ group }: { group: BreathingSkillGroup }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative glass-card p-6 overflow-hidden cursor-pointer group"
      style={{
        borderColor: isHovered ? `${group.color}30` : undefined,
        boxShadow: isHovered
          ? `0 0 40px ${group.glowColor}, inset 0 1px 0 ${group.color}20`
          : undefined,
      }}
    >
      {/* Breathing glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${group.glowColor}, transparent 70%)`,
        }}
      />

      {/* Slash overlay on hover */}
      {isHovered && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute top-0 left-0 w-full h-[2px]"
          style={{ background: group.color, transformOrigin: 'left' }}
        />
      )}

      <div className="relative z-10">
        {/* Technique Name */}
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-3 h-3 rounded-full animate-pulse-glow"
            style={{ backgroundColor: group.color, color: group.color }}
          />
          <h3
            className="text-lg font-bold font-heading tracking-wide"
            style={{ color: group.color }}
          >
            {group.name}
          </h3>
        </div>
        <p className="text-xs text-muted mb-5 ml-6">{group.subtitle}</p>

        {/* Skills List */}
        <div className="space-y-4">
          {group.skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-light/80 font-medium">
                  {skill.name}
                </span>
                <span
                  className="text-xs font-mono"
                  style={{ color: group.color }}
                >
                  {skill.level}%
                </span>
              </div>
              {/* Power meter */}
              <div className="skill-meter">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="skill-meter-fill"
                  style={{
                    background: `linear-gradient(90deg, ${group.color}80, ${group.color})`,
                    boxShadow: `0 0 8px ${group.glowColor}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
