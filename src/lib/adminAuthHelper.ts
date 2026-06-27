import { getAdminAuth } from './firebase-admin-auth';

/**
 * Memverifikasi token Firebase Auth dan memastikan email cocok dengan ADMIN_EMAIL.
 * Mengembalikan decoded token jika sukses, atau melempar error HTTP-friendly.
 */
export async function verifyAdminToken(request: Request) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('UNAUTHORIZED');
  }

  const token = authHeader.split('Bearer ')[1];
  const adminAuth = getAdminAuth();
  
  let decodedToken;
  try {
    decodedToken = await adminAuth.verifyIdToken(token);
  } catch (error) {
    throw new Error('INVALID_TOKEN');
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail) {
    console.error('CRITICAL: ADMIN_EMAIL is not set in environment variables');
    throw new Error('SERVER_CONFIG_ERROR');
  }

  if (decodedToken.email !== adminEmail) {
    throw new Error('FORBIDDEN');
  }

  return decodedToken;
}
