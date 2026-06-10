'use client';

import { useRef, useState } from 'react';
import { useInView as useRIV } from 'react-intersection-observer';
import { BREATHING_SKILLS } from '@/features/constants';
import type { BreathingSkillGroup } from '@/features/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function SkillsSection() {
  const containerRef = useScrollReveal();

  return (
    <section id="skills" ref={containerRef} className="section-wrapper relative overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.75), rgba(5, 5, 5, 0.95)), url("/skills_bg.png")',
          willChange: 'transform, opacity',
        }}
      />

      {/* Dark overlay for extra text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/10 via-dark/40 to-dark pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full glow-circle-primary pointer-events-none z-[1]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="reveal-title text-accent text-sm font-mono tracking-[0.3em] uppercase mb-3">
            — Skills —
          </p>
          <h2 className="reveal-title text-4xl sm:text-5xl font-bold font-heading">
            Demon Slayer <span className="text-gradient-fire">Skill Tree</span>
          </h2>
          <p className="reveal-text mt-4 text-muted max-w-2xl mx-auto">
            Every breathing technique represents a domain of mastery.
            Each form has been trained through real-world projects and challenges.
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="reveal-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BREATHING_SKILLS.map((group) => (
            <div key={group.style} className="reveal-grid-item">
              <BreathingCard group={group} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BreathingCard({ group }: { group: BreathingSkillGroup }) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useRIV({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative glass-card p-6 overflow-hidden cursor-pointer group hover:-translate-y-2 transition-all duration-300"
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
      <div
        className="absolute top-0 left-0 w-full h-[2px] transition-transform duration-500 scale-x-0 group-hover:scale-x-100"
        style={{
          background: group.color,
          transformOrigin: 'left',
        }}
      />

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
                <div
                  className="skill-meter-fill"
                  style={{
                    width: inView ? `${skill.level}%` : '0%',
                    background: `linear-gradient(90deg, ${group.color}80, ${group.color})`,
                    boxShadow: `0 0 8px ${group.glowColor}`,
                    transition: 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
