'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView as useRIV } from 'react-intersection-observer';
import { ACHIEVEMENTS } from '@/features/constants';
import { staggerContainer, fadeInUp } from '@/features/animations/variants';

export default function AchievementsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="section-wrapper relative overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.75), rgba(5, 5, 5, 0.95)), url("/achievements_bg.png")',
          willChange: 'transform, opacity',
        }}
      />

      {/* Dark overlay for extra text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/10 via-dark/40 to-dark pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full glow-circle-accent pointer-events-none z-[1]" />

      <div className="max-w-5xl mx-auto relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeInUp}
            className="text-accent text-sm font-mono tracking-[0.3em] uppercase mb-3"
          >
            — Achievements —
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold font-heading"
          >
            Numbers That <span className="text-gradient-accent">Speak</span>
          </motion.h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {ACHIEVEMENTS.map((achievement) => (
            <motion.div key={achievement.id} variants={fadeInUp}>
              <StatCard achievement={achievement} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function StatCard({ achievement }: { achievement: (typeof ACHIEVEMENTS)[0] }) {
  const { ref, inView } = useRIV({ triggerOnce: true, threshold: 0.5 });

  return (
    <div
      ref={ref}
      className="glass-card p-6 text-center group hover:glow-accent transition-all"
    >
      {/* Icon */}
      <div className="text-3xl mb-3">{achievement.icon}</div>

      {/* Number */}
      <div className="text-3xl sm:text-4xl font-bold font-heading text-accent">
        {inView ? (
          <CountUp
            end={achievement.value}
            duration={2.5}
            suffix={achievement.suffix}
          />
        ) : (
          `0${achievement.suffix}`
        )}
      </div>

      {/* Label */}
      <p className="mt-2 text-sm text-muted">{achievement.label}</p>

      {/* Subtle glow ring */}
      <div className="absolute inset-0 rounded-2xl border border-accent/0 group-hover:border-accent/10 transition-colors duration-500" />
    </div>
  );
}
