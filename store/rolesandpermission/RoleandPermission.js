
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchrolesAsync = createAsyncThunk("auth/fetchrole", async (param) => {
    const { token } = parseCookies();

    const {currentOrganizationId} = parseCookies( );
    try {
        const response = await axios.get(`https://construction-backend.onrender.com/permission${currentOrganizationId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

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
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(fetchrolesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchrolesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload;
            })
            .addCase(fetchrolesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

// export const { setEmail } = authSlice.actions;
export default authSlice.reducer;