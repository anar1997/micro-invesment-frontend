import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getEntrepreneurTableAsync = createAsyncThunk('getEntrepreneurTableAsync', async (id) => {
    try {
        const res = await axios.get(`investments/?limit=10&offset=1?investor=${id}&entrepreneur=`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw {'message': error.response.data.detail};        
    }
})

export const EntreprenuerTableSlice = createSlice({
    name: 'auth',
    initialState: {
        investments: [],
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getEntrepreneurTableAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getEntrepreneurTableAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.investments = action.payload.results;
        })
        builder.addCase(getEntrepreneurTableAsync.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export default EntreprenuerTableSlice.reducer;