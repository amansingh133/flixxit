import React, { useEffect } from "react";
import "../styles/Search.css";

import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { setFocused } from "../slices/search-slice";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch } from "../utils/clear-search";
import ScrollToTop from "../../../components/scroll-to-top/ScrollToTop";

const Search = () => {
  const dispatch = useDispatch();
  const focused = useSelector((state) => state.search.focused);

  useEffect(() => {
    resetSearch(dispatch);
  }, [dispatch]);

  return (
    <>
      <div
        className={`search-wrapper ${focused ? "focused" : ""}`}
        onFocus={() => dispatch(setFocused(true))}
      >
        <header className="search-header">
          <SearchForm />
          <SearchResults />
        </header>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Search;
