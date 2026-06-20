import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache selama 60 detik

// GET: Mengambil daftar semua proyek
export async function GET() {
  try {
    const adminDb = getAdminDb();
    const snapshot = await adminDb.collection('projects').orderBy('createdAt', 'desc').get();
    
    if (snapshot.empty) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/projects:', error);
    return NextResponse.json({ success: false, message: 'Database error' }, { status: 500 });
  }
}

// POST: Membuat proyek baru (Terproteksi)
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Verifikasi bahwa token valid (admin yang login)
    if (!decodedToken || !decodedToken.uid) {
      return NextResponse.json({ success: false, message: 'Unauthorized access' }, { status: 403 });
    }

    const body = await request.json();
    const { title, slug, shortDescription, content, category, thumbnail, technologies, githubUrl, liveUrl, featured } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, message: 'Data proyek tidak lengkap' }, { status: 400 });
    }

    // Validasi slug agar tidak mengandung spasi
    if (/\s/.test(slug)) {
      return NextResponse.json({ success: false, message: 'Slug tidak boleh mengandung spasi' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    
    // Cek duplikasi slug
    const existing = await adminDb.collection('projects').where('slug', '==', slug).get();
    if (!existing.empty) {
      return NextResponse.json({ success: false, message: 'Slug sudah digunakan' }, { status: 400 });
    }

    const docRef = await adminDb.collection('projects').add({
      title,
      slug,
      shortDescription,
      content,
      category,
      thumbnail: thumbnail || '',
      technologies: technologies || [],
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      featured: featured || false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Proyek berhasil ditambahkan', id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/projects:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
