'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '@/features/constants';
import { staggerContainer, fadeInUp } from '@/features/animations/variants';

export default function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="certifications" className="section-wrapper relative overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.75), rgba(5, 5, 5, 0.95)), url("/certifications_bg.png")',
          willChange: 'transform, opacity',
        }}
      />

      {/* Dark overlay for extra text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/10 via-dark/40 to-dark pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full glow-circle-thunder pointer-events-none z-[1]" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
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
            — Certifications —
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold font-heading"
          >
            Marks of <span className="text-gradient-fire">Mastery</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-muted max-w-2xl mx-auto"
          >
            Credentials earned through dedicated study and hands-on practice.
          </motion.p>
        </motion.div>

        {/* Desktop: Grid / Mobile: Horizontal scroll */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.div key={cert.id} variants={fadeInUp}>
              <CertFlipCard cert={cert} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CertFlipCard({ cert }: { cert: (typeof CERTIFICATIONS)[0] }) {
  return (
    <div className="flip-card h-[240px] cursor-pointer group">
      <div className="flip-card-inner relative w-full h-full">
        {/* Front */}
        <div className="flip-card-front absolute inset-0 glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-lg">📜</span>
            </div>
            <h3 className="text-lg font-bold font-heading text-light">
              {cert.title}
            </h3>
            <p className="text-sm text-muted mt-1">{cert.issuer}</p>
          </div>
          <p className="text-xs text-muted/50 font-mono">{cert.date}</p>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 glass-card p-6 flex flex-col justify-between border border-primary/20">
          <div>
            <h3 className="text-lg font-bold font-heading text-primary mb-3">
              {cert.title}
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs font-mono text-light/60 bg-white/5 rounded border border-white/5"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted">Issued by {cert.issuer}</p>
          </div>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:text-accent-dim transition-colors"
            >
              <ExternalLink size={14} />
              Verify Credential
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
