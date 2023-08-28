import axios from "axios";

const BASE_URL = "https://flixxit-8k2n.onrender.com/api";

// Create an instance of Axios with common configurations.
export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Create a separate Axios instance for private requests.
// This instance can be used for authenticated requests.
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
