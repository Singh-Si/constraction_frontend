import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkPermissions = createAsyncThunk("permissions/checkPermissions", async ({ context, plan, feature }) => {

  try {
    const [userPlanResponse, userPermissionsResponse] = await Promise.all([
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/plan/user?organization=${context?.currentOrganizationId}&plan=${plan}`, { headers: { "Authorization": `Bearer ${context?.token}` } }),
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/permission/user?organization=${context?.currentOrganizationId}&key=${feature}`, { headers: { "Authorization": `Bearer ${context?.token}` } })
    ]);

    const userPlan = userPlanResponse.data;
    const userPermissions = userPermissionsResponse.data;

    if (userPlan.success && userPlan.plan) {
      if (userPermissions.success && userPermissions.permission) {

        return {
          permission: userPermissions,
          error: ""
        };
      } else {
        return {
          permissions: { read: false, update: false, insert: false, delete: false },
          error: "You don't have this feature in your organization."
        };
      }
    } else {
      return {
        permissions: { read: false, update: false, insert: false, delete: false },
        error: "You don't have this feature in your subscription plan."
      };
    }
  } catch (error) {
    return {
      permissions: { read: false, update: false, insert: false, delete: false },
      error: error.message || "An error occurred while fetching data."
    };
  }
}
);

const permissionsSlice = createSlice({
  name: "permissions",

  initialState: {
    permissions: {},
    status: 'idle',
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      })
      .addCase(checkPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default permissionsSlice.reducer;