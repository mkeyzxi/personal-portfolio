import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const adminDb = getAdminDb();
    
    // Check if it already exists to prevent accidental overwrites?
    // User requested to seed the exact initial data. We can just set it.
    await adminDb.collection('about').doc('info').set({
      location: 'Indonesia, Makassar',
      employmentStatus: 'Freelance',
      education: 'Informatics Engineering Student',
      yearsOfExperience: 3,
      bio: 'Halo! Saya adalah seorang pengembang perangkat lunak yang memiliki hasrat mendalam terhadap desain antarmuka dan arsitektur sistem. Fokus utama saya adalah membangun aplikasi web yang **cepat, aman, dan mudah diakses** oleh semua orang.\n\nBerbekal pengalaman dengan ekosistem modern seperti React, Next.js, dan infrastruktur serverless (Firebase/Vercel), saya menikmati proses menerjemahkan masalah bisnis yang kompleks menjadi solusi teknis yang elegan.\n\nKetika saya tidak sedang berhadapan dengan layar editor kode, saya biasanya menghabiskan waktu mempelajari teknologi baru, berkontribusi pada proyek *open source*, atau sekadar meracik kopi yang sempurna.',
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: 'Seeding About data success!' }, { status: 200 });

  } catch (error: any) {
    console.error('Error seeding about data:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to seed about data' },
      { status: 500 }
    );
  }
}
