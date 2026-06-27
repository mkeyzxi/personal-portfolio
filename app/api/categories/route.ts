import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin-db';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const db = getAdminDb();
    const categoriesSnapshot = await db.collection('categories').orderBy('createdAt', 'desc').get();
    
    const categories = categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: categories });
  } catch (error: unknown) {
    console.error('Error fetching categories:', error);
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
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const db = getAdminDb();
    
    // Check if slug already exists
    const existing = await db.collection('categories').where('slug', '==', slug).get();
    if (!existing.empty) {
      return NextResponse.json({ success: false, message: 'Category with this slug already exists' }, { status: 400 });
    }

    const newCategory = {
      name,
      slug,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('categories').add(newCategory);

    return NextResponse.json({ 
      success: true, 
      data: { id: docRef.id, ...newCategory } 
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating category:', error);
    return NextResponse.json({ success: false, message: (error instanceof Error ? error.message : String(error)) }, { status: 500 });
  }
}
