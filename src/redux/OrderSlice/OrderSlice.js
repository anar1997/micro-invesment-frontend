import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getOrderAsync = createAsyncThunk('getOrderAsync', async(id)=>{
    try {
        const res = await axios.get(`entrepreneurs/?limit=10&offset=1&owner=${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw {'message': error.response.data.detail};        
    }
})

export const filterOrderAsync = createAsyncThunk('filterOrderAsync', async(id)=>{
    try {
        const res = await axios.get(`entrepreneurs/?owner=1&start_date=&start_date__gte=&start_date__lte=&end_date=&end_date__gte=&end_date__lte=`)
    } catch (error) {
        console.log(error);
        throw {'message': error.response.data.detail};    
    }
})

export const OrderSlice = createSlice({
    name: 'auth',
    initialState: {
        orders: [],
        isLoading: false,
        error: null,
        successMsg: null,
        totalPage: 0,
        psgeLimit: 10
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrderAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getOrderAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.results;  
            state.totalPage = action.payload.count
        })
        builder.addCase(getOrderAsync.rejected, (state, action)=>{
            state.error = action.error.message
        })
    }    
})

export default OrderSlice.reducer;