import type { StoryMilestone } from '@/types';

export const story: StoryMilestone[] = [
  {
    id: 'story-1',
    year: '2019',
    title: 'Awal Ketertarikan',
    description: 'Pertama kali menyentuh HTML dan CSS. Terpesona oleh bagaimana baris kode bisa berubah menjadi tampilan visual yang interaktif.',
    icon: 'TerminalSquare',
  },
  {
    id: 'story-2',
    year: '2020',
    title: 'Eksplorasi JavaScript',
    description: 'Mulai memahami logika pemrograman dengan JavaScript vanilla. Membuat aplikasi kalkulator dan to-do list pertama.',
    icon: 'Code',
  },
  {
    id: 'story-3',
    year: '2021',
    title: 'Mengenal React & Frontend Modern',
    description: 'Belajar React.js dan menyadari betapa mudahnya membangun UI berbasis komponen.',
    icon: 'MonitorSmartphone',
    highlight: true,
  },
  {
    id: 'story-4',
    year: '2023',
    title: 'Masuk ke Dunia Full Stack',
    description: 'Menguasai Next.js dan Firebase. Membangun aplikasi produksi pertama untuk klien nyata.',
    icon: 'Rocket',
    highlight: true,
  },
];
