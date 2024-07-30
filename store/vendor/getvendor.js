import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parseCookies } from 'nookies';

export const fetchVendordata = createAsyncThunk(
  'fetchVendordata',
  async () => {
    try {
      const { token, currentOrganizationId } = parseCookies();
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getAllvendors`, {
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

const vendorSlice = createSlice({
  name: 'sites',
  initialState: {
    userData: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendordata.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVendordata.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
        state.error = null; // Reset error on success
      })
      .addCase(fetchVendordata.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Use error message from thunk
      });
  },
});

export const { setUserData } = vendorSlice.actions;
export default vendorSlice.reducer;