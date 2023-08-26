import React from "react";
import "../styles/browse-page.css";
import Navbar from "../../../components/navbar/Navbar";
import Banner from "../components/Banner";
import SuggestionsRow from "../components/SuggestionsRow";

const BrowsePage = () => {
  return (
    <div className="browse-page">
      <Navbar />

      <Banner />

      <SuggestionsRow />
    </div>
  );
};

export default BrowsePage;
