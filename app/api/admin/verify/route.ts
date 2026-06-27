import { NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/adminAuthHelper';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const decodedToken = await verifyAdminToken(request);
    return NextResponse.json({ success: true, user: { email: decodedToken.email, uid: decodedToken.uid } });
  } catch (e: unknown) {
    return NextResponse.json({ success: false, message: (e instanceof Error ? e.message : String(e)) }, { status: 401 });
  }
}
