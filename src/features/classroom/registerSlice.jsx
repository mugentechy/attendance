import { createSlice } from '@reduxjs/toolkit'
import { createClassAsync,getRoutineAsync,getClassAttendanceAsync,getStreamAsync,getClassesAsync,assignRosterAsync,createStreamAsync,getStreamsAsync,getClassStudentsAsync, assignTeacherAsync,addSubjectAsync, addSyllabusAsync,assignSubjectTeacherAsync,getClassSubjectAsync,getClassSubjectTeacherAsync} from './registerActions';

const initialState = {
    isLoading: false,
    error: null,
    classroom:[],
    lesson:[],
    subjectteacher:[],
    student:[],
    streams:[],
    stream:[],
    routine:[],
    attendance:[]
};

const classroomSlice = createSlice({
    name: 'classroom',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClassAttendanceAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.attendance = payload
            })
            .addCase(getClassAttendanceAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getClassAttendanceAsync.pending, (state) => {
                state.isLoading = 'true';
       
            })
            .addCase(getRoutineAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.routine = payload
            })
            .addCase(getRoutineAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getRoutineAsync.pending, (state) => {
                state.isLoading = 'true';
       
            })

            .addCase(getStreamAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.stream = payload
            })
            .addCase(getStreamAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getStreamAsync.pending, (state) => {
                state.isLoading = 'true';
       
            })
            .addCase(assignRosterAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(assignRosterAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(assignRosterAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getStreamsAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.streams = payload
            })
            .addCase(getStreamsAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getStreamsAsync.pending, (state) => {
                state.isLoading = 'true';
       
            })
            .addCase(createStreamAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(createStreamAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(createStreamAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getClassStudentsAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.student = payload
            })
            .addCase(getClassStudentsAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getClassStudentsAsync.pending, (state) => {
                state.isLoading = 'true';
       
            })
            .addCase(addSyllabusAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(addSyllabusAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(addSyllabusAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getClassSubjectTeacherAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.subjectteacher = payload
            })
            .addCase(getClassSubjectTeacherAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getClassSubjectTeacherAsync.pending, (state) => {
                state.isLoading = 'true';
       
            })
         
           .addCase(getClassSubjectAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.lesson = payload
            })
            .addCase(getClassSubjectAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(getClassSubjectAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(assignSubjectTeacherAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(assignSubjectTeacherAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(addSubjectAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(addSubjectAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(addSubjectAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
              .addCase(assignTeacherAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(assignTeacherAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(assignTeacherAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
              .addCase(getClassesAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(getClassesAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.classroom = payload
            })
            .addCase(getClassesAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(createClassAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(createClassAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
            })
            .addCase(createClassAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            });
    },
});

export default classroomSlice.reducer;
