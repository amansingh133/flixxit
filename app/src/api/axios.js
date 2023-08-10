import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_AXIOS_URL_DEVELOPMENT;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
