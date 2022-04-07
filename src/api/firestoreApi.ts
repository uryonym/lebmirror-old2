import { collection, doc, getDocs, QuerySnapshot, Timestamp, addDoc, where, query, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { fbDb } from 'firebaseConfig'
import { IPage } from 'models'
import { INote } from 'features/note/noteSlice'
import { ISection } from 'features/section/sectionSlice'

export type FSNote = {
  name: string
  uid: string
  createdAt: Timestamp
  id: string | undefined
}

export type FSSection = {
  name: string
  noteId: string
  createdAt: Timestamp
  id: string | undefined
}

class FirestoreApi {
  getNotes = async () => {
    const snapShot = (await getDocs(collection(fbDb, 'notes'))) as QuerySnapshot<FSNote>
    const data: INote[] = snapShot.docs.map((document) => ({
      name: document.data().name,
      uid: document.data().uid,
      createdAt: document.data().createdAt.toDate(),
      id: document.id,
    }))
    return data
  }

  addNote = async (note: INote) => {
    const data = {
      name: note.name,
      uid: note.uid,
      createdAt: Timestamp.now(),
    }
    await addDoc(collection(fbDb, 'notes'), data)
  }

  getSections = async (noteId: string) => {
    const snapShot = (await getDocs(query(collection(fbDb, 'sections'), where('noteId', '==', noteId)))) as QuerySnapshot<FSSection>
    const data: ISection[] = snapShot.docs.map((document) => ({
      name: document.data().name,
      noteId: document.data().noteId,
      createdAt: document.data().createdAt.toDate(),
      id: document.id,
    }))
    return data
  }

  addSection = async (section: ISection) => {
    const data = {
      name: section.name,
      noteId: section.noteId,
      createdAt: Timestamp.now(),
    }
    await addDoc(collection(fbDb, 'sections'), data)
  }

  updateSection = async (section: ISection) => {
    if (section.id) {
      await updateDoc(doc(fbDb, 'sections', section.id), { name: section.name })
    }
  }

  deleteSection = async (sectionId: string) => {
    await deleteDoc(doc(fbDb, 'sections', sectionId))
  }

  getPages = async (sectionId: string) => {
    const snapShot = (await getDocs(query(collection(fbDb, 'pages'), where('sectionId', '==', sectionId)))) as QuerySnapshot<IPage>

    const data: IPage[] = snapShot.docs.map((document) => ({
      name: document.data().name,
      content: document.data().content,
      sectionId: document.data().sectionId,
      createdAt: document.data().createdAt,
      id: document.id,
    }))
    return data
  }

  addPage = async (page: IPage) => {
    const data = {
      name: page.name,
      content: page.content,
      sectionId: page.sectionId,
      createdAt: Timestamp.now(),
    }
    await addDoc(collection(fbDb, 'pages'), data)
  }

  updatePage = async (page: IPage) => {
    if (page.id) {
      await updateDoc(doc(fbDb, 'pages', page.id), { name: page.name })
    }
  }

  deletePage = async (pageId: string) => {
    await deleteDoc(doc(fbDb, 'pages', pageId))
  }

  getPageContent = async (pageId: string) => {
    const snapShot = await getDoc(doc(fbDb, 'pages', pageId))
    return snapShot.get('content') as string
  }

  updatePageContent = async (pageId: string, content: string) => {
    const docRef = doc(fbDb, 'pages', pageId)
    await updateDoc(docRef, { content })
  }
}

const firestoreApi = new FirestoreApi()
export default firestoreApi
