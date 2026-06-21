import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    try {
      await verifyAdminToken(request);
    } catch (e: any) {
      if (e.message === 'UNAUTHORIZED' || e.message === 'INVALID_TOKEN') {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const adminDb = getAdminDb();
    const snapshot = await adminDb.collection('testimonials').get();
    
    const testimonialsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    testimonialsData.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // descending
    });

    return NextResponse.json({ success: true, data: testimonialsData }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/admin/testimonials:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
