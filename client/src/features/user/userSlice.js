import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { addUserToLocalStorage, getUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage()
}

export const registerUser = createAsyncThunk(
    'user/registerUser', 
    async(user, thunkApi) => {
    try {
        const res = await customFetch.post('/auth/register', user)
        return res.data
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
})

export const loginUser = createAsyncThunk(
    'user/loginUser', 
    async(user, thunkApi) => {
      try {
        const res = await customFetch.post('/auth/login', user)
        return res.data
    } catch (error) {
        console.log(error);
        return thunkApi.rejectWithValue(error.response.data.msg)
    }
})

const userSlice = createSlice({
    name:'user',
    initialState,
    extraReducers:(builder) => {
        builder
        .addCase(registerUser.pending,(state, action) => {
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            addUserToLocalStorage(action.payload.user)
            toast.success(`Hello There ${state.user.name}`)
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            toast.error(action.payload)
        })
        .addCase(loginUser.pending,(state, action) => {
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            addUserToLocalStorage(action.payload.user)
            toast.success(`Welcome Back ${state.user.name}`)
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            toast.error(action.payload)
        })
    }

})


export default userSlice.reducer