import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const runtime = 'nodejs';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id: slug } = resolvedParams;
    const db = getAdminDb();
    
    const snapshot = await db.collection('stories').where('slug', '==', slug).limit(1).get();
    
    if (snapshot.empty) {
      return NextResponse.json({ success: false, message: 'Story not found' }, { status: 404 });
    }

    const storyDoc = snapshot.docs[0];
    return NextResponse.json({ 
      success: true, 
      data: { id: storyDoc.id, ...storyDoc.data() } 
    });
  } catch (error: unknown) {
    console.error('Error fetching story:', error);
    return NextResponse.json({ success: false, message: (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id: slug } = resolvedParams;
    try {
      await verifyAdminToken(request);
    } catch (e: unknown) {
      if ((e instanceof Error ? e.message : String(e)) === 'UNAUTHORIZED' || (e instanceof Error ? e.message : String(e)) === 'INVALID_TOKEN') {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const db = getAdminDb();
    
    const snapshot = await db.collection('stories').where('slug', '==', slug).limit(1).get();
    if (snapshot.empty) {
      return NextResponse.json({ success: false, message: 'Story not found' }, { status: 404 });
    }

    const storyRef = snapshot.docs[0].ref;
    
    const updateData = {
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    // Remove fields that shouldn't be updated directly via PUT like counters
    delete updateData.id;
    delete updateData.likeCount;
    delete updateData.commentCount;
    delete updateData.views;
    delete updateData.createdAt;

    await storyRef.update(updateData);

    return NextResponse.json({ success: true, message: 'Story updated successfully' });
  } catch (error: unknown) {
    console.error('Error updating story:', error);
    return NextResponse.json({ success: false, message: (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id: slug } = resolvedParams;
    try {
      await verifyAdminToken(request);
    } catch (e: unknown) {
      if ((e instanceof Error ? e.message : String(e)) === 'UNAUTHORIZED' || (e instanceof Error ? e.message : String(e)) === 'INVALID_TOKEN') {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const db = getAdminDb();
    const snapshot = await db.collection('stories').where('slug', '==', slug).limit(1).get();
    
    if (snapshot.empty) {
      return NextResponse.json({ success: false, message: 'Story not found' }, { status: 404 });
    }

    const storyDoc = snapshot.docs[0];
    const storyId = storyDoc.id;

    // CASCADING DELETE
    const batch = db.batch();
    
    // 1. Delete Story
    batch.delete(storyDoc.ref);
    
    // 2. Delete all likes
    const likesSnapshot = await db.collection('story_likes').where('storyId', '==', storyId).get();
    likesSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    // 3. Delete all comments
    const commentsSnapshot = await db.collection('story_comments').where('storyId', '==', storyId).get();
    commentsSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return NextResponse.json({ success: true, message: 'Story and all associated data deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting story:', error);
    return NextResponse.json({ success: false, message: (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}
