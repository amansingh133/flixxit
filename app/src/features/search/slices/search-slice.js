import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResults: [],
  focused: false,
  error: null,
  query: "",
};

const userSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setFocused: (state, action) => {
      state.focused = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setSearchResults, setFocused, setError, setQuery } =
  userSlice.actions;

export default userSlice.reducer;
