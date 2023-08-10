import { createSlice } from "@reduxjs/toolkit";

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const initialState = [
  {
    title: "Trending Now",
    fetchUrl: `trending/all/week?api_key=${apiKey}`,
  },
  {
    title: "Top Rated Movies",
    fetchUrl: `discover/movie?api_key=${apiKey}&sort_by=vote_average.desc`,
  },
  {
    title: "Top Rated TV Shows",
    fetchUrl: `discover/tv?api_key=${apiKey}&sort_by=vote_average.desc`,
  },
  {
    title: "Top Rated Action Movies",
    fetchUrl: `discover/movie?api_key=${apiKey}&with_genres=28&sort_by=vote_average.desc`,
  },
  {
    title: "Top Rated Documentary Movies",
    fetchUrl: `discover/movie?api_key=${apiKey}&with_genres=99&sort_by=vote_average.desc`,
  },
  {
    title: "Top Rated Documentary TV Shows",
    fetchUrl: `discover/tv?api_key=${apiKey}&with_genres=99&sort_by=vote_average.desc`,
  },
];

const tmdbslice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {},
});

export default tmdbslice.reducer;
