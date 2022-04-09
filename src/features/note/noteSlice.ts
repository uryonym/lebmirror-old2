import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import firestoreApi from 'api/firestoreApi'
import { RootState } from 'app/store'

export type INote = {
  name: string
  uid: string
  createdAt: Date
  id: string | undefined
}

interface NoteSlice {
  notes: INote[]
  currentNote: INote | undefined
  status: 'idle' | 'loading' | 'failed'
}

const initialState: NoteSlice = {
  notes: [],
  currentNote: undefined,
  status: 'idle',
}

// Async Method
export const fetchAllNotes = createAsyncThunk('note/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const result = await firestoreApi.getNotes()
    return { notes: result }
  } catch (e) {
    return rejectWithValue('データ取得（note/fetchAll）に失敗しました')
  }
})

export const createNote = createAsyncThunk('note/create', async (note: INote, { rejectWithValue }) => {
  try {
    const id = await firestoreApi.addNote(note)
    return { note: { ...note, id } as INote }
  } catch (e) {
    return rejectWithValue('データ作成（note/create）に失敗しました')
  }
})

// Slice Method
export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<string>) => {
      const currentNote = state.notes.find((x) => x.id === action.payload)
      return { ...state, currentNote }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllNotes
      .addCase(fetchAllNotes.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        const { notes } = action.payload
        return { ...state, status: 'idle', notes }
      })
      .addCase(fetchAllNotes.rejected, (state) => ({ ...state, status: 'failed' }))

      // createNote
      .addCase(createNote.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(createNote.fulfilled, (state, action) => {
        const { note } = action.payload
        const notes = state.notes.concat(note)
        return { ...state, notes, status: 'idle' }
      })
      .addCase(createNote.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const { setCurrentNote } = noteSlice.actions

export const noteSelector = (state: RootState) => state.note

export default noteSlice.reducer
