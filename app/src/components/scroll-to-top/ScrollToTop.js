import React, { useEffect, useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  // State to control the visibility of the scroll-to-top button
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle the visibility based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Adding and removing event listener when component mounts and unmounts
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
