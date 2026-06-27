import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    try {
      await verifyAdminToken(request);
    } catch (e: unknown) {
      if ((e instanceof Error ? e.message : String(e)) === 'UNAUTHORIZED' || (e instanceof Error ? e.message : String(e)) === 'INVALID_TOKEN') {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const adminDb = getAdminDb();
    const snapshot = await adminDb.collection('experiences').get();
    
    const experiencesData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    experiencesData.sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateA - dateB; // ascending
    });

    return NextResponse.json({ success: true, data: experiencesData }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/admin/experiences:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    try {
      await verifyAdminToken(request);
    } catch (e: unknown) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const adminDb = getAdminDb();
    
    const newExperience = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection('experiences').add(newExperience);

    return NextResponse.json({ 
      success: true, 
      data: { id: docRef.id, ...newExperience } 
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error in POST /api/admin/experiences:', error);
    return NextResponse.json({ success: false, message: (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}
