import useAxiosPrivate from "./useAxiosPrivate";
import { clearUserAndToken } from "../features/user-accounts/index";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    dispatch(clearUserAndToken());

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axiosPrivate.get("/user/logout");
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
