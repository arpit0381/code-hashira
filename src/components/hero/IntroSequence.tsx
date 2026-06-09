'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
  const [phase, setPhase] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Phase 0: Logo fade in (0-800ms)
    // Phase 1: Katana slash (800-1600ms)
    // Phase 2: Screen split + embers (1600-2400ms)
    // Phase 3: Reveal (2400-3000ms) → complete

    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const t3 = setTimeout(() => setPhase(3), 2400);
    const t4 = setTimeout(() => onComplete(), 3200);

    timeoutsRef.current = [t1, t2, t3, t4];

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [onComplete]);

  const handleSkip = () => {
    timeoutsRef.current.forEach(clearTimeout);
    onComplete();
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-dark"
    >
      {/* Skip button */}
      <button
        onClick={handleSkip}
        suppressHydrationWarning
        className="absolute top-6 right-6 z-50 px-4 py-2 text-xs text-muted/60 border border-muted/20 rounded-full hover:text-light hover:border-muted/40 transition-colors"
      >
        Skip Intro
      </button>

      {/* Phase 0: Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: phase >= 0 ? 1 : 0,
          scale: phase >= 0 ? 1 : 0.8,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute z-10"
      >
        <div className="text-6xl sm:text-8xl font-bold font-heading tracking-wider">
          <span className="text-primary">A</span>
          <span className="text-light">B</span>
        </div>
      </motion.div>

      {/* Phase 1: Katana Slash */}
      {phase >= 1 && (
        <svg
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="-100"
            y1="540"
            x2="2020"
            y2="540"
            stroke="#D62828"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.line
            x1="-100"
            y1="540"
            x2="2020"
            y2="540"
            stroke="#00FF9C"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0.6 }}
            animate={{ pathLength: 1, opacity: [0.6, 0.6, 0] }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          />
        </svg>
      )}

      {/* Phase 2: Screen Split + Ember Particles */}
      {phase >= 2 && (
        <>
          {/* Top half slides up */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-dark z-30"
          />
          {/* Bottom half slides down */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-dark z-30"
          />

          {/* Ember particles from slash line */}
          <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: '50%',
                  scale: Math.random() * 0.8 + 0.4,
                  opacity: 1,
                }}
                animate={{
                  y: `${50 + (Math.random() - 0.5) * 80}%`,
                  x: `${Math.random() * 100}%`,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: Math.random() * 1 + 0.5,
                  ease: 'easeOut',
                }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: i % 3 === 0 ? '#D62828' : i % 3 === 1 ? '#F97316' : '#EAB308',
                  boxShadow: `0 0 6px ${i % 3 === 0 ? '#D62828' : '#F97316'}`,
                }}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
