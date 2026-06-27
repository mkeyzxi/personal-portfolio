import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache selama 60 detik

const BLOCKED_WORDS = ['spam', 'kasar', 'bodoh', 'jelek', 'idiot', 'bangsat', 'anjing', 'babi'];

function containsBadWords(text: string) {
  const lowerText = text.toLowerCase();
  return BLOCKED_WORDS.some(word => lowerText.includes(word));
}

export async function GET() {
  try {
    const adminDb = getAdminDb();
    // Meminta semua testimonial yang 'approved' saja
    // OrderBy dihapus dari query untuk menghindari error Composite Index di Firestore
    const snapshot = await adminDb.collection('testimonials')
      .where('status', '==', 'approved')
      .get();
    
    if (snapshot.empty) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    const testimonialsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Sorting berdasarkan 'createdAt' (descending) dilakukan di memory (JS)
    testimonialsData.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // descending
    });

    return NextResponse.json(
      { success: true, data: testimonialsData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET /api/testimonials:', error);
    return NextResponse.json(
      { success: false, data: [], message: 'Database error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Harap login terlebih dahulu' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const adminAuth = getAdminAuth();
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (err) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Sesi tidak valid' }, { status: 401 });
    }

    const uid = decodedToken.uid;
    const { message, name, email, avatar, provider } = await request.json();

    // 1. Character validation
    if (!message || message.trim().length < 10) {
      return NextResponse.json({ success: false, message: 'Testimoni minimal 10 karakter' }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ success: false, message: 'Testimoni maksimal 500 karakter' }, { status: 400 });
    }

    // 2. Bad words filtering
    if (containsBadWords(message)) {
      return NextResponse.json({ success: false, message: 'Testimoni mengandung kata-kata yang tidak pantas' }, { status: 400 });
    }

    const adminDb = getAdminDb();

    // 3. Rate limiting (1 per 24 jam)
    // Filter kedua ('createdAt') dipindahkan ke JavaScript array filter untuk menghindari Composite Index error
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const userTestimonialsSnapshot = await adminDb.collection('testimonials')
      .where('uid', '==', uid)
      .get();

    // Lakukan filter data yang di bawah 24 jam di memory
    const hasRecentTestimonial = userTestimonialsSnapshot.docs.some(doc => {
      const data = doc.data();
      return data.createdAt >= oneDayAgo;
    });

    if (hasRecentTestimonial) {
      return NextResponse.json({ success: false, message: 'Rate Limit: Anda hanya dapat mengirim 1 testimoni per 24 jam' }, { status: 429 });
    }

    // Simpan ke database
    const newTestimonial = {
      uid,
      name: name || decodedToken.name || 'Anonymous',
      email: email || decodedToken.email || '',
      avatar: avatar || decodedToken.picture || '',
      provider: provider || 'unknown',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      status: 'approved', // Auto-approve untuk sekarang
      isEdited: false
    };

    const docRef = await adminDb.collection('testimonials').add(newTestimonial);

    return NextResponse.json({ success: true, message: 'Testimoni berhasil ditambahkan', id: docRef.id, data: { id: docRef.id, ...newTestimonial } }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/testimonials:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
