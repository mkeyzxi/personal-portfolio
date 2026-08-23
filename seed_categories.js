// eslint-disable-next-line @typescript-eslint/no-require-imports
const admin = require('firebase-admin')

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined

if (!projectId || !clientEmail || !privateKey) {
  console.error('Missing Firebase Admin credentials in environment variables.')
  process.exit(1)
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

const db = admin.firestore()

const categories = [
  {name: 'Development', slug: 'development'},
  {name: 'Project Journey', slug: 'project-journey'},
  {name: 'Learning', slug: 'learning'},
  {name: 'Insight', slug: 'insight'},
  {name: 'Academic', slug: 'academic'},
  {name: 'Life', slug: 'life'},
  {name: 'Career', slug: 'career'},
  {name: 'Tips', slug: 'tips'},
  {name: 'Design', slug: 'design'},
  {name: 'Announcement', slug: 'announcement'},
]

async function seed() {
  const allowedSlugs = categories.map(c => c.slug);
  
  // Hapus kategori lama yang tidak ada di list baru
  const snapshot = await db.collection('categories').get();
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (!allowedSlugs.includes(data.slug)) {
      await doc.ref.delete();
      console.log('Deleted old category:', data.name);
    }
  }

  // Tambah kategori baru jika belum ada
  for (const cat of categories) {
    const existing = await db.collection('categories').where('slug', '==', cat.slug).get()
    if (existing.empty) {
      await db.collection('categories').add({
        ...cat,
        createdAt: new Date().toISOString(),
      })
      console.log('Added category:', cat.name)
    } else {
      console.log('Category already exists:', cat.name)
    }
  }
  console.log('Done.')
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0))
