    
import config from '@/config/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchDataAsync = createAsyncThunk("auth/fetchData", async (param) => {
    const data = {
        "phone": param
    }

    try {
        const response = await axios.post(`${config.API_URL}/send-otp`, data);

        const userData = await response?.data;
        return userData;

    } catch (error) {
        toast.error(error, { position: "top-center" });
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: "",
        status: 'idle',
        error: null,
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDataAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload;
            })
            .addCase(fetchDataAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setEmail } = authSlice.actions;
export default authSlice.reducer;