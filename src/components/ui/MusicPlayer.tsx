'use client';

import { useEffect, useRef, useState } from 'react';
import { VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Create audio context on the client side
    const audio = new Audio('/bg-music2.mp3');
    audio.loop = true;
    audio.volume = 0.3; // Low background volume
    audioRef.current = audio;

    // Autoplay trigger
    const startPlay = () => {
      if (!audioRef.current) return;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          cleanListeners();
        })
        .catch(() => {
          // Playback blocked by browser policy (expected on fresh loads)
        });
    };

    const cleanListeners = () => {
      window.removeEventListener('click', startPlay);
      window.removeEventListener('keydown', startPlay);
      window.removeEventListener('scroll', startPlay);
      window.removeEventListener('touchstart', startPlay);
    };

    // Try playing immediately
    startPlay();

    // Register user interaction fallback listeners
    window.addEventListener('click', startPlay);
    window.addEventListener('keydown', startPlay);
    window.addEventListener('scroll', startPlay);
    window.addEventListener('touchstart', startPlay);

    return () => {
      cleanListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Audio playback failed to resume:', err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 select-none">
      <div className="relative flex items-center">
        {/* Sound Toggle Button */}
        <motion.button
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          suppressHydrationWarning
          className="w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer border border-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(214,40,40,0.3)] transition-all duration-300 relative bg-dark/60 backdrop-blur-md"
        >
          {isPlaying ? (
            /* Custom audio visualizer bouncing lines */
            <div className="flex items-end gap-[3px] h-[15px] w-4 justify-center">
              {[
                { delay: '0.1s', duration: '0.6s', maxH: '12px' },
                { delay: '0.3s', duration: '0.8s', maxH: '16px' },
                { delay: '0.5s', duration: '0.5s', maxH: '10px' },
                { delay: '0.2s', duration: '0.7s', maxH: '13px' },
              ].map((bar, idx) => (
                <span
                  key={idx}
                  className="w-[2.5px] bg-primary rounded-full animate-bounce"
                  style={{
                    animationDelay: bar.delay,
                    animationDuration: bar.duration,
                    height: bar.maxH,
                  }}
                />
              ))}
            </div>
          ) : (
            <VolumeX size={18} className="text-muted group-hover:text-light transition-colors" />
          )}

          {/* Pulse animation when playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-25 pointer-events-none" />
          )}
        </motion.button>

        {/* Action Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-14 ml-1 px-3 py-1.5 rounded-lg bg-dark/80 border border-white/5 backdrop-blur-md text-xs font-mono tracking-wider text-light pointer-events-none whitespace-nowrap"
            >
              {isPlaying ? 'MUTE MUSIC' : 'PLAY MUSIC'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
