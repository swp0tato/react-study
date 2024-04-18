import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  email: "",
  password: "",
};

const authenciateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { login, logout, updateEmail } = authenciateSlice.actions;

export default authenciateSlice;
