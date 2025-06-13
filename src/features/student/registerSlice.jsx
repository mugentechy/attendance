import { createSlice } from '@reduxjs/toolkit'
import { createStudentAsync,getStudentAsync,getStudentsAsync,updateStudentAsync} from './registerActions';

const initialState = {
    isLoading: false,
    error: null,
    student:[],
    students:[],
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateStudentAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(updateStudentAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(updateStudentAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getStudentAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getStudentAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.students = payload
            })
            .addCase(getStudentAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
              .addCase(getStudentsAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getStudentsAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.student = payload
            })
            .addCase(getStudentsAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(createStudentAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(createStudentAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(createStudentAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                console.log(payload)
                state.error = payload;
            });
    },
});

export default studentSlice.reducer;
