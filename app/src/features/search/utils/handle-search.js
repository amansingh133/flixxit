import { setSearchResults, setError } from "../slices/search-slice";
import { fetchSearchResults } from "../api/api";

export const handleSearch = async (dispatch, query) => {
  try {
    const response = await fetchSearchResults(query);
    dispatch(setSearchResults(response.data.results));
    dispatch(setError(""));
  } catch (error) {
    dispatch(setError("Something went wrong. Please try again later"));
  }
};
