import axios from "../api/axios";
import { setUserAndToken } from "../features/user-accounts/index";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axios.get("/user/refreshToken");
      const { accessToken, userData } = response.data;
      const user = jwtDecode(accessToken);
      dispatch(setUserAndToken({ user, accessToken, userData }));
      return accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
