import { configureStore  } from '@reduxjs/toolkit'
import student from "./features/student/registerSlice"
import classroom from "./features/classroom/registerSlice"
import school from "./features/school/registerSlice"

const store = configureStore({
  reducer: {
student,
classroom,
school,
  },
  devTools: process.env.NODE_ENV !== 'production',
})
export default store