import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authendication: false,
  user: null,
};

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser(state, action) {},
  },
});

export const { addUser } = authSlices.actions;

export default authSlices.reducer;
