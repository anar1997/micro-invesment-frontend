import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getEducationAsync = createAsyncThunk('getEducationSlice', async (id)=>{
    try {
        const res = await axios.get(`users/educations/?user=${id}`)
        return res.data
    } catch (error) {
        console.log(error);
        throw {'message': error.response.data.detail};        
    }
})

export const EducationSlice = createSlice({
    name: 'auth',
    initialState: {
        educations: [],
        isLoading: false,
        error: null,
        successMsg: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEducationAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getEducationAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.educations = action.payload.results;
        })
        builder.addCase(getEducationAsync.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export default EducationSlice.reducer;