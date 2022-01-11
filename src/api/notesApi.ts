import {
  doc,
  collection,
  getDocs,
  QuerySnapshot,
  Timestamp,
  addDoc,
} from 'firebase/firestore'
import { fbDb } from 'firebaseConfig'
import { INote } from 'models'

export const getNotes = async () => {
  const snapShot = (await getDocs(
    collection(fbDb, 'notes')
  )) as QuerySnapshot<INote>
  const data: INote[] = snapShot.docs.map((document) => ({
    name: document.data().name,
    uid: document.data().uid,
    createdAt: document.data().createdAt,
    id: document.id,
  }))
  return data
}

export const addNotes = async (note: INote) => {
  const data = {
    name: note.name,
    uid: note.uid,
    createdAt: Timestamp.now(),
  }
  await addDoc(collection(fbDb, 'notes'), data)
}

export const getSections = async () => {
  const snapShot = await getDocs(collection(fbDb, 'sections'))
}
