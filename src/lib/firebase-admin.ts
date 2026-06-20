import {initializeApp, getApps, cert} from 'firebase-admin/app'
import {getFirestore} from 'firebase-admin/firestore'
import {getAuth} from 'firebase-admin/auth'

const initFirebaseAdmin = () => {
  // 1. Singleton Pattern: Mencegah inisialisasi ganda saat hot-reload
  if (getApps().length > 0) {
    return
  }

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const rawPrivateKey = process.env.FIREBASE_PRIVATE_KEY

  // 2. Defensive Coding: Cegah crash senyap jika ENV kosong
  if (!projectId || !clientEmail || !rawPrivateKey) {
    console.error(
      'Firebase Admin Error: Environment variables tidak lengkap. Pastikan FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, dan FIREBASE_PRIVATE_KEY ada di .env.local',
    )
    return
  }

  try {
    // 3. Robust Parsing Logic: Menangani berbagai jenis cacat penulisan di .env
    // Mengubah literal \n menjadi pemisah baris, menghapus kutip liar, dan spasi berlebih.
    const formattedPrivateKey = rawPrivateKey.replace(/\\n/g, '\n').replace(/"/g, '').trim()

    initializeApp({
      credential: cert({
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: formattedPrivateKey,
      }),
    })

    console.log('Firebase Admin Initialized successfully')
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error)
  }
}

export const getAdminDb = () => {
  initFirebaseAdmin()
  return getFirestore()
}

export const getAdminAuth = () => {
  initFirebaseAdmin()
  return getAuth()
}
