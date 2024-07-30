import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const fetchUserData = createAsyncThunk(
  'sites/fetchUserData',
  async () => {
    try {
      const { token, currentOrganizationId } = parseCookies();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sites`, {
        params: {
          organization: currentOrganizationId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

const siteSlice = createSlice({
  name: 'sites',
  initialState: {
    userData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Define reducers if needed
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    // Add other reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Use error message from thunk
      });
  },
});

export const { setUserData } = siteSlice.actions;
export default siteSlice.reducer;