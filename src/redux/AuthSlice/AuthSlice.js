import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const postLoginAsync = createAsyncThunk('postLoginAsync', async (data) => {
    try {
        const res = await axios.post('users/login/', data)
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const postRegisterAsync = createAsyncThunk('postRegisterAsync', async (data) => {
    try {
        const formData = new FormData()
        formData.append("first_name", data.first_name)
        formData.append("last_name", data.last_name)
        formData.append("email", data.email)
        formData.append("birthdate", data.birthdate)
        formData.append("address", data.address)
        formData.append("marital_status", data.marital_status)
        formData.append("employment_status", data.employment_status)
        formData.append("housing_status", data.housing_status)
        formData.append("phone_number", data.phone_number)
        formData.append("credit_cart_number", data.credit_cart_number)
        formData.append("debt_amount", data.debt_amount)
        formData.append("monthly_income", data.monthly_income)
        formData.append("about", data.about)
        formData.append("business_activities", data.business_activities)
        formData.append("profile_picture", data.profile_picture)
        formData.append("references", data.references)
        formData.append("password", data.password)
        console.log(formData);
        const res = await axios.post('users/', formData, {headers: {"Content-Type" : "multipart/form-data", "Authorization" : ""}})
        return res.data;
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getMeAsync = createAsyncThunk('getMeAsync', async () => {
    try {
        const res = await axios.get('users/me/')
        return res.data;
    } catch (error) {
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const putUserAsync = createAsyncThunk('putUserAsync', async (data) => {
    try {
        const formData = new FormData()
        formData.append("first_name", data.first_name)
        formData.append("last_name", data.last_name)
        formData.append("email", data.email)
        formData.append("birthdate", data.birthdate)
        formData.append("address", data.address)
        formData.append("marital_status", data.marital_status)
        formData.append("employment_status", data.employment_status)
        formData.append("housing_status", data.housing_status)
        formData.append("phone_number", data.phone_number)
        formData.append("credit_cart_number", data.credit_cart_number)
        formData.append("debt_amount", data.debt_amount)
        formData.append("monthly_income", data.monthly_income)
        formData.append("about", data.about)
        formData.append("profile_picture", data.profile_picture)
        formData.append("business_activities", data.business_activities)
        console.log(formData);
        const res = await axios.put(`users/${data.id}/`, formData, {headers: {"Content-Type" : "multipart/form-data", "Authorization" : ""}})
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getAllUsersAsync = createAsyncThunk('getAllUsersAsync', async (values) => {
    try {
        const res = await axios.get(`users/?birthdate=${values.birthdate}&marital_status=${values.marital_status}&employment_status=${values.employment_status}&housing_status=${values.housing_status}&phone_number=${values.phone_number}&monthly_income=${values.monthly_income}&monthly_income__gte=${values.monthly_income__gte}&monthly_income__lte=${values.monthly_income__lte}&fullname=${values.fullname}&is_active=${values.is_active}`, {headers: {"Authorization": ""}})
        return res.data;
    } catch (error) {
        console.log(error);
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        me: null,
        users: [],
        access: "",
        refresh: "",
        isLoggedIn: false,
        isLoading: false,
        error: null,
        successMsg: null,
        totalPage: 0,   
        pageLimit: 10
    },
    reducers: {
        resetAuthSlice : (state) => {
            return {...state, successMsg: null, error: null}
        }
    },
    extraReducers: (builder) => {
        // Login Reducers
        builder.addCase(postLoginAsync.pending, (state, action) => {
            state.isLoading = true;
            state.isLoggedIn = false;
        })
        builder.addCase(postLoginAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            localStorage.setItem("access", action.payload.access)
            state.me = action.payload.user_details;
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isLoggedIn = true;
        })
        builder.addCase(postLoginAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
        })
        // Register Reducers
        builder.addCase(postRegisterAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postRegisterAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(postRegisterAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
        })
        // Me Reducers
        builder.addCase(getMeAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getMeAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.me = action.payload;
        })
        builder.addCase(getMeAsync.rejected, (state, action) => {
            state.error = action.error.message;
            state.isLoggedIn = false;
        })
        // All Users Reducers
        builder.addCase(getAllUsersAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getAllUsersAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            // state.users = action.payload.results.map((result) => result.user.first_name)
            // console.log(action.payload.results.map((result) => result.user.first_name));
            state.users = action.payload.results
            // console.log(action.payload.results);
            state.totalPage = action.payload.count;
        })
        builder.addCase(getAllUsersAsync.rejected, (state, action) => {
            state.error = action.error.message; 
        })

        //put me
        builder.addCase(putUserAsync.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(putUserAsync.fulfilled, (state, action) => {
            state.isLoading = false;
            state.successMsg = action.payload.detail;
        })
        builder.addCase(putUserAsync.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export const {resetAuthSlice} = AuthSlice.actions
export default AuthSlice.reducer;