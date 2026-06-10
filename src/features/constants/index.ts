// ============================================================
// Arpit Bajpai Portfolio — Constants & Content Data
// ============================================================

import type {
  NavLink,
  BreathingSkillGroup,
  TimelineNode,
  Experience,
  Project,
  Achievement,
  Certification,
  Testimonial,
} from '@/features/types';

// ── Color Tokens ──────────────────────────────────────────────
export const COLORS = {
  primary: '#D62828',
  secondary: '#111111',
  accent: '#00FF9C',
  dark: '#050505',
  light: '#FFFFFF',
  // Breathing style colors
  water: '#3B82F6',
  flame: '#F97316',
  thunder: '#EAB308',
  mist: '#8B5CF6',
  wind: '#22C55E',
  stone: '#78716C',
} as const;

// ── Navigation Links ──────────────────────────────────────────
export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home', sectionId: 'home' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Skills', href: '#skills', sectionId: 'skills' },
  { label: 'Experience', href: '#experience', sectionId: 'experience' },
  { label: 'Projects', href: '#projects', sectionId: 'projects' },
  { label: 'Certifications', href: '#certifications', sectionId: 'certifications' },
  { label: 'AI Lab', href: '#ai-lab', sectionId: 'ai-lab' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
];

// ── Section IDs ───────────────────────────────────────────────
export const SECTION_IDS = [
  'home', 'about', 'skills', 'experience',
  'projects', 'certifications', 'ai-lab', 'contact',
] as const;

// ── Skills — Breathing Styles ─────────────────────────────────
export const BREATHING_SKILLS: BreathingSkillGroup[] = [
  {
    style: 'water',
    name: 'Water Breathing',
    subtitle: 'Frontend Mastery',
    color: COLORS.water,
    glowColor: 'rgba(59, 130, 246, 0.4)',
    skills: [
      { name: 'React', level: 92 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    style: 'flame',
    name: 'Flame Breathing',
    subtitle: 'Backend Power',
    color: COLORS.flame,
    glowColor: 'rgba(249, 115, 22, 0.4)',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 85 },
      { name: 'FastAPI', level: 80 },
      { name: 'Python', level: 90 },
    ],
  },
  {
    style: 'thunder',
    name: 'Thunder Breathing',
    subtitle: 'Core Languages',
    color: COLORS.thunder,
    glowColor: 'rgba(234, 179, 8, 0.4)',
    skills: [
      { name: 'JavaScript', level: 93 },
      { name: 'TypeScript', level: 88 },
      { name: 'DSA', level: 75 },
      { name: 'C/C++', level: 70 },
    ],
  },
  {
    style: 'mist',
    name: 'Mist Breathing',
    subtitle: 'AI & Machine Learning',
    color: COLORS.mist,
    glowColor: 'rgba(139, 92, 246, 0.4)',
    skills: [
      { name: 'TensorFlow', level: 78 },
      { name: 'OpenAI API', level: 85 },
      { name: 'LangChain', level: 80 },
      { name: 'Machine Learning', level: 82 },
    ],
  },
  {
    style: 'wind',
    name: 'Wind Breathing',
    subtitle: 'DevOps & Tools',
    color: COLORS.wind,
    glowColor: 'rgba(34, 197, 94, 0.4)',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'Linux', level: 80 },
      { name: 'CI/CD', level: 72 },
    ],
  },
  {
    style: 'stone',
    name: 'Stone Breathing',
    subtitle: 'Databases & Storage',
    color: COLORS.stone,
    glowColor: 'rgba(120, 113, 108, 0.4)',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'Supabase', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'Redis', level: 70 },
    ],
  },
];

// ── About Timeline ────────────────────────────────────────────
export const TIMELINE_NODES: TimelineNode[] = [
  {
    id: 'intro',
    year: '2004',
    title: 'The Beginning',
    description:
      'Born with an insatiable curiosity for how things work. From disassembling gadgets to building my first PC, the path was always clear — technology was my calling.',
  },
  {
    id: 'bca',
    year: '2022',
    title: 'BCA Journey Begins',
    description:
      'Enrolled in Bachelor of Computer Applications. What started as formal education quickly became a launchpad for real-world engineering and innovation.',
  },
  {
    id: 'coding',
    year: '2022',
    title: 'First Lines of Code',
    description:
      'Wrote my first "Hello, World!" and never looked back. HTML, CSS, JavaScript — the holy trinity that opened the gates to the digital universe.',
  },
  {
    id: 'hackathon',
    year: '2023',
    title: 'Hackathon Arena',
    description:
      'Competed in my first hackathon and discovered the thrill of building under pressure. 48 hours of pure creation, collaboration, and caffeinated innovation.',
  },
  {
    id: 'first-project',
    year: '2023',
    title: 'First Real Project',
    description:
      'Shipped my first production application — a full-stack web platform that real users depended on. The feeling of deploying to production? Unmatched.',
  },
  {
    id: 'ai-ml',
    year: '2024',
    title: 'AI & ML Deep Dive',
    description:
      'Dove headfirst into artificial intelligence and machine learning. TensorFlow, neural networks, NLP — transforming data into intelligence became my new obsession.',
  },
  {
    id: 'future',
    year: '2025+',
    title: 'Building the Future',
    description:
      'The mission is clear: build products that matter. From founding startups to engineering AI solutions, every line of code is a step toward shaping the future.',
  },
];

// ── Experience ────────────────────────────────────────────────
export const EXPERIENCES: Experience[] = [
  {
    id: 'sulax-solar',
    company: 'Sulax Solar Industries',
    role: 'Website Developer',
    period: 'July 2024 — Present',
    description:
      'Created a professional and visually engaging website for a solar energy company, highlighting services, ongoing projects, and government subsidy schemes.',
    contributions: [
      'Collaborated with the marketing team to align web design with brand identity and promotional strategies.',
      'Developed a user-friendly UI/UX with intuitive navigation, enhancing visitor retention and engagement.',
      'Built a highly performant and responsive frontend for the solar energy website.',
    ],
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    id: 'posterwa',
    company: 'Posterwa',
    role: 'Sales Captain',
    period: 'Jan 2024 — Jan 2025',
    description:
      'Led regional poster sales campaigns across college events, achieving 200% sales target within 2 months.',
    contributions: [
      'Developed creative marketing strategies, social campaigns, and partnership pitches for event promotion.',
      'Built strong networking and leadership skills while interacting with customers.',
      'Gained deep experience in marketing, product pitching, and event planning.',
    ],
    techStack: ['Leadership', 'Sales', 'Marketing', 'Communication'],
  },
];

// ── Projects (Static Fallback) ────────────────────────────────
export const STATIC_PROJECTS: Project[] = [
  {
    id: 'formstuff',
    title: 'FormStuff',
    description:
      'A dynamic web application to simplify form creation and management. Built from the ground up for seamless user experience.',
    category: 'fullstack',
    techStack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: 'https://formstuff.in',
    featured: true,
    imageUrl: '/formstuffp.png',
  },
  {
    id: 'lifereceipt',
    title: 'LifeReceipt (Mobile App)',
    description:
      'A mobile application for tracking and organizing receipts. Focuses on streamlined performance and intuitive mobile UI.',
    category: 'webapp',
    techStack: ['Flutter', 'Dart', 'Firebase'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: 'https://lifereceipt.in',
    featured: true,
    imageUrl: '/projects/cms.jpg',
  },
  {
    id: 'sulax-solar',
    title: 'Sulax Solar Website',
    description:
      'Professional website for a solar energy company highlighting services, ongoing projects, and government subsidy schemes.',
    category: 'fullstack',
    techStack: ['React.js', 'Next.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: 'https://sulaxsolar.com',
    featured: true,
    imageUrl: '/projects/iot.jpg',
  },
  {
    id: 'om-power',
    title: 'Om Power Solution',
    description:
      'Corporate website for Om Power Solutions, built for scale and providing detailed information about their enterprise solutions.',
    category: 'fullstack',
    techStack: ['React.js', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: false,
    imageUrl: '/projects/devops.jpg',
  },
  {
    id: 'ignitia',
    title: 'PSIT’S Ignitia 2K26 Website',
    description:
      'The official technical and cultural fest website for PSIT, developed to handle high traffic and event registrations.',
    category: 'fullstack',
    techStack: ['Next.js', 'PostgreSQL', 'GO'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: false,
    imageUrl: '/projects/ai-study.jpg',
  },
  {
    id: 'clubsphere',
    title: 'ClubSphere',
    description:
      'A platform designed to connect students with college clubs and manage memberships effectively.',
    category: 'fullstack',
    techStack: ['React.js', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: 'https://clubsphere.in',
    featured: false,
    imageUrl: '/projects/neural.jpg',
  },
  {
    id: 'ai-companion',
    title: 'AI Study Companion',
    description:
      'An intelligent study platform powered by AI that generates personalized study plans, quizzes, and explanations based on uploaded material.',
    category: 'ai',
    techStack: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'LangChain'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: true,
    imageUrl: '/projects/ai-study.jpg',
  },
];

// ── Achievements ──────────────────────────────────────────────
export const ACHIEVEMENTS: Achievement[] = [
  { id: 'projects', value: 15, suffix: '+', label: 'Projects Completed', icon: '🚀' },
  { id: 'hackathons', value: 8, suffix: '+', label: 'Hackathons', icon: '⚔️' },
  { id: 'clients', value: 10, suffix: '+', label: 'Happy Clients', icon: '🤝' },
  { id: 'technologies', value: 20, suffix: '+', label: 'Technologies', icon: '💻' },
  { id: 'certificates', value: 12, suffix: '+', label: 'Certificates', icon: '📜' },
];

// ── Certifications ────────────────────────────────────────────
export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'HTML, CSS & JavaScript',
    issuer: 'Infosys Springboard',
    skills: ['HTML', 'CSS', 'JavaScript'],
    verifyUrl: '#',
    date: '2023',
  },
  {
    id: 'cert-2',
    title: 'Programming in C',
    issuer: 'Infosys Springboard',
    skills: ['C Programming', 'Problem Solving'],
    verifyUrl: '#',
    date: '2023',
  },
  {
    id: 'cert-3',
    title: 'Basics of Python',
    issuer: 'Infosys Springboard',
    skills: ['Python', 'Data Structures'],
    verifyUrl: '#',
    date: '2023',
  },
  {
    id: 'cert-4',
    title: 'Power BI',
    issuer: 'Udemy',
    skills: ['Power BI', 'Data Visualization', 'Analytics'],
    verifyUrl: '#',
    date: '2024',
  },
  {
    id: 'cert-5',
    title: 'Node.js',
    issuer: 'Udemy',
    skills: ['Node.js', 'Backend Development', 'API Design'],
    verifyUrl: '#',
    date: '2024',
  },
  {
    id: 'cert-6',
    title: 'Technology Job Simulation',
    issuer: 'Deloitte',
    skills: ['Technology Strategy', 'Consulting'],
    verifyUrl: '#',
    date: '2024',
  },
];

// ── Testimonials ──────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Deepanshu Bajpai',
    role: 'CEO',
    company: 'Sulax Solar',
    quote:
      'Arpit delivered an exceptional, professional website for our solar energy business. His intuitive design and seamless user experience have significantly enhanced our brand presence and customer engagement.',
  },
  {
    id: 'test-2',
    name: 'Krishna Bajpai',
    role: 'Founder and CEO',
    company: 'Posterwa',
    quote:
      'As our Sales Captain, Arpit exceeded expectations by achieving a 200% sales target in just two months. His strategic marketing campaigns and strong leadership skills are truly outstanding.',
  },
  {
    id: 'test-3',
    name: 'Pawan Dubey',
    role: 'Founder',
    company: 'Triveni Road Lines',
    quote:
      'Working with Arpit has been a fantastic experience. He brings technical brilliance, reliability, and a deep understanding of business needs to every project he takes on.',
  },
];

// ── Suggested AI Chat Questions ───────────────────────────────
export const SUGGESTED_QUESTIONS = [
  'What can Arpit build?',
  'Tell me about his AI projects',
  'Is he available for hire?',
  'What technologies does he know?',
  'What are his greatest achievements?',
];

// ── Konami Code ───────────────────────────────────────────────
export const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

// ── Social Links ──────────────────────────────────────────────
export const SOCIAL_LINKS = {
  github: 'https://github.com/arpit0381',
  linkedin: 'https://linkedin.com/in/arpitbajpai',
  twitter: 'https://twitter.com/arpitbajpai',
  email: 'arpitbajpaio38@gmail.com',
} as const;

// ── Project Categories ────────────────────────────────────────
export const PROJECT_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'ai', label: 'AI Projects' },
  { value: 'webapp', label: 'Web Apps' },
  { value: 'automation', label: 'Automation' },
  { value: 'iot', label: 'IoT' },
] as const;
