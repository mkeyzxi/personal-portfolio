import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const authHeader = request.headers.get('authorization');
    
    let isAdmin = false;
    try {
      await verifyAdminToken(request);
      isAdmin = true;
    } catch (e) {
      // ignore invalid token for GET
    }
    
    const db = getAdminDb();
    let query: FirebaseFirestore.Query = db.collection('stories');
    
    if (!isAdmin) {
      query = query.where('status', '==', 'published');
    }
    
    if (category) {
      query = query.where('categorySlug', '==', category);
    }
    
    const storiesSnapshot = await query.orderBy('createdAt', 'desc').get();
    
    const stories = storiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: stories });
  } catch (error: unknown) {
    console.error('Error fetching stories:', error);
     
    if ((error as any).code === 9) {
      // Fallback for index error
      const db = getAdminDb();
      const storiesSnapshot = await db.collection('stories').get();
      const allStories = storiesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      
      let isAdmin = false;
      try {
        await verifyAdminToken(request);
        isAdmin = true;
      } catch (e) {}

      const filtered = allStories
        .filter(s => isAdmin || s.status === 'published')
        .filter(s => category ? s.categorySlug === category : true)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
      return NextResponse.json({ success: true, data: filtered });
    }
    return NextResponse.json({ success: false, message: (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    let decodedToken;
    try {
      decodedToken = await verifyAdminToken(request);
    } catch (e: unknown) {
      if ((e instanceof Error ? e.message : String(e)) === 'UNAUTHORIZED' || (e instanceof Error ? e.message : String(e)) === 'INVALID_TOKEN') {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { title, slug, categorySlug, content, summary, status } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const db = getAdminDb();
    
    const existing = await db.collection('stories').where('slug', '==', slug).get();
    if (!existing.empty) {
      return NextResponse.json({ success: false, message: 'Story with this slug already exists' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const newStory = {
      title,
      slug,
      categorySlug: categorySlug || '',
      content,
      summary: summary || '',
      status: status || 'draft',
      createdAt: now,
      updatedAt: now,
      views: 0,
      likeCount: 0,
      commentCount: 0,
      // Author info dari Google OAuth profile
      authorName: decodedToken.name || '',
      authorAvatar: decodedToken.picture || '',
      authorEmail: decodedToken.email || '',
    };

    const docRef = await db.collection('stories').add(newStory);

    return NextResponse.json({ 
      success: true, 
      data: { id: docRef.id, ...newStory } 
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating story:', error);
    return NextResponse.json({ success: false, message: (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}
