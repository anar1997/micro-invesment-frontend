import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const postAddOrderAsync = createAsyncThunk('postAddOrderAsync', async (data) => {
    try {
        const res = await axios.post('entrepreneurs/', data)
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const AddOrderSlice = createSlice({
    name: "addOrder",
    initialState: {
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {
        resetAddOrderSlice : (state) => {
            return {...state, successMsg: null, error: null}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postAddOrderAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postAddOrderAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail
            console.log(action.payload);
        })
        builder.addCase(postAddOrderAsync.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})


export const {resetAddOrderSlice} = AddOrderSlice.actions
export default AddOrderSlice.reducer;