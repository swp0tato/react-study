import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authenciateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout, updateEmail } = authenciateSlice.actions;

export default authenciateSlice;
