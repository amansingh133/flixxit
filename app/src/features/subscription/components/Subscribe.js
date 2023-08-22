import React from "react";
import { Link } from "react-router-dom";
import "../styles/Subscribe.css";

const Subscribe = () => {
  return (
    <div className="suscribe-container">
      <h1>You are currently not subscribed.</h1>
      <Link className="plans-link" to="/subscription/plans">
        View Plans
      </Link>
    </div>
  );
};

export default Subscribe;
