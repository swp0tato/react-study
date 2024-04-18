import { configureStore } from "@reduxjs/toolkit";
import authenciateSlice from "./reducer/authenciate/authenciateSlice";

export const store = configureStore({
  reducer: {
    auth: authenciateSlice.reducer,
  },
});
