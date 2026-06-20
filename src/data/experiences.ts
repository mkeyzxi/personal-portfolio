import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    type: 'work',
    company: 'Tech Solutions Inc.',
    position: 'Frontend Developer',
    period: 'Jan 2023 - Sekarang',
    description: 'Mengembangkan aplikasi web responsif menggunakan Next.js dan Tailwind CSS. Berhasil meningkatkan performa load time hingga 40% dan mengimplementasikan fitur aksesibilitas WCAG.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
  },
  {
    id: 'exp-2',
    type: 'work',
    company: 'Digital Creative Agency',
    position: 'Web Developer Intern',
    period: 'Jun 2022 - Des 2022',
    description: 'Membantu tim senior dalam pembuatan landing page untuk berbagai klien. Mempelajari konsep dasar state management dan interaksi API.',
    technologies: ['React', 'CSS', 'JavaScript'],
  },
  {
    id: 'exp-3',
    type: 'organization',
    company: 'Komunitas Web Dev Lokal',
    position: 'Ketua Divisi Teknis',
    period: 'Mar 2021 - Feb 2023',
    description: 'Mengadakan workshop bulanan seputar pengembangan web modern. Memimpin tim beranggotakan 10 orang untuk membangun website profil komunitas.',
  },
  {
    id: 'exp-4',
    type: 'education',
    company: 'Universitas Teknologi Terbuka',
    position: 'S1 Teknik Informatika',
    period: '2019 - 2023',
    description: 'Lulus dengan predikat Cum Laude. Fokus studi pada rekayasa perangkat lunak dan desain antarmuka.',
  },
];
