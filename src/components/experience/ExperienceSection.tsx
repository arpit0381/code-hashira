'use client';

import { EXPERIENCES } from '@/features/constants';
import type { Experience } from '@/features/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ExperienceSection() {
  const containerRef = useScrollReveal();

  return (
    <section id="experience" ref={containerRef} className="section-wrapper relative overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.75), rgba(5, 5, 5, 0.95)), url("/experience_bg.png")',
          willChange: 'transform, opacity',
        }}
      />

      {/* Dark overlay for extra text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/10 via-dark/40 to-dark pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full glow-circle-flame pointer-events-none z-[1]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="reveal-title text-accent text-sm font-mono tracking-[0.3em] uppercase mb-3">
            — Experience —
          </p>
          <h2 className="reveal-title text-4xl sm:text-5xl font-bold font-heading">
            Battle <span className="text-gradient-fire">Chronicles</span>
          </h2>
          <p className="reveal-text mt-4 text-muted max-w-2xl mx-auto">
            Every mission has shaped the warrior. From startups to hackathons,
            each experience forged stronger skills and deeper wisdom.
          </p>
        </div>

        {/* Timeline */}
        <div className="reveal-grid relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-flame/30 to-transparent" />

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="reveal-grid-item">
              <ExperienceCard experience={exp} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <div className="relative flex items-start mb-12 ml-4 md:ml-8">
      {/* Dot */}
      <div className="absolute -left-4 md:-left-8 translate-x-[-50%] w-4 h-4 rounded-full bg-flame border-2 border-dark z-10">
        <div className="absolute inset-0 rounded-full bg-flame animate-ping opacity-20" />
      </div>

      {/* Card */}
      <div className="ml-8 w-full">
        <div className="glass-card p-6 border-l-2 border-l-flame/40 hover:border-l-flame transition-colors group relative">
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
      </div>
    </div>
  );
}
