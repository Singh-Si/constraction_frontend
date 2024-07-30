import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from "@/config/config";

import { parseCookies } from 'nookies'
import 'react-toastify/dist/ReactToastify.css';

export const createOrgAsync = createAsyncThunk("createorgcallback", async ({ name, phone, email }) => {
    const { token } = parseCookies();
    try {
        const response = await axios.post(`${config.API_URL}/organization/add`, { name, phone, email },
            {
                headers: { Authorization: `Bearer ${token}` }
            });
        const userData = response?.data;

        return userData;
    } catch (error) {
        return error;
    }
});

const initialState = {
    status: 'idle',
    error: null,
}

const authSlice = createSlice({
    name: 'user/createorg',
    initialState: initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createOrgAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrgAsync.fulfilled, (state, action) => {
                const { orgme, orgContact, orgEmail } = action.payload; // Destructure payload directly
                state.status = 'succeeded';
            })
            .addCase(createOrgAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// export const { setFormData } = authSlice.actions;
export default authSlice.reducer;
