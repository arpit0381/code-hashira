// ============================================================
// Arpit Bajpai Portfolio — TypeScript Type Definitions
// ============================================================

export type BreathingStyle = 
  | 'water' 
  | 'flame' 
  | 'thunder' 
  | 'mist' 
  | 'wind' 
  | 'stone';

export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface BreathingSkillGroup {
  style: BreathingStyle;
  name: string;
  subtitle: string;
  color: string;
  glowColor: string;
  skills: Skill[];
}

export interface TimelineNode {
  id: string;
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  contributions: string[];
  techStack: string[];
  logo?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  imageUrl?: string;
  caseStudy?: string;
  createdAt?: string;
}

export type ProjectCategory = 
  | 'fullstack' 
  | 'ai' 
  | 'webapp' 
  | 'automation' 
  | 'iot';

export interface Contact {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status?: 'pending' | 'read' | 'replied';
  createdAt?: string;
}

export interface Resume {
  id: string;
  fileUrl: string;
  version?: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  email: string;
  role: 'visitor' | 'admin';
  createdAt: string;
}

export interface Achievement {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  thumbnail?: string;
  skills: string[];
  verifyUrl?: string;
  date?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  quote: string;
}

export interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}
