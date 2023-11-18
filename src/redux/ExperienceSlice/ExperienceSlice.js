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

export const postExperienceAsync = createAsyncThunk('postExperienceSlice', async (data) => {
    try {
        const res = await axios.post(`users/experiences/`, data)
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getExperienceDetailAsync = createAsyncThunk('getExperienceDetailAsync', async ({id}) => {
    try {
        const res = await axios.get(`/users/experiences/${id}/`)
        return res.data
    } catch (error) {
        console.log(error);
        throw {'message': error.response.data.detail};   
    }
})

export const putExperienceAsync = createAsyncThunk('putExperienceAsync', async (data) => {
    try {
        const res = await axios.put(`/users/experiences/${data.id}/`, data)
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};        
    }
})

export const deleteExperienceAsync = createAsyncThunk('deleteExperienceAsync', async ({id}) => {
    try {
        const res = await axios.delete(`/users/experiences/${id}/`)
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};  
    }
})

export const ExperienceSlice = createSlice({
    name: 'auth',
    initialState: {
        experiences: [],
        experience: {},
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

        // post reducers

        builder.addCase(postExperienceAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postExperienceAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload
        })
        builder.addCase(postExperienceAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
        })

        //put reducers
        builder.addCase(putExperienceAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(putExperienceAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload
        })
        builder.addCase(putExperienceAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
        })

        //getDetail
        builder.addCase(getExperienceDetailAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getExperienceDetailAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.experience = action.payload;
            console.log(action.payload);
        })
        builder.addCase(getExperienceDetailAsync.rejected, (state, action) => {
            state.error = action.error.message
        })

        //deleteExperience
        builder.addCase(deleteExperienceAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteExperienceAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload
        })
        builder.addCase(deleteExperienceAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
        })
    }
})

export default ExperienceSlice.reducer;