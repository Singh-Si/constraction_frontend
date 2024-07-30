
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
<<<<<<< HEAD
=======
import config from "@/config/config";
>>>>>>> 463abe6 (frontend additonals changes made)
import axios from 'axios';
import { parseCookies } from 'nookies';
import 'react-toastify/dist/ReactToastify.css';

export const getSiteAsync = createAsyncThunk("site/createsitecallback", async () => {
    try {
        const {token} = parseCookies();
        const {currentOrganizationId} = parseCookies();
        const response = await axios.get(`${config.API_URL}/sites`, 
        { 
            params:{
                organization:currentOrganizationId
            },
            headers: { Authorization: `Bearer ${token}` } });
        const userData = response?.data;
        return userData;
    } catch (error) {
        console.error("An error occurred. Please try again.");
        throw error;
    }
});

const initialState = {
    status: 'idle',
    error: null,
    data:null,
}

const authSlice = createSlice({
    name: 'getsite',
    initialState: initialState,
   
    reducers: {
        userData: (state, action) => {

            state.data=action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getSiteAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSiteAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;

               
            })
            .addCase(getSiteAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { userData } = authSlice.actions;
export default authSlice.reducer;