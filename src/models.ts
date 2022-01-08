export type IUser = {
  displayName: string | undefined
  email: string | undefined
  uid: string | undefined
}

export type INote = {
  name: string
  uid: string
  createdAt: Date
  id: string
}

export type ISection = {
  name: string
  note_id: string
  createdAt: Date
  id: string
}

export type IPage = {
  name: string
  content: string
  section_id: string
  createdAt: Date
  id: string
}
