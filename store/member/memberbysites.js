
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchmemberBySite = createAsyncThunk("auth/fetchmemberBySite", async (param) => {
    const {token , currentSiteId , currentOrganizationId} = parseCookies();
    try {
        const response = await axios.get(`https://construction-backend.onrender.com/site/members`,
        {
            params:{
                site:currentSiteId,
                organization :currentOrganizationId,
            },
            headers: { Authorization: `Bearer ${token}` },
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
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchmemberBySite.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchmemberBySite.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.email = action.payload;
            })
            .addCase(fetchmemberBySite.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setEmail } = authSlice.actions;
export default authSlice.reducer;