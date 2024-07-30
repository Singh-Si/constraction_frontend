
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Router } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define an async thunk for fetching data
export const fetchDataAsyncOtp = createAsyncThunk("auth/login/otp", async ({ email, otpValues }) => {
    const data = {
        "phone": email,
        "otp": otpValues.join("")
    };

    try {
        const response = await axios.post(`https://construction-backend.onrender.com/login`, data);
        const userData = response?.data;
        
        return userData;
        
    } catch (error) {
        console.error("An error occurred. Please try again.");
    }
});

// Create a slice
const authSlice = createSlice({
    name: 'auth/login',
    initialState: {
        email: "",
        otpValues: "",
        status: 'idle',
        error: null,
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setOTP: (state, action) => {
            state.otpValues = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsyncOtp.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataAsyncOtp.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload; // You might want to update the state with the received data
            })
            .addCase(fetchDataAsyncOtp.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setEmail, setOtp } = authSlice.actions;
export default authSlice.reducer;
