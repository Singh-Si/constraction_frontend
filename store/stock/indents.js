import config from "@/config/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";

export const fetchAllIndentAsync = createAsyncThunk(
  "fetchIndents",
  async () => {
    const { token, siteId, currentOrganizationId } = parseCookies();
    try {
      const response = await axios.get(`${config.API_URL}/allindents/get`, {
        params: {
          site: siteId,
          organization: currentOrganizationId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = response?.data;
      return userData;
    } catch (error) {
      toast.error(error, { position: "top-center" });
    }
  }
);

const allIndentSlice = createSlice({
  name: "fetchIndents",
  initialState: {
    userData: "",
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIndentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllIndentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(fetchAllIndentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default allIndentSlice.reducer;
