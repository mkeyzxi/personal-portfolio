import { NextResponse } from 'next/server';
import { getAdminDb, getAdminAuth } from '@/lib/firebase-admin';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id: storyId } = resolvedParams;
    const db = getAdminDb();
    
    // We order by createdAt. Might require an index on storyId and createdAt.
    const commentsSnapshot = await db.collection('story_comments')
      .where('storyId', '==', storyId)
      .orderBy('createdAt', 'desc')
      .get();
      
    const comments = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: comments });
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    
    if (error.code === 9) { // FAILED_PRECONDITION: Index required
      const resolvedParams = await params;
      const { id: storyId } = resolvedParams;
      const db = getAdminDb();
      const commentsSnapshot = await db.collection('story_comments')
        .where('storyId', '==', storyId)
        .get();
        
      const allComments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      const sorted = allComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      return NextResponse.json({ success: true, data: sorted });
    }
    
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id: storyId } = resolvedParams;
    
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

    const body = await request.json();
    const { content, userName, userAvatar } = body;

    if (!content || content.trim().length < 3) {
      return NextResponse.json({ success: false, message: 'Comment must be at least 3 characters long' }, { status: 400 });
    }

    const db = getAdminDb();
    const storyRef = db.collection('stories').doc(storyId);
    
    const newCommentRef = db.collection('story_comments').doc();

    const newComment = {
      storyId,
      userId,
      userName: userName || decodedToken.name || 'Anonymous',
      userAvatar: userAvatar || decodedToken.picture || '',
      content: content.trim(),
      createdAt: new Date().toISOString()
    };

    // Transaction to add comment and increment count
    await db.runTransaction(async (transaction) => {
      const storyDoc = await transaction.get(storyRef);
      if (!storyDoc.exists) {
        throw new Error('Story not found');
      }

      const currentCount = storyDoc.data()?.commentCount || 0;

      transaction.set(newCommentRef, newComment);
      transaction.update(storyRef, { commentCount: currentCount + 1 });
    });

    return NextResponse.json({ 
      success: true, 
      data: { id: newCommentRef.id, ...newComment }
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding comment:', error);
    if (error.message === 'Story not found') {
      return NextResponse.json({ success: false, message: error.message }, { status: 404 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
