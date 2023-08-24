/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useSelector } from "react-redux";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const accessToken = useSelector((state) => state.user.accessToken);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  return (
    <>
      {isLoading ? (
        <p
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#111",
            color: "#e50914",
            fontWeight: "bold",
          }}
        >
          Loading...
        </p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
