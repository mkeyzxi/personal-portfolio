import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const runtime = 'nodejs';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Mengambil satu proyek berdasarkan ID
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID diperlukan' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    const docRef = adminDb.collection('projects').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ success: false, message: 'Proyek tidak ditemukan' }, { status: 404 });
    }

    const project = { id: docSnap.id, ...docSnap.data() };
    
    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/projects/[id]:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update data proyek (Terproteksi)
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    // 1. Verifikasi token admin
    try {
      await verifyAdminToken(request);
    } catch (e: unknown) {
      if ((e instanceof Error ? e.message : String(e)) === 'UNAUTHORIZED' || (e instanceof Error ? e.message : String(e)) === 'INVALID_TOKEN') {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID diperlukan' }, { status: 400 });
    }

    const body = await request.json();
    const { title, slug, shortDescription, content, category, thumbnail, technologies, githubUrl, liveUrl, featured, readmeContent } = body;

    // 2. Validasi input dasar
    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, message: 'Data proyek tidak lengkap' }, { status: 400 });
    }

    // Validasi slug agar tidak mengandung spasi
    if (/\s/.test(slug)) {
      return NextResponse.json({ success: false, message: 'Slug tidak boleh mengandung spasi' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    
    // Cek apakah proyek dengan ID ini ada
    const docRef = adminDb.collection('projects').doc(id);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      return NextResponse.json({ success: false, message: 'Proyek tidak ditemukan' }, { status: 404 });
    }

    // Cek duplikasi slug (kecuali slug milik proyek ini sendiri)
    const existing = await adminDb.collection('projects').where('slug', '==', slug).get();
    const isDuplicateSlug = !existing.empty && existing.docs.some(doc => doc.id !== id);
    
    if (isDuplicateSlug) {
      return NextResponse.json({ success: false, message: 'Slug sudah digunakan oleh proyek lain' }, { status: 400 });
    }

    // 3. Update dokumen
    await docRef.update({
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
      readmeContent: readmeContent || null,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: 'Proyek berhasil diperbarui' }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/projects/[id]:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
