// import config from '@/config/config';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { parseCookies } from 'nookies';
// import { toast } from 'react-toastify';

// export const fetchlabourprofile = createAsyncThunk("fetchlabourAsync", async () => {
//     const { token, currentSiteId, currentOrganizationId } = parseCookies();
//     try {
//         const response = await axios.get(`${config.API_URL}/labours`, {
//             params: {
//                 site: currentSiteId,
//                 organization: currentOrganizationId,
//             },
//             headers: { Authorization: `Bearer ${token}` },
//         });

//         const userData = response?.data;
//         return userData;
//     } catch (error) {
//         toast.error(error, { position: "top-center" });
//     }
// });

// const fetchlabourSlice = createSlice({
//     name: 'fetchlabourAsync',
//     initialState: {
//         userData: "",
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},

//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchlabourprofile.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchlabourprofile.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.userData = action.payload;
//             })
//             .addCase(fetchlabourprofile.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             });
//     },
// });

// export default fetchlabourSlice.reducer;
import config from '@/config/config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

export const fetchLabourProfile = createAsyncThunk(
  'labour/fetchLabourProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { token, siteId, currentOrganizationId } = parseCookies();
      const response = await axios.get(`${config.API_URL}/labours`, {
        params: {
          site: siteId,
          organization: currentOrganizationId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return response.data; // Assuming the response directly contains the user data
    } catch (error) {
      toast.error(error.message, { position: 'top-center' });
      return rejectWithValue(error.message); // Pass the error message to Redux state
    }
  }
);

const fetchLabourSlice = createSlice({
  name: 'labour',
  initialState: {
    userData: null, // Use null instead of empty string for better representation of absence of data
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add reducers if needed for further actions
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabourProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLabourProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchLabourProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Access the rejected value from action.payload
      });
  },
});

export default fetchLabourSlice.reducer;
