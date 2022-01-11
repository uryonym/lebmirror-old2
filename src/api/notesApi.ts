import {
  collection,
  getDocs,
  QuerySnapshot,
  Timestamp,
  addDoc,
} from 'firebase/firestore'
import { fbDb } from 'firebaseConfig'
import { INote, ISection } from 'models'

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

export const addNote = async (note: INote) => {
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

export const addSection = async (section: ISection) => {
  const data = {
    name: section.name,
    note_id: section.note_id,
    createdAt: Timestamp.now(),
  }
  await addDoc(collection(fbDb, 'sections'), data)
}
