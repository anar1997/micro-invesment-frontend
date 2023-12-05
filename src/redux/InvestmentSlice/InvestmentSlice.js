import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getAllInvestmentsAsync = createAsyncThunk('getAllInvestmentsAsync', async (values) => {
    try {
        const res = await axios.get(`investments/?limit=10&offset=${values.offset}&investor=${values.investor}&entrepreneur=${values.entrepreneur}&amount=${values.amount}&amount__gte=${values.amount_gte}&amount__lte=${values.amount_lte}`)
        return res.data;
    } catch (error) {
        console.log(error);
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const postInvestmentAsync = createAsyncThunk('postInvestmentAsync', async (data) => {
    try {
        const res = await axios.post('investments/', data)
        return res.data
    } catch (error) {
        console.log(error);
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const InvestmentSlice = createSlice({
    name: 'auth',
    initialState: {
        investments: [],
        isLoading: false,
        error: null,
        successMsg: null
    },
    reducers: {
        resetInvestmentSlice : (state) => {
            return {...state, successMsg : null, error: null}
        }
    },
    extraReducers: (builder) => {
        // Investments Reducers
        builder.addCase(getAllInvestmentsAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllInvestmentsAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.investments = action.payload.results;
        })
        builder.addCase(getAllInvestmentsAsync.rejected, (state, action) => {
            state.error = action.error.message;
        })

        //post investment
        builder.addCase(postInvestmentAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postInvestmentAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload
        })
        builder.addCase(postInvestmentAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
        })
    }
})

export const {resetInvestmentSlice} = InvestmentSlice.actions;
export default InvestmentSlice.reducer;