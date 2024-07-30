import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { parseCookies } from "nookies";
import config from "@/config/config";

export const fetchTasksAsync = createAsyncThunk("taskslice/fetchTasks", async () => {
    const { token, currentOrganizationId ,siteId, floorId} = parseCookies();

    try {
        const response = await axios.get(`https://construction-backend.onrender.com/tasks?organization=${currentOrganizationId}&site=${siteId}&floor=${floorId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })

        return response.data.tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
});

const initialState = {
    userData: [],
    status: 'idle',
    error: null,
}

const taskSlice = createSlice({
    name: 'taskslice',

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error state
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload;
                state.error = null; // Reset error state
            })
            .addCase(fetchTasksAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Set error message from payload
            });
    },
})

export default taskSlice.reducer;