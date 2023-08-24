import React from "react";
import "../styles/Search.css";

import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { setFocused } from "../slices/search-slice";

import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="search-wrapper"
      onFocus={() => dispatch(setFocused(true))}
      onBlur={() => dispatch(setFocused(false))}
    >
      <header className="search-header">
        <SearchForm />
        <SearchResults />
      </header>
    </div>
  );
};

export default Search;
