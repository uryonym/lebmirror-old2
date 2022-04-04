import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import firestoreApi from 'api/firestoreApi'
import { RootState } from 'app/store'

export type ISection = {
  name: string
  noteId: string
  createdAt: Date
  id: string | undefined
}

interface SectionSlice {
  sections: ISection[]
  currentSection: ISection | undefined
  status: 'idle' | 'loading' | 'failed'
}

const initialState: SectionSlice = {
  sections: [],
  currentSection: undefined,
  status: 'idle',
}

// Async Method
export const fetchAllSections = createAsyncThunk('section/fetchAll', async (noteId: string, { rejectWithValue }) => {
  try {
    const result = await firestoreApi.getSections(noteId)
    return { sections: result }
  } catch (e) {
    return rejectWithValue('データ取得（section/fetchAll）に失敗しました')
  }
})

// Slice Method
export const sectionsSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<string>) => {
      const currentSection = state.sections.find((x) => x.id === action.payload)
      return { ...state, currentSection }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSections.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(fetchAllSections.fulfilled, (state, action) => {
        const { sections } = action.payload
        return { ...state, status: 'idle', sections }
      })
      .addCase(fetchAllSections.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const { setCurrentSection } = sectionsSlice.actions

export const sectionSelector = (state: RootState) => state.section

export default sectionsSlice.reducer
