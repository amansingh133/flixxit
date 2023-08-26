import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  upvote: 0,
  downvote: 0,
  userVote: {},
  error: null,
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    updateUpvote: (state, action) => {
      state.upvote = action.payload;
    },
    updateDownvote: (state, action) => {
      state.downvote = action.payload;
    },
    updateUserVote: (state, action) => {
      state.userVote = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { updateUpvote, updateDownvote, updateUserVote, setError } =
  ratingSlice.actions;

export default ratingSlice.reducer;
