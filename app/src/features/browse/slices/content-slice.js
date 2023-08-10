import { createSlice } from "@reduxjs/toolkit";

const contentSlice = createSlice({
  name: "content",
  initialState: [],
  reducers: {
    storeContent: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeContent } = contentSlice.actions;
export default contentSlice.reducer;
