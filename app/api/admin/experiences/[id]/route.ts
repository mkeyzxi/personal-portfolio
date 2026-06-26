import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    try {
      await verifyAdminToken(request);
    } catch (e: any) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const adminDb = getAdminDb();
    
    const updateData = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await adminDb.collection('experiences').doc(id).update(updateData);

    return NextResponse.json({ success: true, message: 'Experience updated successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error in PUT /api/admin/experiences/[id]:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    try {
      await verifyAdminToken(request);
    } catch (e: any) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const adminDb = getAdminDb();

    await adminDb.collection('experiences').doc(id).delete();

    return NextResponse.json({ success: true, message: 'Experience deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error in DELETE /api/admin/experiences/[id]:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
