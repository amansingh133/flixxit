import React from "react";
import "../styles/SearchResults.css";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const { searchResults, error } = useSelector((state) => state.search);

  console.log(searchResults);

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <div className="search-results-container">
      {error ? (
        <p className="search-error">{error}</p>
      ) : (
        searchResults.map((result) => (
          <div className="search-result" key={result.id}>
            <h2>{result.title || result.name}</h2>
            <p>{result.overview}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
