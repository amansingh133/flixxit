import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_API_ACCESS_TOKEN;

export const fetchSearchResults = async (query) => {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}`,
    params: {
      query: `${query}`,
      include_adult: "true",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const response = await axios.request(options);
  return response;
};
