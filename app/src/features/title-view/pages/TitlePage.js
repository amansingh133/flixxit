import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import TitleView from "../components/TitleView";
import "../styles/TitleView.css";

const TitlePage = () => {
  return (
    <div className="title-page-container">
      <Navbar />
      <TitleView />
    </div>
  );
};

export default TitlePage;
