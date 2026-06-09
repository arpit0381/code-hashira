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
    id: 'catalyst-crew',
    company: 'Catalyst Crew',
    role: 'Founder & Technical Lead',
    period: 'Jan 2024 — Present',
    description:
      'Founded a tech collective focused on building innovative digital products. Lead a team of developers and designers to deliver high-quality solutions.',
    contributions: [
      'Architected and deployed 5+ production applications',
      'Led a team of 8 developers across multiple projects',
      'Established agile development workflows and CI/CD pipelines',
      'Grew community to 50+ active contributors',
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'Supabase', 'Docker'],
  },
  {
    id: 'dilootiee',
    company: 'Dilootiee',
    role: 'Full Stack Developer',
    period: 'Jun 2023 — Dec 2023',
    description:
      'Developed and maintained web applications for a growing startup. Implemented new features, optimized performance, and contributed to system architecture.',
    contributions: [
      'Built responsive e-commerce platform from scratch',
      'Reduced page load time by 40% through optimization',
      'Integrated payment gateway and order management system',
      'Implemented real-time notification system',
    ],
    techStack: ['React', 'Express', 'MongoDB', 'Tailwind CSS', 'Redis'],
  },
  {
    id: 'hackathons',
    company: 'Hackathon Circuit',
    role: 'Competitor & Mentor',
    period: '2023 — Present',
    description:
      'Active participant in national and international hackathons. Built innovative solutions under extreme time constraints and mentored junior participants.',
    contributions: [
      'Participated in 8+ hackathons nationally',
      'Won awards at multiple competitions',
      'Built AI-powered solutions in 24-48 hour sprints',
      'Mentored 20+ junior developers',
    ],
    techStack: ['Python', 'FastAPI', 'TensorFlow', 'React', 'OpenAI'],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Independent Developer',
    period: '2023 — Present',
    description:
      'Delivered custom web solutions for clients across various industries. From MVPs to full-scale platforms, each project pushed the boundaries of what\'s possible.',
    contributions: [
      'Delivered 10+ client projects on time and budget',
      'Specialized in full-stack web applications and AI integrations',
      'Maintained 100% client satisfaction rate',
      'Generated ₹2L+ in freelance revenue',
    ],
    techStack: ['Next.js', 'Python', 'Supabase', 'OpenAI API', 'Vercel'],
  },
];

// ── Projects (Static Fallback) ────────────────────────────────
export const STATIC_PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'AI Study Companion',
    description:
      'An intelligent study platform powered by OpenAI that generates personalized study plans, quizzes, and explanations based on uploaded course material.',
    category: 'ai',
    techStack: ['Next.js', 'OpenAI API', 'Supabase', 'Tailwind CSS', 'LangChain'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: true,
    imageUrl: '/projects/ai-study.jpg',
  },
  {
    id: 'project-2',
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce platform with real-time inventory management, payment processing, and an admin dashboard for store management.',
    category: 'fullstack',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: true,
    imageUrl: '/projects/ecommerce.jpg',
  },
  {
    id: 'project-3',
    title: 'Portfolio CMS',
    description:
      'A headless CMS specifically designed for developer portfolios with real-time preview, markdown support, and automatic deployment.',
    category: 'webapp',
    techStack: ['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: false,
    imageUrl: '/projects/cms.jpg',
  },
  {
    id: 'project-4',
    title: 'Smart Home Dashboard',
    description:
      'IoT dashboard for monitoring and controlling smart home devices. Real-time data visualization with MQTT protocol integration.',
    category: 'iot',
    techStack: ['React', 'Python', 'MQTT', 'InfluxDB', 'Grafana'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: false,
    imageUrl: '/projects/iot.jpg',
  },
  {
    id: 'project-5',
    title: 'DevOps Pipeline Automator',
    description:
      'Automated CI/CD pipeline generator that creates GitHub Actions workflows based on project analysis and best practices.',
    category: 'automation',
    techStack: ['Python', 'Docker', 'GitHub Actions', 'Shell', 'YAML'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: true,
    imageUrl: '/projects/devops.jpg',
  },
  {
    id: 'project-6',
    title: 'Neural Style Transfer App',
    description:
      'Apply artistic styles to photos using deep neural networks. Real-time processing with model optimization for mobile devices.',
    category: 'ai',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker'],
    githubUrl: 'https://github.com/arpit-bajpai',
    liveUrl: '#',
    featured: false,
    imageUrl: '/projects/neural.jpg',
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
    title: 'Full Stack Web Development',
    issuer: 'Udemy',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    verifyUrl: '#',
    date: '2023',
  },
  {
    id: 'cert-2',
    title: 'Machine Learning Specialization',
    issuer: 'Coursera',
    skills: ['Python', 'TensorFlow', 'Neural Networks', 'Scikit-Learn'],
    verifyUrl: '#',
    date: '2024',
  },
  {
    id: 'cert-3',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    skills: ['AWS', 'Cloud Computing', 'S3', 'Lambda'],
    verifyUrl: '#',
    date: '2024',
  },
  {
    id: 'cert-4',
    title: 'Python for Data Science',
    issuer: 'IBM',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization'],
    verifyUrl: '#',
    date: '2023',
  },
  {
    id: 'cert-5',
    title: 'React Advanced Patterns',
    issuer: 'Frontend Masters',
    skills: ['React', 'Hooks', 'Performance', 'Architecture'],
    verifyUrl: '#',
    date: '2024',
  },
  {
    id: 'cert-6',
    title: 'Docker & Kubernetes',
    issuer: 'Linux Foundation',
    skills: ['Docker', 'Kubernetes', 'Containers', 'Orchestration'],
    verifyUrl: '#',
    date: '2024',
  },
];

// ── Testimonials ──────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rahul Sharma',
    role: 'CTO',
    company: 'TechStart India',
    quote:
      'Arpit delivered our entire platform in half the expected time. His code quality and attention to detail are exceptional. One of the most talented young developers I\'ve worked with.',
  },
  {
    id: 'test-2',
    name: 'Priya Patel',
    role: 'Product Manager',
    company: 'InnovateLabs',
    quote:
      'Working with Arpit was a game-changer for our product. He didn\'t just write code — he understood our vision and translated it into a product that users love.',
  },
  {
    id: 'test-3',
    name: 'Amit Kumar',
    role: 'Founder',
    company: 'DataFlow AI',
    quote:
      'Arpit\'s AI and ML expertise is way beyond his years. He built our recommendation engine from scratch and it increased user engagement by 3x. Highly recommended.',
  },
  {
    id: 'test-4',
    name: 'Sarah Chen',
    role: 'Engineering Lead',
    company: 'GlobalTech',
    quote:
      'A rare combination of technical brilliance and design sensibility. Arpit builds applications that are both powerful under the hood and beautiful on the surface.',
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
  github: 'https://github.com/arpit-bajpai',
  linkedin: 'https://linkedin.com/in/arpit-bajpai',
  twitter: 'https://twitter.com/arpit_bajpai',
  email: 'arpit@example.com',
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
