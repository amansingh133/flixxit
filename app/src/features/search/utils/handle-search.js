import { setSearchResults, setError } from "../slices/search-slice";
import { fetchSearchResults } from "../api/api";

export const handleSearch = async (dispatch, query) => {
  try {
    const response = await fetchSearchResults(query);
    if (response.data.results.length > 0) {
      dispatch(setSearchResults(response.data.results));
      dispatch(setError(""));
    } else {
      dispatch(
        setError("Unfortunately, we couldn't find any results for your search.")
      );
    }
  } catch (error) {
    dispatch(setError("Something went wrong. Please try again later."));
  }
};
