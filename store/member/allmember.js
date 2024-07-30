import config from '@/config/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const getAllmember = createAsyncThunk(
    'member/allmember',
    async () => {
        try {
            const { currentOrganizationId, token } = parseCookies();
            const response = await axios.get(`${config.API_URL}/members?organization=${currentOrganizationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response?.data;
        } catch (error) {
            console.error('An error occurred. Please try again.');
        }
    }
);

const initialState = {
    allMemberData: '',
    error: null,
    userData: null,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllmember.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllmember.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allMemberData = action.payload;
            })
            .addCase(getAllmember.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default organizationSlice.reducer;