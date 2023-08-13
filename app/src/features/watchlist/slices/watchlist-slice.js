import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: [],
  reducers: {
    setWatchlist: (state, action) => {
      return action.payload;
    },
    addContentToWatchlist: (state, action) => {
      const newItem = action.payload;
      return [...state, newItem];
    },
    markContentAsWatched: (state, action) => {
      const contentId = action.payload;
      return state.map((item) =>
        item.content._id === contentId ? { ...item, watched: true } : item
      );
    },
    removeContentFromWatchlist: (state, action) => {
      const contentId = action.payload;
      return state.filter((item) => item.content._id !== contentId);
    },
  },
});

export const {
  setWatchlist,
  addContentToWatchlist,
  markContentAsWatched,
  removeContentFromWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
