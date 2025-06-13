import { createSlice } from '@reduxjs/toolkit'
import { addSchoolAsync,
authSchoolAsync,
 } from './registerActions';
import Cookies from 'js-cookie'



const initialState = {
    isLoading: false,
    error: null,
    school:[],

};

const schoolSlice = createSlice({
    name: 'school',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authSchoolAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
                state.school = payload;
                Cookies.set('user',  JSON.stringify(payload))
        
            })
            .addCase(authSchoolAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(authSchoolAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
            })
            .addCase(addSchoolAsync.fulfilled, (state, { payload }) => {
                state.isLoading = 'false';
        
            })
            .addCase(addSchoolAsync.pending, (state) => {
                state.isLoading = 'true';
            })
            .addCase(addSchoolAsync.rejected, (state, { payload }) => {
                state.isLoading = 'false';
                state.error = payload;
          
            })
           ;
    },
});

export default schoolSlice.reducer;
 


