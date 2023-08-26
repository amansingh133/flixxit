import { callApi } from "../../../api/callApi";
import { storeSuggestions, setError } from "../slices/suggestions-slice";

export const getSuggestions = async (axios, dispatch) => {
  try {
    const response = await callApi(axios, "/content/suggestions", "get");
    dispatch(storeSuggestions(response.data));
    dispatch(setError(null));
  } catch (error) {
    dispatch(storeSuggestions([]));
    dispatch(setError("Something went wrong!"));
  }
};
