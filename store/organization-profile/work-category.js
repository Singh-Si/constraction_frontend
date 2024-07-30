
import config from '@/config/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Router } from 'next/router';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define an async thunk for fetching data
export const fetchWorkCategory = createAsyncThunk("getworkcategory", async () => {
    const { currentOrganizationId, token } = parseCookies();
    try {
        const response = await axios.get(`${config.API_URL}/work-categories?organization=${currentOrganizationId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )

        return response?.data;
    } catch (error) {
        console.log(error);
    }
});

const initialState = {
    workCategoryData: '',
    error: null,
    status: 'idle',
};

// Create a slice
const workSlice = createSlice({
    name: 'getworkcategory',

    initialState: initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchWorkCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWorkCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.workCategoryData = action.payload;
            })
            .addCase(fetchWorkCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default workSlice.reducer;
