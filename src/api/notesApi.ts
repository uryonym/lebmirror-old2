import { collection, getDocs } from 'firebase/firestore'
import { fbDb } from 'firebaseConfig'
import { INote } from 'models'

export const getNotes = async () => {
  const snapShot = await getDocs(collection(fbDb, 'notes'))
  const data = snapShot.docs.map<INote>((doc) => ({
    name: doc.data().name,
    uid: doc.data().uid,
    createdAt: doc.data().createdAt.toDate(),
    id: doc.data().id,
  }))
}

export const getSections = async () => {
  const snapShot = await getDocs(collection(fbDb, 'sections'))
}
