import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const adminDb = getAdminDb();
    const experiencesSnapshot = await adminDb
      .collection('experiences')
      .orderBy('createdAt', 'asc')
      .get();

    const experiences = experiencesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, data: experiences }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { success: false, message: (error instanceof Error ? error.message : String(error)) || 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}