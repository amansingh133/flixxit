import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// Create an instance of Axios with common configurations.
export default axios.create({
  baseURL: BASE_URL,
});

// Create a separate Axios instance for private requests.
// This instance can be used for authenticated requests.
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
