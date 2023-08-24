import React from "react";
import useDebounce from "../hooks/useDebounce";
import "../styles/SearchForm.css";
import { AiOutlineSearch, AiFillCloseCircle } from "react-icons/ai";

import { handleSearch } from "../utils/handle-search";
import { useDispatch, useSelector } from "react-redux";
import { setQuery, resetSearch } from "../slices/search-slice";

const SearchForm = () => {
  const dispatch = useDispatch();

  const { query, focused } = useSelector((state) => state.search);

  const debouncedSearch = useDebounce(() => {
    handleSearch(dispatch, query);
  }, 3000);

  const handleClear = () => {
    dispatch(resetSearch());
  };

  return (
    <div className="search-input-container">
      {focused ? (
        <AiFillCloseCircle
          color="#fff"
          size="2.5vw"
          onClick={handleClear}
          className="search-icon"
          cursor="pointer"
        />
      ) : (
        <AiOutlineSearch color="#e50914" size="2.5vw" className="search-icon" />
      )}
      <input
        className="search-input"
        type="text"
        name="query"
        id="query"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          dispatch(setQuery(e.target.value));
          debouncedSearch();
        }}
      />
    </div>
  );
};

export default SearchForm;
