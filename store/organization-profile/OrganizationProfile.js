
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const organizationProfilePatchAsync = createAsyncThunk('organizationUpdate', async ({ name, email, phone, address, city, state, pin_code }) => {
    try {
        const { token, currentOrganizationId } = parseCookies();

        const response = await axios.patch(`https://construction-backend.onrender.com/organization/update?organization=${currentOrganizationId}`, { name, email, phone, address, city, state, pin_code }, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response?.data;
        return userData;
    } catch (error) {
        throw error;
    }
}
);

const initialState = {
    userData: '',
    error: null,
    status: 'idle',
};

const organizationSlice = createSlice({
    name: 'organizationUpdate',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(organizationProfilePatchAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(organizationProfilePatchAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(organizationProfilePatchAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default organizationSlice.reducer;