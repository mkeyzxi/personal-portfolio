import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const runtime = 'nodejs';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    try {
      await verifyAdminToken(request);
    } catch (e: unknown) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: 'Status is required' }, { status: 400 });
    }

    const adminDb = getAdminDb();
    const docRef = adminDb.collection('testimonials').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ success: false, message: 'Testimoni tidak ditemukan' }, { status: 404 });
    }

    await docRef.update({
      status,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: 'Status testimoni berhasil diperbarui' }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/admin/testimonials/[id]:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    try {
      await verifyAdminToken(request);
    } catch (e: unknown) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const adminDb = getAdminDb();
    const docRef = adminDb.collection('testimonials').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ success: false, message: 'Testimoni tidak ditemukan' }, { status: 404 });
    }

    await docRef.delete();

    return NextResponse.json({ success: true, message: 'Testimoni berhasil dihapus' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/admin/testimonials/[id]:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
