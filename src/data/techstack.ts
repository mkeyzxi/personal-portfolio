import type { TechItem } from '@/types';

export const techStack: Record<string, TechItem[]> = {
  'Bahasa Pemrograman': [
    { name: 'JavaScript (ES6+)', icon: 'logos:javascript', category: 'Bahasa Pemrograman', level: 'advanced' },
    { name: 'TypeScript', icon: 'logos:typescript-icon', category: 'Bahasa Pemrograman', level: 'intermediate' },
    { name: 'PHP', icon: 'logos:php', category: 'Bahasa Pemrograman', level: 'intermediate' },
    { name: 'Kotlin', icon: 'logos:kotlin-icon', category: 'Bahasa Pemrograman', level: 'intermediate' },
    { name: 'C++', icon: 'logos:c-plusplus', category: 'Bahasa Pemrograman', level: 'intermediate' },
    { name: 'Python', icon: 'logos:python', category: 'Bahasa Pemrograman', level: 'intermediate' },
  ],
  'Frontend & Mobile': [
    { name: 'React.js', icon: 'logos:react', category: 'Frontend & Mobile', level: 'advanced' },
    { name: 'Next.js', icon: 'logos:nextjs-icon', category: 'Frontend & Mobile', level: 'advanced' },
    { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', category: 'Frontend & Mobile', level: 'advanced' },
    { name: 'Livewire', icon: 'logos:laravel', category: 'Frontend & Mobile', level: 'intermediate' },
    { name: 'Flutter', icon: 'logos:flutter', category: 'Frontend & Mobile', level: 'intermediate' },
  ],
  'Backend & Runtime': [
    { name: 'Node.js', icon: 'logos:nodejs-icon', category: 'Backend & Runtime', level: 'intermediate' },
    { name: 'Laravel', icon: 'logos:laravel', category: 'Backend & Runtime', level: 'intermediate' },
    { name: 'Hapi.js', icon: 'logos:hapi', category: 'Backend & Runtime', level: 'intermediate' },
  ],
  'Database & Cloud': [
    { name: 'MySQL', icon: 'logos:mysql', category: 'Database & Cloud', level: 'intermediate' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon', category: 'Database & Cloud', level: 'intermediate' },
    { name: 'Firebase', icon: 'logos:firebase', category: 'Database & Cloud', level: 'advanced' },
    { name: 'Supabase', icon: 'logos:supabase-icon', category: 'Database & Cloud', level: 'intermediate' },
    { name: 'Netlify', icon: 'logos:netlify-icon', category: 'Database & Cloud', level: 'intermediate' },
    { name: 'Vercel', icon: 'logos:vercel-icon', category: 'Database & Cloud', level: 'intermediate' },
  ],
  'Infrastruktur & Tools': [
    { name: 'Vite', icon: 'logos:vitejs', category: 'Infrastruktur & Tools', level: 'intermediate' },
    { name: 'Postman', icon: 'logos:postman-icon', category: 'Infrastruktur & Tools', level: 'intermediate' },
    { name: 'Git', icon: 'logos:git-icon', category: 'Infrastruktur & Tools', level: 'advanced' },
    { name: 'BlockNote', icon: 'mdi:file-document-edit-outline', category: 'Infrastruktur & Tools', level: 'intermediate' },
    { name: 'Google Search Console', icon: 'logos:google-icon', category: 'Infrastruktur & Tools', level: 'intermediate' },
  ],
  'Data, AI & Integrasi': [
    { name: 'Arsitektur RAG', icon: 'carbon:machine-learning-model', category: 'Data, AI & Integrasi', level: 'intermediate' },
    { name: 'HyDE', icon: 'carbon:machine-learning-model', category: 'Data, AI & Integrasi', level: 'intermediate' },
    { name: 'Midtrans', icon: 'mdi:credit-card-outline', category: 'Data, AI & Integrasi', level: 'intermediate' },
  ],
};
