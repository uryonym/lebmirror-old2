export type IUser = {
  displayName: string | undefined
  email: string | undefined
}

export type INote = {
  name: string
  user: IUser
  createdAt: Date
  id: string
}

export type ISection = {
  name: string
  note: INote
  createdAt: Date
  id: string
}

export type IPage = {
  name: string
  content: string
  section: ISection
  createdAt: Date
  id: string
}
