import React from "react";
import "../styles/ProfileMenu.css";
import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";

const ProfileMenu = () => {
  const menuOptions = useSelector((state) => state.profile.menuOptions);

  return (
    <div className="profile-menu">
      {menuOptions &&
        menuOptions.map((option, index) => (
          <MenuItem key={index} option={option} />
        ))}
    </div>
  );
};

export default ProfileMenu;
