import React, { useEffect, useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`scroll-to-top-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <FiArrowUpCircle size={32} />
    </div>
  );
};

export default ScrollToTop;
