import type { TechItem } from '@/types';

export const techStack: Record<string, TechItem[]> = {
  Frontend: [
    { name: 'Next.js', icon: 'logos:nextjs-icon', category: 'Frontend', level: 'advanced' },
    { name: 'React', icon: 'logos:react', category: 'Frontend', level: 'advanced' },
    { name: 'TypeScript', icon: 'logos:typescript-icon', category: 'Frontend', level: 'intermediate' },
    { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', category: 'Frontend', level: 'advanced' },
  ],
  Backend: [
    { name: 'Node.js', icon: 'logos:nodejs-icon', category: 'Backend', level: 'intermediate' },
    { name: 'Express.js', icon: 'logos:express', category: 'Backend', level: 'intermediate' },
    { name: 'REST API', icon: 'mdi:api', category: 'Backend', level: 'intermediate' },
  ],
  Database: [
    { name: 'Firebase', icon: 'logos:firebase', category: 'Database', level: 'intermediate' },
    { name: 'PostgreSQL', icon: 'logos:postgresql', category: 'Database', level: 'intermediate' },
  ],
  'Tools & DevOps': [
    { name: 'Git', icon: 'logos:git-icon', category: 'Tools & DevOps', level: 'intermediate' },
    { name: 'GitHub', icon: 'logos:github-icon', category: 'Tools & DevOps', level: 'intermediate' },
    { name: 'Vercel', icon: 'logos:vercel-icon', category: 'Tools & DevOps', level: 'intermediate' },
  ],
};
