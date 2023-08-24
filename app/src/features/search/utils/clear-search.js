import {
  setError,
  setQuery,
  setFocused,
  setSearchResults,
} from "../slices/search-slice";

export const resetSearch = (dispatch) => {
  dispatch(setFocused(false));
  dispatch(setSearchResults([]));
  clearInput(dispatch);
};

export const clearInput = (dispatch) => {
  dispatch(setError(null));
  dispatch(setQuery(""));
};
