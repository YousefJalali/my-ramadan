import { db } from '@/firebaseConfig'
import { collection, doc, getDocs, writeBatch } from 'firebase/firestore'

export async function populateDefaultTasks(userId: string) {
  const sourceCollectionPath = 'defaultTasks' // Source collection path
  const targetCollectionPath = `users/${userId}/tasks` // Target collection path

  const batch = writeBatch(db) // Initialize a batch
  const sourceSnapshot = await getDocs(collection(db, sourceCollectionPath)) // Get all documents in the source collection

  for (const sourceDoc of sourceSnapshot.docs) {
    const sourceDocData = sourceDoc.data() // Document data
    const targetDocRef = doc(db, `${targetCollectionPath}/${sourceDoc.id}`) // Target document reference

    // Add the main document to the batch
    batch.set(targetDocRef, sourceDocData)

    // Handle the `tasks` subcollection
    const tasksSubcollectionRef = collection(
      db,
      `${sourceCollectionPath}/${sourceDoc.id}/tasks`
    )
    const tasksSnapshot = await getDocs(tasksSubcollectionRef)

    for (const taskDoc of tasksSnapshot.docs) {
      const taskData = taskDoc.data() // Task document data
      const targetTaskDocRef = doc(
        db,
        `${targetCollectionPath}/${sourceDoc.id}/tasks/${taskDoc.id}`
      )

      // Add each task document to the batch
      batch.set(targetTaskDocRef, taskData)
    }
  }

  // Commit the batch
  await batch.commit()

  console.log(`Default tasks successfully copied to users/${userId}/tasks`)
}
