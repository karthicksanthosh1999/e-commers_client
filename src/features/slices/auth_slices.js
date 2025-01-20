import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  authendication: false,
  user: null,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "/api/register",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:4000/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );
    console.log({ response: response?.data });
    return response.data;
  }
);

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authendication = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authendication = false;
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const { addUser } = authSlices.actions;

export default authSlices.reducer;
