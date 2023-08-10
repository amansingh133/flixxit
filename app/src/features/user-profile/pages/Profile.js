import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";
import Navbar from "../../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { setUserProfile } from "../slices/profile-slice";
import ErrorPage from "../../../pages/error/ErrorPage";
import useLogout from "../../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";

const Profile = () => {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/welcome");
  };

  const handleChangePassword = async () => {
    await logout();
    navigate("/reset-password");
  };

  const email = useSelector((state) => state.user.user.email);
  const [error, setError] = useState({
    errorCode: null,
    errorMessage: null,
  });

  useEffect(() => {
    axiosPrivate
      .get("/user/profile")
      .then((res) => {
        dispatch(setUserProfile(res.data));
        setError({
          errorCode: null,
          errorMessage: null,
        });
      })
      .catch((error) => {
        setError({
          errorCode: error.response ? error.response.status : null,
          errorMessage: error.message,
        });
      });
  }, [axiosPrivate, dispatch]);

  const profile = useSelector((state) => state.profile.userProfile);

  if (error.errorCode) {
    return (
      <ErrorPage
        errorCode={error.errorCode}
        errorMessage={error.errorMessage}
      />
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      {profile && (
        <div className="profile-body">
          <h1>Profile Details</h1>
          <div className="profile-info">
            <img src="/images/icons/user-avatar.png" alt="avatar" />
            <div className="profile-details">
              <h2>{email}</h2>

              <div className="menu-container">
                <ProfileMenu />
                <div className="buttons-container">
                  <button
                    className="profile-buttons"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                  <button className="profile-buttons" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
