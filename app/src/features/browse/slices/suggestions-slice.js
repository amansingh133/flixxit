import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestions: [],
  error: null,
};

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    storeSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { storeSuggestions, setError } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
