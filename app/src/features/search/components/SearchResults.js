import React from "react";
import "../styles/SearchResults.css";
import { useSelector } from "react-redux";
import Result from "./Result";

const SearchResults = () => {
  const { searchResults, error } = useSelector((state) => state.search);

  if (searchResults.length === 0 && error === null) {
    return null;
  }

  return (
    <div className="search-results-container">
      {error ? (
        <p className="search-error">{error}</p>
      ) : (
        searchResults.map((result) => (
          <Result result={result} key={result.id} />
        ))
      )}
    </div>
  );
};

export default SearchResults;
