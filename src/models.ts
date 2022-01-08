export type IUser = {
  displayName: string | undefined
  photoURL: string | undefined
}

export type INote = {
  id: string
  user: IUser
  name: string
  createdAt: Date
}

export type ISection = {
  id: string
  note_id: string
  name: string
  createdAt: Date
}

export type IPage = {
  id: string
  section_id: string
  name: string
  content: string
  createdAt: Date
}
