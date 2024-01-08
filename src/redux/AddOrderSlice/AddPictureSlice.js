import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const postAddPictureAsync = createAsyncThunk('postAddPictureAsync', async (data) => {
    try {
        const formData = new FormData()
        formData.append("entrepreneur", data.id)
        formData.append("image", data.image)
        console.log(formData);
        const res = await axios.post(`entrepreneurs/images/`, formData, {headers: {"Content-Type" : "multipart/form-data", "Authorization" : ""}})
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const getAddPictureAsync = createAsyncThunk('getAddPictureAsync', async (values) => {
    try {
        const res = await axios.get(`entrepreneurs/images/?entrepreneur=${values.entrepreneur}`)
        return res.data
    } catch (error) {
        console.log(error)
        // If the API call fails, the error will be thrown and caught here.
        throw {'message': error.response.data.detail};
    }
})

export const AddPictureSlice = createSlice({
    name: "addPicture",
    initialState: {
        isLoading: false,
        error: null,
        successMsg: null,
        images: []
},
reducers: {
    resetAddPictureSlice : (state) => {
        return {...state, successMsg: null, error: null}
    }
},
extraReducers: (builder) => {
    builder.addCase(postAddPictureAsync.pending, (state, action) => {
        state.isLoading = true
    })
    builder.addCase(postAddPictureAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMsg = action.payload.detail
        console.log(action.payload);
    })
    builder.addCase(postAddPictureAsync.rejected, (state, action) => {
        state.error = action.error.message
    })

    // get

    builder.addCase(getAddPictureAsync.pending, (state, action) => {
        state.isLoading = true
    })
    builder.addCase(getAddPictureAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.images = action.payload.results
        console.log(action.payload);
    })
    builder.addCase(getAddPictureAsync.rejected, (state, action) => {
        state.error = action.error.message;
    })
}
})


export const {resetAddPictureSlice} = AddPictureSlice.actions
export default AddPictureSlice.reducer;