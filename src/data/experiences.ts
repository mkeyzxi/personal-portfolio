import type { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    type: 'work',
    company: 'UIN Alauddin Makassar',
    position: 'Teaching Assistant for Front-End Web Programming',
    period: 'Okt 2025 - Des 2025',
    description: 'Membimbing mahasiswa dalam teknologi front-end dasar, mengevaluasi lebih dari 21 proyek untuk memperbaiki kesalahan logika dan memberikan solusi debugging, serta memfasilitasi sesi praktikum terkait manipulasi DOM dan desain responsif.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'exp-2',
    type: 'work',
    company: 'Coding Camp (DBS Foundation × Dicoding)',
    position: 'Full-Stack Developer Apprentice',
    period: 'Feb 2025 - Jul 2025',
    description: 'Berkolaborasi dalam tim agile untuk membangun proyek capstone "Cek Jerawat" dengan skor 92.1/100, serta menyiapkan arsitektur frontend untuk penanganan request dan manajemen error pada integrasi API Machine Learning. Menyelesaikan kurikulum intensif selama 910 jam pembelajaran.',
    technologies: ['JavaScript', 'Tailwind CSS'],
  },
  {
    id: 'exp-3',
    type: 'work',
    company: 'PT. Sinar Galesong Pratama',
    position: 'Web Development Intern',
    period: 'Feb 2025 - Mar 2025',
    description: 'Mengembangkan aplikasi web internal perusahaan menggunakan HTML, CSS, JavaScript, dan Laravel. Membangun komponen UI responsif, membantu integrasi backend, serta melakukan debugging untuk memastikan stabilitas sistem di tahap production.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel'],
  },
  {
    id: 'exp-4',
    type: 'organization',
    company: 'GDG on Campus UIN Alauddin Makassar',
    position: 'Core Team, Web Development',
    period: 'Okt 2025 - Sekarang',
    description: 'Membangun situs web resmi komunitas menggunakan React.js, TypeScript, dan Firebase, menerjemahkan prototipe Figma menjadi UI responsif dengan Tailwind CSS. Mempresentasikan platform secara langsung untuk mengumpulkan feedback serta mengelola version control menggunakan Git & GitHub.',
    technologies: ['React.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Git & GitHub'],
  },
  {
    id: 'exp-5',
    type: 'education',
    company: 'Universitas Islam Negeri Alauddin Makassar',
    position: 'Informatics Engineering',
    period: 'Agu 2022 - Sekarang',
    description: 'Menjalani studi dengan IPK 3.81/4.00 serta mempelajari mata kuliah inti seperti Pemrograman Web, Object-Oriented Programming (OOP), Sistem Basis Data, dan Rekayasa Perangkat Lunak. Mempertahankan nilai akademik untuk mempertahankan Beasiswa KIP Kuliah.',
    technologies: ['Web Programming', 'OOP', 'Data Structures & Algorithms', 'Database Systems'],
  },
];
