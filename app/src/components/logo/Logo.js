import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./logo.css";

const Logo = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const logoText = "FLIXXIT";

  const handleLogoClick = () => {
    if (user) {
      navigate("/");
    } else {
      navigate("/welcome");
    }
  };

  return (
    <div className="logo-wrapper" onClick={handleLogoClick}>
      <div className="logo">
        {logoText.split("").map((letter, index) => (
          <span className="letter" id={`letter-${index}`} key={index}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Logo;
