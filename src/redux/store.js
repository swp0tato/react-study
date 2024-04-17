import { configureStore } from "@reduxjs/toolkit";
import authenciateSlice from "./reducer/authenciateSlice";

export const store = configureStore({
  reducer: {
    auth: authenciateSlice.reducer,
  },
});
