import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getExperienceAsync = createAsyncThunk('getExperienceSlice', async (id) => {
    try {
        const res = await axios.get(`users/experiences/?user=${id}`)
        return res.data
    } catch (error) {
        console.log(error);
        throw { 'message': error.response.data.detail };
    }
})

export const ExperienceSlice = createSlice({
    name: 'auth',
    initialState: {
        experiences: [],
        isLoading: false,
        error: null,
        successMsg: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getExperienceAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getExperienceAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.experiences = action.payload.results;
        })
        builder.addCase(getExperienceAsync.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export default ExperienceSlice.reducer;