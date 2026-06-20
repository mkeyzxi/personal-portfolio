import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Simpan ke Firestore
    const adminDb = getAdminDb();
    const docRef = await adminDb.collection('messages').add({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    });

    return NextResponse.json(
      { success: true, message: 'Pesan berhasil dikirim', id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in /api/contact:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
