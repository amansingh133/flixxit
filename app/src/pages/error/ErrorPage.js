import React from "react";
import "./ErrorPage.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ errorCode = 404, errorMessage = "Page not found" }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="error-container">
      <div className="error-text">
        <h1>{errorCode}</h1>
        <h2>{errorMessage}</h2>
        <button onClick={clickHandler}>Go to Home</button>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  errorCode: PropTypes.number,
  errorMessage: PropTypes.string,
};

export default ErrorPage;
