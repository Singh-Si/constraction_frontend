

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const getOrganizationAsync = createAsyncThunk(
    'organization/switch',
    async () => {
        try {
            const {token} = parseCookies();
            const response = await axios.get(`https://construction-backend.onrender.com/organization/switch`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData = response?.data;
            return userData;
        } catch (error) {
            console.error('An error occurred. Please try again.');
            throw error;
        }
    }
);

const initialState = {
    userData: '',
    error: null,
    status: null,
};

const organizationSlice = createSlice({
    name: 'organization/switch',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrganizationAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrganizationAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
                
            })
            .addCase(getOrganizationAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default organizationSlice.reducer;
