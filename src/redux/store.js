import { configureStore } from "@reduxjs/toolkit";
import authenciateSlice from "./reducer/authenciateSlice";
import searchMapSlice from "./reducer/searchMapSlice";

export const store = configureStore({
  reducer: {
    auth: authenciateSlice.reducer,
    search: searchMapSlice.reducer,
  },
});
