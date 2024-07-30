
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define an async thunk for fetching data
export const settingAccountAsync = createAsyncThunk("setupaccountcallback", async ({ name, role, email }, { getState }) => {
    const cookies = parseCookies(getState());
    const token = cookies?.token;

    try {
        const response = await axios.patch(`https://construction-backend.onrender.com/setting-up-account`, { name, role, email   }, { headers: { Authorization: `Bearer ${token}` } });
        const userData = response?.data;

        if (userData?.success) {
            return userData;
        } else {
            toast.error(userData.error, { position: "top-center" });
        }
    } catch (error) {
        toast.error(error?.message, { position: "top-center" });
    }
});

// Create a slice
const authSlice = createSlice({
    name: 'user/setupaccount',
    initialState: {
        formData: {
            accountName: '',
            role: '',
            email: '',
            phone: ''
        },
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(settingAccountAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(settingAccountAsync.fulfilled, (state, action) => {
                const payload = action.payload;

                state.formData.status = 'succeeded';
                state.formData.accountName = payload?.accountName || '';
                state.formData.role = payload?.role || '';
                state.formData.email = payload?.email || '';
                state.formData.phone = payload?.phone || '';
            })

            .addCase(settingAccountAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;
