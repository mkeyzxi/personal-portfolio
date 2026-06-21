import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export async function GET() {
  try {
    const db = getAdminDb();
    const categoriesSnapshot = await db.collection('categories').orderBy('createdAt', 'desc').get();
    
    const categories = categoriesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, data: categories });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    let decodedToken;
    try {
      decodedToken = await verifyAdminToken(request);
    } catch (e: any) {
      if (e.message === 'UNAUTHORIZED' || e.message === 'INVALID_TOKEN') {
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
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
