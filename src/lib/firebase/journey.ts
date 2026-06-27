import type { Journey } from '@/types';
const COLLECTION_NAME = 'journeys';

/**
 * Fetch all journeys from Firestore, ordered by year.
 * @param sortOrder 'asc' (oldest first) or 'desc' (newest first). Default is 'asc'.
 */
export async function getJourneys(sortOrder: 'asc' | 'desc' = 'asc'): Promise<Journey[]> {
  try {
    const { db } = await import('@/lib/firebase');
    const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
    
    const q = query(collection(db, COLLECTION_NAME), orderBy('year', sortOrder));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Journey[];
  } catch (error) {
    console.error('Error fetching journeys:', error);
    throw new Error('Failed to fetch journeys');
  }
}

/**
 * Add a new journey to Firestore.
 */
export async function addJourney(data: Omit<Journey, 'id' | 'createdAt'>): Promise<string> {
  try {
    const { db } = await import('@/lib/firebase');
    const { collection, addDoc } = await import('firebase/firestore');
    
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding journey:', error);
    throw new Error('Failed to add journey');
  }
}

/**
 * Update an existing journey in Firestore.
 */
export async function updateJourney(id: string, data: Partial<Omit<Journey, 'id' | 'createdAt'>>): Promise<void> {
  try {
    const { db } = await import('@/lib/firebase');
    const { doc, updateDoc } = await import('firebase/firestore');
    
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error updating journey:', error);
    throw new Error('Failed to update journey');
  }
}

/**
 * Delete a journey from Firestore.
 */
export async function deleteJourney(id: string): Promise<void> {
  try {
    const { db } = await import('@/lib/firebase');
    const { doc, deleteDoc } = await import('firebase/firestore');
    
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting journey:', error);
    throw new Error('Failed to delete journey');
  }
}
