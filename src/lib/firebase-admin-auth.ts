import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from './firebase-admin-app';

export const getAdminAuth = () => {
  initFirebaseAdmin();
  return getAuth();
};
