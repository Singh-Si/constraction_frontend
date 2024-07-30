import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { parseCookies } from 'nookies';
import config from '@/config/config'; // Import your config file

// Define async thunk to fetch today's attendance
export const getTodayAttendance = createAsyncThunk("getTodayAttendance", async (reversedDatesString, { rejectWithValue }) => {
    const { token, currentOrganizationId, siteId } = parseCookies(); // Destructure necessary values
    try {
        const response = await axios.get(
            `${config.API_URL}/attendance/${reversedDatesString}?organization=${currentOrganizationId}&site=${siteId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        // Return the data you fetched
        return response.data;
    } catch (error) {
        console.error("Error fetching attendance:", error.message);
        // Reject with a custom error value
        return rejectWithValue(error.message);
    }
});

// Define initial state
const initialState = {
    status: '',
    attendance: null,
    error: null,
};

// Create slice
const getTodayAttendanceSlice = createSlice({
    name: 'getTodayAttendance',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodayAttendance.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTodayAttendance.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Update status
                state.attendance = action.payload; // Update attendance data
            })
            .addCase(getTodayAttendance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Update error message
            });
    },
});

// Export slice reducer
export default getTodayAttendanceSlice.reducer;
