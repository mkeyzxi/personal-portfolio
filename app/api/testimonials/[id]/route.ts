import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

const BLOCKED_WORDS = ['spam', 'kasar', 'bodoh', 'jelek', 'idiot', 'bangsat', 'anjing', 'babi'];

function containsBadWords(text: string) {
  const lowerText = text.toLowerCase();
  return BLOCKED_WORDS.some(word => lowerText.includes(word));
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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
    const { message } = await request.json();

    if (!message || message.trim().length < 10) {
      return NextResponse.json({ success: false, message: 'Testimoni minimal 10 karakter' }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ success: false, message: 'Testimoni maksimal 500 karakter' }, { status: 400 });
    }
    if (containsBadWords(message)) {
      return NextResponse.json({ success: false, message: 'Testimoni mengandung kata-kata yang tidak pantas' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    const docRef = adminDb.collection('testimonials').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ success: false, message: 'Testimoni tidak ditemukan' }, { status: 404 });
    }

    const data = docSnap.data();
    const isAdmin = decodedToken.email === process.env.ADMIN_EMAIL;
    if (!isAdmin && data?.uid !== uid) {
      return NextResponse.json({ success: false, message: 'Forbidden: Anda bukan pemilik testimoni ini' }, { status: 403 });
    }

    await docRef.update({
      message: message.trim(),
      updatedAt: new Date().toISOString(),
      isEdited: true
    });

    return NextResponse.json({ success: true, message: 'Testimoni berhasil diperbarui' }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/testimonials/[id]:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
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
    const adminDb = getAdminDb();
    const docRef = adminDb.collection('testimonials').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ success: false, message: 'Testimoni tidak ditemukan' }, { status: 404 });
    }

    const data = docSnap.data();
    const isAdmin = decodedToken.email === process.env.ADMIN_EMAIL;
    if (!isAdmin && data?.uid !== uid) {
      return NextResponse.json({ success: false, message: 'Forbidden: Anda bukan pemilik testimoni ini' }, { status: 403 });
    }

    await docRef.delete();

    return NextResponse.json({ success: true, message: 'Testimoni berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/testimonials/[id]:', error);
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
