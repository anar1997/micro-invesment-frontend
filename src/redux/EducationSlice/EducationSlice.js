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

export const postEducationAsync = createAsyncThunk('postEducationSlice', async(data)=>{
    try {
        const res = await axios.post(`users/educations/`, data)
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getEducationDetailAsync = createAsyncThunk('getEducationDetailAsync', async ({id}) => {
    try {
        const res = await axios.get(`users/educations/${id}/`)
        return res.data
    } catch (error) {
        console.log(error);
        throw {'message': error.response.data.detail};    
    }
})

export const putEducationAsync = createAsyncThunk('putEducationAsync', async (data) => {
    try {
        const res = await axios.put(`users/educations/${data.id}/`, data)
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const deleteEducationAsync = createAsyncThunk('deleteEducationAsync', async ({id}) => {
    try {
        const res = await axios.delete(`/users/educations/${id}/`)
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const EducationSlice = createSlice({
    name: 'auth',
    initialState: {
        educations: [],
        education: {},
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

        //post reducers
        
        builder.addCase(postEducationAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postEducationAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload
        })
        builder.addCase(postEducationAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
        })

        //put reducers

        builder.addCase(putEducationAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(putEducationAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload
        })
        builder.addCase(putEducationAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
        })

        //getdetail
        
        builder.addCase(getEducationDetailAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getEducationDetailAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.education = action.payload;
            console.log(action.payload);
        })
        builder.addCase(getEducationDetailAsync.rejected, (state, action) => {
            state.error = action.error.message
        })

        //deleteEducation

        builder.addCase(deleteEducationAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteEducationAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload
        })
        builder.addCase(deleteEducationAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
        })
    }
})

export default EducationSlice.reducer;