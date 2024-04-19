import { configureStore } from "@reduxjs/toolkit";
import authenciateSlice from "./reducer/authenciate/authenciateSlice";
import searchMapSlice from "./reducer/search/searchMapSlice";

export const store = configureStore({
  reducer: {
    auth: authenciateSlice.reducer,
    search: searchMapSlice.reducer,
  },
});
