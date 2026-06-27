import { getFirestore } from 'firebase-admin/firestore';
import { initFirebaseAdmin } from './firebase-admin-app';

export const getAdminDb = () => {
  initFirebaseAdmin();
  return getFirestore();
};
