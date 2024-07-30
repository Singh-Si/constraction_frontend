
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Router } from 'next/router';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define an async thunk for fetching data
export const fetchProfileDataAsync = createAsyncThunk("editprofile", async () => {
    const { token } = parseCookies();
    try {
        const response = await axios.get(`https://construction-backend.onrender.com/profile/me`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            }
        )

        return response?.data?.user;
    } catch (error) {
        throw error; // Re-throw the error so it can be caught by fetchProfileDataAsync.rejected
    }
});

const initialState = {
    profileData: '',
    error: null,
    status: 'idle',
};

// Create a slice
const authSlice = createSlice({
    name: 'editprofile',

    initialState: initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfileDataAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profileData = action.payload;
            })
            .addCase(fetchProfileDataAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;
