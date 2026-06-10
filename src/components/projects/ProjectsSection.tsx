'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, ExternalLink, Search, Star } from 'lucide-react';
import { STATIC_PROJECTS, PROJECT_CATEGORIES } from '@/features/constants';
import type { Project } from '@/features/types';
import { cn } from '@/features/lib/utils';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ProjectsSection() {
  const containerRef = useScrollReveal();

  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'newest' | 'featured' | 'alpha'>('featured');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('project-favorites');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('project-favorites', JSON.stringify([...next]));
      return next;
    });
  };

  const filteredProjects = useMemo(() => {
    let results = STATIC_PROJECTS;

    // Category filter
    if (category !== 'all') {
      results = results.filter((p) => p.category === category);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
          (p) =>
              p.title.toLowerCase().includes(q) ||
              p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sort) {
      case 'featured':
        results = [...results].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'alpha':
        results = [...results].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
      default:
        break;
    }

    return results;
  }, [category, search, sort]);

  return (
    <section id="projects" ref={containerRef} className="section-wrapper relative overflow-hidden py-24 md:py-32">
      {/* Background Image with Dark Linear Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: 'linear-gradient(rgba(5, 5, 5, 0.75), rgba(5, 5, 5, 0.95)), url("/projects_bg.png")',
          willChange: 'transform, opacity',
        }}
      />

      {/* Dark overlay for extra text contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-dark/10 via-dark/40 to-dark pointer-events-none" />

      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full glow-circle-accent pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="reveal-title text-accent text-sm font-mono tracking-[0.3em] uppercase mb-3">
            — Projects —
          </p>
          <h2 className="reveal-title text-4xl sm:text-5xl font-bold font-heading">
            Forged in <span className="text-gradient-accent">Code</span>
          </h2>
          <p className="reveal-text mt-4 text-muted max-w-2xl mx-auto">
            Each project is a battle won — built with precision, passion, and purpose.
          </p>
        </div>

        {/* Filters */}
        <div className="reveal-text mb-10 space-y-4">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                suppressHydrationWarning
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer',
                  category === cat.value
                    ? 'bg-accent text-dark'
                    : 'bg-white/5 text-muted hover:text-light hover:bg-white/10 border border-white/5'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search projects or tech..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                suppressHydrationWarning
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-light placeholder:text-muted/50 focus:outline-none focus:border-accent/40 transition-colors"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'newest' | 'featured' | 'alpha')}
              suppressHydrationWarning
              className="px-4 py-2.5 text-sm bg-white/5 border border-white/10 rounded-lg text-muted focus:outline-none focus:border-accent/40 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                isFavorite={favorites.has(project.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-muted py-16">
            No projects found. Try a different filter.
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isFavorite,
  onToggleFavorite,
}: {
  project: Project;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.4,
        delay: index * 0.03,
        ease: 'easeOut',
      }}
      className="group hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="glass-card overflow-hidden h-full flex flex-col relative">
        {/* Project Image / Placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-primary/10 via-dark-card to-accent/5 overflow-hidden">
          {/* Floating animation overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold font-heading text-white/5">
              {project.title.charAt(0)}
            </div>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold text-dark bg-accent rounded-md select-none">
              Featured
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(project.id);
            }}
            suppressHydrationWarning
            className="absolute top-3 right-3 p-2 rounded-full bg-dark/60 backdrop-blur-sm hover:bg-dark/80 transition-colors cursor-pointer"
          >
            <Star
              size={14}
              className={isFavorite ? 'fill-accent text-accent' : 'text-muted'}
            />
          </button>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold font-heading text-light group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-mono text-light/50 bg-white/5 rounded border border-white/5"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-xs font-mono text-muted">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted hover:text-light transition-colors"
              >
                <GitBranch size={14} />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-dim transition-colors"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
