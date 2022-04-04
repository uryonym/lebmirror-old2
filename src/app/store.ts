import { configureStore } from '@reduxjs/toolkit'
import noteReducer from 'features/note/noteSlice'
import sectionReducer from 'features/section/sectionSlice'

export const store = configureStore({
  reducer: {
    note: noteReducer,
    section: sectionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
