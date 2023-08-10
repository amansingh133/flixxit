import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const user = useSelector((state) => state.user.user);

  return user ? <Outlet /> : <Navigate to="/welcome" replace />;
};

export default RequireAuth;
