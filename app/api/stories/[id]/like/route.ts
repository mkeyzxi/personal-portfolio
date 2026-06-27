import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { getAdminAuth } from '@/lib/firebase-admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id: storyId } = resolvedParams; // Note: this is storyId, not slug
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const db = getAdminDb();
    const storyRef = db.collection('stories').doc(storyId);
    
    // Ensure story exists
    const storyDoc = await storyRef.get();
    if (!storyDoc.exists) {
      return NextResponse.json({ success: false, message: 'Story not found' }, { status: 404 });
    }

    const likeId = `${storyId}_${userId}`;
    const likeRef = db.collection('story_likes').doc(likeId);

    // Run transaction to toggle like
    const result = await db.runTransaction(async (transaction) => {
      const likeDoc = await transaction.get(likeRef);
      const currentStory = await transaction.get(storyRef);
      const currentLikes = currentStory.data()?.likeCount || 0;

      if (likeDoc.exists) {
        // UNLIKE
        transaction.delete(likeRef);
        transaction.update(storyRef, { likeCount: Math.max(0, currentLikes - 1) });
        return { liked: false, newCount: Math.max(0, currentLikes - 1) };
      } else {
        // LIKE
        transaction.set(likeRef, {
          storyId,
          userId,
          createdAt: new Date().toISOString()
        });
        transaction.update(storyRef, { likeCount: currentLikes + 1 });
        return { liked: true, newCount: currentLikes + 1 };
      }
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: unknown) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ success: false, message: (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}
