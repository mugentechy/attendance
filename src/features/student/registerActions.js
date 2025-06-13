import { createAsyncThunk } from '@reduxjs/toolkit'
import { createUser,getStudents,getStudent,updateUser } from './registerApi'


export const createStudentAsync = createAsyncThunk(
    'student/create',
    async ({fullname,stream_id, regnum, birthday, date_reg, results,  address, gender, timestamp, email,mode_of_study,avatar_url }, { getState, rejectWithValue }) => {
        try {
        
            const response = await createUser(fullname,stream_id,regnum, birthday, date_reg, results,  address, gender, timestamp, email,mode_of_study,avatar_url );

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


export const getStudentsAsync = createAsyncThunk(
    '/posts',
    async () => {
        try {
            const response = await getStudents();

            return response;
        } catch(error) {
            console.log(error)
     
        }
    }
);


export const getStudentAsync = createAsyncThunk(
    '/get/student',
    async (student_id ,{ getState, rejectWithValue}) => {
        try {
            const response = await getStudent(student_id);
   

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


export const updateStudentAsync = createAsyncThunk(
    'student/update',
    async ({student_id, fullname, address,gender, contact, email  }, { getState, rejectWithValue }) => {
        try {
        
            const response = await updateUser(student_id, fullname, address,gender, contact, email);

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

