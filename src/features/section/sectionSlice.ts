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

export const createSection = createAsyncThunk('section/create', async (section: ISection, { rejectWithValue }) => {
  try {
    const id = await firestoreApi.addSection(section)
    return { section: { ...section, id } as ISection }
  } catch (e) {
    return rejectWithValue('データ作成（section/create）に失敗しました')
  }
})

export const updateSection = createAsyncThunk('section/update', async (section: ISection, { rejectWithValue }) => {
  try {
    await firestoreApi.updateSection(section)
    return { section }
  } catch (e) {
    return rejectWithValue('データ更新（section/update）に失敗しました')
  }
})

export const deleteSection = createAsyncThunk('section/delete', async (sectionId: string, { rejectWithValue }) => {
  try {
    await firestoreApi.deleteSection(sectionId)
    return { sectionId }
  } catch (e) {
    return rejectWithValue('データ削除（section/delete）に失敗しました')
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
      // fetchAllSections
      .addCase(fetchAllSections.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(fetchAllSections.fulfilled, (state, action) => {
        const { sections } = action.payload
        return { ...state, sections, status: 'idle' }
      })
      .addCase(fetchAllSections.rejected, (state) => ({ ...state, status: 'failed' }))

      // createSection
      .addCase(createSection.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(createSection.fulfilled, (state, action) => {
        const { section } = action.payload
        const sections = state.sections.concat(section)
        return { ...state, sections, status: 'idle' }
      })
      .addCase(createSection.rejected, (state) => ({ ...state, status: 'failed' }))

      // updateSection
      .addCase(updateSection.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(updateSection.fulfilled, (state, action) => {
        const { section } = action.payload
        const sections = state.sections.map((s) => (s.id === section.id ? section : s))
        return { ...state, sections, status: 'idle' }
      })
      .addCase(updateSection.rejected, (state) => ({ ...state, status: 'failed' }))

      // deleteSection
      .addCase(deleteSection.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(deleteSection.fulfilled, (state, action) => {
        const { sectionId } = action.payload
        const sections = state.sections.filter((s) => s.id !== sectionId)
        return { ...state, sections, status: 'idle' }
      })
      .addCase(deleteSection.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const { setCurrentSection } = sectionsSlice.actions

export const sectionSelector = (state: RootState) => state.section

export default sectionsSlice.reducer
