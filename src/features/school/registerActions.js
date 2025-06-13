import { createAsyncThunk } from '@reduxjs/toolkit'
import { addSchool, authSchool } from './registerApi'





export const addSchoolAsync = createAsyncThunk(
    'add/school',
    async ({name,created_by,password}, { rejectWithValue }) => {
        try {
        
            const response = await addSchool(name,created_by,password);
            
            return response;
        } catch(error) {

        
            if (error.response && error.response) {
                console.log(error)
                return rejectWithValue(error.response)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);



export const authSchoolAsync = createAsyncThunk(
    'auth/school',
    async ({ created_by,password}, { rejectWithValue }) => {
        try {
        
            const response = await authSchool(created_by,password);


            return response.data.user;
        } catch(error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

