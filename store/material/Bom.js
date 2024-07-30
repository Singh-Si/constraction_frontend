import config from '@/config/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

export const fetchMaterialBomAsync = createAsyncThunk("fetchMaterialBomAsync", async () => {
    const { token, currentSiteId, currentOrganizationId } = parseCookies();
    try {
        const response = await axios.get(`${config.API_URL}/materials`, {
            params: {
                site: currentSiteId,
                organization: currentOrganizationId,
            },
            headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response?.data;
        return userData;
    } catch (error) {
        toast.error(error, { position: "top-center" });
    }
});

const bomMaterialSlice = createSlice({
    name: 'fetchMaterialBomAsync',
    initialState: {
        userData: "",
        status: 'idle',
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterialBomAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMaterialBomAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
            })
            .addCase(fetchMaterialBomAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default bomMaterialSlice.reducer;