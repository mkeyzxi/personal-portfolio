const admin = require('firebase-admin');
import * as path from 'path';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace literal \n with actual newlines
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

const seedData = [
  {
    type: 'work',
    company: 'UIN Alauddin Makassar',
    position: 'Teaching Assistant for Front-End Web Programming',
    period: 'Okt 2025 - Des 2025',
    description: 'Mengevaluasi 21+ proyek mahasiswa dengan mengidentifikasi kesalahan logika dan memberikan solusi debugging spesifik.\nMemfasilitasi sesi lab praktikum berbasis real-world scenario dengan fokus pada manipulasi DOM dan desain responsif.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    createdAt: new Date('2025-10-01').toISOString(),
  },
  {
    type: 'work',
    company: 'Coding Camp (DBS Foundation × Dicoding)',
    position: 'Full-Stack Developer Apprentice',
    period: 'Feb 2025 - Jul 2025',
    description: 'Berkolaborasi dalam tim agile membangun PWA "Cek Jerawat", mencapai skor Capstone Project 92.1/100 (Grade A).\nMerancang arsitektur frontend untuk integrasi API Machine Learning, mencakup penanganan request, aliran data, dan manajemen error-state.',
    technologies: ['JavaScript', 'Tailwind CSS'],
    createdAt: new Date('2025-02-01').toISOString(),
  },
  {
    type: 'work',
    company: 'PT. Sinar Galesong Pratama',
    position: 'Web Development Intern',
    period: 'Feb 2025 - Mar 2025',
    description: 'Membangun komponen UI responsif dan fitur dinamis untuk aplikasi internal operasional perusahaan.\nMelakukan debugging dan testing untuk memastikan stabilitas serta kegunaan aplikasi di lingkungan production.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel'],
    createdAt: new Date('2025-02-15').toISOString(),
  },
  {
    type: 'organization',
    company: 'GDG on Campus UIN Alauddin Makassar',
    position: 'Core Team, Web Development',
    period: 'Okt 2025 - Sekarang',
    description: 'Menerjemahkan prototipe Figma menjadi antarmuka UI pixel-perfect dan responsif untuk situs web resmi komunitas (gdgoc-uinam.web.app).\nMengelola version control dan deployment pipeline menggunakan Git & GitHub untuk mempercepat siklus rilis dan kolaborasi tim.',
    technologies: ['React.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Git'],
    createdAt: new Date('2025-10-05').toISOString(),
  },
  {
    type: 'education',
    company: 'Universitas Islam Negeri Alauddin Makassar',
    position: 'Informatics Engineering (S1)',
    period: 'Agu 2022 - Sekarang',
    description: 'IPK: 3.81 / 4.00 (Penerima Beasiswa Penuh KIP Kuliah).\nFokus Riset Skripsi: Evaluasi Performa Retrieval RAG dan HyDE pada Query Pendek.\nMata Kuliah Inti: Web Programming, OOP, Data Structures & Algorithms, Software Engineering, Database Systems.',
    technologies: ['Web Programming', 'OOP', 'Data Structures & Algorithms', 'Software Engineering', 'Database Systems'],
    createdAt: new Date('2022-08-01').toISOString(),
  },
  {
    type: 'certificate',
    company: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    position: 'Junior Web Developer',
    period: 'Mei 2024 - 2027',
    description: '',
    credentialUrl: '#',
    createdAt: new Date('2024-05-01').toISOString(),
  },
  {
    type: 'certificate',
    company: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    position: 'Junior Associate Data Scientist',
    period: 'Sep 2025 - 2028',
    description: '',
    credentialUrl: '#',
    createdAt: new Date('2025-09-01').toISOString(),
  },
  {
    type: 'certificate',
    company: 'Hacktiv8 Indonesia',
    position: 'LLM-Based Tools and Gemini API Integration for Data Scientists',
    period: 'Nov 2025',
    description: '',
    credentialUrl: '#',
    createdAt: new Date('2025-11-01').toISOString(),
  },
  {
    type: 'certificate',
    company: 'Dicoding Indonesia',
    position: 'Belajar Pengembangan Web Intermediate',
    period: 'Jun 2025',
    description: '',
    credentialUrl: '#',
    createdAt: new Date('2025-06-01').toISOString(),
  },
  {
    type: 'certificate',
    company: 'Dicoding Indonesia',
    position: 'Belajar Fundamental Front-End Web Development',
    period: 'Apr 2025',
    description: '',
    credentialUrl: '#',
    createdAt: new Date('2025-04-01').toISOString(),
  }
];

async function migrate() {
  const batch = db.batch();
  
  // Clear existing
  const existing = await db.collection('experiences').get();
  existing.docs.forEach((doc: any) => batch.delete(doc.ref));

  // Insert new
  seedData.forEach(exp => {
    const docRef = db.collection('experiences').doc();
    batch.set(docRef, { ...exp, updatedAt: new Date().toISOString() });
  });

  await batch.commit();
  console.log('Migration completed successfully!');
  process.exit(0);
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
