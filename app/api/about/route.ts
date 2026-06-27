import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { getAdminAuth } from '@/lib/firebase-admin-auth';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const adminDb = getAdminDb();
    
    // Fetch About info
    const docSnap = await adminDb.collection('about').doc('info').get();
    let aboutData = {};
    if (docSnap.exists) {
      aboutData = docSnap.data() || {};
    }

    // Count projects to determine totalProjects dynamically
    const projectsCountSnap = await adminDb.collection('projects').count().get();
    const totalProjects = projectsCountSnap.data().count;

    return NextResponse.json({ 
      success: true, 
      data: {
        ...aboutData,
        totalProjects
      }
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching about data:', error);
    return NextResponse.json(
      { success: false, message: (error instanceof Error ? error.message : String(error)) || 'Failed to fetch about data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verifikasi Token Admin
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    if (!decodedToken) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    // Ambil data dari request body
    const body = await request.json();
    const { location, employmentStatus, education, yearsOfExperience, bio } = body;

    // Validasi data
    if (!location || !employmentStatus || !education || yearsOfExperience === undefined || !bio) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    
    // Simpan ke Firestore document 'about/info'
    await adminDb.collection('about').doc('info').set({
      location,
      employmentStatus,
      education,
      yearsOfExperience: Number(yearsOfExperience),
      bio,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    return NextResponse.json({ success: true, message: 'Data About berhasil diperbarui' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error updating about data:', error);
    return NextResponse.json(
      { success: false, message: (error instanceof Error ? error.message : String(error)) || 'Gagal memperbarui data About' },
      { status: 500 }
    );
  }
}
