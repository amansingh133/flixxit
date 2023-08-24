import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Search from "../components/Search";

const SearchPage = () => {
  return (
    <div className="search-page-container">
      <Navbar />

      <Search />
    </div>
  );
};

export default SearchPage;
