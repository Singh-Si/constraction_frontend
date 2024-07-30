import config from '@/config/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const fetchMembersAsync = createAsyncThunk("member/fetchMembers", async () => {
    const { token, currentOrganizationId } = parseCookies();
    try {
        const response = await axios.get(`${config.API_URL}/permissions?organization=${currentOrganizationId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        return response?.data;
    } catch (error) {
        throw error; // Rethrow the error to be handled elsewhere
    }
});

const memberSlice = createSlice({
    name: 'member',
    initialState: {
        memberData: {},
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMembersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.memberData = action.payload;
            })
            .addCase(fetchMembersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default memberSlice.reducer;