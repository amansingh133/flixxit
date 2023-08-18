import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userName = useSelector((state) => state.user.user.name);

  const [show, setShow] = useState(false);

  const transitionNav = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNav);
    return () => window.removeEventListener("scroll", transitionNav);
  }, []);

  return (
    <div className="navbar">
      <div className={`nav_contents ${show && "nav_black"}`}>
        <div className="nav_logo">
          <Logo />
        </div>
        <div className="nav_link">
          <Link className="user-init" to="/profile">
            <p>{userName.charAt(0)}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;