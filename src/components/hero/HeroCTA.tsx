'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Mail, Download } from 'lucide-react';

export default function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
      {/* View Projects */}
      <a href="#projects" className="group relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-8 py-3.5 bg-primary/90 hover:bg-primary text-white font-semibold rounded-lg transition-colors duration-200"
        >
          <ArrowDown size={16} className="group-hover:animate-bounce" />
          View Projects
        </motion.div>
        {/* Sword slash underline on hover */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary group-hover:w-4/5 transition-all duration-300 ease-out" />
      </a>

      {/* Hire Me */}
      <a href="#contact" className="group relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-8 py-3.5 border border-accent/40 hover:border-accent text-accent hover:bg-accent/5 font-semibold rounded-lg transition-all duration-200"
        >
          <Mail size={16} />
          Hire Me
        </motion.div>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent group-hover:w-4/5 transition-all duration-300 ease-out" />
      </a>

      {/* Download Resume */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        suppressHydrationWarning
        onClick={() => {
          // TODO: Fetch from Supabase resume table
          window.open('/resume.pdf', '_blank');
        }}
        className="group relative flex items-center gap-2 px-8 py-3.5 border border-white/10 hover:border-white/30 text-muted hover:text-light font-semibold rounded-lg transition-all duration-200"
      >
        <Download size={16} />
        Resume
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-white/50 group-hover:w-4/5 transition-all duration-300 ease-out" />
      </motion.button>
    </div>
  );
}
