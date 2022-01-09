import { collection, getDocs, QuerySnapshot } from 'firebase/firestore'
import { fbDb } from 'firebaseConfig'
import { INote } from 'models'

export const getNotes = async () => {
  const snapShot = (await getDocs(
    collection(fbDb, 'notes')
  )) as QuerySnapshot<INote>
  const data: INote[] = snapShot.docs.map((doc) => ({
    name: doc.data().name,
    uid: doc.data().uid,
    createdAt: doc.data().createdAt,
    id: doc.id,
  }))
  return data
}

export const getSections = async () => {
  const snapShot = await getDocs(collection(fbDb, 'sections'))
}
