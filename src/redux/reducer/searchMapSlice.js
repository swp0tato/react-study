import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: {},
};

const searchMapSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    currentLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { currentLocation } = searchMapSlice.actions;
export default searchMapSlice;
