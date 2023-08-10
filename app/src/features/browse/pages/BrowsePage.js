import React from "react";
import "../styles/browse-page.css";
import { useSelector } from "react-redux";
import Navbar from "../../../components/navbar/Navbar";
import Banner from "../components/Banner";
import Row from "../components/Row";

const BrowsePage = () => {
  const tmdbRows = useSelector((state) => state.tmdb);

  return (
    <div className="browse-page">
      <Navbar />

      <Banner />

      {tmdbRows &&
        tmdbRows.map((row, i) => (
          <Row key={i} title={row.title} fetchUrl={row.fetchUrl} />
        ))}
    </div>
  );
};

export default BrowsePage;
