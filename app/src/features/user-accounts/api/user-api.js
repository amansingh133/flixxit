import axios from "../../../api/axios";

export const signup = async (name, email, password) => {
  const response = await axios.post("/user/signup", { name, email, password });
  return response;
};

export const login = async (email, password) => {
  const response = await axios.post("/user/login", {
    email,
    password,
  });
  return response.data;
};
