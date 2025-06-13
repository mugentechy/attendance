import { createAsyncThunk } from '@reduxjs/toolkit'
import { createClass,getClasses,getRoutine,getClassAttendance,assignRoster,getStream,getStreams,getClassStudents,createStream,assignTeacher,addSubject,assignSubjectTeacher,getClassSubject,getClassSubjectTeacher,addSyllabus } from './registerApi'





export const getRoutineAsync = createAsyncThunk(
    '/get/stream/routine',
    async (stream_id ,{ getState, rejectWithValue}) => {
        try {
            const response = await getRoutine(stream_id);
            return response;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);




export const getStreamAsync = createAsyncThunk(
    '/get/stream/class',
    async (stream_id ,{ getState, rejectWithValue}) => {
        try {
            const response = await getStream(stream_id);
            return response;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);






export const getClassAttendanceAsync = createAsyncThunk(
    'class/attendance',
    async ({stream_id,attendance_date}, { getState, rejectWithValue }) => {
        try {
        
            const response = await getClassAttendance(stream_id,attendance_date);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);







export const assignRosterAsync = createAsyncThunk(
    'assign/rooster',
    async ({subject_id,time_slot,day}, { getState, rejectWithValue }) => {
        try {
        
            const response = await assignRoster(subject_id,time_slot,day);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);












export const createClassAsync = createAsyncThunk(
    'class/create',
    async ({ name}, { getState, rejectWithValue }) => {
        try {
        
            const response = await createClass(name);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);



export const createStreamAsync = createAsyncThunk(
    'class/stream',
    async ({ name,classroom_id,capacity}, { getState, rejectWithValue }) => {
        try {
        
            const response = await createStream(name,classroom_id,capacity);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);





export const getClassStudentsAsync = createAsyncThunk(
    'get/class/subjects',
    async (stream_id, { getState, rejectWithValue }) => {
        try {
      
            const response = await getClassStudents(stream_id);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


export const assignTeacherAsync = createAsyncThunk(
    'assign/teacher',
    async ({ stream_id, teacher_id}, { getState, rejectWithValue }) => {
        try {
        
            const response = await assignTeacher(stream_id, teacher_id);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


export const getClassSubjectAsync = createAsyncThunk(
    'get/subject/teacher',
    async (stream_id, { getState, rejectWithValue }) => {
        try {
      
            const response = await getClassSubject(stream_id);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);



export const getClassSubjectTeacherAsync = createAsyncThunk(
    '/class/teacher/subject',
    async (stream_id, { getState, rejectWithValue }) => {
        try {
     
            const response = await getClassSubjectTeacher(stream_id);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


export const assignSubjectTeacherAsync = createAsyncThunk(
    'assign/subject/teacher',
    async ({ subject_id, teacher_id ,stream_id}, { getState, rejectWithValue }) => {
        try {
        
            const response = await assignSubjectTeacher(subject_id,teacher_id,stream_id);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);



export const addSubjectAsync = createAsyncThunk(
    'add/subject',
    async ({ stream_id, subject}, { getState, rejectWithValue }) => {
        try {
        
            const response = await addSubject(stream_id, subject);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


export const addSyllabusAsync = createAsyncThunk(
    'add/syllabus',
    async ({ stream_id, subject_id, syllabus,school_id }, { getState, rejectWithValue }) => {
        try {
        
            const response = await addSyllabus(stream_id, subject_id,syllabus,school_id);

            return response.data;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);



export const getClassesAsync = createAsyncThunk(
    '/get/class',
    async () => {
        try {
            const response = await getClasses();
       
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);



export const getStreamsAsync = createAsyncThunk(
    '/get/streams',
    async () => {
        try {
            const response = await getStreams();
       
            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);
