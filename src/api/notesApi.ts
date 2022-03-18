import { collection, doc, getDocs, QuerySnapshot, Timestamp, addDoc, where, query, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { fbDb } from 'firebaseConfig'
import { INote, IPage, ISection } from 'models'

export const getNotes = async () => {
  const snapShot = (await getDocs(collection(fbDb, 'notes'))) as QuerySnapshot<INote>
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

export const getSections = async (noteId: string) => {
  const snapShot = (await getDocs(query(collection(fbDb, 'sections'), where('noteId', '==', noteId)))) as QuerySnapshot<ISection>
  const data: ISection[] = snapShot.docs.map((document) => ({
    name: document.data().name,
    noteId: document.data().noteId,
    createdAt: document.data().createdAt,
    id: document.id,
  }))
  return data
}

export const addSection = async (section: ISection) => {
  const data = {
    name: section.name,
    noteId: section.noteId,
    createdAt: Timestamp.now(),
  }
  await addDoc(collection(fbDb, 'sections'), data)
}

export const deleteSection = async (sectionId: string) => {
  await deleteDoc(doc(fbDb, 'sections', sectionId))
}

export const getPages = async (sectionId: string) => {
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

export const addPage = async (page: IPage) => {
  const data = {
    name: page.name,
    content: page.content,
    sectionId: page.sectionId,
    createdAt: Timestamp.now(),
  }
  await addDoc(collection(fbDb, 'pages'), data)
}

export const deletePage = async (pageId: string) => {
  await deleteDoc(doc(fbDb, 'pages', pageId))
}

export const getPageContent = async (pageId: string) => {
  const snapShot = await getDoc(doc(fbDb, 'pages', pageId))
  return snapShot.get('content') as string
}

export const updatePageContent = async (pageId: string, content: string) => {
  const docRef = doc(fbDb, 'pages', pageId)
  await updateDoc(docRef, { content })
}
