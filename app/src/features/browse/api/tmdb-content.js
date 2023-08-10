import axios from "axios";

const baseURL = "https://api.themoviedb.org/3/";

export const tmdbAxios = axios.create({
  baseURL: baseURL,
});

export const fetchTmdbData = async (url) => {
  const request = await tmdbAxios.get(url);
  return request.data;
};
